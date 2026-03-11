import { NextResponse } from "next/server";
import {
    getTopics,
    autoApproveTopics,
    getTodayGenerationCount,
    logAutomationRun,
} from "@/lib/blog/blogService";
import { autoPopulateKeywords, discoverTopicsFromKeywords } from "@/lib/blog/keywordDiscovery";
import { generateArticle } from "@/lib/blog/seoOptimizer";

const DAILY_LIMIT = 2;    // Günlük toplam makale limiti
const PER_RUN_LIMIT = 1;  // Her cron çalışmasında max makale

/**
 * POST /api/blog/automate
 * Tam otonom blog üretim pipeline'ı.
 * Auth: Authorization: Bearer {CRON_SECRET}
 *
 * Akış:
 * 0. Keyword auto-populate (eksikse AI üretir)
 * 1. Topic discovery (AI + web search)
 * 2. Auto-approve (yeni topic'leri onaylar)
 * 3. Article generation (onaylı topic'lerden makale üretir)
 */
export async function POST(request: Request) {
    const startTime = Date.now();
    const errors: string[] = [];

    // Auth kontrolü
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.CRON_SECRET;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Günlük limit kontrolü
        const todayCount = await getTodayGenerationCount();
        if (todayCount >= DAILY_LIMIT) {
            return NextResponse.json({
                success: true,
                message: `Daily limit reached (${todayCount}/${DAILY_LIMIT})`,
                populated: 0,
                discovered: 0,
                approved: 0,
                generated: 0,
                dailyLimit: DAILY_LIMIT,
                todayTotal: todayCount,
            });
        }

        // Adım 0: Keyword auto-populate
        let populated = 0;
        try {
            populated = await autoPopulateKeywords(5);
            if (populated > 0) {
                console.log(`✅ ${populated} yeni keyword eklendi`);
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown";
            errors.push(`Keyword populate: ${msg}`);
        }

        // Adım 1: Topic discovery
        let discovered = 0;
        try {
            const result = await discoverTopicsFromKeywords();
            discovered = result.newTopics;
            console.log(`✅ ${discovered} yeni topic keşfedildi (${result.keywordsProcessed} keyword tarandı)`);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown";
            errors.push(`Topic discovery: ${msg}`);
        }

        // Adım 2: Auto-approve
        let approved = 0;
        try {
            approved = await autoApproveTopics(PER_RUN_LIMIT);
            console.log(`✅ ${approved} topic onaylandı`);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown";
            errors.push(`Auto-approve: ${msg}`);
        }

        // Adım 3: Article generation
        let generated = 0;
        const approvedTopics = await getTopics("approved");
        const remainingSlots = Math.min(
            PER_RUN_LIMIT,
            DAILY_LIMIT - todayCount
        );

        for (const topic of approvedTopics.slice(0, remainingSlots)) {
            try {
                await generateArticle(topic);
                generated++;
                console.log(`✅ Makale üretildi: ${topic.original_title}`);
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Unknown";
                errors.push(`Generate (${topic.original_title}): ${msg}`);
            }
        }

        const durationMs = Date.now() - startTime;

        // Otomasyon logu kaydet
        await logAutomationRun({
            discovered,
            approved,
            generated,
            errors,
            duration_ms: durationMs,
            status: errors.length === 0 ? "success" : generated > 0 ? "partial" : "failed",
        });

        return NextResponse.json({
            success: true,
            populated,
            discovered,
            approved,
            generated,
            dailyLimit: DAILY_LIMIT,
            todayTotal: todayCount + generated,
            errors: errors.length > 0 ? errors : undefined,
            duration_ms: durationMs,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";

        await logAutomationRun({
            discovered: 0,
            approved: 0,
            generated: 0,
            errors: [message],
            duration_ms: Date.now() - startTime,
            status: "failed",
        });

        return NextResponse.json({ error: message }, { status: 500 });
    }
}

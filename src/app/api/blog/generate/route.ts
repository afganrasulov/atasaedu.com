import { NextResponse } from "next/server";
import { getTopics } from "@/lib/blog/blogService";
import { generateArticle } from "@/lib/blog/seoOptimizer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { topicId } = body;

        if (topicId) {
            // Tek bir konu için üretim
            const topics = await getTopics("approved");
            const topic = topics.find((t) => t.id === topicId);

            if (!topic) {
                return NextResponse.json(
                    { error: "Approved topic not found" },
                    { status: 404 }
                );
            }

            await generateArticle(topic);
            return NextResponse.json({
                success: true,
                message: `Article generated for: ${topic.original_title}`,
            });
        }

        // Tüm onaylı konular için üretim
        const approvedTopics = await getTopics("approved");

        if (approvedTopics.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No approved topics to generate",
                generated: 0,
            });
        }

        let generated = 0;
        const errors: string[] = [];

        for (const topic of approvedTopics) {
            try {
                await generateArticle(topic);
                generated++;
            } catch (err) {
                const msg =
                    err instanceof Error ? err.message : "Unknown error";
                errors.push(`${topic.original_title}: ${msg}`);
            }
        }

        return NextResponse.json({
            success: true,
            generated,
            total: approvedTopics.length,
            errors: errors.length > 0 ? errors : undefined,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

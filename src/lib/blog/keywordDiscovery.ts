import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getBlogClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { db: { schema: "atasa_edu" } }
    );
}

// ─── Keyword Auto-Populate ──────────────────────────────────

const KEYWORD_PROMPT = `Sen Türkiye'deki bir eğitim danışmanlık şirketinin SEO uzmanısın.
Şirket: Atasa Education
Hizmetler:
- Yabancı öğrencilere Türkiye'de üniversite başvuru danışmanlığı
- Yabancılara çalışma izni alma/uzatma/transfer
- Yabancılara ikamet izni
- Yabancılara şirket kuruluşu danışmanlığı
- Yabancılara vatandaşlık başvurusu

ÖRNEK ODAK KELİMELER:
- "türkiye'de üniversite okumak"
- "yabancılara çalışma izni nasıl alınır"
- "türkiye'de şirket kurmak 2025"
- "ikamet izni başvurusu"
- "yabancı öğrenci burs imkanları"

YASAK KONULAR:
- Genel turizm/gezi rehberi
- Türk mutfağı tarifleri
- Siyasi konular
- Kişisel blog/günlük tarzı yazılar

Görev: 5 adet long-tail SEO anahtar kelime üret. Bunlar:
- Türkçe olmalı
- Konuşma diliyle aranabilir olmalı
- Hizmet alanlarıyla doğrudan ilgili olmalı
- Google'da aranma potansiyeli yüksek olmalı

Yanıtı SADECE JSON array olarak ver:
["kelime 1", "kelime 2", "kelime 3", "kelime 4", "kelime 5"]`;

/**
 * Aktif keyword sayısı eşiğin altındaysa AI ile yeni keyword'ler üretir.
 */
export async function autoPopulateKeywords(
    minThreshold = 5
): Promise<number> {
    const db = getBlogClient();

    // Aktif keyword sayısını kontrol et
    const { count } = await db
        .from("keywords")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

    if ((count ?? 0) >= minThreshold) {
        return 0; // Yeterli keyword var
    }

    // AI'dan yeni keyword'ler iste
    const response = await openai.chat.completions.create({
        model: "gpt-5-mini",
        temperature: 0.7,
        messages: [
            { role: "system", content: "Sen bir SEO uzmanısın. Sadece JSON döndür." },
            { role: "user", content: KEYWORD_PROMPT },
        ],
    });

    let rawText = response.choices[0]?.message?.content?.trim() ?? "[]";
    if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const newKeywords: string[] = JSON.parse(rawText);
    let added = 0;

    for (const kw of newKeywords) {
        const keyword = kw.toLowerCase().trim();
        const { error } = await db
            .from("keywords")
            .insert({ keyword })
            .select();

        if (!error) added++;
        // UNIQUE constraint varsa sessizce atla
    }

    return added;
}

// ─── Topic Discovery (AI + Web Search) ─────────────────────

const TOPIC_DISCOVERY_PROMPT = `Sen Atasa Education için konu araştırmacısısın.
Şirket: Türkiye'deki yabancı öğrenciler ve yabancılar için eğitim + yasal danışmanlık hizmeti veriyor.

Hizmet alanları:
- Türkiye'de üniversite eğitimi (başvuru, kabul, burs)
- Çalışma izni (alma, uzatma, transfer, bakıcı)
- İkamet izni
- Şirket kuruluşu
- Vatandaşlık

YASAK KONULAR:
- Genel turizm/gezi rehberi (sadece öğrenci yaşamıyla ilgiliyse uygun)
- Türk mutfağı
- Siyasi konular
- Hizmet alanlarıyla ilgisi olmayan konular

Görev: Verilen anahtar kelime için web araştırması yap ve 3-5 blog konusu öner.
Her konunun:
- title: Blog başlığı (Türkçe, SEO uyumlu, 50-60 karakter)
- description: Kısa açıklama
- score: 1-100 arası alakalılık + arama potansiyeli skoru

SADECE JSON dizisi döndür:
[{"title": "...", "description": "...", "score": 85}]`;

/**
 * Aktif keyword'ler için AI destekli topic keşfi yapar.
 */
export async function discoverTopicsFromKeywords(): Promise<{
    keywordsProcessed: number;
    newTopics: number;
}> {
    const db = getBlogClient();
    const SCORE_THRESHOLD = 50;

    // Aktif keyword'leri çek
    const { data: keywords } = await db
        .from("keywords")
        .select("*")
        .eq("is_active", true);

    if (!keywords || keywords.length === 0) {
        return { keywordsProcessed: 0, newTopics: 0 };
    }

    let newTopics = 0;

    for (const keyword of keywords) {
        try {
            const response = await openai.responses.create({
                model: "gpt-4o",
                tools: [{ type: "web_search_preview" }],
                instructions: TOPIC_DISCOVERY_PROMPT,
                input: `Anahtar kelime: "${keyword.keyword}"\n\nBu kelime hakkında web'de güncel araştırma yap ve blog konusu öner.`,
            });

            const textOutput = response.output.find(
                (o) => o.type === "message"
            );
            if (!textOutput || textOutput.type !== "message") continue;

            const textContent = textOutput.content.find(
                (c) => c.type === "output_text"
            );
            if (!textContent || textContent.type !== "output_text") continue;

            let rawText = textContent.text.trim();
            if (rawText.startsWith("```")) {
                rawText = rawText
                    .replace(/^```(?:json)?\n?/, "")
                    .replace(/\n?```$/, "");
            }

            const topics: Array<{ title: string; description: string; score: number }> =
                JSON.parse(rawText);

            for (const topic of topics) {
                if (topic.score < SCORE_THRESHOLD) continue;

                // Aynı başlık zaten var mı kontrol et
                const { data: existing } = await db
                    .from("topics")
                    .select("id")
                    .eq("original_title", topic.title)
                    .single();

                if (existing) continue;

                const { error } = await db.from("topics").insert({
                    keyword_id: keyword.id,
                    source_id: null,
                    original_url: "",
                    original_title: topic.title,
                    status: "discovered",
                });

                if (!error) newTopics++;
            }
        } catch (err) {
            console.error(`Keyword discovery error (${keyword.keyword}):`, err);
        }
    }

    return { keywordsProcessed: keywords.length, newTopics };
}

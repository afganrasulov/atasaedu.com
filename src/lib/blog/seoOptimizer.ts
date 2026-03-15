import OpenAI from "openai";
import { scrapeArticleContent } from "./blogScraper";
import {
    createPost,
    updateTopicStatus,
    type BlogTopic,
} from "./blogService";
import { generateOgImage } from "./ogImageGenerator";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MAX_RETRIES = 2;

/** Truncated JSON'ı onarmaya çalışır — eksik kapanış bracket/brace ekler */
function repairTruncatedJson(text: string): string {
    try {
        JSON.parse(text);
        return text; // Zaten geçerli
    } catch {
        // Eksik kapanış karakterlerini say ve ekle
        let openBraces = 0;
        let openBrackets = 0;
        let inString = false;
        let escape = false;

        for (const ch of text) {
            if (escape) { escape = false; continue; }
            if (ch === '\\') { escape = true; continue; }
            if (ch === '"') { inString = !inString; continue; }
            if (inString) continue;
            if (ch === '{') openBraces++;
            if (ch === '}') openBraces--;
            if (ch === '[') openBrackets++;
            if (ch === ']') openBrackets--;
        }

        // String içinde kesildiyse kapat
        if (inString) text += '"';

        // Eksik kapanışları ekle
        for (let i = 0; i < openBrackets; i++) text += ']';
        for (let i = 0; i < openBraces; i++) text += '}';

        return text;
    }
}

interface GeneratedArticle {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    metaDescription: string;
    keywords: string[];
    category: string;
    faq: Array<{ question: string; answer: string }>;
    seoScore: number;
}

/**
 * Onaylanan bir konu için tam SEO makale üretir.
 *
 * Akış:
 * 1. Orijinal makaleyi scrape et (ilham kaynağı)
 * 2. OpenAI web_search ile ek araştırma yap
 * 3. Tüm bilgileri birleştirip orijinal SEO makale üret
 */
export async function generateArticle(
    topic: BlogTopic
): Promise<void> {
    await updateTopicStatus(topic.id, "generating");

    try {
        // 1. Orijinal içeriği çek
        const originalContent = await scrapeArticleContent(topic.original_url);
        const sourceContext = originalContent
            ? `\n\nİlham Kaynağı Makale (başlık: "${originalContent.title}"):\n${originalContent.content.slice(0, 3000)}`
            : "";

        // 2. OpenAI ile araştırma + makale üretimi (retry destekli)
        let article: GeneratedArticle | null = null;

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                const response = await openai.responses.create({
                    model: "gpt-5-mini",
                    tools: [{ type: "web_search_preview" }],
                    instructions: SEO_SYSTEM_PROMPT,
                    input: `
Konu: "${topic.original_title}"
${sourceContext}

Bu konu hakkında web'de kapsamlı bir araştırma yap. Birden fazla güvenilir kaynaktan bilgi topla.
Ardından aşağıdaki JSON formatında tam bir SEO makale üret.

Yanıtı SADECE geçerli JSON olarak ver, başka hiçbir metin ekleme:
{
  "title": "SEO uyumlu başlık (50-60 karakter, Türkçe)",
  "slug": "url-uyumlu-slug-turkce",
  "excerpt": "Kısa özet (150-200 karakter)",
  "content": "Tam makale içeriği Markdown formatında (minimum 1500 kelime, H2/H3 başlıklar, listeler, önemli bilgiler bold)",
  "metaDescription": "Meta açıklama (150-160 karakter, CTA içerir)",
  "keywords": ["anahtar", "kelimeler", "listesi"],
  "category": "Kategori (Türkiye'de Yaşam / Üniversite Bölümleri / Türkiye'de Eğitim / Kişisel Gelişim)",
  "faq": [
    {"question": "Soru 1?", "answer": "Cevap 1"},
    {"question": "Soru 2?", "answer": "Cevap 2"},
    {"question": "Soru 3?", "answer": "Cevap 3"}
  ],
  "seoScore": 85
}
`,
                });

                // Parse response
                const textOutput = response.output.find(
                    (o) => o.type === "message"
                );
                if (!textOutput || textOutput.type !== "message") {
                    throw new Error("OpenAI response has no text output");
                }

                const textContent = textOutput.content.find(
                    (c) => c.type === "output_text"
                );
                if (!textContent || textContent.type !== "output_text") {
                    throw new Error("OpenAI response has no text content");
                }

                let rawText = textContent.text.trim();

                // JSON markdown bloğu varsa temizle
                if (rawText.startsWith("```")) {
                    rawText = rawText
                        .replace(/^```(?:json)?\n?/, "")
                        .replace(/\n?```$/, "");
                }

                // Truncated JSON repair: eksik kapanış bracket/brace ekle
                rawText = repairTruncatedJson(rawText);

                article = JSON.parse(rawText) as GeneratedArticle;
                break; // Başarılı — döngüden çık
            } catch (parseErr) {
                if (attempt < MAX_RETRIES) {
                    console.log(`⚠️ JSON parse hatası, retry ${attempt + 1}/${MAX_RETRIES}...`);
                    continue;
                }
                throw parseErr;
            }
        }

        if (!article) {
            throw new Error("Article generation failed after all retries");
        }

        // 3. Schema.org markup oluştur
        const schemaMarkup = buildSchemaMarkup(article);

        // 4. FAQ bölümünü content'e ekle
        const contentWithFaq = appendFaqToContent(
            article.content,
            article.faq
        );

        // 5. OG görsel üret (opsiyonel — hata olursa null)
        const imageUrl = await generateOgImage(article.title, article.slug);

        // 6. Supabase'e kaydet
        await createPost({
            topic_id: topic.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: contentWithFaq,
            meta_description: article.metaDescription,
            keywords: article.keywords,
            schema_markup: schemaMarkup,
            category: article.category,
            image_url: imageUrl,
            seo_score: article.seoScore,
            published_at: new Date().toISOString(),
        });

        await updateTopicStatus(topic.id, "published");
    } catch (err) {
        await updateTopicStatus(topic.id, "failed");
        throw err;
    }
}

/** FAQ bölümünü makale sonuna ekler */
function appendFaqToContent(
    content: string,
    faq: Array<{ question: string; answer: string }>
): string {
    if (!faq || faq.length === 0) return content;

    const faqSection = `\n\n## Sıkça Sorulan Sorular (SSS)\n\n${faq
        .map(
            (item) =>
                `### ${item.question}\n\n${item.answer}`
        )
        .join("\n\n")}`;

    return content + faqSection;
}

/** Schema.org JSON-LD oluşturur */
function buildSchemaMarkup(
    article: GeneratedArticle
): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline: article.title,
                description: article.metaDescription,
                keywords: article.keywords.join(", "),
                author: {
                    "@type": "Organization",
                    name: "Atasa Education",
                    url: "https://atasaedu.com",
                },
                publisher: {
                    "@type": "Organization",
                    name: "Atasa Education",
                    url: "https://atasaedu.com",
                },
                mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://atasaedu.com/blog/${article.slug}`,
                },
            },
            ...(article.faq.length > 0
                ? [
                    {
                        "@type": "FAQPage",
                        mainEntity: article.faq.map((item) => ({
                            "@type": "Question",
                            name: item.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: item.answer,
                            },
                        })),
                    },
                ]
                : []),
        ],
    };
}

const SEO_SYSTEM_PROMPT = `Sen bir SEO uzmanısın. Türkiye'de eğitim almak isteyen uluslararası öğrenciler için Türkçe blog yazıları üretiyorsun.

KURALLAR:
1. İçerik %100 orijinal olmalı — asla kopyala-yapıştır yapma
2. Minimum 1500 kelime
3. Birden fazla güvenilir kaynaktan bilgi topla ve sentezle
4. Türkçe yaz, akıcı ve doğal bir dille
5. SEO uyumlu başlık yapısı kullan (H2, H3)
6. Önemli bilgileri kalın (bold) yap
7. Listeler ve tablolar kullan
8. İç linkler için atasaedu.com referansları ekle
9. Her makalenin sonunda 3-5 SSS (FAQ) ekle
10. E-E-A-T sinyallerini güçlendir (kaynak göster, uzman görüşleri ekle)

AI SEO İÇİN:
- Direkt cevap veren cümleler kullan (AI alıntılama için)
- "Türkiye'de X yapmak için Y adımı izlemeniz gerekir" gibi net ifadeler
- Yapılandırılmış veri için uygun JSON-LD düşün

HEDEF KİTLE: Türkiye'de üniversite okumak isteyen yabancı öğrenciler ve aileleri.
MARKA: Atasa Education — Türkiye'de eğitim danışmanlığı.`;

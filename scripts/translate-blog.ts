import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// ── Config ──────────────────────────────────────────────────────────────────
const MODEL = "gpt-5-mini";
const TARGET_LOCALES = ["en", "ar", "fa", "fr"];
const PER_RUN_LIMIT = 5; // Her çalıştırmada max çevrilecek makale

const LOCALE_NAMES: Record<string, string> = {
    en: "English",
    ar: "Arabic",
    fa: "Persian (Farsi)",
    fr: "French",
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getBlogClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { db: { schema: "atasa_edu" } }
    );
}

// ── System Prompt ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert SEO content translator for "Atasa Education", an education consultancy company based in Turkey.
You translate Turkish blog articles into other languages while maintaining SEO value.

TRANSLATION RULES:
- Translate naturally, not literally — adapt idioms and cultural expressions
- Use formal/professional tone appropriate for an education consultancy
- Keep brand names like "Atasa", "Atasa Education" untranslated
- Keep phone numbers, email addresses, and URLs as-is
- For Arabic and Persian: use proper RTL text

SEO KEYWORD OPTIMIZATION (CRITICAL):
- Use the most commonly searched terms in the target language, NOT literal translations
- Key terms mapping:
  * "çalışma izni" → EN: "work permit", AR: "تصريح العمل", FA: "مجوز کار", FR: "permis de travail"
  * "oturma izni" / "ikamet izni" → EN: "residence permit", AR: "تصريح الإقامة", FA: "اجازه اقامت", FR: "permis de séjour"
  * "şirket kuruluşu" → EN: "company formation", AR: "تأسيس شركة", FA: "ثبت شرکت", FR: "création d'entreprise"
  * "Türkiye'de eğitim" → EN: "study in Turkey", AR: "الدراسة في تركيا", FA: "تحصیل در ترکیه", FR: "études en Turquie"
  * "üniversite başvurusu" → EN: "university application", AR: "التقديم للجامعة", FA: "ثبت‌نام دانشگاه", FR: "candidature universitaire"
- For title and meta_description: prioritize high-volume search keywords
- Think like an SEO specialist in the target language

SLUG RULES:
- Generate a URL-friendly slug in the target language
- Use only ASCII lowercase letters and hyphens
- For Arabic/Persian: transliterate to Latin characters for the slug
- Slug must contain the main keyword

INTERNAL LINKS:
- Update any /blog/xxx links to include locale prefix: /LOCALE/blog/xxx
- Keep external links unchanged

FAQ TRANSLATION:
- Translate questions and answers naturally
- Use the most commonly searched question formats in the target language

OUTPUT FORMAT:
Return ONLY valid JSON, no markdown, no explanation:
{
  "title": "Translated SEO title",
  "slug": "translated-seo-slug",
  "excerpt": "Translated excerpt",
  "content": "Full translated content (maintain markdown/HTML formatting)",
  "meta_description": "Translated meta description (150-160 chars)",
  "keywords": ["translated", "keywords"],
  "faq": [{"question": "Q?", "answer": "A"}]
}`;

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
    const isDryRun = process.argv.includes("--dry-run");

    console.log("📝 Atasa Education — Blog Çeviri Pipeline");
    console.log("━".repeat(50));

    const db = getBlogClient();

    for (const locale of TARGET_LOCALES) {
        console.log(`\n🔍 ${LOCALE_NAMES[locale]} (${locale}) kontrol ediliyor...`);

        // Çevirisi eksik post'ları bul
        const { data: translated } = await db
            .from("post_translations")
            .select("post_id")
            .eq("locale", locale);

        const translatedIds = (translated ?? []).map((t: { post_id: string }) => t.post_id);

        let query = db
            .from("posts")
            .select("*")
            .not("published_at", "is", null)
            .order("published_at", { ascending: false });

        if (translatedIds.length > 0) {
            query = query.not("id", "in", `(${translatedIds.join(",")})`);
        }

        const { data: untranslated, error } = await query;

        if (error) {
            console.error(`   ❌ Hata: ${error.message}`);
            continue;
        }

        const posts = (untranslated ?? []).slice(0, PER_RUN_LIMIT);

        if (posts.length === 0) {
            console.log(`   ✅ Tüm makaleler çevrilmiş`);
            continue;
        }

        console.log(`   📋 ${posts.length} makale çevrilecek`);

        if (isDryRun) {
            posts.forEach((p: { title: string }) => console.log(`      - ${p.title}`));
            continue;
        }

        for (const post of posts) {
            try {
                console.log(`   🔄 Çevriliyor: "${post.title}" → ${locale}`);

                const response = await openai.chat.completions.create({
                    model: MODEL,
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        {
                            role: "user",
                            content: `Translate the following Turkish blog article to ${LOCALE_NAMES[locale]}.

TARGET LOCALE: ${locale}

ORIGINAL ARTICLE:
Title: ${post.title}
Slug: ${post.slug}
Excerpt: ${post.excerpt || ""}
Meta Description: ${post.meta_description || ""}
Keywords: ${(post.keywords || []).join(", ")}
Category: ${post.category || ""}

Content:
${post.content}

${post.faq ? `FAQ:\n${JSON.stringify(post.faq)}` : "No FAQ"}

Translate everything and return ONLY valid JSON.`,
                        },
                    ],
                });

                let rawText = response.choices[0]?.message?.content?.trim() ?? "";

                // JSON markdown bloğu temizle
                if (rawText.startsWith("```")) {
                    rawText = rawText
                        .replace(/^```(?:json)?\n?/, "")
                        .replace(/\n?```$/, "");
                }

                const translated = JSON.parse(rawText);

                // Schema markup oluştur
                const schemaMarkup = {
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Article",
                            headline: translated.title,
                            description: translated.meta_description,
                            keywords: translated.keywords?.join(", "),
                            inLanguage: locale,
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
                                "@id": `https://atasaedu.com/${locale}/blog/${translated.slug}`,
                            },
                        },
                        ...(translated.faq && translated.faq.length > 0
                            ? [
                                {
                                    "@type": "FAQPage",
                                    mainEntity: translated.faq.map(
                                        (item: { question: string; answer: string }) => ({
                                            "@type": "Question",
                                            name: item.question,
                                            acceptedAnswer: {
                                                "@type": "Answer",
                                                text: item.answer,
                                            },
                                        })
                                    ),
                                },
                            ]
                            : []),
                    ],
                };

                // Supabase'e kaydet
                const { error: insertError } = await db
                    .from("post_translations")
                    .upsert(
                        {
                            post_id: post.id,
                            locale,
                            title: translated.title,
                            slug: translated.slug,
                            excerpt: translated.excerpt || null,
                            content: translated.content,
                            meta_description: translated.meta_description || null,
                            keywords: translated.keywords || [],
                            faq: translated.faq || [],
                            schema_markup: schemaMarkup,
                            updated_at: new Date().toISOString(),
                        },
                        { onConflict: "post_id,locale" }
                    );

                if (insertError) {
                    console.error(`   ❌ Kayıt hatası: ${insertError.message}`);
                } else {
                    console.log(`   ✅ Çevrildi: "${translated.title}" (${translated.slug})`);
                }
            } catch (err) {
                console.error(`   ❌ Çeviri hatası (${post.title}):`, err);
            }
        }
    }

    console.log("\n" + "━".repeat(50));
    console.log("✅ Blog çeviri pipeline tamamlandı!");
}

main().catch(console.error);

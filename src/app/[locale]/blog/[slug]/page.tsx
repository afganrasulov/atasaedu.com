import { Container } from "@/shared/components/ui/Container";
import { getPostBySlug, getTranslatedPost } from "@/lib/blog/blogService";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface BlogPostPageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const t = await getTranslations("blogDetailPage");
    const { slug, locale } = await params;

    // Türkçe dışı dillerde çevrilmiş post'u ara
    const translatedPost = locale !== "tr" ? await getTranslatedPost(slug, locale) : null;
    const post = translatedPost ?? await getPostBySlug(slug);

    if (!post) return { title: t("notFoundTitle") };

    const BASE_URL = "https://atasaedu.com";

    return {
        title: `${post.title} | Atasa Education Blog`,
        description: post.meta_description,
        keywords: post.keywords,
        openGraph: {
            title: post.title,
            description: post.meta_description ?? undefined,
            type: "article",
            locale,
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}/blog/${slug}`,
            languages: {
                tr: `${BASE_URL}/tr/blog/${slug}`,
                en: `${BASE_URL}/en/blog/${slug}`,
                ar: `${BASE_URL}/ar/blog/${slug}`,
                fa: `${BASE_URL}/fa/blog/${slug}`,
                fr: `${BASE_URL}/fr/blog/${slug}`,
            },
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const t = await getTranslations("blogDetailPage");
    const { slug, locale } = await params;

    // Türkçe dışı dillerde çevrilmiş post'u ara, yoksa orijinali kullan
    const translatedPost = locale !== "tr" ? await getTranslatedPost(slug, locale) : null;
    const originalPost = await getPostBySlug(translatedPost ? "" : slug);
    const post = translatedPost ?? originalPost;

    if (!post) notFound();

    // Okuma süresi tahmini
    const wordCount = post.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <>
            {/* Schema.org JSON-LD */}
            {post.schema_markup && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(post.schema_markup),
                    }}
                />
            )}

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#0047BB] via-[#0055D4] to-[#2979FF] py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
                </div>

                <Container>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">{t("blogReturnLink")}</span>
                        </Link>

                        {"category" in post && post.category && (
                            <span className="inline-block bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                {post.category as string}
                            </span>
                        )}

                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {"published_at" in post && post.published_at
                                        ? new Date(post.published_at as string).toLocaleDateString(
                                            locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-SA" : locale === "fa" ? "fa-IR" : locale === "fr" ? "fr-FR" : "en-US",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )
                                        : ""}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{readTime} {t("readingTimeSuffix")}</span>
                            </div>
                            {post.keywords.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <Tag className="w-4 h-4" />
                                    <span>{post.keywords.slice(0, 3).join(", ")}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Content */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        {/* Excerpt/Lead */}
                        <p className="text-xl text-gray-600 leading-relaxed mb-12 pb-12 border-b border-gray-100 font-medium">
                            {post.excerpt}
                        </p>

                        {/* Markdown Content */}
                        <article
                            className="prose prose-lg prose-slate max-w-none
                prose-headings:text-[#152239] prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-[#0055D4] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#152239]
                prose-ul:my-6 prose-li:text-gray-600
                prose-blockquote:border-l-[#0055D4] prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
              "
                            dangerouslySetInnerHTML={{
                                __html: markdownToHtml(post.content),
                            }}
                        />

                        {/* Keywords */}
                        {post.keywords.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                    {t("tagsTitle")}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.keywords.map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-16 bg-gradient-to-br from-[#0047BB] to-[#2979FF] rounded-3xl p-10 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {t("ctaTitle")}
                            </h3>
                            <p className="text-white/80 mb-8 max-w-lg mx-auto">
                                {t("ctaDescription")}
                            </p>
                            <Link
                                href="/basvuru"
                                className="inline-flex items-center space-x-2 bg-white text-[#0055D4] px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <span>{t("ctaButton")}</span>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}

/** Basit Markdown 14 HTML d F6n FC5Ft FCr FCc FC (server-side) */
function markdownToHtml(markdown: string): string {
    return markdown
        // Headers
        .replace(/^### (.+)$/gm, "<h3>$1</h3>")
        .replace(/^## (.+)$/gm, "<h2>$1</h2>")
        .replace(/^# (.+)$/gm, "<h1>$1</h1>")
        // Bold & Italic
        .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        // Links
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        // Unordered lists
        .replace(/^- (.+)$/gm, "<li>$1</li>")
        .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
        // Ordered lists
        .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
        // Blockquotes
        .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
        // Horizontal rules
        .replace(/^---$/gm, "<hr>")
        // Paragraphs (lines that are not already wrapped)
        .replace(/^(?!<[h|u|o|l|b|hr])(.*\S.*)$/gm, "<p>$1</p>")
        // Clean up double line breaks
        .replace(/\n{2,}/g, "\n");
}

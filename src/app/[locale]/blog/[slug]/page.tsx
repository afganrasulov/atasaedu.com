import { Container } from "@/shared/components/ui/Container";
import { getPostBySlug, getTranslatedPost } from "@/lib/blog/blogService";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import "@/app/blog-theme.css";
import { BlogDetailClient } from "@/features/blog/components/BlogDetailClient";

interface BlogPostPageProps {
    params: Promise<{ slug: string; locale: string }>;
}

/** Güvenli domainler — sadece bunlar korunur, diğerleri düz metne dönüşür */
const SAFE_DOMAINS = [".gov.tr", ".edu.tr", "atasaedu.com", "turkiyeburslari.gov.tr"];

/**
 * İçerik güvenlik filtresi + SEO keyword highlight + heading ID ekleme
 */
function processContent(html: string, keywords: string[]): string {
    let processed = html;

    // 1. Harici linkleri filtrele — sadece güvenli domainler kalsın
    processed = processed.replace(
        /<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*?)>(.*?)<\/a>/gi,
        (match, _pre, url, _post, text) => {
            const isSafe = SAFE_DOMAINS.some((d) => url.includes(d));
            if (isSafe) return match;
            return text;
        }
    );

    // 2. H2/H3'lere id attribute ekle (ToC anchor için)
    processed = processed.replace(
        /<(h[23])>(.*?)<\/\1>/gi,
        (_match, tag, content) => {
            const plainText = content.replace(/<[^>]+>/g, "").trim();
            const id = plainText
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-")
                .substring(0, 60);
            return `<${tag} id="${id}">${content}</${tag}>`;
        }
    );

    // 3. İlk keyword geçişini vurgula
    if (keywords.length > 0) {
        const primaryKeyword = keywords[0];
        const escapedKw = primaryKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        // HTML tag'ları dışında ilk geçişi bul
        let found = false;
        processed = processed.replace(
            new RegExp(`(>)([^<]*?)\\b(${escapedKw})\\b`, "i"),
            (_match, gt, before, kw) => {
                if (found) return _match;
                found = true;
                return `${gt}${before}<span class="keyword-highlight">${kw}</span>`;
            }
        );
    }

    return processed;
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const t = await getTranslations("blogDetailPage");
    const { slug, locale } = await params;

    const translatedPost =
        locale !== "tr" ? await getTranslatedPost(slug, locale) : null;
    const post = translatedPost ?? (await getPostBySlug(slug));

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

    const translatedPost =
        locale !== "tr" ? await getTranslatedPost(slug, locale) : null;
    const originalPost = await getPostBySlug(translatedPost ? "" : slug);
    const post = translatedPost ?? originalPost;

    if (!post) notFound();

    const wordCount = post.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const processedContent = processContent(post.content, post.keywords);
    const categoryName = "category" in post && post.category ? (post.category as string) : "Blog";

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

            {/* Breadcrumb JSON-LD — SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: `https://atasaedu.com/${locale}` },
                            { "@type": "ListItem", position: 2, name: "Blog", item: `https://atasaedu.com/${locale}/blog` },
                            { "@type": "ListItem", position: 3, name: post.title },
                        ],
                    }),
                }}
            />

            {/* Breadcrumb Navigation */}
            <section style={{ background: "#F7F5F2", borderBottom: "1px solid #E8E0D8", padding: "0.75rem 0" }}>
                <Container>
                    <nav
                        aria-label="Breadcrumb"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                            fontFamily: "'Inter', sans-serif",
                            color: "#78716C",
                        }}
                    >
                        <Link href={`/${locale}`} style={{ color: "#78716C", textDecoration: "none" }}>Home</Link>
                        <ChevronRight className="w-3.5 h-3.5" style={{ color: "#A8A29E" }} />
                        <Link href={`/${locale}/blog`} style={{ color: "#78716C", textDecoration: "none" }}>Blog</Link>
                        <ChevronRight className="w-3.5 h-3.5" style={{ color: "#A8A29E" }} />
                        <span style={{ color: "#D97706", fontWeight: 500 }}>{categoryName}</span>
                    </nav>
                </Container>
            </section>

            {/* Hero — Warm editorial style with scribble */}
            <section
                className="relative blog-dot-pattern blog-grain"
                style={{
                    background: "linear-gradient(135deg, #FFFBF5 0%, #FFF7ED 50%, #FFFBF5 100%)",
                    paddingTop: "3rem",
                    paddingBottom: "3rem",
                }}
            >
                <Container>
                    <div
                        className="blog-layout-grid relative z-10"
                        style={{
                            maxWidth: "1100px",
                            margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "1fr 280px",
                            gap: "3rem",
                            alignItems: "center",
                        }}
                    >
                        {/* Sol: Başlık + Meta */}
                        <div>
                            {"category" in post && post.category && (
                                <span
                                    style={{
                                        display: "inline-block",
                                        background: "linear-gradient(135deg, #D97706, #F59E0B)",
                                        color: "white",
                                        padding: "0.375rem 1rem",
                                        borderRadius: "9999px",
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        marginBottom: "1.5rem",
                                        fontFamily: "'Inter', sans-serif",
                                        letterSpacing: "0.03em",
                                    }}
                                >
                                    {post.category as string}
                                </span>
                            )}

                            <h1
                                className="blog-hero-title blog-fade-up"
                                style={{
                                    fontSize: "clamp(2rem, 5vw, 3.25rem)",
                                    color: "#1C1917",
                                    marginBottom: "2rem",
                                }}
                            >
                                {post.title}
                            </h1>

                            <div
                                className="blog-fade-up"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    gap: "1.5rem",
                                    fontSize: "0.875rem",
                                    fontFamily: "'Inter', sans-serif",
                                    color: "#92400E",
                                    opacity: 0.8,
                                    animationDelay: "0.15s",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {"published_at" in post && post.published_at
                                            ? new Date(post.published_at as string).toLocaleDateString(
                                                locale === "tr" ? "tr-TR"
                                                    : locale === "ar" ? "ar-SA"
                                                        : locale === "fa" ? "fa-IR"
                                                            : locale === "fr" ? "fr-FR" : "en-US",
                                                { day: "numeric", month: "long", year: "numeric" }
                                            )
                                            : ""}
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <Clock className="w-4 h-4" />
                                    <span>{readTime} {t("readingTimeSuffix")}</span>
                                </div>
                                {post.keywords.length > 0 && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Tag className="w-4 h-4" />
                                        <span>{post.keywords.slice(0, 3).join(", ")}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sağ: Notion-style scribble illustration */}
                        <div className="blog-hero-scribble" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Image
                                src="/images/blog-scribble-default.png"
                                alt="Blog illustration"
                                width={280}
                                height={280}
                                style={{ opacity: 0.6, maxWidth: "100%", height: "auto" }}
                                priority
                            />
                        </div>
                    </div>
                </Container>

                {/* Decorative amber line */}
                <div
                    className="blog-shimmer"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, transparent, #D97706, #F59E0B, #D97706, transparent)",
                        backgroundSize: "200% 100%",
                    }}
                />
            </section>

            {/* Content — Editoryal layout */}
            <section className="blog-editorial" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
                <Container>
                    <BlogDetailClient
                        processedContent={processedContent}
                        rawContent={post.content}
                        title={post.title}
                        slug={post.slug}
                        keywords={post.keywords}
                        excerpt={post.excerpt ?? ""}
                        ctaTitle={t("ctaTitle")}
                        ctaDescription={t("ctaDescription")}
                        ctaButton={t("ctaButton")}
                        tagsTitle={t("tagsTitle")}
                    />
                </Container>
            </section>
        </>
    );
}

"use client";

import { TableOfContents } from "./TableOfContents";
import { BlogFAQ } from "./BlogFAQ";
import { ShareButtons } from "./ShareButtons";
import Link from "next/link";

interface BlogDetailClientProps {
    processedContent: string;
    rawContent: string;
    title: string;
    slug: string;
    keywords: string[];
    excerpt: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    tagsTitle: string;
}

export function BlogDetailClient({
    processedContent,
    rawContent,
    title,
    slug,
    keywords,
    excerpt,
    ctaTitle,
    ctaDescription,
    ctaButton,
    tagsTitle,
}: BlogDetailClientProps) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 280px",
                gap: "3rem",
                maxWidth: "1100px",
                margin: "0 auto",
            }}
            className="blog-layout-grid"
        >
            {/* Main Article */}
            <div>
                {/* Excerpt / Lead */}
                {excerpt && (
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "#6B6560",
                            lineHeight: 1.7,
                            marginBottom: "2.5rem",
                            paddingBottom: "2rem",
                            borderBottom: "1px solid #E8E0D8",
                            fontFamily: "'Source Serif 4', Georgia, serif",
                            fontWeight: 400,
                        }}
                    >
                        {excerpt}
                    </p>
                )}

                {/* Article Content */}
                <article
                    className="blog-content blog-fade-up"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                />

                {/* FAQ Accordion — content'ten parse */}
                <BlogFAQ content={rawContent} />

                {/* Keywords */}
                {keywords.length > 0 && (
                    <div
                        style={{
                            marginTop: "3rem",
                            paddingTop: "1.5rem",
                            borderTop: "1px solid #E8E0D8",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                color: "#92400E",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                marginBottom: "1rem",
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            {tagsTitle}
                        </h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {keywords.map((keyword) => (
                                <span
                                    key={keyword}
                                    style={{
                                        background: "rgba(251, 191, 36, 0.1)",
                                        color: "#92400E",
                                        padding: "0.375rem 1rem",
                                        borderRadius: "9999px",
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                        fontFamily: "'Inter', sans-serif",
                                        border: "1px solid rgba(217, 119, 6, 0.15)",
                                    }}
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div
                    style={{
                        marginTop: "3rem",
                        background: "linear-gradient(135deg, #92400E, #D97706)",
                        borderRadius: "1.5rem",
                        padding: "2.5rem",
                        textAlign: "center",
                    }}
                >
                    <h3
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            color: "white",
                            marginBottom: "1rem",
                        }}
                    >
                        {ctaTitle}
                    </h3>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.8)",
                            marginBottom: "2rem",
                            maxWidth: "32rem",
                            margin: "0 auto 2rem",
                            fontFamily: "'Source Serif 4', serif",
                        }}
                    >
                        {ctaDescription}
                    </p>
                    <Link
                        href="/basvuru"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "white",
                            color: "#92400E",
                            padding: "1rem 2rem",
                            borderRadius: "1rem",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            textDecoration: "none",
                            fontFamily: "'Inter', sans-serif",
                            transition: "all 0.3s",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                        }}
                    >
                        {ctaButton}
                    </Link>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="blog-sidebar-wrapper">
                <div className="blog-sidebar" style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "sticky", top: "5px", maxHeight: "calc(100vh - 10px)", overflowY: "auto" }}>
                    {/* Table of Contents */}
                    <TableOfContents content={rawContent} />

                    {/* Divider */}
                    <div style={{ height: "1px", background: "#E8E0D8" }} />

                    {/* Share Buttons */}
                    <ShareButtons title={title} slug={slug} />

                    {/* Divider */}
                    <div style={{ height: "1px", background: "#E8E0D8" }} />

                    {/* Sidebar CTA — StudyFans inspired */}
                    <div
                        style={{
                            background: "linear-gradient(135deg, #92400E, #D97706)",
                            borderRadius: "1rem",
                            padding: "1.5rem",
                            textAlign: "center",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: "white",
                                marginBottom: "0.5rem",
                                lineHeight: 1.3,
                            }}
                        >
                            {ctaTitle}
                        </p>
                        <p
                            style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "0.85rem",
                                marginBottom: "1rem",
                                fontFamily: "'Source Serif 4', serif",
                            }}
                        >
                            {ctaDescription}
                        </p>
                        <Link
                            href="/basvuru"
                            style={{
                                display: "inline-block",
                                background: "white",
                                color: "#92400E",
                                padding: "0.6rem 1.5rem",
                                borderRadius: "0.75rem",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                textDecoration: "none",
                                fontFamily: "'Inter', sans-serif",
                                transition: "all 0.3s",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            }}
                        >
                            {ctaButton}
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
}

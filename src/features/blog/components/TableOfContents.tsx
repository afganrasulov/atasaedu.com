"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface TocItem {
    id: string;
    text: string;
    level: "h2" | "h3";
}

interface TableOfContentsProps {
    content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const t = useTranslations("tableOfContents");
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Parse H2/H3 from content HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const headings = doc.querySelectorAll("h2, h3");

        const tocItems: TocItem[] = [];
        headings.forEach((heading) => {
            const text = heading.textContent?.trim() ?? "";
            if (!text) return;

            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-")
                .substring(0, 60);

            tocItems.push({
                id,
                text,
                level: heading.tagName.toLowerCase() as "h2" | "h3",
            });
        });

        setItems(tocItems);
    }, [content]);

    // IntersectionObserver for active section
    useEffect(() => {
        if (items.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
        );

        for (const item of items) {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav
            className="blog-toc"
            aria-label={t("ariaLabel")}
            style={{
                background: "linear-gradient(145deg, #FFFAF0, #FFF7ED)",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid rgba(217, 119, 6, 0.12)",
                boxShadow: "0 4px 20px rgba(217, 119, 6, 0.06)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Dekoratif üst amber çizgi */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "1.5rem",
                    right: "1.5rem",
                    height: "3px",
                    background: "linear-gradient(90deg, #D97706, #F59E0B, #D97706)",
                    borderRadius: "0 0 2px 2px",
                }}
            />

            <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#92400E",
                marginBottom: "1rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(217, 119, 6, 0.12)",
                letterSpacing: "0.02em",
                textAlign: "left",
            }}>
                {t("heading")}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", maxHeight: "50vh", overflowY: "auto" }}>
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className={`blog-toc-link ${item.level === "h3" ? "blog-toc-link-h3" : ""} ${activeId === item.id ? "active" : ""}`}
                        style={{
                            background: "none",
                            cursor: "pointer",
                            border: "none",
                            textAlign: "left",
                            borderRadius: "0.375rem",
                        }}
                    >
                        {item.text}
                    </button>
                ))}
            </div>
        </nav>
    );
}

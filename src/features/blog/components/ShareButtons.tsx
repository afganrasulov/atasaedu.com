"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Twitter, Linkedin, Link2, Check, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
    title: string;
    slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
    const t = useTranslations("shareButtons");
    const [copied, setCopied] = useState(false);
    const url = `https://atasaedu.com/en/blog/${slug}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    const links = [
        {
            label: t("twitter"),
            icon: <Twitter size={16} />,
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        },
        {
            label: t("linkedIn"),
            icon: <Linkedin size={16} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            label: t("whatsapp"),
            icon: <MessageCircle size={16} />,
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        },
    ];

    return (
        <div>
            <h4
                style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#1C1917",
                    marginBottom: "0.75rem",
                }}
            >
                {t("heading")}
            </h4>
            <div style={{ display: "flex", gap: "0.5rem" }}>
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="blog-share-btn"
                        title={link.label}
                    >
                        {link.icon}
                    </a>
                ))}
                <button
                    onClick={handleCopy}
                    className="blog-share-btn"
                    title={t("copyLinkTitle")}
                >
                    {copied ? <Check size={16} color="#D97706" /> : <Link2 size={16} />}
                </button>
            </div>
        </div>
    );
}

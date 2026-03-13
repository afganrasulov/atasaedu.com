"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

interface FaqItem {
    question: string;
    answer: string;
}

interface BlogFAQProps {
    content: string;
}

/**
 * FAQ bölümünü blog content HTML'inden parse eder.
 * H2 "FAQ" veya "Frequently Asked Questions" içeren bölümden sonra
 * H3 → soru, p → cevap olarak alır.
 */
function parseFaqFromContent(content: string): FaqItem[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const allElements = Array.from(doc.body.children);

    let inFaqSection = false;
    const faqs: FaqItem[] = [];
    let currentQuestion = "";

    for (const el of allElements) {
        const tag = el.tagName.toLowerCase();
        const text = el.textContent?.trim() ?? "";

        // FAQ bölümünü bul
        if (tag === "h2" && /faq|frequently asked|sıkça sorulan/i.test(text)) {
            inFaqSection = true;
            continue;
        }

        // FAQ bölümünden çıkış (yeni H2)
        if (tag === "h2" && inFaqSection) {
            break;
        }

        if (!inFaqSection) continue;

        if (tag === "h3") {
            currentQuestion = text;
        } else if (tag === "p" && currentQuestion) {
            faqs.push({ question: currentQuestion, answer: text });
            currentQuestion = "";
        }
    }

    return faqs;
}

export function BlogFAQ({ content }: BlogFAQProps) {
    const t = useTranslations("blogFAQ");
    const faqs = parseFaqFromContent(content);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (faqs.length === 0) return null;

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // FAQPage JSON-LD Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <>
            {/* FAQPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="blog-fade-up" style={{ marginTop: "3rem" }}>
                <h2
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: "#1C1917",
                        marginBottom: "1.5rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid #E8E0D8",
                        position: "relative",
                    }}
                >
                    {t("faqTitle")}
                    <span
                        style={{
                            position: "absolute",
                            bottom: "-1px",
                            left: 0,
                            width: "60px",
                            height: "3px",
                            background: "linear-gradient(90deg, #D97706, #F59E0B)",
                            borderRadius: "2px",
                            display: "block",
                        }}
                    />
                </h2>

                <div>
                    {faqs.map((faq, index) => (
                        <div key={index} className="blog-faq-item">
                            <button
                                className="blog-faq-trigger"
                                onClick={() => toggle(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>
                                <ChevronDown />
                            </button>
                            {openIndex === index && (
                                <div className="blog-faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

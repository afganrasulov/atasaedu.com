"use client";

import { Container } from "@/shared/components/ui/Container";
import { Star, Quote, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function TestimonialSection() {
    const t = useTranslations("testimonials");

    const testimonials = [
        {
            text: `\u201c${t("review1")}\u201d`,
            name: t("review1Name"),
            department: t("review1Dept"),
            rating: 4.7,
        },
        {
            text: `\u201c${t("review2")}\u201d`,
            name: t("review2Name"),
            department: t("review2Dept"),
            rating: 5.0,
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <Container>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 justify-center">
                        <span className="w-12 h-[2px] bg-red-500" />
                        <span className="text-red-500 font-bold uppercase tracking-widest text-sm">{t("badge")}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#152239] tracking-tight">
                        {t("title")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-gray-50/80 p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-2 hover:bg-white transition-all duration-500 relative group overflow-hidden">
                            <Quote className="absolute -top-6 -right-6 w-32 h-32 text-blue-500/5 rotate-12 group-hover:text-blue-500/10 transition-colors duration-500" />

                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                <Quote className="w-6 h-6 fill-current" />
                            </div>

                            <p className="text-lg text-gray-600 font-medium mb-10 leading-relaxed relative z-10 italic">
                                {item.text}
                            </p>

                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <h3 className="font-bold text-xl text-[#152239] mb-1">{item.name}</h3>
                                    <p className="text-sm font-bold text-blue-600 tracking-wide">{item.department}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex text-yellow-400 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-black text-[#152239]">{item.rating} / 5.0</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Google Reviews Teaser Card */}
                <div className="max-w-5xl mx-auto mt-12">
                    <Link
                        href="/google-yorumlari"
                        className="group block bg-[#152239] rounded-[2.5rem] p-8 md:p-12 text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl md:text-6xl font-black tracking-tighter">4.9</span>
                                    <div className="flex text-yellow-400 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>
                                <div className="h-16 w-px bg-white/20 hidden md:block" />
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <BadgeCheck size={18} className="text-blue-400" />
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">Google Partner</span>
                                    </div>
                                    <p className="text-lg md:text-xl font-bold text-white/90">
                                        <span className="text-white font-black">1200+</span> {t("verifiedReviews")}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {t("readExperiences")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest group-hover:bg-blue-600 group-hover:border-blue-600 transition-all shrink-0">
                                {t("seeAllReviews")}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            </Container>
        </section>
    );
}

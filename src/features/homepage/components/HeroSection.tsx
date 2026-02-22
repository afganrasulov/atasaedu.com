"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Sparkles, GraduationCap, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";

const HERO_PHRASES = [
    "Sınavsız Üniversite Kaydı",
    "Garantili Kabul Süreci",
    "Hızlı İkamet İzni",
    "Yasal Danışmanlık Desteği",
    "Türkiye'de Eğitim Fırsatı"
];

// Shared Title Component to ensure perfect synchronization
const HeroTitle = ({ colorClass, isSpotlight = false, phraseIndex }: { colorClass: string, isSpotlight?: boolean, phraseIndex: number }) => (
    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1] ${!isSpotlight ? 'select-none' : ''} ${colorClass} flex flex-col items-center`}>
        <span className="block">Türkiye&apos;de</span>
        <span className="relative inline-block h-[1.3em] w-full">
            <AnimatePresence mode="wait">
                <motion.span
                    key={phraseIndex}
                    initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[#0056D2]"
                >
                    {HERO_PHRASES[phraseIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    </h1>
);

export function HeroSection() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [sectionMousePos, setSectionMousePos] = useState({ x: 0, y: 0 });
    const [isSectionHovered, setIsSectionHovered] = useState(false);

    const textRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (textRef.current) {
            const rect = textRef.current.getBoundingClientRect();
            setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleMouseLeave = () => {
        setCursorPos({ x: -100, y: -100 });
    };

    const handleSectionMouseMove = (e: React.MouseEvent) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setSectionMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleSectionMouseMove}
            onMouseEnter={() => setIsSectionHovered(true)}
            onMouseLeave={() => setIsSectionHovered(false)}
            className="relative min-h-[85vh] flex items-center bg-white overflow-hidden py-20 lg:py-32"
        >
            {/* Premium Light Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-sky-50 rounded-full blur-[150px] animate-pulse delay-1000" />

                {/* Dynamic Spotlight Effect */}
                <div
                    className="absolute inset-0 transition-opacity duration-500 ease-out z-10"
                    style={{
                        opacity: isSectionHovered ? 1 : 0,
                        background: `
                            radial-gradient(600px circle at ${sectionMousePos.x}px ${sectionMousePos.y}px, rgba(59, 130, 246, 0.08), transparent 40%),
                            radial-gradient(400px circle at ${sectionMousePos.x}px ${sectionMousePos.y}px, rgba(249, 115, 22, 0.04), transparent 40%)
                        `,
                    }}
                />

                {/* Dot Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-20" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-slate-900">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 shadow-sm"
                    >
                        <Sparkles size={16} className="text-blue-500" />
                        <span>Güvenilir Eğitim Danışmanlığı</span>
                    </motion.div>

                    <div
                        ref={textRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative max-w-5xl cursor-default"
                    >
                        <HeroTitle colorClass="text-slate-900" phraseIndex={phraseIndex} />

                        {/* Interactive Spotlight Effect for Light Theme */}
                        <div
                            className="absolute inset-0 pointer-events-none z-20 hidden md:block"
                            style={{
                                maskImage: `radial-gradient(circle 150px at ${cursorPos.x}px ${cursorPos.y}px, black 20%, transparent 100%)`,
                                WebkitMaskImage: `radial-gradient(circle 150px at ${cursorPos.x}px ${cursorPos.y}px, black 20%, transparent 100%)`,
                            }}
                        >
                            <HeroTitle colorClass="text-blue-600" isSpotlight phraseIndex={phraseIndex} />
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-2xl text-slate-600 max-w-3xl mb-12 font-medium leading-relaxed"
                    >
                        Binlerce öğrencinin tercihi. Hayalinizdeki üniversite eğitimine
                        <span className="text-blue-700 font-bold"> Atasa uzmanlığı </span>
                        ile sınavsız ve garantili başvuru süreçleriyle ulaşın.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <Link
                            href="/basvuru"
                            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full p-[2px] shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0055D4_0%,#ffffff_50%,#0055D4_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-blue-600 px-10 text-lg font-bold text-white backdrop-blur-3xl gap-3 transition-colors group-hover:bg-blue-700">
                                Hemen Başvur <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <Link
                            href="/hizmetlerimiz"
                            className="inline-flex h-16 items-center justify-center rounded-full bg-white border border-slate-200 px-10 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-blue-200 shadow-sm"
                        >
                            Hizmetlerimiz
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500"
                    >
                        <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                            <GraduationCap className="text-blue-600 w-6 h-6" />
                            <span className="text-sm font-black text-slate-600 tracking-widest uppercase">100+ Üniversite</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                            <ShieldCheck className="text-blue-600 w-6 h-6" />
                            <span className="text-sm font-black text-slate-600 tracking-widest uppercase">Yasal Güvence</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                            <Globe className="text-blue-600 w-6 h-6" />
                            <span className="text-sm font-black text-slate-600 tracking-widest uppercase">Global Destek</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Premium Trust Card - Light Theme */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hidden xl:block absolute top-[20%] right-[8%] z-20"
            >
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-indigo-100 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                    <div className="relative bg-white/80 border border-white p-7 rounded-3xl backdrop-blur-xl w-72 shadow-[0_20px_50px_-15px_rgba(0,85,212,0.15)]">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                <Star className="text-white fill-white w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-slate-900 leading-none">4.9/5</div>
                                <div className="text-[11px] font-black text-blue-600 uppercase tracking-tighter mt-1">Google Puanı</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6 italic">
                            "Türkiye'deki en profesyonel danışmanlık ekibi. Süreç beklediğimden çok daha hızlı ve kolay ilerledi."
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                                <div className="w-9 h-9 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[11px] font-black text-white shadow-sm">
                                    +1K
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Binlerce Memnun Öğrenci</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

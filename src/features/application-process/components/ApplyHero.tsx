"use client";

import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function ApplyHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center bg-white overflow-hidden py-20">
            {/* Premium Light Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[150px] animate-pulse delay-1000" />
                {/* Dot Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
            </div>

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 shadow-sm">
                            <Sparkles size={16} className="text-blue-500" />
                            <span>Geleceğinizi Birlikte Planlayalım</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                            Yabancı Uyruklu Öğrenciler Üniversiteye <br />
                            <span className="text-[#0056D2]">Nasıl Başvurabilir?</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-12 font-medium leading-relaxed max-w-3xl">
                            Yabancı Uyruklu Öğrenci olarak Üniversitelerimize
                            <span className="text-blue-700 font-bold"> ücretsiz başvuru </span>
                            yapabilmek için aşağıdaki 8 adımı takip edin!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="#apply-steps-sec"
                                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full p-[2px] shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0055D4_0%,#ffffff_50%,#0055D4_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-blue-600 px-8 text-base font-bold text-white backdrop-blur-3xl gap-2 transition-colors group-hover:bg-blue-700">
                                    Başvuru Süreçlerini Gör <span className="text-xl">↓</span>
                                </span>
                            </Link>

                            <Link
                                href="/basvuru"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-white border border-slate-200 px-8 text-base font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-blue-200 shadow-sm gap-2 group"
                            >
                                Hemen Başvur <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

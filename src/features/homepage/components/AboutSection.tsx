"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import { CheckCircle2, Users } from "lucide-react";
import Image from "next/image";

const benefits = [
    "Uluslararası standartlarda eğitim danışmanlığı",
    "Dünya çapında 500+ anlaşmalı üniversite",
    "Kişiye özel kariyer ve eğitim planlama",
    "Vize ve başvuru süreçlerinde tam destek"
];

export function AboutSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Main Image Container */}
                        <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group">
                            <Image
                                src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/about_img.png"
                                alt="About Atasa Education"
                                width={600}
                                height={700}
                                className="object-cover w-full h-[500px] md:h-[600px] grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        {/* Decorative background shape */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-400/10 rounded-full blur-3xl -z-10" />

                        {/* Floating Badge (5k+ Aktif Öğrenci) */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 md:-right-10 bg-white p-4 md:p-6 rounded-2xl shadow-xl z-20 border border-gray-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[#152239] font-black text-xl md:text-2xl leading-none">5k+</p>
                                    <p className="text-gray-500 font-medium text-sm">Aktif Öğrenci</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-12 h-[2px] bg-red-500" />
                            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">ATASA HAKKINDA</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-[#152239] leading-tight mb-6 tracking-tight">
                            Atasa Education'a Hoşgeldiniz
                        </h2>
                        <p className="text-lg text-gray-500 mb-8 leading-relaxed font-medium">
                            Atasa Education olarak, gençlerin hayallerindeki eğitimi alabilmeleri için profesyonel danışmanlık hizmeti sunuyoruz. Modern ve yenilikçi yaklaşımımızla, her öğrencinin potansiyelini en üst düzeye çıkaracak doğru üniversite ve bölüm seçiminde rehberlik ediyoruz.
                        </p>

                        <div className="space-y-4 mb-10">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700 font-semibold">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/30">
                            DAHA FAZLA BİLGİ EDİN
                        </button>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

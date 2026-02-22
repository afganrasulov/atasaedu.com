"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import { CheckCircle2, Users, GraduationCap, MapPin, Globe } from "lucide-react";
import Image from "next/image";

const benefits = [
    { text: "Uluslararası standartlarda eğitim danışmanlığı", icon: GraduationCap },
    { text: "Dünya çapında 500+ anlaşmalı üniversite", icon: Globe },
    { text: "Kişiye özel kariyer ve eğitim planlama", icon: Users },
    { text: "Vize ve başvuru süreçlerinde tam destek", icon: MapPin }
];

export function AboutSection() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
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
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(21,34,57,0.15)] border-8 border-white group">
                            <Image
                                src="/images/about_premium.png"
                                alt="Atasa Education - Geleceğin Liderlerini Şekillendiriyoruz"
                                width={600}
                                height={700}
                                className="object-cover w-full h-[500px] md:h-[650px] transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Overlay gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#152239]/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Decorative background shapes */}
                        <div className="absolute -top-12 -left-12 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl -z-10" />

                        {/* Floating Glass Badge (5k+ Aktif Öğrenci) */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-8 -right-4 md:-right-8 backdrop-blur-xl bg-white/80 p-5 md:p-7 rounded-[2rem] shadow-2xl z-20 border border-white/50"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                    <Users className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-[#152239] font-black text-2xl md:text-3xl leading-none">5.000+</p>
                                    <p className="text-gray-600 font-semibold text-sm mt-1">Mutlu Öğrenci</p>
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
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-12 h-[3px] bg-blue-600 rounded-full" />
                            <span className="text-blue-600 font-extrabold uppercase tracking-[0.2em] text-sm">Geleceğinize Açılan Kapı</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-[#152239] leading-[1.1] mb-8 tracking-tighter">
                            Hayallerinizdeki Eğitime <span className="text-blue-600">Atasa</span> ile Ulaşın
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                            Orta Doğu ve Orta Asya başta olmak üzere dünyanın dört bir yanından gelen öğrencilere Türkiye'nin ve dünyanın en iyi üniversitelerinde eğitim kapılarını aralıyoruz. Sınavsız geçiş ve %100 yerleştirme garantisiyle yanınızdayız.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                        {typeof benefit === 'string' ? <CheckCircle2 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" /> : <benefit.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />}
                                    </div>
                                    <span className="text-gray-800 font-bold text-sm leading-tight">{typeof benefit === 'string' ? benefit : benefit.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all duration-300 active:scale-95">
                                Ücretsiz Danışmanlık Al
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                            <div className="w-full h-full bg-blue-100" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-gray-500 italic">
                                    <span className="text-blue-600">+1200</span> başvuruda bulundular
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

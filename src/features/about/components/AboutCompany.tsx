"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Globe, Star } from "lucide-react";

export function AboutCompany() {
    return (
        <section className="py-24 bg-gray-50/30 relative overflow-hidden">
            {/* Dekoratif Arka Plan Elemanları (atasa.mobi stili) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0047BB]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-[#0047BB] font-bold mb-6">
                                <ShieldCheck size={18} />
                                <span className="text-[10px] uppercase tracking-widest font-black">Hikayemiz & Vizyonumuz</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-8">
                                Eğitimde <br /> <span className="text-[#0047BB]">Güvenilir</span> Rehberiniz
                            </h2>
                            <div className="w-20 h-1.5 bg-[#0047BB] rounded-full" />
                        </div>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                            <p>
                                2016 yılında İstanbul'un kalbinde başlayan yolculuğumuz, bugün Azerbaycan, Türkmenistan ve çok yakında Özbekistan'da uluslararası bir vizyona dönüştü.
                            </p>
                            <p className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm italic text-gray-900 border-l-4 border-l-[#0047BB]">
                                "Bugüne kadar binlerce öğrencinin hayalini gerçekleştirdik. Çünkü biz, geleceği aydınlatmak için eğitimin gücüne inananlardanız."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-600/5 transition-all"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0047BB] mb-4">
                                    <Globe size={24} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">Misyonumuz</h3>
                                <p className="text-sm text-gray-500 font-medium">Potansiyelini keşfetmek isteyen bireylere dünyayı daha iyi bir yer yapmaları için aracılık etmek.</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-600/5 transition-all"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
                                    <Star size={24} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">Vizyonumuz</h3>
                                <p className="text-sm text-gray-500 font-medium">Öğrencilerin gelişimini desteklemek ve başarı yolunda en güvenilir rehber olmak.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white group">
                            <Image
                                src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/about_img.png"
                                alt="Atasa Education Story"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Yüzen Bilgi Kartı */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-white max-w-[240px]"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 rounded-2xl bg-[#0047BB] flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-gray-900">5k+</div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mezun Öğrenci</div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 font-bold leading-relaxed">Binlerce hayali gerçeğe dönüştürmenin haklı gururunu yaşıyoruz.</p>
                        </motion.div>

                        {/* Mini Dekoratif Kart */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-500 rounded-3xl rotate-12 -z-10 blur-2xl opacity-30 animate-pulse" />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

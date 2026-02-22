"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import Link from "next/link";
import { PhoneCall, Play, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function AboutContact() {
    return (
        <section className="py-24 bg-gray-50/30 relative overflow-hidden">
            {/* Dekoratif Gradient Arka Planlar */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0047BB]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-[#0047BB] font-bold mb-8">
                            <ShieldCheck size={18} />
                            <span className="text-[10px] uppercase tracking-widest font-black">7/24 Destek Hattı</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            Geleceğinizi <br /> <span className="text-[#0047BB]">Birlikte</span> Planlayalım
                        </h2>

                        <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-lg font-medium">
                            Profesyonel eğitim danışmanlarımızla hemen iletişime geçin, Türkiye'deki eğitim ve yaşam sürecinizi en doğru şekilde yönetelim.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/iletisim" className="flex-1 sm:flex-none">
                                <button className="w-full sm:w-auto bg-[#0047BB] text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2">
                                    Bilgi Al <ArrowRight size={18} />
                                </button>
                            </Link>
                            <a href="tel:+908503086998" className="flex-1 sm:flex-none">
                                <button className="w-full sm:w-auto bg-white text-gray-900 border border-gray-100 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                    <PhoneCall size={18} className="text-[#0047BB]" /> Bizi Arayın
                                </button>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Video Thumbnail Area */}
                        <div className="relative aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl group border-8 border-white">
                            <Image
                                src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/hero_bg.png"
                                alt="Atasa Education Video Thumbnail"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors flex items-center justify-center">
                                <a
                                    href="https://www.youtube.com/watch?v=k6PX1aR3-hs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white cursor-pointer"
                                >
                                    <div className="w-16 h-16 bg-[#0047BB] rounded-full flex items-center justify-center text-white shadow-inner">
                                        <Play className="w-6 h-6 ml-1 fill-white" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Floating Stats or Label */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Güvenilir Danışmanlık</p>
                                    <p className="text-lg font-black text-gray-900">%100 Başvuru Takibi</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

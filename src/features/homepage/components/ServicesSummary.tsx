"use client";

import { Container } from "@/shared/components/ui/Container";
import { GraduationCap, Landmark, Globe, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    {
        title: "Kültürel Zenginlik",
        description: "Türkiye'nin eşsiz kültürel mozaiğinde eğitim alma fırsatı.",
        icon: Globe
    },
    {
        title: "Kaliteli Eğitim",
        description: "Uluslararası standartlarda üniversitelerde lisansüstü eğitim.",
        icon: GraduationCap
    },
    {
        title: "Ekonomik Fırsatlar",
        description: "Bütçe dostu öğrenim ücretleri ve düşük yaşam maliyetleri.",
        icon: Landmark
    },
    {
        title: "Kolay Erişim",
        description: "Avrupa ve Asya'nın kesişim noktasında merkezi lokasyon.",
        icon: CheckCircle
    }
];

export function ServicesSummary() {
    return (
        <section className="py-32 bg-slate-50 overflow-hidden relative">
            {/* Premium Mesh Gradient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[100px] -ml-48 -mb-48" />

            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-28">

                    {/* Left Column - Content & Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100/50 shadow-sm"
                        >
                            <span className="w-8 h-[2px] bg-[#0047BB] rounded-full" />
                            <span className="text-[#0047BB] font-black uppercase tracking-[0.2em] text-[10px]">Ayrıcalıklarımız</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#152239] leading-[1.1] mb-8">
                            Türkiye&apos;de <span className="text-[#0047BB]">Kusursuz</span> Eğitim Yolculuğu
                        </h2>

                        <div className="relative w-full aspect-[4/5] md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] mb-10 border-8 border-white group">
                            <Image
                                src="/images/students-arab-turkmen.png"
                                alt="International Students in Turkey"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700" />

                            {/* Floating Stats on Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <div className="text-2xl font-black text-[#0047BB]">15.000+</div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kayıtlı Öğrenci</div>
                                    </div>
                                    <div className="w-[1px] h-8 bg-slate-200" />
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-[#0047BB]">%100</div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kabul Garantisi</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <Link
                            href="/basvuru"
                            className="group relative inline-flex items-center justify-center px-12 h-16 bg-[#0047BB] text-white font-black rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,71,187,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(0,71,187,0.5)] transition-all duration-300 w-full sm:w-auto overflow-hidden text-lg"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                ÜCRETSİZ DANIŞMANLIK AL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500" />
                        </Link>
                    </motion.div>

                    {/* Right Column - 2x2 Grid */}
                    <div className="w-full lg:w-7/12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-[3rem] p-10 lg:p-12 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_-20px_rgba(0,85,212,0.12)] transition-all duration-700 group relative overflow-hidden flex flex-col items-start h-full hover:-translate-y-3 transform-gpu"
                                    >
                                        {/* Premium background gradient effect */}
                                        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#0047BB]/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

                                        <div className="relative z-10 w-20 h-20 bg-blue-50/50 text-[#0047BB] rounded-[2rem] flex items-center justify-center mb-8 border border-blue-50/50 group-hover:scale-110 group-hover:bg-[#0047BB] group-hover:text-white transition-all duration-500 shadow-inner overflow-hidden">
                                            <Icon className="w-10 h-10 relative z-10" />
                                        </div>

                                        <h3 className="relative z-10 text-2xl md:text-3xl font-black text-[#152239] mb-4 group-hover:text-[#0047BB] transition-colors duration-500 tracking-tight">
                                            {service.title}
                                        </h3>

                                        <p className="relative z-10 text-slate-500 font-medium leading-relaxed text-base">
                                            {service.description}
                                        </p>

                                        {/* Subtle accent line */}
                                        <div className="absolute bottom-0 left-12 right-12 h-1 bg-gradient-to-r from-transparent via-[#0047BB]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}

"use client";

import { Container } from "@/shared/components/ui/Container";
import { Award, Briefcase, GraduationCap, Percent, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ApplyWhyUs() {
    const reasons = [
        {
            title: "Üniversite Temsilcisi",
            icon: <Briefcase className="w-6 h-6 text-blue-600" />,
            desc: "Atasa Education, üniversitelerin resmi temsilcisi olarak faaliyet göstermektedir. Aracı değiliz, doğrudan üniversitelere bağlıyız.",
        },
        {
            title: "%100 Kabul Oranı",
            icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
            desc: "Alanımızda tek olduğumuz için başarı oranımız %100'dir. Atasa Education ile Sizde üniversiteli olun.",
        },
        {
            title: "Diploma Notu ile Kabul",
            icon: <Award className="w-6 h-6 text-blue-600" />,
            desc: "Anlaşmalı olduğumuz tüm üniversitelere sınavsız ve diploma notuyla yerleşme imkanı sunuyoruz.",
        },
        {
            title: "+10.000 Öğrenci",
            icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
            desc: "Atasa Education, 10.000'den fazla yabancı uyruklu öğrencinin Türkiye'deki üniversitelere kabul süreçlerine yardımcı oldu. Sıra sende!",
        },
        {
            title: "Özel Burslar ve İndirimler",
            icon: <Percent className="w-6 h-6 text-blue-600" />,
            desc: "Atasa Education ile üniversitelere başvuru yapacak tüm yabancı uyruklu öğrenciler özel indirimlerden yararlanmaktadır.",
        },
        {
            title: "Danışmanlık Ücreti Yok!",
            icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
            desc: "Üniversitelerin resmi temsilcisi olduğumuz için herhangi bir danışmanlık ücreti almıyoruz. Başvurular tamamen ücretsizdir.",
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100 uppercase tracking-wider">
                            <Sparkles size={14} />
                            <span>Bizim Farkımız</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Neden Atasa Education ile Başvuru Yapmalısın?
                        </h2>
                        <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full mb-8" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative bg-[#F8FAFC] border border-slate-100 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(0,85,212,0.1)] transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:bg-blue-600 transition-colors duration-500">
                                <span className="group-hover:text-white transition-colors duration-500">
                                    {item.icon}
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed font-medium text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

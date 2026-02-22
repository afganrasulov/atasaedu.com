"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";

const milestones = [
    {
        year: "2016",
        title: "İlk Adım",
        description: "Atasa Education, İstanbul'un kalbinde küçük bir ofis ve büyük hayallerle kuruldu.",
        highlight: "Kuruluş"
    },
    {
        year: "2019",
        title: "Uluslararası Açılım",
        description: "Azerbaycan ve Türkmenistan şubelerimizle bölgedeki en güçlü eğitim köprüsü olduk.",
        highlight: "Bölgesel Güç"
    },
    {
        year: "2023",
        title: "Dijital Devrim",
        description: "Tüm başvuru ve takip süreçlerimizi yeni nesil online platformumuza taşıdık.",
        highlight: "Teknolojik Liderlik"
    },
    {
        year: "2026",
        title: "Geleceğe Hazır",
        description: "Özbekistan şubemiz ve modern SPA altyapımızla 2026 vizyonuna odaklandık.",
        highlight: "Vizyon 2026"
    }
];

export function Timeline() {
    return (
        <section className="py-32 bg-[#F8FAFC] relative overflow-hidden">
            {/* Dekoratif Arka Plan Parıltıları */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#0047BB]/5 blur-[120px] rounded-full rotate-12" />

            <Container className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 rounded-full bg-blue-100 text-[#0047BB] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                    >
                        Yolculuğumuz
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-8"
                    >
                        Kilometre <br /> <span className="text-[#0047BB]">Taşlarımız</span>
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-[#0047BB] mx-auto rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Dikey Çizgi (Track) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gray-200 to-transparent md:-translate-x-1/2" />

                    {/* Aktif İlerleme Çizgisi Animasyonu (Opsiyonel görsel şölen) */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute left-4 md:left-1/2 top-0 w-1 bg-[#0047BB] md:-translate-x-1/2 z-10"
                    />

                    <div className="space-y-24">
                        {milestones.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: idx * 0.1 }}
                                className={`relative flex items-center gap-12 md:gap-0 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                {/* Tarih/Yıl Balonu */}
                                <div className="flex-1 hidden md:block" />

                                {/* Merkez Noktası */}
                                <div className="absolute left-4 md:left-1/2 w-10 h-10 bg-white rounded-full border-4 border-[#0047BB] md:-translate-x-1/2 z-20 shadow-xl shadow-blue-600/20 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-[#0047BB] rounded-full animate-pulse" />
                                </div>

                                {/* İçerik Kartı */}
                                <div className="flex-1 ml-12 md:ml-0">
                                    <div className={`p-8 md:p-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-[#0047BB]/5 transition-all duration-500 relative group overflow-hidden ${idx % 2 === 0 ? "md:ml-12" : "md:mr-12"}`}>
                                        {/* Yıl Etiketi */}
                                        <div className="text-sm font-black text-[#0047BB] uppercase tracking-widest mb-4 flex items-center gap-3">
                                            <span className="w-8 h-[2px] bg-[#0047BB]" />
                                            {item.year}
                                        </div>

                                        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#0047BB] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-500 font-medium leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="mt-6 inline-block px-4 py-2 rounded-xl bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:bg-[#0047BB] group-hover:text-white transition-all duration-500">
                                            {item.highlight}
                                        </div>

                                        {/* Arka Plan Dekoratif Yıl */}
                                        <div className="absolute -bottom-10 -right-4 text-9xl font-black text-gray-50 select-none group-hover:text-blue-50 transition-colors duration-500 -z-10">
                                            {item.year.slice(-2)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

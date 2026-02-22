"use client";

import { Container } from "@/shared/components/ui/Container";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, GraduationCap, School, Check, Sparkles } from "lucide-react";

export function ApplyDocuments() {
    const [activeTab, setActiveTab] = useState<'undergrad' | 'grad'>('undergrad');

    const undergradDocs = [
        "Lise Transkripti (9-10-11-12. sınıf not dökümü)",
        "Lise Diploması (Mezun iseniz)",
        "Pasaport veya Kimlik Fotokopisi",
        "Mavi Kart (Var ise)",
        "Varsa Dil Yeterlilik Belgesi (TÖMER, IELTS, TOEFL vb.)"
    ];

    const gradDocs = [
        "Lisans Diploması / Mezuniyet Belgesi",
        "Lisans Transkripti (Not Dökümü)",
        "Pasaport veya Kimlik Fotokopisi",
        "Özgeçmiş (CV)",
        "Niyet Mektubu",
        "Varsa Dil Yeterlilik Belgesi"
    ];

    const tabs = [
        { id: 'undergrad', label: 'Lisans / Önlisans', icon: <School size={18} /> },
        { id: 'grad', label: 'Yüksek Lisans / Doktora', icon: <GraduationCap size={18} /> }
    ];

    return (
        <section className="py-24 bg-[#F8FAFC] border-t border-slate-100 relative overflow-hidden">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100 uppercase tracking-wider">
                                <Sparkles size={14} />
                                <span>Gerekli Evraklar</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Başvuru İçin <span className="text-[#0056D2]">Gerekli Belgeler</span>
                            </h2>
                            <p className="text-slate-600 text-lg font-medium">
                                Seçtiğiniz programa göre hazırlamanız gereken evrak listesi aşağıdadır.
                            </p>
                        </motion.div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(activeTab === 'undergrad' ? undergradDocs : gradDocs).map((doc, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-blue-100 hover:bg-white transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <Check size={16} />
                                            </div>
                                            <span className="text-slate-700 font-bold leading-tight pt-1">
                                                {doc}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900">Eksik belgeniz mi var?</h4>
                                            <p className="text-sm text-slate-600 font-medium">Endişelenmeyin, danışmanlarımız size yardımcı olacaktır.</p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-white border border-blue-200 text-blue-700 rounded-full font-bold hover:bg-blue-50 transition-colors">
                                        Danışmana Sor
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
}

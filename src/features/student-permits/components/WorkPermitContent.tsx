"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Briefcase, CheckCircle, ChevronDown, ChevronUp,
    GraduationCap, AlertTriangle, ArrowRight, Shield,
    Info, Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WorkPermitContent: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] opacity-70 -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] opacity-70 translate-x-1/3 translate-y-1/3" />

            {/* Header / Hero */}
            <div className="container mx-auto px-4 mb-16">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden max-w-5xl mx-auto backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-80 -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-2 text-blue-600 font-bold mb-6 text-sm uppercase tracking-widest bg-blue-50 w-fit mx-auto px-4 py-2 rounded-full">
                            <Briefcase size={18} />
                            <span>Çalışma İzni Rehberi</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Öğrenci Çalışma İzni
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Türkiye'de öğrenim gören yabancı uyruklu öğrencilerin çalışma hakları, başvuru süreçleri ve yasalara göre dikkat edilmesi gereken kritik detaylar.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Önemli Bilgiler */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Info className="text-blue-500 w-8 h-8" />
                                Yasal Haklar ve Sınırlar
                            </h2>
                            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                <p>
                                    Yabancı öğrencilerin çalışma izni şartları, <strong>6735 sayılı Uluslararası İşgücü Kanunu</strong> ile düzenlenmiştir.
                                    Öğrenim seviyesine göre çalışma hakları ve sınırları belirlenmiştir.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-slate-900">Ön Lisans & Lisans</h4>
                                        <p className="text-sm">Öğrenimin <strong className="text-blue-600">ilk yılından sonra</strong> başvuru yapılabilir ve <strong>sadece kısmi süreli (part-time)</strong> çalışma hakkı verilir.</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-slate-900">Yüksek Lisans & Doktora</h4>
                                        <p className="text-sm">Öğrenimin başından itibaren başvuru yapılabilir ve <strong>kısmi süreli sınırlaması uygulanmaz</strong>.</p>
                                    </div>
                                </div>
                                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl text-blue-900 flex items-start gap-4 shadow-sm mt-4">
                                    <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-blue-500" />
                                    <p>
                                        <strong>Önemli:</strong> Öğrenci ikamet izni tek başına çalışma hakkı sağlamaz. Çalışmak isteyen her öğrencinin resmi bir işveren üzerinden Çalışma İzni başvurusu yapması zorunludur.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Süreç ve Kurallar */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 pl-2">Kritik Kriterler</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6">
                                        <Scale className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        Asgari Ücret ve İstihdam
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        İşverenin, yabancı çalıştırma kotalarını (1 yabancıya karşılık 5 Türk vatandaşı vb.) bazı istisnai durumlarda sağlaması gerekmeyebilir ancak başvurunun profesyonelce yapılması reddedilme riskini azaltır.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500 mb-6">
                                        <AlertTriangle className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        Öğrenciliğin Sona Ermesi
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        Öğrenciliğinizin herhangi bir sebeple (mezuniyet, kayıt dondurma, kaydın silinmesi vb.) sona ermesi halinde, sahip olduğunuz öğrenci ikamet izni iptal edileceği için çalışma izninizin hukuki durumu da değişir.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Nasıl Başvurulur */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Briefcase className="text-blue-500 w-8 h-8" />
                                Nasıl Başvurulur?
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                                    <p className="text-slate-600 self-center">Geçerli bir <strong>Öğrenci İkamet İzni</strong> sahibi olunmalıdır.</p>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">2</div>
                                    <p className="text-slate-600 self-center">Bir işveren ile anlaşma sağlanmalı ve E-Bildirge kullanıcısı olan şirket yetkilisi tarafından Çalışma ve Sosyal Güvenlik Bakanlığı sistemine yükleme yapılmalıdır.</p>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">3</div>
                                    <p className="text-slate-600 self-center">Reddedilme oranları yüksek olan bu süreçte Atasa Education uzmanlarının desteğini alarak başvurunuzu hatasız tamamlayın.</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* FAQ */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 pl-2">Sıkça Sorulan Sorular</h2>
                            <div className="space-y-4">
                                <AccordionItem
                                    question="İlk yılda neden başvuramıyorum?"
                                    answer="Kanuna göre ön lisans ve lisans öğrencilerinin ilk yılında uyum sağlama ve eğitime odaklanmaları amacıyla yasal çalışma hakkı verilmemiştir. Ancak Yüksek Lisans ve Doktora'da böyle bir engel yoktur."
                                />
                                <AccordionItem
                                    question="Çalışma izni alırsam ikamet iznim değişir mi?"
                                    answer="Hayır, geçerli bir çalışma izni ikamet izni yerine de geçer. Ancak öğrenci olduğunuz için okul süreçlerinizle ilgili haklarınızın devamı önemlidir. Öğrenim harici çalışma izni alındığında sürece dikkat edilmelidir."
                                />
                                <AccordionItem
                                    question="Çalıştığım işyeri benden habersiz izni iptal edebilir mi?"
                                    answer="İşvereniniz işten ayrıldığınızı 15 gün içinde Bakanlığa bildirmekle yükümlüdür. Bildirim sonrası izin süreniz iptal olur. Tekrar çalışmak isterseniz yeni işvereniniz tarafından yeni bir başvuru yapılmalıdır."
                                />
                            </div>
                        </motion.section>

                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">

                            {/* CTA Card */}
                            <div className="bg-[#0047BB] text-white p-8 rounded-[2rem] text-center shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-150" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#002a6e]/50 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                                        <Shield className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Uzman Desteği Alın</h3>
                                    <p className="text-blue-100 mb-8 leading-relaxed">
                                        İşvereniniz ile Bakanlık arasındaki resmi prosedürlerde red almamak için Atasa Danışmanlarına ulaşın.
                                    </p>

                                    <Link
                                        href="https://wa.me/905307382717"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-white text-[#0047BB] hover:bg-slate-50 font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                                    >
                                        Bilgi Al
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                    <p className="text-xs text-blue-200 mt-6 mt-4 mix-blend-screen opacity-70">
                                        Hızlı analiz & dosya değerlendirmesi
                                    </p>
                                </div>
                            </div>

                            {/* Other Permit Types Links */}
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <h4 className="font-bold text-slate-900 mb-4 px-2">Bağlantılar</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/ogrenci-ikamet-izni" className="flex items-center justify-between text-slate-600 hover:text-red-500 p-4 hover:bg-red-50 rounded-2xl transition-all font-medium group">
                                            <span className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <CheckCircle className="w-4 h-4 text-red-400 group-hover:text-red-500" />
                                                </div>
                                                Öğrenci İkamet İzni
                                            </span>
                                            <ArrowRight size={16} className="text-slate-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="flex items-center justify-between text-slate-600 hover:text-blue-600 p-4 hover:bg-blue-50 rounded-2xl transition-all font-medium group">
                                            <span className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <AlertTriangle className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                                </div>
                                                Ana Sayfaya Dön
                                            </span>
                                            <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const AccordionItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden transition-all hover:bg-slate-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="font-bold text-slate-800 pr-4 text-lg">{question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed text-lg border-t border-slate-100/50 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

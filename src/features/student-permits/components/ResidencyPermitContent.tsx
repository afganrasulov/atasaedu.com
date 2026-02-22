"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    FileText, CheckCircle, ChevronDown, ChevronUp,
    GraduationCap, AlertTriangle, ArrowRight, Shield,
    Info, School
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ResidencyPermitContent: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/50 rounded-full blur-[100px] opacity-70 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] opacity-70 -translate-x-1/3 translate-y-1/3" />

            {/* Header / Hero */}
            <div className="container mx-auto px-4 mb-16">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden max-w-5xl mx-auto backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-80 -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-2 text-red-500 font-bold mb-6 text-sm uppercase tracking-widest bg-red-50 w-fit mx-auto px-4 py-2 rounded-full">
                            <GraduationCap size={18} />
                            <span>İkamet İzni Rehberi</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Öğrenci İkamet İzni
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Türkiye'de ön lisans, lisans, yüksek lisans veya doktora eğitimi alacak yabancı uyruklu öğrenciler için zorunlu ikamet izni türüdür.
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
                                <Info className="text-red-500 w-8 h-8" />
                                Önemli Bilgiler
                            </h2>
                            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                <p>
                                    Öğrenci ikamet izni başvurusu, <strong className="text-slate-900">e-İkamet</strong> sistemi üzerinden yapılır.
                                    Başvuru formunu doldurduktan sonra, gerekli belgelerle birlikte üniversitenizin Uluslararası Öğrenci Birimi'ne (veya Göç İdaresi'nin belirttiği birime)
                                    başvuru tarihinden itibaren en geç <strong className="text-slate-900">10 gün</strong> içinde teslim etmeniz gerekebilir.
                                </p>
                                <div className="p-5 bg-red-50/50 border border-red-100 rounded-2xl text-red-900 flex items-start gap-4 shadow-sm">
                                    <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-red-500" />
                                    <p>
                                        <strong>Dikkat:</strong> Açık öğretim veya uzaktan eğitim programları için öğrenci ikamet izni <u>verilmemektedir</u>.
                                        Türkiye'de fiziksel olarak eğitim alıyor olmanız şarttır.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Gerekli Belgeler */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <FileText className="text-red-500 w-8 h-8" />
                                Gerekli Belgeler
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Başvuru Formu", desc: "e-İkamet sisteminden alınan ıslak imzalı form." },
                                    { title: "Pasaport", desc: "Aslı ve işlem gören sayfaların fotokopisi." },
                                    { title: "Öğrenci Belgesi", desc: "Aktif öğrencilik durumunu gösteren güncel ıslak/e-imzalı belge." },
                                    { title: "Biyometrik Fotoğraf", desc: "Son 6 ay içinde çekilmiş, beyaz fonlu 4 adet." },
                                    { title: "Sağlık Sigortası", desc: "Türkiye'de geçerli bir özel sağlık sigortası poliçesi." },
                                    { title: "Adres Belgesi", desc: "Noter onaylı kira kontratı veya yurt belgesi." },
                                    { title: "Kart Bedeli Makbuzu", desc: "Değerli kağıt bedelinin ödendiğine dair vergi dairesi dekontu." },
                                    { title: "UETS Belgesi", desc: "e-Devlet veya PTT üzerinden alınan tebligat adresi belgesi." }
                                ].map((doc, idx) => (
                                    <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <CheckCircle className="text-red-500 shrink-0 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{doc.title}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{doc.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Süreç ve Kurallar */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 pl-2">Kritik Süreçler</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                                        <School className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        Bölüm Değişikliği
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Aynı il içinde fakülte/bölüm değişikliğinde 20 gün içinde bildirim yapılmalıdır. Farklı bir ile geçiş yapıldığında ise 10 gün içinde o ilin Göç İdaresi'ne yeni başvuru yapılmalıdır.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-6">
                                        <AlertTriangle className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        Kayıt Dondurma
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Herhangi bir sebeple kaydını donduran öğrencilerin ikamet izinleri iptal edilir. Eğitime geri dönüldüğünde sıfırdan ilk başvuru yapılması gerekmektedir.
                                    </p>
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
                                    question="Mezun olduktan sonra ikamet iznim ne olur?"
                                    answer="Mezuniyet tarihinden itibaren öğrenci ikamet izniniz sona erer. Türkiye'de kalmaya devam edecekseniz 10 gün içinde 'Kısa Dönem İkamet İzni'ne (mezuniyet sonrası 6 ay içinde başvurulabilir) geçiş yapmanız gerekmektedir."
                                />
                                <AccordionItem
                                    question="Hem okuyup hem çalışabilir miyim?"
                                    answer="Öğrenci ikamet izni doğrudan çalışma hakkı vermez. Ön lisans ve lisans öğrencileri ilk yıldan sonra kısmi süreli çalışma izni alabilir. Yüksek lisans ve doktora öğrencileri ise süre kısıtlaması olmaksızın çalışma izni alabilir."
                                />
                                <AccordionItem
                                    question="Harç ödemesi yapmam gerekiyor mu?"
                                    answer="Öğrenci ikamet izni başvurularında yabancılar 'İkamet İzni Harcı' ödemesinden muaftır. Sadece yıllık olarak belirlenen 'İkamet İzni Kart Bedeli' ödenmelidir."
                                />
                                <AccordionItem
                                    question="Adresim değişti ne yapmalıyım?"
                                    answer="Adres veya iletişim bilgileriniz değiştiğinde yasal olarak 20 iş günü içinde önce Nüfus Müdürlüğü'ne ardından İl Göç İdaresi Müdürlüğü'ne güncel adresinizi bildirmeniz zorunludur. Aksi takdirde ceza ile karşılaşabilirsiniz."
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
                                    <h3 className="text-2xl font-bold mb-4">Profesyonel Destek</h3>
                                    <p className="text-blue-100 mb-8 leading-relaxed">
                                        Üniversite kayıt, denklik ve ikamet izni başvurularınızda uzman kadromuzla yanınızdayız. Riski sıfıra indirin.
                                    </p>

                                    <Link
                                        href="https://wa.me/905307382717"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-white text-[#0047BB] hover:bg-slate-50 font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                                    >
                                        Hemen Başvurun
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                    <p className="text-xs text-blue-200 mt-6 mt-4 mix-blend-screen opacity-70">
                                        Ücretsiz ön değerlendirme
                                    </p>
                                </div>
                            </div>

                            {/* Other Permit Types Links */}
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <h4 className="font-bold text-slate-900 mb-4 px-2">Bağlantılar</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/ogrenci-calisma-izni" className="flex items-center justify-between text-slate-600 hover:text-blue-600 p-4 hover:bg-blue-50 rounded-2xl transition-all font-medium group">
                                            <span className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                                </div>
                                                Öğrenci Çalışma İzni
                                            </span>
                                            <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
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

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, AlertTriangle, CheckCircle2, Info, ChevronRight, 
  HelpCircle, ShieldAlert, ArrowLeft, MessageCircle, FileText, 
  Lightbulb, Siren, Plane, Home, ShieldCheck, Scale, Gavel
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';
import { RESIDENCY_REJECTION_CODES, ResidencyRejectionDetail } from './residency-rejection-data';

export const ResidencyRejectionPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [selectedCode, setSelectedCode] = useState<string>('');

  const detail = useMemo(() => 
    selectedCode ? RESIDENCY_REJECTION_CODES[selectedCode] : null
  , [selectedCode]);

  // Updated Numeric Sort: extracts number from "Madde X" string
  const sortedCodes = useMemo(() => {
    return Object.keys(RESIDENCY_REJECTION_CODES).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''));
      const numB = parseInt(b.replace(/\D/g, ''));
      return numA - numB;
    });
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Visa': return <Plane size={24} />;
      case 'Entry': return <ShieldAlert size={24} />;
      case 'Residency': return <Home size={24} />;
      case 'Protection': return <ShieldCheck size={24} />;
      default: return <FileText size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-6 md:pt-32 pb-20 relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-6 shadow-xl border border-slate-100 transform -rotate-3">
             <Scale size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-none">
            İkamet & Vize Ret <br/> <span className="text-blue-600">Rehberi ve Analizi</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Başvurunuza gelen ret maddesini seçerek nedenlerini ve çözüm yollarını uzman bakış açısıyla inceleyin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Selector Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sticky top-28">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 px-2">
                 <ListFilter size={18} className="text-blue-500" /> Kanun Maddeleri
              </h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {sortedCodes.map((code) => (
                  <button
                    key={code}
                    onClick={() => setSelectedCode(code)}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-bold transition-all flex items-center justify-between group ${
                      selectedCode === code 
                        ? 'bg-slate-900 text-white shadow-lg scale-105' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                       <span className={`w-2 h-2 rounded-full ${RESIDENCY_REJECTION_CODES[code].severity === 'danger' ? 'bg-red-500' : RESIDENCY_REJECTION_CODES[code].severity === 'warning' ? 'bg-orange-500' : 'bg-blue-400'}`}></span>
                       <span>{code}</span>
                    </div>
                    <ChevronRight size={18} className={`${selectedCode === code ? 'text-blue-400' : 'text-slate-300'} group-hover:translate-x-1 transition-transform`} />
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                 <p className="text-xs text-blue-800 font-bold leading-relaxed">
                    Karar belgenizdeki "Ret Gerekçesi" kısmında yazan madde numarasını yukarıdan seçin.
                 </p>
              </div>
            </div>
          </div>

          {/* Result Content Area */}
          <div className="lg:col-span-2 min-h-[600px]">
            <AnimatePresence mode="wait">
              {!detail ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/40 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-slate-300 h-full flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
                    <Search size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-400">Analiz İçin Madde Seçin</h3>
                  <p className="text-slate-400 mt-2">Belgenizde yer alan maddeyi soldaki listeden seçerek çözüm yollarını görebilirsiniz.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={detail.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Summary Card */}
                  <div className={`bg-white rounded-[2.5rem] shadow-xl border-t-8 p-8 md:p-10 ${
                    detail.severity === 'danger' ? 'border-red-500' : 
                    detail.severity === 'warning' ? 'border-orange-500' : 'border-blue-500'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                             detail.severity === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                             {getCategoryIcon(detail.category)}
                          </div>
                          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{detail.code} Analizi</h2>
                       </div>
                       <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         detail.severity === 'danger' ? 'bg-red-100 text-red-700' : 
                         detail.severity === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                       }`}>
                         {detail.severity === 'danger' ? 'KRİTİK ENGEL' : 'ÖNEMLİ BİLGİ'}
                       </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{detail.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">{detail.shortDesc}</p>
                  </div>

                  {/* Detail Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Meaning */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <HelpCircle className="text-blue-500" size={20} /> Bu Ne Anlama Geliyor?
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{detail.meaning}</p>
                    </div>

                    {/* Common Reasons */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Siren className="text-red-500" size={20} /> Sık Görülen Nedenler
                      </h4>
                      <ul className="space-y-3">
                        {detail.reasons.map((r, i) => (
                          <li key={i} className="text-sm text-slate-600 flex gap-3 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Lightbulb className="text-yellow-500" size={20} /> Örnek Vakalar
                      </h4>
                      <div className="space-y-4">
                        {detail.examples.map((ex, i) => (
                          <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 italic text-sm text-slate-500">
                            "{ex}"
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Solutions */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100 bg-blue-50/30">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" size={20} /> Nasıl Düzelir?
                      </h4>
                      <ul className="space-y-3">
                        {detail.solutions.map((s, i) => (
                          <li key={i} className="text-sm text-slate-700 flex gap-3 font-bold">
                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                               <ChevronRight size={12} strokeWidth={3} />
                            </div>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* High Conversion Action Panel */}
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative border border-white/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                    <div className="relative z-10 text-center md:text-left">
                       <h3 className="text-2xl font-black mb-2 tracking-tight">Ret Kararı Son Değildir!</h3>
                       <p className="text-slate-400 text-sm max-w-md font-medium leading-relaxed">
                         Yasal itiraz süresini (60 gün) kaçırmadan dosyanızı Atasa uzmanlarıyla yeniden yapılandırın ve başarınızı garantiye alın.
                       </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
                      <button 
                        onClick={openWhatsApp}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all group"
                      >
                        <MessageCircle size={22} fill="currentColor" className="group-hover:rotate-12 transition-transform" /> Uzmana Danış
                      </button>
                      <Link 
                        to="/appointment"
                        className="bg-white text-slate-900 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                      >
                        <FileText size={20} /> Randevu Al
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Global Info Bar */}
        <div className="mt-12 p-8 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                <Gavel className="text-blue-600" size={32} />
            </div>
            <div className="text-sm text-slate-500 leading-relaxed font-medium text-center md:text-left">
                <p className="text-lg font-black text-slate-900 mb-1">Hukuki Süreç Hatırlatması</p>
                <p>Bu bilgiler 6458 Sayılı Yabancılar ve Uluslararası Koruma Kanunu çerçevesinde bilgilendirme amaçlıdır. Her ret kararı kişiye özel dosya analizi gerektirir. <strong>Atasa Danışmanlık</strong>, dosyanızın eksiklerini gidererek yasal zeminde başvurunuzun onaylanmasını sağlar.</p>
            </div>
        </div>

      </div>
    </div>
  );
};

const ListFilter = ({size, className}: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18"></path>
    <path d="M7 12h10"></path>
    <path d="M10 18h4"></path>
  </svg>
);

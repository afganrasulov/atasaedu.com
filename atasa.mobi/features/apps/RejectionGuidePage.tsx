import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, AlertTriangle, CheckCircle, Info, ChevronRight, 
  HelpCircle, ShieldAlert, ArrowLeft, MessageCircle, FileText, 
  Lightbulb, Siren, ExternalLink
} from 'lucide-react';
import { REJECTION_CODES, RejectionDetail } from './rejection-data';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

export const RejectionGuidePage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [selectedCode, setSelectedCode] = useState<string>('');

  const detail = useMemo(() => 
    selectedCode ? REJECTION_CODES[selectedCode] : null
  , [selectedCode]);

  const sortedCodes = Object.keys(REJECTION_CODES).sort();

  return (
    <div className="min-h-screen bg-slate-50 pt-6 md:pt-32 pb-20 relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-6 border border-orange-200">
            <ShieldAlert size={16} />
            <span>Ret Analiz Paneli</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Çalışma İzni Ret <br/> <span className="text-orange-600">Rehberi ve Analizi</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Başvuru sonucunuzda yer alan ret kodunu seçerek nedenini, ne anlama geldiğini ve çözüm yollarını hemen öğrenin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Selector Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sticky top-28">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <FileText size={18} className="text-blue-500" /> Bir Kod Seçiniz
              </h3>
              <div className="space-y-2">
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
                    <span>Madde {code}</span>
                    <ChevronRight size={18} className={`${selectedCode === code ? 'text-orange-400' : 'text-slate-300'} group-hover:translate-x-1 transition-transform`} />
                  </button>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                 <p className="text-xs text-blue-800 font-medium leading-relaxed">
                    Ekranda gördüğünüz kodlar resmi kanun maddeleridir. Karar belgenizdeki kod ile buradakini eşleştirin.
                 </p>
              </div>
            </div>
          </div>

          {/* Result Content */}
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
                  <h3 className="text-2xl font-bold text-slate-400">Analiz İçin Kod Seçin</h3>
                  <p className="text-slate-400 mt-2">Sol menüden karar belgenizde yazan madde numarasını seçerek başlayın.</p>
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
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight">Madde {detail.code}</h2>
                       <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                         detail.severity === 'danger' ? 'bg-red-100 text-red-700' : 
                         detail.severity === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                       }`}>
                         {detail.severity === 'danger' ? 'Kritik Engel' : 'Önemli Uyarı'}
                       </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{detail.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">{detail.shortDesc}</p>
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
                          <li key={i} className="text-sm text-slate-600 flex gap-3">
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
                        <CheckCircle className="text-green-500" size={20} /> Nasıl Düzelir?
                      </h4>
                      <ul className="space-y-3">
                        {detail.solutions.map((s, i) => (
                          <li key={i} className="text-sm text-slate-700 flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                               <ChevronRight size={12} />
                            </div>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-2">Bu Ret Kararına İtiraz Edin</h3>
                       <p className="text-slate-400 text-sm max-w-md">
                         Karar belgenizle birlikte 15 gün içinde itiraz hakkınız bulunmaktadır. Profesyonel dosya hazırlığı için bize ulaşın.
                       </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
                      <button 
                        onClick={openWhatsApp}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <MessageCircle size={20} /> WhatsApp Destek
                      </button>
                      <Link 
                        to="/appointment"
                        className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:bg-slate-100"
                      >
                        <ChevronRight size={20} /> Randevu Al
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 p-6 bg-slate-200/50 rounded-3xl border border-slate-200 flex gap-4 text-slate-500">
           <Info className="shrink-0" size={24} />
           <p className="text-xs leading-relaxed font-medium">
             <strong>Yasal Uyarı:</strong> Bu paneldeki bilgiler 6735 sayılı Uluslararası İşgücü Kanunu ve 6458 sayılı YUKK baz alınarak bilgilendirme amacıyla hazırlanmıştır. Nihai karar T.C. Çalışma ve Sosyal Güvenlik Bakanlığı'na aittir. Buradaki bilgiler resmi bir taahhüt içermez. Her vaka kendi içinde özeldir.
           </p>
        </div>

      </div>
    </div>
  );
};
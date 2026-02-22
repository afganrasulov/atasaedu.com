
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Globe, ArrowLeft, ChevronRight, CheckCircle2, 
  AlertTriangle, Info, MessageCircle, X, Plane, ShieldCheck, Zap, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';
import { VISA_REGIME_DATA, VisaRegime } from './visa-regime-data';

export const VisaRegimePage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    const term = searchTerm.toLocaleLowerCase('tr-TR').trim();
    if (!term) return VISA_REGIME_DATA;
    return VISA_REGIME_DATA.filter(item => 
      item.country.toLocaleLowerCase('tr-TR').includes(term)
    );
  }, [searchTerm]);

  const getStatusBadge = (status: VisaRegime['status']) => {
    switch (status) {
      case 'Exempt': 
        return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Vizeden Muaf</span>;
      case 'EVisa': 
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200">e-Vize Alabilir</span>;
      case 'Sticker': 
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">e-Vize Gerekli</span>;
      case 'Conditional': 
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">Şartlı Muafiyet</span>;
    }
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: -3 }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-6 shadow-xl border border-slate-100"
          >
             <Plane size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Vize Giriş Vize Süresi</h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto font-medium">
            Pasaportunuzla Türkiye'ye nasıl girebilirsiniz? Muafiyet sürelerini ve vize türlerini anında öğrenin.
          </p>
        </div>

        {/* Search Bar with Enhanced Interaction */}
        <motion.div 
          layout
          className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-xl border border-white mb-12"
        >
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={24} />
            <input 
              type="text"
              placeholder="Ülke adı yazın (Örn: Rusya, Irak, Almanya)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-6 pl-16 pr-12 text-xl font-bold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
            />
            {searchTerm && (
              <motion.button 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setSearchTerm('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-slate-200 rounded-full text-slate-500 hover:bg-slate-300 transition-colors"
              >
                <X size={18} />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Grid Area with PopLayout and Staggered Spring Animations */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredData.map((item, index) => (
                  <motion.div
                    layout
                    key={item.code}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(12px)', transition: { duration: 0.2 } }}
                    transition={{ 
                      type: "spring", 
                      damping: 25, 
                      stiffness: 280,
                      delay: Math.min(index * 0.03, 0.2) // Stagger effect
                    }}
                    className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-6">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-10 rounded-lg overflow-hidden shadow-md border border-slate-100">
                             <img 
                               src={`https://flagcdn.com/w80/${item.code.toLowerCase()}.png`} 
                               className="w-full h-full object-cover" 
                               alt={item.country} 
                             />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 leading-none mb-1 group-hover:text-blue-600 transition-colors">{item.country}</h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.code} Pasaportu</span>
                          </div>
                       </div>
                       {getStatusBadge(item.status)}
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 flex-grow">
                       <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-3">
                          <Clock size={14} /> Kalış Süresi: {item.duration}
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                         "{item.description}"
                       </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20 bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-200"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Ülke Bulunamadı</h3>
                <p className="text-slate-500">Lütfen farklı bir ülke adı yazarak tekrar deneyin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Disclaimer */}
        <div className="mt-16 p-8 bg-blue-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
           <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/30 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-400/20">
                 <Zap size={12} className="fill-current" /> Atasa Bilgi Merkezi
              </div>
              <h3 className="text-2xl font-black mb-2">Vize Rejimi Sıkça Değişebilir</h3>
              <p className="text-blue-100 font-medium max-w-xl leading-relaxed">
                Bu bilgiler T.C. Dışişleri Bakanlığı verileri baz alınarak hazırlanmıştır. Seyahatiniz öncesinde Atasa uzmanlarından güncel teyit almanız önerilir.
              </p>
           </div>
           <button 
             onClick={openWhatsApp}
             className="relative z-10 bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl active:scale-95 whitespace-nowrap flex items-center gap-3"
           >
             <MessageCircle /> Hemen Teyit Al
           </button>
        </div>

        <div className="mt-8 flex gap-4 text-slate-400 p-6 rounded-3xl border border-slate-100 bg-white/40">
           <Info size={24} className="shrink-0 text-blue-500" />
           <p className="text-xs font-medium leading-relaxed">
             <strong>Bilgi:</strong> Vize muafiyeti, turistik veya ticari amaçlı kısa süreli kalışlar için geçerlidir. Türkiye'de çalışmak veya eğitim görmek isteyen yabancıların amaçlarına uygun vize ile gelmeleri veya ikamet izni başvurusu yapmaları gerekmektedir.
           </p>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Phone, Globe, Mail, 
  MessageCircle, ExternalLink, ChevronRight, 
  ArrowLeft, Landmark, Building2, Navigation, Info, Clock, CalendarCheck, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMBASSY_DATA, Embassy } from './embassy-data';

export const EmbassyFinderPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<'Ankara' | 'İstanbul'>('İstanbul');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    const term = (searchTerm || '').toLowerCase();
    return (EMBASSY_DATA || []).filter(item => 
      item.city === selectedCity && 
      ((item.country || '').toLowerCase().includes(term) || 
       (item.name || '').toLowerCase().includes(term))
    );
  }, [selectedCity, searchTerm]);

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Back Link */}
        <div className="mb-4 md:mb-10">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        {/* Header Section from Screenshot */}
        <div className="text-center mb-8 md:mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-4 md:mb-8 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] border border-slate-100 transition-transform hover:scale-105">
             <Landmark size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0f172a] mb-6 tracking-tight leading-none">
            Konsolosluk Rehberi
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Türkiye'deki yabancı temsilciliklerin adres, telefon ve konum bilgilerine anında ulaşın.
          </p>
        </div>

        {/* Premium Search & Filter Bar */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white p-3 mb-16">
          <div className="flex flex-col lg:flex-row gap-3">
            
            {/* City Switcher Pill */}
            <div className="lg:w-[450px] bg-slate-100/50 p-1.5 rounded-[1.8rem] flex relative border border-slate-200/50">
              <button 
                onClick={() => setSelectedCity('Ankara')}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all relative z-10 ${selectedCity === 'Ankara' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Ankara Büyükelçilikleri
              </button>
              <button 
                onClick={() => setSelectedCity('İstanbul')}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all relative z-10 ${selectedCity === 'İstanbul' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                İstanbul Konsoloslukları
              </button>
              {/* Animated Background Pill */}
              <motion.div 
                className="absolute top-1.5 bottom-1.5 bg-white rounded-2xl shadow-lg z-0 border border-slate-100"
                initial={false}
                animate={{ 
                  left: selectedCity === 'Ankara' ? '6px' : '50%',
                  right: selectedCity === 'Ankara' ? '50%' : '6px'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            </div>

            {/* Premium Search Input */}
            <div className="flex-1 relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search size={22} />
              </div>
              <input 
                type="text"
                placeholder="Ülke veya temsilcilik adı ile arayın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[1.8rem] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none text-lg font-medium placeholder-slate-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Results Grid - High Quality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <EmbassyCard key={item.id} item={item} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full flex flex-col items-center justify-center py-32 text-slate-400 bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-200"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                   <Search size={40} className="opacity-20" />
                </div>
                <p className="text-2xl font-bold text-slate-500">Sonuç bulunamadı</p>
                <p className="text-slate-400">Lütfen farklı bir anahtar kelime veya şehir deneyin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Disclaimer Bar */}
        <div className="mt-20 p-8 bg-[#0f172a] rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10 -mr-20 -mt-20"></div>
           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
              <Info className="text-blue-400" size={32} />
           </div>
           <div className="text-white text-center md:text-left">
              <p className="font-black text-xl mb-1 tracking-tight">Önemli Hatırlatma</p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Bu bilgiler rehberlik amacıyla sunulmuştur. Gitmeden önce çalışma saatlerini teyit etmek için telefonla aramanız önerilir. 
                Vize işlemleri için doğrudan temsilciliklerin resmi web sitelerini kullanınız.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const EmbassyCard: React.FC<{ item: Embassy }> = ({ item }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2.5rem] p-8 shadow-[0_15px_50px_-20px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_25px_70px_-20px_rgba(37,99,235,0.15)] transition-all group flex flex-col h-full relative overflow-hidden"
    >
      {/* Subtle Background Icon Pattern */}
      <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none transform rotate-12">
        <Building2 size={220} />
      </div>

      {/* Header Area */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex items-center gap-5">
          {/* Windows fix: Use image instead of emoji text */}
          <div className="w-20 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-500 shrink-0">
             <img 
               src={`https://flagcdn.com/h80/${item.countryCode.toLowerCase()}.png`} 
               className="w-full h-full object-cover"
               alt={`${item.country} Bayrağı`}
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 // Fallback to text if image fails
                 if (e.currentTarget.parentElement) {
                    const fallback = document.createElement('div');
                    fallback.className = "w-full h-full flex items-center justify-center bg-slate-100 font-bold text-xl text-slate-400";
                    fallback.innerText = item.countryCode.toUpperCase();
                    e.currentTarget.parentElement.appendChild(fallback);
                 }
               }}
             />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0f172a] leading-tight mb-2 group-hover:text-blue-700 transition-colors">{item.name}</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-blue-50 text-blue-600 px-3 py-1 rounded-lg border border-blue-100/50">
              {item.type}
            </span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-400 transition-all border border-slate-100">
          <Building2 size={20} />
        </div>
      </div>

      {/* Contact Content Area */}
      <div className="space-y-4 flex-grow mb-8 relative z-10">
        {/* Warning Alert if exists */}
        {item.warning && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-red-900 animate-pulse">
            <AlertTriangle className="text-red-500 shrink-0" size={18} />
            <p className="text-xs font-bold leading-relaxed">{item.warning}</p>
          </div>
        )}

        <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
             <MapPin size={20} />
          </div>
          <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
            {item.address}
          </p>
        </div>
        
        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
             <Phone size={20} />
          </div>
          <a href={`tel:${item.phone.replace(/\D/g, '')}`} className="text-lg text-slate-800 font-black hover:text-blue-600 transition-colors">
            {item.phone}
          </a>
        </div>

        {/* Working Hours Display */}
        {(item.appointmentHours || item.callCenterHours) && (
          <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">
              <Clock size={14} /> Çalışma Saatleri
            </div>
            {item.appointmentHours && (
              <div className="text-xs text-slate-600">
                <span className="font-black text-slate-900 block mb-1 underline decoration-blue-200">Randevu Saatleri:</span>
                {item.appointmentHours}
              </div>
            )}
            {item.callCenterHours && (
              <div className="text-xs text-slate-600">
                <span className="font-black text-slate-900 block mb-1 underline decoration-green-200">Çağrı Merkezi:</span>
                {item.callCenterHours}
              </div>
            )}
          </div>
        )}

        {item.email && (
          <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
               <Mail size={20} />
            </div>
            <a href={`mailto:${item.email}`} className="text-[15px] text-slate-800 font-bold hover:text-blue-600 transition-colors truncate">
              {item.email}
            </a>
          </div>
        )}
      </div>

      {/* Modern Button Grid */}
      <div className="flex flex-col gap-3 relative z-10">
        {item.appointmentUrl && (
          <a 
            href={item.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95 group/btn"
          >
            <CalendarCheck size={18} className="group/btn:scale-110 transition-transform" /> RANDEVU AL
          </a>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <a 
            href={item.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-4 bg-[#0f172a] text-white rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95 group/btn"
          >
            <Navigation size={18} className="group/btn:rotate-12 transition-transform" /> YOL TARİFİ
          </a>
          
          {item.website ? (
            <a 
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 text-slate-700 rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm group/btn"
            >
              <Globe size={18} className="group/btn:rotate-180 transition-transform duration-700" /> WEB SİTESİ
            </a>
          ) : item.whatsapp ? (
            <a 
              href={`https://wa.me/${item.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 bg-green-500 text-white rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95"
            >
              <MessageCircle size={18} fill="currentColor" /> WHATSAPP
            </a>
          ) : (
            <div className="flex items-center justify-center gap-3 py-4 bg-slate-50 text-slate-300 rounded-[1.2rem] font-black text-xs uppercase tracking-widest cursor-not-allowed">
              BİLGİ YOK
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
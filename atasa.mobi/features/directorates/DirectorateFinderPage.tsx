
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Building2, Navigation, Clock, 
  ArrowLeft, ChevronRight, Info, X, ExternalLink,
  Phone, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DIRECTORATE_DATA, Directorate } from './directorate-data';

export const DirectorateFinderPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = useMemo(() => {
    const list = Array.from(new Set(DIRECTORATE_DATA.map(d => d.city)));
    return ['All', ...list.sort()];
  }, []);

  const filteredData = useMemo(() => {
    const term = searchTerm.toLocaleLowerCase('tr-TR').trim();
    return DIRECTORATE_DATA.filter(item => {
      const matchSearch = !term || 
        item.name.toLocaleLowerCase('tr-TR').includes(term) || 
        item.address.toLocaleLowerCase('tr-TR').includes(term);
      const matchCity = selectedCity === 'All' || item.city === selectedCity;
      return matchSearch && matchCity;
    });
  }, [searchTerm, selectedCity]);

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-slate-50">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-6 shadow-xl border border-slate-100 transform rotate-3">
             <Building2 size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Göç İdaresi Rehberi</h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto font-medium">
            Türkiye genelindeki İl ve İlçe Göç İdaresi Müdürlüklerinin konum ve çalışma saatlerine anında ulaşın.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-xl border border-white mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Kurum adı veya adres ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-lg font-bold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-200 rounded-full text-slate-500">
                  <X size={14} />
                </button>
              )}
            </div>
            
            <div className="md:w-64 relative">
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-lg font-bold text-slate-900 outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city === 'All' ? 'Tüm Şehirler' : city}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronRight size={20} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredData.map((item) => (
                  <DirectorateCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-200"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Eşleşen Müdürlük Bulunamadı</h3>
                <p className="text-slate-500">Lütfen farklı bir kelime veya şehir seçerek tekrar deneyin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Help Info */}
        <div className="mt-16 p-8 bg-blue-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
           <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl font-black mb-2">Kurum İşlemlerinde Sorun mu Yaşıyorsunuz?</h3>
              <p className="text-blue-100 font-medium max-w-xl leading-relaxed">
                Müdürlüklerdeki randevu, eksik evrak veya dosya takibi süreçlerinizi Atasa uzmanları sizin adınıza yönetsin.
              </p>
           </div>
           <Link 
             to="/appointment"
             className="relative z-10 bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl active:scale-95 whitespace-nowrap"
           >
             Danışmanlık Al
           </Link>
        </div>

        <div className="mt-8 flex gap-4 text-slate-400 p-4 rounded-2xl border border-slate-100 bg-white/40">
           <Info size={24} className="shrink-0 text-blue-500" />
           <p className="text-xs font-medium leading-relaxed">
             <strong>Bilgi:</strong> Çalışma saatleri ve konum bilgileri Göç İdaresi Başkanlığı resmi verileri baz alınarak hazırlanmıştır. Gidilecek kurumun yoğunluk veya tadilat gibi nedenlerle kapalı olma riskine karşı telefonla teyit almanız önerilir.
           </p>
        </div>

      </div>
    </div>
  );
};

const DirectorateCard: React.FC<{ item: Directorate }> = ({ item }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full hover:-translate-y-1"
  >
    <div className="flex justify-between items-start mb-6">
       <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Building2 size={24} />
       </div>
       <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
          {item.city}
       </div>
    </div>

    <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors flex-grow">
      {item.name}
    </h3>

    <div className="space-y-4 mb-8">
      <div className="flex gap-3">
        <MapPin size={18} className="text-slate-300 shrink-0 mt-1" />
        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">{item.address}</p>
      </div>
      <div className="flex gap-3 items-center">
        <Clock size={18} className="text-slate-300 shrink-0" />
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">{item.hours}</p>
      </div>
    </div>

    <a 
      href={item.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg"
    >
      <Navigation size={18} /> Yol Tarifi Al
    </a>
  </motion.div>
);

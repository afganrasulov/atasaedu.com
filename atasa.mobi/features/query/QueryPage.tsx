
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, AlertTriangle, CheckCircle, Info, ChevronRight, Home, ArrowRight, ShieldCheck, UserCheck, Briefcase, GraduationCap, Map, X } from 'lucide-react';
import { RESTRICTED_LOCATIONS } from './data';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { motion, AnimatePresence } from 'framer-motion';

const ISTANBUL_RESTRICTED_DISTRICTS = [
  'Fatih', 'Esenyurt', 'Avcılar', 'Bahçelievler', 'Başakşehir', 'Bağcılar', 'Esenler', 'Küçükçekmece', 'Sultangazi', 'Zeytinburnu'
];

// Türkçe karakterleri normalize eden yardımcı fonksiyon
const normalizeForSearch = (text: string): string => {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/i/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
};

export const QueryPage: React.FC = () => {
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);
  
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // İl Listesi
  const cities = useMemo(() => Object.keys(RESTRICTED_LOCATIONS).sort(), []);

  // Filtrelenmiş İl Listesi (Arama terimine göre)
  const filteredCities = useMemo(() => {
    if (!citySearchTerm || selectedCity === citySearchTerm) return [];
    const normalizedTerm = normalizeForSearch(citySearchTerm);
    return cities.filter(city => normalizeForSearch(city).includes(normalizedTerm));
  }, [citySearchTerm, cities, selectedCity]);

  // İlçe Listesi (Seçilen ile göre)
  const districts = useMemo(() => {
    if (!selectedCity) return [];
    return Object.keys(RESTRICTED_LOCATIONS[selectedCity] || {}).sort();
  }, [selectedCity]);

  // Click Outside Listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCitySearchTerm(city);
    setIsCityDropdownOpen(false);
    setSelectedDistrict('');
    setSelectedNeighborhood('');
    setHasSearched(false);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedNeighborhood('');
    setHasSearched(false);
  };

  const isDistrictRestricted = useMemo(() => {
    return selectedCity === 'İstanbul' && ISTANBUL_RESTRICTED_DISTRICTS.includes(selectedDistrict);
  }, [selectedCity, selectedDistrict]);

  const isRestricted = useMemo(() => {
    if (!selectedCity || !selectedDistrict) return false;
    if (isDistrictRestricted) return true;
    if (!selectedNeighborhood) return false;
    const districtData = RESTRICTED_LOCATIONS[selectedCity]?.[selectedDistrict];
    if (!districtData) return false;

    return districtData.some(n => 
      n.toLocaleUpperCase('tr-TR') === selectedNeighborhood.toLocaleUpperCase('tr-TR') || 
      n === 'TÜM MAHALLELER'
    );
  }, [selectedCity, selectedDistrict, selectedNeighborhood, isDistrictRestricted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCity && selectedDistrict) {
      setHasSearched(true);
    }
  };

  const closedNeighborhoodSuggestions = useMemo(() => {
    if (!selectedCity || !selectedDistrict) return [];
    return RESTRICTED_LOCATIONS[selectedCity][selectedDistrict] || [];
  }, [selectedCity, selectedDistrict]);

  return (
    <div className="min-h-screen bg-slate-50 pt-6 md:pt-32 pb-20 relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <div className="text-center mb-6 md:mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-3 md:mb-6">
            <Search size={16} />
            <span>Sorgulama Merkezi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Kapalı Mahalle Sorgulama</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Göç İdaresi Başkanlığı tarafından yabancıların ikamet izni başvurularına kapatılan bölgeleri anında öğrenin.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Searchable City Input */}
                <div className="space-y-2 relative" ref={cityDropdownRef}>
                  <label className="text-sm font-semibold text-slate-700 ml-1">İl Seçiniz</label>
                  <div className="relative">
                    <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isCityDropdownOpen ? 'text-blue-500' : 'text-slate-400'}`} size={20} />
                    <input
                      type="text"
                      placeholder="Şehir adı yazın (Örn: İst...)"
                      value={citySearchTerm}
                      onChange={(e) => {
                        setCitySearchTerm(e.target.value);
                        setIsCityDropdownOpen(true);
                        if (selectedCity) setSelectedCity(''); // Yeni arama başladığında seçili ili sıfırla
                      }}
                      onFocus={() => setIsCityDropdownOpen(true)}
                      className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:bg-slate-100 font-medium"
                    />
                    {citySearchTerm && (
                      <button 
                        type="button" 
                        onClick={() => { setCitySearchTerm(''); setSelectedCity(''); setIsCityDropdownOpen(false); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* City Dropdown Menu */}
                  <AnimatePresence>
                    {isCityDropdownOpen && filteredCities.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 max-h-60 overflow-y-auto"
                      >
                        {filteredCities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => handleCitySelect(city)}
                            className="w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between group"
                          >
                            <span className="font-medium text-slate-700 group-hover:text-blue-700">{city}</span>
                            <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* District Select */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">İlçe Seçiniz</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                       <Map size={20} />
                    </div>
                    <select
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      disabled={!selectedCity}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      <option value="">{selectedCity ? 'İlçe Seçin...' : 'Önce İl Seçin'}</option>
                      {districts.map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Mahalle Adı (Opsiyonel)</label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      list="neighborhoods"
                      type="text" 
                      placeholder={selectedDistrict ? "Mahalle adını yazın (Bırakırsanız ilçe bazlı sorgulanır)" : "Önce ilçe seçiniz"}
                      value={selectedNeighborhood}
                      onChange={(e) => {
                          setSelectedNeighborhood(e.target.value);
                          setHasSearched(false);
                      }}
                      disabled={!selectedDistrict}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    />
                    <datalist id="neighborhoods">
                        {closedNeighborhoodSuggestions.map(n => (
                            <option key={n} value={n} />
                        ))}
                    </datalist>
                  </div>
              </div>

              <button
                type="submit"
                disabled={!selectedCity || !selectedDistrict}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Sorgula <ArrowRight size={20} />
              </button>
            </form>
          </div>

          {hasSearched && (
            <div className={`p-8 md:p-10 border-t ${isRestricted ? 'bg-red-50' : 'bg-green-50'} animate-in slide-in-from-bottom-2 duration-500`}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0 ${isRestricted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {isRestricted ? <AlertTriangle size={40} /> : <CheckCircle size={40} />}
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className={`text-2xl font-bold mb-2 ${isRestricted ? 'text-red-700' : 'text-green-700'}`}>
                    {isRestricted ? 'Bu Bölge İkamete KAPALIDIR' : 'Bu Mahalle İkamete AÇIKTIR'}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    <span className="font-semibold">{selectedCity}</span> ili, <span className="font-semibold">{selectedDistrict}</span> ilçesi için yapılan sorgulama sonucu.
                  </p>
                  
                  {isRestricted ? (
                    <div className="space-y-4">
                      <div className="p-5 bg-white/80 rounded-2xl border border-red-100 text-sm text-red-900 leading-relaxed shadow-sm">
                        {isDistrictRestricted ? (
                          <p>
                            2022 yılı Ekim ayında yapılan değerlendirme sonucunda, Fatih ve Esenyurt ilçelerinin yanı sıra <strong>Avcılar, Bahçelievler, Başakşehir, Bağcılar, Esenler, Küçükçekmece, Sultangazi ve Zeytinburnu</strong> ilçeleri de yeni ikamet izni başvurularına kapatılmıştır.
                          </p>
                        ) : (
                          <p><strong>Dikkat:</strong> Bu mahalle yabancıların yeni ikamet izni başvurularına kapatılmıştır.</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 items-center">
                            <GraduationCap className="text-blue-600 shrink-0" size={18} />
                            <span className="text-xs font-bold text-blue-800">Öğrenci ikameti olanlar kayıt yapabilir.</span>
                         </div>
                         <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 items-center">
                            <UserCheck className="text-blue-600 shrink-0" size={18} />
                            <span className="text-xs font-bold text-blue-800">Aile ikamet izni olanlar kayıt yapabilir.</span>
                         </div>
                         <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 items-center">
                            <Briefcase className="text-blue-600 shrink-0" size={18} />
                            <span className="text-xs font-bold text-blue-800">Çalışma izni olanlar kayıt yapabilir.</span>
                         </div>
                         <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex gap-3 items-center">
                            <ShieldCheck className="text-emerald-600 shrink-0" size={18} />
                            <span className="text-xs font-bold text-emerald-800">İlçe içi adres değişikliği yapılabilir.</span>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 p-4 bg-white/60 rounded-xl border border-green-100 text-sm text-green-800">
                       <p><strong>Bilgi:</strong> Bu bölge şu an için kısıtlamalı bölgeler listesinde yer almamaktadır. Başvurunuzu güvenle yapabilirsiniz.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-center md:justify-end">
                 <Link to="/appointment" className="inline-flex items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors">
                    Detaylı Bilgi ve Destek Al <ChevronRight size={20} />
                 </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 text-blue-900">
           <Info className="shrink-0" size={24} />
           <div className="text-sm leading-relaxed">
              <p className="font-bold mb-1">Resmi Duyuru Hakkında</p>
              <p>
                İlgili kısıtlamalar Göç İdaresi Başkanlığı'nın 2022 yılındaki düzenlemeleri baz alınarak sisteme işlenmiştir. 
                Belirli izin türlerine sahip yabancılar (Öğrenci, Aile, Çalışma) bu kısıtlamalardan muaftır. 
                En güncel durum için <strong>Atasa Danışmanlık</strong> uzmanlarından teyit almanız önerilir.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ShieldAlert, CheckCircle2, ArrowRight, Gavel, Info, MessageCircle, HelpCircle, ExternalLink, X, ListFilter, HeartPulse, Scale, Anchor, ShieldCheck, Landmark, GraduationCap, Pickaxe, ArrowLeft, Sparkles } from 'lucide-react';
import { RESTRICTED_PROFESSIONS, Profession } from './professions-data';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';
import { Link } from 'react-router-dom';

// Simple Levenshtein distance for fuzzy matching
const getLevenshteinDistance = (a: string, b: string): number => {
  const tmp = [];
  for (let i = 0; i <= a.length; i++) tmp[i] = [i];
  for (let j = 0; j <= b.length; j++) tmp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
};

const normalizeText = (text: string): string => {
  return text
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
};

export const ProfessionsCheckerPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<'search' | 'list'>('search');
  const [suggestion, setSuggestion] = useState<Profession | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live results for autocomplete
  const liveResults = useMemo(() => {
    const term = normalizeText(searchTerm);
    if (!term || term.length < 1) return [];
    
    return RESTRICTED_PROFESSIONS.filter(p => 
      normalizeText(p.name).includes(term) || 
      normalizeText(p.category || '').includes(term)
    ).slice(0, 5);
  }, [searchTerm]);

  // Direct results for full search
  const finalResults = useMemo(() => {
    if (!hasSearched) return [];
    const term = normalizeText(searchTerm);
    return RESTRICTED_PROFESSIONS.filter(p => normalizeText(p.name).includes(term));
  }, [hasSearched, searchTerm]);

  // Fuzzy search / Typo correction logic
  useEffect(() => {
    if (hasSearched && finalResults.length === 0 && searchTerm.length > 3) {
      const term = normalizeText(searchTerm);
      let closest: Profession | null = null;
      let minDistance = 4; // Threshold for typo correction

      RESTRICTED_PROFESSIONS.forEach(p => {
        const dist = getLevenshteinDistance(term, normalizeText(p.name));
        if (dist < minDistance) {
          minDistance = dist;
          closest = p;
        }
      });
      setSuggestion(closest);
    } else {
      setSuggestion(null);
    }
  }, [hasSearched, finalResults, searchTerm]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      setHasSearched(true);
      setIsFocused(false);
    }
  };

  const selectItem = (p: Profession) => {
    setSearchTerm(p.name);
    setHasSearched(true);
    setIsFocused(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-6 md:pt-32 pb-20 relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-bold mb-3 md:mb-6 border border-red-200 shadow-sm">
            <Gavel size={16} />
            <span>Milli Meslek Koruması</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Yasaklı Meslekler <br/> <span className="text-red-600">Sorgulama Paneli</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Türkiye'de sadece Türk vatandaşlarının yapabileceği meslekleri ve ilgili kanun maddelerini anında sorgulayın.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'search' ? (
            <motion.div 
              key="search-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Search Bar Area */}
              <div className="relative z-50" ref={dropdownRef}>
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 p-6 md:p-10 pb-6">
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                      <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? 'text-red-500' : 'text-slate-400'}`} size={24} />
                      <input 
                        type="text"
                        placeholder="Örn: Avukat, Eczacı, Güvenlik Görevlisi..."
                        value={searchTerm}
                        onFocus={() => setIsFocused(true)}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setHasSearched(false);
                        }}
                        className="w-full pl-16 pr-32 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none text-xl font-medium transition-all shadow-inner"
                      />
                      <button 
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95"
                      >
                        Sorgula
                      </button>
                    </div>
                  </form>

                  {/* Autocomplete Dropdown */}
                  <AnimatePresence>
                    {isFocused && liveResults.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-10 right-10 top-full -mt-4 bg-white border border-slate-200 rounded-b-3xl shadow-2xl overflow-hidden z-50"
                      >
                        <div className="p-2">
                           <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Eşleşen Meslekler</div>
                           {liveResults.map((p, idx) => (
                             <button
                               key={idx}
                               onClick={() => selectItem(p)}
                               className="w-full text-left px-4 py-4 hover:bg-red-50 transition-colors flex items-center justify-between group"
                             >
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                                     <Gavel size={16} />
                                  </div>
                                  <span className="font-bold text-slate-700">{p.name}</span>
                               </div>
                               <ArrowRight size={14} className="text-slate-300 group-hover:text-red-500 transform group-hover:translate-x-1 transition-all" />
                             </button>
                           ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Suggestions & Toggle */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-bold text-slate-400">Hızlı Seçim:</span>
                      {["Güvenlik", "Eczacı", "Kaptanlık", "Maden"].map(s => (
                        <button 
                          key={s}
                          onClick={() => { setSearchTerm(s); setHasSearched(true); }}
                          className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setViewMode('list')}
                      className="flex items-center gap-2 text-red-600 font-black text-sm hover:underline group"
                    >
                      <ListFilter size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                      YASAKLI TÜM LİSTEYİ GÖR
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {/* "Did you mean?" Suggestion */}
                  {suggestion && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4 text-blue-800"
                    >
                      <Sparkles size={24} className="text-blue-500 shrink-0" />
                      <div className="text-sm">
                         Bunu mu demek istediniz? <button onClick={() => selectItem(suggestion)} className="font-black underline hover:text-blue-600 ml-1">{suggestion.name}</button>
                      </div>
                    </motion.div>
                  )}

                  {!hasSearched ? (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="grid md:grid-cols-2 gap-6 opacity-60"
                    >
                      <div className="bg-white/40 p-6 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center text-center justify-center">
                        <HelpCircle size={40} className="text-slate-300 mb-4" />
                        <p className="text-slate-400 font-medium">Hangi meslekler yasaklı?</p>
                      </div>
                      <div className="bg-white/40 p-6 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center text-center justify-center">
                        <Info size={40} className="text-slate-300 mb-4" />
                        <p className="text-slate-400 font-medium">Kanun maddesini öğrenin</p>
                      </div>
                    </motion.div>
                  ) : finalResults.length > 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {finalResults.map((p, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-6 group hover:border-red-200 transition-colors">
                          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${p.isRestricted ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {p.isRestricted ? <ShieldAlert size={40} /> : <CheckCircle2 size={40} />}
                          </div>
                          <div className="flex-grow text-center md:text-left">
                             <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                <h3 className="text-2xl font-black text-slate-900">{p.name}</h3>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.isRestricted ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                                  {p.isRestricted ? 'Yabancılara Yasaklı' : 'Yasal İzinle Açık'}
                                </span>
                             </div>
                             
                             <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm mb-4">
                                <Gavel size={14} /> 
                                <span className="font-bold">{p.law}</span> 
                                <span className="opacity-60">|</span> 
                                <span>{p.article}</span>
                             </div>

                             {p.alternative && (
                               <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 font-medium">
                                  <strong>Alternatif Yol:</strong> {p.alternative}
                                </div>
                             )}
                          </div>
                          <button 
                            onClick={openWhatsApp}
                            className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-red-600 transition-all shadow-md group-hover:scale-110 active:scale-95"
                            title="Danışmanlık Al"
                          >
                             <MessageCircle size={24} />
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-200"
                    >
                      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">"{searchTerm}" için Engel Bulunamadı</h3>
                      <p className="text-slate-500 mb-8">Bu meslek yasaklılar listesinde yer almıyor ancak çalışma izni kriterlerini sağlamanız gerekmektedir.</p>
                      <Link to="/appointment" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
                        Çalışma İzni İçin Randevu Al <ArrowRight size={20} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Back to Search Button */}
              <div className="flex justify-start">
                <button 
                  onClick={() => setViewMode('search')}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  ARAMA PANELİNE DÖN
                </button>
              </div>

              {/* Categorized List Content */}
              <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Yasaklı Meslekler Listesi</h2>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">T.C. Kanunları Gereği Korumalı Meslekler</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-12">
                  
                  {/* Category: Sağlık */}
                  <CategorySection icon={<HeartPulse size={20} className="text-rose-500" />} title="Sağlık Hizmetleri">
                    <RestrictedItem name="Diş Hekimliği" law="Tababet Kanunu" article="30. Madde" />
                    <RestrictedItem name="Eczacılık" law="Eczacılar Kanunu" article="2. Madde" />
                    <RestrictedItem name="Veteriner Hekimlik" law="Vet. Hekimliği Kanunu" article="2. Madde" />
                    <RestrictedItem name="Hastabakıcılık" law="Tababet Kanunu" article="63. Madde" />
                    <RestrictedItem name="Özel Hastane Mesul Müdürlüğü" law="H. Hastaneler Kanunu" article="9. Madde" />
                    <RestrictedItem name="Tıpta Uzmanlık Dışı Asistanlık" law="Tıpta Uzmanlık Tüzüğü" article="20. Madde" />
                    <RestrictedItem name="Sağlık Hizmet Birimi Sorumlusu" law="Sağlık Serbest Meslek Yön." article="5. Madde" />
                  </CategorySection>

                  {/* Category: Hukuk */}
                  <CategorySection icon={<Scale size={20} className="text-indigo-500" />} title="Hukuk ve Adalet">
                    <RestrictedItem name="Avukatlık" law="Avukatlar Kanunu" article="3. Madde" />
                    <RestrictedItem name="Noterlik" law="Noterlik Kanunu" article="7. Madde" />
                    <RestrictedItem name="Hakimlik ve Savcılık" law="H. ve Savcılar Kanunu" article="7. Madde" />
                    <RestrictedItem name="Arabuluculuk" law="Arabuluculuk Kanunu" article="20. Madde" />
                    <RestrictedItem name="Konkordato Komiserliği" law="Konkordato Yönetmeliği" article="4. Madde" />
                  </CategorySection>

                  {/* Category: Güvenlik */}
                  <CategorySection icon={<ShieldCheck size={20} className="text-emerald-500" />} title="Güvenlik ve Kamu Düzeni">
                    <RestrictedItem name="Özel Güvenlik Görevlisi" law="Özel Güvenlik Kanunu" article="10. Madde" />
                    <RestrictedItem name="Özel Güvenlik Şirketi Kurucu/Yöneticisi" law="Özel Güvenlik Kanunu" article="5. Madde" />
                    <RestrictedItem name="Çarşı ve Mahalle Bekçiliği" law="Bekçiler Kanunu" article="3. Madde" />
                    <RestrictedItem name="Fahri Trafik Müfettişliği" law="Karayolları Trafik Kanunu" article="Ek 6. Madde" />
                  </CategorySection>

                  {/* Category: Denizcilik */}
                  <CategorySection icon={<Anchor size={20} className="text-blue-500" />} title="Denizcilik ve Kabotaj">
                    <RestrictedItem name="Kaptanlık (Türk Karasuları)" law="Kabotaj Kanunu" article="3. Madde" />
                    <RestrictedItem name="Balık, İstiridye, Midye Avcılığı" law="Kabotaj Kanunu" article="3. Madde" />
                    <RestrictedItem name="Dalgıçlık, Kılavuzluk, Tayfalık" law="Kabotaj Kanunu" article="3. Madde" />
                    <RestrictedItem name="Gemi Acente Yetkilisi ve Personeli" law="Gemi Acenteleri Yönetmeliği" article="7. ve 8. Madde" />
                  </CategorySection>

                  {/* Category: Finans */}
                  <CategorySection icon={<Landmark size={20} className="text-amber-500" />} title="Finans ve Ticaret">
                    <RestrictedItem name="Mali Müşavirlik" law="Mali Müşavirlik Kanunu" article="4. Madde" />
                    <RestrictedItem name="Gümrük Müşavir Yardımcılığı" law="Gümrük Kanunu" article="227. Madde" />
                    <RestrictedItem name="Kooperatif Yönetim Kurulu Üyeliği" law="Kooperatifler Kanunu" article="56. Madde" />
                    <RestrictedItem name="Taşıma İşleri Organizatörlüğü" law="T. İşleri Yönetmeliği" article="7. Madde" />
                  </CategorySection>

                  {/* Category: Turizm & Eğitim */}
                  <CategorySection icon={<GraduationCap size={20} className="text-purple-500" />} title="Turizm ve Eğitim">
                    <RestrictedItem name="Turist Rehberliği" law="T. Rehberliği Kanunu" article="3. Madde" />
                    <RestrictedItem name="Seyahat Acente Sorumlusu" law="S. Acenteleri Kanunu" article="3. Madde" />
                    <RestrictedItem name="Yabancı Okulların Kurucuları" law="Özel Öğretim Kanunu" article="8. Madde" />
                  </CategorySection>

                  {/* Category: Teknik */}
                  <CategorySection icon={<Pickaxe size={20} className="text-slate-500" />} title="Teknik ve Saha İşleri">
                    <RestrictedItem name="Maden Daimî Nezaretçisi" law="Maden Yönetmeliği" article="125. Madde" />
                    <RestrictedItem name="Maden Teknik Eleman" law="Maden Yönetmeliği" article="130. Madde" />
                    <RestrictedItem name="Tarım Alanında İş Aracılığı" law="Tarımda İş Aracılığı Yönet." article="6. Madde" />
                    <RestrictedItem name="Havacılık Bilgi Yönetim Memuru" law="Havacılık Yönetmeliği" article="16. Madde" />
                    <RestrictedItem name="Spor Müşavirliği" law="Spor Müşavirleri Yönet." article="5. Madde" />
                  </CategorySection>

                </div>

                <div className="p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="font-bold text-lg">Bu mesleklerden birini mi yapıyorsunuz?</p>
                    <p className="text-slate-400 text-sm">Yasal alternatifler ve süreçler için uzmanlarımıza danışın.</p>
                  </div>
                  <button 
                    onClick={openWhatsApp}
                    className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                  >
                    <MessageCircle size={20} /> Hemen Bize Sorun
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Disclaimer & Source Link */}
        <div className="mt-12 p-6 bg-slate-200/50 rounded-3xl border border-slate-200 flex flex-col gap-4">
           <div className="flex gap-4 text-slate-500">
              <Info className="shrink-0" size={24} />
              <p className="text-xs leading-relaxed font-medium">
                <strong>Yasal Uyarı:</strong> Bu liste 6735 sayılı Uluslararası İşgücü Kanunu ve özel kanunlar çerçevesinde yabancılara kapatılmış meslekleri içerir. Listenin güncelliği için Atasa Danışmanlık uzmanlarından teyit almanız önerilir.
              </p>
           </div>
           
           <div className="pt-4 border-t border-slate-300/50">
              <a 
                href="https://www.csgb.gov.tr/uigm/calisma-izni/turk-vatandaslarina-hasredilen-meslekler/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-widest"
              >
                <ExternalLink size={14} />
                Resmi Kaynak: Çalışma ve Sosyal Güvenlik Bakanlığı (UİGM)
              </a>
           </div>
        </div>

      </div>
    </div>
  );
};

// Internal Components for the List
const CategorySection: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <h3 className="font-black text-slate-900 tracking-tight">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
      {children}
    </div>
  </div>
);

const RestrictedItem: React.FC<{ name: string, law: string, article: string }> = ({ name, law, article }) => (
  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-red-50 hover:border-red-100 transition-colors group cursor-default">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-red-700 transition-colors">{name}</h4>
        <p className="text-[10px] text-slate-500 font-medium">
          <span className="font-bold">{law}</span> • {article}
        </p>
      </div>
      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-red-500 shadow-sm transition-colors">
         <Gavel size={12} />
      </div>
    </div>
  </div>
);

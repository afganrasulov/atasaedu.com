
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Globe, ShieldCheck, ArrowRight, ArrowLeft, 
  Loader2, Info, MessageCircle, Zap, 
  LayoutGrid, ChevronRight, X,
  ArrowRightLeft, CheckCircle2, Lock, Youtube, Users, AlertTriangle, PhoneOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPassportIndexData, getVisaStatusTR, COUNTRY_NAMES_TR, PassportData } from './passportService';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

export const PassportIndexPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [allData, setAllData] = useState<PassportData[]>([]);
  const [passportList, setPassportList] = useState<{code: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View Mode: 'list' = Global List, 'check' = A to B Check
  const [viewMode, setViewMode] = useState<'list' | 'check'>('list');

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPassportCode, setSelectedPassportCode] = useState('TR');
  const [targetCountryCode, setTargetCountryCode] = useState('DE'); // Default Germany for Check Mode
  
  const currentPassport = useMemo(() => 
    allData.find(p => p.passport === selectedPassportCode)
  , [allData, selectedPassportCode]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const { passports, list } = await getPassportIndexData();
        setAllData(passports);
        setPassportList(list);
      } catch (error) {
        console.error("Data load error", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // --- LOGIC: LIST VIEW ---
  const filteredDestinations = useMemo(() => {
    if (!currentPassport) return [];
    const term = searchTerm.toLocaleLowerCase('tr-TR').trim();
    
    const getPriority = (color: string) => {
      if (color === 'emerald') return 1;
      if (color === 'blue') return 2;
      if (color === 'amber') return 3;
      return 4;
    };

    return Object.entries(currentPassport.requirements)
      .map(([destCode, visaCode]) => ({
        code: destCode,
        name: COUNTRY_NAMES_TR[destCode] || destCode,
        visa: getVisaStatusTR(visaCode as string)
      }))
      .filter(item => !term || item.name.toLocaleLowerCase('tr-TR').includes(term))
      .sort((a, b) => {
        const priorityA = getPriority(a.visa.color);
        const priorityB = getPriority(b.visa.color);
        if (priorityA !== priorityB) return priorityA - priorityB;
        return a.name.localeCompare(b.name, 'tr');
      });
  }, [currentPassport, searchTerm]);

  // --- LOGIC: CHECK MODE (A -> B) ---
  const checkResult = useMemo(() => {
    if (!currentPassport || !targetCountryCode) return null;
    
    const rawReq = currentPassport.requirements[targetCountryCode];
    const status = getVisaStatusTR(rawReq || 'visa required');
    const targetName = COUNTRY_NAMES_TR[targetCountryCode] || targetCountryCode;

    return {
      originName: COUNTRY_NAMES_TR[selectedPassportCode] || selectedPassportCode,
      targetName,
      status
    };
  }, [currentPassport, targetCountryCode, selectedPassportCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500 mb-4" />
        <span className="text-sm font-black uppercase tracking-widest text-slate-400">Küresel Veriler Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#000000] text-white selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-8 max-w-4xl mx-auto">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white/5 text-amber-500 mb-6 shadow-2xl border border-white/10">
             <Globe size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none">
            Pasaport <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">Endeksi</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            2025 verileriyle pasaportunuzun gücünü keşfedin veya iki ülke arasındaki vize durumunu anında sorgulayın.
          </p>
        </div>

        {/* Shared CTA for Foreigners */}
        <div className="mb-12">
           <ForeignerSupportCTA />
        </div>

        {/* View Mode Switcher */}
        <div className="flex justify-center mb-10">
           <div className="bg-white/10 p-1.5 rounded-2xl flex border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'list' ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                 <LayoutGrid size={16} /> Küresel Sıralama
              </button>
              <button 
                onClick={() => setViewMode('check')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'check' ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                 <ArrowRightLeft size={16} /> Hızlı Vize Kontrolü
              </button>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Selection & Global Stats */}
              <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black flex items-center gap-3">
                      <Zap className="text-amber-500" /> Pasaportunuzu Seçin
                    </h3>
                    <div className="relative">
                      <select 
                        value={selectedPassportCode} 
                        onChange={(e) => setSelectedPassportCode(e.target.value)} 
                        style={{ colorScheme: 'dark' }}
                        className="w-full bg-[#111111] border-2 border-white/10 rounded-2xl p-5 font-black text-xl text-white focus:border-amber-500 outline-none transition-all appearance-none cursor-pointer hover:bg-white/5 shadow-xl pr-12"
                      >
                        {passportList.map(p => (
                          <option key={p.code} value={p.code} className="bg-[#111111] text-white">
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-[2rem] p-6 border border-amber-500/20 shadow-xl group">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-2">DÜNYA SIRALAMASI</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-white">#{currentPassport?.rank || '-'}</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-[2rem] p-6 border border-blue-500/20 shadow-xl group">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">MOBİLİTE SKORU</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-white">{currentPassport?.mobilityScore || '-'}</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search & Grid */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 px-2">
                  <div className="flex-1 w-full">
                    <div className="relative group">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="Ülke ara..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-12 pr-12 text-base font-bold text-white focus:border-amber-500/50 outline-none transition-all" 
                      />
                      {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full text-slate-400">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="mt-3 pl-4 flex items-start gap-2 opacity-80 hover:opacity-100 transition-opacity">
                       <AlertTriangle size={14} className="text-red-500/80 shrink-0 mt-0.5" />
                       <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                          <span className="text-red-400">Lütfen Dikkat:</span> Firmamız sadece Türkiye'de yaşayan yabancılar için (İkamet, Çalışma İzni) danışmanlık vermektedir. <span className="text-slate-300">Yurt dışı vize işlemleri (Schengen, Amerika, Dubai vb.) hizmetimiz yoktur.</span>
                       </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredDestinations.map((dest, idx) => (
                      <motion.div 
                        key={dest.code} 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: Math.min(idx * 0.01, 0.3) }}
                        className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all group relative overflow-hidden flex flex-col justify-between h-36"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-7 rounded shadow-lg overflow-hidden border border-white/10">
                                <img 
                                  src={`https://flagcdn.com/w80/${dest.code.toLowerCase()}.png`} 
                                  className="w-full h-full object-cover" 
                                  alt={dest.name}
                                  onError={(e) => { e.currentTarget.src = 'https://flagcdn.com/w80/un.png' }}
                                />
                             </div>
                             <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{dest.code}</span>
                          </div>
                          
                          {dest.visa.label === 'VİZE GEREKLİ' ? (
                             <Lock size={16} className="text-red-500/50" />
                          ) : (
                             <CheckCircle2 size={16} className="text-emerald-500/50" />
                          )}
                        </div>

                        <div>
                           <h4 className="text-lg font-bold mb-1 group-hover:text-amber-500 transition-colors truncate">{dest.name}</h4>
                           <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide border border-current opacity-80 ${
                              dest.visa.color === 'emerald' ? 'text-emerald-400' :
                              dest.visa.color === 'blue' ? 'text-blue-400' :
                              dest.visa.color === 'amber' ? 'text-amber-400' :
                              dest.visa.color === 'slate' ? 'text-slate-400' : 'text-red-400'
                           }`}>
                              {dest.visa.label}
                           </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="check-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
               {/* Quick Check Interface */}
               <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative mb-12">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-[3rem]"></div>
                  
                  <div className="relative z-10 flex flex-col gap-8">
                     
                     <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Origin */}
                        <div className="space-y-4">
                           <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Pasaportunuz</label>
                           <div className="relative group">
                              <select 
                                value={selectedPassportCode} 
                                onChange={(e) => setSelectedPassportCode(e.target.value)} 
                                style={{ colorScheme: 'dark' }}
                                className="w-full bg-[#111111]/80 border-2 border-white/20 rounded-2xl p-5 pl-16 font-bold text-lg text-white focus:border-amber-500 outline-none transition-all appearance-none cursor-pointer hover:bg-white/5"
                              >
                                {passportList.map(p => (
                                  <option key={p.code} value={p.code} className="bg-[#111111] text-white">
                                    {p.name}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                 <img 
                                    src={`https://flagcdn.com/w40/${selectedPassportCode.toLowerCase()}.png`} 
                                    className="w-8 h-6 rounded object-cover shadow-sm" 
                                    alt="Flag"
                                 />
                              </div>
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                 <ChevronDownIcon size={20} />
                              </div>
                           </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center md:pt-8">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-amber-500 animate-pulse">
                              <ArrowRight size={24} className="hidden md:block" />
                              <ArrowDownIcon size={24} className="md:hidden" />
                           </div>
                        </div>

                        {/* Destination */}
                        <div className="space-y-4 md:-ml-8 lg:-ml-0">
                           <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Gidilecek Ülke</label>
                           <div className="relative group">
                              <select 
                                value={targetCountryCode} 
                                onChange={(e) => setTargetCountryCode(e.target.value)} 
                                style={{ colorScheme: 'dark' }}
                                className="w-full bg-[#111111]/80 border-2 border-white/20 rounded-2xl p-5 pl-16 font-bold text-lg text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer hover:bg-white/5"
                              >
                                {passportList.map(p => (
                                  <option key={p.code} value={p.code} className="bg-[#111111] text-white">
                                    {p.name}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                 <img 
                                    src={`https://flagcdn.com/w40/${targetCountryCode.toLowerCase()}.png`} 
                                    className="w-8 h-6 rounded object-cover shadow-sm" 
                                    alt="Flag"
                                 />
                              </div>
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                 <ChevronDownIcon size={20} />
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Result Card */}
                     {checkResult && (
                        <motion.div 
                           key={targetCountryCode}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className={`mt-4 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden border-2 ${
                              checkResult.status.color === 'emerald' ? 'bg-emerald-900/40 border-emerald-500/50' : 
                              checkResult.status.color === 'blue' ? 'bg-blue-900/40 border-blue-500/50' :
                              checkResult.status.color === 'amber' ? 'bg-amber-900/40 border-amber-500/50' :
                              checkResult.status.color === 'red' ? 'bg-red-900/40 border-red-500/50' : 
                              'bg-slate-800/50 border-slate-600/50'
                           }`}
                        >  
                           <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 pointer-events-none ${
                              checkResult.status.color === 'emerald' ? 'bg-emerald-500' : 
                              checkResult.status.color === 'blue' ? 'bg-blue-500' :
                              checkResult.status.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                           }`}></div>

                           <div className="relative z-10">
                              <span className="text-xs font-black uppercase tracking-[0.3em] opacity-60 mb-4 block">VİZE DURUMU</span>
                              
                              <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tighter ${
                                 checkResult.status.color === 'emerald' ? 'text-emerald-400' : 
                                 checkResult.status.color === 'blue' ? 'text-blue-400' :
                                 checkResult.status.color === 'amber' ? 'text-amber-400' :
                                 checkResult.status.color === 'red' ? 'text-red-400' : 'text-slate-300'
                              }`}>
                                 {checkResult.status.label}
                              </h2>

                              <div className="flex items-center justify-center gap-2 mb-8">
                                 <span className="text-xl font-bold text-white">{checkResult.originName}</span>
                                 <ArrowRight size={20} className="text-slate-500" />
                                 <span className="text-xl font-bold text-white">{checkResult.targetName}</span>
                              </div>

                              <div className="flex justify-center gap-4">
                                 <button onClick={openWhatsApp} className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                                    <MessageCircle size={20} /> Detaylı Bilgi Al
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                     )}

                  </div>
               </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Data Source Info */}
        <div className="mt-16 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row gap-6 items-center text-slate-500">
           <Info className="shrink-0 text-amber-500" size={32} />
           <div className="text-sm leading-relaxed text-center md:text-left">
             <p className="font-bold mb-1">Yasal Uyarı</p>
             <p className="italic">
               Bu sayfadaki veriler <strong>Passport Index API</strong> üzerinden çekilmektedir. Vize politikaları ülkeler tarafından her an değiştirilebilir.
               <br/><span className="text-red-400 font-bold">Tekrar hatırlatmak gerekirse; firmamız yurt dışı vize başvurusu (Schengen, ABD vb.) yapmamaktadır.</span>
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const ForeignerSupportCTA = () => {
  const TOP_SERVED_COUNTRIES = [
    { code: 'TM', name: 'Türkmenistan' },
    { code: 'RU', name: 'Rusya' },
    { code: 'IR', name: 'İran' },
    { code: 'IQ', name: 'Irak' },
    { code: 'AF', name: 'Afganistan' },
    { code: 'AZ', name: 'Azerbaycan' },
    { code: 'UZ', name: 'Özbekistan' },
    { code: 'UA', name: 'Ukrayna' },
    { code: 'KZ', name: 'Kazakistan' },
    { code: 'PK', name: 'Pakistan' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:border-white/20 transition-colors"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 text-left">
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                <ShieldCheck size={14} /> Atasa Destek
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Türkiye'de Yabancı Mısınız?</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                İkamet, çalışma izni veya vatandaşlık işlemlerinde sorun mu yaşıyorsunuz? 
                Bürokrasiyi bize bırakın.
            </p>

            <div className="mt-5 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mask-linear-fade">
                {TOP_SERVED_COUNTRIES.map((c) => (
                  <div key={c.code} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1.5 rounded-lg shrink-0 grayscale hover:grayscale-0 transition-all">
                      <img 
                        src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} 
                        alt={c.name} 
                        className="w-4 h-3 rounded-[2px] object-cover" 
                      />
                      <span className="text-[10px] font-bold text-slate-300">{c.name}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
            <Link 
                to="/appointment"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-blue-500 shadow-lg shadow-blue-900/20 w-full md:w-auto"
            >
                Biz Yardımcı Olalım <ArrowRight size={16} />
            </Link>
          </div>
      </div>
    </motion.div>
  );
};

// Helper Icons
const ChevronDownIcon = ({size}: {size:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const ArrowDownIcon = ({size, className}: {size:number, className?: string}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>;


import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, AlertTriangle, CheckCircle2, Info, ArrowLeft, 
  RotateCcw, Globe, Calendar, CreditCard, Banknote, 
  MessageCircle, ArrowRight, ShieldAlert, Sparkles, Zap,
  TrendingUp, Landmark, FileText, UserCheck, LogOut, Clock,
  Search, X, ChevronDown, UserRoundSearch
} from 'lucide-react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { useWhatsApp } from '../whatsapp/WhatsAppContext';
import { COUNTRY_RULES, CONSTANTS_2025 } from './visa-penalty-data';

// Görseldeki özel hesaplama gerektiren ülkeler (Türkmenistan artık özel mantıkla otomatik hesaplanıyor)
const SPECIAL_COUNTRIES = [
  'Çek Cumhuriyeti', 
  'Çekya', 
  'Danimarka', 
  'İrlanda', 
  'Kosova', 
  'Nepal', 
  'Sri Lanka', 
  'Suriye'
];

export const VisaPenaltyCalculator: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  
  // Form State
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  
  const [entryDate, setEntryDate] = useState('');
  const [enteredWithVisa, setEnteredWithVisa] = useState<'Evet' | 'Hayır'>('Hayır');
  const [hasResidencePermit, setHasResidencePermit] = useState<'Evet' | 'Hayır'>('Hayır');
  const [residenceEndDate, setResidenceEndDate] = useState('');
  const [exitDate, setExitDate] = useState('');
  
  // Config State
  const [usdRate, setUsdRate] = useState<number>(36.00); 
  const [showResult, setShowResult] = useState(false);

  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    const term = countrySearch.toLocaleLowerCase('tr-TR');
    if (!term) return COUNTRY_RULES;
    return COUNTRY_RULES.filter(c => c.name.toLocaleLowerCase('tr-TR').includes(term));
  }, [countrySearch]);

  const handleCountrySelect = (name: string) => {
    setSelectedCountryName(name);
    setCountrySearch(name);
    setIsCountryDropdownOpen(false);
  };

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (res.ok) {
          const data = await res.json();
          if (data.rates && data.rates.TRY) {
            setUsdRate(data.rates.TRY);
          }
        }
      } catch (error) {
        console.warn('Currency fetch failed, using default.');
      }
    };
    fetchRate();
  }, []);

  const isSpecialCountry = useMemo(() => 
    SPECIAL_COUNTRIES.includes(selectedCountryName)
  , [selectedCountryName]);

  const calculation = useMemo(() => {
    if (!selectedCountryName || !entryDate || !exitDate) return null;
    if (hasResidencePermit === 'Evet' && !residenceEndDate) return null;

    // Özel ülkeler için detaylı hesaplama yerine flag dönüyoruz
    if (isSpecialCountry) {
        return { isSpecial: true };
    }

    const countryRule = COUNTRY_RULES.find(c => c.name === selectedCountryName);
    if (!countryRule) return null;

    let legalStayEndDate: Date;
    const entry = new Date(entryDate);
    let legalStayDescription = '';

    if (hasResidencePermit === 'Evet') {
      legalStayEndDate = new Date(residenceEndDate);
      legalStayDescription = `İkamet İzni Bitiş: ${legalStayEndDate.toLocaleDateString('tr-TR')}`;
    } else {
      const visaDurationDays = countryRule.visaDurationMonths * 30;
      legalStayEndDate = new Date(entry);
      legalStayEndDate.setDate(legalStayEndDate.getDate() + visaDurationDays);
      legalStayDescription = `${countryRule.visaDurationMonths} Ay Yasal Vize Süresi (${visaDurationDays} Gün)`;
    }
    
    legalStayEndDate.setHours(0, 0, 0, 0);
    const exit = new Date(exitDate);
    exit.setHours(0, 0, 0, 0);

    const diffTime = exit.getTime() - legalStayEndDate.getTime();
    const overstayDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (overstayDays <= 0) {
      return { isLegal: true, totalTry: 0 };
    }

    const penaltyMonths = Math.ceil(overstayDays / 30);
    const rates = CONSTANTS_2025.RATES[countryRule.group];
    
    // Türkmenistan için özel kural: Gecikme cezası (USD) alınmaz, sadece harçlar alınır.
    let usdPenalty = 0;
    if (selectedCountryName !== 'Türkmenistan') {
      usdPenalty = rates.first;
      if (penaltyMonths > 1) {
        usdPenalty += (penaltyMonths - 1) * rates.month;
      }
    }

    let visaFeeTL = 0;
    const isExempt = countryRule.isVisaFeeExempt || enteredWithVisa === 'Evet' || hasResidencePermit === 'Evet';
    
    if (!isExempt) {
      visaFeeTL = CONSTANTS_2025.VISA_FEE;
    }

    const cardFeeTL = CONSTANTS_2025.CARD_FEE;
    const penaltyTL = usdPenalty * usdRate;
    const totalTL = penaltyTL + visaFeeTL + cardFeeTL;

    return {
      isLegal: false,
      isSpecial: false,
      overstayDays,
      penaltyMonths,
      group: countryRule.group,
      usdPenalty,
      penaltyTL,
      visaFeeTL,
      cardFeeTL,
      totalTL,
      totalUSD: totalTL / usdRate,
      legalStayDescription,
      legalStayEndDate: legalStayEndDate.toLocaleDateString('tr-TR'),
      isTurkmenistan: selectedCountryName === 'Türkmenistan'
    };

  }, [selectedCountryName, entryDate, enteredWithVisa, hasResidencePermit, residenceEndDate, exitDate, usdRate, isSpecialCountry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountryName && entryDate && exitDate) {
        if (hasResidencePermit === 'Evet' && !residenceEndDate) return;
        setShowResult(true);
    }
  };

  const reset = () => {
    setShowResult(false);
    setSelectedCountryName('');
    setCountrySearch('');
    setEntryDate('');
    setEnteredWithVisa('Hayır');
    setHasResidencePermit('Hayır');
    setResidenceEndDate('');
    setExitDate('');
  };

  const inputClasses = "w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 font-bold appearance-none cursor-pointer";
  const labelClasses = "block text-xs font-black text-slate-500 mb-2 ml-1 uppercase tracking-widest";

  const openDatePicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      const target = e.currentTarget as HTMLInputElement;
      if (typeof target.showPicker === 'function') {
        target.showPicker();
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-4 md:mb-10">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-4 md:mb-8 shadow-2xl border border-slate-100 transform -rotate-3">
             <Calculator size={40} />
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-[#0f172a] mb-6 tracking-tighter leading-none">
            Vize Cezası <br/> <span className="text-blue-600">Hesaplama</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Vize veya ikamet ihlali durumunda ödemeniz gereken güncel ceza ve harç tutarlarını 2025 tarifesine göre hesaplayın.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="p-8 md:p-14 space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2" ref={countryDropdownRef}>
                    <label className={labelClasses}>Vatandaşı Olduğunuz Ülke</label>
                    <div className="relative">
                      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isCountryDropdownOpen ? 'text-blue-500' : 'text-slate-400'}`} size={20} />
                      <input 
                        type="text"
                        placeholder="Ülke Ara..."
                        value={countrySearch}
                        onClick={() => setIsCountryDropdownOpen(true)}
                        onFocus={() => setIsCountryDropdownOpen(true)}
                        onChange={(e) => {
                          setCountrySearch(e.target.value);
                          setSelectedCountryName('');
                          setIsCountryDropdownOpen(true);
                        }}
                        className={`${inputClasses} pl-12 pr-10`}
                        required={!selectedCountryName}
                      />
                      {countrySearch ? (
                        <button 
                          type="button"
                          onClick={() => { setCountrySearch(''); setSelectedCountryName(''); setIsCountryDropdownOpen(true); }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full"
                        >
                          <X size={14} />
                        </button>
                      ) : (
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                      )}

                      <AnimatePresence>
                        {isCountryDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto z-50"
                          >
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map(c => (
                                <button
                                  key={c.name}
                                  type="button"
                                  onClick={() => handleCountrySelect(c.name)}
                                  className="w-full text-left px-5 py-3.5 hover:bg-blue-50 transition-colors font-bold text-slate-700 flex items-center justify-between group border-b border-slate-50 last:border-0"
                                >
                                  {c.name}
                                  {selectedCountryName === c.name && <CheckCircle2 size={16} className="text-blue-600" />}
                                </button>
                              ))
                            ) : (
                              <div className="p-4 text-center text-slate-400 font-medium text-sm">Sonuç bulunamadı.</div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Türkiye'ye Giriş Tarihi</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={20} />
                      <input 
                        type="date" 
                        required
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        onClick={openDatePicker}
                        className={`${inputClasses} pl-12`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>Vize ile mi giriş yaptınız?</label>
                    <div className="flex gap-4">
                      {['Evet', 'Hayır'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setEnteredWithVisa(opt as any)}
                          className={`flex-1 py-4 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${enteredWithVisa === opt ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                        >
                          {opt === 'Evet' && <CheckCircle2 size={18} />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>İkamet İzni Aldınız mı?</label>
                    <div className="flex gap-4">
                      {['Evet', 'Hayır'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setHasResidencePermit(opt as any)}
                          className={`flex-1 py-4 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${hasResidencePermit === opt ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                        >
                          {opt === 'Evet' && <UserCheck size={18} />} {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {hasResidencePermit === 'Evet' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2 overflow-hidden">
                      <label className={labelClasses}>İkamet İzni Bitiş Tarihi</label>
                      <div className="relative max-w-md group">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={20} />
                        <input 
                          type="date" 
                          required={hasResidencePermit === 'Evet'}
                          value={residenceEndDate}
                          onChange={(e) => setResidenceEndDate(e.target.value)}
                          onClick={openDatePicker}
                          className={`${inputClasses} pl-12`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className={labelClasses}>Çıkış Yapılan / Yapılacak Tarih</label>
                      <div className="relative group">
                        <LogOut className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={20} />
                        <input 
                          type="date" 
                          required
                          value={exitDate}
                          onChange={(e) => setExitDate(e.target.value)}
                          onClick={openDatePicker}
                          className={`${inputClasses} pl-12`}
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className={labelClasses}>Dolar Kuru (Otomatik)</label>
                      <div className="relative">
                        <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        <input 
                          type="number" 
                          step="0.01"
                          value={usdRate}
                          onChange={(e) => setUsdRate(parseFloat(e.target.value))}
                          className={`${inputClasses} pl-12`}
                        />
                      </div>
                   </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0f172a] text-white py-6 rounded-3xl font-black text-2xl hover:bg-blue-600 transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-4 group"
                >
                  Cezayı Hesapla <Zap size={28} className="group-hover:rotate-12 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-14 flex flex-col h-full"
              >
                {/* ÖZEL ÜLKE KONTROLÜ */}
                {isSpecialCountry ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl border-2 border-white">
                            <UserRoundSearch size={48} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Özel Hesaplama Gereklidir</h2>
                        
                        <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-8 mb-10 max-w-2xl mx-auto">
                            <p className="text-orange-900 text-xl font-bold leading-relaxed">
                                {selectedCountryName} vatandaşları için vize cezası <span className="underline decoration-orange-400 decoration-4 underline-offset-4">özel olarak</span> hesaplanmaktadır.
                            </p>
                            <p className="text-orange-800/70 mt-4 text-sm font-medium">
                                İkili anlaşmalar ve güncel vize rejimleri nedeniyle en doğru tutarı öğrenmek için danışmanımızla görüşmeniz gerekmektedir.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                            <button onClick={reset} className="py-5 px-8 bg-slate-100 text-slate-600 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                <RotateCcw size={20} /> Geri Dön
                            </button>
                            <button onClick={openWhatsApp} className="py-5 px-12 bg-green-600 text-white rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group">
                                <MessageCircle size={28} fill="currentColor" className="group-hover:rotate-12 transition-transform" /> Danışmana Sor
                            </button>
                        </div>
                    </div>
                ) : (
                  <>
                    <div className="text-center mb-10">
                       <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl ${calculation?.isLegal ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {calculation?.isLegal ? <CheckCircle2 size={40} /> : <ShieldAlert size={40} />}
                       </div>
                       <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                         {calculation?.isLegal ? 'Yasal Süre İçindesiniz' : 'İhlal Tespit Edildi'}
                       </h2>
                    </div>

                    {!calculation?.isLegal ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                        <div className="space-y-4">
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">HESAPLAMA DETAYLARI</h3>
                          
                          <FinancialRow label="Yasal Kalış Bitiş" value={calculation?.legalStayEndDate || '-'} icon={<Calendar size={18} />} isText highlight />
                          <FinancialRow label="Cezalı Süre" value={`${calculation?.overstayDays} Gün (${calculation?.penaltyMonths} Ay)`} icon={<Clock size={18} />} isText />
                          
                          {calculation?.isTurkmenistan ? (
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 text-blue-900">
                               <Info className="text-blue-500 shrink-0" size={20} />
                               <p className="text-[11px] font-bold leading-relaxed">
                                  Türkmenistan vatandaşları için ceza süresine bakılmaksızın gecikme cezası uygulanmaz, sadece harçlar tahsil edilir.
                               </p>
                            </div>
                          ) : (
                            <FinancialRow label="Gecikme Cezası (USD)" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculation?.usdPenalty || 0)} icon={<Zap size={18} />} isText />
                          )}
                          
                          <FinancialRow label="Kart Bedeli" value={calculation?.cardFeeTL || 0} icon={<CreditCard size={18} />} currency="TRY" />
                          <FinancialRow label="Tek Giriş Vize Harcı" value={calculation?.visaFeeTL || 0} icon={<Banknote size={18} />} currency="TRY" highlight={calculation?.visaFeeTL === 0} subText={calculation?.visaFeeTL === 0 ? "Muaf / Ödenmiş" : "Zorunlu"} />

                          <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                             <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                                <TrendingUp size={14} className="text-blue-500" /> Hesaplanan Kur
                             </div>
                             <span className="font-black text-slate-900">{usdRate.toFixed(2)} TL</span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                           <div className="bg-[#0f172a] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl flex-1 flex flex-col justify-center border-4 border-blue-500/20">
                              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/20 z-20">
                                  <Sparkles size={14} className="animate-pulse" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Tahmini Tutar</span>
                              </div>

                              <div className="relative z-10 pt-4">
                                <span className="block text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-4">ÖDENECEK TOPLAM (TL)</span>
                                <div className="mb-6">
                                  <span className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(calculation?.totalTL || 0)}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                   <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                                      <Banknote size={20} />
                                   </div>
                                   <div>
                                      <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">USD KARŞILIĞI</span>
                                      <span className="text-2xl font-black text-white">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculation?.totalUSD || 0)}
                                      </span>
                                   </div>
                                </div>

                                <motion.div 
                                  initial={{ scale: 0.95, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.5, duration: 0.5 }}
                                  className="mt-8 p-5 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl flex items-start gap-4 relative group"
                                >
                                   <div className="bg-amber-500 p-2 rounded-xl shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                                      <AlertTriangle size={20} className="text-white" />
                                   </div>
                                   <div className="text-left">
                                      <span className="block text-[10px] font-black text-amber-400 uppercase tracking-[0.1em] mb-1">YASAL HATIRLATMA</span>
                                      <p className="text-sm font-black text-amber-50 leading-snug">
                                         Bu tutar bilgilendirme amaçlıdır. Kesin ceza tutarı <span className="underline decoration-amber-500 underline-offset-4">hudut kapısında</span> belirlenir.
                                      </p>
                                   </div>
                                   <div className="absolute inset-0 bg-amber-500/5 blur-xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
                                </motion.div>
                              </div>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-50 p-10 rounded-[2.5rem] border-2 border-green-100 text-center mb-12">
                         <p className="text-green-800 text-xl font-medium leading-relaxed">
                            Hesaplamalarımıza göre yasal kalış sürenizi aşmadınız.<br/>
                            <span className="font-bold text-green-900 mt-2 block">Cezai bir durum görünmüyor.</span>
                         </p>
                      </div>
                    )}

                    <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button onClick={reset} className="py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                        <RotateCcw size={20} /> Yeni Hesaplama
                      </button>
                      <button onClick={openWhatsApp} className="py-5 bg-green-600 text-white rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-3">
                        <MessageCircle size={24} fill="currentColor" /> Uzmana Danış
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FinancialRow: React.FC<{ 
  label: string, 
  value: number | string, 
  icon: React.ReactNode, 
  currency?: string, 
  isText?: boolean,
  highlight?: boolean,
  subText?: string
}> = ({ label, value, icon, currency, isText, highlight, subText }) => (
  <div className={`flex justify-between items-center p-4 rounded-2xl border transition-colors shadow-sm ${highlight ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100 hover:border-blue-200'}`}>
    <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${highlight ? 'bg-green-100 text-green-600 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
        {icon}
      </div>
      <div>
        {label}
        {subText && <span className="block text-[10px] text-slate-400 font-normal">{subText}</span>}
      </div>
    </div>
    <div className={`text-lg font-black ${highlight ? 'text-green-700' : 'text-slate-900'}`}>
      {isText ? value : new Intl.NumberFormat(currency === 'TRY' ? 'tr-TR' : 'en-US', { style: 'currency', currency: currency }).format(Number(value))}
    </div>
  </div>
);

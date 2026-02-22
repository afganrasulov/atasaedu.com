import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowLeft, ShieldCheck, CheckCircle2, 
  AlertTriangle, CreditCard, Barcode, Calendar, 
  Info, MessageCircle, ArrowRight, HelpCircle, Sparkles,
  Search, Bookmark, BadgeCheck, Zap, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

type Step = 'intro' | 'front_check' | 'barcode_check' | 'duration_calc' | 'result_success' | 'result_fail';

export const TurkmenistanVisaWizard: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [step, setStep] = useState<Step>('intro');
  const [visaType, setVisaType] = useState<'ziyaret' | 'turistik' | null>(null);
  const [barcodeType, setBarcodeType] = useState<'ikamet_amacli' | 'sadece_turistik' | null>(null);
  
  const currentYear = new Date().getFullYear();

  // Duration Calc States
  const [stayLimit, setStayLimit] = useState<number>(30);
  const [entryDate, setEntryDate] = useState<string>('');
  const [calculatedExitDate, setCalculatedExitDate] = useState<string | null>(null);

  const handleDurationCalc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryDate || stayLimit <= 0) return;
    
    const date = new Date(entryDate);
    date.setDate(date.getDate() + stayLimit);
    setCalculatedExitDate(date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));
  };

  const reset = () => {
    setStep('intro');
    setVisaType(null);
    setBarcodeType(null);
    setCalculatedExitDate(null);
  };

  const nextFromFront = (type: 'ziyaret' | 'turistik') => {
    setVisaType(type);
    if (type === 'ziyaret') {
      setStep('result_success');
    } else {
      setStep('barcode_check');
    }
  };

  const nextFromBarcode = (type: 'ikamet_amacli' | 'sadece_turistik') => {
    setBarcodeType(type);
    if (type === 'ikamet_amacli') {
      setStep('result_success');
    } else {
      setStep('result_fail');
    }
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc] selection:bg-blue-100 selection:text-blue-900">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Breadcrumb */}
        <div className="mb-4 md:mb-10">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden min-h-[600px] flex flex-col">
          
          <AnimatePresence mode="wait">
            {/* STEP: INTRO (Redesigned based on screenshot) */}
            {step === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 md:p-8 flex flex-col items-center justify-center flex-1"
              >
                {/* Dashed Border Container from Screenshot */}
                <div className="w-full max-w-2xl border-4 border-dashed border-blue-400/40 rounded-[2.5rem] p-8 md:p-16 flex flex-col items-center text-center bg-white/30 backdrop-blur-sm">
                  
                  {/* Shield Icon Container */}
                  <div className="w-28 h-28 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-slate-100 relative group">
                    <div className="absolute inset-0 bg-blue-400/10 blur-xl rounded-full scale-150 group-hover:scale-110 transition-transform"></div>
                    <ShieldCheck size={56} className="text-blue-600 relative z-10" />
                  </div>

                  {/* Animated Badge */}
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full mb-8 shadow-lg shadow-blue-200 border border-blue-500"
                  >
                    <Sparkles size={14} className="animate-pulse" />
                    Türkmenistan Vatandaşlarına Özel
                  </motion.div>

                  {/* Headings */}
                  <h1 className="flex flex-col gap-2 mb-8 select-none">
                    <span className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">Vize & İkamet</span>
                    <span className="text-5xl md:text-8xl font-black text-blue-600 tracking-tighter drop-shadow-sm">Uygunluk Testi</span>
                  </h1>

                  {/* Description with Dynamic Year */}
                  <p className="text-xl md:text-2xl text-slate-500 max-w-xl mx-auto leading-relaxed mb-12 font-medium">
                    {currentYear} yılı yeni vize kurallarına göre pasaportunuzdaki vizeyle Türkiye'de ikamet izni alıp alamayacağınızı 2 adımda öğrenin.
                  </p>

                  {/* Start Button */}
                  <button 
                    onClick={() => setStep('front_check')}
                    className="group bg-[#0f172a] text-white px-12 py-6 rounded-[2.5rem] font-black text-2xl flex items-center gap-4 hover:bg-blue-600 transition-all shadow-2xl hover:scale-105 active:scale-95"
                  >
                    Sorgulamayı Başlat <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP: FRONT CHECK */}
            {step === 'front_check' && (
              <motion.div 
                key="front"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="p-8 md:p-16 flex flex-col flex-1"
              >
                <div className="mb-10">
                   <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">ADIM 1 / 2</span>
                   <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mt-4 tracking-tight">Vize sayfanızı kontrol edin.</h2>
                   <p className="text-slate-500 text-lg mt-2 font-medium">Pasaportunuzdaki vize sayfasında "Vize Türü" (Visa Type) kısmında ne yazıyor?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <button 
                    onClick={() => nextFromFront('ziyaret')}
                    className="group bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left flex flex-col justify-between shadow-sm hover:shadow-xl"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">"ZİYARET"</h3>
                      <p className="text-sm text-slate-500 font-medium">Vize türü hanesinde doğrudan ziyaret yazıyor.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => nextFromFront('turistik')}
                    className="group bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left flex flex-col justify-between shadow-sm hover:shadow-xl"
                  >
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Search size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">"TURİSTİK"</h3>
                      <p className="text-sm text-slate-500 font-medium">Vize türü hanesinde turistik yazıyor.</p>
                    </div>
                  </button>
                </div>

                <div className="mt-auto bg-slate-50 p-6 rounded-3xl border border-slate-100 flex gap-4">
                  <Info className="text-blue-500 shrink-0" size={24} />
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "Ziyaret vizesi ile gelen Türkmenistan vatandaşları doğrudan ikamet iznine başvurma hakkına sahiptir."
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP: BARCODE CHECK */}
            {step === 'barcode_check' && (
              <motion.div 
                key="barcode"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="p-8 md:p-16 flex flex-col flex-1"
              >
                <div className="mb-10">
                   <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">ADIM 2 / 2</span>
                   <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mt-4 tracking-tight">Pasaportun arkasına bakın.</h2>
                   <p className="text-slate-500 text-lg mt-2 font-medium">Vize merkezinin bastığı barkodun sağ üst köşesinde ne yazıyor?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <button 
                    onClick={() => nextFromBarcode('ikamet_amacli')}
                    className="group bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-left flex flex-col justify-between shadow-sm hover:shadow-xl"
                  >
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Barcode size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">"TURİSTİK İKAMET İZNİ"</h3>
                      <p className="text-sm text-slate-500 font-medium">Barkodun üzerinde bu ibare yer alıyor.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => nextFromBarcode('sadece_turistik')}
                    className="group bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left flex flex-col justify-between shadow-sm hover:shadow-xl"
                  >
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Sadece "TURİSTİK"</h3>
                      <p className="text-sm text-slate-500 font-medium">Barkodda ikamet izni ibaresi yok.</p>
                    </div>
                  </button>
                </div>

                <div className="mt-auto bg-orange-50 p-6 rounded-3xl border border-orange-100 flex gap-4 text-orange-900">
                  <HelpCircle className="shrink-0" size={24} />
                  <p className="text-sm leading-relaxed font-medium">
                    "Barkodda 'Turistik İkamet İzni' yazmıyorsa, Türkiye'ye geldiğinizde Turizm amaçlı ikamet izni almanız mümkün değildir."
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP: SUCCESS RESULT */}
            {step === 'result_success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-16 flex flex-col flex-1 items-center text-center justify-center"
              >
                <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-bounce">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight">Tebrikler! İkamet Alabilirsiniz.</h2>
                <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10 font-medium">
                  Aldığınız vize türü Türkiye'ye geldiğinizde <span className="text-emerald-600 font-black">İkamet İzni (Oturum)</span> başvurusu yapmanıza olanak sağlamaktadır.
                </p>

                <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] w-full max-w-2xl text-left mb-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Zap size={100} />
                   </div>
                   <h4 className="font-black text-blue-400 uppercase tracking-widest text-xs mb-4">SIRADAKİ ADIMLAR</h4>
                   <ul className="space-y-4">
                     <li className="flex items-start gap-3">
                       <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                       <p className="text-slate-300">Vize süreniz (pasaportta yazan) dolmadan başvurunuzu yapın.</p>
                     </li>
                     <li className="flex items-start gap-3">
                       <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div>
                       <p className="text-slate-300">Gerekli evrakları (Sigorta, Adres, Gelir vb.) hazırlayın.</p>
                     </li>
                     <li className="flex items-start gap-3">
                       <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</div>
                       <p className="text-slate-300">Profesyonel dosya hazırlığı için Atasa Danışmanlık'tan destek alın.</p>
                     </li>
                   </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
                   <button 
                    onClick={() => setStep('duration_calc')}
                    className="flex-1 bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                   >
                     <Calendar size={20} /> Kalış Süresi Hesapla
                   </button>
                   <button 
                    onClick={openWhatsApp}
                    className="flex-1 bg-green-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-900/10"
                   >
                     <MessageCircle size={20} /> WhatsApp Destek
                   </button>
                </div>
                <button onClick={reset} className="mt-8 text-slate-400 font-bold hover:text-slate-600">Başa Dön</button>
              </motion.div>
            )}

            {/* STEP: FAIL RESULT */}
            {step === 'result_fail' && (
              <motion.div 
                key="fail"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-16 flex flex-col flex-1 items-center text-center justify-center"
              >
                <div className="w-24 h-24 bg-orange-500 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(249,115,22,0.4)]">
                  <AlertTriangle size={48} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight">Oturum İzni Alamazsınız.</h2>
                <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10 font-medium">
                  Aldığınız vize türü <span className="text-orange-600 font-black">sadece turistik</span> amaçlıdır. Türkiye'ye geldiğinizde Turizm amaçlı ikamet izni alamazsınız.
                </p>

                <div className="bg-orange-50 border-2 border-orange-100 p-8 rounded-[2.5rem] w-full max-w-2xl text-left mb-10">
                   <h4 className="font-black text-orange-700 uppercase tracking-widest text-xs mb-4">NE YAPABİLİRSİNİZ?</h4>
                   <p className="text-orange-900 font-medium leading-relaxed mb-6">
                     Hala bir şansınız olabilir! Farklı bir ikamet türü (Öğrenci, Aile vb.) veya istisnai durumlar için uzmanlarımıza danışın.
                   </p>
                   <Link 
                    to="/appointment"
                    className="inline-flex items-center gap-2 text-orange-700 font-black hover:gap-4 transition-all"
                   >
                     Alternatif Yolları Öğrenin <ArrowRight size={20} />
                   </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
                   <button 
                    onClick={() => setStep('duration_calc')}
                    className="flex-1 bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                   >
                     <Calendar size={20} /> Kalış Süresi Hesapla
                   </button>
                   <button 
                    onClick={openWhatsApp}
                    className="flex-1 bg-green-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-900/10"
                   >
                     <MessageCircle size={20} /> Uzmana Danış
                   </button>
                </div>
                <button onClick={reset} className="mt-8 text-slate-400 font-bold hover:text-slate-600">Başa Dön</button>
              </motion.div>
            )}

            {/* STEP: DURATION CALC */}
            {step === 'duration_calc' && (
              <motion.div 
                key="calc"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-16 flex flex-col flex-1"
              >
                <div className="text-center mb-12">
                   <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Calendar size={32} />
                   </div>
                   <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight">Kalış Süresi Hesaplama</h2>
                   <p className="text-slate-500 font-medium mt-2 italic">Pasaportunuzdaki "Stay Duration" hanesine göre hesaplayın.</p>
                </div>

                <div className="max-w-md mx-auto w-full">
                  <form onSubmit={handleDurationCalc} className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest">Giriş Tarihiniz</label>
                      <input 
                        type="date" 
                        required
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-lg font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest">Vizede Yazan Süre (Gün)</label>
                      <input 
                        type="number" 
                        placeholder="Örn: 30"
                        required
                        value={stayLimit}
                        onChange={(e) => setStayLimit(parseInt(e.target.value))}
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-lg font-bold"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl transition-all"
                    >
                      Hesapla
                    </button>
                  </form>

                  {calculatedExitDate && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-10 p-8 bg-blue-900 text-white rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                      <p className="text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-3">SON ÇIKIŞ TARİHİNİZ</p>
                      <p className="text-4xl font-black tracking-tight">{calculatedExitDate}</p>
                      <div className="mt-4 flex items-center justify-center gap-2 text-blue-200 text-xs font-bold">
                         <AlertTriangle size={14} className="text-yellow-400" />
                         Bu tarihten önce çıkış yapmalı veya ikamet almalısınız.
                      </div>
                    </motion.div>
                  )}

                  <button 
                    onClick={() => setStep(visaType === 'ziyaret' ? 'result_success' : barcodeType === 'ikamet_amacli' ? 'result_success' : 'result_fail')}
                    className="mt-8 w-full text-slate-400 font-bold hover:text-slate-600"
                  >
                    Sorgulamayı Baştan Al
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Branding */}
          <div className="p-8 border-t border-slate-100 flex justify-between items-center bg-white/40">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg">A</div>
                <span className="text-xs font-black text-[#0f172a] uppercase tracking-widest">Atasa Danışmanlık</span>
             </div>
             <div className="flex gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase">Resmi & Güvenilir</span>
             </div>
          </div>
        </div>

        {/* Global Video Reference Box */}
        <div className="mt-12 p-8 bg-[#0f172a] rounded-[2.5rem] shadow-2xl text-white flex flex-col md:flex-row items-center gap-8 border border-white/5 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10"></div>
           <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl group cursor-pointer hover:scale-110 transition-transform">
              <Zap size={40} className="fill-white" />
           </div>
           <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl font-black mb-2 tracking-tight">Uzmanından Dinleyin</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Ömer Habib'in Türkmenistan vatandaşları için hazırladığı 2025 vize bilgilendirme videosunu mutlaka izleyin.
              </p>
           </div>
           <a 
            href="https://www.youtube.com/watch?v=9-IANrUipWs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all shadow-xl whitespace-nowrap"
           >
              Videoyu İzle
           </a>
        </div>

      </div>
    </div>
  );
};
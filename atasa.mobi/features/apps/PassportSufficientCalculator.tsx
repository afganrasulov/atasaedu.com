
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ArrowLeft, 
  RotateCcw, 
  Clock, 
  MessageCircle, 
  ChevronRight,
  CreditCard,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

export const PassportSufficientCalculator: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [passportDate, setPassportDate] = useState('');
  const [permitDate, setPermitDate] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculation = useMemo(() => {
    if (!passportDate || !permitDate) return null;

    const passport = new Date(passportDate);
    const permit = new Date(permitDate);
    
    // Rule: Permit expiry must be at least 2 months BEFORE passport expiry
    const latestPermitDate = new Date(passport);
    latestPermitDate.setMonth(latestPermitDate.getMonth() - 2);

    const diffMs = latestPermitDate.getTime() - permit.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = (diffDays / 30).toFixed(1);

    return {
      isSufficient: diffDays >= 0,
      diffDays,
      diffMonths,
      latestPermitDate: latestPermitDate.toLocaleDateString('tr-TR'),
      passportDate: passport.toLocaleDateString('tr-TR'),
      permitDate: permit.toLocaleDateString('tr-TR')
    };
  }, [passportDate, permitDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passportDate && permitDate) setShowResult(true);
  };

  const reset = () => {
    setShowResult(false);
    setPassportDate('');
    setPermitDate('');
  };

  const inputClasses = "w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 font-bold appearance-none cursor-pointer";
  const labelClasses = "block text-xs font-black text-slate-500 mb-2 ml-1 uppercase tracking-widest";

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="mb-4 md:mb-10">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-4 md:mb-8 shadow-2xl border border-slate-100 transform -rotate-3">
             <CreditCard size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-6 tracking-tighter leading-none">
            Pasaport Süresi <br/> <span className="text-blue-600">Yeterli mi?</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            İkamet veya çalışma izni başvurusu yapmadan önce pasaport sürenizin yasal kurala (60 gün fark) uygunluğunu kontrol edin.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
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
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>Pasaport Bitiş Tarihi</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={20} />
                      <input 
                        type="date" 
                        required
                        value={passportDate}
                        onChange={(e) => setPassportDate(e.target.value)}
                        className={`${inputClasses} pl-12`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Talep Edilen İzin Bitiş Tarihi</label>
                    <div className="relative group">
                      <History className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" size={20} />
                      <input 
                        type="date" 
                        required
                        value={permitDate}
                        onChange={(e) => setPermitDate(e.target.value)}
                        className={`${inputClasses} pl-12`}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0f172a] text-white py-6 rounded-3xl font-black text-2xl hover:bg-blue-600 transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-4 group"
                >
                  Kontrol Et <ChevronRight size={28} />
                </button>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 text-blue-900">
                  <Info className="shrink-0 text-blue-500" size={24} />
                  <p className="text-sm font-bold leading-relaxed">
                    Yasal Kural: İkamet veya çalışma izni bitiş tarihi, pasaport bitiş tarihinden en az <span className="text-blue-700 underline">60 gün (2 ay)</span> önce olmalıdır.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-14 flex flex-col h-full"
              >
                <div className="text-center mb-10">
                   <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl ${calculation?.isSufficient ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {calculation?.isSufficient ? <CheckCircle2 size={48} /> : <AlertTriangle size={48} />}
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                     {calculation?.isSufficient ? 'Pasaport Süresi Yeterli' : 'Pasaport Süresi Yetersiz'}
                   </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-12">
                   <ResultRow label="Pasaport Bitiş" value={calculation?.passportDate || '-'} icon={<CreditCard size={18}/>} />
                   <ResultRow label="En Geç İzin Bitiş" value={calculation?.latestPermitDate || '-'} icon={<Calendar size={18}/>} highlight />
                   <ResultRow label="Talep Edilen Bitiş" value={calculation?.permitDate || '-'} icon={<History size={18}/>} />
                   
                   <div className={`p-6 rounded-[2rem] border-2 mt-4 text-center ${calculation?.isSufficient ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                      <p className="text-lg font-bold">
                        {calculation?.isSufficient 
                          ? `Kurala göre fazladan ${calculation?.diffDays} gün (~${calculation?.diffMonths} ay) süreniz daha bulunuyor.`
                          : `Pasaport kuralı ${Math.abs(calculation?.diffDays || 0)} gün aşıldığı için başvurunuz reddedilebilir.`}
                      </p>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={reset} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    <RotateCcw size={20} /> Yeni Sorgulama
                  </button>
                  <button onClick={openWhatsApp} className="flex-1 py-5 bg-green-600 text-white rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                    <MessageCircle size={24} fill="currentColor" /> Uzmana Danış
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ResultRow: React.FC<{ label: string, value: string, icon: React.ReactNode, highlight?: boolean }> = ({ label, value, icon, highlight }) => (
  <div className={`flex justify-between items-center p-5 rounded-2xl border transition-all ${highlight ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-slate-100'}`}>
    <div className="flex items-center gap-3 text-slate-500 font-bold">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
        {icon}
      </div>
      {label}
    </div>
    <div className={`text-xl font-black ${highlight ? 'text-blue-700' : 'text-slate-900'}`}>
      {value}
    </div>
  </div>
);

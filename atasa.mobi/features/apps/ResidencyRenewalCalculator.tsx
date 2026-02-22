import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  History, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  ArrowLeft,
  RotateCcw,
  Hourglass,
  Home as HomeIcon,
  UserPlus,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

type ResidencyType = 'Kısa Dönem' | 'Aile' | 'Öğrenci' | 'Uzun Dönem';

export const ResidencyRenewalCalculator: React.FC = () => {
  const [resType, setResType] = useState<ResidencyType>('Kısa Dönem');
  const [endDate, setEndDate] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculation = useMemo(() => {
    if (!endDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiryDate = new Date(endDate);
    expiryDate.setHours(0, 0, 0, 0);

    // Toplam Kalan Gün (Bitiş Tarihi - Bugün)
    const diffTimeTotal = expiryDate.getTime() - today.getTime();
    const totalDaysRemaining = Math.ceil(diffTimeTotal / (1000 * 60 * 60 * 24));

    // Uzatma Penceresine Kalan Gün (Toplam Kalan - 60 Gün)
    const safeDaysLeft = totalDaysRemaining - 60;

    // Başvuru Başlangıç Tarihi
    const appWindowStartDate = new Date(expiryDate);
    appWindowStartDate.setDate(appWindowStartDate.getDate() - 60);
    const dateStr = appWindowStartDate.toLocaleDateString('tr-TR');

    let title = "";
    let subMessage = "";
    let status: 'future' | 'active' | 'expired' = 'future';

    if (totalDaysRemaining < 0) {
      status = 'expired';
      title = `İkamet İzniniz ${Math.abs(totalDaysRemaining)} gün önce dolmuş!`;
      subMessage = "Yasal statünüzü kaybetmiş olabilirsiniz. Acil danışmanlık için bize ulaşın.";
    } else if (safeDaysLeft > 0) {
      status = 'future';
      title = `Uzatma başvurunuza ${safeDaysLeft} gün var.`;
      subMessage = `${dateStr} tarihinden itibaren e-ikamet üzerinden başvuru yapabilirsiniz.`;
    } else {
      status = 'active';
      title = "Uzatma Başvuru Dönemindesiniz!";
      subMessage = `Yasal 60 günlük pencere içindesiniz. İzninizin bitmesine ${totalDaysRemaining} gün kaldı.`;
    }

    return {
      title,
      subMessage,
      status,
      appWindowStartDate: dateStr,
      expiryDate: expiryDate.toLocaleDateString('tr-TR'),
      totalDaysRemaining,
      safeDaysLeft
    };
  }, [endDate]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (endDate) setShowResult(true);
  };

  const reset = () => {
    setShowResult(false);
    setEndDate('');
  };

  const inputClasses = "w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 font-medium";
  const labelClasses = "block text-sm font-bold text-slate-700 mb-2 ml-1";

  const getResIcon = (type: ResidencyType) => {
    switch (type) {
      case 'Kısa Dönem': return <HomeIcon size={18} />;
      case 'Aile': return <UserPlus size={18} />;
      case 'Öğrenci': return <GraduationCap size={18} />;
      case 'Uzun Dönem': return <ShieldCheck size={18} />;
    }
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-slate-50">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="mb-4 md:mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm">
            <ArrowLeft size={18} /> UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-6 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-indigo-600 mb-3 md:mb-6 shadow-xl border border-slate-100">
             <Calendar size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">İkamet Uzatma Zamanı</h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto font-medium">
            Oturum izninizin bitmesine ne kadar kaldı? 60 gün kuralına göre yasal başvuru tarihinizi öğrenin.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleCalculate}
                className="p-8 md:p-12 space-y-8"
              >
                <div>
                  <label className={labelClasses}>İkamet İzni Türü</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['Kısa Dönem', 'Aile', 'Öğrenci', 'Uzun Dönem'] as ResidencyType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setResType(type)}
                        className={`py-4 px-2 rounded-xl font-bold text-[10px] md:text-xs border-2 transition-all flex flex-col items-center gap-2 ${
                          resType === type 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {getResIcon(type)}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <label className={labelClasses}>İkamet Kartı Bitiş Tarihi</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="date" 
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`${inputClasses} pl-12`} 
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 ml-1 italic">
                    * Kartınızın ön yüzünde yazan geçerlilik tarihini giriniz.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                  Hesaplamayı Yap <ChevronRight size={24} />
                </button>

                <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 flex gap-4 text-indigo-900">
                  <Info className="shrink-0 text-indigo-500" size={24} />
                  <p className="text-sm font-medium leading-relaxed">
                    Göç İdaresi kurallarına göre ikamet uzatma başvurusu bitişe 60 gün kala yapılabilir. Bu süreden önce sistem başvuruya kapalıdır.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12 text-center"
              >
                <div className={`rounded-3xl p-8 mb-10 shadow-lg border-2 ${
                  calculation?.status === 'expired' ? 'bg-red-50 border-red-100' :
                  calculation?.status === 'active' ? 'bg-green-50 border-green-100' :
                  'bg-indigo-50 border-indigo-100'
                }`}>
                  <div className="flex justify-center mb-6">
                    {calculation?.status === 'expired' && <AlertCircle size={64} className="text-red-500 animate-pulse" />}
                    {calculation?.status === 'active' && <CheckCircle2 size={64} className="text-green-500" />}
                    {calculation?.status === 'future' && <Hourglass size={64} className="text-indigo-500" />}
                  </div>
                  
                  <h2 className={`text-2xl md:text-3xl font-black mb-3 ${
                    calculation?.status === 'expired' ? 'text-red-700' :
                    calculation?.status === 'active' ? 'text-green-700' :
                    'text-indigo-700'
                  }`}>
                    {calculation?.title}
                  </h2>
                  
                  <p className="text-slate-600 font-bold text-lg leading-relaxed">
                    {calculation?.subMessage}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 text-left space-y-5 mb-10">
                  <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-6">HESAPLAMA ÖZETİ</h3>
                  
                  <SummaryItem label="Seçilen İzin" value={resType} icon={<History size={16}/>} />
                  <SummaryItem label="Geçerlilik Bitiş" value={calculation?.expiryDate || '-'} icon={<Calendar size={16}/>} />
                  
                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    <SummaryItem 
                      label="Toplam Kalan Gün" 
                      value={`${calculation?.totalDaysRemaining} Gün`} 
                      icon={<Clock size={16}/>} 
                    />
                    <SummaryItem 
                      label="Başvuru Yapılabilecek Tarih" 
                      value={calculation?.appWindowStartDate || '-'} 
                      icon={<Calendar size={16}/>}
                      highlight
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={reset}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} /> Yeni Hesaplama
                  </button>
                  <Link 
                    to="/appointment"
                    className="flex-[2] bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    Hemen Başvurunuzu Başlatın
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SummaryItem: React.FC<{ label: string, value: string, icon: React.ReactNode, highlight?: boolean }> = ({ label, value, icon, highlight }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
      <div className="text-slate-400">{icon}</div>
      {label}
    </div>
    <div className={`text-lg font-black ${highlight ? 'text-indigo-600' : 'text-slate-900'}`}>
      {value}
    </div>
  </div>
);

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  PlaneTakeoff,
  ChevronRight,
  MessageCircle,
  X,
  PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

interface Trip {
  exit: string;
  entry: string;
}

export const AbroadDaysCalculator: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [periodYears] = useState(8); 
  
  // Pending trips for bulk adding
  const [pendingTrips, setPendingTrips] = useState<Trip[]>([{ exit: '', entry: '' }]);
  const [error, setError] = useState('');

  // Yardımcı Fonksiyonlar
  const parseDate = (s: string) => {
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  };

  const formatTR = (d: Date) => d.toLocaleDateString("tr-TR");

  const daysBetween = (start: Date, end: Date) => {
    const ms = end.getTime() - start.getTime();
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  };

  const getToday = () => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  };

  const getPeriodStart = (today: Date) => {
    const start = new Date(today);
    start.setFullYear(start.getFullYear() - periodYears);
    return start;
  };

  const addPendingRow = () => {
    setPendingTrips([...pendingTrips, { exit: '', entry: '' }]);
  };

  const removePendingRow = (index: number) => {
    if (pendingTrips.length > 1) {
      setPendingTrips(pendingTrips.filter((_, i) => i !== index));
    } else {
      setPendingTrips([{ exit: '', entry: '' }]);
    }
  };

  const updatePendingTrip = (index: number, field: keyof Trip, value: string) => {
    const updated = [...pendingTrips];
    updated[index] = { ...updated[index], [field]: value };
    setPendingTrips(updated);
  };

  const submitAllPending = () => {
    setError('');
    const validTrips: Trip[] = [];
    
    for (let i = 0; i < pendingTrips.length; i++) {
      const { exit, entry } = pendingTrips[i];
      if (!exit && !entry) continue; // Skip empty rows

      const exitD = parseDate(exit);
      const entryD = parseDate(entry);

      if (!exitD || !entryD) {
        setError(`${i + 1}. sıradaki seyahatin tarihlerini kontrol edin.`);
        return;
      }
      if (entryD <= exitD) {
        setError(`${i + 1}. sıradaki giriş tarihi çıkış tarihinden sonra olmalıdır.`);
        return;
      }
      validTrips.push({ exit, entry });
    }

    if (validTrips.length === 0) {
      setError('Lütfen en az bir geçerli seyahat tarihi girin.');
      return;
    }

    const newTrips = [...trips, ...validTrips];
    newTrips.sort((a, b) => new Date(a.exit).getTime() - new Date(b.exit).getTime());
    setTrips(newTrips);
    setPendingTrips([{ exit: '', entry: '' }]);
  };

  const removeTrip = (index: number) => {
    setTrips(trips.filter((_, i) => i !== index));
  };

  const results = useMemo(() => {
    const today = getToday();
    const periodStart = getPeriodStart(today);
    let totalInWindow = 0;
    let totalAll = 0;

    const processedTrips = trips.map(tr => {
      const exitD = parseDate(tr.exit)!;
      const entryD = parseDate(tr.entry)!;
      const allDays = daysBetween(exitD, entryD);
      totalAll += allDays;

      const clipStart = exitD < periodStart ? periodStart : exitD;
      const clipEnd = entryD > today ? today : entryD;
      
      let inWindow = 0;
      if (clipEnd > clipStart) {
        inWindow = daysBetween(clipStart, clipEnd);
      }
      totalInWindow += inWindow;

      return {
        ...tr,
        inWindow,
        allDays,
        isClippedStart: exitD < periodStart,
        isClippedEnd: entryD > today
      };
    });

    return {
      processedTrips,
      totalInWindow,
      totalAll,
      periodStart,
      today,
      months: (totalInWindow / 30).toFixed(1),
      years: (totalInWindow / 365).toFixed(2)
    };
  }, [trips, periodYears]);

  const inputClasses = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-bold";

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-6 shadow-xl border border-slate-100 transform rotate-3">
             <PlaneTakeoff size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Yurt Dışı Gün Hesaplayıcı</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Türkiye dışında geçirdiğiniz tüm süreleri ekleyerek toplam kalış gününüzü anında hesaplayın.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Çoklu Seyahat Ekleme Alanı */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-black text-blue-600 text-xl flex items-center gap-3">
                 <PlusCircle className="bg-blue-600 text-white rounded-lg p-1" size={28} /> Seyahat Girişi
              </h3>
              <div className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {periodYears} Yıllık Dönem Analizi
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <AnimatePresence initial={false}>
                {pendingTrips.map((pt, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col md:flex-row items-end gap-4 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl relative"
                  >
                    <div className="flex-1 space-y-2 w-full">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">TÜRKİYE'DEN ÇIKIŞ</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="date" 
                          value={pt.exit} 
                          onChange={(e) => updatePendingTrip(idx, 'exit', e.target.value)} 
                          className={`${inputClasses} pl-10 h-12`} 
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">TÜRKİYE'YE GİRİŞ</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="date" 
                          value={pt.entry} 
                          onChange={(e) => updatePendingTrip(idx, 'entry', e.target.value)} 
                          className={`${inputClasses} pl-10 h-12`} 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removePendingRow(idx)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-white rounded-xl transition-all h-12 border border-transparent hover:border-red-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button 
                onClick={addPendingRow}
                className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest hover:text-blue-700 transition-colors ml-1"
              >
                <Plus size={18} /> Yeni Satır Ekle
              </button>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle size={18} /> {error}
              </div>
            )}

            <button 
              onClick={submitAllPending}
              className="w-full bg-[#0f172a] text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] group"
            >
              Listeye Kaydet <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Seyahat Tablosu */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">Kayıtlı Seyahat Listesi</h4>
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-500">
                   {trips.length} KAYIT
                </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-white border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ÇIKIŞ TARİHİ</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">GİRİŞ TARİHİ</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">SÜRE (DÖNEM İÇİ)</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">İŞLEM</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     <AnimatePresence initial={false}>
                      {results.processedTrips.length > 0 ? (
                        results.processedTrips.map((tr, i) => (
                          <motion.tr 
                            key={`${tr.exit}-${i}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="group hover:bg-blue-50/30 transition-colors"
                          >
                            <td className="px-8 py-6 text-sm font-black text-slate-700">
                              {formatTR(parseDate(tr.exit)!)}
                              {tr.isClippedStart && <span className="ml-2 px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-black rounded-md border border-amber-100 uppercase">Dönem Başı</span>}
                            </td>
                            <td className="px-8 py-6 text-sm font-black text-slate-700">
                              {formatTR(parseDate(tr.entry)!)}
                              {tr.isClippedEnd && <span className="ml-2 px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-black rounded-md border border-amber-100 uppercase">Gelecek</span>}
                            </td>
                            <td className="px-8 py-6">
                              <div className="text-base font-black text-blue-600">{tr.inWindow} GÜN</div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Gerçek Toplam: {tr.allDays} GÜN</div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <button onClick={() => removeTrip(i)} className="p-2.5 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20}/></button>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold italic">Henüz seyahat kaydı eklemediniz.</td>
                        </tr>
                      )}
                     </AnimatePresence>
                  </tbody>
               </table>
             </div>
          </div>

          {/* Özet Alanı */}
          {trips.length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-blue-600 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10"><Clock size={200} /></div>
              <div className="relative z-10">
                 <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-xs font-black uppercase tracking-[0.2em]">HESAPLAMA SONUCU</span>
                    <span className="font-bold text-sm bg-black/10 px-4 py-2 rounded-full border border-white/10">{formatTR(results.periodStart)} — {formatTR(results.today)}</span>
                 </div>
                 
                 <div className="flex flex-col items-center text-center">
                    <div>
                      <div className="text-xs font-black text-blue-200 uppercase tracking-[0.3em] mb-4">TOPLAM YURT DIŞI SÜRE</div>
                      <div className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">{results.totalInWindow} <span className="text-3xl md:text-5xl text-blue-300 uppercase font-black">GÜN</span></div>
                      <div className="flex flex-wrap justify-center items-center gap-6 text-lg font-black text-blue-100">
                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl"><CheckCircle2 size={20} className="text-emerald-400"/> ~{results.months} Ay</span>
                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl"><CheckCircle2 size={20} className="text-emerald-400"/> ~{results.years} Yıl</span>
                      </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* Yardım ve İletişim */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] flex gap-5 text-blue-900 shadow-sm">
               <Info className="shrink-0 text-blue-500" size={32} />
               <div className="text-sm leading-relaxed space-y-3">
                  <p className="font-black text-lg">Önemli Kurallar:</p>
                  <ul className="space-y-2 font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Giriş günü Türkiye'de sayılır.</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> 8 yıllık kesintisiz süre hesabı hassastır.</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Belgenizi Atasa uzmanlarına kontrol ettirin.</li>
                  </ul>
               </div>
            </div>
            
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center">
                <h4 className="font-black text-xl mb-4 leading-tight">Bu süreler başvurumu <br/> engeller mi?</h4>
                <button onClick={openWhatsApp} className="w-full bg-green-600 hover:bg-green-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95">
                  <MessageCircle size={28} /> WhatsApp Uzman Hattı
                </button>
            </div>
          </div>

          <div className="flex justify-center">
             <Link to="/appointment" className="inline-flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black text-sm uppercase tracking-widest transition-colors">
                Profesyonel Dosya Hazırlığı İçin Randevu Al <ChevronRight size={18}/>
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

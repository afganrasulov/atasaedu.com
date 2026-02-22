
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Search, 
  MessageCircle, 
  Info,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

interface Program {
  id: string;
  label: string;
  limit: number;
}

const PROGRAMS: Program[] = [
  { id: 'onlisans', label: 'Ön Lisans Programları', limit: 30 },
  { id: 'lisans', label: 'Lisans Programları', limit: 35 },
  { id: 'yukseklisans', label: 'Yüksek Lisans Programları', limit: 50 }
];

export const StudentAgeChecker: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [dob, setDob] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculation = useMemo(() => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const eligiblePrograms = PROGRAMS.filter(p => age <= p.limit);

    return {
      age,
      eligiblePrograms,
      isAnyEligible: eligiblePrograms.length > 0
    };
  }, [dob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob) setShowResult(true);
  };

  const reset = () => {
    setShowResult(false);
    setDob('');
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="mb-4 md:mb-10">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-orange-600 mb-4 md:mb-8 shadow-2xl border border-slate-100 transform -rotate-3">
             <GraduationCap size={40} />
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-[#0f172a] mb-6 tracking-tighter leading-none">
            Eğitim Uygunluk <br/> <span className="text-orange-600">Sorgulama</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Doğum tarihinizi girerek Türkiye'de hangi eğitim seviyelerinde ikamet izni alabildiğinizi anında öğrenin.
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
                className="p-8 md:p-14 space-y-10 flex flex-col flex-1"
              >
                <div className="max-w-md mx-auto w-full">
                  <label className="block text-xs font-black text-slate-500 mb-4 ml-1 uppercase tracking-widest text-center">DOĞUM TARİHİNİZ</label>
                  <div className="relative group">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors pointer-events-none" size={24} />
                    <input 
                      type="date" 
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-16 pr-6 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-blue-500 focus:bg-white outline-none text-2xl font-black text-slate-900 transition-all shadow-inner cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4 text-blue-900 max-w-xl mx-auto">
                  <Info className="shrink-0 text-blue-500" size={24} />
                  <p className="text-sm font-bold leading-relaxed italic">
                    Sistem, bugünün tarihine göre yaşınızı hesaplayıp sadece başvurabileceğiniz programları listeler.
                  </p>
                </div>

                <div className="mt-auto">
                    <button
                        type="submit"
                        className="w-full bg-[#0f172a] text-white py-6 rounded-3xl font-black text-2xl hover:bg-blue-600 transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-4 group"
                    >
                        Uygunluğu Kontrol Et <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-14 flex flex-col h-full flex-1"
              >
                <div className="text-center mb-10">
                   <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl ${calculation?.isAnyEligible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {calculation?.isAnyEligible ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
                     {calculation?.isAnyEligible ? 'Uygun Programlar Bulundu' : 'Uygun Program Bulunamadı'}
                   </h2>
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-sm font-bold text-slate-500">
                      <Clock size={16} /> Hesaplanan Yaş: {calculation?.age}
                   </div>
                </div>

                <div className="flex-1">
                   {calculation?.isAnyEligible ? (
                     <div className="space-y-4 mb-10">
                        <p className="text-center text-slate-500 font-bold text-sm uppercase tracking-widest mb-6">BAŞVURABİLECEĞİNİZ KATEGORİLER</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                           {calculation.eligiblePrograms.map((p) => (
                             <div key={p.id} className="bg-emerald-50 border-2 border-emerald-100 p-6 rounded-[2rem] flex items-center gap-4 shadow-sm group hover:border-emerald-500 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-md">
                                   <Zap size={24} fill="currentColor" />
                                </div>
                                <span className="text-xl font-black text-emerald-900">{p.label}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                   ) : (
                     <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[2.5rem] text-center mb-10 max-w-2xl mx-auto">
                        <p className="text-red-900 text-xl font-bold leading-relaxed">
                           Mevcut yaşınız öğrenci ikameti alabilmek için genel yaş sınırlarının üzerindedir.
                        </p>
                        <p className="text-red-700/70 mt-4 text-sm font-medium italic">
                           Ancak istisnai durumlar veya diğer ikamet türleri için hala şansınız olabilir.
                        </p>
                     </div>
                   )}
                </div>

                <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={reset} className="py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    <RotateCcw size={20} /> Yeni Hesaplama
                  </button>
                  <button onClick={openWhatsApp} className="py-5 bg-green-600 text-white rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group">
                    <MessageCircle size={24} fill="currentColor" className="group-hover:rotate-12 transition-transform" /> Uzmana Danış
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Warning Footer */}
        <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] opacity-10"></div>
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
               <ShieldCheck size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="text-xl font-black mb-1 uppercase tracking-tight">Akademik Danışmanlık</h4>
               <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Yaş kriteri sadece bir ön değerlendirmedir. Üniversite kaydı, okul kabul mektubu ve Göç İdaresi başvurularınızda Atasa Edu ekibi olarak profesyonel destek sağlıyoruz.
               </p>
            </div>
        </div>
      </div>
    </div>
  );
};

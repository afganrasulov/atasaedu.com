
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ArrowLeft, 
  ChevronRight, 
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Zap,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Calendar,
  UserCheck,
  Siren,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

interface DeportResult {
  code: string;
  duration: string;
  description: string;
  status: 'success' | 'warning' | 'danger';
}

export const DeportCalculatorPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownWill: '', // 'Evet', 'Hayır'
    paidFine: '', // 'Evet', 'Hayır'
    receivedNotification: '', // 'Evet', 'Hayır'
    duration: ''
  });

  const durationOptions = [
    '10 Gün - 3 Ay',
    '3 Ay - 6 Ay',
    '6 Ay - 1 Yıl',
    '1 Yıl - 2 Yıl',
    '2 Yıl - 3 Yıl',
    '3 Yıldan Fazla'
  ];

  const handleOption = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setStep(prev => prev + 1);
  };

  const calculateResult = (): DeportResult => {
    const { ownWill, paidFine, receivedNotification, duration } = formData;

    // --- PDF TABLOSU MANTIĞI (21 Satır) ---

    // SENARYO 1: Kendi Rızası (Evet) + Ceza Ödedi (Evet) + Tebligat Yok (Hayır)
    if (ownWill === 'Evet' && paidFine === 'Evet' && receivedNotification === 'Hayır') {
      if (duration === '10 Gün - 3 Ay') return { code: 'YOK', duration: 'Giriş Yasağı Yok', description: 'Üzerinize tanımlı tahdit kodu bulunmamaktadır. İstediğiniz zaman Türkiye\'ye giriş yapabilirsiniz.', status: 'success' };
      if (duration === '3 Ay - 6 Ay') return { code: 'Ç-167', duration: '1 Ay Giriş Yasağı', description: 'Üzerinizde Ç-167 tahdit kodu tanımlanmıştır. 1 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'warning' };
      if (duration === '6 Ay - 1 Yıl') return { code: 'Ç-101', duration: '3 Ay Giriş Yasağı', description: 'Üzerinizde Ç-101 tahdit kodu tanımlanmıştır. 3 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'warning' };
      if (duration === '1 Yıl - 2 Yıl') return { code: 'Ç-103', duration: '1 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-103 tahdit kodu tanımlanmıştır. 1 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'warning' };
      if (duration === '2 Yıl - 3 Yıl') return { code: 'Ç-104', duration: '2 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-104 tahdit kodu tanımlanmıştır. 2 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
      return { code: 'Ç-105', duration: '5 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-105 tahdit kodu tanımlanmıştır. 5 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
    }

    // SENARYO 2: Kendi Rızası (Evet) + Ceza Ödemedi (Hayır) + Tebligat Aldı (Evet)
    if (ownWill === 'Evet' && paidFine === 'Hayır' && receivedNotification === 'Evet') {
      if (duration === '10 Gün - 3 Ay') return { code: 'Ç-101', duration: '3 Ay Giriş Yasağı', description: 'Üzerinizde Ç-101 tahdit kodu tanımlanmıştır. 3 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'warning' };
      if (duration === '3 Ay - 6 Ay') return { code: 'Ç-102', duration: '6 Ay Giriş Yasağı', description: 'Üzerinizde Ç-102 tahdit kodu tanımlanmıştır. 6 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
      if (duration === '6 Ay - 1 Yıl') return { code: 'Ç-103', duration: '1 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-103 tahdit kodu tanımlanmıştır. 1 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
      if (duration === '1 Yıl - 2 Yıl') return { code: 'Ç-104', duration: '2 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-104 tahdit kodu tanımlanmıştır. 2 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
      return { code: 'Ç-105', duration: '5 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-105 tahdit kodu tanımlanmıştır. 5 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
    }

    // SENARYO 3: Kendi Rızası Değil (Hayır) + Ceza Ödedi (Evet)
    if (ownWill === 'Hayır' && paidFine === 'Evet') {
      if (duration === '10 Gün - 3 Ay') return { code: 'Ç-101', duration: '3 Ay Giriş Yasağı', description: 'Üzerinizde Ç-101 tahdit kodu tanımlanmıştır. 3 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'warning' };
      if (duration === '3 Ay - 6 Ay') return { code: 'Ç-102', duration: '6 Ay Giriş Yasağı', description: 'Üzerinizde Ç-102 tahdit kodu tanımlanmıştır. 6 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
      if (duration === '6 Ay - 1 Yıl') return { code: 'Ç-103', duration: '1 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-103 tahdit kodu tanımlanmıştır. 1 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
      if (duration === '1 Yıl - 2 Yıl') return { code: 'Ç-104', duration: '2 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-104 tahdit kodu tanımlanmıştır. 2 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
      return { code: 'Ç-105', duration: '5 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-105 tahdit kodu tanımlanmıştır. 5 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
    }

    // SENARYO 4: Kendi Rızası Değil (Hayır) + Ceza Ödemedi (Hayır)
    // Bu senaryoda tablo 2 yıldan fazlayı direkt 5 yıla bağlıyor
    if (duration === '10 Gün - 3 Ay') return { code: 'Ç-101', duration: '3 Ay Giriş Yasağı', description: 'Üzerinizde Ç-101 tahdit kodu tanımlanmıştır. 3 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'warning' };
    if (duration === '3 Ay - 6 Ay') return { code: 'Ç-102', duration: '6 Ay Giriş Yasağı', description: 'Üzerinizde Ç-102 tahdit kodu tanımlanmıştır. 6 ay süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
    if (duration === '6 Ay - 1 Yıl') return { code: 'Ç-103', duration: '1 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-103 tahdit kodu tanımlanmıştır. 1 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
    if (duration === '1 Yıl - 2 Yıl') return { code: 'Ç-104', duration: '2 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-104 tahdit kodu tanımlanmıştır. 2 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
    return { code: 'Ç-105', duration: '5 Yıl Giriş Yasağı', description: 'Üzerinizde Ç-105 tahdit kodu tanımlanmıştır. 5 yıl süre ile Türkiye\'ye giriş yasağı alırsınız.', status: 'danger' };
  };

  const reset = () => {
    setStep(1);
    setFormData({ ownWill: '', paidFine: '', receivedNotification: '', duration: '' });
  };

  const result = step > 4 ? calculateResult() : null;

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Navigation */}
        <div className="mb-4 md:mb-10">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-4 md:mb-8 shadow-2xl border border-slate-100 transform rotate-3">
             <Clock size={40} />
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-[#0f172a] mb-6 tracking-tighter leading-none">
            Deport Süresi <br/> <span className="text-blue-600">Hesaplama</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Resmi mevzuata uygun olarak giriş yasağı sürenizi ve tahdit kodunuzu 4 adımda öğrenin.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden relative min-h-[500px] flex flex-col">
          
          {/* Progress Bar */}
          {step <= 4 && (
            <div className="h-2 bg-slate-100 w-full">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          <div className="p-8 md:p-14 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Kendi Rızası */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="text-center">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">SORU 1 / 4</span>
                    <h2 className="text-3xl font-black text-slate-900 mt-6">Türkiye'den kendi rızanız ile mi çıkış yaptınız?</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WizardButton onClick={() => handleOption('ownWill', 'Evet')} label="Evet, Gönüllü Çıktım" icon={<UserCheck size={24}/>} />
                    <WizardButton onClick={() => handleOption('ownWill', 'Hayır')} label="Hayır, Sınır Dışı Edildim" icon={<Siren size={24}/>} />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Ceza Parası */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="text-center">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">SORU 2 / 4</span>
                    <h2 className="text-3xl font-black text-slate-900 mt-6">Ceza parasını ödediniz mi?</h2>
                    <p className="text-slate-500 mt-2">Çıkış yaparken size kesilen vize ihlali cezasını ödeyip ödemediğinizi belirtin.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WizardButton onClick={() => handleOption('paidFine', 'Evet')} label="Evet, Ödedim" icon={<CheckCircle2 size={24}/>} />
                    <WizardButton onClick={() => handleOption('paidFine', 'Hayır')} label="Hayır, Ödemedim" icon={<AlertTriangle size={24}/>} />
                  </div>
                  <button onClick={() => setStep(1)} className="mx-auto block text-slate-400 font-bold hover:text-slate-600 transition-colors">Geri Dön</button>
                </motion.div>
              )}

              {/* STEP 3: Tebligat */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="text-center">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">SORU 3 / 4</span>
                    <h2 className="text-3xl font-black text-slate-900 mt-6">Tebliğat belgesi aldınız mı?</h2>
                    <p className="text-slate-500 mt-2">Sınırda size "Türkiye'yi Terke Davet" veya benzeri bir bildirim yapıldı mı?</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WizardButton onClick={() => handleOption('receivedNotification', 'Evet')} label="Evet, Belge Aldım" icon={<ShieldCheck size={24}/>} />
                    <WizardButton onClick={() => handleOption('receivedNotification', 'Hayır')} label="Hayır, Belge Almadım" icon={<HelpCircle size={24}/>} />
                  </div>
                  <button onClick={() => setStep(2)} className="mx-auto block text-slate-400 font-bold hover:text-slate-600 transition-colors">Geri Dön</button>
                </motion.div>
              )}

              {/* STEP 4: Süre */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="text-center">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">SON ADIM</span>
                    <h2 className="text-3xl font-black text-slate-900 mt-6">Kaçak kalma süreniz ne kadardı?</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {durationOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleOption('duration', opt)}
                        className="p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 font-bold text-slate-700 transition-all text-sm shadow-sm active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(3)} className="mx-auto block text-slate-400 font-bold hover:text-slate-600 transition-colors">Geri Dön</button>
                </motion.div>
              )}

              {/* RESULT SCREEN */}
              {step > 4 && result && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                  
                  <div className={`w-full border-4 border-dashed rounded-[3rem] p-8 md:p-14 mb-10 relative overflow-hidden ${
                    result.status === 'success' ? 'border-emerald-500 bg-emerald-50/50' : 
                    result.status === 'warning' ? 'border-orange-500 bg-orange-50/50' : 'border-red-500 bg-red-50/50'
                  }`}>
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       {result.status === 'success' ? <CheckCircle2 size={150} /> : <AlertTriangle size={150} />}
                    </div>
                    
                    <div className="relative z-10">
                      <span className={`inline-block px-4 py-1.5 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-lg ${
                        result.status === 'success' ? 'bg-emerald-600' : 
                        result.status === 'warning' ? 'bg-orange-600' : 'bg-red-600'
                      }`}>
                        HESAPLAMA SONUCU
                      </span>
                      
                      <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter leading-none">
                        {result.code === 'YOK' ? 'Engel Yok' : result.code}
                      </h2>
                      
                      <p className={`text-2xl md:text-3xl font-bold tracking-tight leading-relaxed ${
                        result.status === 'success' ? 'text-emerald-700' : 
                        result.status === 'warning' ? 'text-orange-700' : 'text-red-700'
                      }`}>
                         {result.duration}
                      </p>

                      <div className="mt-8 p-6 bg-white/80 rounded-2xl text-slate-700 font-medium leading-relaxed shadow-sm border border-white">
                         "{result.description}"
                      </div>
                      
                      {/* NEW: Official Source Warning & Link */}
                      <div className="mt-8 p-5 bg-white/60 border border-slate-200 rounded-2xl flex flex-col items-center gap-3">
                         <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                            <Info size={16} className="text-blue-500" /> Bu bilgiler sadece bilgi amaçlıdır
                         </div>
                         <a 
                           href="https://www.goc.gov.tr/yasal-kalis-hakki-ihlalinde-bulunan-yabancilara-uygulanacak-giris-yasaklarina-iliskin-aciklama" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 text-blue-600 font-black text-sm hover:underline"
                         >
                           Detaylı resmi bilgi için buraya tıklayın <ExternalLink size={14} />
                         </a>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    <button onClick={reset} className="py-5 bg-white border-2 border-slate-200 text-slate-600 rounded-[1.5rem] font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                      <RotateCcw size={24} /> Yeni Sorgulama
                    </button>
                    <button onClick={openWhatsApp} className="py-5 bg-green-600 text-white rounded-[1.5rem] font-black text-lg hover:bg-green-700 transition-all shadow-xl flex items-center justify-center gap-3">
                      <MessageCircle size={28} fill="currentColor" /> Uzmana Sorun
                    </button>
                  </div>

                  <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4 text-left max-w-2xl">
                    <Info className="text-blue-500 shrink-0" size={24} />
                    <p className="text-xs text-blue-900 font-medium leading-relaxed">
                      <strong>Not:</strong> Giriş yasağınız olsa dahi Evlilik, Çalışma veya Eğitim gerekçesiyle "Özel Meşruhatlı Vize" alarak yasağı beklemeden Türkiye'ye dönebilirsiniz.
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Global Warning Footer */}
        <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10"></div>
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
               <ShieldAlert size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="text-xl font-black mb-1 uppercase tracking-tight">Yasal Süreçler Hakkında</h4>
               <p className="text-slate-400 text-sm leading-relaxed">
                  Hesaplanan süreler genel mevzuat kurallarına göredir. Kişiye özel istisnai durumlar (V-71, G-87 gibi kodlar) sonucu değiştirebilir. Kesin bilgi için dosyanızın incelenmesi gerekir.
               </p>
            </div>
        </div>

      </div>
    </div>
  );
};

const WizardButton: React.FC<{ onClick: () => void, label: string, icon: React.ReactNode }> = ({ onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className="group bg-slate-50 border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 p-8 rounded-[2rem] transition-all flex flex-col items-center gap-4 text-center active:scale-95 shadow-sm hover:shadow-xl"
  >
    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:scale-110 transition-all shadow-sm">
      {icon}
    </div>
    <span className="text-lg font-black text-slate-800 group-hover:text-blue-900">{label}</span>
  </button>
);

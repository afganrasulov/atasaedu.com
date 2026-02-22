
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  CheckCircle2, 
  Info, 
  ArrowLeft, 
  CreditCard, 
  Landmark, 
  ShieldCheck,
  Zap,
  DollarSign,
  Wallet,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BANK_DETAILS = [
  {
    id: 'tl',
    currency: 'TL',
    bankName: 'Ziraat Bankası',
    iban: 'TR 0400 0100 0757 9807 6714 5001',
    holder: 'ATASA DANIŞMANLIK HİZMETLERİ LİMİTED ŞİRKETİ',
    color: 'from-red-600 to-red-800'
  },
  {
    id: 'usd',
    currency: 'USD',
    bankName: 'Ziraat Bankası',
    iban: 'TR 7400 0100 0757 9807 6714 5002',
    holder: 'ATASA DANIŞMANLIK HİZMETLERİ LİMİTED ŞİRKETİ',
    color: 'from-slate-700 to-slate-900'
  }
];

export const BankInfoPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    // Boşlukları temizleyerek kopyala (IBAN için daha iyi)
    const cleanText = text.replace(/\s/g, '');
    
    // Eğer isim kopyalanıyorsa temizleme yapma
    const finalSelection = text.includes('ATASA') ? text : cleanText;
    
    navigator.clipboard.writeText(finalSelection);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#F8FAFC]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-blue-600 mb-6 shadow-xl border border-slate-100"
          >
             <Landmark size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Banka Bilgilerimiz</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Ödemelerinizi aşağıdaki banka hesabımıza gerçekleştirebilirsiniz. Lütfen gönderim yaparken açıklama kısmına <span className="text-blue-600 font-bold">adınızı ve işlemin konusunu</span> belirtmeyi unutmayın.
          </p>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {BANK_DETAILS.map((bank) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500"
            >
              {/* Card Header without Logo */}
              <div className="p-8 border-b border-slate-50 relative overflow-hidden">
                <div className="flex flex-col items-center">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                     {bank.bankName} Bilgileri <span className={bank.id === 'tl' ? 'text-red-600' : 'text-blue-600'}>({bank.currency})</span>
                   </h3>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 space-y-8">
                {/* IBAN Row */}
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IBAN NUMARASI</span>
                      <span className="text-[10px] font-bold text-blue-500 uppercase">TIKLA KOPYALA</span>
                   </div>
                   <button 
                    onClick={() => handleCopy(bank.iban, `${bank.id}-iban`)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-left transition-all hover:bg-blue-50 hover:border-blue-200 active:scale-[0.98] group relative overflow-hidden"
                   >
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base font-black text-slate-800 tracking-wider font-mono">
                          {bank.iban}
                        </span>
                        <div className="shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors">
                          {copiedId === `${bank.id}-iban` ? <CheckCircle2 size={22} className="text-emerald-500" /> : <Copy size={20} />}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {copiedId === `${bank.id}-iban` && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-blue-600 text-white flex items-center justify-center font-bold text-sm"
                          >
                            IBAN Kopyalandı!
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </button>
                </div>

                {/* Holder Row */}
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ALICI / ÜNVAN</span>
                      <span className="text-[10px] font-bold text-blue-500 uppercase">TIKLA KOPYALA</span>
                   </div>
                   <button 
                    onClick={() => handleCopy(bank.holder, `${bank.id}-holder`)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-left transition-all hover:bg-blue-50 hover:border-blue-200 active:scale-[0.98] group relative overflow-hidden"
                   >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] md:text-xs font-black text-slate-700 leading-relaxed uppercase pr-2">
                          {bank.holder}
                        </span>
                        <div className="shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors">
                          {copiedId === `${bank.id}-holder` ? <CheckCircle2 size={22} className="text-emerald-500" /> : <Copy size={20} />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {copiedId === `${bank.id}-holder` && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900 text-white flex items-center justify-center font-bold text-sm"
                          >
                            Ünvan Kopyalandı!
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </button>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                 <div className="flex items-center justify-center gap-2 text-slate-400">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Resmi Kurumsal Hesap</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Warning Footer */}
        <div className="mt-12 p-8 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                <Info className="text-blue-600" size={32} />
            </div>
            <div className="text-sm text-slate-500 leading-relaxed font-medium text-center md:text-left">
                <p className="text-lg font-black text-slate-900 mb-1">Havale / EFT Hakkında</p>
                <p>Banka transferlerinde açıklama kısmına mutlaka başvuru sahibinin adını yazınız. Dekontunuzu WhatsApp hattımız üzerinden danışmanlarımıza ileterek işlemlerinizi hızlandırabilirsiniz.</p>
            </div>
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center">
           <button 
             onClick={() => window.open('https://wa.me/908503086998', '_blank')}
             className="inline-flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest hover:text-blue-800 transition-colors group"
           >
             <MessageCircle size={20} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
             Sorun mu yaşıyorsunuz? Bize Yazın
           </button>
        </div>

      </div>
    </div>
  );
};

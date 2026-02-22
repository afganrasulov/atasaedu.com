import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShieldAlert, 
  ArrowLeft, 
  ChevronRight, 
  Gavel, 
  MessageCircle, 
  History,
  ShieldCheck,
  Zap,
  Lock,
  AlertOctagon,
  HelpCircle,
  CheckCircle2,
  Info,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';
import { TAHDIT_CODES, TahditCode } from './tahdit-data';

export const TahditCodeQueryPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'Search' | 'Categories'>('Search');
  const [selectedCategory, setSelectedCategory] = useState<'Ç' | 'G' | 'N' | 'O' | 'V' | 'All'>('All');

  const filteredCodes = useMemo(() => {
    const term = (searchTerm || '').toLowerCase().trim();
    return (TAHDIT_CODES || []).filter(item => {
      const matchSearch = term === '' || 
        (item.code || '').toLowerCase().includes(term) || 
        (item.description || '').toLowerCase().includes(term) ||
        (String(item.prefix || '') + String(item.code || '')).toLowerCase().includes(term) ||
        (String(item.prefix || '') + '-' + String(item.code || '')).toLowerCase().includes(term);
      
      const matchCategory = selectedCategory === 'All' || item.prefix === selectedCategory;
      
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Navigation */}
        <div className="mb-4 md:mb-12">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        {/* Premium Header */}
        <div className="text-center mb-8 md:mb-16 max-w-4xl mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-white text-red-600 mb-4 md:mb-8 shadow-[0_20px_50px_-15px_rgba(220,38,38,0.2)] border border-red-50 transition-transform hover:scale-105"
          >
             <ShieldAlert size={48} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0f172a] mb-6 tracking-tighter leading-[1.1]">
            Tahdit Kodları <br/> <span className="text-red-600">Sorgulama Paneli</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Giriş yasağı, deport veya idari takip kayıtlarının yasal anlamlarını ve giriş durumlarını anında analiz edin.
          </p>
        </div>

        {/* Search & Filter - Apple Liquid Style */}
        <div className="bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white p-4 mb-12">
          
          {/* Tabs UI */}
          <div className="flex flex-wrap gap-2 mb-6 bg-slate-100/50 p-1.5 rounded-[1.8rem] w-fit mx-auto md:mx-0">
              <button 
                onClick={() => setActiveTab('Search')}
                className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'Search' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                  Hızlı Sorgula
              </button>
              <button 
                onClick={() => setActiveTab('Categories')}
                className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'Categories' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                  Kod Grupları
              </button>
          </div>

          <div className="px-4 pb-4">
            {activeTab === 'Search' ? (
                <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                      <Search size={24} />
                    </div>
                    <input 
                      type="text"
                      placeholder="Kod veya anahtar kelime girin (Örn: 101, V-68, G-87)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-6 bg-white border border-slate-100 rounded-[2rem] focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 outline-none text-xl font-bold text-slate-800 transition-all placeholder-slate-300"
                    />
                </div>
            ) : (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {['All', 'Ç', 'G', 'N', 'O', 'V'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat as any)}
                          className={`px-6 py-4 rounded-2xl font-black text-sm transition-all border-2 flex items-center gap-3 ${
                            selectedCategory === cat 
                              ? 'bg-red-600 border-red-600 text-white shadow-lg scale-105' 
                              : 'bg-white border-slate-100 text-slate-600 hover:border-red-200'
                          }`}
                        >
                            <span className="text-lg">{cat === 'All' ? 'Tümü' : cat}</span>
                            <span className="opacity-60 font-bold">{cat === 'All' ? '' : 'Serisi'}</span>
                        </button>
                    ))}
                </div>
            )}
          </div>
        </div>

        {/* Results Area */}
        <div className="min-h-[500px] space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredCodes.length > 0 ? (
              filteredCodes.map((item, idx) => (
                <CodeCard key={String(item.prefix || '') + String(item.code || '')} item={item} idx={idx} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-32 text-slate-400 bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-200"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                   <Search size={40} className="opacity-20" />
                </div>
                <p className="text-2xl font-bold text-slate-500">Sonuç bulunamadı</p>
                <p className="text-slate-400">Lütfen kodu veya anahtar kelimeyi kontrol edin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Educational Info - Bottom Floating Card */}
        <div className="mt-20 p-10 md:p-16 bg-[#0f172a] rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600 rounded-full blur-[120px] opacity-10 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10 -ml-20 -mb-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
                    <Gavel size={48} className="text-red-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-black mb-4 tracking-tight">Tahdit Kodu Nedir?</h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                        Türkiye'ye girişi engelleyen, çıkışı zorunlu kılan veya idari takip sağlayan kayıtlardır. 
                        Bu kodların çoğu <span className="text-white font-bold underline decoration-red-500 decoration-2 underline-offset-4">İdare Mahkemesi</span> veya <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">Özel Meşruhatlı Vize</span> yoluyla kaldırılabilir.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                       <div className="flex items-center gap-2 text-red-400 font-bold">
                          <Zap size={16} /> Hızlı İtiraz Hakkı
                       </div>
                       <div className="flex items-center gap-2 text-blue-400 font-bold">
                          <History size={16} /> 2025 Güncel Bilgi
                       </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Global CTA */}
        <div className="mt-10 bg-white rounded-[3rem] p-10 md:p-14 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl border border-slate-100 relative overflow-hidden">
           <div className="relative z-10 text-center md:text-left">
              <span className="text-red-600 font-black tracking-widest text-xs uppercase mb-3 block">KOD KALDIRMA VE DAVA SÜREÇLERİ</span>
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-none">Hakkınızda Kod mu Var?</h3>
              <p className="text-slate-500 text-lg max-w-md font-medium">
                Kodun türüne göre hukuki yol haritasını sizin için hazırlıyoruz. Sınır dışı riskini birlikte aşalım.
              </p>
           </div>
           <button 
             onClick={openWhatsApp}
             className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl relative z-10 w-full md:w-auto hover:scale-105 active:scale-95 group"
           >
             <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" /> WhatsApp Uzman Hattı
           </button>
        </div>
      </div>
    </div>
  );
};

const CodeCard: React.FC<{ item: TahditCode, idx: number }> = ({ item, idx }) => {
  const isRestricted = item.entryInfo.toLowerCase().includes('yapamazsınız');
  const isOk = item.entryInfo.toLowerCase().includes('engel değildir');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(idx * 0.05, 0.5) }}
      className={`group bg-white rounded-[2.5rem] p-6 md:p-10 shadow-lg border-2 transition-all flex flex-col md:flex-row items-center gap-8 relative overflow-hidden ${
        isRestricted ? 'border-red-100 ring-4 ring-red-50/50' : 'border-slate-50 hover:border-blue-100'
      }`}
    >
      {/* Visual Badge for Entry Status */}
      {isRestricted && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-2xl tracking-[0.2em] uppercase shadow-lg flex items-center gap-2 z-20">
             <Lock size={12} fill="currentColor" /> GİRİŞ YASAĞI
          </div>
      )}
      {isOk && (
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-2xl tracking-[0.2em] uppercase shadow-lg flex items-center gap-2 z-20">
             <CheckCircle2 size={12} fill="currentColor" /> GİRİŞE ENGEL DEĞİL
          </div>
      )}

      {/* Label Prefix Box */}
      <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl transition-all group-hover:scale-105 relative ${getPrefixColor(item.prefix)}`}>
         <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <span className="text-4xl md:text-5xl font-black text-white relative z-10">{item.prefix}</span>
      </div>

      <div className="flex-grow text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <h3 className="text-3xl md:text-4xl font-black text-[#0f172a] tracking-tighter">{item.prefix}-{item.code}</h3>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
                  isRestricted ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-500'
              }`}>
                  {item.category}
              </span>
          </div>
          
          <p className={`text-xl md:text-2xl font-bold leading-tight transition-colors mb-6 ${
              isRestricted ? 'text-red-900' : 'text-slate-600 group-hover:text-slate-900'
          }`}>
              {item.description}
          </p>

          {/* New Entry Info Section */}
          <div className={`p-5 rounded-2xl border flex items-start gap-4 text-left transition-all ${
              isRestricted ? 'bg-red-50/50 border-red-100' : 'bg-emerald-50/50 border-emerald-100'
          }`}>
              <div className={`mt-1 p-1 rounded-full ${isRestricted ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {isRestricted ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
              </div>
              <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Resmi Giriş Bilgisi</span>
                  <p className={`text-sm font-bold leading-relaxed ${isRestricted ? 'text-red-700' : 'text-emerald-700'}`}>
                      {item.entryInfo}
                  </p>
              </div>
          </div>
          
          {/* Detailed Info Badge */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
             <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck size={16} className="text-emerald-500" /> Merkezi Kayıt Sistemi
             </div>
             {isRestricted && (
                <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-wider animate-pulse">
                    <AlertOctagon size={16} /> Kritik Engel
                </div>
             )}
          </div>
      </div>

      {/* Right Indicator (Minimalist) */}
      <div className="hidden md:block">
         <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-slate-100 group-hover:text-slate-400 transition-all">
            <HelpCircle size={24} />
         </div>
      </div>
    </motion.div>
  );
};

function getPrefixColor(prefix: string) {
    switch (prefix) {
        case 'Ç': return 'bg-gradient-to-br from-red-500 to-red-700';
        case 'G': return 'bg-gradient-to-br from-orange-500 to-orange-700';
        case 'N': return 'bg-gradient-to-br from-blue-500 to-blue-700';
        case 'O': return 'bg-gradient-to-br from-purple-500 to-purple-700';
        case 'V': return 'bg-gradient-to-br from-slate-700 to-slate-900';
        default: return 'bg-slate-400';
    }
}

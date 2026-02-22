
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Scale, 
  ArrowLeft, 
  ChevronRight, 
  Gavel, 
  Info,
  BookOpen,
  MessageCircle,
  Hash,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  MousePointer2,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

interface LawItem {
  article: string;
  letter: string;
  text: string;
  details?: string;
  atasaNote?: string;
}

const LAW_DATA: LawItem[] = [
  // Sadece Madde 31 (Kısa Dönem İkamet Gerekçeleri)
  { article: '31', letter: 'a', text: 'Bilimsel Araştırma', details: 'Üniversite veya kurum onaylı projeler için düzenlenen ikamet türüdür.' },
  { article: '31', letter: 'b', text: 'Türkiye’de Taşınmaz Malı Bulunanlar', details: 'Kendi adına konutu/tapusu olan ve bu konutu barınma amacıyla kullanan yabancılar içindir.' },
  { article: '31', letter: 'c', text: 'Ticari Bağlantı veya İş Kuracaklar', details: 'Türkiye ile ticari bağlantısı olan veya iş kuracak yabancılar için düzenlenir.' },
  { article: '31', letter: 'ç', text: 'Hizmet İçi Eğitim', details: 'Hizmet içi eğitim programlarına katılacak yabancı personeller içindir.' },
  { article: '31', letter: 'd', text: 'Eğitim / Öğrenci Değişimi', details: 'Uluslararası anlaşmalar veya değişim programları çerçevesinde eğitim amaçlı gelenler.' },
  { article: '31', letter: 'e', text: 'Turizm Amaçlı', details: 'Turistik gezi amacıyla kalacak yabancılara verilir. En sık kullanılan ikamet gerekçesidir.' },
  { article: '31', letter: 'f', text: 'Sağlık / Tedavi Amaçlı', details: 'Kamu sağlığına tehdit olmayan hastalıkların tedavisi için Türkiye\'ye gelenler içindir.' },
  { article: '31', letter: 'g', text: 'Adli / İdari Makam Talebi', details: 'Dava veya idari süreçler nedeniyle Türkiye\'de kalması gereken yabancılara verilir.' },
  { article: '31', letter: 'ğ', text: 'Aile İkametinden Geçiş', details: 'Aile ikamet izni şartlarını kaybeden yabancıların kısa döneme geçiş yapmasını sağlar.' },
  { article: '31', letter: 'h', text: 'Türkçe Öğrenme Kursu', details: 'Milli Eğitim Bakanlığı onaylı Türkçe kurslarına katılacak yabancılara en fazla 2 kez verilir.' },
  { article: '31', letter: 'ı', text: 'Kamu Aracılığıyla Eğitim / Staj', details: 'Kamu kurumları aracılığıyla eğitim, araştırma veya staj yapacak yabancılar içindir.' },
  { article: '31', letter: 'i', text: 'Mezuniyet Sonrası', details: 'Türkiye\'de yükseköğrenimini tamamlayıp ilk 6 ay içinde başvuran yabancılara tek seferlik verilir.' },
  { article: '31', letter: 'j', text: 'Büyük Ölçekli Yatırımcılar', details: 'Cumhurbaşkanınca belirlenen kapsam ve tutarda yatırım yapan yabancılar ve aileleri içindir.' },
  { article: '31', letter: 'k', text: 'KKTC Vatandaşları', details: 'Kuzey Kıbrıs Türk Cumhuriyeti vatandaşları için düzenlenen özel kısa dönem ikamet türüdür.' }
];

// Detaylı Animasyonlu Kart Bileşeni
const AnimatedResidenceCard = () => {
    return (
        <div className="relative w-full max-w-[340px] md:max-w-[360px] mx-auto group pb-10">
            {/* Kart Arka Planı (Resmi Formata Uygun) */}
            <motion.div 
                initial={{ rotateY: 15, rotateX: 5 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="w-full aspect-[1.6/1] bg-[#fcf8f2] rounded-2xl border border-slate-300 shadow-2xl p-4 overflow-hidden relative"
                style={{ 
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 0%, #f7f1e8 100%)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Güvenlik Hologramı Efekti */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-50"></div>
                
                {/* Üst Başlık Alanı */}
                <div className="flex justify-between items-start mb-3">
                    <div className="space-y-0.5">
                        <div className="text-[8px] font-black text-blue-900 uppercase">Türkiye Cumhuriyeti</div>
                        <div className="text-[7px] font-bold text-slate-500">REPUBLIC OF TÜRKİYE</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[7px] font-bold text-blue-800">YABANCILAR İLETİŞİM MERKEZİ</div>
                        <div className="text-[6px] text-slate-400">YİMER 157</div>
                    </div>
                </div>

                {/* Bilgi Alanları (Görsele Göre Yerleşim) */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 opacity-70">
                    <div className="space-y-1">
                        <div className="text-[6px] font-bold text-slate-400 uppercase">Anne Adı / Mother's Name</div>
                        <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[6px] font-bold text-slate-400 uppercase">Belge Geçerlilik / Valid Until</div>
                        <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[6px] font-bold text-slate-400 uppercase">Baba Adı / Father's Name</div>
                        <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                    </div>
                </div>

                {/* KRİTİK ALAN: İKAMET TÜRÜ */}
                <div className="mt-5 relative">
                    <div className="text-[7px] font-bold text-slate-400 uppercase mb-1">İkamet İzni Türü / Residence Permit Type</div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-black text-slate-800 tracking-tight">KISA DÖNEM</span>
                        
                        {/* Harf Vurgusu */}
                        <div className="relative">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    backgroundColor: ['rgba(37,99,235,0)', 'rgba(37,99,235,0.15)', 'rgba(37,99,235,0)']
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="px-2 py-0.5 border-2 border-blue-600 rounded text-blue-600 font-black text-[10px]"
                            >
                                (E)
                            </motion.div>
                            
                            {/* Büyüteç Efekti */}
                            <motion.div 
                                animate={{ x: [0, 5, -5, 0], y: [0, -3, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-10 -right-4 pointer-events-none z-50"
                            >
                                <div className="w-12 h-12 rounded-full border-2 border-blue-500 bg-white/40 backdrop-blur-[4px] flex items-center justify-center shadow-xl">
                                    <span className="text-[14px] font-black text-blue-600">(E)</span>
                                </div>
                                <div className="w-0.5 h-8 bg-blue-500 rotate-[45deg] absolute -bottom-5 -left-1"></div>
                            </motion.div>
                        </div>

                        <span className="text-[8px] font-bold text-slate-400 whitespace-nowrap">/ SHORT-TERM (E)</span>
                    </div>
                </div>

                {/* Alt İmza Alanı */}
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end border-t border-slate-200 pt-2 opacity-40">
                    <div className="text-[6px] font-bold text-slate-500">T.C. İÇİŞLERİ BAKANLIĞI GÖÇ İDARESİ</div>
                    <div className="w-8 h-8 bg-slate-200 rounded"></div>
                </div>
            </motion.div>

            {/* Yönlendirici El İkonu */}
            <motion.div 
                animate={{ y: [0, 5, 0], x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 text-blue-600"
            >
                <div className="bg-white px-4 py-2 rounded-full shadow-2xl border border-blue-100 flex items-center gap-2 whitespace-nowrap">
                    <MousePointer2 size={18} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Buradaki Harfi Yazın</span>
                </div>
            </motion.div>
        </div>
    );
};

export const ResidencyLawSearchPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [searchTerm, setSearchTerm] = useState('');

  const normalize = (text: string) => text.toLocaleLowerCase('tr-TR').trim();

  const filteredResults = useMemo(() => {
    const term = normalize(searchTerm);
    if (!term) return [];

    return LAW_DATA.filter(item => {
      if (term.length === 1) {
        return normalize(item.letter) === term;
      }
      return normalize(item.text).includes(term) || normalize(item.letter) === term;
    });
  }, [searchTerm]);

  const hasAnyResult = filteredResults.length > 0;

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-slate-50">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm">
            <ArrowLeft size={18} /> UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-slate-900 mb-6 shadow-xl border border-slate-100">
             <Scale size={32} className="text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Kısa Dönem Türünü Öğren</h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto font-medium">
            Kartınızın arkasındaki parantez içi harfi girerek Kısa Dönem ikamet gerekçenizi anında öğrenin.
          </p>
        </div>

        {/* Bilgilendirme Bannerı - Sadece Kısa Dönem İçin */}
        <div className="mb-8 flex justify-center">
            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-2xl flex flex-col md:flex-row items-center gap-6 border-4 border-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full pointer-events-none"></div>
               <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/20">
                  <AlertTriangle size={28} className="text-white" />
               </div>
               <div className="text-center md:text-left">
                  <h4 className="font-black uppercase tracking-widest text-[10px] opacity-80 mb-1">ÖNEMLİ BİLGİLENDİRME</h4>
                  <p className="text-lg font-bold leading-tight">
                    Bu sorgulama aracı <span className="bg-white text-blue-600 px-2 py-0.5 rounded ml-1">SADECE</span> Kısa Dönem (Madde 31) ikamet kartları için tasarlanmıştır.
                  </p>
               </div>
            </div>
        </div>

        {/* Interactive Guide Component */}
        <div className="mb-12">
            <div className="bg-slate-950 rounded-[2.5rem] p-6 md:p-12 text-white relative shadow-2xl border border-slate-800">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-10 -mr-20 -mt-20"></div>
                
                <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                    
                    <div className="w-full lg:w-1/2 flex justify-center py-4">
                        <AnimatedResidenceCard />
                    </div>

                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                            <Sparkles size={12}/> Akıllı Rehber
                        </div>
                        <h3 className="text-2xl font-black mb-4 flex items-center justify-center lg:justify-start gap-3">
                            <CreditCard className="text-blue-400" /> Harfi Nerede Bulurum?
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            Kısa dönem ikamet kartınızın arka yüzünde parantez içindeki harfi (Örn: <span className="text-blue-400 font-black">E</span>, <span className="text-blue-400 font-black">B</span> veya <span className="text-blue-400 font-black">J</span>) aşağıdaki kutucuğa yazın.
                        </p>
                        
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2 self-center">Örnekler:</span>
                            {['a', 'b', 'e', 'j', 'i'].map(char => (
                                <button 
                                    key={char}
                                    onClick={() => setSearchTerm(char)}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-lg active:scale-90"
                                >
                                    {char}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Search Interface */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 p-6 md:p-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="text"
                autoFocus
                placeholder="Kartın arkasındaki harfi yazın (e, b, j...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none text-xl font-medium transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {!searchTerm ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-20 opacity-40"
                >
                  <BookOpen size={64} className="mx-auto mb-4 text-slate-300" />
                  <p className="text-xl font-medium text-slate-400">Aramaya başlamak için karttaki harfi yazın.</p>
                </motion.div>
              ) : !hasAnyResult ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200"
                >
                  <AlertCircle size={48} className="mx-auto mb-4 text-slate-300" />
                  <h3 className="text-2xl font-bold text-slate-400">Sonuç Bulunamadı</h3>
                  <p className="text-slate-400 mt-2">Girdiğiniz harf kısa dönem ikamet listesinde yer almıyor.</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-4">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">KALIŞ GEREKÇESİ (MADDE 31)</span>
                  </div>
                  {filteredResults.map((item, idx) => (
                      <ResultCard key={idx} item={item} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="text-blue-600" size={32} />
            </div>
            <div className="text-sm text-blue-900 leading-relaxed text-center md:text-left">
                <p className="text-lg font-black mb-1">Resmi Mevzuata Uygun</p>
                <p className="opacity-80">Bu bilgiler 6458 Sayılı Yabancılar ve Uluslararası Koruma Kanunu (Madde 31) kapsamında kısa dönem ikamet gerekçelerini belirtmektedir.</p>
            </div>
        </div>

        {/* Global CTA */}
        <div className="mt-10 bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden border border-white/5">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
           <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-black mb-3">İkamet Sürecinizde Profesyonel Destek</h3>
              <p className="text-slate-400 text-lg max-w-md">
                Kart türünüzü belirledik. Sorunsuz bir uzatma veya yeni başvuru için uzmanlarımızla iletişime geçin.
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

const ResultCard: React.FC<{ item: LawItem }> = ({ item }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-[2rem] p-6 md:p-10 shadow-lg border-2 border-slate-100 hover:border-blue-500 transition-all relative overflow-hidden"
  >
    <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-3xl font-black bg-blue-600 text-white shadow-xl">
          {item.letter.toUpperCase()})
        </div>
        <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded tracking-tighter uppercase">6458 SAYILI KANUN MADDE 31</span>
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4 tracking-tight">{item.text}</h4>
            
            {item.details && (
                <p className="text-slate-600 text-lg mb-4 leading-relaxed font-medium">{item.details}</p>
            )}

            {item.atasaNote && (
                <div className="bg-slate-900 p-6 rounded-3xl mt-6 relative overflow-hidden">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Atasa Danışman Notu</p>
                    <p className="text-white text-lg font-medium leading-relaxed italic relative z-10">"{item.atasaNote}"</p>
                </div>
            )}
        </div>
    </div>
  </motion.div>
);

import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  ArrowRight, ShieldCheck, Youtube, Instagram, Star, BadgeCheck, 
  CalendarCheck, Phone, MessageCircle, Info, Clock, ShieldAlert, 
  Gavel, Calendar, Scale, MapPin, Calculator, Bike, Navigation, 
  PlaneLanding, Banknote, Wallet, Landmark, BookOpen, Search, X, 
  Users, Target, Files, Loader2, Newspaper, Zap, CreditCard, Globe, PlaneTakeoff,
  Award, Building2, Quote, Plane, FileX, GraduationCap
} from 'lucide-react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
const motion = _motion as any;
import { COMPANY_INFO, BLOG_POSTS as STATIC_POSTS } from '../../constants';
import * as Icons from 'lucide-react';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';
import { SEO } from '../common/SEO';

const HERO_PHRASES = [
  "Geleceğinizi Kurun",
  "İkamet İzni Alın",
  "Yasal Olarak Çalışın",
  "Şirketinizi Kurun",
  "Vatandaşlık Kazanın"
];

const BLOG_API_URL = 'https://atasa-blog-api-production-22a4.up.railway.app/api/posts';

const QUICK_APPS = [
  { id: 'whatsapp-groups', title: 'WhatsApp\nGrupları', icon: <MessageCircle size={32} />, link: '/apps/whatsapp-groups', color: 'emerald' },
  { id: 'residency-rejection', title: 'İkamet Ret\nRehberi', icon: <FileX size={32} />, link: '/apps/residency-rejection', color: 'red' },
  { id: 'visa-regime', title: 'Vize Rejimi\nSorgula', icon: <Plane size={32} />, link: '/apps/visa-regime', color: 'blue' },
  { id: 'directorate-finder', title: 'Göç İdaresi\nRehberi', icon: <Building2 size={32} />, link: '/apps/directorate-finder', color: 'blue-dark' },
  { id: 'student-age', title: 'Eğitim Yaş\nUygunluğu', icon: <GraduationCap size={32} />, link: '/apps/student-age-checker', color: 'orange' },
  { id: 'citizenship-invest', title: 'Yatırımcı\nVatandaşlık', icon: <Icons.Flag size={32} />, link: '/citizenship', color: 'red' },
  { id: 'citizenship-exceptional', title: 'İstisnai\nVatandaşlık', icon: <Star size={32} />, link: '/citizenship/exceptional', color: 'red-dark' },
  { id: 'abroad-days', title: 'Gün\nHesaplayıcı', icon: <PlaneTakeoff size={32} />, link: '/apps/abroad-days', color: 'blue' },
  { id: 'passport-index', title: 'Pasaport\nEndeksi', icon: <Globe size={32} />, link: '/apps/passport-index', color: 'yellow' },
  { id: 'passport-check', title: 'Pasaport\nKontrol', icon: <CreditCard size={32} />, link: '/apps/passport-check', color: 'blue' },
  { id: 'dual-citizenship', title: 'Çifte\nVatandaşlık', icon: <Files size={32} />, link: '/apps/dual-citizenship', color: 'indigo' },
  { id: 'reviews', title: 'Müşteri\nYorumları', icon: <Star size={32} fill="currentColor" />, link: '/reviews', color: 'yellow' },
  { id: 'query', title: 'Mahalle\nSorgula', icon: <MapPin size={32} />, link: '/evaluation/closed-areas-for-foreigners', color: 'blue' },
  { id: 'deport', title: 'Deport\nHesapla', icon: <PlaneLanding size={32} />, link: '/apps/deport-calculator', color: 'orange' },
  { id: 'tahdit', title: 'Tahdit Kodu\nSorgula', icon: <ShieldAlert size={32} />, link: '/apps/tahdit-codes', color: 'red' },
  { id: 'penalty', title: 'Vize Cezası\nHesapla', icon: <Banknote size={32} />, link: '/apps/visa-penalty', color: 'red-dark' },
  { id: 'wage', title: 'Sigorta\nPrimi', icon: <Wallet size={32} />, link: '/apps/wage-calculator', color: 'indigo' },
  { id: 'turkmen', title: 'Türkmen\nVize', icon: <ShieldCheck size={32} />, link: '/apps/turkmenistan-visa', color: 'emerald' },
  { id: 'embassy', title: 'Konsolosluk\nRehberi', icon: <Landmark size={32} />, link: '/apps/embassy-finder', color: 'sky' },
  { id: 'law', title: 'Kanun\nSorgula', icon: <BookOpen size={32} />, link: '/apps/law-search', color: 'slate' },
  { id: 'work-renewal', title: 'Çalışma\nUzatma', icon: <Icons.History size={32} />, link: '/apps/work-permit-renewal', color: 'blue-light' },
  { id: 'res-renewal', title: 'İkamet\nUzatma', icon: <Calendar size={32} />, link: '/apps/residency-renewal', color: 'purple' },
  { id: 'res-type', title: 'İzin Tür\nSorgula', icon: <Scale size={32} />, link: '/apps/residency-type-query', color: 'slate-dark' },
  { id: 'long-term', title: 'Süresiz\nİkamet', icon: <Calculator size={32} />, link: '/apps/long-term-calculator', color: 'purple-dark' },
  { id: 'courier', title: 'Kurye\nTesti', icon: <Bike size={32} />, link: '/profession/couriers', color: 'yellow-dark' },
  { id: 'appointment', title: 'Randevu\nAl', icon: <CalendarCheck size={32} />, link: '/appointment', color: 'green' },
  { id: 'rejection', title: 'Ret Kodu\nSorgula', icon: <ShieldAlert size={32} />, link: '/apps/rejection-guide', color: 'orange-dark' },
  { id: 'profession', title: 'Yasaklı\nMeslek', icon: <Gavel size={32} />, link: '/apps/profession-checker', color: 'red-light' },
  { id: 'branches', title: 'Şube\nBul', icon: <Navigation size={32} />, link: '/branches', color: 'slate-blue' },
  { id: 'news', title: 'Haber\nMerkezi', icon: <Youtube size={32} />, link: '/blog/shorts', color: 'pink' },
];

const getColorClasses = (color: string) => {
  const classes: Record<string, string> = {
    'yellow': 'from-yellow-400 to-yellow-600 shadow-yellow-200 text-yellow-600',
    'blue': 'from-blue-500 to-blue-600 shadow-blue-200 text-blue-600',
    'blue-dark': 'from-blue-700 to-blue-900 shadow-blue-300 text-blue-900',
    'orange': 'from-orange-400 to-orange-600 shadow-orange-200 text-red-600',
    'red': 'from-red-500 to-red-700 shadow-red-200 text-red-700',
    'red-dark': 'from-red-600 to-red-800 shadow-red-300 text-red-800',
    'indigo': 'from-blue-600 to-indigo-600 shadow-blue-200 text-blue-700',
    'emerald': 'from-emerald-500 to-emerald-700 shadow-emerald-200 text-emerald-700',
    'sky': 'from-sky-500 to-blue-600 shadow-sky-200 text-sky-700',
    'slate': 'from-slate-400 to-slate-600 shadow-slate-200 text-slate-800',
    'blue-light': 'from-blue-400 to-indigo-500 shadow-blue-200 text-blue-500',
    'purple': 'from-indigo-50 to-purple-600 shadow-indigo-200 text-indigo-600',
    'slate-dark': 'from-slate-600 to-slate-800 shadow-slate-200 text-slate-800',
    'purple-dark': 'from-purple-50 to-purple-600 shadow-purple-200 text-purple-600',
    'yellow-dark': 'from-yellow-400 to-yellow-500 shadow-yellow-200 text-yellow-600',
    'green': 'from-green-500 to-green-600 shadow-green-200 text-green-600',
    'orange-dark': 'from-orange-400 to-orange-600 shadow-orange-200 text-orange-600',
    'red-light': 'from-red-500 to-red-700 shadow-red-200 text-red-600',
    'slate-blue': 'from-slate-700 to-slate-900 shadow-slate-200 text-slate-800',
    'pink': 'from-pink-500 to-pink-600 shadow-pink-200 text-pink-600',
  };
  return classes[color] || classes['blue'];
};

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-60 grayscale hover:grayscale-0 transition-all" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const Home: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isRotated, setIsRotated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const getLatestNews = async () => {
      try {
        setNewsLoading(true);
        const response = await fetch(BLOG_API_URL);
        if (response.ok) {
          const data = await response.json();
          setLatestNews(data.slice(0, 3).map((item: any) => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            date: item.date,
            category: item.category || 'GÜNCEL'
          })));
        } else {
          throw new Error('News API Error');
        }
      } catch (err) {
        setLatestNews(STATIC_POSTS.slice(0, 3).map(p => ({
          id: p.id,
          title: p.title,
          excerpt: p.summary,
          date: p.date,
          category: 'GÜNCEL'
        })));
      } finally {
        setNewsLoading(false);
      }
    };
    getLatestNews();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setCursorPos({ x: -100, y: -100 });
    setIsRotated(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredApps = useMemo(() => {
    const term = searchTerm.toLocaleLowerCase('tr-TR').trim();
    if (!term) return QUICK_APPS;
    return QUICK_APPS.filter(app => app.title.toLocaleLowerCase('tr-TR').includes(term));
  }, [searchTerm]);

  return (
    <div className="flex flex-col">
      <SEO 
        title="Ana Sayfa"
        description="Atasa Danışmanlık ile Türkiye'de ikamet izni, çalışma izni ve vatandaşlık işlemlerinizi güvenle tamamlayın. Profesyonel danışmanlık hizmetleri."
      />
      
      {/* Hero Section */}
      <div className="relative min-h-[90vh] overflow-hidden flex flex-col justify-center pt-32 md:pt-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight select-none cursor-default">
              <div className="relative inline-block mb-2 group">
                <span 
                  ref={textRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="block text-slate-300 relative z-10 transition-colors duration-300 pb-3"
                  style={{ textShadow: '1px 1px 0px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.1)' }}
                >
                  Türkiye'd
                  <span 
                    className={`inline-block transition-transform duration-500 ease-out cursor-pointer ${isRotated ? '-rotate-12' : ''}`}
                    onMouseEnter={() => setIsRotated(true)}
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    e
                  </span>
                </span>
                <span 
                  className="absolute inset-0 text-red-600 pointer-events-none z-20 pb-3"
                  style={{
                    maskImage: `radial-gradient(circle 80px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(circle 80px at ${cursorPos.x}px ${cursorPos.y}px, black, transparent)`,
                    textShadow: '0px 0px 10px rgba(220, 38, 38, 0.5)'
                  }}
                >
                  Türkiye'd
                  <span className={`inline-block transition-transform duration-500 ease-out ${isRotated ? '-rotate-12' : ''}`} style={{ transformOrigin: 'center bottom' }}>e</span>
                </span>
              </div>
              <div className="relative h-[1.4em] w-full flex justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={phraseIndex}
                    initial={{ y: '100%', opacity: 0, filter: 'blur(12px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-100%', opacity: 0, filter: 'blur(12px)' }}
                    transition={{ y: { type: "spring", stiffness: 100, damping: 20 }, opacity: { duration: 0.4 }, filter: { duration: 0.4 } }}
                    style={{ willChange: 'transform, opacity' }}
                    className="absolute top-0 w-full text-center flex items-center justify-center"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-400 to-slate-500 inline-block py-2 px-1" style={{ filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.8))' }}>
                      {HERO_PHRASES[phraseIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-5xl mx-auto mb-10 leading-relaxed font-normal">
              İkamet izni, çalışma izni ve vatandaşlık süreçlerinde <strong className="text-slate-500">güvenilir, hızlı ve şeffaf</strong> çözüm ortağınız.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 mt-4 scale-105 transform origin-top">
              <div className="flex flex-wrap justify-center items-center gap-4 w-full">
                <button onClick={openWhatsApp} aria-label="WhatsApp Destek" className="group relative inline-flex h-16 items-center justify-center rounded-full bg-white border border-slate-200 px-8 font-medium text-slate-700 shadow-md transition-all duration-300 hover:bg-slate-50 hover:scale-105 min-w-[200px]">
                   <span className="flex items-center gap-2 relative z-10">
                     <MessageCircle size={24} className="text-slate-900" />
                     <span className="text-lg font-bold tracking-wide">WhatsApp Destek</span>
                   </span>
                </button>
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} aria-label="Hemen Arayın" className="group relative inline-flex h-16 overflow-hidden rounded-full p-[3px] shadow-xl shadow-green-600/20 hover:scale-105 transition-transform duration-300 min-w-[300px] md:min-w-[340px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#16a34a_0%,#FFFFFF_50%,#16a34a_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-green-600 px-10 text-white backdrop-blur-3xl gap-2 relative z-10 transition-colors hover:bg-green-700">
                    <Phone size={24} className="animate-pulse" />
                    <span className="text-lg font-bold tracking-wide">Hemen Arayın</span>
                  </span>
                </a>
                <Link to="/appointment" aria-label="Randevu Al" className="group relative inline-flex h-16 items-center justify-center rounded-full bg-white border border-slate-200 px-8 font-medium text-slate-700 shadow-md transition-all duration-300 hover:bg-slate-50 hover:scale-105 min-w-[200px]">
                   <span className="flex items-center gap-2 relative z-10">
                     <Calendar size={24} className="text-slate-900" />
                     <span className="text-lg font-bold tracking-wide">Randevu Al</span>
                   </span>
                </Link>
              </div>
              <p className="text-sm text-slate-500 font-bold bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 flex items-center gap-2">
                <Info size={16} className="text-blue-500" />
                Ön bilgi verdiğiniz için işlemleriniz çok hızlı hallolur.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pb-12 opacity-80 hover:opacity-100 transition-opacity">
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm flex items-center gap-4 cursor-default h-[140px] group">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 group-hover:text-blue-400 transition-colors flex items-center justify-center shrink-0"><ShieldCheck size={28} /></div>
              <div>
                <div className="text-2xl font-bold text-slate-400 group-hover:text-slate-600 transition-colors">%98</div>
                <div className="text-sm font-medium text-slate-400">Başarı Oranı</div>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm flex items-center gap-4 cursor-default h-[140px] group">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 group-hover:text-orange-400 transition-colors flex items-center justify-center shrink-0"><Icons.Zap size={28} /></div>
              <div>
                <div className="text-2xl font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Hızlı</div>
                <div className="text-sm font-medium text-slate-400">Sonuçlandırma</div>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-5 rounded-3xl border border-white/40 shadow-sm flex flex-col justify-center h-[140px] group relative">
               <div className="absolute top-0 right-0 bg-slate-200 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">GOOGLE PARTNER</div>
               <div className="space-y-3 mt-2 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center justify-between border-b border-slate-100/50 pb-1.5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2"><div className="p-1 text-slate-400 group-hover:text-red-600"><Youtube size={14} /></div><span className="text-xs font-bold text-slate-400">YouTube</span></div>
                      <span className="text-sm font-black text-slate-400 group-hover:text-slate-900">100K+</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><div><GoogleLogo /></div><span className="text-xs font-bold text-slate-400">1000+ Yorum</span></div>
                      <div className="flex items-center gap-1 bg-slate-100 text-slate-400 group-hover:bg-yellow-400 group-hover:text-white px-1.5 py-0.5 rounded font-bold text-xs">4.9 <Star size={10} fill="currentColor" /></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPS SECTION */}
      <section className="py-10 relative z-20 -mt-8 mb-8" aria-labelledby="apps-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10"><span className="text-slate-400 font-bold tracking-widest text-xs uppercase">DİJİTAL ARAÇLAR</span><h2 id="apps-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Hızlı İşlem Merkezi</h2></div>
          <div className="max-w-xl mx-auto mb-10 relative">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
                <div className="relative bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center p-2">
                   <div className="pl-3 pr-2 text-slate-400"><Search size={22} /></div>
                   <input type="text" placeholder="Hızlı işlem ara..." aria-label="Hızlı işlem ara" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-slate-800 font-medium h-10 text-sm md:text-base"/>
                   {searchTerm && <button onClick={() => setSearchTerm('')} aria-label="Aramayı Temizle" className="p-2 text-slate-400 hover:text-slate-600"><X size={18} /></button>}
                </div>
             </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-7xl mx-auto px-4">
            <AnimatePresence>
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <Link key={app.id} to={app.link} aria-label={app.title.replace('\n', ' ')} className="group flex flex-col items-center gap-3 w-24 animate-in fade-in zoom-in duration-300">
                    <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${getColorClasses(app.color)} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>{app.icon}</div>
                    <span className="text-xs font-bold text-slate-600 text-center group-hover:text-blue-600 leading-tight whitespace-pre-line">{app.title}</span>
                  </Link>
                ))
              ) : (
                <div className="text-center py-10 w-full"><p className="text-slate-400 font-bold">Sonuç bulunamadı.</p></div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-16 bg-white border-t border-slate-100 relative z-10" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 px-2">
             <div><span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Popüler İşlemler</span><h2 id="services-heading" className="text-3xl font-bold text-slate-900 mt-2">İhtiyacınız Olan Hizmeti Seçin</h2></div>
             <Link to="/services" className="hidden md:flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600 transition-colors">Tüm Hizmetler <ArrowRight size={18} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeaturedCard to="/accommodation-permit/short-term" title="İkamet İzni" desc="Turistik veya Taşınmaz amaçlı oturum izinleri." icon={<Icons.Home size={24} />} color="blue" />
            <FeaturedCard to="/work-permit/temporary" title="Çalışma İzni" desc="Şirket personeli için yasal çalışma izni alın." icon={<Icons.Briefcase size={24} />} color="orange" />
            <FeaturedCard to="/profession/couriers" title="Kurye İzni" desc="Motorlu kuryeler için P1 Belgesi ve Esnaf modeli." icon={<Icons.Bike size={24} />} color="dark" badge="POPÜLER" />
            <FeaturedCard to="/citizenship" title="Vatandaşlık" desc="Yatırım yoluyla Türk vatandaşlığı başvurusu." icon={<Icons.Gem size={24} />} color="red" />
          </div>
        </div>
      </section>

      {/* BİZ KİMİZ SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden" aria-labelledby="about-heading">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
               <img src="http://upload-service-production-dd42.up.railway.app/files/1766855782440-308545388.webp" alt="Atasa Ofis Profesyonel Ekip" width="600" height="500" loading="lazy" className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover border-4 border-white"/>
               <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-xl border-4 border-white transform rotate-3"><div className="text-4xl font-black">10+</div><div className="text-xs font-bold uppercase tracking-widest">Yıllık Tecrübe</div></div>
            </div>
            <div className="w-full lg:w-1/2">
               <span className="text-blue-600 font-black tracking-widest text-xs uppercase mb-3 block">BİZ KİMİZ?</span>
               <h2 id="about-heading" className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Sizin İçin Buradayız.</h2>
               <p className="text-slate-600 text-xl leading-relaxed mb-10 font-medium">Atasa Danışmanlık olarak 2015 yılından beri yabancı misafirlerimizin en güvenilir yol arkadaşıyız.</p>
               <Link to="/about" className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95 group">Hikayemizi Tanıyın <ArrowRight className="group-hover:translate-x-2 transition-transform" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCES TEASER SECTION */}
      <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden" aria-labelledby="references-heading">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
            <div className="max-w-2xl">
               <span className="text-blue-600 font-black tracking-widest text-xs uppercase mb-3 block">Referanslarımız</span>
               <h2 id="references-heading" className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Güvenin Adresi: Önemli Referanslarımız</h2>
               <p className="text-slate-500 text-lg mt-4 font-medium">Sanat dünyasından dev holdinglere kadar binlerce kişi ve kurum Atasa tecrübesine güveniyor.</p>
            </div>
            <Link to="/references" className="hidden md:flex items-center gap-2 text-blue-600 font-black text-sm hover:gap-3 transition-all">
              TÜM REFERANSLAR <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             <ReferenceTeaserCard 
                name="Demet Akalın" 
                desc="Türk pop müziğinin en tanınan isimlerinden. Sanat dünyasındaki yasal süreçlerinde Atasa'yı tercih ediyor."
                image="http://upload-service-production-dd42.up.railway.app/files/1766919563352-874766814.jpg"
                badge="ÖZEL REFERANS"
             />
             <ReferenceTeaserCard 
                name="S. Akın Akınözü" 
                desc="Hercai gibi dizilerle uluslararası başarı yakalamış aktör. Global projelerindeki danışmanlık ortağıyız."
                image="http://upload-service-production-dd42.up.railway.app/files/1766920101899-174551240.jpg"
                badge="ÖZEL REFERANS"
             />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
             <BrandLogoTeaser name="CENGİZ HOLDİNG" acronym="CH" logo="http://upload-service-production-dd42.up.railway.app/files/1766852261896-326901415.png" />
             <BrandLogoTeaser name="BNB İNŞAAT" acronym="BNB" logo="http://upload-service-production-dd42.up.railway.app/files/1766852262114-332273875.png" />
             <BrandLogoTeaser name="BAKIR NAKLİYAT" acronym="BN" logo="http://upload-service-production-dd42.up.railway.app/files/1766919567168-795362619.png" />
             <BrandLogoTeaser name="BIG DENİM" acronym="BD" logo="http://upload-service-production-dd42.up.railway.app/files/1766919567166-77035413.png" />
             <BrandLogoTeaser name="İYİOKUR METAL" acronym="İM" logo="http://upload-service-production-dd42.up.railway.app/files/1766852262090-226933314.png" />
             <BrandLogoTeaser name="ARNES AMBALAJ" acronym="AA" logo="http://upload-service-production-dd42.up.railway.app/files/1766852262040-58399250.png" />
          </div>

          <div className="mt-16 text-center md:hidden">
            <Link to="/references" className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black text-sm active:scale-95 transition-transform">
               Tüm Referanslarımızı Gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* NEDEN ATASA? SECTION (Trust/Why Us) */}
      <section className="py-24 relative overflow-hidden bg-white/50 backdrop-blur-sm border-t border-slate-100" aria-labelledby="why-atasa">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]">
                 <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80" alt="Profesyonel Danışmanlık ve Hizmet" width="1000" height="600" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                 <div className="absolute bottom-8 left-8 text-white"><div className="text-sm font-medium opacity-90 mb-1">Profesyonel Yaklaşım</div><div className="text-2xl font-bold">Çözüm Odaklı Hizmet</div></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
               <h2 id="why-atasa" className="text-blue-600 font-bold tracking-wide uppercase mb-3 text-sm">Neden Atasa?</h2>
               <h3 className="text-4xl font-bold mb-6 text-slate-900 leading-tight">Güvenilirlik Bizim Birinci Önceliğimiz</h3>
               <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200 border border-slate-100 mb-10 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-2"><h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">BİNLERCE KİŞİ GÜVENİYOR</h4><div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><BadgeCheck size={12} /> GOOGLE PARTNER</div></div>
                  <div className="grid grid-cols-3 gap-2 divide-x divide-slate-100">
                      <a href="https://www.youtube.com/@atasa_tr" target="_blank" rel="noreferrer" aria-label="YouTube Kanalımız" className="flex flex-col items-center group cursor-pointer"><Youtube size={28} className="text-red-600 mb-2 group-hover:scale-110 transition-transform" /><span className="text-2xl font-black text-slate-900 tracking-tight">100K+</span><span className="text-xs font-bold text-slate-500">YouTube</span></a>
                      <a href="https://www.instagram.com/atasa_tr/" target="_blank" rel="noreferrer" aria-label="Instagram Sayfamız" className="flex flex-col items-center group cursor-pointer"><Instagram size={28} className="text-pink-600 mb-2 group-hover:scale-110 transition-transform" /><span className="text-2xl font-black text-slate-900 tracking-tight">50K+</span><span className="text-xs font-bold text-slate-500">Instagram</span></a>
                      <div className="flex flex-col items-center"><div className="flex items-center gap-1 mb-2"><span className="bg-yellow-400 text-white rounded px-1.5 py-0.5 text-xs font-bold">4.9</span><div className="flex text-yellow-400"><Star size={12} fill="currentColor" /></div></div><span className="text-2xl font-black text-slate-900 tracking-tight">150+</span><span className="text-xs font-bold text-slate-500">Google Yorum</span></div>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="flex gap-4"><div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100"><ShieldCheck size={28} /></div><div><h4 className="font-bold text-slate-900 mb-1">Yasal Güvence</h4><p className="text-slate-600 text-sm leading-relaxed">Tüm işlemlerimiz resmi kanunlara %100 uygun yürütülür.</p></div></div>
                  <div className="flex gap-4"><div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100"><Clock size={28} /></div><div><h4 className="font-bold text-slate-900 mb-1">Zaman Tasarrufu</h4><p className="text-slate-600 text-sm leading-relaxed">Başvuruları sizin adınıza en hızlı şekilde sonuçlandırıyoruz.</p></div></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC NEWS SECTION */}
      <section className="py-24 bg-white border-t border-slate-100" aria-labelledby="news-heading">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                 <Newspaper size={12} /> Haber Merkezi
              </div>
              <h2 id="news-heading" className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Güncel Haberler ve Rehberler</h2>
              <p className="text-slate-500 text-lg font-medium">Türkiye'deki yabancılar için en son yasal düzenlemeler ve pratik bilgiler.</p>
            </div>
            <Link to="/blog/shorts" className="hidden md:flex items-center gap-2 text-blue-600 font-black text-sm hover:gap-3 transition-all">
              TÜM HABERLER <ArrowRight size={18} />
            </Link>
          </div>

          {newsLoading ? (
            <div className="flex justify-center py-20">
               <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((post) => (
                <Link key={post.id} to="/blog/shorts" aria-label={post.title} className="group bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-3 py-1 bg-white rounded-lg text-[10px] font-black text-blue-600 uppercase border border-slate-100">
                      {post.category}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                       <Calendar size={14} /> {post.date}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] text-slate-900 pt-6 border-t border-slate-200/60 group-hover:text-blue-600 transition-colors">
                    MAKALEYİ OKU <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/blog/shorts" className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black text-sm active:scale-95 transition-transform">
               Tüm Haberleri Gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Profesyonel Başvuru İçin Danışmanlık Alın</h2>
          <p className="mb-8 text-blue-100 max-w-2xl mx-auto">Hemen bizimle iletişime geçin.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/appointment" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-slate-50 transition-all shadow-lg flex items-center justify-center gap-2">
              Online Randevu Al
            </Link>
            <button 
              onClick={openWhatsApp} 
              aria-label="WhatsApp'tan Yaz"
              className="bg-green-500 text-white px-10 py-4 rounded-full font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Icons.MessageCircle size={24} fill="currentColor" /> 
              WhatsApp'tan Yaz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeaturedCard = ({ to, title, desc, icon, color, badge }: any) => {
  const themes: any = {
    blue: 'from-blue-600 to-blue-800',
    orange: 'from-orange-50 to-red-600',
    red: 'bg-white border-2 border-slate-100',
    dark: 'bg-slate-900'
  };
  return (
    <Link to={to} aria-label={title} className="group relative h-[320px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
       <div className={`absolute inset-0 bg-gradient-to-br ${themes[color] || themes.blue}`}></div>
       <div className="relative h-full p-8 flex flex-col justify-between text-white">
          <div>
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">{icon}</div>
             <h3 className={`text-2xl font-bold mb-2 ${color === 'red' ? 'text-slate-900' : ''}`}>{title} {badge && <span className="bg-yellow-500 text-slate-900 text-[10px] px-2 py-0.5 rounded ml-2 align-middle">{badge}</span>}</h3>
             <p className={`text-sm leading-relaxed opacity-90 ${color === 'red' ? 'text-slate-600' : 'text-white/80'}`}>{desc}</p>
          </div>
          <div className={`flex items-center gap-3 font-bold group-hover:gap-5 transition-all ${color === 'red' ? 'text-red-600' : color === 'dark' ? 'text-yellow-500' : ''}`}>Hemen Başla <ArrowRight size={20} /></div>
       </div>
    </Link>
  );
};

const ReferenceTeaserCard = ({ name, desc, image, badge }: any) => (
  <Link to="/references" aria-label={name} className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row items-center h-full">
     <div className="w-full sm:w-48 aspect-square overflow-hidden shrink-0">
        <img src={image} alt={name} width="192" height="192" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
     </div>
     <div className="p-8">
        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">{badge}</span>
        <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tighter">{name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{desc}</p>
     </div>
  </Link>
);

const BrandLogoTeaser = ({ name, acronym, logo }: any) => (
  <Link to="/references" aria-label={name} className="group bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 active:scale-95 relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-transparent transition-all duration-500"></div>
     
     <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 shadow-inner group-hover:bg-white transition-all duration-500 relative z-10 p-2 overflow-hidden">
        {logo ? (
          <img src={logo} alt={name} width="80" height="80" loading="lazy" className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
        ) : (
          <span className="text-3xl font-black tracking-tighter group-hover:text-blue-600 transition-colors">{acronym}</span>
        )}
     </div>
     
     <span className="text-[11px] font-black text-slate-400 text-center uppercase tracking-[0.15em] group-hover:text-blue-600 transition-colors leading-tight relative z-10">
       {name}
     </span>
  </Link>
);
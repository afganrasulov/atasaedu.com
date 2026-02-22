import React, { useEffect, useState } from 'react';
import { MobileHeader } from '../components/MobileHeader';
import { MobileQuickActions } from '../components/MobileQuickActions';
import { 
  ShieldCheck, 
  Briefcase, 
  ChevronRight,
  MessageCircle,
  Phone,
  Star,
  Clock,
  Building2,
  BadgeCheck,
  Youtube,
  Zap,
  ArrowRight,
  PlaneLanding,
  Banknote,
  MapPin,
  Globe,
  FileX,
  History,
  Flag,
  Plus,
  Files,
  CreditCard,
  PlaneTakeoff,
  GraduationCap,
  Plane,
  Scale,
  BookOpen,
  Landmark,
  ShieldAlert,
  Calculator,
  Wallet,
  Gavel,
  FileText,
  Bike
} from 'lucide-react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { COMPANY_INFO } from '../../constants';

// Sayı Sayan Bileşen
const CountingNumber = ({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value % 1 !== 0) return latest.toFixed(1); 
    return Math.round(latest);
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, { 
      duration: duration,
      ease: "easeOut"
    });
    
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v.toString()));
    
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, duration, rounded]);

  return <span>{displayValue}{suffix}</span>;
};

const ALL_APPS = [
  { id: 'wa-groups', label: 'Gruplar', icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/whatsapp-groups', color: 'bg-emerald-500' },
  { id: 'deport', label: 'Deport', icon: <PlaneLanding className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/deport-calculator', color: 'bg-orange-500' },
  { id: 'penalty', label: 'Vize Ceza', icon: <Banknote className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/visa-penalty', color: 'bg-rose-500' },
  { id: 'query', label: 'Bölge Sor', icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/evaluation/closed-areas-for-foreigners', color: 'bg-blue-500' },
  { id: 'passport', label: 'Pasaport', icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/passport-index', color: 'bg-amber-500' },
  { id: 'ret', label: 'İkamet Ret', icon: <FileX className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/residency-rejection', color: 'bg-red-600' },
  { id: 'uzatma', label: 'Uzatma', icon: <History className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/residency-renewal', color: 'bg-teal-500' },
  { id: 'vatandasi', label: 'Vatandaş', icon: <Flag className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/citizenship', color: 'bg-indigo-600' },
  { id: 'visa-regime', label: 'Vize Rejimi', icon: <Plane className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/visa-regime', color: 'bg-sky-500' },
  { id: 'directorate', label: 'Göç İdaresi', icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/directorate-finder', color: 'bg-blue-600' },
  { id: 'student-age', label: 'Okul Yaşı', icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/student-age-checker', color: 'bg-orange-600' },
  { id: 'abroad-days', label: 'Gün Say', icon: <PlaneTakeoff className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/abroad-days', color: 'bg-blue-400' },
  { id: 'pass-check', label: 'Pas. Kont.', icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/passport-check', color: 'bg-slate-600' },
  { id: 'dual-cit', label: 'Çifte Vat.', icon: <Files className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/dual-citizenship', color: 'bg-violet-600' },
  { id: 'wage', label: 'Maaş/Prim', icon: <Wallet className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/wage-calculator', color: 'bg-green-600' },
  { id: 'tahdit', label: 'Kod Sorgu', icon: <ShieldAlert className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/tahdit-codes', color: 'bg-red-700' },
  { id: 'work-renewal', label: 'Çalışma Uz.', icon: <History className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/work-permit-renewal', color: 'bg-cyan-600' },
  { id: 'long-term', label: 'Süresiz İk.', icon: <Calculator className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/long-term-calculator', color: 'bg-purple-600' },
  { id: 'courier', label: 'Kurye Test', icon: <Bike className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/profession/couriers', color: 'bg-yellow-500' },
  { id: 'embassy', label: 'Konsolosluk', icon: <Landmark className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/embassy-finder', color: 'bg-zinc-700' },
  { id: 'res-type', label: 'İzin Türü', icon: <Scale className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/residency-type-query', color: 'bg-slate-500' },
  { id: 'law', label: 'Madde Bul', icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/law-search', color: 'bg-blue-800' },
  { id: 'rejection', label: 'İş Ret', icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/rejection-guide', color: 'bg-orange-700' },
  { id: 'profession', label: 'Meslek Sor', icon: <Gavel className="w-6 h-6 sm:w-8 sm:h-8" />, to: '/apps/profession-checker', color: 'bg-red-800' },
];

const MAIN_SERVICES = [
  { id: 'residency', title: 'İkamet İzni', desc: 'Kısa Dönem Başvurusu', icon: <Clock size={26} />, to: '/accommodation-permit/short-term' },
  { id: 'work', title: 'Çalışma İzni', desc: 'Süreli Çalışma Başvurusu', icon: <Briefcase size={26} />, to: '/work-permit/temporary' },
  { id: 'citizenship_exceptional', title: 'İstisnai Vatandaşlık', desc: 'İstihdam ile Vatandaşlık', icon: <Star size={26} className="text-red-500" />, to: '/citizenship/exceptional' },
];

export const HomePageMobile: React.FC = () => {
  return (
    <div className="pb-32 min-h-screen bg-[#F2F2F7]">
      <MobileHeader />
      
      {/* 1. Hero Alanı */}
      <div className="relative overflow-hidden bg-slate-900 pt-8 pb-10 px-5 rounded-b-[3rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] z-10">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none mix-blend-screen"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
               <span className="text-3xl animate-bounce">👋</span>
               <h2 className="text-3xl font-black text-white tracking-tight">Hoş Geldiniz</h2>
            </div>
            
            <p className="text-slate-300 text-base leading-relaxed mb-10 max-w-[95%] font-medium">
              Türkiye'deki yasal işlemleriniz için dijital araçlarımızı kullanın veya randevu alın.
            </p>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-3 sm:gap-x-4 mt-4 max-w-4xl mx-auto">
               {ALL_APPS.map((app) => (
                 <Link 
                   key={app.id} 
                   to={app.to} 
                   className="flex flex-col items-center gap-2.5 active:scale-90 transition-transform"
                 >
                    <div className={`w-[62px] h-[62px] sm:w-[76px] sm:h-[76px] ${app.color} rounded-[1.4rem] flex items-center justify-center text-white shadow-xl border border-white/10 relative overflow-hidden group`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 to-transparent opacity-10"></div>
                        {app.icon}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-100 uppercase tracking-tighter text-center leading-tight">
                        {app.label}
                    </span>
                 </Link>
               ))}
               
               <Link 
                 to="/apps" 
                 className="flex flex-col items-center gap-2.5 active:scale-90 transition-transform"
               >
                  <div className="w-[62px] h-[62px] sm:w-[76px] sm:h-[76px] bg-slate-800 rounded-[1.4rem] flex items-center justify-center text-slate-400 border border-slate-700 shadow-xl">
                      <Plus className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={3} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-tighter text-center">Tümü</span>
               </Link>
            </div>
         </div>
      </div>

      <div className="px-4 -mt-6 relative z-20 space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-slate-300/50 border border-white flex items-center justify-around overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-transparent to-red-50/10 pointer-events-none"></div>

          <div className="flex flex-col items-center text-center relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-2 border border-red-100 shadow-sm">
                <Youtube size={28} />
             </div>
             <span className="text-xl font-black text-slate-900 leading-none tracking-tighter">
                <CountingNumber value={100} suffix="K+" />
             </span>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Takipçi</span>
          </div>

          <div className="h-10 w-px bg-slate-100"></div>

          <div className="flex flex-col items-center text-center relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center mb-2 border border-yellow-100 shadow-sm">
                <Star size={28} fill="currentColor" />
             </div>
             <span className="text-xl font-black text-slate-900 leading-none tracking-tighter">
                <CountingNumber value={4.9} />
             </span>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Puan</span>
          </div>

          <div className="h-10 w-px bg-slate-100"></div>

          <div className="flex flex-col items-center text-center relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 border border-blue-100 shadow-sm">
                <BadgeCheck size={28} />
             </div>
             <span className="text-xl font-black text-slate-900 leading-none tracking-tighter">
                <CountingNumber value={10} suffix="+" />
             </span>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Yıl Tecrübe</span>
          </div>
        </motion.div>

        <div className="bg-white rounded-[2.5rem] p-3 shadow-xl shadow-slate-200/50 border border-white">
           <div>
              {MAIN_SERVICES.map((service, idx) => (
                <Link 
                  key={service.id}
                  to={service.to} 
                  className={`flex items-center gap-5 p-5 active:bg-blue-50 transition-all rounded-[1.5rem] group ${idx !== MAIN_SERVICES.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-active:scale-90 transition-transform">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-lg mb-0.5">{service.title}</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{service.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                     <ChevronRight size={18} />
                  </div>
                </Link>
              ))}
              
              <Link to="/services" className="block text-center py-4 text-blue-600 font-bold text-sm border-t border-slate-50 mt-1 hover:bg-blue-50 rounded-b-[2rem] transition-colors">
                 Tüm Hizmetleri Görüntüle
              </Link>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-600/30 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-500/20">
                 <Building2 size={12} /> Kurumsal Çözümler
              </div>
              <h3 className="text-2xl font-black mb-2 leading-tight">İşletmenizi Atasa İle Güvenceye Alın</h3>
              <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                 50+ personel istihdamı, toplu çalışma izni ve yatırımcı vatandaşlığı süreçlerinde şirketlere özel danışmanlık sağlıyoruz.
              </p>
              <a 
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="w-full bg-white text-slate-900 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                 Kurumsal Destek Hattı <ArrowRight size={16} />
              </a>
           </div>
        </div>

        <div className="pt-2">
           <MobileQuickActions />
        </div>

        <div className="flex flex-col items-center gap-3 py-6 opacity-60">
           <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
              <BadgeCheck size={16} className="text-blue-500" /> RESMİ GOOGLE PARTNER
           </div>
        </div>

      </div>
    </div>
  );
};


import React, { useState, useMemo } from 'react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  MapPin, PlaneLanding, ShieldAlert, Banknote, Calendar, 
  Wallet, ShieldCheck, Landmark, Gavel, FileCheck, 
  ChevronRight, Calculator, History, Scale, BookOpen, 
  Bike, Navigation, Search, X, Star, Building2, Files, CreditCard, Globe, PlaneTakeoff, Flag, GraduationCap,
  FileText, Plane, FileX, MessageCircle
} from 'lucide-react';

const ALL_APPS = [
  { 
    id: 'whatsapp_groups', 
    label: 'WhatsApp Grupları', 
    desc: 'Topluluk Yardımlaşma',
    icon: <MessageCircle size={22} />, 
    link: '/apps/whatsapp-groups',
    color: 'bg-emerald-600 text-white border-emerald-500'
  },
  { 
    id: 'residency_rejection', 
    label: 'İkamet Ret Rehberi', 
    desc: 'Ret Nedenleri Analizi',
    icon: <FileX size={22} />, 
    link: '/apps/residency-rejection',
    color: 'bg-red-600 text-white border-red-500'
  },
  { 
    id: 'visa_regime', 
    label: 'Vize Rejimi Sorgu', 
    desc: 'Pasaport ve Muafiyet',
    icon: <Plane size={22} />, 
    link: '/apps/visa-regime',
    color: 'bg-blue-600 text-white border-blue-500'
  },
  { 
    id: 'directorate_finder', 
    label: 'Göç İdaresi Rehberi', 
    desc: 'Kurum Konum ve Bilgi',
    icon: <Building2 size={22} />, 
    link: '/apps/directorate-finder',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  },
  { 
    id: 'student_age', 
    label: 'Eğitim Yaş Uygunluğu', 
    desc: 'Okul Seviyesi Sorgula',
    icon: <GraduationCap size={22} />, 
    link: '/apps/student-age-checker',
    color: 'bg-orange-50 text-orange-600 border-orange-100'
  },
  { 
    id: 'citizenship_exceptional', 
    label: 'İstisnai Vatandaşlık', 
    desc: 'İstihdam Yoluyla',
    icon: <Star size={22} />, 
    link: '/citizenship/exceptional',
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  },
  { 
    id: 'citizenship_invest', 
    label: 'Yatırımcı Vatandaşlık', 
    desc: 'Gayrimenkul ve Mevduat',
    icon: <Flag size={22} />, 
    link: '/citizenship',
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  },
  { 
    id: 'abroad_days', 
    label: 'Gün Hesaplayıcı', 
    desc: 'Yurt Dışı Süre Takibi',
    icon: <PlaneTakeoff size={22} />, 
    link: '/apps/abroad-days',
    color: 'bg-sky-50 text-sky-600 border-sky-100'
  },
  { 
    id: 'passport_index', 
    label: 'Pasaport Endeksi', 
    desc: 'Küresel Güç Sorgula',
    icon: <Globe size={22} />, 
    link: '/apps/passport-index',
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  },
  { 
    id: 'passport_check', 
    label: 'Pasaport Süre', 
    desc: 'Uygunluk Kontrolü',
    icon: <CreditCard size={22} />, 
    link: '/apps/passport-check',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  },
  { 
    id: 'dual_cit', 
    label: 'Çifte Vatandaşlık', 
    desc: 'Uygunluk Kontrolü',
    icon: <Files size={22} />, 
    link: '/apps/dual-citizenship',
    color: 'bg-violet-50 text-violet-600 border-violet-100'
  },
  { 
    id: 'reviews', 
    label: 'Müşteri Yorumları', 
    desc: 'Google Deneyimleri',
    icon: <Star size={22} fill="currentColor" />, 
    link: '/reviews',
    color: 'bg-yellow-50 text-yellow-500 border-yellow-100'
  },
  { 
    id: 'references', 
    label: 'Referanslar', 
    desc: 'Kurumsal İş Ortakları',
    icon: <Building2 size={22} />, 
    link: '/references',
    color: 'bg-slate-50 text-slate-600 border-slate-200'
  },
  { 
    id: 'deport', 
    label: 'Deport Hesapla', 
    desc: 'Giriş Yasağı Sorgula',
    icon: <PlaneLanding size={22} />, 
    link: '/apps/deport-calculator',
    color: 'bg-red-50 text-red-600 border-red-100'
  },
  { 
    id: 'tahdit', 
    label: 'Kod Sorgula', 
    desc: 'Tahdit Kodları (Ç-G)',
    icon: <ShieldAlert size={22} />, 
    link: '/apps/tahdit-codes',
    color: 'bg-red-50 text-red-700 border-red-100'
  },
  { 
    id: 'penalty', 
    label: 'Vize Cezası', 
    desc: 'İhlal Hesaplama',
    icon: <Banknote size={22} />, 
    link: '/apps/visa-penalty',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  },
  { 
    id: 'wage', 
    label: 'Prim Hesapla', 
    desc: 'SGK ve Sigorta Maliyeti',
    icon: <Wallet size={22} />, 
    link: '/apps/wage-calculator',
    color: 'bg-blue-50 text-blue-700 border-blue-100'
  },
  { 
    id: 'res_renewal', 
    label: 'İkamet Uzatma', 
    desc: 'Kalan Gün Sayısı',
    icon: <Calendar size={22} />, 
    link: '/apps/residency-renewal',
    color: 'bg-teal-50 text-teal-600 border-teal-100'
  },
  { 
    id: 'work_renewal', 
    label: 'Çalışma Uzatma', 
    desc: 'Başvuru Zamanı',
    icon: <History size={22} />, 
    link: '/apps/work-permit-renewal',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
  },
  { 
    id: 'long_term', 
    label: 'Süresiz İkamet', 
    desc: '8 Yıl Hesaplama',
    icon: <Calculator size={22} />, 
    link: '/apps/long-term-calculator',
    color: 'bg-purple-50 text-purple-600 border-purple-100'
  },
  { 
    id: 'query', 
    label: 'Mahalle Kontrol', 
    desc: 'Kapalı Bölge Sorgu',
    icon: <MapPin size={22} />, 
    link: '/evaluation/closed-areas-for-foreigners',
    color: 'bg-blue-50 text-blue-500 border-blue-100'
  },
  { 
    id: 'turkmen', 
    label: 'Türkmen Vize', 
    desc: 'Barkod Kontrolü',
    icon: <ShieldCheck size={22} />, 
    link: '/apps/turkmenistan-visa',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  },
  { 
    id: 'courier', 
    label: 'Kurye Testi', 
    desc: 'Yasal Çalışma',
    icon: <Bike size={22} />, 
    link: '/profession/couriers',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  },
  { 
    id: 'embassy', 
    label: 'Konsolosluk', 
    desc: 'Adres ve Telefon',
    icon: <Landmark size={22} />, 
    link: '/apps/embassy-finder',
    color: 'bg-zinc-100 text-zinc-700 border-zinc-200'
  },
  { 
    id: 'res_type', 
    label: 'İkamet Çeşitleri', 
    desc: 'Türünü Öğren',
    icon: <Scale size={22} />, 
    link: '/apps/residency-type-query',
    color: 'bg-slate-100 text-slate-700 border-slate-200'
  },
  {
    id: 'law',
    label: 'İkamet Tür Sorgu',
    desc: 'Madde Sorgulama',
    icon: <BookOpen size={22} />,
    link: '/apps/law-search',
    color: 'bg-blue-50 text-blue-800 border-blue-100'
  },
  {
    id: 'rejection',
    label: 'Çalışma İzni Ret',
    desc: 'Red Kodu Analizi',
    icon: <FileText size={22} />,
    link: '/apps/rejection-guide',
    color: 'bg-orange-50 text-orange-700 border-orange-100'
  },
  {
    id: 'profession',
    label: 'Yasaklı Meslek',
    desc: 'Uygunluk Kontrolü',
    icon: <Gavel size={22} />,
    link: '/apps/profession-checker',
    color: 'bg-red-50 text-red-800 border-red-200'
  },
  {
    id: 'branches',
    label: 'Şube Bul',
    desc: 'En Yakın Ofis',
    icon: <Navigation size={22} />,
    link: '/branches',
    color: 'bg-slate-100 text-slate-800 border-slate-200'
  }
];

export const MobileQuickActions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = useMemo(() => {
    const term = searchTerm.toLocaleLowerCase('tr-TR').trim();
    if (!term) return ALL_APPS;
    return ALL_APPS.filter(app => 
      app.label.toLocaleLowerCase('tr-TR').includes(term) || 
      app.desc.toLocaleLowerCase('tr-TR').includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2 px-2">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Pratik Araçlar</h3>
        </div>

        <div className="px-1 relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder="Hızlı araç bul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white rounded-2xl py-3.5 pl-11 pr-10 text-sm font-bold text-slate-900 border border-slate-200 shadow-sm outline-none focus:border-blue-500 transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-slate-400"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 pb-4 px-0.5">
        {filteredApps.map((app) => (
          <Link 
            key={app.id} 
            to={app.link}
            className="bg-white p-4 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col justify-between h-[125px] active:scale-95 active:bg-slate-50 transition-all relative overflow-hidden group"
          >
            <div className={`w-11 h-11 ${app.color} rounded-2xl flex items-center justify-center border shadow-sm z-10 transition-transform group-hover:scale-105`}>
              {app.icon}
            </div>

            <div className="z-10 mt-3 pr-4">
              <span className="block font-black text-slate-900 text-[13px] leading-tight mb-1 truncate">
                {app.label}
              </span>
              <span className="block text-[10px] font-bold text-slate-400 truncate uppercase tracking-tighter">
                {app.desc}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 text-slate-200 group-active:text-blue-500 transition-colors">
               <ChevronRight size={18} strokeWidth={3} />
            </div>
          </Link>
        ))}
      </div>
      
      {filteredApps.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 mx-1">
          <p className="text-slate-400 font-bold text-sm italic">Sonuç bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

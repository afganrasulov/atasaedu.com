
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Calculator, Bike, ChevronRight, Grid, MapPin, 
  Clock, ShieldAlert, Gavel, History, Calendar, Scale, 
  BookOpen, Landmark, ShieldCheck, Wallet, Banknote,
  PlaneLanding, CalendarCheck, Navigation, Youtube, Zap, Globe, X, Star, Heart, Flag,
  Files, CreditCard, PlaneTakeoff, GraduationCap, Building2, Plane, FileX, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'atasa_app_usage_stats';

export const AppsHubPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usageStats, setUsageStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedStats = localStorage.getItem(STORAGE_KEY);
    if (savedStats) {
      try {
        setUsageStats(JSON.parse(savedStats));
      } catch (e) {
        console.error("Usage stats parse error", e);
      }
    }
  }, []);

  const trackAppClick = (id: string) => {
    const newStats = {
      ...usageStats,
      [id]: (usageStats[id] || 0) + 1
    };
    setUsageStats(newStats);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
  };

  const apps = [
    {
      id: 'whatsapp-groups',
      title: 'WhatsApp Gruplarımız',
      desc: 'İş fırsatları, konaklama ve topluluk yardımlaşma gruplarımıza anında katılın.',
      icon: <MessageCircle size={32} />,
      link: '/apps/whatsapp-groups',
      color: 'emerald'
    },
    {
      id: 'residency-rejection',
      title: 'İkamet & Vize Ret Rehberi',
      desc: 'İkamet ve vize başvurularınızdaki ret nedenlerini ve yasal maddeleri (15, 32, 33 vb.) analiz edin.',
      icon: <FileX size={32} />,
      link: '/apps/residency-rejection',
      color: 'red'
    },
    {
      id: 'visa-regime',
      title: 'Vize Giriş Vize Suresi',
      desc: 'Pasaportunuza göre Türkiye vize kurallarını, e-vize ve muafiyet sürelerini anında sorgulayın.',
      icon: <Plane size={32} />,
      link: '/apps/visa-regime',
      color: 'blue'
    },
    {
      id: 'directorate-finder',
      title: 'Göç İdaresi Rehberi',
      desc: 'Türkiye genelindeki müdürlüklerin adres, çalışma saatleri ve navigasyon bilgilerine anında ulaşın.',
      icon: <Building2 size={32} />,
      link: '/apps/directorate-finder',
      color: 'blue'
    },
    {
      id: 'student-age',
      title: 'Eğitim Yaş Uygunluğu',
      desc: 'Doğum tarihinize göre Türkiye\'de hangi öğrenci ikameti seviyelerine başvurabileceğinizi anında test edin.',
      icon: <GraduationCap size={32} />,
      link: '/apps/student-age-checker',
      color: 'orange'
    },
    {
      id: 'abroad-days',
      title: 'Gün Hesaplayıcı',
      desc: 'Yurt dışıda geçirdiğiniz toplam gün sayısını ve oturum izni uygunluğunuzu anında hesaplayın.',
      icon: <PlaneTakeoff size={32} />,
      link: '/apps/abroad-days',
      color: 'blue'
    },
    {
      id: 'passport-index',
      title: 'Dünya Pasaport Endeksi',
      desc: 'Pasaportunuzun küresel gücünü ve vizesiz gidebileceğiniz ülkeleri anlık olarak sorgulayın.',
      icon: <Globe size={32} />,
      link: '/apps/passport-index',
      color: 'yellow'
    },
    {
      id: 'passport-check',
      title: 'Pasaport Süre Kontrolü',
      desc: 'İkamet veya çalışma izni başvurunuz için pasaport sürenizin yeterli olup olmadığını anında öğrenin.',
      icon: <CreditCard size={32} />,
      link: '/apps/passport-check',
      color: 'blue'
    },
    {
      id: 'dual-citizenship',
      title: 'Çifte Vatandaşlık',
      desc: 'Ülkenizin çifte vatandaşlığa izin verip vermediğini ve yasal kısıtlamaları anında kontrol edin.',
      icon: <Files size={32} />,
      link: '/apps/dual-citizenship',
      color: 'indigo'
    },
    {
      id: 'citizenship-invest',
      title: 'Yatırımcı Vatandaşlık',
      desc: '2025 güncel yatırım limitleri ve yöntemleri ile Türk pasaportu alma rehberi ve şartları.',
      icon: <Flag size={32} />,
      link: '/citizenship',
      color: 'red'
    },
    {
      id: 'citizenship-exceptional',
      title: 'İstihdamla Vatandaşlık',
      desc: '50 kişilik istihdam oluşturan yabancılar için 5901 Sayılı Kanun Madde 12 kapsamında vatandaşlık rehberi.',
      icon: <Star size={32} />,
      link: '/citizenship/exceptional',
      color: 'red'
    },
    {
      id: 'google-reviews',
      title: 'Google Yorumları',
      desc: 'Müşterilerimizin gerçek deneyimlerini okuyun veya hizmetlerimiz hakkında kendi yorumunuzu hemen bırakın.',
      icon: <Star size={32} fill="currentColor" />,
      link: '/reviews',
      color: 'yellow'
    },
    {
      id: 'deport-calculator',
      title: 'Deport Süresi Hesapla',
      desc: 'Türkiye\'ye giriş yasağınızın (deport) ne zaman biteceğini ve yasal geri dönüş yollarını anında analiz edin.',
      icon: <PlaneLanding size={32} />,
      link: '/apps/deport-calculator',
      color: 'orange'
    },
    {
      id: 'tahdit-codes',
      title: 'Tahdit Kodu Sorgulama',
      desc: 'Ç, G, N, O ve V serisi tahdit kodlarının anlamlarını ve yasal giriş yasağı sürelerini anında sorgulayın.',
      icon: <ShieldAlert size={32} />,
      link: '/apps/tahdit-codes',
      color: 'red'
    },
    {
      id: 'visa-penalty',
      title: 'Vize Cezası Hesaplama',
      desc: 'İkamet veya vize süresini ihlal eden yabancılar için 2025 güncel ceza tutarlarını anında hesaplayın.',
      icon: <Banknote size={32} />,
      link: '/apps/visa-penalty',
      color: 'red'
    },
    {
      id: 'query',
      title: 'Kapalı Mahalle Sorgulama',
      desc: 'Taşınacağınız veya ikamet edeceğiniz mahallenin yabancı ikametine kapalı olup olmadığını anında öğrenin.',
      icon: <MapPin size={32} />,
      link: '/evaluation/closed-areas-for-foreigners',
      color: 'blue'
    },
    {
      id: 'turkmen-visa',
      title: 'Türkmenistan Vize Kontrol',
      desc: 'Pasaportunuzdaki vize türüne ve barkodunuza göre Türkiye\'de ikamet izni alıp alamayacağınızı anında test edin.',
      icon: <ShieldCheck size={32} />,
      link: '/apps/turkmenistan-visa',
      color: 'emerald'
    },
    {
      id: 'wage-calculator',
      title: 'Yabancı Sigorta Primi Hesaplama',
      desc: '2026 güncel asgari ücretlerine göre; unvana bağlı brüt, net maaş ve SGK prim maliyetlerini anında hesaplayın.',
      icon: <Wallet size={32} />,
      link: '/apps/wage-calculator',
      color: 'blue'
    },
    {
      id: 'residency-renewal',
      title: 'İkamet Uzatma Zamanı',
      desc: 'Oturum izninizin bitmesine ne kadar kaldı? 60 gün kuralına göre e-ikamet başvuru tarihinizi ve kalan gününüzü anında öğrenin.',
      icon: <Calendar size={32} />,
      link: '/apps/residency-renewal',
      color: 'indigo'
    },
    {
      id: 'work-permit-renewal',
      title: 'Çalışma Uzatma Zamanı',
      desc: 'Çalışma izninizin bitişine ne kadar kaldı? 60 gün kuralına göre başvuru pencerenizi ve kalan gününüzü anında öğrenin.',
      icon: <History size={32} />,
      link: '/apps/work-permit-renewal',
      color: 'blue'
    },
    {
      id: 'long-term',
      title: 'Uzun Dönem İkamet Hesaplama',
      desc: 'Süresiz oturum izni için gerekli gün, yıl ve gelir şartlarını sağlayıp sağlamadığınızı test edin.',
      icon: <Calculator size={32} />,
      link: '/apps/long-term-calculator',
      color: 'purple'
    },
    {
      id: 'courier',
      title: 'Kurye Uygunluk Testi',
      desc: 'Yabancı kurye olarak çalışmak için en uygun yasal yöntemi (P1 Belgesi, Şirket vb.) 3 soruda bulun.',
      icon: <Bike size={32} />,
      link: '/profession/couriers',
      color: 'yellow'
    },
    {
      id: 'rejection-guide',
      title: 'Çalışma İzni Red Sebebi',
      desc: 'Çalışma izni başvurunuz neden reddedildi? Madde 9A, 9B gibi kodların gizli anlamlarını ve çözüm yollarını keşfedin.',
      icon: <ShieldAlert size={32} />,
      link: '/apps/rejection-guide',
      color: 'orange'
    },
    {
      id: 'profession-checker',
      title: 'Yasaklı Meslekler',
      desc: 'Hangi meslekler yabancılara yasaklı? 30+ mesleği kanun maddeleriyle sorgulayın.',
      icon: <Gavel size={32} />,
      link: '/apps/profession-checker',
      color: 'red'
    },
    {
      id: 'residency-type-query',
      title: 'İkamet İzni Çeşitleri',
      desc: 'Hangi ikamet izni size uygun? Madde 31 kapsamındaki tüm kısa dönem seçeneklerini ve şartlarını anında sorgulayın.',
      icon: <Scale size={32} />,
      link: '/apps/residency-type-query',
      color: 'slate'
    },
    {
      id: 'law-search',
      title: 'İkamet İzni Tür Sorgulama',
      desc: 'İkamet izni türlerini ve gerekçelerini (Madde 30 ve 31) alfabetik olarak veya kelime bazlı anında sorgulayın.',
      icon: <BookOpen size={32} />,
      link: '/apps/law-search',
      color: 'blue'
    },
    {
      id: 'embassy-finder',
      title: 'Konsolosluk Rehberi',
      desc: 'Türkiye\'deki yabancı büyükelçilik ve konsoloslukların güncel adres, telefon ve harita bilgilerine anında ulaşın.',
      icon: <Landmark size={32} />,
      link: '/apps/embassy-finder',
      color: 'blue'
    },
    {
      id: 'branches',
      title: 'Şube Bul',
      desc: 'Size en yakın Atasa Danışmanlık ofisini bulun, adres ve iletişim bilgilerine anında ulaşın.',
      icon: <Navigation size={32} />,
      link: '/branches',
      color: 'slate'
    },
    {
      id: 'appointment',
      title: 'Randevu Al',
      desc: 'İşlemlerinizi başlatmak için uzman danışmanlarımızdan online randevu talep edin.',
      icon: <CalendarCheck size={32} />,
      link: '/appointment',
      color: 'emerald'
    },
    {
      id: 'news',
      title: 'Haber Merkezi',
      desc: 'Türkiye\'deki göç politikaları ve yasal düzenlemeler hakkındaki en güncel haberleri takip edin.',
      icon: <Youtube size={32} />,
      link: '/blog/shorts',
      color: 'pink'
    }
  ];

  const maxUsage = useMemo(() => {
    const values = Object.values(usageStats) as number[];
    return values.length > 0 ? Math.max(...values) : 0;
  }, [usageStats]);

  const filteredAndSortedApps = useMemo(() => {
    const term = searchTerm.toLocaleLowerCase('tr-TR').trim();
    const filtered = apps.filter(app => 
      !term || 
      app.title.toLocaleLowerCase('tr-TR').includes(term) || 
      app.desc.toLocaleLowerCase('tr-TR').includes(term)
    );

    return [...filtered].sort((a, b) => {
      const usageA = usageStats[a.id] || 0;
      const usageB = usageStats[b.id] || 0;
      if (usageB !== usageA) return usageB - usageA;
      return 0;
    });
  }, [searchTerm, usageStats]);

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-blue-600 mb-4 md:mb-8 shadow-xl border border-slate-100 transform -rotate-3">
           <Grid size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Atasa Uygulamalar</h1>
        <p className="text-slate-600 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          İkamet ve çalışma süreçlerinizi profesyonelce yönetmeniz için geliştirdiğimiz <span className="text-blue-600 font-bold">dijital araçlar</span>.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-2xl mb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={24} />
            <input 
              type="text"
              placeholder="Uygulama ara... (Örn: Ret, Vize, Pasaport)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-14 pr-12 text-lg font-bold text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-5 p-1 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedApps.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedApps.map((app) => {
                const clickCount = usageStats[app.id] || 0;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={app.id}
                  >
                    <Link 
                      to={app.link}
                      onClick={() => trackAppClick(app.id)}
                      className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-${app.color}-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
                      {clickCount > 2 && (
                        <div className="absolute top-6 right-6 z-20 flex items-center gap-1 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                          <Heart size={10} fill="currentColor" /> SIK KULLANILAN
                        </div>
                      )}
                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg bg-gradient-to-br ${getColorClasses(app.color)} group-hover:scale-110 transition-transform duration-500`}>
                          {app.icon}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                          {app.title}
                        </h3>
                        <p className="text-slate-500 mb-10 leading-relaxed font-medium flex-grow">
                          {app.desc}
                        </p>
                        <div className="flex items-center gap-2 font-black text-slate-900 group-hover:gap-4 transition-all text-sm uppercase tracking-widest mt-auto">
                          Uygulamayı Aç <ChevronRight size={18} className="text-blue-600" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">Eşleşen Uygulama Bulunamadı</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">"{searchTerm}" araması için sonuç bulunamadı.</p>
              <button onClick={() => setSearchTerm('')} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">Aramayı Temizle</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function getColorClasses(color: string) {
  switch (color) {
    case 'emerald': return 'from-emerald-500 to-emerald-700';
    case 'blue': return 'from-blue-500 to-blue-700';
    case 'indigo': return 'from-indigo-500 to-indigo-700';
    case 'purple': return 'from-purple-500 to-purple-700';
    case 'yellow': return 'from-yellow-400 to-yellow-600';
    case 'orange': return 'from-orange-500 to-orange-700';
    case 'red': return 'from-red-500 to-red-700';
    case 'slate': return 'from-slate-600 to-slate-800';
    case 'pink': return 'from-pink-500 to-pink-600';
    default: return 'from-slate-500 to-slate-700';
  }
}

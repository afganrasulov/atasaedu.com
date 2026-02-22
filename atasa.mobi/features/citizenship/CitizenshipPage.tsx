
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Gem, Building2, Landmark, Users, 
  Clock, ArrowRight, MessageCircle, Info, Sparkles, 
  CheckCircle2, Globe, Banknote, Briefcase, ChevronRight,
  Gavel, FileText, BadgeCheck, Star, Award
} from 'lucide-react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

// AI SEO Data
const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Yatırım Yoluyla Türk Vatandaşlığı Danışmanlığı",
  "description": "2025 güncel mevzuatına göre 400.000 USD gayrimenkul veya 500.000 USD mevduat ile Türk Vatandaşlığı kazanma süreci.",
  "provider": {
    "@type": "Organization",
    "name": "Atasa Danışmanlık",
    "url": "https://atasa.tr"
  },
  "serviceType": "Legal Consultancy",
  "areaServed": "TR",
  "offers": {
    "@type": "Offer",
    "description": "Premium Citizenship Consultancy"
  }
};

const INVESTMENT_METHODS = [
  {
    id: 'real-estate',
    title: 'Gayrimenkul Yatırımı',
    amount: '400.000 USD',
    condition: '3 Yıl Satmama Şerhi',
    icon: <Building2 size={32} />,
    color: 'from-amber-400 to-amber-600',
    details: 'En az 400 bin Amerikan Doları değerinde taşınmaz satın alınması ve tapu siciline 3 yıl satılmama şerhi konulması gerekir.'
  },
  {
    id: 'bank-deposit',
    title: 'Banka Mevduatı',
    amount: '500.000 USD',
    condition: '3 Yıl Tutma Şartı',
    icon: <Landmark size={32} />,
    color: 'from-blue-500 to-blue-700',
    details: '500 bin Amerikan Doları veya karşılığı döviz tutarının Türkiye’de faaliyet gösteren bankalarda 3 yıl tutulması gerekir.'
  },
  {
    id: 'capital-investment',
    title: 'Sabit Sermaye',
    amount: '500.000 USD',
    condition: 'Bakanlık Onaylı',
    icon: <Briefcase size={32} />,
    color: 'from-slate-600 to-slate-800',
    details: 'Sanayi ve Teknoloji Bakanlığı tarafından tespit edilen 500 bin USD tutarında sabit sermaye yatırımı yapılması.'
  },
  {
    id: 'employment',
    title: 'İstihdam Oluşturma',
    amount: '50 Kişi',
    condition: 'Türk Personel',
    icon: <Users size={32} />,
    color: 'from-emerald-500 to-emerald-700',
    details: 'En az 50 kişilik istihdam oluşturduğu Çalışma ve Sosyal Güvenlik Bakanlığınca tespit edilenlere verilir.'
  }
];

export const CitizenshipPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [selectedMethod, setSelectedMethod] = useState(INVESTMENT_METHODS[0]);

  useEffect(() => {
    document.title = "Yatırım Yoluyla Türk Vatandaşlığı 2025 | Atasa Danışmanlık";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(SCHEMA_DATA);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      
      {/* 1. Hero Section: Prestige & Luxury */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 scale-110" 
            alt="Luxury Istanbul" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-8"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Privileged Global Access</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter"
            >
              Prestijli Bir <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">
                Gelecek Kurun.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-12"
            >
              Dünyanın merkezinde, Türkiye'de yatırım yaparak <span className="text-white border-b-2 border-amber-500/50">3 ile 6 ay içinde</span> Avrupa ve Asya kapılarını açan pasaportunuza kavuşun.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button 
                onClick={openWhatsApp}
                className="bg-amber-500 text-black px-12 py-6 rounded-2xl font-black text-xl hover:bg-amber-400 transition-all shadow-[0_20px_50px_-10px_rgba(245,158,11,0.3)] active:scale-95 flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} fill="currentColor" />
                Özel Danışmanlık Al
              </button>
              <Link 
                to="/appointment"
                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                Randevu Oluştur
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Key Stats: Why Turkey? */}
      <section className="py-24 border-y border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <StatBox label="İŞLEM SÜRESİ" value="3-6 Ay" desc="Hızlı ve Kesin Sonuç" />
            <StatBox label="VİZESİZ ÜLKE" value="110+" desc="Küresel Hareketlilik" />
            <StatBox label="AİLE KAPSAMI" value="Tam" desc="Eş ve 18 Yaş Altı Çocuklar" />
            <StatBox label="ÇİFTE PASAPORT" value="Var" desc="Kendi Vatandaşlığınızı Koruyun" />
          </div>
        </div>
      </section>

      {/* 3. Investment Methods: Professional Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Yatırım Seçenekleri</h2>
             <p className="text-slate-500 text-xl max-w-2xl mx-auto">Size en uygun finansal stratejiyi belirleyelim.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Interactive Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {INVESTMENT_METHODS.map((m) => (
                 <button 
                  key={m.id}
                  onClick={() => setSelectedMethod(m)}
                  className={`p-8 rounded-[2.5rem] border-2 text-left transition-all duration-500 group relative overflow-hidden ${
                    selectedMethod.id === m.id 
                    ? 'bg-white border-white text-black shadow-2xl scale-105 z-10' 
                    : 'bg-white/5 border-white/10 text-white hover:border-amber-500/50'
                  }`}
                 >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br ${m.color} text-white`}>
                      {m.icon}
                    </div>
                    <h3 className="text-xl font-black mb-2">{m.title}</h3>
                    <p className={`text-2xl font-black ${selectedMethod.id === m.id ? 'text-blue-600' : 'text-amber-500'}`}>{m.amount}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                      <Clock size={12} /> {m.condition}
                    </div>
                 </button>
               ))}
            </div>

            {/* Right: Focused Detail */}
            <div className="bg-gradient-to-br from-slate-900 to-black rounded-[3.5rem] p-10 md:p-16 border border-white/10 shadow-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                  {selectedMethod.icon}
               </div>
               
               <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedMethod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                     <span className="text-amber-500 font-black text-xs uppercase tracking-widest mb-4 block">SEÇİLİ YÖNTEM DETAYI</span>
                     <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{selectedMethod.title}</h3>
                     <p className="text-slate-400 text-xl leading-relaxed mb-10">
                        {selectedMethod.details}
                     </p>
                     
                     <div className="space-y-6 mb-12">
                        <BenefitItem text="E-Devlet üzerinden anlık takip imkanı" />
                        <BenefitItem text="Yatırımın tespiti ve uygunluk belgesi süreci" />
                        <BenefitItem text="Tapu/Banka bloke işlemlerinde teknik destek" />
                        <BenefitItem text="Tam gizlilik ve hukuki koruma" />
                     </div>

                     <button 
                       onClick={openWhatsApp}
                       className="w-full bg-white text-black py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-amber-500 transition-colors group"
                     >
                       Şimdi Başlayalım <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                     </button>
                  </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Roadmap: High Authority Content */}
      <section className="py-32 bg-white text-black rounded-[4rem]">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6">Süreç Nasıl İlerliyor?</h2>
                 <p className="text-slate-500 text-xl font-medium">Bürokratik yükü biz üstleniyoruz, siz sadece yeni hayatınıza odaklanın.</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <BadgeCheck size={28} />
                 </div>
                 <div>
                    <div className="font-black text-sm uppercase tracking-wider">RESMİ YETKİ</div>
                    <div className="text-slate-500 text-xs">Atasa Lisanslı Danışmanlık Kuruluşudur</div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ProcessStep 
                num="01" 
                title="Yatırım ve Analiz" 
                desc="Bütçenize en uygun taşınmazı veya fonu birlikte seçiyoruz. Ekspertiz ve yasal uygunluk testlerini yapıyoruz." 
              />
              <ProcessStep 
                num="02" 
                title="Uygunluk Belgesi" 
                desc="İlgili Bakanlıklardan (Sanayi, Tapu, BDDK vb.) yatırımın uygunluğuna dair resmi belgenizi 15 gün içinde alıyoruz." 
              />
              <ProcessStep 
                num="03" 
                title="Vatandaşlık Kararı" 
                desc="Gerekli güvenlik incelemeleri sonrası Cumhurbaşkanı Kararı ile T.C. Kimlik Kartınız ve Pasaportunuz teslim ediliyor." 
              />
           </div>
        </div>
      </section>

      {/* 5. Trust & Authority: FAQ for HNWI */}
      <section className="py-32 pb-48">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Merak Edilenler</h2>
              <p className="text-slate-500">Yatırımcıların en çok sorduğu teknik sorular</p>
           </div>

           <div className="space-y-4">
              <FAQItem 
                q="Yatırım yaptığım taşınmazı 3 yıl sonra satabilir miyim?" 
                a="Evet. Vatandaşlık aldıktan sonra taşınmazı 3 yıl elinizde tutma şartı vardır. Bu süre dolduğunda mülkü satabilir, yatırımınızı kârla realize edebilirsiniz ve vatandaşlığınız korunmaya devam eder." 
              />
              <FAQItem 
                q="Ailem de benimle birlikte vatandaşlık alabilir mi?" 
                a="Kesinlikle. Tek bir yatırım ile siz, eşiniz ve 18 yaşından küçük tüm çocuklarınız aynı anda Türk Vatandaşı olursunuz." 
              />
              <FAQItem 
                q="Türkiye'de yaşama zorunluluğu var mı?" 
                a="Hayır. Yatırım yoluyla vatandaşlık kazananlar için Türkiye'de fiziksel olarak bulunma veya ikamet etme zorunluluğu yoktur." 
              />
              <FAQItem 
                q="Süreç boyunca Türkiye'ye gelmem gerekiyor mu?" 
                a="Şirketimize vereceğiniz özel yetki (vekaletname) ile tüm süreci uzaktan yönetebiliyoruz. Sadece kimlik tesliminde veya isterseniz mülk seçiminde gelmeniz yeterlidir." 
              />
           </div>
        </div>
      </section>

    </div>
  );
};

const StatBox = ({ label, value, desc }: any) => (
  <div className="text-center group">
    <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-3 group-hover:text-amber-500 transition-colors">{label}</div>
    <div className="text-4xl md:text-5xl font-black text-white mb-2">{value}</div>
    <div className="text-slate-400 text-sm font-medium">{desc}</div>
  </div>
);

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 text-slate-300 font-medium">
     <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
        <CheckCircle2 size={14} className="text-amber-500" />
     </div>
     <span>{text}</span>
  </div>
);

const ProcessStep = ({ num, title, desc }: any) => (
  <div className="relative group">
    <div className="text-7xl font-black text-slate-100 group-hover:text-amber-500/10 transition-colors mb-6">{num}</div>
    <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
    <div className="w-12 h-1 bg-blue-600 mt-6 group-hover:w-full transition-all duration-500"></div>
  </div>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-3xl transition-all duration-300 ${open ? 'bg-white/5 border-white/20' : 'border-white/10 hover:border-white/20'}`}>
       <button 
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex justify-between items-center"
       >
          <span className="text-lg font-bold pr-4">{q}</span>
          <ChevronRight className={`text-amber-500 transition-transform ${open ? 'rotate-90' : ''}`} />
       </button>
       <AnimatePresence>
         {open && (
           <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
           >
              <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                 {a}
              </div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

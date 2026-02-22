
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Briefcase, Flag, GraduationCap, FileText, 
  ShieldCheck, Phone, ArrowRight, UserCheck, Heart, 
  Globe, Bike, Gavel, FileCheck, Infinity, Clock as ClockIcon, Shield, Star
} from 'lucide-react';
import { SEO } from '../common/SEO';

// Hizmet Kategorileri ve Verileri
const CATEGORIES = [
  { id: 'all', label: 'Tüm Hizmetler' },
  { id: 'residency', label: 'İkamet (Oturum) İzni' },
  { id: 'work', label: 'Çalışma İzni' },
  { id: 'citizenship', label: 'Vatandaşlık' },
  { id: 'consultancy', label: 'Genel Danışmanlık' },
];

const SERVICES_DATA = [
  // İkamet İzinleri
  {
    id: 'res-short',
    category: 'residency',
    title: 'Kısa Dönem İkamet İzni',
    desc: 'Turistik, ticari veya taşınmaz amaçlı 1-2 yıllık oturum izinleri.',
    icon: <ClockIcon />,
    link: '/accommodation-permit/short-term',
    color: 'blue'
  },
  {
    id: 'res-family',
    category: 'residency',
    title: 'Aile İkamet İzni',
    desc: 'Eşiniz ve çocuklarınızla Türkiye\'de güvenle yaşamanız için.',
    icon: <Heart />,
    link: '/accommodation-permit/family',
    color: 'green'
  },
  {
    id: 'res-student',
    category: 'residency',
    title: 'Öğrenci İkamet İzni',
    desc: 'Üniversite eğitimi alan yabancı öğrenciler için zorunlu izin.',
    icon: <GraduationCap />,
    link: '/student-permit',
    color: 'orange'
  },
  {
    id: 'res-long',
    category: 'residency',
    title: 'Uzun Dönem (Süresiz) İkamet',
    desc: '8 yılını dolduranlar için süresiz oturum hakkı.',
    icon: <Home />,
    link: '/accommodation-permit/long-term',
    color: 'purple'
  },
  
  // Çalışma İzinleri
  {
    id: 'work-temp',
    category: 'work',
    title: 'Süreli Çalışma İzni',
    desc: 'Bir işverene bağlı olarak sigortalı çalışma izni.',
    icon: <Briefcase />,
    link: '/work-permit/temporary',
    color: 'blue'
  },
  {
    id: 'work-courier',
    category: 'work',
    title: 'Kurye Çalışma İzni',
    desc: 'Motosikletli kuryeler için P1 belgesi ve çalışma izni.',
    icon: <Bike />,
    link: '/profession/couriers',
    color: 'yellow'
  },
  {
    id: 'work-independent',
    category: 'work',
    title: 'Bağımsız Çalışma İzni',
    desc: 'Kendi işini kuran ve şirket sahibi olan yabancılar için.',
    icon: <UserCheck />,
    link: '/work-permit/independent',
    color: 'orange'
  },
  {
    id: 'work-long',
    category: 'work',
    title: 'Süresiz Çalışma İzni',
    desc: '8 yıl yasal çalışma veya uzun dönem ikameti olanlar için.',
    icon: <Infinity />,
    link: '/work-permit/long-term',
    color: 'purple'
  },
  {
    id: 'work-turquoise',
    category: 'work',
    title: 'Turkuaz Kart',
    desc: 'Nitelikli işgücü ve yatırımcılar için özel statü.',
    icon: <Globe />,
    link: '/work-permit/turkuaz',
    color: 'teal'
  },

  // Vatandaşlık
  {
    id: 'cit-invest',
    category: 'citizenship',
    title: 'Yatırım Yoluyla Vatandaşlık',
    desc: 'Gayrimenkul yatırımı veya banka mevduatı ile T.C. vatandaşlığı.',
    icon: <Flag />,
    link: '/citizenship',
    color: 'red'
  },
  {
    id: 'cit-exceptional',
    category: 'citizenship',
    title: 'İstisnai Türk Vatandaşlığı',
    desc: '50 kişilik istihdam oluşturan yatırımcılar için özel vatandaşlık yolu.',
    icon: <Star />,
    link: '/citizenship/exceptional',
    color: 'red'
  },
  {
    id: 'cit-general',
    category: 'citizenship',
    title: 'Genel Yolla Vatandaşlık',
    desc: '5 yıl çalışma veya ikamet süresini dolduranlar için.',
    icon: <ShieldCheck />,
    link: '/appointment',
    color: 'red'
  },

  // Danışmanlık & Diğer
  {
    id: 'cons-deport',
    category: 'consultancy',
    title: 'Deport (Sınır Dışı) İşlemleri',
    desc: 'Giriş yasağı kaldırma ve kod sorgulama hizmetleri.',
    icon: <Gavel />,
    link: '/apps/deport-calculator',
    color: 'slate'
  },
  {
    id: 'cons-codes',
    category: 'consultancy',
    title: 'Tahdit Kodu İşlemleri',
    desc: 'Ç, G, V serisi tahdit kodlarının analizi ve kaldırılması.',
    icon: <Shield />,
    link: '/apps/tahdit-codes',
    color: 'red'
  },
  {
    id: 'cons-insurance',
    category: 'consultancy',
    title: 'Yabancı Sağlık Sigortası',
    desc: 'İkamet izni başvuruları için zorunlu sigorta işlemleri.',
    icon: <FileCheck />,
    link: '/appointment',
    color: 'green'
  },
];

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      
      <SEO 
        title="Hizmetlerimiz"
        description="İkamet izni, çalışma izni, vatandaşlık ve diğer danışmanlık hizmetlerimiz hakkında detaylı bilgi alın. Profesyonel çözümler."
      />

      {/* 1. Header Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-bold mb-6">
            <ShieldCheck size={20} />
            <span>Profesyonel Danışmanlık</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Size Nasıl Yardımcı <br className="hidden md:block"/> Olabiliriz?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Türkiye'deki yaşamınızı kolaylaştırmak için tüm resmi işlemleri tek bir çatı altında topladık. 
            Aşağıdan ihtiyacınız olan hizmeti seçin, gerisini bize bırakın.
          </p>
        </div>
      </div>

      {/* 2. Kategori Seçimi */}
      <div className="container mx-auto px-4 mb-12 sticky top-24 z-30">
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-slate-200 overflow-x-auto">
          <div className="flex space-x-2 md:justify-center min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-4 rounded-xl text-sm md:text-base font-bold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md transform scale-105'
                    : 'bg-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Hizmet Kartları Grid */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={service.id}
              >
                <Link 
                  to={service.link}
                  className="group block h-full bg-white rounded-3xl p-8 border-2 border-transparent hover:border-blue-500 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${service.color}-50 rounded-bl-[100px] transition-transform group-hover:scale-150`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl shadow-lg bg-gradient-to-br ${getColorClasses(service.color)}`}>
                      {React.cloneElement(service.icon as React.ReactElement<any>, { size: 32 })}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 flex-grow">
                      {service.desc}
                    </p>

                    <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:gap-4 transition-all">
                      Detaylı Bilgi Al <ArrowRight className="text-blue-600" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4. Nasıl Çalışır? */}
      <div className="bg-white py-20 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">İşlemler Nasıl İlerliyor?</h2>
            <p className="text-slate-500 text-lg">Sadece 3 adımda işlemlerinizi başlatıyoruz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black">1</div>
              <h3 className="text-xl font-bold mb-3">Randevu Alın</h3>
              <p className="text-slate-600">Online formu doldurun veya WhatsApp üzerinden bize yazın.</p>
            </div>
            <div className="text-center p-6 relative">
              <div className="hidden md:block absolute top-10 -left-1/2 w-full h-0.5 bg-slate-100 -z-10"></div>
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black">2</div>
              <h3 className="text-xl font-bold mb-3">Dosyanızı Hazırlayalım</h3>
              <p className="text-slate-600">Uzmanlarımız evraklarınızı inceler ve eksiksiz başvuru dosyası hazırlar.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black">3</div>
              <h3 className="text-xl font-bold mb-3">Sonucu Bekleyin</h3>
              <p className="text-slate-600">Başvurunuzu yapar, takibini sağlar ve sonucunu size bildiririz.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Alt CTA */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Hala Emin Değil Misiniz?</h2>
            <p className="text-lg text-slate-300 mb-10">
              Durumunuz karışık olabilir veya hangi izne başvuracağınızı bilmiyor olabilirsiniz. 
              Ücretsiz ön bilgi almak için hemen bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link 
                to="/appointment" 
                className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <FileText /> Hemen Randevu Oluştur
              </Link>
              <a 
                href="tel:+908503086998"
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Phone /> Bizi Arayın
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper function for dynamic Tailwind classes
function getColorClasses(color: string) {
  switch (color) {
    case 'blue': return 'from-blue-500 to-blue-700';
    case 'green': return 'from-green-500 to-green-700';
    case 'orange': return 'from-orange-500 to-orange-700';
    case 'purple': return 'from-purple-500 to-purple-700';
    case 'red': return 'from-red-500 to-red-700';
    case 'teal': return 'from-teal-500 to-teal-700';
    case 'yellow': return 'from-yellow-500 to-yellow-700';
    case 'slate': return 'from-slate-600 to-slate-800';
    default: return 'from-slate-500 to-slate-700';
  }
}

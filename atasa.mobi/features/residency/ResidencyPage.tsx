
import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  FileText, CheckCircle, HelpCircle, ChevronDown, ChevronUp, 
  Clock, Users, GraduationCap, Home, Calculator, AlertTriangle, 
  ArrowRight, ShieldCheck 
} from 'lucide-react';

export const ResidencyPage: React.FC = () => {
  const scrollToTypes = () => {
    const element = document.getElementById('types');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-6 md:pt-40 pb-20">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-white relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6 border border-blue-100">
              <ShieldCheck size={16} />
              <span>Güncel 2025 Mevzuatı</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              İkamet İzni <br/>
              <span className="text-blue-600">Başvuru Rehberi</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Kısa dönem, aile, öğrenci veya uzun dönem fark etmez; Türkiye'de yasal ikamet için tüm süreçleri profesyonel ekibimizle yönetiyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/appointment" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Başvuru Yap <ArrowRight size={20} />
              </Link>
              <button 
                onClick={scrollToTypes}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                İzin Türlerini İncele
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pain Points Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Aşağıdaki durumlardan biriyle karşılaştınız mı?</h2>
            <ul className="space-y-4">
              {[
                "İkamet izni sürecinde zorlanıyor musunuz?",
                "Belgeleri nasıl toplayacağınızı bilmiyor musunuz?",
                "İkamet izni için adımları mı arıyorsunuz?",
                "Başvurunuzda sorun mu yaşadınız?",
                "Profesyonel destek mi arıyorsunuz?"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] group">
              <img 
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Danışmanlık" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Endişelenmeyin</h3>
                  <p className="opacity-90">Size yardımcı olmak için buradayız. Süreci kolaylaştırıyoruz.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permit Types Grid */}
      <div id="types" className="container mx-auto px-4 mb-20 scroll-mt-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">İkamet İzni Türleri</h2>
          <p className="text-slate-600">Durumunuza en uygun izin türünü seçin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PermitCard 
            title="Kısa Dönem İkamet İzni"
            desc="Turizm, ticari bağlantı veya taşınmaz amaçlı kalışlar için 1-2 yıllık izinler."
            icon={<Clock size={32} />}
            color="blue"
            link="/accommodation-permit/short-term"
          />
          <PermitCard 
            title="Uzun Dönem İkamet İzni"
            desc="Türkiye'de kesintisiz 8 yıl ikamet edenler için süresiz oturum hakkı."
            icon={<Home size={32} />}
            color="purple"
            link="/accommodation-permit/long-term"
          />
          <PermitCard 
            title="Öğrenci İkamet İzni"
            desc="Türkiye'de ön lisans, lisans veya yüksek lisans eğitimi görecekler için."
            icon={<GraduationCap size={32} />}
            color="orange"
            link="/student-permit"
          />
          <PermitCard 
            title="Aile İkamet İzni"
            desc="Eş ve çocuklar için aile birliğini korumayı amaçlayan izin türü."
            icon={<Users size={32} />}
            color="green"
            link="/accommodation-permit/family"
          />
        </div>
      </div>

      {/* Tools / Calculators Section */}
      <div className="bg-slate-900 text-white py-20 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Hesaplama ve Sorgulama Hizmetleri</h2>
            <p className="text-slate-400">Karmaşık hesaplamaları sizin için basitleştirdik</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ToolStep step="01" title="Ceza Parası Hesaplama" desc="Vize ihlali durumunda ödenecek tutarı öğrenin." />
            <ToolStep step="02" title="Tahdit Kodu Sorgulama" desc="Giriş yasağı kodunuz var mı kontrol edelim." />
            <ToolStep step="03" title="Deport Süresi Hesapla" desc="Türkiye'ye giriş yasağınızın ne zaman biteceğini öğrenin." />
            <ToolStep step="04" title="Fiyat Teklifi Al" desc="İşlemleriniz için size özel fiyat teklifi alın." />
          </div>
          
          <div className="text-center mt-12">
             <Link to="/appointment" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition-colors">
               Bu işlemler için randevu alın <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 max-w-4xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-slate-600">İkamet izni süreçleriyle ilgili en çok merak edilenler</p>
        </div>

        <div className="space-y-4">
          <AccordionItem 
            question="Çocuğum için aile ikamet izni almak zorunlu mu?" 
            answer="Eğer çocuğunuz şartları taşıyorsa, kendinizin veya eşinizin yabancı çocuğu veya 18 yaşını doldurmuş olsa bile bağımlı çocuğu için aile ikamet izni başvurusu yapabilirsiniz. Şartları sağlamıyorsanız, amaçlarına uygun başka bir ikamet izni için başvurabilirsiniz." 
          />
          <AccordionItem 
            question="İkamet izni başvurularında maddi gelir belgesi olarak ne sunabilirim?" 
            answer="Banka hesap dökümü, emekli aylığı belgesi, şirket yazısı, kira geliri kontratı veya tapu, uluslararası kredi kartı gibi belgeler maddi gelir kanıtı olarak sunulabilir. Yurt dışından alınan belgelerin noter onaylı Türkçe tercümesi gereklidir." 
          />
          <AccordionItem 
            question="İkamet izni başvuruları ne kadar sürede sonuçlanır?" 
            answer="Başvurular genellikle dosyanın tam olarak teslim edilmesinden itibaren 90 gün içinde sonuçlandırılır. Süreç uzarsa tarafınıza bilgi verilir." 
          />
          <AccordionItem 
            question="Başvuruyu benim adıma başkası yapabilir mi?" 
            answer="Başvurunun yabancı tarafından bizzat yapılması esastır. Ancak yasal temsilci veya vekâletnameye sahip avukat aracılığıyla da başvuru yapılabilir." 
          />
          <AccordionItem 
            question="Süresi bitmiş pasaport ile başvuru yapabilir miyim?" 
            answer="Hayır, talep edilen ikamet süresinden en az 60 gün daha uzun geçerli bir pasaportunuz olmalıdır. Ancak e-İkamet sisteminde başvuru yaparken yeni pasaportun süresini belirtebilirsiniz, randevu gününde yeni pasaport hazır olmalıdır." 
          />
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl shadow-blue-300/50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Profesyonel Başvuru Desteği Alın</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
            Hatalı başvurularla zaman ve para kaybetmeyin. Uzman ekibimizle dosyanızı eksiksiz hazırlayalım.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/appointment" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg">
              Hemen Randevu Al
            </Link>
            <Link to="/contact" className="bg-blue-700 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-800 transition-colors shadow-lg border border-blue-600">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

// --- Sub Components ---

const PermitCard: React.FC<{title: string, desc: string, icon: React.ReactNode, color: string, link: string}> = ({ title, desc, icon, color, link }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    green: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white',
    orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">{desc}</p>
      <Link to={link} className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
        Detaylı Bilgi <ArrowRight size={16} />
      </Link>
    </div>
  );
};

const ToolStep: React.FC<{step: string, title: string, desc: string}> = ({ step, title, desc }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
    <div className="text-4xl font-black text-white/20 mb-4">{step}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{desc}</p>
  </div>
);

const AccordionItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-800 pr-4">{question}</span>
        {isOpen ? <ChevronUp className="text-slate-400 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
      </button>
      <div 
        className={`px-6 text-slate-600 text-sm leading-relaxed bg-slate-50 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-6 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}
      >
        {answer}
      </div>
    </div>
  );
};

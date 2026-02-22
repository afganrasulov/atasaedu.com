
import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  FileText, CheckCircle, ChevronDown, ChevronUp, 
  GraduationCap, AlertTriangle, ArrowRight, Shield, List, 
  Info, School
} from 'lucide-react';

export const StudentResidencyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-24 pb-20 bg-slate-50">
      
      {/* Header / Hero */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-orange-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <GraduationCap size={16} />
              <span>İkamet İzni Rehberi</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Öğrenci İkamet İzni
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Türkiye'de ön lisans, lisans, yüksek lisans veya doktora eğitimi alacak yabancı uyruklu öğrenciler için zorunlu ikamet izni türüdür.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Önemli Bilgiler */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Info className="text-orange-600" /> Önemli Bilgiler
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Öğrenci ikamet izni başvurusu, <strong className="text-slate-800">e-İkamet</strong> sistemi üzerinden yapılır. 
                  Başvuru formunu doldurduktan sonra, gerekli belgelerle birlikte üniversitenizin Uluslararası Öğrenci Birimi'ne (veya Göç İdaresi'nin belirttiği birime) 
                  başvuru tarihinden itibaren en geç <strong>10 gün</strong> içinde teslim etmeniz gerekebilir.
                </p>
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-900">
                   <strong>Dikkat:</strong> Açık öğretim veya uzaktan eğitim programları için öğrenci ikamet izni <u>verilmemektedir</u>.
                </div>
              </div>
            </section>

            {/* Gerekli Belgeler */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-orange-600" /> Gerekli Belgeler
              </h2>
              <ul className="space-y-4">
                {[
                  { title: "Başvuru Formu", desc: "e-İkamet sisteminden alınan ıslak imzalı form." },
                  { title: "Pasaport", desc: "Aslı ve işlem gören sayfaların fotokopisi." },
                  { title: "Öğrenci Belgesi", desc: "Aktif öğrencilik durumunu gösteren güncel e-imzalı/ıslak imzalı belge." },
                  { title: "Biyometrik Fotoğraf", desc: "Son 6 ay içinde çekilmiş, beyaz fonlu 4 adet fotoğraf." },
                  { title: "Sağlık Sigortası", desc: "Geçerli sağlık sigortası (GSS veya Özel Sigorta)." },
                  { title: "Adres Belgesi", desc: "Yurt belgesi, noter onaylı kira kontratı veya tapu." },
                  { title: "Kart Bedeli Makbuzu", desc: "Değerli kağıt bedelinin ödendiğine dair dekont." },
                  { title: "UETS Belgesi", desc: "e-Devlet üzerinden alınan UETS (Ulusal Elektronik Tebligat Sistemi) belgesi." }
                ].map((doc, idx) => (
                  <li key={idx} className="flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                    <CheckCircle className="text-orange-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-sm text-slate-600">{doc.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Süreç ve Kurallar */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Dikkat Edilmesi Gerekenler</h2>
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                       <School size={20} className="text-blue-500" /> Okul/Bölüm Değişikliği
                    </h3>
                    <p className="text-sm text-slate-600">
                       Aynı il içinde fakülte/bölüm değişikliğinde 20 gün içinde bildirim yapılmalıdır. Farklı bir ile geçiş yapıldığında ise 10 gün içinde o ilin Göç İdaresi'ne başvuru yapılmalıdır.
                    </p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                       <AlertTriangle size={20} className="text-red-500" /> Kayıt Dondurma
                    </h3>
                    <p className="text-sm text-slate-600">
                       Kayıt donduran öğrencilerin ikamet izinleri iptal edilir. Eğitime geri dönüldüğünde tekrar başvuru yapılması gerekir.
                    </p>
                 </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Sıkça Sorulan Sorular</h2>
              <div className="space-y-3">
                <AccordionItem 
                  question="Mezun olduktan sonra ne yapmalıyım?" 
                  answer="Mezuniyet tarihinden itibaren öğrenci ikamet izniniz sona erer. 10 gün içinde, eğer kalmaya devam edecekseniz 'Kısa Dönem İkamet İzni'ne (mezuniyet sonrası 6 ay içinde başvurulabilir) geçiş yapmalısınız." 
                />
                <AccordionItem 
                  question="Çalışma izni alabilir miyim?" 
                  answer="Öğrenci ikamet izni tek başına çalışma hakkı vermez. Ancak, ön lisans ve lisans öğrencileri ilk yıldan sonra çalışma izni başvurusu yapabilirler (kısmi süreli). Yüksek lisans ve doktora öğrencileri için süre kısıtlaması yoktur." 
                />
                <AccordionItem 
                  question="Adresim değişirse ne yapmalıyım?" 
                  answer="Adres veya iletişim bilgileriniz değiştiğinde 20 iş günü içinde İl Göç İdaresi Müdürlüğü'ne ve Nüfus Müdürlüğü'ne bildirim yapmanız zorunludur." 
                />
                <AccordionItem 
                  question="Harç ödeyecek miyim?" 
                  answer="Öğrenci ikamet izni başvurularında 'İkamet İzni Harcı' ödenmez, muaftır. Sadece 'Kart Bedeli' ödenir." 
                />
              </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* CTA Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24">
              <Shield className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-bold mb-2">Öğrenci Danışmanlığı</h3>
              <p className="text-slate-400 text-sm mb-6">
                Üniversite kayıt işlemleri, denklik ve ikamet başvurularınızda profesyonel destek alın.
              </p>
              <Link 
                to="/appointment" 
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-colors mb-3"
              >
                Randevu Al
              </Link>
              <div className="text-xs text-slate-500 mt-4">
                 * Atasa Edu üzerinden eğitim danışmanlığı hizmetimiz de mevcuttur.
              </div>
            </div>

            {/* Other Permit Types Links */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4">Diğer İzin Türleri</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/accommodation-permit/short-term" className="flex items-center justify-between text-slate-600 hover:text-orange-600 p-3 hover:bg-orange-50 rounded-xl transition-all">
                    <span>Kısa Dönem İkamet</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/accommodation-permit/long-term" className="flex items-center justify-between text-slate-600 hover:text-orange-600 p-3 hover:bg-orange-50 rounded-xl transition-all">
                    <span>Uzun Dönem İkamet</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/accommodation-permit/family" className="flex items-center justify-between text-slate-600 hover:text-orange-600 p-3 hover:bg-orange-50 rounded-xl transition-all">
                    <span>Aile İkamet İzni</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

const AccordionItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100 transition-colors"
      >
        <span className="font-bold text-slate-800 text-sm pr-4">{question}</span>
        {isOpen ? <ChevronUp className="text-slate-400 shrink-0" size={18} /> : <ChevronDown className="text-slate-400 shrink-0" size={18} />}
      </button>
      <div 
        className={`px-5 text-slate-600 text-sm leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}
      >
        {answer}
      </div>
    </div>
  );
};

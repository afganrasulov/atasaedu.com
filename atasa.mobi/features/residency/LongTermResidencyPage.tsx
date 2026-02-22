
import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  FileText, CheckCircle, ChevronDown, ChevronUp, 
  Home, AlertTriangle, ArrowRight, Shield, List, 
  Info, Clock
} from 'lucide-react';

export const LongTermResidencyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-24 pb-20 bg-slate-50">
      
      {/* Header / Hero */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-purple-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <Home size={16} />
              <span>İkamet İzni Rehberi</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Uzun Dönem İkamet İzni
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Türkiye'yi eviniz haline getirmenin en kalıcı yolu. Kesintisiz 8 yıl ikamet eden yabancılar için süresiz oturum hakkı sağlayan izin türüdür.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Nedir? */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Info className="text-purple-600" /> Nedir?
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Uzun Dönem İkamet İzni, 6458 sayılı Kanun kapsamında, Türkiye'de kesintisiz olarak belirli bir süre yaşamış yabancılara verilen ve <strong>süresiz</strong> oturum hakkı tanıyan bir izin türüdür.
                </p>
                <p>
                  Halk arasında "süresiz ikamet" olarak da bilinir. Bu izin türü sahipleri, askerlik yükümlülüğü, seçme-seçilme hakkı ve kamu görevine girme hakkı haricinde Türk vatandaşlarına tanınan haklardan büyük ölçüde yararlanır.
                </p>
              </div>
            </section>

            {/* Başvuru Şartları */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <List className="text-purple-600" /> Başvuru Şartları
              </h2>
              <div className="space-y-4">
                {[
                  "Kesintisiz 8 yıl ikamet etmiş olmak (Öğrenci ikametlerinin yarısı sayılır).",
                  "Son 3 yıl içinde sosyal yardım almamış olmak.",
                  "Kendisi ve varsa ailesinin geçimini sağlayacak yeterli ve düzenli gelire sahip olmak.",
                  "Geçerli bir sağlık sigortasına sahip olmak.",
                  "Kamu düzeni veya kamu güvenliği açısından tehdit oluşturmamak."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <CheckCircle className="text-purple-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-sm text-blue-800">
                <Info className="shrink-0" size={20} />
                <p>
                  <strong>Not:</strong> Mülteci, şartlı mülteci ve ikincil koruma statüsü sahipleri ile insani ikamet izni sahiplerine ve geçici koruma sağlananlara uzun dönem ikamet izni verilmemektedir.
                </p>
              </div>
            </section>

            {/* Gerekli Belgeler */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-purple-600" /> Gerekli Belgeler
              </h2>
              <ul className="space-y-4">
                {[
                  { title: "Başvuru Formu", desc: "e-İkamet sistemi üzerinden doldurulmuş form." },
                  { title: "Pasaport", desc: "Pasaportun aslı ve fotokopisi." },
                  { title: "Biyometrik Fotoğraf", desc: "Son 6 ay içinde çekilmiş 4 adet fotoğraf." },
                  { title: "Önceki İkamet İzinleri", desc: "Önceki ikamet izin belgelerinin asılları fotokopileri." },
                  { title: "Gün Sayım Belgesi", desc: "İl Göç İdaresi'nden veya e-Devlet'ten alınan, 8 yıllık süreyi gösteren belge." },
                  { title: "Gelir Belgesi", desc: "Son 6 aylık düzenli geliri gösteren onaylı belge." },
                  { title: "Adli Sicil Kaydı", desc: "Kendi ülkesinden ve Türkiye'den alınmış adli sicil belgeleri." },
                  { title: "Sosyal Yardım Belgesi", desc: "Son 3 yılda sosyal yardım alınmadığına dair SYDV'den alınan yazı." },
                  { title: "Sağlık Sigortası", desc: "Geçerli sağlık sigortası poliçesi." }
                ].map((doc, idx) => (
                  <li key={idx} className="flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                    <div className="bg-purple-50 p-2 rounded-lg text-purple-600 mt-1">
                       <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-sm text-slate-600">{doc.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Haklar */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Sağladığı Haklar</h2>
              <div className="grid md:grid-cols-2 gap-4">
                 {[
                   "Süresiz oturum hakkı (Kart 5 yılda bir yenilenir).",
                   "Askerlik yükümlülüğünden muafiyet.",
                   "Sigorta haklarının korunması.",
                   "Türk vatandaşlarıyla eşit seyahat, çalışma ve yatırım hakkı (özel kanunlar saklı kalmak kaydıyla)."
                 ].map((right, i) => (
                   <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mb-3"></div>
                      <p className="text-slate-700 font-medium">{right}</p>
                   </div>
                 ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Sıkça Sorulan Sorular</h2>
              <div className="space-y-3">
                <AccordionItem 
                  question="Öğrenci ikamet izni süreleri 8 yıla dahil edilir mi?" 
                  answer="Öğrenci ikamet izni sürelerinin yarısı, diğer ikamet izinlerinin ise tamamı 8 yıllık sürenin hesabında dikkate alınır." 
                />
                <AccordionItem 
                  question="Uzun dönem ikamet izni iptal edilir mi?" 
                  answer="Türkiye dışında kesintisiz olarak 1 yıldan fazla bulunulması (eğitim ve sağlık hariç) veya kamu düzeni/güvenliği tehdidi durumunda iptal edilebilir." 
                />
                <AccordionItem 
                  question="Çalışma iznim var, uzun dönem ikamete başvurabilir miyim?" 
                  answer="Evet, çalışma izni süreleri de ikamet süresi hesabında tam olarak sayılır. 8 yılı doldurduğunuzda başvurabilirsiniz." 
                />
                <AccordionItem 
                  question="Başvurum ne kadar sürede sonuçlanır?" 
                  answer="Dosya yoğunluğuna göre değişmekle birlikte, uzun dönem başvuruları detaylı inceleme gerektirdiği için ortalama 3-6 ay sürebilir." 
                />
              </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* CTA Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24">
              <Shield className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-2">Profesyonel Destek</h3>
              <p className="text-slate-400 text-sm mb-6">
                Gün sayımı hesaplaması ve dosya hazırlığı karmaşık olabilir. Hata yapmamak için uzmanlarımızdan destek alın.
              </p>
              <Link 
                to="/appointment" 
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-colors mb-3"
              >
                Randevu Al
              </Link>
              <Link 
                to="/contact" 
                className="block w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors border border-white/10"
              >
                Bize Ulaşın
              </Link>
            </div>

            {/* Other Permit Types Links */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4">Diğer İzin Türleri</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/accommodation-permit/short-term" className="flex items-center justify-between text-slate-600 hover:text-purple-600 p-3 hover:bg-purple-50 rounded-xl transition-all">
                    <span>Kısa Dönem İkamet</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/accommodation-permit/family" className="flex items-center justify-between text-slate-600 hover:text-purple-600 p-3 hover:bg-purple-50 rounded-xl transition-all">
                    <span>Aile İkamet İzni</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/student-permit" className="flex items-center justify-between text-slate-600 hover:text-purple-600 p-3 hover:bg-purple-50 rounded-xl transition-all">
                    <span>Öğrenci İkamet İzni</span>
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

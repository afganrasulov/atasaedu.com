
import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  FileText, CheckCircle, ChevronDown, ChevronUp, 
  Clock, AlertTriangle, ArrowRight, Shield, List, 
  CalendarCheck, Info
} from 'lucide-react';

export const ShortTermResidencyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-24 pb-20 bg-slate-50">
      
      {/* Header / Hero */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <Clock size={16} />
              <span>İkamet İzni Rehberi</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Kısa Dönem İkamet İzni
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Türkiye'de vize süresinden daha uzun kalmak isteyen yabancılar için en yaygın oturum izni türüdür. 
              Turizm, ticari bağlantı veya taşınmaz mal sahipliği gibi amaçlarla 2 yıla kadar düzenlenebilir.
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
                <Info className="text-blue-600" /> Nedir?
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Kısa dönem ikamet izni, 6458 sayılı Yabancılar ve Uluslararası Koruma Kanunu kapsamında düzenlenen, 
                  yabancıların Türkiye'de belirli bir süre yasal olarak kalmasını sağlayan belgedir.
                </p>
                <p>
                  Ülkeye girişte verilen vize veya vize muafiyetinin tanıdığı süreden (genellikle 90 gün) daha fazla 
                  kalacak olan yabancıların, kalış amacına uygun olarak bu izne başvurması zorunludur. Kural olarak 
                  her defasında <strong>en fazla 2 yıllık</strong> süreyle düzenlenebilir.
                </p>
              </div>
            </section>

            {/* Kimler Başvurabilir? */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <List className="text-blue-600" /> Kimler Başvurabilir?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Turizm amaçlı kalacaklar",
                  "Türkiye'de taşınmaz malı bulunanlar",
                  "Ticari bağlantı veya iş kuracaklar",
                  "Bilimsel araştırma yapacaklar",
                  "Hizmet içi eğitim programlarına katılacaklar",
                  "Tedavi görecekler (kamu sağlığına tehdit oluşturmayan)",
                  "Adli veya idari makamların talebiyle kalması gerekenler",
                  "Aile ikamet izni şartlarını kaybedip kısa döneme geçenler",
                  "Türkçe öğrenim kurslarına katılacaklar",
                  "Kamu kurumları aracılığıyla eğitim/staj yapacaklar",
                  "Öğrenci değişim programlarına (Erasmus vb.) katılanlar",
                  "Yükseköğrenimini tamamlayıp 6 ay içinde başvuranlar"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="mt-1 min-w-[16px]">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gerekli Belgeler */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-blue-600" /> Gerekli Belgeler
              </h2>
              <ul className="space-y-4">
                {[
                  { title: "Başvuru Formu", desc: "e-İkamet sistemi üzerinden doldurulmuş ve imzalanmış form." },
                  { title: "Pasaport", desc: "Pasaportun aslı ve kimlik bilgilerinin/işlem sayfalarının fotokopisi." },
                  { title: "Biyometrik Fotoğraf", desc: "Son 6 ay içinde çekilmiş, beyaz fonlu 4 adet fotoğraf." },
                  { title: "Sağlık Sigortası", desc: "Kalış süresini kapsayan geçerli sağlık sigortası poliçesi." },
                  { title: "Adres Belgesi", desc: "Noter onaylı kira kontratı, tapu veya nüfus müdürlüğünden alınan yerleşim yeri belgesi." },
                  { title: "Maddi Yeterlilik", desc: "Kalış süresince yeterli ve düzenli maddi imkana sahip olunduğuna dair beyan/belge." },
                  { title: "Harç Dekontları", desc: "İkamet izni harcı ve kart bedelinin ödendiğine dair makbuzlar." }
                ].map((doc, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-sm text-slate-600">{doc.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3 text-sm text-orange-800">
                <AlertTriangle className="shrink-0" size={20} />
                <p>
                  <strong>Önemli:</strong> Başvuru amacınıza göre (öğrenci, ticari, taşınmaz vb.) idare tarafından ek belgeler (tapu, davet mektubu, öğrenci belgesi vb.) talep edilebilir.
                </p>
              </div>
            </section>

            {/* Süreç Adımları */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Başvuru Süreci</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Online Kayıt", desc: "e-İkamet sistemi üzerinden başvuru formu doldurulur." },
                  { step: "02", title: "Randevu", desc: "Sistem üzerinden İl Göç İdaresi için uygun gün/saat seçilir." },
                  { step: "03", title: "Dosya Teslimi", desc: "Randevu günü, hazırlanan dosya ile bizzat kuruma gidilir." },
                  { step: "04", title: "Değerlendirme", desc: "Dosya incelenir, eksik varsa 30 gün ek süre verilir." },
                  { step: "05", title: "Sonuç", desc: "Olumlu ise kart basılır ve PTT ile adrese gönderilir." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="text-5xl font-black text-slate-100 absolute -left-2 -bottom-4 select-none">{s.step}</div>
                    <div className="relative z-10 pl-8">
                      <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                      <p className="text-slate-600 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Sıkça Sorulan Sorular</h2>
              <div className="space-y-3">
                <AccordionItem 
                  question="Kısa dönem ikamet izni ile çalışabilir miyim?" 
                  answer="Hayır, kısa dönem ikamet izni tek başına çalışma hakkı sağlamaz. Çalışmak için ayrıca Çalışma İzni almanız gerekmektedir. Ancak Çalışma İzni alanların ayrıca ikamet izni almasına gerek yoktur." 
                />
                <AccordionItem 
                  question="Randevuya gitmezsem ne olur?" 
                  answer="Randevu gününde ve saatinde İl Göç İdaresi'nde bulunmamanız durumunda başvurunuz işleme alınmamış sayılır. Bu durumda yasal süreniz devam ediyorsa yeniden randevu almanız gerekir." 
                />
                <AccordionItem 
                  question="Pasaport sürem ne kadar olmalı?" 
                  answer="Talep ettiğiniz ikamet izni süresinden en az 60 gün daha uzun geçerlilik süresine sahip bir pasaportunuz olmalıdır." 
                />
                <AccordionItem 
                  question="İkamet izni başvurusu ne kadar sürede sonuçlanır?" 
                  answer="Yasal süre 90 gündür. Ancak yoğunluğa göre bu süre değişebilir. Genellikle dosya tesliminden sonra 1-3 ay içinde sonuçlanmaktadır." 
                />
              </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* CTA Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Profesyonel Destek</h3>
              <p className="text-slate-400 text-sm mb-6">
                Belgelerinizi eksiksiz hazırlayalım, randevunuzu alalım ve sürecinizi takip edelim. Hata riskini sıfıra indirin.
              </p>
              <Link 
                to="/appointment" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors mb-3"
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
                  <Link to="/accommodation-permit" className="flex items-center justify-between text-slate-600 hover:text-blue-600 p-3 hover:bg-blue-50 rounded-xl transition-all">
                    <span>Uzun Dönem İkamet</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/accommodation-permit/family" className="flex items-center justify-between text-slate-600 hover:text-blue-600 p-3 hover:bg-blue-50 rounded-xl transition-all">
                    <span>Aile İkamet İzni</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/student-permit" className="flex items-center justify-between text-slate-600 hover:text-blue-600 p-3 hover:bg-blue-50 rounded-xl transition-all">
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


import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  FileText, CheckCircle, ChevronDown, ChevronUp, 
  Users, AlertTriangle, ArrowRight, Shield, Heart, 
  Info, UserCheck
} from 'lucide-react';

export const FamilyResidencyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-24 pb-20 bg-slate-50">
      
      {/* Header / Hero */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-green-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <Users size={16} />
              <span>İkamet İzni Rehberi</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Aile İkamet İzni
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Ailenizle birlikte Türkiye'de güvenli bir yaşam kurun. Türk vatandaşlarının veya yasal izinle kalan yabancıların eş ve çocukları için düzenlenen izin türüdür.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Kimlere Verilir? */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Heart className="text-green-600" /> Kimlere Verilir?
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600">
                  Aile ikamet izni, <strong>"Destekleyici"</strong> (Türk vatandaşı veya yasal izin sahibi yabancı) kişinin:
                </p>
                <ul className="space-y-2 ml-4">
                   <li className="flex items-center gap-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Yabancı eşine,
                   </li>
                   <li className="flex items-center gap-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Kendisinin veya eşinin 18 yaş altı yabancı çocuğuna,
                   </li>
                   <li className="flex items-center gap-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Kendisinin veya eşinin 18 yaş üstü bağımlı çocuğuna verilebilir.
                   </li>
                </ul>
              </div>
            </section>

            {/* Destekleyici Şartları */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <UserCheck className="text-green-600" /> Destekleyicide Aranan Şartlar
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Yeterli Gelir", desc: "Toplam geliri asgari ücretten az olmamalı ve ailedeki fert başına düşen gelir asgari ücretin 1/3'ünden az olmamalıdır." },
                  { title: "Sağlık Sigortası", desc: "Tüm aile bireylerini kapsayan geçerli sağlık sigortası yaptırmış olmalıdır." },
                  { title: "Adli Sicil Kaydı", desc: "Son 5 yıl içinde aile düzenine karşı suçlardan hüküm giymemiş olmalıdır." },
                  { title: "Adres Kaydı", desc: "Türkiye'de adres kayıt sistemine kayıtlı ve güncel bir adresi bulunmalıdır." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gerekli Belgeler */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-green-600" /> Gerekli Belgeler
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Destekleyici (Sponsor) İçin</h3>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li>Kimlik kartı / Pasaport / İkamet İzni fotokopisi.</li>
                    <li>Gelir belgesi (Maaş bordrosu, banka dökümü vb.).</li>
                    <li>Adli sicil kaydı (e-Devlet).</li>
                    <li>Yerleşim yeri belgesi (Adres kaydı).</li>
                    <li>Nüfus kayıt örneği.</li>
                    <li>Sağlık sigortası poliçesi (tüm aileyi kapsayan).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Yabancı Eş/Çocuk İçin</h3>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li>Başvuru formu.</li>
                    <li>Pasaport aslı ve fotokopisi.</li>
                    <li>4 adet biyometrik fotoğraf.</li>
                    <li>Evlilik cüzdanı (Eş için - Noter/Apostil onaylı).</li>
                    <li>Doğum belgesi (Çocuk için - Noter/Apostil onaylı).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Sıkça Sorulan Sorular</h2>
              <div className="space-y-3">
                <AccordionItem 
                  question="Boşanma durumunda ikamet iznim ne olur?" 
                  answer="Eğer en az 3 yıl aile ikamet izni ile kalmışsanız, boşanma sonrası kısa dönem ikamet iznine geçiş yapabilirsiniz. 3 yıldan kısa sürmüşse, aile içi şiddet gibi istisnai durumlar haricinde izin iptal edilebilir." 
                />
                <AccordionItem 
                  question="Anlaşmalı evlilik tespit edilirse ne olur?" 
                  answer="Evliliğin sadece ikamet izni almak amacıyla yapıldığı (sahte/anlaşmalı evlilik) tespit edilirse ikamet izni iptal edilir ve yasal işlem başlatılır." 
                />
                <AccordionItem 
                  question="Çocuklar için diğer ebeveynin onayı gerekir mi?" 
                  answer="Evet, 18 yaşından küçük çocuklar için yurt dışından alınan noter onaylı veya konsolosluk onaylı muvafakatnamesi gereklidir." 
                />
                <AccordionItem 
                  question="Turistik ikamet izni olan biri ailesine sponsor olabilir mi?" 
                  answer="Hayır, turizm amaçlı ikamet izni sahipleri aile ikamet izni için destekleyici olamazlar. Çalışma izni veya diğer geçerli izin türlerine sahip olunması gerekir." 
                />
              </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* CTA Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Aileniz Güvende Olsun</h3>
              <p className="text-slate-400 text-sm mb-6">
                Belge toplama ve başvuru sürecini sizin adınıza yönetiyoruz. Hata riskini ortadan kaldırın.
              </p>
              <Link 
                to="/appointment" 
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors mb-3"
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
                  <Link to="/accommodation-permit/short-term" className="flex items-center justify-between text-slate-600 hover:text-green-600 p-3 hover:bg-green-50 rounded-xl transition-all">
                    <span>Kısa Dönem İkamet</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/accommodation-permit/long-term" className="flex items-center justify-between text-slate-600 hover:text-green-600 p-3 hover:bg-green-50 rounded-xl transition-all">
                    <span>Uzun Dönem İkamet</span>
                    <ArrowRight size={16} />
                  </Link>
                </li>
                <li>
                  <Link to="/student-permit" className="flex items-center justify-between text-slate-600 hover:text-green-600 p-3 hover:bg-green-50 rounded-xl transition-all">
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

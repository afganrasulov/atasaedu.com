
import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  Clock, CheckCircle, AlertTriangle, ArrowRight, Shield, 
  FileText, Globe, Building2, ChevronDown, ChevronUp 
} from 'lucide-react';

export const TemporaryWorkPermitPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-40 pb-20 bg-slate-50">
      
      {/* Hero */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <Clock size={16} />
              <span>Çalışma İzni Türleri</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Süreli Çalışma İzni
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Belirli bir işyeri veya işletmede çalışmak üzere, belirli bir süre için verilen en yaygın çalışma izni türüdür.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Nedir */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Nedir?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Süreli çalışma izni, iş piyasasındaki durum, sektörel gelişmeler ve istihdam koşullarına göre, 
                belirli bir işyerinde veya meslekte çalışmak üzere <strong>en fazla 1 yıl</strong> süreyle verilir.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                 <p className="text-sm text-blue-900 font-medium">
                   Önemli: Aynı işverene bağlı çalışmaya devam edilmesi durumunda, ilk uzatmada en fazla 2 yıl, sonraki uzatmalarda ise en fazla 3 yıl süreyle verilebilir.
                 </p>
              </div>
            </section>

            {/* Başvuru Yöntemleri */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Başvuru Yöntemleri</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                     <Globe size={24} />
                   </div>
                   <h3 className="text-lg font-bold mb-3">Yurtdışından Başvuru</h3>
                   <p className="text-sm text-slate-600 mb-4">
                     Yabancı kişi kendi ülkesindeki T.C. Konsolosluğuna başvurur. Verilen 16 haneli referans numarası ile Türkiye'deki işveren Bakanlığa başvuruyu yapar.
                   </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                     <Building2 size={24} />
                   </div>
                   <h3 className="text-lg font-bold mb-3">Yurtiçinden Başvuru</h3>
                   <p className="text-sm text-slate-600 mb-4">
                     En az 6 ay geçerli ikamet izni olan yabancılar için işveren doğrudan Bakanlık sisteminden başvuru yapabilir.
                   </p>
                </div>
              </div>
            </section>

            {/* Gerekli Belgeler */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-blue-600" /> Gerekli Belgeler
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                 <div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">Çalışan İçin</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Pasaport (İzin süresinden 60 gün fazla)</li>
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Biyometrik Fotoğraf</li>
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Diploma / Mezuniyet Belgesi</li>
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> İş Sözleşmesi</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b pb-2">İşveren İçin</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Vergi Levhası</li>
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Ticaret Sicil Gazetesi</li>
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Faaliyet Belgesi</li>
                       <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Bilanço (Son yıl)</li>
                    </ul>
                 </div>
              </div>
            </section>
            
            {/* FAQ */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Sıkça Sorulan Sorular</h2>
               <div className="space-y-3">
                 <AccordionItem 
                   question="Çalışma izni ikamet izni yerine geçer mi?" 
                   answer="Evet, geçerli bir çalışma izni aynı zamanda ikamet hakkı da sağlar. Ayrıca ikamet izni almanıza gerek yoktur." 
                 />
                 <AccordionItem 
                   question="İşyeri değişikliğinde ne yapılmalı?" 
                   answer="Mevcut izni iptal ettirmeden, yeni işveren üzerinden 'transfer' başvurusu yapılabilir. Onaylandıktan sonra eski işten çıkış yapılır." 
                 />
                 <AccordionItem 
                   question="Şirket kriterleri nelerdir?" 
                   answer="İşyerinde her 1 yabancı çalışan için en az 5 Türk vatandaşı çalıştırılması ve şirketin ödenmiş sermayesinin en az 100.000 TL olması gerekmektedir." 
                 />
               </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24">
               <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
               <h3 className="text-xl font-bold mb-2">İşveren Danışmanlığı</h3>
               <p className="text-slate-400 text-sm mb-6">
                 Şirketinizin kriter uygunluğunu analiz edelim, başvuruyu sizin adınıza eksiksiz yapalım.
               </p>
               <Link to="/appointment" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors mb-3">
                 Randevu Al
               </Link>
             </div>
             
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Diğer Seçenekler</h4>
                <ul className="space-y-3 text-sm">
                   <li>
                     <Link to="/work-permit/long-term" className="flex items-center justify-between text-slate-600 hover:text-blue-600 p-2 hover:bg-slate-50 rounded-lg">
                       Süresiz Çalışma İzni <ArrowRight size={14} />
                     </Link>
                   </li>
                   <li>
                     <Link to="/work-permit/independent" className="flex items-center justify-between text-slate-600 hover:text-blue-600 p-2 hover:bg-slate-50 rounded-lg">
                       Bağımsız Çalışma İzni <ArrowRight size={14} />
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
    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100 transition-colors">
        <span className="font-bold text-slate-800 text-sm">{question}</span>
        {isOpen ? <ChevronUp className="text-slate-400" size={18} /> : <ChevronDown className="text-slate-400" size={18} />}
      </button>
      <div className={`px-5 text-slate-600 text-sm leading-relaxed transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0 py-0 overflow-hidden'}`}>
        {answer}
      </div>
    </div>
  );
};

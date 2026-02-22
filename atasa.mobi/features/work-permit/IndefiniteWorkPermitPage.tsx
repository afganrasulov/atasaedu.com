
import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  Infinity, CheckCircle, ChevronDown, ChevronUp, 
  ArrowRight, Shield, FileText, Star, Info 
} from 'lucide-react';

export const IndefiniteWorkPermitPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-40 pb-20 bg-slate-50">
      
      {/* Hero */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-purple-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <Infinity size={16} />
              <span>Çalışma İzni Türleri</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Süresiz Çalışma İzni
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Türkiye'de uzun süreli ikamet eden veya yasal olarak çalışan yabancılara tanınan, süre sınırı olmayan çalışma hakkıdır.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* Şartlar */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle className="text-purple-600" /> Başvuru Şartları
              </h2>
              <div className="space-y-4 text-slate-600">
                 <p className="mb-4">
                   Süresiz çalışma izni alabilmek için aşağıdaki şartlardan <strong>en az birini</strong> sağlamanız gerekmektedir:
                 </p>
                 <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 mb-4">
                    <h3 className="font-bold text-purple-900 mb-2">Uzun Dönem İkamet</h3>
                    <p className="text-sm">Türkiye'de "Uzun Dönem İkamet İzni"ne sahip olan yabancılar.</p>
                 </div>
                 <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-purple-900 mb-2">8 Yıl Yasal Çalışma</h3>
                    <p className="text-sm">En az 8 yıl kanuni çalışma izni ile Türkiye'de aralıksız çalışmış olan yabancılar.</p>
                 </div>
              </div>
            </section>

            {/* Haklar */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Star className="text-purple-600" /> Sağladığı Haklar
              </h2>
              <ul className="space-y-4">
                {[
                   "Süre sınırı olmaksızın çalışma hakkı.",
                   "Bağımsız veya bir işverene bağlı çalışma özgürlüğü.",
                   "Türk vatandaşlarına tanınan birçok sosyal haktan yararlanma.",
                   "Seçme, seçilme ve kamu görevine girme hakları hariç vatandaşlarla eşit statü."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                     <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Sıkça Sorulan Sorular</h2>
               <div className="space-y-3">
                 <AccordionItem 
                   question="Eğitim süreleri 8 yıla dahil edilir mi?" 
                   answer="Hayır, öğrenim süresince geçirilen süreler süresiz çalışma izni için gerekli olan 8 yıllık sürenin hesabında dikkate alınmaz." 
                 />
                 <AccordionItem 
                   question="Süresiz çalışma izni iptal edilir mi?" 
                   answer="Türkiye dışında kesintisiz olarak 1 yıldan fazla kalınması (sağlık, eğitim, zorunlu kamu hizmeti hariç) durumunda iptal edilebilir." 
                 />
               </div>
            </section>

          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24">
               <Shield className="w-12 h-12 mx-auto mb-4 text-purple-400" />
               <h3 className="text-xl font-bold mb-2">Uygunluk Analizi</h3>
               <p className="text-slate-400 text-sm mb-6">
                 8 yıllık sürenin doğru hesaplanması ve eksik gün olmaması kritiktir. Dosyanızı incelememiz için randevu alın.
               </p>
               <Link to="/appointment" className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-colors mb-3">
                 Randevu Al
               </Link>
             </div>
             
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Diğer Seçenekler</h4>
                <ul className="space-y-3 text-sm">
                   <li>
                     <Link to="/work-permit/temporary" className="flex items-center justify-between text-slate-600 hover:text-purple-600 p-2 hover:bg-slate-50 rounded-lg">
                       Süreli Çalışma İzni <ArrowRight size={14} />
                     </Link>
                   </li>
                   <li>
                     <Link to="/work-permit/turkuaz" className="flex items-center justify-between text-slate-600 hover:text-purple-600 p-2 hover:bg-slate-50 rounded-lg">
                       Turkuaz Kart <ArrowRight size={14} />
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gem, CheckCircle, ChevronDown, ChevronUp, 
  ArrowRight, Shield, Globe, Award, Info 
} from 'lucide-react';

export const TurquoiseCardPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-40 pb-20 bg-slate-50">
      
      {/* Hero */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-teal-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <Gem size={16} />
              <span>Özel Statü</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Turkuaz Kart
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Nitelikli yabancı işgücü için tasarlanmış; çalışma izni, ikamet hakkı ve vatandaşlık yolunu açan prestijli bir karttır.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* Kimler Alabilir? */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="text-teal-600" /> Kimler Alabilir?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                 {[
                   "Yüksek nitelikli işgücü",
                   "Yüksek nitelikli yatırımcılar",
                   "Bilim insanı ve araştırmacılar",
                   "Kültür, sanat veya spor alanında başarılı olanlar",
                   "Türkiye'nin tanıtımına katkı sağlayanlar"
                 ].map((item, i) => (
                   <div key={i} className="flex gap-3 items-center p-3 bg-teal-50/50 rounded-lg border border-teal-100">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                   </div>
                 ))}
              </div>
            </section>

            {/* Avantajları */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Avantajları</h2>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                   <CheckCircle className="text-teal-500 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-bold text-slate-800">Süresiz Çalışma Hakkı</h4>
                     <p className="text-sm text-slate-600">3 yıllık geçiş süresinden sonra süresiz hale gelir.</p>
                   </div>
                </li>
                <li className="flex gap-3 items-start">
                   <CheckCircle className="text-teal-500 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-bold text-slate-800">Aile İçin İkamet</h4>
                     <p className="text-sm text-slate-600">Turkuaz Kart sahibinin eşi ve çocuklarına da ikamet izni yerine geçen kart verilir.</p>
                   </div>
                </li>
                <li className="flex gap-3 items-start">
                   <CheckCircle className="text-teal-500 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-bold text-slate-800">Vatandaşlık Yolu</h4>
                     <p className="text-sm text-slate-600">Geçiş süresini tamamlayanlar Türk vatandaşlığına başvuru hakkı kazanır.</p>
                   </div>
                </li>
              </ul>
            </section>

            {/* Geçiş Süresi Bilgisi */}
            <section className="bg-teal-900 text-white p-8 rounded-2xl">
               <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                 <Info size={24} className="text-teal-300" /> Geçiş Süresi Nedir?
               </h3>
               <p className="text-teal-100 leading-relaxed text-sm">
                 Turkuaz Kart ilk etapta <strong>3 yıllık geçiş süresi</strong> ile verilir. Bu süre içinde uzmanlar tarafından izleme raporları talep edilir. Herhangi bir olumsuzluk yaşanmazsa, 3 yılın sonunda kart süresiz hale gelir.
               </p>
            </section>

          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24">
               <Shield className="w-12 h-12 mx-auto mb-4 text-teal-400" />
               <h3 className="text-xl font-bold mb-2">Puanlama Sistemi</h3>
               <p className="text-slate-400 text-sm mb-6">
                 Eğitim, maaş, tecrübe ve Türkçe bilgisi gibi kriterlerle puanlama yapılır. Uygunluk analizi için bize ulaşın.
               </p>
               <Link to="/appointment" className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-colors mb-3">
                 Randevu Al
               </Link>
             </div>
             
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Diğer Seçenekler</h4>
                <ul className="space-y-3 text-sm">
                   <li>
                     <Link to="/work-permit/temporary" className="flex items-center justify-between text-slate-600 hover:text-teal-600 p-2 hover:bg-slate-50 rounded-lg">
                       Süreli Çalışma İzni <ArrowRight size={14} />
                     </Link>
                   </li>
                   <li>
                     <Link to="/work-permit/independent" className="flex items-center justify-between text-slate-600 hover:text-teal-600 p-2 hover:bg-slate-50 rounded-lg">
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
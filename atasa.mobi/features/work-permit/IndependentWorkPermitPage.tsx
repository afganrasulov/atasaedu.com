
import React, { useState } from 'react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  User, CheckCircle, ChevronDown, ChevronUp, 
  ArrowRight, Shield, FileText, Briefcase, Info 
} from 'lucide-react';

export const IndependentWorkPermitPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-40 pb-20 bg-slate-50">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-orange-600 font-bold mb-4 text-sm uppercase tracking-wider">
              <User size={16} />
              <span>Çalışma İzni Türleri</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Bağımsız Çalışma İzni
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Türkiye'de bir işverene bağlı olmadan kendi ad ve hesabına çalışmak isteyen yabancılar için düzenlenen, girişimciliği destekleyen özel bir izin türüdür.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Kimler Başvurabilir? */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-orange-600" /> Kimler Başvurabilir?
              </h2>
              <ul className="space-y-4">
                {[
                  "Kendi işini kurmak isteyen girişimciler.",
                  "Bir şirkete ortak olan yabancı uyruklu şahıslar.",
                  "Bağımsız olarak serbest meslek icra edecek profesyoneller.",
                  "Ekonomiye katma değer sağlayacak yatırımcılar."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <CheckCircle className="text-orange-500 shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Şartlar ve Bakanlık Değerlendirmesi */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Değerlendirme Kriterleri</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Uluslararası İşgücü Politikası kapsamında; yabancının eğitim düzeyi, mesleki tecrübesi, yapacağı yatırımın ekonomiye katkısı ve istihdam yaratma kapasitesi gibi unsurlar Bakanlıkça titizlikle incelenir.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                 <h4 className="text-blue-900 font-bold mb-2">3+ Muafiyeti Fırsatı</h4>
                 <p className="text-sm text-blue-800 leading-relaxed">
                   Türkiye'de en az 5 yıl yasal olarak ikamet etmiş veya Türk vatandaşı ile evli olan yabancılar için bağımsız çalışma izni alma süreçleri, belirli muafiyetler sayesinde daha kolay tamamlanabilmektedir.
                 </p>
              </div>
            </section>

            {/* Gerekli Belgeler Listesi */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-blue-600" /> Gerekli Belgeler
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">Vergi Levhası & Sicil Gazetesi</div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">Detaylı İş Planı (Atasa Hazırlar)</div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">Banka Hesap Dökümleri</div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">Diploma ve Sertifikalar</div>
              </div>
            </section>
          </div>

          {/* Sidebar CTA Area */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24 shadow-2xl">
               <Shield className="w-12 h-12 mx-auto mb-4 text-orange-400" />
               <h3 className="text-xl font-bold mb-2">Profesyonel Girişimci Desteği</h3>
               <p className="text-slate-400 text-sm mb-6">
                 Şirket kuruluşundan bağımsız çalışma izni aşamasına kadar tüm süreci sizin adınıza yönetiyoruz.
               </p>
               <Link to="/appointment" className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 mb-3">
                 Hemen Başvuralım
               </Link>
               <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Atasa İş & Girişim Çözümleri</p>
             </div>
             
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Alternatif İzin Türleri</h4>
                <ul className="space-y-3 text-sm">
                   <li>
                     <Link to="/work-permit/temporary" className="flex items-center justify-between text-slate-600 hover:text-orange-600 p-2 hover:bg-slate-50 rounded-lg group transition-all">
                       Süreli Çalışma İzni <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                   </li>
                   <li>
                     <Link to="/work-permit/turkuaz" className="flex items-center justify-between text-slate-600 hover:text-orange-600 p-2 hover:bg-slate-50 rounded-lg group transition-all">
                       Turkuaz Kart <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

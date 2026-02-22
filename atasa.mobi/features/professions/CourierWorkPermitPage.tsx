import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bike, Package, AlertTriangle, ShieldCheck, 
  CheckCircle, ArrowRight, Siren, FileText, BadgeCheck, Info 
} from 'lucide-react';
import { CourierEligibilityWizard } from './CourierEligibilityWizard';

export const CourierWorkPermitPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen pt-6 md:pt-40 pb-20 bg-slate-50">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-slate-800 relative overflow-hidden text-center">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 border border-yellow-500/30">
              <Bike size={18} />
              <span>{currentYear} Güncel Kurye Rehberi</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Motorun Bağlanmasın, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Yasal Olarak Çalış!
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Türkiye'de yabancı kurye olarak çalışmak için gerekli P1 Belgesi, MYK ve Çalışma İzni süreçlerini sizin için yönetiyoruz.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/appointment" className="bg-yellow-500 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center gap-2">
                Hemen Başvuru Yap <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Interactive Wizard - NEW FEATURE */}
            <CourierEligibilityWizard />

            {/* Warning Box */}
            <div className="bg-red-50 border-l-8 border-red-500 rounded-r-2xl p-6 shadow-sm">
               <div className="flex gap-4">
                 <div className="bg-red-100 p-3 rounded-full h-fit shrink-0">
                    <Siren className="text-red-600" size={32} />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-red-700 mb-2">Çalışma İzni Zorunlu Mu?</h3>
                   <p className="text-red-800/80 mb-4">
                     Evet. Turist vizesi veya öğrenci ikametiyle kuryelik yapmak <strong>YASAL DEĞİLDİR</strong>.
                   </p>
                   <ul className="space-y-2 text-sm font-semibold text-red-900">
                     <li className="flex items-center gap-2"><AlertTriangle size={16} /> Hakkınızda sınır dışı (deport) kararı alınabilir.</li>
                     <li className="flex items-center gap-2"><AlertTriangle size={16} /> Motosikletiniz bağlanabilir.</li>
                   </ul>
                 </div>
               </div>
            </div>

            {/* P1 & 3+ Information */}
            <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                 <BadgeCheck className="text-green-600" size={28} />
                 <h2 className="text-2xl font-bold text-slate-900">Önemli Avantajlar ({currentYear})</h2>
               </div>
               
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                     <h3 className="font-bold text-green-900 mb-2">3+ Muafiyeti Nedir?</h3>
                     <p className="text-sm text-green-800 leading-relaxed mb-3">
                       Son 5 yılın en az 3 yılını Türkiye'de yasal geçirdiyseniz; "5 Türk çalışan" ve "Mali yeterlilik" şartlarından muaf tutulursunuz. 
                       <br/><span className="font-bold text-xs mt-1 block">Bu sayede şahıs şirketi ile kuryelik yapabilirsiniz.</span>
                     </p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                     <h3 className="font-bold text-blue-900 mb-2">P1* Yetki Belgesi</h3>
                     <p className="text-sm text-blue-800 leading-relaxed mb-3">
                       {currentYear} yılında P1* yetki belgesi ücreti yüksektir ancak <strong>en fazla 3 motosikletle</strong> başvuru yapanlar için <strong>%85 indirim</strong> uygulanır.
                     </p>
                  </div>
               </div>
            </section>

            {/* How to work legally? */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <ShieldCheck className="text-slate-700" /> Yasal Çalışma Yöntemleri
              </h2>
              
                <div className="grid md:grid-cols-2 gap-6">
                   {/* Option 1 */}
                   <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-yellow-400 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
                         <FileText size={24} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Kendi Şirketini Kurarak</h4>
                      <p className="text-sm text-slate-600 mb-4">
                        (Bağımsız / Şirket Ortağı)<br/>
                        Limited şirket veya (şartlar uygunsa) şahıs şirketi kurarak P1 belgesi alırsınız.
                      </p>
                      <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                        <li>Fatura kesebilirsiniz.</li>
                        <li>Motor size ait olur.</li>
                        <li>Uzun vadeli ve en güvenli çözümdür.</li>
                      </ul>
                   </div>

                   {/* Option 2 */}
                   <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                         <Package size={24} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Şirket Motorunu Kiralayarak</h4>
                      <p className="text-sm text-slate-600 mb-4">
                        (Motosiklet Kiralama Yöntemi)<br/>
                        Kendi motorunuzu çalıştığınız şirkete kiralayarak veya şirketin motorunu kullanarak P1 kapsamına girersiniz.
                      </p>
                      <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
                         <li>Şirket kurmanıza gerek kalmaz.</li>
                         <li>Daha az bürokrasi.</li>
                      </ul>
                   </div>
                </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Sticky Call to Action */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl text-center sticky top-24 border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/10">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                 <Bike size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-yellow-400">Hemen Başlayalım</h3>
              <p className="text-slate-300 text-sm mb-6">
                Durumunuzu analiz ettik, şimdi işlemleri başlatma zamanı.
              </p>
              <Link 
                to="/appointment" 
                className="block w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl transition-colors mb-3"
              >
                Randevu Al
              </Link>
              <Link 
                to="/contact" 
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Bize Ulaşın
              </Link>
              <div className="mt-4 text-xs text-slate-500 border-t border-slate-700 pt-4">
                 P1 Belgesi Son Tarihi: <br/> <span className="text-white font-bold">15 Temmuz {currentYear > 2025 ? currentYear : 2025}</span>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <Info size={18} className="text-blue-500"/> Gerekli Belgeler
              </h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> Geçerli Pasaport</li>
                <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> MYK Kurye Seviye 3 Belgesi</li>
                <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> A1/A2 Ehliyet (Türk ehliyetine çevrilmeli)</li>
                <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> Temiz Sabıka Kaydı</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
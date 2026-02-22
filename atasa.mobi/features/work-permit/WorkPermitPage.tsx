
import React from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  Briefcase, Clock, Infinity, User, Gem, 
  ArrowRight, CheckCircle, ShieldCheck, Bike 
} from 'lucide-react';

export const WorkPermitPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-40 pb-20 bg-slate-50">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              <Briefcase size={16} />
              <span>2025 Güncel Mevzuat</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Türkiye'de <span className="text-blue-600">Çalışma İzni</span> <br/>
              Başvuru Rehberi
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Yabancıların Türkiye'de yasal olarak çalışabilmesi için gerekli olan izin türleri, başvuru süreçleri ve profesyonel danışmanlık hizmetleri.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/appointment" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Hemen Başvuru Yap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Profession: Couriers */}
      <div className="container mx-auto px-4 mb-12">
        <Link to="/profession/couriers" className="block group">
           <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden transition-transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                 <Bike size={200} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <div className="inline-block bg-black/20 px-3 py-1 rounded-full text-xs font-bold mb-3">Popüler Hizmet</div>
                    <h3 className="text-3xl font-bold mb-2">Kuryeler İçin Çalışma İzni</h3>
                    <p className="text-white/90 max-w-xl">
                       Motosikletli kurye olarak çalışmak isteyen yabancılar için özel rehber. 
                       Ceza yememek ve motorunuzun bağlanmaması için yasal süreci hemen başlatın.
                    </p>
                 </div>
                 <div className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 group-hover:scale-105 transition-transform shrink-0">
                    Kurye Rehberini İncele <ArrowRight size={20} />
                 </div>
              </div>
           </div>
        </Link>
      </div>

      {/* Permit Types Grid */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Link to="/work-permit/temporary" className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Clock size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Süreli Çalışma İzni</h3>
            <p className="text-slate-600 mb-6">
              Belirli bir işyeri veya işletmede çalışmak üzere, ilk başvuruda en fazla 1 yıl süreyle verilen temel izin türüdür.
            </p>
            <span className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
              Detayları İncele <ArrowRight size={18} />
            </span>
          </Link>

          <Link to="/work-permit/long-term" className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Infinity size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Süresiz Çalışma İzni</h3>
            <p className="text-slate-600 mb-6">
              Türkiye'de uzun dönem ikamet izni veya en az 8 yıl yasal çalışma izni olan yabancılara tanınan süresiz haktır.
            </p>
            <span className="flex items-center gap-2 text-purple-600 font-bold group-hover:gap-3 transition-all">
              Detayları İncele <ArrowRight size={18} />
            </span>
          </Link>

          <Link to="/work-permit/independent" className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <User size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Bağımsız Çalışma İzni</h3>
            <p className="text-slate-600 mb-6">
              Türkiye'de kendi işini kurmak isteyen, profesyonel meslek mensubu veya şirket ortağı yabancılar içindir.
            </p>
            <span className="flex items-center gap-2 text-orange-600 font-bold group-hover:gap-3 transition-all">
              Detayları İncele <ArrowRight size={18} />
            </span>
          </Link>

          <Link to="/work-permit/turkuaz" className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Gem size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Turkuaz Kart</h3>
            <p className="text-slate-600 mb-6">
              Nitelikli işgücü, yatırımcılar, bilim insanları ve sanatçılar için süresiz çalışma hakkı ve ikamet sağlayan özel statü.
            </p>
            <span className="flex items-center gap-2 text-teal-600 font-bold group-hover:gap-3 transition-all">
              Detayları İncele <ArrowRight size={18} />
            </span>
          </Link>

        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
           
           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-bold mb-6">Neden Çalışma İzni Almalısınız?</h2>
               <div className="space-y-4">
                 <div className="flex gap-4">
                   <CheckCircle className="text-green-400 shrink-0" />
                   <p className="text-slate-300">Yasal güvence altında sigortalı çalışma hakkı kazanırsınız.</p>
                 </div>
                 <div className="flex gap-4">
                   <CheckCircle className="text-green-400 shrink-0" />
                   <p className="text-slate-300">Çalışma izni süresince ayrıca ikamet izni almanıza gerek kalmaz.</p>
                 </div>
                 <div className="flex gap-4">
                   <CheckCircle className="text-green-400 shrink-0" />
                   <p className="text-slate-300">5 yıl kesintisiz çalışma sonunda vatandaşlık başvuru hakkı doğar.</p>
                 </div>
                 <div className="flex gap-4">
                   <CheckCircle className="text-green-400 shrink-0" />
                   <p className="text-slate-300">Aileniz (eş ve çocuklar) için ikamet izni alma hakkı sağlar.</p>
                 </div>
               </div>
             </div>
             
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
               <ShieldCheck size={48} className="text-blue-400 mb-4" />
               <h3 className="text-xl font-bold mb-2">Cezai Yaptırımlar</h3>
               <p className="text-slate-300 text-sm mb-6">
                 İzinsiz çalışma durumunda hem işverene hem de yabancı personele yüksek idari para cezaları uygulanır ve yabancı personel için sınır dışı kararı alınabilir.
               </p>
               <Link to="/contact" className="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
                 Risk Almayın, Danışın
               </Link>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Users, Target, Globe, Award, 
  CheckCircle, ArrowRight, Briefcase, Star 
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  specialty: string;
  featured?: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ömer Habib",
    role: "Genel Müdür & CEO",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848351049-170556386.webp",
    specialty: "Stratejik Yönetim & Vatandaşlık",
    featured: true
  },
  {
    name: "Pusat Habib",
    role: "Azerbaycan Şubesi Genel Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848350851-919439104.png",
    specialty: "Uluslararası İlişkiler"
  },
  {
    name: "Eda Shakir",
    role: "Türkmenistan Şubesi Genel Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848330042-412657531.png",
    specialty: "Orta Asya Operasyonları"
  },
  {
    name: "Buse Yıldız",
    role: "Çalışma İzni Departman Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329974-732680824.png",
    specialty: "Kurumsal Danışmanlık"
  },
  {
    name: "Sevda Tatiana Yerlikaya",
    role: "Çalışma İzni Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329926-568689621.png",
    specialty: "Yabancı Personel İstihdamı"
  },
  {
    name: "Royan Asker",
    role: "CMO",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329315-116880024.png",
    specialty: "Dijital Pazarlama & İletişim",
    featured: true
  },
  {
    name: "Serdar Shakir",
    role: "Öğrenci İşleri Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329111-760659936.png",
    specialty: "Eğitim Danışmanlığı"
  },
  {
    name: "Reza Vaez",
    role: "Yazılım Departman Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848373313-287903611.png",
    specialty: "Teknoloji & İnovasyon"
  },
  {
    name: "Gizem Varlı",
    role: "Çalışma İzni Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848328738-675550963.jpg",
    specialty: "Yasal Mevzuat Takibi"
  },
  {
    name: "Nuray Shabab",
    role: "İkamet İzni Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848328699-419145832.jpg",
    specialty: "Oturum İzni Süreçleri"
  }
];

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-20 bg-slate-50">
      
      {/* 1. Hero Section: Vizyon & Misyon */}
      <div className="container mx-auto px-4 mb-20">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Biz Kimiz?
            </span>
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              Sadece Danışman Değil, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                Yol Arkadaşınızız.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Atasa Danışmanlık olarak, Türkiye'de yeni bir hayat kurmak isteyen binlerce yabancı misafirimize rehberlik ediyoruz. Bürokrasiyi aşıyor, karmaşık süreçleri sizin için basitleştiriyoruz.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
               <div>
                 <div className="text-3xl md:text-4xl font-bold text-white mb-1">10K+</div>
                 <div className="text-sm text-slate-400">Mutlu Müşteri</div>
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-bold text-white mb-1">%98</div>
                 <div className="text-sm text-slate-400">Başarı Oranı</div>
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-bold text-white mb-1">8+</div>
                 <div className="text-sm text-slate-400">Yıllık Tecrübe</div>
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-bold text-white mb-1">3</div>
                 <div className="text-sm text-slate-400">Ülke Ofisi</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Story Section: Why Trust Us? */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-orange-100 rounded-[2rem] -z-10 blur-xl opacity-70"></div>
             <img 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Atasa Ofis Toplantı" 
               className="rounded-[2rem] shadow-2xl w-full object-cover h-[600px]"
             />
             <div className="absolute bottom-10 right-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-in slide-in-from-bottom-8 duration-1000 hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                   <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Shield size={24} />
                   </div>
                   <div className="font-bold text-slate-900">Resmi & Yasal</div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                   Tüm işlemlerimiz T.C. kanunlarına ve Göç İdaresi yönetmeliklerine %100 uygundur.
                </p>
             </div>
          </div>
          
          <div>
            <h2 className="text-blue-600 font-bold tracking-wide uppercase mb-3">Hikayemiz</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Neden Atasa? Çünkü İşinizi Şansa Bırakmıyoruz.</h3>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                2015 yılında, yabancıların Türkiye'deki bürokratik süreçlerde yaşadığı zorlukları görerek yola çıktık. Amacımız sadece "evrak doldurmak" değil, insanların hayatlarına dokunmak ve Türkiye'deki geleceklerini güvence altına almaktı.
              </p>
              <p>
                Bugün İstanbul, Bakü ve Aşkabat'taki ofislerimizle uluslararası bir danışmanlık firmasına dönüştük. 
                <strong className="text-slate-900 font-semibold mx-1">İkamet izni, çalışma izni ve vatandaşlık</strong> 
                konularında uzmanlaşmış kadromuzla, en karmaşık dosyaları bile çözüme kavuşturuyoruz.
              </p>
              
              <div className="pt-6 grid gap-4">
                 <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                       <Target size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 text-lg">Sonuç Odaklı Yaklaşım</h4>
                       <p className="text-sm">Boş vaatler vermiyoruz. Dosyanızı inceliyor, riskleri analiz ediyor ve en doğru yolu çiziyoruz.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-600 shrink-0">
                       <Users size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 text-lg">Kişiye Özel Çözümler</h4>
                       <p className="text-sm">Herkesin hikayesi farklıdır. Standart şablonlar yerine size özel stratejiler geliştiriyoruz.</p>
                    </div>
                 </div>
              </div>

              <div className="pt-8">
                 <Link to="/appointment" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1">
                    Tanışmak İçin Randevu Al <ArrowRight size={20} />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Team Section */}
      <div className="bg-white py-24 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Uzman Kadromuz</span>
             <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Başarımızın Arkasındaki İsimler</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">
               Alanında uzman, mevzuata hakim ve çözüm odaklı ekibimizle tanışın. Sizi dinliyor, anlıyor ve çözüyoruz.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {TEAM_MEMBERS.map((member, index) => (
               <div key={index} className={`group bg-white rounded-[2.5rem] p-5 shadow-sm border transition-all duration-500 ${member.featured ? 'border-blue-400 shadow-xl shadow-blue-500/10 scale-[1.03] z-10' : 'border-slate-100 hover:shadow-2xl hover:border-blue-200'}`}>
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative bg-slate-50 border border-slate-50">
                     <img 
                       src={member.image} 
                       alt={member.name}
                       crossOrigin="anonymous"
                       className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                       loading="lazy"
                       onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                             const initials = member.name.split(' ').map(n => n[0]).join('');
                             const div = document.createElement('div');
                             div.className = "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white font-black text-7xl tracking-tighter";
                             div.innerText = initials;
                             parent.appendChild(div);
                          }
                       }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-bold text-sm flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                           <Award size={16} className="text-yellow-400" /> {member.specialty}
                        </span>
                     </div>
                  </div>
                  <div className="text-center px-2 pb-4">
                     <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">{member.name}</h3>
                     <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">{member.role}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 4. Values / Philosophy */}
      <div className="container mx-auto px-4 py-24">
         <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-bold mb-8">Neden Profesyonel Danışmanlık?</h2>
               <p className="text-blue-100 text-lg mb-12 leading-relaxed">
                 Kendi başınıza yapacağınız başvurularda yapacağınız küçük bir hata, <strong className="text-white border-b border-white/30">red kararı almanıza</strong> ve hatta <strong className="text-white border-b border-white/30">sınır dışı edilmenize</strong> neden olabilir. Biz, tecrübemizle bu riskleri ortadan kaldırıyoruz.
               </p>
               
               <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-colors">
                     <div className="bg-white text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                        <Briefcase size={24} />
                     </div>
                     <h4 className="text-xl font-bold mb-3">Zaman Kazanın</h4>
                     <p className="text-blue-100 text-sm">Evrak toplama, randevu takibi ve bürokrasi ile uğraşmayın. Biz sizin yerinize halledelim.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-colors">
                     <div className="bg-white text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                        <CheckCircle size={24} />
                     </div>
                     <h4 className="text-xl font-bold mb-3">Hatasız Başvuru</h4>
                     <p className="text-blue-100 text-sm">Dosyanızı uzmanlarımız hazırlar, eksiksiz teslim edilir. Red riskini minimize ederiz.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-colors">
                     <div className="bg-white text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                        <Globe size={24} />
                     </div>
                     <h4 className="text-xl font-bold mb-3">7/24 Destek</h4>
                     <p className="text-blue-100 text-sm">Sürecin her aşamasında yanınızdayız. Sorularınıza anında cevap bulursunuz.</p>
                  </div>
               </div>

               <div className="mt-16">
                  <Link to="/appointment" className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl inline-flex items-center gap-2">
                     Geleceğinizi Güvenceye Alın <ArrowRight size={20} />
                  </Link>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

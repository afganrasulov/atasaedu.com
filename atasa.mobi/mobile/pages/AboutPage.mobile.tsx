
import React from 'react';
import { MobileHeader } from '../components/MobileHeader';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ShieldCheck, Users, Target, Globe, Award } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: "Ömer Habib",
    role: "Genel Müdür & CEO",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848351049-170556386.webp",
    featured: true
  },
  {
    name: "Pusat Habib",
    role: "Azerbaycan Şubesi Genel Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848350851-919439104.png"
  },
  {
    name: "Eda Shakir",
    role: "Türkmenistan Şubesi Genel Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848330042-412657531.png"
  },
  {
    name: "Buse Yıldız",
    role: "Çalışma İzni Departman Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329974-732680824.png"
  },
  {
    name: "Sevda Tatiana Yerlikaya",
    role: "Çalışma İzni Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329926-568689621.png"
  },
  {
    name: "Royan Asker",
    role: "CMO",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329315-116880024.png",
    featured: true
  },
  {
    name: "Serdar Shakir",
    role: "Öğrenci İşleri Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848329111-760659936.png"
  },
  {
    name: "Reza Vaez",
    role: "Yazılım Departman Müdürü",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848373313-287903611.png"
  },
  {
    name: "Gizem Varlı",
    role: "Çalışma İzni Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848328738-675550963.jpg"
  },
  {
    name: "Nuray Shabab",
    role: "İkamet İzni Danışmanı",
    image: "https://upload-service-production-dd42.up.railway.app/files/1766848328699-419145832.jpg"
  }
];

export const AboutPageMobile: React.FC = () => {
  return (
    <div className="pb-32 bg-[#F2F2F7] min-h-screen">
      <MobileHeader title="HAKKIMIZDA" showBack={true} />
      
      <MobileContainer>
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Atasa Danışmanlık</h2>
          <p className="text-slate-500 leading-relaxed font-medium">
            2015 yılından beri Türkiye'de yabancıların ikamet, çalışma izni ve vatandaşlık süreçlerinde en güvenilir yol arkadaşıyız.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<ShieldCheck size={24} className="text-blue-600" />} label="Başarı" value="%98" />
          <StatCard icon={<Users size={24} className="text-orange-600" />} label="Mutlu Müşteri" value="10K+" />
          <StatCard icon={<Target size={24} className="text-indigo-600" />} label="Deneyim" value="8+ Yıl" />
          <StatCard icon={<Globe size={24} className="text-emerald-600" />} label="Şube" value="3 Ülke" />
        </div>

        {/* Team Section */}
        <div className="space-y-4 pt-4">
           <h3 className="font-black text-slate-900 text-lg ml-2 uppercase tracking-widest flex items-center gap-2">
             <Award size={20} className="text-blue-600" /> Uzman Ekibimiz
           </h3>
           <div className="grid grid-cols-2 gap-4">
             {TEAM_MEMBERS.map((member, idx) => (
               <div key={idx} className={`bg-white p-3 rounded-[1.8rem] shadow-sm border text-center active:scale-95 transition-transform overflow-hidden ${member.featured ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-50'}`}>
                  <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-slate-50 relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                           const initials = member.name.split(' ').map(n => n[0]).join('');
                           const div = document.createElement('div');
                           div.className = "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white font-black text-3xl";
                           div.innerText = initials;
                           parent.appendChild(div);
                        }
                      }}
                    />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 truncate px-1">{member.name}</h4>
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-tighter truncate px-1">{member.role}</p>
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-4 pt-4">
           <h3 className="font-black text-slate-900 text-lg ml-2 uppercase tracking-widest">Vizyonumuz</h3>
           <div className="bg-white p-6 rounded-[1.8rem] border border-slate-100 shadow-sm leading-relaxed text-slate-600 text-sm">
             Bürokrasiyi sadeleştirerek yabancı misafirlerimizin Türkiye'deki hayatlarını kolaylaştırmak ve yasal süreçlerini güvenle tamamlamalarını sağlamaktır.
           </div>
        </div>
      </MobileContainer>
    </div>
  );
};

const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-white p-5 rounded-[1.8rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">{icon}</div>
    <div className="text-xl font-black text-slate-900 leading-none">{value}</div>
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
  </div>
);


import React from 'react';
import { MobileHeader } from '../components/MobileHeader';
import { MobileContainer } from '../components/layout/MobileContainer';
import { Phone, MessageCircle, Mail, MapPin, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../../constants';

export const ContactPageMobile: React.FC = () => {
  return (
    <div className="pb-32 bg-[#F2F2F7] min-h-screen">
      <MobileHeader title="İLETİŞİM" showBack={true} />
      
      <MobileContainer>
        <div className="space-y-4">
          <ContactAction 
            icon={<Phone size={24} />} 
            title="Hemen Arayın" 
            desc={COMPANY_INFO.phone} 
            color="bg-blue-600" 
            href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
          />
          <ContactAction 
            icon={<MessageCircle size={24} />} 
            title="WhatsApp Destek" 
            desc="Hızlı yazışma hattı" 
            color="bg-green-600" 
            onClick={() => window.open('https://wa.me/908503086998', '_blank')}
          />
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" /> Şube Bilgileri
          </h3>
          <div className="space-y-6">
            <BranchItem city="İstanbul" phone="+90 850 308 69 98" />
            <BranchItem city="Aşkabat" phone="+993 637 816 52" />
            <BranchItem city="Bakü" phone="+994 51 823 44 10" />
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-6 text-white text-center">
           <Mail size={32} className="mx-auto mb-3 text-blue-400" />
           <h4 className="font-bold text-lg mb-1">E-Posta Gönderin</h4>
           <p className="text-slate-400 text-sm mb-4">{COMPANY_INFO.email}</p>
           <a href={`mailto:${COMPANY_INFO.email}`} className="block bg-white/10 py-3 rounded-xl font-bold text-sm active:bg-white/20 transition-colors">Mesaj Yaz</a>
        </div>
      </MobileContainer>
    </div>
  );
};

const ContactAction = ({ icon, title, desc, color, onClick, href }: any) => {
  const content = (
    <>
      <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg`}>
        {icon}
      </div>
      <div className="text-left">
        <h4 className="font-black text-slate-900 text-lg leading-none mb-1">{title}</h4>
        <p className="text-sm text-slate-400 font-bold">{desc}</p>
      </div>
      <ChevronRight size={20} className="text-slate-300 ml-auto" />
    </>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="w-full flex items-center gap-5 bg-white p-5 rounded-[1.8rem] shadow-sm border border-slate-100 active:scale-[0.98] transition-all"
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-5 bg-white p-5 rounded-[1.8rem] shadow-sm border border-slate-100 active:scale-[0.98] transition-all"
    >
      {content}
    </button>
  );
};

const BranchItem = ({ city, phone }: any) => (
  <div className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
    <div>
      <span className="block font-black text-slate-800">{city}</span>
      <span className="text-xs text-slate-400 font-bold">{phone}</span>
    </div>
    <a 
      href={`tel:${phone.replace(/\s/g, '')}`}
      className="p-2 bg-slate-50 rounded-lg text-blue-600 active:bg-blue-50 transition-colors"
    >
      <Phone size={18} />
    </a>
  </div>
);


import React from 'react';
import { MobileHeader } from '../components/MobileHeader';
import { MobileContainer } from '../components/layout/MobileContainer';
import { Shield, Briefcase, GraduationCap, Flag, Gavel, FileCheck, ChevronRight, Gem, Clock, Heart, History, UserCheck, Globe, Bike, Star } from 'lucide-react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;

const SERVICES = [
  // Residency Group
  { id: 'res-short', title: 'Kısa Dönem İkamet İzni', desc: 'TURİZM VE TİCARİ OTURUM', icon: <Clock className="text-blue-600" />, to: '/accommodation-permit/short-term' },
  { id: 'res-family', title: 'Aile İkamet İzni', desc: 'EŞ VE ÇOCUKLAR İÇİN', icon: <Heart className="text-green-600" />, to: '/accommodation-permit/family' },
  { id: 'res-student', title: 'Öğrenci İkamet İzni', desc: 'ÜNİVERSİTE VE EĞİTİM', icon: <GraduationCap className="text-indigo-600" />, to: '/student-permit' },
  { id: 'res-long', title: 'Uzun Dönem İkamet', desc: 'SÜRESİZ OTURUM HAKKI', icon: <History className="text-purple-600" />, to: '/accommodation-permit/long-term' },
  
  // Work Permit Group
  { id: 'work-temp', title: 'Süreli Çalışma İzni', desc: 'FİRMA PERSONEL İŞLEMLERİ', icon: <Briefcase className="text-orange-600" />, to: '/work-permit/temporary' },
  { id: 'work-courier', title: 'Kurye Çalışma İzni', desc: 'P1 BELGESİ VE ESNAF KURYE', icon: <Bike className="text-yellow-600" />, to: '/profession/couriers' },
  { id: 'work-independent', title: 'Bağımsız Çalışma İzni', desc: 'KENDİ İŞİNİ KURANLAR İÇİN', icon: <UserCheck className="text-blue-500" />, to: '/work-permit/independent' },
  { id: 'work-turquoise', title: 'Turkuaz Kart', desc: 'NİTELİKLİ İŞGÜCÜ STATÜSÜ', icon: <Gem className="text-teal-600" />, to: '/work-permit/turkuaz' },
  
  // Citizenship Group
  { id: 'cit-exceptional', title: 'İstisnai Vatandaşlık', desc: 'İSTİHDAM YOLUYLA BAŞVURU', icon: <Star className="text-red-500" />, to: '/citizenship/exceptional' },
  { id: 'cit-invest', title: 'Yatırımcı Vatandaşlığı', desc: '400.000$ GAYRİMENKUL YATIRIMI', icon: <Flag className="text-blue-600" />, to: '/citizenship' },
  
  // Legal
  { id: 'dep', title: 'Deport (Sınır Dışı)', desc: 'GİRİŞ YASAĞI KALDIRMA', icon: <Gavel className="text-slate-600" />, to: '/apps/deport-calculator' },
  { id: 'ins', title: 'Sağlık Sigortası', desc: 'YABANCILARA ÖZEL POLİÇE', icon: <FileCheck className="text-emerald-600" />, to: '/appointment' },
];

export const ServicesPageMobile: React.FC = () => {
  return (
    <div className="pb-32 bg-[#F2F2F7] min-h-screen">
      <MobileHeader title="HİZMETLERİMİZ" showBack={true} />
      
      <MobileContainer>
        <div className="flex flex-col gap-3">
          {SERVICES.map((s) => (
            <Link 
              key={s.id} 
              to={s.to} 
              className="flex items-center gap-5 bg-white p-5 rounded-[1.8rem] shadow-sm border border-slate-50 active:bg-slate-50 active:scale-[0.98] transition-all"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                {React.cloneElement(s.icon as React.ReactElement<any>, { size: 26 })}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-base leading-none mb-1">{s.title}</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{s.desc}</p>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm mt-4 text-center">
           <p className="text-slate-500 text-sm mb-4">Hangi hizmetin size uygun olduğundan emin değil misiniz?</p>
           <Link to="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-sm">Uzmanımıza Sorun</Link>
        </div>
      </MobileContainer>
    </div>
  );
};

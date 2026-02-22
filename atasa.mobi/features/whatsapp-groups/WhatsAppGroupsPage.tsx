import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  ShoppingBag, 
  GraduationCap, 
  Briefcase, 
  Home, 
  MessageSquare, 
  ArrowLeft, 
  ChevronRight,
  ShieldCheck,
  Users,
  Zap,
  Info,
  // Fix: Added missing BadgeCheck import from lucide-react
  BadgeCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../common/SEO';

const WHATSAPP_GROUPS = [
  {
    name: "Atasa Soru & Sohbet Grubu",
    description: "Genel sorularınız ve diğer üyelerle bilgi paylaşımı için ana topluluk grubu.",
    link: "https://chat.whatsapp.com/H0tzfrJV0lzHAEfV3JLyqs",
    icon: <MessageSquare size={32} />,
    color: "from-blue-500 to-blue-700",
    badge: "ANA GRUP"
  },
  {
    name: "Atasa İş Fırsatları Grubu",
    description: "Yabancılar için güncel iş ilanları ve çalışma fırsatlarının paylaşıldığı platform.",
    link: "https://chat.whatsapp.com/BpA1z6F3bhQHzDD5I953Rz",
    icon: <Briefcase size={32} />,
    color: "from-orange-500 to-orange-700",
    badge: "KARİYER"
  },
  {
    name: "Atasa Ev Bul – Paylaş – Yerleş",
    description: "Kiralık daire, oda arkadaşı arama ve konaklama çözümleri için yardımlaşma grubu.",
    link: "https://chat.whatsapp.com/KImYPVIGeAE9BuNT74CRjs",
    icon: <Home size={32} />,
    color: "from-emerald-500 to-emerald-700",
    badge: "KONAKLAMA"
  },
  {
    name: "Atasa Education | Öğrenci Destek",
    description: "Üniversite kayıtları, denklik ve öğrenci ikameti hakkında akademik destek topluluğu.",
    link: "https://chat.whatsapp.com/Bihp72RyuSu2MhysUvab3w",
    icon: <GraduationCap size={32} />,
    color: "from-indigo-500 to-indigo-700",
    badge: "EĞİTİM"
  },
  {
    name: "Alım-Satım / İlan Grubu",
    description: "İkinci el eşya, araç ve her türlü ilan paylaşımı için güvenli ticaret alanı.",
    link: "https://chat.whatsapp.com/CefiAuMXveM08J04pQsoUl",
    icon: <ShoppingBag size={32} />,
    color: "from-amber-500 to-amber-700",
    badge: "İLAN"
  }
];

export const WhatsAppGroupsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      <SEO 
        title="WhatsApp Gruplarımız"
        description="Atasa Danışmanlık topluluk gruplarına katılın. İş fırsatları, konaklama, eğitim ve sohbet gruplarımızda yabancılar için yardımlaşma platformu."
      />
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-green-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-green-600 mb-6 shadow-2xl border border-slate-100 transform rotate-3"
          >
             <MessageCircle size={40} fill="currentColor" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
            Topluluğumuza <br/> <span className="text-green-600">Katılın</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            İhtiyacınız olan alandaki yardımlaşma grubuna katılın, binlerce üyemizle bilgi paylaşımında bulunun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {WHATSAPP_GROUPS.map((group, idx) => (
            <motion.a
              key={group.name}
              href={group.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${group.color} opacity-[0.03] rounded-bl-full transition-all group-hover:opacity-[0.08] group-hover:scale-110`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${group.color} transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                      {group.icon}
                   </div>
                   <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200 group-hover:bg-green-100 group-hover:text-green-700 group-hover:border-green-200 transition-colors">
                      {group.badge}
                   </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-green-600 transition-colors tracking-tight">
                  {group.name}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed font-medium flex-grow mb-8">
                  {group.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-[0.2em]">
                    <Zap size={14} fill="currentColor" /> GRUBA KATIL
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-green-500 group-hover:text-white transition-all shadow-sm">
                    <ChevronRight size={20} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-20 p-10 md:p-16 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-3xl border border-white/5">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-24 h-24 bg-green-500/20 rounded-[2rem] flex items-center justify-center border border-green-500/30 shrink-0 shadow-inner">
                 <ShieldCheck size={48} className="text-green-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h3 className="text-3xl font-black mb-4 tracking-tight">Güvenli ve Seviyeli Topluluk</h3>
                 <p className="text-slate-400 text-lg leading-relaxed font-medium">
                   Tüm gruplarımız yönetici onaylı ve moderasyonludur. Reklam, taciz veya spam içeriklere izin verilmez. Amacımız Türkiye'deki yabancı misafirlerimize en doğru bilgiyi ulaştırmaktır.
                 </p>
                 <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                       <Users size={18} /> 50.000+ Üye
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                       <BadgeCheck size={18} /> Resmi Moderasyon
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-12 p-6 bg-slate-200/30 rounded-[2rem] border border-slate-200 flex gap-4 text-slate-500">
           <Info className="shrink-0 text-blue-500" size={24} />
           <p className="text-xs font-bold leading-relaxed">
             <strong>Bilgi:</strong> Gruplarda paylaşılan bilgiler kullanıcı deneyimlerine dayanmaktadır. Resmi işlemleriniz için her zaman <strong>Atasa Danışmanlık</strong> uzmanlarından profesyonel destek almanız önerilir.
           </p>
        </div>

      </div>
    </div>
  );
};
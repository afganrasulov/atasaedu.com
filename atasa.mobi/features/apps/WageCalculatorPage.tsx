import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Briefcase, 
  ArrowLeft, 
  Info, 
  Wallet, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp,
  ChevronRight,
  MessageCircle,
  Banknote,
  Star,
  Users,
  BadgeCheck
} from 'lucide-react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

interface WageRole {
  id: string;
  label: string;
  multiplier: number;
  description: string;
  gross: number;
  net: number;
  sgk: number;
  total: number;
}

// 2026 Yılı Unvana Göre Güncel Veriler
const ROLES: WageRole[] = [
  { 
    id: 'domestic', 
    label: 'Ev Hizmetleri / Diğer Meslekler', 
    multiplier: 1, 
    gross: 33030.00,
    net: 28075.50,
    sgk: 13387.00,
    total: 45417.00,
    description: 'Asgari ücretin 1 katı' 
  },
  { 
    id: 'expert', 
    label: 'Uzmanlık / Ustalık / Turizm', 
    multiplier: 2, 
    gross: 66060.00,
    net: 56151.00,
    sgk: 25773.00,
    total: 90833.00,
    description: 'Asgari ücretin 2 katı' 
  },
  { 
    id: 'manager', 
    label: 'Diğer Yöneticiler', 
    multiplier: 3, 
    gross: 99090.00,
    net: 84226.50,
    sgk: 38159.00,
    total: 136249.00,
    description: 'Asgari ücretin 3 katı' 
  },
  { 
    id: 'engineer', 
    label: 'Mühendis / Mimar', 
    multiplier: 4, 
    gross: 132120.00,
    net: 112302.00,
    sgk: 50546.00,
    total: 181666.00,
    description: 'Asgari ücretin 4 katı' 
  },
  { 
    id: 'senior', 
    label: 'Üst Düzey Yönetici / Pilot', 
    multiplier: 5, 
    gross: 165150.00,
    net: 140377.50,
    sgk: 62993.00,
    total: 227143.00,
    description: 'Asgari ücretin 5 katı' 
  }
];

export const WageCalculatorPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [selectedRoleId, setSelectedRoleId] = useState<string>(ROLES[0].id);

  const selectedRole = useMemo(() => 
    ROLES.find(r => r.id === selectedRoleId) || ROLES[0]
  , [selectedRoleId]);

  const calculations = useMemo(() => {
    return {
      gross: selectedRole.gross,
      net: selectedRole.net,
      sgk: selectedRole.sgk,
      totalCost: selectedRole.total
    };
  }, [selectedRole]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('tr-TR', { 
        style: 'currency', 
        currency: 'TRY',
        minimumFractionDigits: 2 
    }).format(val);

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Navigation */}
        <div className="mb-4 md:mb-12 flex justify-center lg:justify-start">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest">
            <ArrowLeft size={16} /> Uygulamalar
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-4xl md:text-7xl font-black text-[#0f172a] mb-6 tracking-tighter leading-none">
            Yabancı Sigorta Primi <br/> <span className="text-blue-600">Hesaplama</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            2026 yılı güncel verilerine ve Bakanlık unvan katsayılarına göre ödenmesi gereken yasal asgari ücretler.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Role Selection - Left */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-6">PERSONEL UNVANI</h3>
            <div className="space-y-3">
                {ROLES.map((role) => (
                <button
                    key={role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`w-full text-left p-6 rounded-[1.5rem] border-2 transition-all duration-300 group relative ${
                    selectedRoleId === role.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200 scale-105 z-10' 
                        : 'bg-white border-transparent text-slate-600 hover:border-blue-100 shadow-sm hover:shadow-md'
                    }`}
                >
                    <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                        <h4 className="font-bold text-lg leading-tight mb-1">{role.label}</h4>
                        <div className="flex items-center gap-2">
                           <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${selectedRoleId === role.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                             {role.multiplier} KAT
                           </span>
                           <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedRoleId === role.id ? 'text-blue-100' : 'text-slate-400'}`}>
                            {role.description}
                           </p>
                        </div>
                    </div>
                    <ChevronRight size={18} className={`${selectedRoleId === role.id ? 'text-white' : 'text-slate-200'} group-hover:translate-x-1 transition-transform`} />
                    </div>
                </button>
                ))}
            </div>
          </div>

          {/* Result Card - Right */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col">
              
              <div className="p-10 md:p-14 flex-grow">
                {/* Card Title */}
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                    <Wallet size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">2026 Yasal Ücret Tablosu</h3>
                </div>

                {/* Values List */}
                <div className="space-y-8">
                  <div className="flex justify-between items-end border-b border-slate-50 pb-6">
                    <div className="flex flex-col">
                       <span className="text-slate-400 font-bold text-lg">Aylık Brüt Maaş (Taban)</span>
                       <span className="text-[10px] text-slate-300 uppercase font-black tracking-widest mt-1">Seçilen Kategori: {selectedRole.multiplier} Kat</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-black text-[#0f172a]">{formatCurrency(calculations.gross)}</span>
                  </div>
                  
                  <div className="flex justify-between items-end border-b border-slate-50 pb-6">
                    <span className="text-slate-400 font-bold text-lg">Aylık Net Ele Geçen</span>
                    <span className="text-3xl md:text-4xl font-black text-emerald-500">{formatCurrency(calculations.net)}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                    <div className="flex flex-col">
                       <span className="text-slate-400 font-bold text-lg">Tahmini SGK Primi</span>
                       <span className="text-[10px] text-slate-300 uppercase font-black tracking-widest mt-1">İşveren Maliyeti</span>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-orange-500 border-2 border-orange-500 px-4 py-2 rounded-xl inline-block">
                            {formatCurrency(calculations.sgk)}
                        </div>
                        <p className="text-[10px] text-orange-400 font-bold mt-2 uppercase tracking-tighter">Teşvik İndirimleri Dahildir</p>
                    </div>
                  </div>

                  {/* Total Result Box */}
                  <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white mt-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                       <TrendingUp size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="text-center md:text-left">
                        <span className="block text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-2">TOPLAM MALİYET</span>
                        <span className="text-4xl md:text-5xl font-black tracking-tighter">{formatCurrency(calculations.totalCost)}</span>
                      </div>
                      <div className="text-right text-[10px] text-slate-400 font-black leading-relaxed max-w-[150px] uppercase border-l border-white/10 pl-6">
                        BRÜT MAAŞ + SGK PRİMİ TOPLAMIDIR.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Section */}
              <div className="p-10 bg-blue-50/50 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
                <p className="text-blue-900 font-black text-lg max-w-sm text-center md:text-left leading-tight">
                  Bu çalışma izni seviyesi için profesyonel başvuru desteği alın.
                </p>
                <button 
                  onClick={openWhatsApp}
                  className="bg-[#0f172a] text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl active:scale-95 group"
                >
                  <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" /> Uzmana Sorun
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Informational Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                 <AlertTriangle size={32} />
              </div>
              <h4 className="text-2xl font-black text-[#0f172a] mb-4">Unvan Katsayı Kuralı</h4>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Bakanlık kriterlerine göre; mühendis, uzman veya yönetici olarak başvuran yabancıların asgari ücretin belirtilen katlarını alması zorunludur.
              </p>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                 <BadgeCheck size={32} />
              </div>
              <h4 className="text-2xl font-black text-[#0f172a] mb-4">SGK Teşviki</h4>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Sigorta borcu bulunmayan işverenler için uygulanan yasal hazine teşvik indirimleri hesaplamaya dahil edilmiştir.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};
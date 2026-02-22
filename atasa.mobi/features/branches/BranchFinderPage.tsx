
import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Building2, ArrowRight, Globe, Clock, ShieldCheck } from 'lucide-react';

const BRANCHES = [
  {
    id: 'istanbul',
    city: 'İstanbul',
    country: 'Türkiye',
    flag: '🇹🇷',
    address: 'Mecidiyeköy mah. Raşit Rıza sk. Ahmet Esin İş Merkezi NO:4 K:2 D:7 Şişli/İstanbul',
    phone: '+90 850 308 69 98',
    mapQuery: 'Mecidiyeköy mah. Raşit Rıza sk. Ahmet Esin İş Merkezi NO:4 Şişli İstanbul',
    googleMapsUrl: 'https://www.google.com/maps/place/Atasa+Dan%C4%B1%C5%9Fmanl%C4%B1k+Hizmetleri+LTD.+%C5%9ET%C4%B0./@41.067297,28.9998846,17z/data=!4m6!3m5!1s0x14cab746724d84fd:0x1f99dbde2ff1d769!8m2!3d41.0672466!4d28.9998853!16s%2Fg%2F11rfcycng9',
    theme: 'from-red-600 to-red-800', // Türkiye Kırmızısı
    shadow: 'shadow-red-200',
    hours: '09:00 - 18:00'
  },
  {
    id: 'askabat',
    city: 'Aşkabat',
    country: 'Türkmenistan',
    flag: '🇹🇲',
    address: 'Berkararlyk etrap / G.Kuliyev köçe/ Beyençli N70, Gat 3 309, Ashgabat',
    phone: '+993 637 816 52',
    mapQuery: 'G.Kuliyev köçe Beyençli N70 Ashgabat Turkmenistan',
    theme: 'from-green-600 to-green-800', // Türkmenistan Yeşili
    shadow: 'shadow-green-200',
    hours: '09:00 - 18:00'
  },
  {
    id: 'baku',
    city: 'Bakü',
    country: 'Azerbaycan',
    flag: '🇦🇿',
    address: 'Tivi Plaza, Əhməd Rəcəbli Küçəsi, 1/10 Nəriman Nərimanov, Baku 1006',
    phone: '+994 51 823 44 10',
    mapQuery: 'Tivi Plaza Ahmad Rajabli Baku Azerbaijan',
    theme: 'from-blue-600 to-cyan-700', // Azerbaycan Mavisi/Turkuazı
    shadow: 'shadow-blue-200',
    hours: '09:00 - 18:00'
  }
];

export const BranchFinderPage: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<typeof BRANCHES[0] | null>(null);

  const handleSelect = (branch: typeof BRANCHES[0]) => {
    setSelectedBranch(branch);
    setTimeout(() => {
      document.getElementById('branch-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-6 md:pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-slate-900 mb-3 md:mb-6 shadow-xl border border-slate-100 transform rotate-3 hover:rotate-0 transition-transform duration-300">
             <MapPin size={40} className="text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Size En Yakın Şube</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            İşlem yapmak istediğiniz ülkeyi seçin, iletişim bilgilerine anında ulaşın.
          </p>
        </div>

        {/* City Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BRANCHES.map((branch) => (
            <button
              key={branch.id}
              onClick={() => handleSelect(branch)}
              className={`relative overflow-hidden rounded-[2rem] p-8 text-left transition-all duration-300 group ${
                selectedBranch?.id === branch.id 
                  ? `bg-gradient-to-br ${branch.theme} text-white shadow-2xl scale-105 z-10 ring-4 ring-white` 
                  : 'bg-white text-slate-900 hover:border-blue-200 shadow-lg hover:shadow-xl border border-white'
              }`}
            >
              {/* Background Decor used as Abstract Art */}
              <span className="absolute -right-4 -bottom-4 text-9xl opacity-10 filter blur-sm select-none group-hover:scale-110 transition-transform duration-500">
                {branch.flag}
              </span>

              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="flex justify-between items-start">
                   <span className="text-5xl filter drop-shadow-sm">{branch.flag}</span>
                   {selectedBranch?.id === branch.id && (
                     <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                       <CheckCircleIcon size={24} className="text-white" />
                     </div>
                   )}
                </div>
                
                <div>
                  <h3 className="text-2xl font-black mb-1">
                    {branch.city}
                  </h3>
                  <p className={`text-sm font-bold uppercase tracking-wider ${selectedBranch?.id === branch.id ? 'text-white/80' : 'text-slate-400'}`}>
                    {branch.country}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail View */}
        {selectedBranch && (
          <div id="branch-details" className="animate-in slide-in-from-bottom-8 duration-700 fade-in">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
              
              {/* Modern Gradient Header (No Image) */}
              <div className={`relative p-10 md:p-16 bg-gradient-to-br ${selectedBranch.theme} text-white overflow-hidden`}>
                
                {/* Abstract Circles Background */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black opacity-10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-2 text-white/80 font-bold mb-4 uppercase tracking-widest text-xs">
                      <Building2 size={14} />
                      Atasa Danışmanlık
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">{selectedBranch.city} Ofisi</h2>
                    
                    {/* Header Address (Optional - Can remove if redundant, but looks good in header too) */}
                    <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 mb-6">
                        <MapPin className="shrink-0 mt-1" size={24} />
                        <p className="text-lg font-medium leading-relaxed opacity-95">
                          {selectedBranch.address}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold border border-white/10">
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        Şu an Açık
                      </div>
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full font-medium text-white/90 border border-white/5">
                        <Clock size={16} />
                        {selectedBranch.hours}
                      </div>
                    </div>
                  </div>

                  {/* Giant Faded Flag/Icon */}
                  <div className="hidden md:block opacity-20 transform translate-x-4 translate-y-4">
                     <span className="text-[8rem] leading-none select-none grayscale contrast-200 mix-blend-overlay">{selectedBranch.flag}</span>
                  </div>
                </div>
              </div>

              {/* Info Content */}
              <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                <div className="space-y-8">
                  {/* Phone & Address Card (Combined) */}
                  <div className={`p-1 rounded-[2rem] bg-gradient-to-br ${selectedBranch.theme} opacity-90`}>
                    <div className="bg-white p-6 rounded-[1.8rem] h-full flex flex-col justify-between">
                      
                      {/* Phone Section */}
                      <div>
                        <div className="flex items-center gap-3 text-slate-400 mb-2 font-bold text-sm uppercase tracking-wide">
                          <Phone size={18} />
                          İletişim Hattı
                        </div>
                        <a href={`tel:${selectedBranch.phone.replace(/\s/g, '')}`} className="block text-3xl md:text-4xl font-black text-slate-900 hover:text-blue-600 transition-colors">
                          {selectedBranch.phone}
                        </a>
                        <p className="text-slate-500 mt-2 text-sm">Hemen aramak için numaraya tıklayın.</p>
                      </div>

                      {/* Address Section (Added Here) */}
                      <div className="mt-8 pt-6 border-t border-slate-100">
                         <div className="flex items-center gap-3 text-slate-400 mb-3 font-bold text-sm uppercase tracking-wide">
                            <MapPin size={18} />
                            Adres Bilgisi
                         </div>
                         <p className="text-lg font-medium text-slate-800 leading-relaxed">
                            {selectedBranch.address}
                         </p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Map Action */}
                <div className="flex flex-col justify-center gap-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-200 text-center">
                   <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg text-blue-500 mb-2">
                      <Navigation size={40} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Yol Tarifi Alın</h3>
                      <p className="text-slate-600">
                        Ofisimize gelmek için harita uygulamanızı kullanın.
                      </p>
                   </div>
                   
                   <a 
                     href={
                       (selectedBranch as any).googleMapsUrl 
                         ? (selectedBranch as any).googleMapsUrl 
                         : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBranch.mapQuery)}`
                     }
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-bold text-xl shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 w-full`}
                   >
                     <Globe size={24} />
                     Haritada Aç
                   </a>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Helper Icon
const CheckCircleIcon = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

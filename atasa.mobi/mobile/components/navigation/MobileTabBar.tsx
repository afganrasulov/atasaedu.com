
import React from 'react';
import * as Router from 'react-router-dom';
const { Link, useLocation } = Router as any;
import { Home, Grid, Plus, Sparkles, Zap, CalendarDays } from 'lucide-react';

export const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }: any) => {
    const active = isActive(to);
    return (
      <Link 
        to={to} 
        className="group flex flex-col items-center justify-center flex-1 h-full relative"
      >
        {/* Active Glow Effect */}
        {active && (
          <div className="absolute top-2 w-10 h-10 bg-blue-500/10 rounded-full blur-md"></div>
        )}

        <div className={`relative transition-all duration-300 transform ${active ? 'text-blue-600 -translate-y-1' : 'text-slate-400 group-active:scale-90'}`}>
          <Icon 
            size={24} 
            strokeWidth={active ? 2.5 : 2} 
            className={`transition-all ${active ? 'drop-shadow-sm' : ''}`}
          />
        </div>
        
        <span className={`text-[10px] font-bold mt-1 transition-colors duration-300 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
          {label}
        </span>
        
        {/* Active Indicator Dot */}
        {active && (
          <div className="absolute bottom-2 w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
        )}
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[50]">
      {/* Main Glass Bar */}
      <div className="h-[calc(76px+env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_30px_rgba(0,0,0,0.04)] flex items-start px-2 pt-2 pb-[env(safe-area-inset-bottom)] relative">
        
        <NavItem to="/" icon={Home} label="Ana Sayfa" />
        <NavItem to="/services" icon={Grid} label="Hizmetler" />
        
        {/* Premium Floating Action Button (FAB) - Artık Uygulamalar/Araçlar İçin */}
        <div className="relative -top-10 mx-2 flex flex-col items-center z-10">
           <Link 
             to="/apps" 
             className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(37,99,235,0.4)] border-[6px] border-[#F0F4F8] active:scale-95 transition-transform bg-gradient-to-b from-blue-600 to-blue-700 overflow-hidden relative group"
             aria-label="Uygulamalar"
           >
              {/* Shine/Gloss Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <Sparkles size={34} strokeWidth={2.5} className="drop-shadow-md" />
           </Link>
           <span className="text-[10px] font-black text-slate-600 tracking-tight mt-2 bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm border border-slate-100/50 uppercase">
             Araçlar
           </span>
        </div>
        
        <NavItem to="/appointment" icon={CalendarDays} label="Randevu" />
        <NavItem to="/blog/shorts" icon={Zap} label="Haberler" />
        
      </div>
    </div>
  );
};

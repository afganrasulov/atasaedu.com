import React from 'react';
import { Home, LayoutGrid, Heart, User, MapPin } from 'lucide-react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link, useLocation } = Router as any;

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] tab-bar-glass flex justify-around items-center pt-3 pb-safe-bottom">
      <Link to="/" className="flex flex-col items-center gap-1 group">
        <div className={`p-2 rounded-2xl transition-colors ${isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-slate-400'}`}>
          <Home size={24} fill={isActive('/') ? 'currentColor' : 'none'} />
        </div>
        <span className={`text-[10px] font-bold ${isActive('/') ? 'text-blue-700' : 'text-slate-400'}`}>Ana Sayfa</span>
      </Link>

      <Link to="/services" className="flex flex-col items-center gap-1 group">
        <div className={`p-2 rounded-2xl transition-colors ${isActive('/services') ? 'bg-blue-100 text-blue-700' : 'text-slate-400'}`}>
          <LayoutGrid size={24} />
        </div>
        <span className={`text-[10px] font-bold ${isActive('/services') ? 'text-blue-700' : 'text-slate-400'}`}>Menü</span>
      </Link>

      <div className="relative -top-4">
        <Link to="/appointment" className="w-14 h-14 bg-[#0047BB] text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white active:scale-90 transition-transform">
          <Heart size={28} fill="white" />
        </Link>
        <span className="absolute top-16 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-700 whitespace-nowrap">Randevu</span>
      </div>

      <Link to="/apps" className="flex flex-col items-center gap-1 group">
        <div className={`p-2 rounded-2xl transition-colors ${isActive('/apps') ? 'bg-blue-100 text-blue-700' : 'text-slate-400'}`}>
          <MapPin size={24} />
        </div>
        <span className={`text-[10px] font-bold ${isActive('/apps') ? 'text-blue-700' : 'text-slate-400'}`}>Araçlar</span>
      </Link>

      <Link to="/contact" className="flex flex-col items-center gap-1 group">
        <div className={`p-2 rounded-2xl transition-colors ${isActive('/contact') ? 'bg-blue-100 text-blue-700' : 'text-slate-400'}`}>
          <User size={24} />
        </div>
        <span className={`text-[10px] font-bold ${isActive('/contact') ? 'text-blue-700' : 'text-slate-400'}`}>İletişim</span>
      </Link>
    </nav>
  );
};
import React from 'react';
import { Headset, Bell, ChevronLeft } from 'lucide-react';
import { Logo } from '../../features/common/Logo';
import * as Router from 'react-router-dom';
const { useNavigate, Link } = Router as any;

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-xl text-slate-900 pt-[calc(env(safe-area-inset-top)+4px)] pb-1.5 px-5 border-b border-slate-100 sticky top-0 z-50 transition-all duration-200">
      <div className="flex justify-between items-center min-h-[48px]">
        {showBack ? (
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-slate-100 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="Geri Dön"
          >
            <ChevronLeft size={24} className="text-slate-700" />
          </button>
        ) : (
          <Link to="/contact" className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-blue-50 text-blue-600 flex items-center justify-center active:scale-90 transition-transform border border-blue-100 shadow-sm" aria-label="İletişim">
            <Headset size={20} />
          </Link>
        )}
        
        <div className="flex flex-col items-center">
          {title ? (
            <h1 className="font-black text-sm tracking-widest uppercase text-slate-800">{title}</h1>
          ) : (
            <Link to="/" className="flex items-center">
              {/* Specialized Mobile Logo adjusted to w-24 h-8 */}
              <Logo className="w-24 h-8" />
            </Link>
          )}
        </div>

        <Link to="/blog/shorts" className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-slate-100 flex items-center justify-center relative active:scale-90 transition-transform" aria-label="Bildirimler">
          <Bell size={20} className="text-slate-700" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Link>
      </div>
    </header>
  );
};
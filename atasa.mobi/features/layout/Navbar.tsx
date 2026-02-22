import React, { useState } from 'react';
import * as Router from 'react-router-dom';
const { useNavigate, useLocation } = Router as any;
import { Menu, X, Grid, Phone, Building2 } from 'lucide-react';
import { Logo } from '../common/Logo';
import { COMPANY_INFO } from '../../constants';
import { SmartLink } from '../common/SmartLink';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    const baseClass = "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out flex items-center gap-1.5";
    if (isActive) return `${baseClass} text-slate-900 bg-white shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] font-bold scale-105`;
    return `${baseClass} text-slate-500 hover:text-slate-900 hover:bg-white/50 hover:scale-105`;
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl hidden md:block">
        <nav aria-label="Ana Navigasyon" className="rounded-full px-6 py-1 flex justify-between items-center bg-white/75 backdrop-blur-3xl border border-white/50 shadow-2xl shadow-slate-400/10 transition-all duration-500 hover:shadow-slate-400/20">
          <SmartLink to="/" className="flex items-center group" aria-label="Ana Sayfa">
             <div className="relative group-hover:scale-105 transition-transform duration-500 ease-out">
                <div className="absolute inset-0 bg-blue-400/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Logo className="w-32 h-10 relative z-10 drop-shadow-sm" />
             </div>
          </SmartLink>

          <div className="flex items-center gap-1 bg-slate-100/40 p-1 rounded-full border border-white/40">
            <SmartLink to="/" className={getLinkClass('/')}>Ana Sayfa</SmartLink>
            <SmartLink to="/services" className={getLinkClass('/services')}>Hizmetlerimiz</SmartLink>
            <SmartLink to="/references" className={getLinkClass('/references')}>
               <Building2 size={15} className={location.pathname === '/references' ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"} aria-hidden="true" /> 
               Referanslar
            </SmartLink>
            <SmartLink to="/apps" className={getLinkClass('/apps')}>
               <Grid size={15} className={location.pathname.startsWith('/apps') ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"} aria-hidden="true" /> 
               Uygulamalar
            </SmartLink>
            <SmartLink to="/contact" className={getLinkClass('/contact')}>İletişim</SmartLink>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden lg:flex flex-col items-end text-right">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">DESTEK HATTI</span>
                <span className="text-xs font-black text-slate-800 font-mono">{COMPANY_INFO.phone}</span>
             </div>
             <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} aria-label={`Bizi arayın: ${COMPANY_INFO.phone}`} className="group relative px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-95">
               <Phone size={16} className="fill-current" aria-hidden="true" />
               <span>Hemen Ara</span>
             </a>
          </div>
        </nav>
      </div>

      <div className="md:hidden fixed top-0 w-full z-50 bg-white/90 backdrop-blur-2xl border-b border-slate-100 px-4 py-1.5 flex justify-between items-center shadow-sm">
          <SmartLink to="/" className="flex items-center" aria-label="Ana Sayfa">
             <Logo className="w-24 h-8" />
          </SmartLink>
          <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Menüyü Aç/Kapat" className="p-2 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 active:scale-95 transition-transform">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-300">
          <SmartLink to="/" onClick={() => setIsOpen(false)} className="text-2xl font-black text-slate-900 active:scale-95 transition-transform">Ana Sayfa</SmartLink>
          <SmartLink to="/services" onClick={() => setIsOpen(false)} className="text-2xl font-black text-slate-900 active:scale-95 transition-transform">Hizmetlerimiz</SmartLink>
          <SmartLink to="/about" onClick={() => setIsOpen(false)} className="text-2xl font-black text-slate-900 active:scale-95 transition-transform">Biz Kimiz</SmartLink>
          <SmartLink to="/references" onClick={() => setIsOpen(false)} className="text-2xl font-black text-slate-900 active:scale-95 transition-transform">Referanslar</SmartLink>
          <SmartLink to="/apps" onClick={() => setIsOpen(false)} className="text-2xl font-black text-slate-900 flex items-center gap-2 active:scale-95 transition-transform"><Grid size={28} aria-hidden="true" /> Uygulamalar</SmartLink>
          <SmartLink to="/contact" onClick={() => setIsOpen(false)} className="text-2xl font-black text-slate-900 active:scale-95 transition-transform">İletişim</SmartLink>
          <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} aria-label="Hemen Arayın" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xl flex items-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-600/20">
            <Phone size={24} fill="currentColor" aria-hidden="true" /> Hemen Ara
          </a>
        </div>
      )}
    </>
  );
};
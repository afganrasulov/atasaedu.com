
import React, { useState } from 'react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { Menu, X, Phone, Globe } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span>{COMPANY_INFO.hours.weekday}</span>
            <span className="text-gray-400">|</span>
            <span>{COMPANY_INFO.email}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1"><Phone size={12} /> {COMPANY_INFO.phone}</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-300"><Globe size={12} /> TR</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
            <Link to="/services" className="hover:text-blue-600 transition-colors">Hizmetlerimiz</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">Biz Kimiz</Link>
            <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">İletişim</Link>
          </div>

          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-blue-600/20">
              Randevu Al
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-800">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg absolute w-full">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 font-medium border-b">Ana Sayfa</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 font-medium border-b">Hizmetlerimiz</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 font-medium border-b">Biz Kimiz</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 font-medium border-b">Blog</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 font-medium border-b">İletişim</Link>
          <Link to="/apps" onClick={() => setIsOpen(false)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-2 text-center">
            Uygulamalar
          </Link>
        </div>
      )}
    </nav>
  );
};

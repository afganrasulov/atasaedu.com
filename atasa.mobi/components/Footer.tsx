import React from 'react';
import { COMPANY_INFO } from '../constants';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4 flex items-center gap-2">
               <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>
               ATASA
            </div>
            <p className="text-slate-400 mb-6 text-sm">
              Türkiye'de yabancılara yönelik ikamet ve çalışma izni danışmanlığı sunar. Güvenilir ve etkili hizmet için bize ulaşın.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-l-4 border-blue-500 pl-3">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="#" className="hover:text-blue-400">Ana Sayfa</a></li>
              <li><a href="#" className="hover:text-blue-400">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-blue-400">Hizmetlerimiz</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400">İletişim</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-l-4 border-blue-500 pl-3">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="#" className="hover:text-blue-400">İkamet İzni</a></li>
              <li><a href="#" className="hover:text-blue-400">Çalışma İzni</a></li>
              <li><a href="#" className="hover:text-blue-400">Öğrenci İşlemleri</a></li>
              <li><a href="#" className="hover:text-blue-400">Vatandaşlık</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-l-4 border-blue-500 pl-3">İletişim</h3>
            <div className="space-y-4 text-slate-300 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="shrink-0 text-blue-500" size={18} />
                <p>{COMPANY_INFO.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="shrink-0 text-blue-500" size={18} />
                <p>{COMPANY_INFO.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="shrink-0 text-blue-500" size={18} />
                <p>{COMPANY_INFO.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2025 Atasa Danışmanlık. Tüm hakları saklıdır.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">KVKK</a>
            <a href="#" className="hover:text-white">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { 
  Phone, Mail, MapPin, Youtube, Settings, Instagram, Facebook, Users, 
  ArrowRight, ShieldAlert, Gavel, History, Calendar, BookOpen, 
  Landmark, ShieldCheck, Wallet, Banknote, PlaneLanding, Globe, 
  PlaneTakeoff, GraduationCap, CreditCard, Files, Calculator, Scale, LayoutGrid
} from 'lucide-react';
import { COMPANY_INFO } from '../../constants';
import { useCookieConsent } from '../legal/CookieConsent';

const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer: React.FC = () => {
  const { openModal } = useCookieConsent();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5 font-sans">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center mb-6">
               <span className="text-xl font-bold text-white tracking-tight">Atasa Danışmanlık</span>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Türkiye'de yaşayan yabancılar için profesyonel ikamet, çalışma izni ve vatandaşlık danışmanlığı. Güvenilir ve hızlı çözüm ortağınız.
            </p>

            <Link 
              to="/about" 
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 mb-8 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                <Users size={20} aria-hidden="true" /> 
              </div>
              <div>
                <div className="text-white font-bold text-sm flex items-center gap-1">
                  Biz Kimiz? <ArrowRight size={12} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-400" aria-hidden="true" />
                </div>
                <div className="text-slate-500 text-xs group-hover:text-slate-400">Hikayemizi ve ekibimizi tanıyın</div>
              </div>
            </Link>

            <div className="space-y-3 mb-8">
                
                <a 
                  href="https://www.youtube.com/@atasa_tr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Atasa YouTube Kanalı"
                  className="flex items-center justify-between bg-slate-900 border border-slate-800/60 rounded-xl p-4 hover:bg-slate-800/80 hover:border-red-900/30 transition-all group"
                >
                   <div>
                      <div className="text-white font-bold text-lg leading-none mb-1">100.000+</div>
                      <div className="text-xs text-slate-500 group-hover:text-red-400 transition-colors font-medium">YouTube Takipçisi</div>
                   </div>
                   <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                      <Youtube size={16} className="text-slate-600 group-hover:text-red-500 transition-colors" aria-hidden="true" />
                   </div>
                </a>

                <div className="flex items-center justify-between bg-slate-900 border border-slate-800/60 rounded-xl p-4 hover:bg-slate-800/80 hover:border-blue-900/30 transition-all group cursor-default">
                   <div>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-white font-bold text-lg leading-none">Google</span>
                        <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white uppercase tracking-wider">Partner</span>
                      </div>
                      <div className="text-xs text-slate-500 group-hover:text-blue-400 transition-colors font-medium">Resmi İş Ortağı</div>
                   </div>
                   <div className="flex gap-1" aria-hidden="true">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4] animate-pulse"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335] animate-pulse delay-75"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC05] animate-pulse delay-150"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse delay-300"></div>
                   </div>
                </div>

            </div>

            <div className="flex gap-3">
               <SocialButton href="https://www.youtube.com/@atasa_tr" ariaLabel="YouTube" color="hover:bg-red-600 hover:border-red-600 hover:text-white">
                  <Youtube size={20} aria-hidden="true" />
               </SocialButton>
               <SocialButton href="https://www.instagram.com/atasa_tr/" ariaLabel="Instagram" color="hover:bg-pink-600 hover:border-pink-600 hover:text-white">
                  <Instagram size={20} aria-hidden="true" />
               </SocialButton>
               <SocialButton href="https://www.tiktok.com/@atasa_tr" ariaLabel="TikTok" color="hover:bg-cyan-950 hover:border-cyan-500 hover:text-cyan-400">
                  <TikTokIcon size={20} aria-hidden="true" />
               </SocialButton>
               <SocialButton href="https://www.facebook.com/atasa.consultancy" ariaLabel="Facebook" color="hover:bg-blue-600 hover:border-blue-600 hover:text-white">
                  <Facebook size={20} aria-hidden="true" />
               </SocialButton>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-orange-500 pl-3">Dijital Araçlar</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/apps/student-age-checker" className="hover:text-orange-400 transition-all flex items-center gap-2 group font-medium text-orange-500">
                  <GraduationCap size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Eğitim Yaş Uygunluğu
                </Link>
              </li>
              <li>
                <Link to="/apps/passport-index" className="hover:text-amber-400 transition-all flex items-center gap-2 group font-medium text-amber-500">
                  <Globe size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Dünya Pasaport Endeksi
                </Link>
              </li>
              <li>
                <Link to="/apps/passport-check" className="hover:text-blue-400 transition-all flex items-center gap-2 group font-medium">
                  <CreditCard size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Pasaport Süre Kontrolü
                </Link>
              </li>
              <li>
                <Link to="/apps/dual-citizenship" className="hover:text-indigo-400 transition-all flex items-center gap-2 group font-medium text-indigo-500">
                  <Files size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Çifte Vatandaşlık Kontrolü
                </Link>
              </li>
              <li>
                <Link to="/apps/abroad-days" className="hover:text-blue-400 transition-all flex items-center gap-2 group font-bold text-blue-500">
                  <PlaneTakeoff size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Yurt Dışı Gün Hesapla
                </Link>
              </li>
              <li>
                <Link to="/apps/deport-calculator" className="hover:text-orange-400 transition-all flex items-center gap-2 group font-medium">
                  <PlaneLanding size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Deport Süresi Hesapla
                </Link>
              </li>
              <li>
                <Link to="/apps/tahdit-codes" className="hover:text-red-400 transition-all flex items-center gap-2 group font-medium text-red-500">
                  <ShieldAlert size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Tahdit Kodu Sorgula
                </Link>
              </li>
              <li>
                <Link to="/apps/visa-penalty" className="hover:text-blue-400 transition-all flex items-center gap-2 group font-medium">
                  <Banknote size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Vize Cezası Hesaplama
                </Link>
              </li>
              <li>
                <Link to="/apps/long-term-calculator" className="hover:text-purple-400 transition-all flex items-center gap-2 group font-medium">
                  <Calculator size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Süresiz İkamet Hesapla
                </Link>
              </li>
              <li>
                <Link to="/apps/residency-type-query" className="hover:text-slate-300 transition-all flex items-center gap-2 group font-medium">
                  <Scale size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  İkamet İzni Çeşitleri
                </Link>
              </li>
              <li>
                <Link to="/apps/turkmenistan-visa" className="hover:text-emerald-400 transition-all flex items-center gap-2 group font-medium text-emerald-500">
                  <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Türkmenistan Vize Kontrol
                </Link>
              </li>
              <li className="pt-2 border-t border-white/5">
                <Link to="/apps" className="hover:text-white transition-all flex items-center gap-2 group font-black text-xs uppercase tracking-widest">
                  <LayoutGrid size={14} className="group-hover:scale-110 transition-transform text-blue-500" aria-hidden="true" />
                  Tüm Dijital Araçlar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-blue-500 pl-3">Hizmetlerimiz</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-4 mb-2">İkamet İzinleri</li>
              <li><Link to="/accommodation-permit/short-term" className="hover:text-blue-400 transition-colors block">Kısa Dönem İkamet</Link></li>
              <li><Link to="/accommodation-permit/long-term" className="hover:text-blue-400 transition-colors block">Uzun Dönem (Süresiz) İkamet</Link></li>
              <li><Link to="/student-permit" className="hover:text-blue-400 transition-colors block">Öğrenci İkamet İzni</Link></li>
              <li><Link to="/accommodation-permit/family" className="hover:text-blue-400 transition-colors block">Aile İkamet İzni</Link></li>
              
              <li className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-4 mb-2">Çalışma İzinleri</li>
              <li><Link to="/work-permit/temporary" className="hover:text-blue-400 transition-colors block">Süreli Çalışma İzni</Link></li>
              <li><Link to="/work-permit/long-term" className="hover:text-blue-400 transition-colors block">Süresiz Çalışma İzni</Link></li>
              <li><Link to="/work-permit/independent" className="hover:text-blue-400 transition-colors block">Bağımsız Çalışma İzni</Link></li>
              <li><Link to="/work-permit/turkuaz" className="hover:text-blue-400 transition-colors block">Turkuaz Kart Başvurusu</Link></li>
              <li><Link to="/profession/couriers" className="hover:text-yellow-400 transition-colors block font-bold">Kurye Çalışma İzni</Link></li>

              <li className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-4 mb-2">Vatandaşlık & Diğer</li>
              <li><Link to="/citizenship" className="hover:text-blue-400 transition-colors block">Yatırımcı Vatandaşlığı</Link></li>
              <li><Link to="/citizenship/exceptional" className="hover:text-blue-400 transition-colors block">İstisnai Vatandaşlık</Link></li>
              <li><Link to="/appointment" className="hover:text-blue-400 transition-colors block">Vatandaşlık İşlemleri</Link></li>
              <li><Link to="/blog/shorts" className="hover:text-blue-400 transition-colors block">Atasa Haber Merkezi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-blue-600 pl-3">Bize Ulaşın</h3>
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3 group">
                <MapPin className="shrink-0 text-blue-500 mt-1 group-hover:text-blue-400 transition-colors" size={18} aria-hidden="true" />
                <address className="not-italic leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                  {COMPANY_INFO.address}
                </address>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="shrink-0 text-blue-500 group-hover:text-blue-400 transition-colors" size={18} aria-hidden="true" />
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors font-medium">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="shrink-0 text-blue-500 group-hover:text-blue-400 transition-colors" size={18} aria-hidden="true" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              
              <div className="pt-4 flex flex-col gap-3">
                 <Link to="/appointment" className="w-full block text-center bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg border border-white/10 transition-all font-semibold">
                   Online Randevu Al
                 </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© 2025 Atasa Danışmanlık. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
            <Link to="/about" className="hover:text-slate-400 transition-colors font-medium">Hakkımızda</Link>
            <Link to="/kvkk" className="hover:text-slate-400 transition-colors">KVKK</Link>
            <Link to="/cookie-policy" className="hover:text-slate-400 transition-colors">Çerezler</Link>
            <button 
              onClick={openModal} 
              className="hover:text-slate-300 transition-colors flex items-center gap-1 font-medium text-slate-500"
              aria-label="Çerez Ayarları"
            >
              <Settings size={12} aria-hidden="true" /> Tercihler
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialButton: React.FC<{ href: string, ariaLabel: string, children: React.ReactNode, color: string }> = ({ href, ariaLabel, children, color }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className={`w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center transition-all duration-300 ${color}`}
  >
    {children}
  </a>
);
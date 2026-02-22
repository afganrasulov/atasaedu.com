
import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, Cookie, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';

// Types
interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsentContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  preferences: CookiePreferences;
  savePreferences: (prefs: CookiePreferences) => void;
  acceptAll: () => void;
}

// Context
const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error('useCookieConsent must be used within CookieConsentProvider');
  return context;
};

// Provider
export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    performance: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Apple Politikası: Native uygulamada çerez banner'ı gösterilmez ve takip yapılmaz.
    if (Capacitor.isNativePlatform()) {
      setPreferences({
        necessary: true,
        performance: false,
        marketing: false,
        functional: false,
      });
      return;
    }

    const saved = localStorage.getItem('atasa_cookie_consent');
    if (saved) {
      setPreferences(JSON.parse(saved));
    } else {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    localStorage.setItem('atasa_cookie_consent', JSON.stringify(prefs));
    setIsOpen(false);
  };

  const acceptAll = () => {
    const allEnabled = {
      necessary: true,
      performance: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allEnabled);
  };

  return (
    <CookieConsentContext.Provider value={{ 
      isOpen, 
      openModal: () => {
        // Mobilde ayarlar modalının açılmasını engelle (Apple Rejection Fix)
        if (!Capacitor.isNativePlatform()) setIsOpen(true);
      }, 
      closeModal: () => setIsOpen(false),
      preferences,
      savePreferences,
      acceptAll
    }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

// Responsive Cookie Consent Component
export const CookieConsentModal: React.FC = () => {
  const { isOpen, closeModal, preferences, savePreferences, acceptAll } = useCookieConsent();
  const [view, setView] = useState<'summary' | 'details'>('summary');
  const [localPrefs, setLocalPrefs] = useState(preferences);

  // Apple Politikası: Native uygulamada hiçbir şey render etme.
  if (Capacitor.isNativePlatform()) return null;

  useEffect(() => {
    if (isOpen) {
        setLocalPrefs(preferences);
        setView('summary');
    }
  }, [isOpen, preferences]);

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setLocalPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    savePreferences(localPrefs);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[1001] md:hidden"
            onClick={closeModal}
          />

          <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-[1002] w-full md:w-auto md:max-w-[380px]">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white/95 backdrop-blur-xl rounded-t-[2.5rem] md:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200/60 overflow-hidden flex flex-col pb-safe md:pb-0"
            >
              <div className="md:hidden flex justify-center pt-3 pb-1" onClick={() => setView(view === 'summary' ? 'details' : 'summary')}>
                <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                    <Cookie size={20} />
                  </div>
                  <div>
                    <span className="block text-base font-bold text-slate-900 leading-none mb-0.5">Çerez Tercihleri</span>
                    <span className="text-[10px] font-medium text-slate-400">Deneyiminizi kişiselleştirin</span>
                  </div>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 pt-4 max-h-[70vh] overflow-y-auto">
                {view === 'summary' ? (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      Size daha iyi hizmet sunabilmek için sitemizde çerezler kullanıyoruz.
                      Detaylar için <Link to="/cookie-policy" onClick={closeModal} className="text-blue-600 hover:underline font-bold">Çerez Politikası</Link>'nı inceleyebilirsiniz.
                    </p>
                    
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={acceptAll} 
                        className="w-full bg-slate-900 text-white py-3.5 rounded-2xl text-base font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
                      >
                        Tümünü Kabul Et
                      </button>
                      <button 
                        onClick={() => setView('details')} 
                        className="w-full bg-slate-50 text-slate-600 py-3.5 rounded-2xl text-base font-bold hover:bg-slate-100 transition-all border border-slate-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <Settings2 size={16} /> Ayarları Yönet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                     <MiniCookieOption 
                       label="Zorunlu Çerezler" 
                       desc="Sitenin çalışması için gereklidir."
                       checked={true}
                       disabled={true}
                       onChange={() => {}}
                     />
                     <MiniCookieOption 
                       label="Analitik Çerezler" 
                       desc="Ziyaretçi sayımı ve trafik analizi."
                       checked={localPrefs.performance}
                       onChange={() => handleToggle('performance')}
                     />
                     <MiniCookieOption 
                       label="Pazarlama Çerezleri" 
                       desc="Size özel kampanya ve reklamlar."
                       checked={localPrefs.marketing}
                       onChange={() => handleToggle('marketing')}
                     />
                     <MiniCookieOption 
                       label="İşlevsel Çerezler" 
                       desc="Dil ve bölge tercihlerinizi hatırlar."
                       checked={localPrefs.functional}
                       onChange={() => handleToggle('functional')}
                     />

                     <div className="pt-4 flex gap-3">
                        <button onClick={() => setView('summary')} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-colors">
                          Geri Dön
                        </button>
                        <button onClick={handleSave} className="flex-[2] bg-blue-600 text-white py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-[0.98]">
                          Kaydet ve Çık
                        </button>
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const MiniCookieOption: React.FC<{
  label: string; 
  desc: string;
  checked: boolean; 
  onChange: () => void; 
  disabled?: boolean;
}> = ({ label, desc, checked, onChange, disabled }) => (
  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
    <div>
      <span className="block text-sm font-bold text-slate-800">{label}</span>
      <span className="text-[10px] text-slate-400 font-medium">{desc}</span>
    </div>
    <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} disabled={disabled} />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

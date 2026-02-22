"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, Cookie, Settings2 } from 'lucide-react';
import Link from 'next/link';

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
            openModal: () => setIsOpen(true),
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

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1001] md:hidden transition-opacity"
                onClick={closeModal}
            />

            {/* Modal Container */}
            <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-[1002] w-full md:w-[400px] animate-in slide-in-from-bottom-full md:slide-in-from-right-8 md:fade-in duration-500 ease-out">
                <div className="bg-white/95 backdrop-blur-xl rounded-t-[2.5rem] md:rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col pb-safe md:pb-0 relative">

                    {/* Mobile Drag Handle */}
                    <div className="md:hidden flex justify-center pt-3 pb-1" onClick={() => setView(view === 'summary' ? 'details' : 'summary')}>
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100/80 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[1.2rem] bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                                <Cookie size={24} />
                            </div>
                            <div>
                                <span className="block text-lg font-black text-[#152239] leading-tight mb-0.5 tracking-tight">Çerez Tercihleri</span>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Atasa Education</span>
                            </div>
                        </div>
                        <button onClick={closeModal} className="p-2.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600 bg-white shadow-sm border border-slate-100">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6 md:p-8 max-h-[70vh] md:max-h-[60vh] overflow-y-auto">
                        {view === 'summary' ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-slate-600 text-[15px] leading-relaxed font-medium">
                                    Size daha iyi bir eğitim danışmanlığı deneyimi sunabilmek için sitemizde çerezler kullanıyoruz.
                                    Detaylı bilgi için <Link href="/cookie-policy" onClick={closeModal} className="text-primary hover:underline font-black mx-1 bg-primary/5 px-2 py-0.5 rounded-md">Çerez Aydınlatma Metni</Link>'ni inceleyebilirsiniz.
                                </p>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={acceptAll}
                                        className="w-full bg-[#152239] text-white py-4 rounded-full text-base font-black hover:bg-primary transition-colors shadow-lg shadow-slate-200 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Cookie size={18} /> Tümünü Kabul Et
                                    </button>
                                    <button
                                        onClick={() => setView('details')}
                                        className="w-full bg-slate-50 text-slate-600 py-4 rounded-full text-base font-bold hover:bg-slate-100 transition-colors border border-slate-200 flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <Settings2 size={18} /> Tercihleri Yönet
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <MiniCookieOption
                                    label="Zorunlu Çerezler"
                                    desc="Sitenin temel işlevleri için gereklidir."
                                    checked={true}
                                    disabled={true}
                                    onChange={() => { }}
                                />
                                <MiniCookieOption
                                    label="Analitik Çerezler"
                                    desc="Ziyaretçi sayımı ve trafik analizi."
                                    checked={localPrefs.performance}
                                    onChange={() => handleToggle('performance')}
                                />
                                <MiniCookieOption
                                    label="Pazarlama Çerezleri"
                                    desc="Size özel eğitim fırsatları."
                                    checked={localPrefs.marketing}
                                    onChange={() => handleToggle('marketing')}
                                />
                                <MiniCookieOption
                                    label="İşlevsel Çerezler"
                                    desc="Dil ve kullanım tercihlerinizi hatırlar."
                                    checked={localPrefs.functional}
                                    onChange={() => handleToggle('functional')}
                                />

                                <div className="pt-6 mt-2 border-t border-slate-100 flex gap-3">
                                    <button onClick={() => setView('summary')} className="flex-1 bg-slate-100 text-slate-600 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors active:scale-95">
                                        Geri Dön
                                    </button>
                                    <button onClick={handleSave} className="flex-[2] bg-primary text-white py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95">
                                        Seçimleri Kaydet
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const MiniCookieOption: React.FC<{
    label: string;
    desc: string;
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}> = ({ label, desc, checked, onChange, disabled }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${disabled ? 'bg-slate-100/50 border-slate-200/50' : checked ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
        <div>
            <span className="block text-sm font-black text-[#152239] tracking-tight">{label}</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5">{desc}</span>
        </div>
        <label className={`relative inline-flex items-center cursor-pointer shrink-0 ml-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} disabled={disabled} />
            <div className={`w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${checked ? 'peer-checked:bg-primary' : ''}`}></div>
        </label>
    </div>
);

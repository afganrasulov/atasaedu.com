
import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ChevronDown, User, Phone as PhoneIcon, HelpCircle, ArrowRight } from 'lucide-react';
import { useWhatsApp } from './WhatsAppContext';
import { COMPANY_INFO, COUNTRY_CODES } from '../../constants';
import { useCountryCode } from '../common/useCountryCode';
// Fix: Use type casting for motion to bypass property missing errors
import { motion as _motion, AnimatePresence } from 'framer-motion';
const motion = _motion as any;

const TOPICS = [
  "İkamet İzni",
  "Çalışma İzni",
  "Vatandaşlık İşlemleri",
  "Öğrenci İşlemleri",
  "Diğer"
];

const PREDEFINED_QUESTIONS: Record<string, string[]> = {
  "İkamet İzni": [
    "8 Yıldır ikamet iznim var uzun dönem ikamet izni alabilir miyim?",
    "Aile ikamet iznini kimler alabilir?",
    "Anneme Aile ikamet izni alabilir miyim?",
    "Çocuklarıma aile ikamet izni alabilir miyim?",
    "Eşimin üzerine aile ikamet izni aldım, eşimin çalışma izni iptal oldu. Ne yapabilirim?",
    "İkamet izni almak için hangi şartları sağlamam gerekiyor?",
    "İkamet izni başvurusu nasıl yapılır?",
    "İkamet izni süresi ne kadar?",
    "İkamet izni uzatımı nasıl yapılır?",
    "Turizm amaçlı ikamet izni uzatması hakkında bilgi alabilir miyim?"
  ],
  "Çalışma İzni": [
    "Çalışma izni almak için işverenim ne yapmalı?",
    "Ev hizmetlerinde yabancı çalıştırmak istiyorum.",
    "Şirket ortağıyım, çalışma izni alabilir miyim?",
    "Öğrenciyim, çalışma izni alabilir miyim?"
  ],
  "Vatandaşlık İşlemleri": [
    "Yatırım yoluyla vatandaşlık şartları nelerdir?",
    "Evlilik yoluyla vatandaşlık ne kadar sürer?",
    "Genel yolla vatandaşlık başvurusu için şartlar neler?"
  ],
  "Öğrenci İşlemleri": [
    "Üniversite kaydı için gerekli belgeler nelerdir?",
    "Öğrenci ikamet izni ne kadar sürede çıkar?"
  ],
  "Diğer": [
    "Danışmanlık ücretleriniz hakkında bilgi almak istiyorum.",
    "Randevu oluşturmak istiyorum."
  ]
};

export const WhatsAppModal: React.FC = () => {
  const { isOpen, closeWhatsApp } = useWhatsApp();
  const detectedCountryCode = useCountryCode();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+90',
    phone: '',
    topic: 'İkamet İzni',
    question: ''
  });

  useEffect(() => {
    if (detectedCountryCode) {
      setFormData(prev => ({ ...prev, countryCode: detectedCountryCode }));
    }
  }, [detectedCountryCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'topic' ? { question: '' } : {})
    }));
  };

  const handleSubmit = () => {
    const fullPhone = `${formData.countryCode}${formData.phone.replace(/^0+/, '')}`; 
    const message = `Merhaba Atasa Danışmanlık,
    
Ben ${formData.firstName} ${formData.lastName}.
Konu: ${formData.topic}
Soru: ${formData.question || 'Danışmanlık almak istiyorum.'}

Yardımcı olabilir misiniz?`;

    const encodedMessage = encodeURIComponent(message);
    const targetNumber = COMPANY_INFO.phone.replace(/\D/g, ''); 
    
    window.open(`https://wa.me/${targetNumber}?text=${encodedMessage}`, '_blank');
    closeWhatsApp();
  };

  // Büyük ve okunaklı input stilleri
  const inputStyle = "w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 h-14 text-lg text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all font-medium";
  const labelStyle = "block text-lg font-bold text-slate-800 mb-2 flex items-center gap-2";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1005] flex items-center justify-center px-4 overflow-y-auto py-4">
          {/* Backdrop (Daha koyu ve net) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[1005]"
            onClick={closeWhatsApp}
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden my-auto z-[1006]"
          >
            
            {/* Header - Renkli ve Büyük */}
            <div className="bg-green-600 p-6 pt-8 text-white relative">
                <button 
                  onClick={closeWhatsApp}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                >
                  <X size={28} />
                </button>
                
                <div className="flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <MessageCircle size={40} className="text-green-600 fill-green-600" />
                   </div>
                   <h2 className="text-3xl font-black mb-1">WhatsApp Destek</h2>
                   <p className="text-green-100 text-lg">Uzmanlarımızla hemen yazışın</p>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
                
                {/* İsim Soyisim */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}><User size={20} className="text-slate-400"/> Adınız</label>
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="Adınız" 
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Soyadınız</label>
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="Soyadınız" 
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                   <label className={labelStyle}><PhoneIcon size={20} className="text-slate-400"/> Telefon Numaranız</label>
                   <div className="flex gap-2">
                     <div className="relative w-1/3 min-w-[110px]">
                        <select 
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className={`${inputStyle} appearance-none cursor-pointer pr-8 bg-white`}
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>{c.code}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={24} />
                     </div>
                     <div className="w-2/3">
                       <input 
                        type="tel" 
                        name="phone"
                        placeholder="5XX XXX XX XX" 
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputStyle}
                      />
                     </div>
                   </div>
                </div>

                {/* Konu ve Soru */}
                <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="relative">
                      <label className={labelStyle}><HelpCircle size={20} className="text-slate-400"/> Konu Seçiniz</label>
                      <select 
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className={`${inputStyle} appearance-none cursor-pointer bg-white h-16`}
                      >
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-[50px] text-slate-500 pointer-events-none" size={28} />
                    </div>

                    <div className="relative">
                      <label className={labelStyle}>Sorunuz Nedir?</label>
                      <select 
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        className={`${inputStyle} appearance-none cursor-pointer bg-white h-16`}
                      >
                        <option value="">Lütfen listeden seçin...</option>
                        {(PREDEFINED_QUESTIONS[formData.topic] || PREDEFINED_QUESTIONS["Diğer"]).map((q, idx) => (
                          <option key={idx} value={q}>{q}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-[50px] text-slate-500 pointer-events-none" size={28} />
                    </div>
                </div>

                {/* Butonlar */}
                <div className="pt-4 space-y-4">
                   <button 
                    onClick={handleSubmit}
                    disabled={!formData.firstName || !formData.lastName || !formData.phone || !formData.question}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xl py-5 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-green-200 hover:scale-[1.02] active:scale-[0.98]"
                   >
                     <MessageCircle size={32} fill="currentColor" />
                     WhatsApp'ı Aç
                   </button>
                   
                   <p className="text-center text-slate-500 text-sm font-medium">
                     Bu butona tıkladığınızda telefonunuzdaki WhatsApp uygulaması açılacaktır.
                   </p>

                   <button 
                    onClick={closeWhatsApp}
                    className="w-full text-slate-400 hover:text-slate-600 font-bold py-3 transition-colors text-lg"
                   >
                     Vazgeç ve Kapat
                   </button>
                </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Navigation, Building2, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { COMPANY_INFO, COUNTRY_CODES } from '../../constants';
import { useCountryCode } from '../common/useCountryCode';

export const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Ülke kodu tespiti
  const detectedCountryCode = useCountryCode();
  const [phoneCountryCode, setPhoneCountryCode] = useState('+90');
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');

  // Form verileri için state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Otomatik tespit edilen ülkeyi state'e ata
  useEffect(() => {
    if (detectedCountryCode) {
      setPhoneCountryCode(detectedCountryCode);
    }
  }, [detectedCountryCode]);

  // Ülke kodu veya numara değişince formData'yı güncelle
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      phone: `${phoneCountryCode} ${localPhoneNumber}`.trim()
    }));
  }, [phoneCountryCode, localPhoneNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Verileri x-www-form-urlencoded formatında hazırla (CORS dostu - Simple Request)
      const data = new URLSearchParams();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      // Excel/Sheets uyumluluğu için telefon numarasını ="..." formatına çevir
      data.append('phone', `="${formData.phone}"`);
      data.append('message', formData.message);
      data.append('source', 'atasa_contact_page');

      // Webhook'a POST isteği at
      await fetch('https://n8n.rasulov.net/webhook/6cc3930d-7573-45c0-b8be-b28ba1426666', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      // Başarılı kabul et
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' }); // Formu temizle
      setLocalPhoneNumber('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.warn('⚠️ Contact Form Network/CORS Warning (handled):', error);
      setIsSubmitting(false);
      setIsSuccess(true); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const branches = [
    {
      city: 'İstanbul',
      address: 'Mecidiyeköy mah. Raşit Rıza sk. Ahmet Esin İş Merkezi NO:4 K:2 D:7 Şişli/İstanbul',
      mapQuery: 'Mecidiyeköy mah. Raşit Rıza sk. Ahmet Esin İş Merkezi NO:4 Şişli İstanbul',
      googleMapsUrl: 'https://www.google.com/maps/place/Atasa+Dan%C4%B1%C5%9Fmanl%C4%B1k+Hizmetleri+LTD.+%C5%9ET%C4%B0./@41.067297,28.9998846,17z/data=!4m6!3m5!1s0x14cab746724d84fd:0x1f99dbde2ff1d769!8m2!3d41.0672466!4d28.9998853!16s%2Fg%2F11rfcycng9',
      phone: '+90 850 308 69 98'
    },
    {
      city: 'Aşkabat',
      address: 'Berkararlyk etrap / G.Kuliyev köçe/ Beyençli N70, Gat 3 309, Ashgabat, Türkmenistan',
      mapQuery: 'G.Kuliyev köçe Beyençli N70 Ashgabat Turkmenistan',
      googleMapsUrl: '',
      phone: '+993 637 816 52'
    },
    {
      city: 'Bakü',
      address: 'Tivi Plaza, Əhməd Rəcəbli Küçəsi, 1/10 Nəriman Nərimanov, Baku 1006, Azərbaycan',
      mapQuery: 'Tivi Plaza Ahmad Rajabli Baku Azerbaijan',
      googleMapsUrl: '',
      phone: '+994 51 823 44 10'
    }
  ];

  const inputClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-all hover:bg-slate-50";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2 ml-1";

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">İletişim</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Sizlere en iyi hizmeti sunabilmek için buradayız. Sorularınız veya talepleriniz için aşağıdaki formu doldurabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white animate-in slide-in-from-left-4 duration-700 relative">
            
            {isSuccess ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mesajınız Gönderildi!</h3>
                <p className="text-slate-600">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-blue-600 font-bold hover:underline"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>İsim</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                      placeholder="Adınız" 
                      className={inputClasses} 
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Soyad</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                      placeholder="Soyadınız" 
                      className={inputClasses} 
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="E-postanız" 
                    className={inputClasses} 
                  />
                </div>

                <div>
                  <label className={labelClasses}>Telefon Numaranız</label>
                  <div className="flex gap-2">
                    <div className="relative w-1/3 min-w-[100px]">
                       <select 
                         value={phoneCountryCode}
                         onChange={(e) => setPhoneCountryCode(e.target.value)}
                         className={`${inputClasses} appearance-none cursor-pointer pr-8`}
                       >
                         {COUNTRY_CODES.map(c => (
                           <option key={c.code} value={c.code}>{c.code} ({c.country})</option>
                         ))}
                       </select>
                       <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                    <div className="w-2/3">
                      <input 
                        type="tel" 
                        value={localPhoneNumber}
                        onChange={(e) => setLocalPhoneNumber(e.target.value)}
                        required 
                        placeholder="5XX XXX XX XX" 
                        className={inputClasses} 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Mesaj</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    rows={5} 
                    placeholder="Mesajınız" 
                    className={`${inputClasses} resize-none`} 
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Gönder <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Branch Info */}
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-700 delay-100">
            
            {/* Branch Image */}
            <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-lg border border-white group">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Şube Binası" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Şube Bilgileri</h3>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Hafta içi 09:00 - 18:00
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-6">
              {branches.map((branch) => (
                <div key={branch.city} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex items-center gap-2 text-blue-700 font-bold">
                      <MapPin size={18} />
                      {branch.city} Adres
                    </div>
                    <a 
                      href={branch.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Navigation size={12} /> Yol Tarifi
                    </a>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-6 border-l-2 border-slate-200 ml-1">
                    {branch.address}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact Details Footer */}
            <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                  <Mail size={18} /> Mesaj Gönder
                </div>
                <a href="mailto:info@atasa.tr" className="text-lg hover:text-blue-200 transition-colors pl-6 block">
                  info@atasa.tr
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
                  <Phone size={18} /> Hemen Ara
                </div>
                <div className="space-y-3 pl-6">
                   {branches.map(branch => (
                     <div key={branch.city} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0">
                        <span className="text-slate-400 text-sm">{branch.city} İletişim Numarası:</span>
                        <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="font-medium hover:text-blue-300 transition-colors">
                          {branch.phone}
                        </a>
                     </div>
                   ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

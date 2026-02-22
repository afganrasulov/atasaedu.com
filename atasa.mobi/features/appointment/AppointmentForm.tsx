
import React, { useState, useEffect, useMemo } from 'react';
import { submitAppointment, AppointmentData } from './appointmentService';
import { CheckCircle, AlertCircle, Loader2, Star, Shield, CalendarCheck, ChevronDown, Clock } from 'lucide-react';
import { COUNTRY_CODES } from '../../constants';
import { useCountryCode } from '../common/useCountryCode';
import { TrackingService } from '../../services/trackingService'; // Tracking import

export const AppointmentForm: React.FC = () => {
  const detectedCountryCode = useCountryCode();

  // We maintain country code and local number separately in UI state for better UX
  const [phoneCountryCode, setPhoneCountryCode] = useState('+90');
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');

  const [formData, setFormData] = useState<AppointmentData>({
    firstName: '',
    lastName: '',
    gender: 'Erkek',
    birthDate: '',
    email: '',
    phone: '',
    subject: '',
    description: '',
    nationality: '',
    appointmentDate: '',
    appointmentTime: '',
    hasResidency: 'Hayır',
    residencyStartDate: '',
    residencyEndDate: '',
    representative: 'Otomatik'
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Update country code when detection runs
  useEffect(() => {
    if (detectedCountryCode) {
      setPhoneCountryCode(detectedCountryCode);
    }
  }, [detectedCountryCode]);

  // Combine country code and local number whenever they change
  useEffect(() => {
    const combinedPhone = `${phoneCountryCode} ${localPhoneNumber}`;
    setFormData(prev => ({ ...prev, phone: combinedPhone.trim() }));
  }, [phoneCountryCode, localPhoneNumber]);

  const subjects = [
    'İkamet İzni Başvurusu',
    'Çalışma İzni Danışmanlığı',
    'Vatandaşlık İşlemleri',
    'Öğrenci İkamet İzni',
    'Genel Danışmanlık'
  ];

  const getNextBusinessDays = () => {
    const dates = [];
    const current = new Date();
    let count = 0;
    while (count < 5) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        dates.push(current.toLocaleDateString('tr-TR'));
        count++;
      }
    }
    return dates;
  };

  const availableDates = getNextBusinessDays();
  
  // Ömer Habib için özel saatler: 16:00 - 19:00
  const availableTimes = useMemo(() => {
    if (formData.representative === 'Ömer Habib') {
      return ['16:00', '17:00', '18:00', '19:00'];
    }
    return ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  }, [formData.representative]);

  // Temsilci değiştiğinde seçili saat geçersizse temizle
  useEffect(() => {
    if (formData.appointmentTime && !availableTimes.includes(formData.appointmentTime)) {
      setFormData(prev => ({ ...prev, appointmentTime: '' }));
    }
  }, [formData.representative, availableTimes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRepresentativeChange = (value: string) => {
    setFormData(prev => ({ ...prev, representative: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Excel/Sheets uyumluluğu için telefon numarasını ="..." formatına çevir
    const submissionData = {
      ...formData,
      phone: `="${formData.phone}"`
    };

    const success = await submitAppointment(submissionData);
    
    if (success) {
      setStatus('success');
      
      // TRACKING: Başarılı Lead (Randevu)
      TrackingService.trackEvent('Lead', {
        content_name: formData.subject,
        content_category: 'Appointment',
        value: formData.representative === 'Ömer Habib' ? 1000 : 0, // Tahmini değer
        currency: 'TRY'
      }, {
        fn: formData.firstName, // Backend'de hashlenmeli
        ln: formData.lastName,
        ph: formData.phone,
        em: formData.email
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatus('error');
    }
  };

  // Light Theme Input Styles
  const inputClasses = "w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-all hover:bg-white";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2 ml-1";

  if (status === 'success') {
    return (
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-sm">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Randevu Talebiniz Alındı</h2>
        <p className="text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto">
          Formunuz başarıyla sistemimize işlenmiştir. 
          {formData.representative === 'Ömer Habib' ? (
             <span className="block mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800">
               <strong className="text-blue-600">Ömer Habib Bey</strong> ile görüşme detayları ve ödeme adımları için asistanımız sizinle en kısa sürede iletişime geçecektir.
             </span>
          ) : (
            <span className="block mt-2">
               Uzman danışmanlarımız dosyanızı inceleyip sizinle iletişime geçecektir.
            </span>
          )}
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-3.5 rounded-full font-bold transition-all shadow-lg active:scale-95"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Light Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-orange-100 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
      
      <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-xl border border-white overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 border-b border-slate-100 bg-gradient-to-b from-white to-transparent relative">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 text-white">
                <CalendarCheck size={24} />
             </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight">Danışmanlık Randevusu</h2>
          <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
            Geleceğinizi şansa bırakmayın. Profesyonel ekibimizle sürecinizi başlatalım.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {status === 'error' && (
            <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle size={18} className="text-red-500" />
              Bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.
            </div>
          )}

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Ad</label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Adınız"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Soyad</label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Soyadınız"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Gender & Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Cinsiyet</label>
              <div className="flex gap-4">
                {['Erkek', 'Kadın'].map((g) => (
                   <label key={g} className={`flex-1 cursor-pointer border ${formData.gender === g ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'} rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all shadow-sm`}>
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="text-sm font-medium">{g}</span>
                   </label>
                ))}
              </div>
            </div>
            <div>
               <label className={labelClasses}>Uyruk</label>
               <select
                  name="nationality"
                  required
                  value={formData.nationality}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer`}
               >
                  <option value="" className="text-slate-400">Seçiniz...</option>
                  <option value="Azerbaycan">Azerbaycan</option>
                  <option value="Türkmenistan">Türkmenistan</option>
                  <option value="Özbekistan">Özbekistan</option>
                  <option value="Kazakistan">Kazakistan</option>
                  <option value="Afganistan">Afganistan</option>
                  <option value="Gürcistan">Gürcistan</option>
                  <option value="Suriye">Suriye</option>
                  <option value="Rusya">Rusya</option>
                  <option value="İran">İran</option>
                  <option value="Diğer">Diğer</option>
               </select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className={labelClasses}>Doğum Tarihi</label>
                <input
                  type="date"
                  name="birthDate"
                  required
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`${inputClasses}`}
                />
             </div>
             
             {/* Phone Input with Country Code */}
             <div>
                <label className={labelClasses}>Telefon</label>
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
                      required
                      placeholder="5XX XXX XX XX"
                      value={localPhoneNumber}
                      onChange={(e) => setLocalPhoneNumber(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>
             </div>
          </div>
          
          <div>
            <label className={labelClasses}>E-Posta</label>
            <input
              type="email"
              name="email"
              required
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Subject & Description */}
          <div>
            <label className={labelClasses}>Görüşme Konusu</label>
            <select
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className={`${inputClasses} appearance-none cursor-pointer`}
            >
              <option value="">Konu Seçiniz...</option>
              {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Durum Açıklaması</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Durumunuzu kısaca özetleyin..."
              value={formData.description}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Scheduling */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
             <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
               <CalendarCheck size={18} className="text-blue-600"/> Randevu Zamanı
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block ml-1">Tarih</label>
                  <select
                    name="appointmentDate"
                    required
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none bg-white`}
                  >
                    <option value="">Tarih Seçiniz</option>
                    {availableDates.map(date => <option key={date} value={date}>{date}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block ml-1">Saat</label>
                  <select
                    name="appointmentTime"
                    required
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none bg-white`}
                  >
                    <option value="">Saat Seçiniz</option>
                    {formData.appointmentDate && availableTimes.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
             </div>
             {formData.representative === 'Ömer Habib' && (
                <div className="mt-3 flex items-center gap-2 text-[10px] text-blue-600 font-bold bg-blue-50/50 p-2 rounded-lg">
                   <Clock size={12} /> Ömer Habib Bey için sadece hafta içi 16:00 - 19:00 arası uygundur.
                </div>
             )}
          </div>

          {/* Residency Check */}
          <div>
            <label className={labelClasses}>Aktif İkamet İzni Durumu</label>
            <div className="flex gap-4 mb-4">
               {['Evet', 'Hayır'].map((opt) => (
                  <label key={opt} className={`flex-1 cursor-pointer border ${formData.hasResidency === opt ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'} rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all shadow-sm`}>
                    <input
                      type="radio"
                      name="hasResidency"
                      value={opt}
                      checked={formData.hasResidency === opt}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="text-sm font-medium">{opt}</span>
                  </label>
               ))}
            </div>

            {formData.hasResidency === 'Evet' && (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 fade-in p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Başlangıç</label>
                  <input
                    type="date"
                    name="residencyStartDate"
                    value={formData.residencyStartDate}
                    onChange={handleChange}
                    className={`${inputClasses} py-2 text-sm bg-white`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Bitiş</label>
                  <input
                    type="date"
                    name="residencyEndDate"
                    value={formData.residencyEndDate}
                    onChange={handleChange}
                    className={`${inputClasses} py-2 text-sm bg-white`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Representative Selection (Light Glass Cards) */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-lg font-bold text-slate-900 mb-4">Temsilci Seçimi</label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Automatic */}
              <div 
                onClick={() => handleRepresentativeChange('Otomatik')}
                className={`relative cursor-pointer group rounded-2xl p-5 border transition-all duration-300 ${
                  formData.representative === 'Otomatik' 
                    ? 'bg-blue-50 border-blue-200 shadow-md shadow-blue-100' 
                    : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-sm'
                }`}
              >
                 <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${formData.representative === 'Otomatik' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                       <Shield size={16} />
                    </div>
                    <div>
                       <h4 className={`font-bold mb-1 ${formData.representative === 'Otomatik' ? 'text-blue-900' : 'text-slate-800'}`}>Otomatik Atama</h4>
                       <p className="text-xs text-slate-500 leading-relaxed">
                         Uzmanlık alanına göre en uygun danışman ücretsiz atanır.
                       </p>
                    </div>
                 </div>
                 {formData.representative === 'Otomatik' && (
                    <div className="absolute top-4 right-4">
                       <span className="flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                    </div>
                 )}
              </div>

              {/* Card 2: Omer Habib */}
              <div 
                onClick={() => handleRepresentativeChange('Ömer Habib')}
                className={`relative cursor-pointer group rounded-2xl p-5 border transition-all duration-300 ${
                  formData.representative === 'Ömer Habib' 
                    ? 'bg-orange-50 border-orange-200 shadow-md shadow-orange-100' 
                    : 'bg-white border-slate-200 hover:border-orange-200 hover:shadow-sm'
                }`}
              >
                 <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${formData.representative === 'Ömer Habib' ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                       <Star size={16} className="fill-current" />
                    </div>
                    <div>
                       <h4 className={`font-bold mb-1 ${formData.representative === 'Ömer Habib' ? 'text-orange-900' : 'text-slate-800'}`}>Ömer Habib</h4>
                       <p className="text-xs text-slate-500 leading-relaxed">
                         Kurucu & CEO ile özel danışmanlık hizmeti.
                       </p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Fee Warning */}
            {formData.representative === 'Ömer Habib' && (
              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3 text-sm animate-in slide-in-from-top-2 fade-in">
                 <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                 <div className="text-orange-800">
                    <span className="font-bold">Ücretli Hizmet:</span> Ömer Habib Bey ile görüşme ücreti <span className="font-bold underline decoration-orange-500 decoration-2 underline-offset-4">1000 ₺</span> olup, süre <span className="font-bold">30 dakika</span> ile sınırlıdır.
                 </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-slate-900 text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin text-white" size={20} />
                İşleniyor...
              </>
            ) : (
              <>
                Randevuyu Onayla 
                <span className="bg-white text-slate-900 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                   <CheckCircle size={14} />
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

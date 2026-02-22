
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Users, Landmark, FileText, CheckCircle, 
  ArrowRight, Info, Scale, Gavel, Building2, Briefcase, 
  ChevronRight, MessageCircle, Star, BadgeCheck, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

export const CitizenshipExceptionalPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50 selection:bg-red-100 selection:text-red-900">
      
      {/* 1. Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
          
          <div className="relative z-10 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest mb-8"
            >
              <BadgeCheck size={16} />
              <span>Yatırımcı ve İşverenlere Özel</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
              İstisnai Türk <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Vatandaşlığı</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-12 font-medium max-w-2xl">
              Türkiye'de en az 50 kişilik istihdam oluşturan yabancı yatırımcılar için sunulan hızlı ve prestijli vatandaşlık yolu.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={openWhatsApp}
                className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 flex items-center gap-3 active:scale-95"
              >
                <MessageCircle size={24} fill="currentColor" />
                Hemen Bilgi Alın
              </button>
              <Link 
                to="/appointment"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all flex items-center gap-3"
              >
                Randevu Al
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* 2. Core Rule Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Scale className="text-red-600" /> Yasal Dayanak: Madde 12
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                5901 sayılı Türk Vatandaşlığı Kanunu'nun 12'nci maddesi uyarınca; Türkiye'de en az <strong className="text-red-600 font-black">50 kişilik istihdam</strong> oluşturduğu Çalışma ve Sosyal Güvenlik Bakanlığınca tespit edilen yabancılar, Cumhurbaşkanı kararı ile Türk vatandaşlığını kazanabilirler.
              </p>
              <p className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm italic text-slate-500 border-l-8 border-l-red-600">
                "Millî güvenlik ve kamu düzeni bakımından engel teşkil edecek bir hali bulunmamak şartıyla, doğrudan Cumhurbaşkanı kararı ile süreç sonuçlandırılır."
              </p>
            </div>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col gap-8">
             <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                   <Users size={32} />
                </div>
                <div>
                   <h4 className="font-black text-xl text-slate-900 mb-2">İstihdam Şartı</h4>
                   <p className="text-slate-500 text-sm">Sahibi veya ortağı olduğunuz işyerinde en az 50 Türk vatandaşını tam zamanlı istihdam etmeniz yeterlidir.</p>
                </div>
             </div>
             <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                   <ShieldCheck size={32} />
                </div>
                <div>
                   <h4 className="font-black text-xl text-slate-900 mb-2">Kayıtlılık Süresi</h4>
                   <p className="text-slate-500 text-sm">Başvuruların incelenmesinde, şirketin son 6 aylık dönemdeki istihdam sürekliliği dikkate alınır.</p>
                </div>
             </div>
             <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                   {/* Fix: Added missing Clock import from lucide-react */}
                   <Clock size={32} />
                </div>
                <div>
                   <h4 className="font-black text-xl text-slate-900 mb-2">Hızlı Değerlendirme</h4>
                   <p className="text-slate-500 text-sm">Bakanlığa yapılan başvurular, eksiksiz dosya ile 7 iş günü içinde sonuçlandırılarak İçişleri Bakanlığına bildirilir.</p>
                </div>
             </div>
          </div>
        </div>

        {/* 3. Required Documents */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100 mb-32 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <FileText size={200} />
           </div>
           
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 text-center tracking-tight">Başvuru İçin Gerekli Belgeler</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                "Başvuru sahibi tarafından imzalanmış dilekçe",
                "Noter onaylı imza beyannamesi",
                "Eksiksiz doldurulmuş İstihdam Bilgi Formu",
                "Pasaportun kimlik bilgilerini içeren sayfa fotokopisi",
                "Ortaklık ve payları gösterir Ticaret Sicil Gazetesi kayıtları",
                "Güncel tarihli Ticaret Sicil Tasdiknamesi",
                "SGK sisteminden alınmış İşyeri Çalışan Listesi",
                "Vergi borcu durumunu gösterir GİB yazısı",
                "SGK prim borcu durumunu gösterir SGK yazısı",
                "İdari para cezası bulunmadığına dair yazılı beyan"
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors border-b border-slate-50">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    {i + 1}
                  </div>
                  <span className="text-slate-700 font-bold text-sm md:text-base">{doc}</span>
                </div>
              ))}
           </div>
        </div>

        {/* 4. Atasa Service Value */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
           <div className="lg:col-span-1">
              <div className="bg-red-600 rounded-[2.5rem] p-10 text-white h-full shadow-xl shadow-red-900/20">
                 <Star size={48} className="mb-6 fill-white" />
                 <h3 className="text-3xl font-black mb-6 leading-tight">Neden Profesyonel Destek?</h3>
                 <p className="text-red-100 mb-8 leading-relaxed">
                   Vatandaşlık süreci sadece evrak teslimi değildir. Bakanlık değerlendirmesinde sermaye payının yeterliliği ve süreklilik analizi kritiktir. Atasa olarak riskleri önceden analiz ediyoruz.
                 </p>
                 <ul className="space-y-4 text-sm font-bold">
                    <li className="flex items-center gap-2"><CheckCircle size={18} /> Ön Uygunluk Testi</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} /> Şirket Yapılandırma Danışmanlığı</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} /> Bakanlık İlişkileri Takibi</li>
                 </ul>
              </div>
           </div>
           
           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Building2 size={24} />
                 </div>
                 <h4 className="font-black text-xl text-slate-900 mb-4">Şirket Analizi</h4>
                 <p className="text-slate-500 text-sm">Hisse oranlarınızın ve sermaye payınızın Bakanlık kriterlerine (uygunluk düzeyi) uygunluğunu bizzat denetliyoruz.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                    <Info size={24} />
                 </div>
                 <h4 className="font-black text-xl text-slate-900 mb-4">Dosya Hazırlığı</h4>
                 <p className="text-slate-500 text-sm">İstihdam Bilgi Formu ve dilekçeleri yasal terminolojiye uygun, hata payı olmadan hazırlıyoruz.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                    <Scale size={24} />
                 </div>
                 <h4 className="font-black text-xl text-slate-900 mb-4">Mevzuat Takibi</h4>
                 <p className="text-slate-500 text-sm">Güncel Usul ve Esaslar çerçevesinde, son 6 aylık sigortalı sürekliliğini raporlayarak başvurunuzu güçlendiriyoruz.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Gavel size={24} />
                 </div>
                 <h4 className="font-black text-xl text-slate-900 mb-4">Hukuki Güvence</h4>
                 <p className="text-slate-500 text-sm">Sahte veya yanıltıcı bilgi riskine karşı tüm verilerinizin resmi sistemlerdeki doğruluğunu teyit ediyoruz.</p>
              </div>
           </div>
        </div>

        {/* 5. Final CTA */}
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Yatırımınızla <span className="text-red-500">Vatandaşlık</span> Yolunu Hemen Açın</h2>
              <p className="text-slate-400 text-lg mb-12">
                50 kişilik istihdam gücünüzü Atasa'nın uzmanlığıyla birleştirin. Süreci profesyonel, şeffaf ve hızlı bir şekilde tamamlayalım.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/appointment" className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95">
                  Randevu Oluştur
                </Link>
                <button onClick={openWhatsApp} className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-xl flex items-center justify-center gap-3">
                  <MessageCircle /> Bize Yazın
                </button>
              </div>
           </div>
        </div>

        <div className="mt-12 p-6 bg-slate-200/50 rounded-3xl border border-slate-200 flex gap-4 text-slate-500">
           <Info className="shrink-0 text-blue-500" size={24} />
           <p className="text-xs leading-relaxed font-medium">
             <strong>Yasal Uyarı:</strong> Bu sayfadaki bilgiler T.C. Çalışma ve Sosyal Güvenlik Bakanlığı ve 5901 Sayılı Türk Vatandaşlığı Kanunu baz alınarak hazırlanmıştır. Nihai vatandaşlık kararı T.C. Cumhurbaşkanlığı makamına aittir. Her başvuru kendi özel şartları içinde değerlendirilir.
           </p>
        </div>

      </div>
    </div>
  );
};

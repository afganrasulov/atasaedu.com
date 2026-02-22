import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  Info, 
  Scale, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  Building2,
  Plane,
  HeartPulse,
  UserCheck,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Users,
  Shield,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

interface ResidencyType {
  id: string;
  title: string;
  article: string;
  description: string;
  icon: React.ReactNode;
  subOptions?: ResidencyPurpose[];
}

interface ResidencyPurpose {
  id: string;
  label: string;
  articleRef: string;
  details: string;
  duration: string;
  icon: React.ReactNode;
}

const RESIDENCY_TYPES: ResidencyType[] = [
  {
    id: 'kisa',
    title: 'Kısa Dönem İkamet İzni',
    article: 'MADDE 31',
    icon: <Clock size={24} />,
    description: 'Turizm, iş, tedavi veya taşınmaz mülkiyeti gibi çeşitli amaçlarla Türkiye\'de kalacak yabancılar içindir.',
    subOptions: [
      { id: '31a', label: 'Bilimsel Araştırma', articleRef: '31/1-a', duration: 'En fazla 2 yıl', details: 'Bilimsel araştırma yapacak yabancılara verilir.', icon: <BookOpen size={20} /> },
      { id: '31b', label: 'Taşınmaz Mal Sahibi', articleRef: '31/1-b', duration: 'En fazla 2 yıl', details: 'Türkiye’de taşınmaz malı bulunan yabancılara verilir. Taşınmazın niteliği ve değeri Bakanlıkça belirlenir.', icon: <Building2 size={20} /> },
      { id: '31c', label: 'Ticari Bağlantı / İş Kurma', articleRef: '31/1-c', duration: 'En fazla 2 yıl', details: 'Ticari bağlantı kuracak veya iş kuracak yabancılar içindir.', icon: <Briefcase size={20} /> },
      { id: '31ç', label: 'Hizmet İçi Eğitim', articleRef: '31/1-ç', duration: 'En fazla 2 yıl', details: 'Hizmet içi eğitim programlarına katılacak yabancılar içindir.', icon: <UserCheck size={20} /> },
      { id: '31d', label: 'Eğitim / Öğrenci Değişimi', articleRef: '31/1-d', duration: 'En fazla 2 yıl', details: 'Anlaşmalar veya değişim programları çerçevesinde eğitim amaçlı geleceklere verilir.', icon: <Plane size={20} /> },
      { id: '31e', label: 'Turizm Amaçlı', articleRef: '31/1-e', duration: 'En fazla 2 yıl', details: 'Turistik gezi amacıyla kalacak yabancılara verilir.', icon: <Search size={20} /> },
      { id: '31f', label: 'Tedavi Amaçlı', articleRef: '31/1-f', duration: 'En fazla 2 yıl', details: 'Kamu sağlığına tehdit olmayan hastalıklarda tedavi görecekler içindir.', icon: <Stethoscope size={20} /> },
      { id: '31g', label: 'Adli / İdari Talep', articleRef: '31/1-g', duration: 'Talep süresince', details: 'Adli veya idari makamların kararına bağlı Türkiye’de kalması gerekenler içindir.', icon: <Scale size={20} /> },
      { id: '31ğ', label: 'Aileden Kısa Döneme Geçiş', articleRef: '31/1-ğ', duration: 'En fazla 2 yıl', details: 'Aile ikamet izni şartlarını kaybedip kısa döneme geçenler içindir.', icon: <HeartPulse size={20} /> },
      { id: '31h', label: 'Türkçe Öğrenme Kursu', articleRef: '31/1-h', duration: 'En fazla 2 yıl (Maks 2 defa)', details: 'Türkçe öğrenme kurslarına katılacak yabancılara verilir.', icon: <BookOpen size={20} /> },
      { id: '31ı', label: 'Kamu Aracılığıyla Eğitim', articleRef: '31/1-ı', duration: 'En fazla 2 yıl', details: 'Kamu kurumları aracılığıyla eğitim, araştırma, staj ve kurslara katılacaklar içindir.', icon: <ShieldCheck size={20} /> },
      { id: '31i', label: 'Mezuniyet Sonrası (6 Ay)', articleRef: '31/1-i', duration: '1 yıl (Tek seferlik)', details: 'Türkiye’de yükseköğrenimini tamamlayıp mezuniyetten itibaren 6 ay içinde başvuranlar içindir.', icon: <GraduationCap size={20} /> },
      { id: '31j', label: 'Büyük Ölçekli Yatırımcı', articleRef: '31/1-j', duration: 'En fazla 5 yıl', details: 'Cumhurbaşkanınca belirlenen kapsam ve tutarda yatırım yapacaklar ve aileleri içindir.', icon: <Shield size={20} /> },
      { id: '31k', label: 'KKTC Vatandaşları', articleRef: '31/1-k', duration: 'En fazla 5 yıl', details: 'Kuzey Kıbrıs Türk Cumhuriyeti vatandaşları için düzenlenen türdür.', icon: <ShieldCheck size={20} /> },
    ]
  },
  { 
    id: 'aile', 
    title: 'Aile İkamet İzni', 
    article: 'MADDE 34', 
    icon: <Users size={24} />,
    description: 'Türk vatandaşlarının veya yasal izinli yabancıların eş ve çocukları için düzenlenen izin türüdür.' 
  },
  { 
    id: 'ogrenci', 
    title: 'Öğrenci İkamet İzni', 
    article: 'MADDE 38', 
    icon: <GraduationCap size={24} />,
    description: 'Türkiye\'de ön lisans, lisans, yüksek lisans ve doktora eğitimi alacak öğrenciler içindir.' 
  },
  { 
    id: 'uzun', 
    title: 'Uzun Dönem İkamet İzni', 
    article: 'MADDE 42', 
    icon: <History size={24} />,
    description: 'Türkiye\'de kesintisiz 8 yıl ikamet eden yabancılara süresiz oturum hakkı tanıyan izin türüdür.' 
  },
  { 
    id: 'insani', 
    title: 'İnsani İkamet İzni', 
    article: 'MADDE 46', 
    icon: <HeartPulse size={24} />,
    description: 'Acil durumlar ve insani nedenlerle Bakanlık onayıyla verilen özel bir ikamet türüdür.' 
  },
  { 
    id: 'magdur', 
    title: 'İnsan Ticareti Mağduru', 
    article: 'MADDE 48', 
    icon: <Shield size={24} />,
    description: 'İnsan ticareti mağduru olduğu kuvvetli şüphe duyulan yabancılara yönelik koruma amaçlı izindir.' 
  }
];

export const ResidencyTypeQueryPage: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<ResidencyType | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<ResidencyPurpose | null>(null);

  const reset = () => {
    setStep(1);
    setSelectedType(null);
    setSelectedPurpose(null);
  };

  const handleTypeSelect = (type: ResidencyType) => {
    setSelectedType(type);
    if (type.subOptions) {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handlePurposeSelect = (purpose: ResidencyPurpose) => {
    setSelectedPurpose(purpose);
    setStep(3);
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-slate-50">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-8">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm">
            <ArrowLeft size={18} /> UYGULAMALARA DÖN
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-indigo-600 mb-6 shadow-xl border border-slate-100">
             <Scale size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">İkamet İzni Çeşitleri</h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto font-medium">
            Türkiye'deki kalış amacınıza göre en uygun ikamet izni türünü ve yasal dayanağını öğrenin.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12 space-y-6"
              >
                <div className="text-center mb-8">
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">ADIM 1 / 2</span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-4">Hangi temel ikamet türüyle ilgileniyorsunuz?</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RESIDENCY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTypeSelect(type)}
                      className="group p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all text-left flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              {type.icon}
                           </div>
                           <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{type.title}</h3>
                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">{type.article}</div>
                        <p className="text-sm text-slate-500 leading-relaxed">{type.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && selectedType && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <div className="text-center mb-10">
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 mx-auto mb-4">
                    <ArrowLeft size={12}/> Geri Dön
                  </button>
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">ADIM 2 / 2</span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-4">Kalış amacınız nedir?</h2>
                  <p className="text-slate-500 text-sm mt-1">Kısa dönem ikamet izni alabilmek için geçerli bir gerekçe seçmelisiniz.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedType.subOptions?.map((purpose) => (
                    <button
                      key={purpose.id}
                      onClick={() => handlePurposeSelect(purpose)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {purpose.icon}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{purpose.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12 flex-1 flex flex-col justify-center text-center"
              >
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ShieldCheck size={40} />
                </div>
                
                <h2 className="text-3xl font-black text-slate-900 mb-2">Sorgulama Sonucu</h2>
                <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-8">
                  {selectedPurpose ? `Madde ${selectedPurpose.articleRef}` : `Madde ${selectedType?.article}`}
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-left space-y-6 mb-10 max-w-2xl mx-auto w-full">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-2">UYGUN İZİN TÜRÜ</h4>
                    <p className="text-xl font-bold text-slate-900">{selectedType?.title}</p>
                    {selectedPurpose && <p className="text-indigo-600 font-bold mt-1">({selectedPurpose.label})</p>}
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-2">YASAL DAYANAK</h4>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      {selectedPurpose ? selectedPurpose.details : selectedType?.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3 flex-1">
                      <Clock size={20} className="text-indigo-500" />
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase">STANDART SÜRE</h4>
                        <p className="text-sm font-bold text-slate-800">{selectedPurpose?.duration || 'İdarece Belirlenir'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={reset} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                    Yeni Sorgulama
                  </button>
                  <button onClick={openWhatsApp} className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <MessageCircle size={20} /> Uzmana Danış
                  </button>
                </div>

                <p className="mt-8 text-[10px] text-slate-400 font-medium max-w-md mx-auto">
                  * Bilgiler 6458 sayılı Yabancılar ve Uluslararası Koruma Kanunu baz alınarak hazırlanmıştır. Başvurular, idarenin takdirine ve güncel kriterlere tabidir.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Helper function for dynamic Tailwind classes
function getColorClasses(color: string) {
  switch (color) {
    case 'blue': return 'from-blue-500 to-blue-700';
    case 'green': return 'from-green-500 to-green-700';
    case 'orange': return 'from-orange-500 to-orange-700';
    case 'purple': return 'from-purple-500 to-purple-700';
    case 'red': return 'from-red-500 to-red-700';
    case 'teal': return 'from-teal-500 to-teal-700';
    case 'yellow': return 'from-yellow-500 to-yellow-700';
    default: return 'from-slate-500 to-slate-700';
  }
}

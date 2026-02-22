
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, XCircle, RotateCcw, Calculator, 
  ArrowRight, ArrowLeft, Phone, Calendar, MessageCircle, HelpCircle, AlertTriangle, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhatsApp } from '../whatsapp/WhatsAppContext';

// Define types for question logic
interface Outcome {
  nextStep?: number;
  fail?: boolean;
  message?: string;
  success?: boolean;
}

interface Question {
  id: number;
  text: string;
  subText?: string;
  yes: Outcome;
  no: Outcome;
}

// Logic based on PDF
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Türkiye'de yasal izinle tam 8 yıldır kalıyor musunuz?",
    subText: "Öğrenci ikametlerinin yarısı, diğerlerinin tamamı sayılır.",
    yes: { nextStep: 2 },
    no: { fail: true, message: "Uzun dönem (süresiz) ikamet alabilmek için Türkiye'de en az 8 yıl yaşamış olmanız gerekir." }
  },
  {
    id: 2,
    text: "Son 5 yıl içinde, herhangi bir yılda 6 aydan fazla yurt dışında kaldınız mı?",
    subText: "Tek bir yıl içinde toplam 180 günü geçen yurt dışı tatili veya ziyareti.",
    yes: { fail: true, message: "Bir yıl içinde 180 günden fazla yurt dışında kalmak hakkınızı kaybettirir." },
    no: { nextStep: 3 }
  },
  {
    id: 3,
    text: "Son 5 yılda TOPLAMDA 1 yıldan fazla yurt dışında kaldınız mı?",
    subText: "Son 5 yılın tüm yurt dışı çıkışları toplandığında 365 günü geçiyor mu?",
    yes: { fail: true, message: "Son 5 yılda toplam 1 yıldan fazla yurt dışında kalmış olmanız hakkınızı kaybettirir." },
    no: { nextStep: 4 }
  },
  {
    id: 4,
    text: "Hiç Türkiye'ye giriş yapmadan, tek seferde 6 ay boyunca yurt dışında kaldınız mı?",
    subText: "Aralıksız 6 ay (yaklaşık 180 gün) yurt dışı kalışı.",
    yes: { fail: true, message: "Tek seferde 6 aydan fazla yurt dışında kalmak devamlılığı bozar." },
    no: { nextStep: 5 }
  },
  {
    id: 5,
    text: "Düzenli bir geliriniz (Maaş, Emekli Aylığı veya Bankada Para) var mı?",
    subText: "Kendinizin ve ailenizin geçimini sağlayacak maddi gücünüz olmalı.",
    yes: { nextStep: 6 },
    no: { fail: true, message: "Devlete yük olmamak için düzenli gelir şartı aranmaktadır." }
  },
  {
    id: 6,
    text: "Son 3 yıl içinde devletten Sosyal Yardım aldınız mı?",
    subText: "Belediyelerden veya Kaymakamlıktan alınan nakdi yardımlar.",
    yes: { fail: true, message: "Son 3 yılda sosyal yardım almamış olma şartı vardır." },
    no: { success: true }
  }
];

export const LongTermEligibilityWizard: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [maxReachedIndex, setMaxReachedIndex] = useState(0);
  const [result, setResult] = useState<'pending' | 'success' | 'fail'>('pending');
  const [failReason, setFailReason] = useState('');

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  // Update max reached step for navigation
  useEffect(() => {
    if (currentQuestionIndex > maxReachedIndex) {
      setMaxReachedIndex(currentQuestionIndex);
    }
  }, [currentQuestionIndex, maxReachedIndex]);

  const handleAnswer = (answer: 'yes' | 'no') => {
    const outcome = answer === 'yes' ? currentQuestion.yes : currentQuestion.no;

    if (outcome.fail) {
      setFailReason(outcome.message || 'Kriterler sağlanamadı.');
      setResult('fail');
    } else if (outcome.success) {
      setResult('success');
    } else if (outcome.nextStep) {
      setCurrentQuestionIndex(outcome.nextStep - 1); // Array index is id - 1
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const goForward = () => {
    if (currentQuestionIndex < maxReachedIndex) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const resetWizard = () => {
    setCurrentQuestionIndex(0);
    setMaxReachedIndex(0);
    setResult('pending');
    setFailReason('');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      
      {/* Header */}
      <div className="container mx-auto px-4 max-w-4xl mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-lg font-bold mb-4">
           <Calculator size={24} />
           <span>Uygunluk Testi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">Uzun Dönem İkamet Sorgulama</h1>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 border-slate-100 overflow-hidden relative min-h-[500px] flex flex-col">
          
          {/* Progress Bar */}
          {result === 'pending' && (
            <div className="w-full bg-slate-200 h-4">
              <div 
                className="bg-purple-600 h-full transition-all duration-500 ease-out rounded-r-full"
                style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          )}

          <div className="p-6 md:p-12 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* QUESTIONS */}
              {result === 'pending' && (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full"
                >
                  <div className="mb-10 text-center md:text-left">
                    <div className="flex justify-between items-center mb-4">
                       <span className="inline-block text-lg font-bold text-purple-600 bg-purple-50 px-4 py-1 rounded-lg border border-purple-100">
                         Soru {currentQuestionIndex + 1} / {QUESTIONS.length}
                       </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                      {currentQuestion.text}
                    </h2>
                    {currentQuestion.subText && (
                      <p className="text-xl text-slate-500 font-medium flex items-start gap-2 justify-center md:justify-start bg-slate-50 p-3 rounded-xl">
                        <HelpCircle className="shrink-0 mt-1 text-purple-400" />
                        {currentQuestion.subText}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <button 
                      onClick={() => handleAnswer('yes')}
                      className="group relative bg-green-50 hover:bg-green-600 border-4 border-green-100 hover:border-green-600 rounded-3xl p-8 transition-all duration-300 transform active:scale-95 text-left flex items-center gap-6 shadow-sm hover:shadow-xl"
                    >
                      <div className="w-16 h-16 bg-green-200 text-green-700 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-green-600 transition-colors">
                        <CheckCircle size={40} strokeWidth={3} />
                      </div>
                      <div>
                        <span className="block text-3xl font-black text-green-900 group-hover:text-white mb-1">EVET</span>
                        <span className="text-lg text-green-700 group-hover:text-green-100 font-medium">Bu durum benim için geçerli</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleAnswer('no')}
                      className="group relative bg-red-50 hover:bg-red-600 border-4 border-red-100 hover:border-red-600 rounded-3xl p-8 transition-all duration-300 transform active:scale-95 text-left flex items-center gap-6 shadow-sm hover:shadow-xl"
                    >
                      <div className="w-16 h-16 bg-red-200 text-red-700 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-red-600 transition-colors">
                        <XCircle size={40} strokeWidth={3} />
                      </div>
                      <div>
                        <span className="block text-3xl font-black text-red-900 group-hover:text-white mb-1">HAYIR</span>
                        <span className="text-lg text-red-700 group-hover:text-red-100 font-medium">Bu durum geçerli değil</span>
                      </div>
                    </button>
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button 
                      onClick={goBack}
                      disabled={currentQuestionIndex === 0}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                        currentQuestionIndex === 0 
                          ? 'opacity-0 pointer-events-none' 
                          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronLeft size={20} /> Geri Git
                    </button>

                    <button 
                      onClick={goForward}
                      disabled={currentQuestionIndex >= maxReachedIndex}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                        currentQuestionIndex >= maxReachedIndex 
                          ? 'opacity-30 grayscale cursor-not-allowed' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      İleri Git <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* FAIL SCREEN */}
              {result === 'fail' && (
                <motion.div
                  key="fail"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="w-28 h-28 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                    <AlertTriangle size={64} />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Üzülmeyin, Çözüm Var!</h2>
                  
                  <div className="bg-orange-50 border-l-8 border-orange-500 rounded-r-xl p-6 mb-8 text-left w-full max-w-2xl">
                    <h3 className="font-bold text-orange-900 text-xl mb-2">Engel Olan Durum:</h3>
                    <p className="text-orange-800 text-lg font-medium leading-relaxed">
                      "{failReason}"
                    </p>
                  </div>
                  
                  <p className="text-xl text-slate-600 mb-8 max-w-xl">
                    Uzun dönem şartlarını sağlamıyor olabilirsiniz ama <strong>Kısa Dönem</strong> veya <strong>Aile İkameti</strong> ile Türkiye'de kalmaya devam edebilirsiniz.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    <button 
                      onClick={openWhatsApp}
                      className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-5 rounded-2xl shadow-lg hover:shadow-green-200/50 transition-all transform hover:-translate-y-1"
                    >
                      <MessageCircle size={28} /> WhatsApp'tan Sorun
                    </button>
                    
                    <Link 
                      to="/appointment" 
                      className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-5 rounded-2xl shadow-lg hover:shadow-blue-200/50 transition-all transform hover:-translate-y-1"
                    >
                      <Calendar size={28} /> Randevu Alın
                    </Link>
                  </div>

                  <button 
                    onClick={resetWizard}
                    className="mt-8 flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-lg p-4"
                  >
                    <RotateCcw size={20} /> Testi Baştan Başlat
                  </button>
                </motion.div>
              )}

              {/* SUCCESS SCREEN */}
              {result === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl border-4 border-white">
                    <CheckCircle size={72} strokeWidth={3} />
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Harika Haber!</h2>
                  <p className="text-2xl text-slate-700 mb-8 max-w-2xl font-medium">
                    Verdiğiniz cevaplara göre <strong>Süresiz Oturum İzni</strong> almaya uygunsunuz.
                  </p>
                  
                  <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100 mb-8 text-left w-full max-w-2xl">
                    <h4 className="font-bold text-purple-900 text-lg mb-2 flex items-center gap-2">
                      <ArrowRight className="bg-purple-200 rounded-full p-1" size={24}/> Sırada Ne Var?
                    </h4>
                    <p className="text-purple-800 text-lg">
                      Bu hakkı kaybetmemek için dosyanızın kusursuz hazırlanması gerekir. "Gün Sayım Belgesi" analizi için hemen uzmanımızla görüşün.
                    </p>
                  </div>

                  <Link 
                    to="/appointment" 
                    className="flex items-center justify-center gap-4 w-full max-w-lg bg-slate-900 hover:bg-slate-800 text-white text-2xl font-bold py-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                  >
                    Hemen İşlemleri Başlat <ArrowRight size={32} />
                  </Link>
                  
                  <button 
                      onClick={resetWizard}
                      className="mt-8 text-slate-400 hover:text-slate-600 text-lg font-medium"
                    >
                      Testi Tekrarla
                    </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

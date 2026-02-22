import React, { useState } from 'react';
import { 
  CheckCircle, AlertTriangle, ArrowRight, Bike, 
  Briefcase, ShieldCheck, Star, RefreshCw 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CourierEligibilityWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    residencyDuration: '', // 'less_3' or 'more_3'
    workType: '', // 'employee' or 'own_business'
    hasLicense: '' // 'yes' or 'no'
  });

  const currentYear = new Date().getFullYear();

  const handleOption = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setStep(prev => prev + 1);
  };

  const resetWizard = () => {
    setStep(1);
    setAnswers({ residencyDuration: '', workType: '', hasLicense: '' });
  };

  // --- RESULTS LOGIC ---
  const renderResult = () => {
    // SCENARIO 1: 3+ Years Residency (Golden Ticket)
    if (answers.residencyDuration === 'more_3') {
      return (
        <div className="animate-in zoom-in-95 duration-500">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-xl">
              EN AVANTAJLI YOL
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Star size={32} className="fill-current" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">3+ Muafiyetinden Yararlanabilirsiniz!</h3>
            <p className="text-green-800 mb-4">
              Son 5 yılın en az 3 yılını Türkiye'de yasal olarak geçirdiğiniz için <strong>"5 Türk İşçi Çalıştırma"</strong> ve <strong>"Mali Yeterlilik"</strong> şartlarından muafsınız.
            </p>
            <ul className="text-left bg-white/60 rounded-xl p-4 space-y-2 mb-6 text-sm text-green-900">
              <li className="flex items-center gap-2"><CheckCircle size={16} /> Kendi şahıs/LTD şirketinizi kurabilirsiniz.</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} /> P1* Yetki Belgesini %85 indirimli alabilirsiniz.</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} /> Motorunuzu kendi şirketiniz üzerine yapabilirsiniz.</li>
            </ul>
            <Link to="/appointment" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all">
              Muafiyetli Başvuru İçin Randevu Al
            </Link>
          </div>
        </div>
      );
    }

    // SCENARIO 2: Less than 3 Years & Wants Own Business (Hard but Possible with LTD)
    if (answers.residencyDuration === 'less_3' && answers.workType === 'own_business') {
      return (
        <div className="animate-in zoom-in-95 duration-500">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <Briefcase size={32} />
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Limited Şirket & P1 Yolu</h3>
            <p className="text-blue-800 mb-4">
              Kendi işinizin patronu olmak istiyorsunuz. Şahıs şirketi yerine <strong>Limited Şirket</strong> kurarak ilerlemeliyiz.
            </p>
            <ul className="text-left bg-white/60 rounded-xl p-4 space-y-2 mb-6 text-sm text-blue-900">
              <li className="flex items-center gap-2"><CheckCircle size={16} /> En düşük maliyetli Limited Şirket kurulumu.</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} /> 3 motor ile P1* Belgesi alma imkanı.</li>
              <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500"/> Denge kuralına (Türk işçi) dikkat edilmelidir.</li>
            </ul>
            <Link to="/appointment" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all">
              Şirket Kurulumu İçin Randevu Al
            </Link>
          </div>
        </div>
      );
    }

    // SCENARIO 3: Employee (Standard)
    return (
      <div className="animate-in zoom-in-95 duration-500">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold text-orange-900 mb-2">SGK'lı Çalışma İzni</h3>
          <p className="text-orange-800 mb-4">
            Bir lojistik firmasında veya restoranda kurye olarak çalışabilirsiniz. İşvereninizin size sponsor olması gerekir.
          </p>
          <ul className="text-left bg-white/60 rounded-xl p-4 space-y-2 mb-6 text-sm text-orange-900">
            <li className="flex items-center gap-2"><CheckCircle size={16} /> MYK Kurye Belgesi zorunludur.</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} /> Ehliyetinizi Türk ehliyetine çevirmelisiniz.</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} /> Motor şirkete ait veya kiralık olabilir.</li>
          </ul>
          <Link to="/appointment" className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all">
            İşlemleri Başlatmak İçin Randevu Al
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden relative">
      <div className="bg-slate-900 p-6 text-white text-center">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <Bike className="text-yellow-400" />
          Kurye Uygunluk Testi ({currentYear})
        </h3>
        <p className="text-slate-400 text-sm mt-1">3 soruda size en uygun yasal çalışma yolunu bulun.</p>
      </div>

      <div className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soru 1 / 3</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2">Türkiye'de ne kadar süredir yasal olarak (ikametli) bulunuyorsunuz?</h4>
              <p className="text-xs text-slate-500 mt-2">(Öğrenci ikameti hariç, son 5 yıl içindeki süre)</p>
            </div>
            <div className="grid gap-3">
              <button onClick={() => handleOption('residencyDuration', 'more_3')} className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-semibold text-slate-700 flex justify-between items-center group">
                3 Yıl ve Üzeri
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
              <button onClick={() => handleOption('residencyDuration', 'less_3')} className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-semibold text-slate-700 flex justify-between items-center group">
                3 Yıldan Az
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soru 2 / 3</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2">Nasıl çalışmak istiyorsunuz?</h4>
            </div>
            <div className="grid gap-3">
              <button onClick={() => handleOption('workType', 'own_business')} className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-semibold text-slate-700 flex justify-between items-center group">
                Kendi işimin patronu olmak istiyorum (Şirket Kurarak)
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
              <button onClick={() => handleOption('workType', 'employee')} className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-semibold text-slate-700 flex justify-between items-center group">
                Bir firmada maaşlı/primli çalışmak istiyorum
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soru 3 / 3</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2">A2 veya A Sınıfı Ehliyetiniz var mı?</h4>
            </div>
            <div className="grid gap-3">
              <button onClick={() => handleOption('hasLicense', 'yes')} className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-semibold text-slate-700 flex justify-between items-center group">
                Evet, var (Türk veya Yabancı)
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
              <button onClick={() => handleOption('hasLicense', 'no')} className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-semibold text-slate-700 flex justify-between items-center group">
                Hayır, yok
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
            </div>
          </div>
        )}

        {step > 3 && (
          <div className="relative">
             {renderResult()}
             <button 
                onClick={resetWizard}
                className="mx-auto flex items-center gap-2 text-slate-400 text-sm hover:text-slate-600 transition-colors"
             >
                <RefreshCw size={14} /> Testi Tekrarla
             </button>
          </div>
        )}

      </div>
      
      {/* Progress Bar */}
      {step <= 3 && (
        <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full">
           <div 
             className="h-full bg-yellow-500 transition-all duration-300"
             style={{ width: `${(step / 3) * 100}%` }}
           ></div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Globe, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CITIZENSHIP_RULES, CountryCitizenshipRule } from './dual-citizenship-data';

export const DualCitizenshipPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCitizenshipRule | null>(null);

  const filteredCountries = useMemo(() => {
    const term = searchTerm.toLocaleLowerCase('tr-TR').trim();
    if (!term) return [];
    
    return CITIZENSHIP_RULES.filter(c => 
      c.country.toLocaleLowerCase('tr-TR').includes(term)
    );
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCountry(null);
  };

  const handleSelect = (country: CountryCitizenshipRule) => {
    setSearchTerm(country.country);
    setSelectedCountry(country);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Serbest': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Kısıtlı': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Yasak': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Serbest': return <CheckCircle2 size={48} className="text-emerald-500" />;
      case 'Kısıtlı': return <AlertTriangle size={48} className="text-orange-500" />;
      case 'Yasak': return <XCircle size={48} className="text-red-500" />;
      default: return <HelpCircle size={48} className="text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Navigation */}
        <div className="mb-4 md:mb-12">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-white text-indigo-600 mb-6 shadow-2xl border border-indigo-50 transform rotate-3">
             <Globe size={48} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-6 tracking-tighter leading-none">
            Çifte Vatandaşlık <br/> <span className="text-indigo-600">Kontrolü</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Ülkenizin çifte vatandaşlığa izin verip vermediğini, kısıtlamaları ve yasal durumu anında öğrenin.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="relative group z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl">
              <Search className="absolute left-5 text-slate-400" size={24} />
              <input 
                type="text"
                placeholder="Ülke adı yazın (Örn: Almanya, Rusya, Özbekistan)..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-transparent border-none py-5 pl-14 pr-12 text-lg font-bold text-slate-900 placeholder-slate-400 outline-none focus:ring-0"
              />
            </div>

            {/* Dropdown Results */}
            <AnimatePresence>
              {searchTerm && !selectedCountry && filteredCountries.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-30 max-h-[300px] overflow-y-auto"
                >
                  {filteredCountries.map((country) => (
                    <button
                      key={country.country}
                      onClick={() => handleSelect(country)}
                      className="w-full text-left px-6 py-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{country.country}</span>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${
                        country.status === 'Serbest' ? 'bg-green-100 text-green-700' :
                        country.status === 'Yasak' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {country.status}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {selectedCountry ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="text-8xl mb-6 drop-shadow-md">{selectedCountry.flag}</div>
                
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                  {selectedCountry.country}
                </h2>
                
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 mb-8 ${getStatusColor(selectedCountry.status)}`}>
                  {selectedCountry.status === 'Serbest' && <CheckCircle2 size={20} />}
                  {selectedCountry.status === 'Kısıtlı' && <AlertTriangle size={20} />}
                  {selectedCountry.status === 'Yasak' && <XCircle size={20} />}
                  <span className="font-black text-lg uppercase tracking-wide">{selectedCountry.status}</span>
                </div>

                <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 w-full max-w-2xl mb-10">
                  <div className="flex flex-col items-center gap-4">
                     {getStatusIcon(selectedCountry.status)}
                     <p className="text-slate-600 text-lg font-medium leading-relaxed">
                       {selectedCountry.description}
                     </p>
                  </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                   <button 
                     onClick={() => { setSearchTerm(''); setSelectedCountry(null); }}
                     className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                   >
                     <Search size={20} /> Yeni Sorgulama Yap
                   </button>
                </div>
              </div>
            </motion.div>
          ) : (
            // Placeholder content when no result is selected
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-70"
            >
               <div className="bg-white/50 p-6 rounded-3xl border border-slate-100 text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                     <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900">Serbest</h3>
                  <p className="text-xs text-slate-500 mt-1">İki pasaporta da sahip olabilirsiniz.</p>
               </div>
               <div className="bg-white/50 p-6 rounded-3xl border border-slate-100 text-center">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                     <AlertTriangle size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900">Kısıtlı</h3>
                  <p className="text-xs text-slate-500 mt-1">Özel izin veya şartlar gereklidir.</p>
               </div>
               <div className="bg-white/50 p-6 rounded-3xl border border-slate-100 text-center">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                     <XCircle size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900">Yasak</h3>
                  <p className="text-xs text-slate-500 mt-1">Tek bir vatandaşlık seçmelisiniz.</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Footer */}
        <div className="mt-20 p-8 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-indigo-600">
                <FileText size={32} />
            </div>
            <div className="text-sm text-indigo-900 leading-relaxed text-center md:text-left">
                <p className="text-lg font-black mb-1">Yasal Bilgilendirme</p>
                <p className="opacity-80 font-medium">
                   Bu bilgiler ülkelerin vatandaşlık kanunları baz alınarak hazırlanmıştır. Kanunlar değişebileceğinden, vatandaşlık başvurusunda bulunmadan önce Atasa Danışmanlık uzmanlarından güncel teyit almanız önerilir.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

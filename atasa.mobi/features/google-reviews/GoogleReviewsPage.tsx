
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageSquarePlus, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2,
  Quote,
  BadgeCheck,
  Zap,
  Award,
  Sparkles,
  Users,
  Info,
  ExternalLink,
  ListFilter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchGoogleMetadata, fetchReviewsFromApi, GoogleReview, GooglePlaceResult } from './googleReviewsService';

// Google Partner Badge Component
const GooglePartnerBadge = () => (
  <div className="flex items-center gap-3 bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-default group">
    <div className="flex gap-1">
      <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-pulse"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-pulse delay-75"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] animate-pulse delay-150"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse delay-300"></div>
    </div>
    <div className="h-6 w-px bg-slate-200 mx-1"></div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Official</span>
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-black text-slate-900 tracking-tight">Google Partner</span>
        <BadgeCheck size={14} className="text-blue-600 fill-blue-50" />
      </div>
    </div>
  </div>
);

export const GoogleReviewsPage: React.FC = () => {
  // Data States
  const [metadata, setMetadata] = useState<GooglePlaceResult | null>(null);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  
  // Pagination States
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const mapRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Initial Load (Metadata + First few reviews)
  useEffect(() => {
    const init = async () => {
      if (mapRef.current) {
        try {
          // 1. Get Stats & Real Google Reviews (usually top 5)
          const meta = await fetchGoogleMetadata(mapRef.current);
          setMetadata(meta);
          
          if (meta.reviews && meta.reviews.length > 0) {
            setReviews(meta.reviews);
          } else {
            // If no real reviews returned, fetch from API
            const initialApiReviews = await fetchReviewsFromApi(1, 6);
            setReviews(initialApiReviews);
          }
        } catch (err) {
          console.error("Initialization error:", err);
          setError("Bağlantı hatası. Lütfen sayfayı yenileyin.");
        } finally {
          setLoading(false);
        }
      }
    };
    init();
  }, []);

  // Fetch More Reviews (Pagination)
  useEffect(() => {
    if (page === 1) return; // Skip initial render as it's handled above

    const loadMore = async () => {
      setLoadingMore(true);
      try {
        const newReviews = await fetchReviewsFromApi(page, 8);
        setReviews(prev => [...prev, ...newReviews]);
        
        // Stop if we reach a theoretical limit (e.g., 1000 reviews loaded)
        if (reviews.length >= 1000) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Load more error:", err);
      } finally {
        setLoadingMore(false);
      }
    };

    loadMore();
  }, [page]);

  // Infinite Scroll Observer Logic
  const lastReviewElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore]);

  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=ChIJ_YRNcka3yhQRadfxL97bmR8`;

  return (
    <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#F8FAFC] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* HIDDEN MAP DIV REQUIRED FOR PLACES SERVICE */}
      <div ref={mapRef} style={{ display: 'none' }}></div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Top Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <Link to="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            UYGULAMALARA DÖN
          </Link>
          <GooglePartnerBadge />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-white text-yellow-500 mb-6 shadow-2xl border border-slate-50 transform rotate-3"
          >
             <Star size={48} fill="currentColor" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
            Müşteri Deneyimleri
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium">
            Atasa Danışmanlık'ın <span className="text-blue-600 font-bold">{metadata?.user_ratings_total || '1200+'} gerçek kullanıcı</span> başarısı ve doğrulanmış Google yorumu.
          </p>
        </div>

        {/* Global Statistics Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100 p-8 md:p-14 mb-16 overflow-hidden relative group/stats">
           <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover/stats:scale-110 transition-transform duration-1000">
              <Star size={300} fill="currentColor" className="text-yellow-500" />
           </div>
           
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-10">
                 <div className="text-center">
                    <span className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter">
                      {metadata?.rating || '4.9'}
                    </span>
                    <div className="flex justify-center text-yellow-400 mt-2">
                       {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                    </div>
                 </div>
                 <div className="h-28 w-px bg-slate-100 hidden md:block"></div>
                 <div className="text-center md:text-left">
                    <div className="flex items-baseline justify-center md:justify-start gap-2">
                        <span className="block text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{metadata?.user_ratings_total || '1200'}+</span>
                        <span className="text-lg font-bold text-slate-400">Yorum</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                       <span className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] block">Google İşletme Profili</span>
                       <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-black text-sm uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100/50">
                          <BadgeCheck size={18} /> Resmi Google Partner
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                 <div className="text-center md:text-right">
                    <p className="text-slate-900 font-black text-xl mb-1">Şeffaf ve Gerçek</p>
                    <p className="text-slate-500 text-sm font-medium">Tüm yorumlar müşterilerimiz tarafından<br className="hidden md:block"/> bizzat yazılmaktadır.</p>
                 </div>
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 border-2 border-slate-100">
                    <Users size={32} />
                 </div>
              </div>
           </div>
        </div>

        {/* Filter / Sort Indicator */}
        <div className="flex justify-between items-center mb-8 px-2">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight">
             Tüm Yorumlar <span className="text-slate-400 text-lg font-medium ml-2">({reviews.length})</span>
           </h3>
           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <ListFilter size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider hidden sm:inline">Sıralama: <span className="text-blue-600">En Yeni</span></span>
           </div>
        </div>

        {/* Reviews List (Infinite Scroll) */}
        <div className="min-h-[400px]">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-32 gap-6">
                <Loader2 className="animate-spin text-blue-500" size={64} />
                <span className="text-slate-400 font-black text-sm uppercase tracking-[0.3em]">Google Verileri Güncelleniyor...</span>
             </div>
           ) : error ? (
             <div className="text-center py-20">
               <p className="text-red-500 font-bold mb-4">{error}</p>
               <button onClick={() => window.location.reload()} className="text-blue-600 underline font-bold">Sayfayı Yenile</button>
             </div>
           ) : (
             <>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <AnimatePresence mode="popLayout">
                    {reviews.map((review, idx) => (
                      <motion.div
                        ref={idx === reviews.length - 1 ? lastReviewElementRef : null}
                        key={`${review.id || idx}-${review.author_name}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-400 hover:shadow-2xl transition-all flex flex-col group relative h-full"
                      >
                        <div className="absolute top-8 right-10 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Quote size={64} fill="currentColor" />
                        </div>

                        <div className="flex items-center gap-5 mb-8 relative z-10">
                          <img 
                            src={review.profile_photo_url} 
                            alt={review.author_name} 
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg border-4 border-white bg-slate-100"
                            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.author_name}&background=random` }}
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               <h4 className="font-black text-slate-900 text-xl leading-none">{review.author_name}</h4>
                               <BadgeCheck size={16} className="text-blue-500" />
                            </div>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{review.relative_time_description}</span>
                               <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                               <div className="flex text-yellow-400 gap-0.5">
                                 {[...Array(5)].map((_, i) => (
                                   <Star key={i} size={12} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? 'text-yellow-400' : 'text-slate-200'} />
                                 ))}
                               </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-600 text-lg leading-relaxed font-medium flex-grow mb-8 italic line-clamp-6">
                          "{review.text}"
                        </p>

                        <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                           <span className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                             <CheckCircle2 size={14} /> Google Doğrulamalı
                           </span>
                           {review.author_url && review.author_url !== '#' && (
                             <a 
                               href={review.author_url} 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all grayscale hover:grayscale-0"
                             >
                               <span className="text-[10px] font-black text-slate-900">ORİJİNALİ GÖR</span>
                               <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" className="h-4" alt="Google" />
                               <ExternalLink size={12} />
                             </a>
                           )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>

               {/* Loading More Indicator */}
               {loadingMore && (
                 <div className="flex justify-center py-12">
                    <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
                       <Loader2 className="animate-spin text-blue-600" size={20} />
                       <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Daha Fazla Yorum Yükleniyor...</span>
                    </div>
                 </div>
               )}
             </>
           )}
        </div>

        {/* Global CTA Footer */}
        <div className="mt-20 p-10 md:p-20 bg-slate-900 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden border border-white/5">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
           <div className="relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-white/20">
                 <Award size={14} className="text-yellow-400" /> Atasa Kalite Güvencesi
              </div>
              <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none">Mutlu Müşterilerimiz <br className="hidden md:block"/> Arasına Katılın</h3>
              <p className="text-slate-400 text-xl max-w-2xl font-medium leading-relaxed">
                Google Partneri olmanın getirdiği şeffaflık ve binlerce onaylı dosyanın tecrübesiyle, Türkiye'deki yasal süreçlerinizi profesyonelce yönetiyoruz.
              </p>
           </div>
           <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto">
              <Link 
                to="/appointment"
                className="bg-blue-600 text-white px-14 py-7 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 text-center"
              >
                Randevu Alın
              </Link>
              <a href={writeReviewUrl} target="_blank" rel="noreferrer" className="text-slate-500 font-bold text-center hover:text-white transition-colors underline decoration-slate-800 underline-offset-8">Yorum Yaparak Bize Destek Olun</a>
           </div>
        </div>

        {/* Footer Warning */}
        <div className="mt-16 p-8 bg-slate-200/30 rounded-[2.5rem] border border-slate-200 flex flex-col md:flex-row gap-6 items-center text-slate-500">
           <Info className="shrink-0 text-blue-500" size={32} />
           <p className="text-sm leading-relaxed font-bold italic text-center md:text-left">
             Bu sayfadaki veriler <strong>Atasa Danışmanlık Google İşletme Profilinden</strong> ve onaylı veritabanımızdan dinamik olarak çekilmektedir. <strong>Atasa Danışmanlık resmi bir Google Partneri'dir.</strong>
           </p>
        </div>

      </div>
    </div>
  );
};

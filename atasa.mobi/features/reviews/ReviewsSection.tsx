import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Loader2, MessageSquarePlus, ExternalLink } from 'lucide-react';
import { Review } from '../../types';
import { fetchGoogleReviews, getTotalRating } from './reviewsService';
import { ReviewCard } from './ReviewCard';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const totalStats = getTotalRating();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchGoogleReviews();
        setReviews(data);
      } catch (error) {
        console.error("Failed to load reviews", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Section Header with Google Branding */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-2 animate-fade-in-up">
            <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-slate-500 font-bold text-lg">Reviews</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Müşterilerimiz Ne Diyor?</h2>
          
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-full border border-slate-100 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="text-3xl font-bold text-slate-900">{totalStats.average}</span>
            <div className="flex flex-col items-start">
              <div className="flex text-yellow-400 text-sm">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <span className="text-xs text-slate-500">{totalStats.count} Yorum Google'da</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <Loader2 className="animate-spin" size={32} />
              <span className="text-sm">Yorumlar Yükleniyor...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <a 
            href="https://search.google.com/local/writereview?placeid=ChIJ_YRNcka3yhQRadfxL97bmR8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-2 group"
          >
            <MessageSquarePlus size={20} />
            Google'da Yorum Yaz
          </a>
          
          <a 
            href="https://www.google.com/maps/place/?q=place_id:ChIJ_YRNcka3yhQRadfxL97bmR8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2"
          >
            Tüm Yorumları Gör <ArrowRight size={18} className="text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
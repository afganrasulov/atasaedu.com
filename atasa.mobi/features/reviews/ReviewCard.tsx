import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={review.avatar} 
            alt={review.author} 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{review.author}</h4>
            <span className="text-xs text-slate-500">{review.date}</span>
          </div>
        </div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
          alt="G" 
          className="w-5 h-5" 
        />
      </div>
      
      <div className="flex text-yellow-400 mb-3 text-xs">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            fill={i < review.rating ? "currentColor" : "none"} 
            className={i < review.rating ? "text-yellow-400" : "text-slate-300"}
          />
        ))}
      </div>
      
      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 flex-grow">
        "{review.text}"
      </p>
    </div>
  );
};
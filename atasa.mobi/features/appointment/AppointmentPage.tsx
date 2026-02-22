import React from 'react';
import { AppointmentForm } from './AppointmentForm';
import { Calendar } from 'lucide-react';

export const AppointmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-6 md:pt-32 pb-20 relative">
       {/* Background Glow - Light Mode */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[120px] pointer-events-none opacity-60"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="mb-6 md:mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-blue-600 mb-3 md:mb-6 shadow-lg shadow-blue-100 border border-white">
             <Calendar size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Online Randevu</h1>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            Size özel danışmanlık hizmeti almak için formu eksiksiz doldurun. Uzman ekibimizle profesyonel bir başlangıç yapın.
          </p>
        </div>
        
        <AppointmentForm />
      </div>
    </div>
  );
};
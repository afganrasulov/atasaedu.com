"use client";

import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

export function CtaBanner() {
    return (
        <section className="relative w-full bg-gradient-to-r from-blue-700 to-blue-900 py-10 lg:py-14 overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500 opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-sm shadow-2xl">

                    {/* Left Text Block */}
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 text-white shadow-inner backdrop-blur-md">
                            <MessageCircle className="w-8 h-8 opacity-90" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                                Çevrimiçi Bilgi Alın
                            </h2>
                            <p className="text-blue-100/80 text-sm md:text-base font-medium">
                                Profesyonel Danışmanlarından Destek Alın!
                            </p>
                        </div>
                    </div>

                    {/* Right Action Block */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="bg-white text-blue-900 hover:bg-gray-100 shadow-xl px-8 h-12 rounded-full inline-flex items-center gap-2 font-bold tracking-wide transition-all duration-300 group">
                            BİLGİ AL
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 h-12 rounded-full font-bold hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg">
                            <MessageCircle className="w-5 h-5" /> WhatsApp
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}

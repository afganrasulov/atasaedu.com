"use client";

import React from "react";
import Image from "next/image";

export function BursarySection() {
    return (
        <section className="relative w-full bg-slate-900 py-20 lg:py-28 overflow-hidden">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-campus.jpg"
                    alt="Campus Background"
                    fill
                    className="object-cover opacity-20 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/40" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span className="w-12 h-[2px] bg-red-500" />
                        <span className="text-red-400 font-bold uppercase tracking-widest text-sm">Hazır mısınız?</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                        Türkiye'de eğitimin kapılarını aralayan cazip <span className="text-red-500">burs</span> olanaklarıyla hayalinizdeki üniversite eğitimine adım atın!
                    </h2>
                </div>
            </div>
        </section>
    );
}

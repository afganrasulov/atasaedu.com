"use client";

import React from "react";
import Image from "next/image";

// Sample logos to be used in the infinite scroll or flex row
const logos = [
    "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-logos/altinbas.png",
    "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-logos/ankara-bilim.png",
    "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-logos/medipol.png",
    "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-logos/antalya-bilim.png",
    "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-logos/atlas.png",
    "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-logos/bau.png",
];

export function PartnersSection() {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Ortaklarımız</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800">
                        <span className="text-blue-600">374+</span> Ortağımız Var
                    </h2>
                </div>

                {/* Logo Carousel / Grid Container */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {[...logos, ...logos].map((src, idx) => (
                        <div key={idx} className="relative w-32 h-16 transition-transform hover:scale-110">
                            <Image
                                src={src}
                                alt={`Partner Logo ${idx}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

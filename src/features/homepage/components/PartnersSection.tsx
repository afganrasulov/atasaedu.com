"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase, getLogoUrl } from "@/lib/supabase";

interface UniversityLogo {
    id: number;
    name: string;
    logo_url: string | null;
}

export function PartnersSection() {
    const [logos, setLogos] = useState<UniversityLogo[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function fetchLogos() {
            const { data, count: totalCount } = await supabase
                .from("universities")
                .select("id, name, logo_url", { count: "exact" })
                .not("logo_url", "is", null)
                .order("name");

            if (data) {
                setLogos(data as UniversityLogo[]);
                setCount(totalCount ?? data.length);
            }
        }
        fetchLogos();
    }, []);

    if (logos.length === 0) {
        return (
            <section className="py-16 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Ortaklarımız</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800">
                            <span className="text-blue-600">Yükleniyor...</span>
                        </h2>
                    </div>
                    {/* Skeleton loader */}
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="w-28 h-14 bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Duplicate logos for seamless infinite scroll
    const marqueeLogos = [...logos, ...logos];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Ortaklarımız</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800">
                        <span className="text-blue-600">{count}+</span> Ortağımız Var
                    </h2>
                </div>

                {/* Infinite Marquee */}
                <div className="relative">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="overflow-hidden">
                        <div className="partners-marquee flex items-center gap-12 w-max">
                            {marqueeLogos.map((uni, idx) => (
                                <div
                                    key={`${uni.id}-${idx}`}
                                    className="relative w-28 h-16 flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                                >
                                    <Image
                                        src={getLogoUrl(uni.logo_url)}
                                        alt={uni.name}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes marquee-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .partners-marquee {
                    animation: marquee-scroll 60s linear infinite;
                }
                .partners-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}

"use client";

import { Container } from "@/shared/components/ui/Container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SUPABASE_CDN = "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu";

const teamMembers = [
    {
        name: "Pusat Habib",
        role: "Eğitim Danışmanı",
        image: `${SUPABASE_CDN}/team/5.jpg`
    },
    {
        name: "Buse Yıldız",
        role: "Çalışma İzni Danışmanı",
        image: `${SUPABASE_CDN}/team/3.jpg`
    },
    {
        name: "Ömer Habib",
        role: "Yönetici ve Kurucu Ortağı",
        image: `${SUPABASE_CDN}/team/8.jpg`
    }
];

export function TeamSection() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden relative">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Column - Content */}
                    <div className="w-full lg:w-5/12 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 mb-4 justify-center lg:justify-start">
                            <span className="w-12 h-[2px] bg-red-500" />
                            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">DANIŞMANLARIMIZ</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#152239] leading-tight mb-6">
                            Uzman Eğitim Danışmanlarımızla Tanışın
                        </h2>

                        <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed">
                            Eğitim danışmanlarımız, Türkiye&apos;deki üniversite seçimi ve başvuru evraklarının hazırlanmasında yabancı öğrencilere özel destek sunar. Akademik hedeflerine en uygun üniversiteyi bulmaları ve başvuru sürecini sorunsuz geçirmeleri için yanlarında oluyoruz.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="bg-red-500 text-white font-bold px-8 h-14 rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-600 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 group">
                                BİZE ULAŞIN
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link href="/atasa-ekip">
                                <button className="border-2 border-gray-200 text-[#152239] font-bold px-8 h-14 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all duration-300">
                                    TÜM EKİBİ GÖR
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Team Grid */}
                    <div className="w-full lg:w-7/12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="text-center p-8 rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-100/50 transition-colors" />

                                    <div className="relative z-10 w-28 h-28 mx-auto rounded-full mb-6 overflow-hidden shadow-lg ring-4 ring-white group-hover:ring-blue-200 group-hover:scale-105 transition-all duration-500">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <h3 className="relative z-10 text-xl font-black text-[#152239] mb-2">{member.name}</h3>
                                    <p className="relative z-10 text-blue-600 text-sm font-bold uppercase tracking-widest">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}


"use client";

import { Container } from "@/shared/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

const blogPosts = [
    {
        title: "Yabancı Öğrencilere Türkiye'de Sınavsız Üniversite İmkanı: Geniş Eğitim Yelpazesi",
        excerpt: "Yabancı uyruklu öğrenciler için Türkiye'de üniversite eğitimi alma seçenekleri oldukça geniştir. Vakıf üniversiteleri, yabancı öğrencilere sınavsız kabul imkanı sunmaktadır.",
        image: "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/blog_1.jpg", // Placeholder
        date: "12 Kasım 2024",
        slug: "yabanci-ogrencilere-sinavsiz-universite"
    },
    {
        title: "Türkiye'de Eğitim Almanın 5 Harika Sebebi",
        excerpt: "Akademik kaliteden zengin kültüre kadar, Türkiye uluslararası öğrenciler için eşsiz bir destinasyon haline geliyor.",
        image: "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/blog_2.jpg", // Placeholder
        date: "05 Ekim 2024",
        slug: "turkiyede-egitim-almanin-5-sebebi"
    },
    {
        title: "Öğrenci İkamet İzni Nasıl Alınır?",
        excerpt: "Türkiye'de üniversite eğitimi görecek uluslararası öğrencilerin ikamet izni (oturma izni) almak için izlemesi gereken adımlar.",
        image: "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/blog_3.jpg", // Placeholder
        date: "28 Eylül 2024",
        slug: "ogrenci-ikamet-izni-nasil-alinir"
    }
];

export function BlogSection() {
    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center space-x-2 text-primary font-semibold mb-4">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            <span>Güncel Bloglar</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#152239] max-w-2xl leading-tight">
                            Eğitim ve Yaşam Rehberiniz
                        </h2>
                    </div>
                    <Link href="/blog" className="inline-flex items-center justify-center space-x-2 bg-[#152239] text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors font-medium">
                        <span>Tümünü Gör</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div key={index} className="group flex flex-col bg-white rounded-[2.5rem] shadow-soft border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden bg-gray-100 rounded-t-[2.5rem]">
                                {/* Normally Image would go here, placeholder for now since we don't have blog images yet in Supabase. We can use a colored div as fallback */}
                                <div className="absolute inset-0 bg-blue-50/50 flex items-center justify-center text-blue-200">
                                    <Image src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/logo-white.png" alt="Atasa" width={100} height={40} className="opacity-20 flex-shrink-0 object-contain" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow p-8">
                                <div className="flex items-center space-x-2 text-sm text-gray-400 font-medium mb-4">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#152239] mb-4 group-hover:text-primary transition-colors leading-snug">
                                    <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <span className="text-[#152239] font-semibold text-sm border-b-2 border-gray-200 pb-1 group-hover:border-blue-600 transition-colors inline-block">
                                        Devamını Oku
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    Quote,
    BadgeCheck,
    Award,
    Users,
    Info,
    ExternalLink,
    ListFilter,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/shared/components/ui/Container";
import {
    fetchGoogleMetadata,
    fetchReviewsFromApi,
    type GoogleReview,
    type GooglePlaceResult,
} from "./googleReviewsService";

/* ── Google Partner Badge ────────────────────────── */
function GooglePartnerBadge() {
    return (
        <div className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-default group">
            <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-pulse [animation-delay:75ms]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] animate-pulse [animation-delay:150ms]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse [animation-delay:300ms]" />
            </div>
            <div className="h-6 w-px bg-gray-200 mx-1" />
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">
                    Official
                </span>
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-[#152239] tracking-tight">
                        Google Partner
                    </span>
                    <BadgeCheck size={14} className="text-blue-600 fill-blue-50" />
                </div>
            </div>
        </div>
    );
}

/* ── Google Logo SVG ────────────────────────────── */
function GoogleLogoSvg() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-4"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    );
}

/* ── Main Section Component ─────────────────────── */
export function GoogleReviewsSection() {
    const [metadata, setMetadata] = useState<GooglePlaceResult | null>(null);
    const [reviews, setReviews] = useState<GoogleReview[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mapRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    // Initial load
    useEffect(() => {
        const init = async () => {
            if (!mapRef.current) return;
            try {
                const meta = await fetchGoogleMetadata(mapRef.current);
                setMetadata(meta);
                if (meta.reviews && meta.reviews.length > 0) {
                    setReviews(meta.reviews);
                } else {
                    const initial = await fetchReviewsFromApi(1, 6);
                    setReviews(initial);
                }
            } catch {
                setError("Bağlantı hatası. Lütfen sayfayı yenileyin.");
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    // Pagination
    useEffect(() => {
        if (page === 1) return;
        const loadMore = async () => {
            setLoadingMore(true);
            try {
                const newReviews = await fetchReviewsFromApi(page, 8);
                setReviews((prev) => [...prev, ...newReviews]);
                if (reviews.length >= 500) setHasMore(false);
            } catch {
                // silent
            } finally {
                setLoadingMore(false);
            }
        };
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    // Infinite scroll observer
    const lastReviewRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading || loadingMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((p) => p + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, loadingMore, hasMore]
    );

    const writeReviewUrl =
        "https://search.google.com/local/writereview?placeid=ChIJ_YRNcka3yhQRadfxL97bmR8";

    return (
        <div className="min-h-screen pt-6 md:pt-32 pb-20 bg-[#F0F4F8] overflow-x-hidden">
            {/* Hidden map div for Places API */}
            <div ref={mapRef} style={{ display: "none" }} />

            {/* Background gradient */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />

            <Container className="relative z-10 max-w-6xl">
                {/* Top Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        ANA SAYFAYA DÖN
                    </Link>
                    <GooglePartnerBadge />
                </div>

                {/* Hero */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-white text-yellow-500 mb-6 shadow-2xl border border-gray-50 rotate-3"
                    >
                        <Star size={48} fill="currentColor" />
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-black text-[#152239] mb-6 tracking-tight leading-none">
                        Müşteri Deneyimleri
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium">
                        Atasa Danışmanlık&apos;ın{" "}
                        <span className="text-blue-600 font-bold">
                            {metadata?.user_ratings_total || "1200+"} gerçek kullanıcı
                        </span>{" "}
                        başarısı ve doğrulanmış Google yorumu.
                    </p>
                </div>

                {/* Global Statistics Card */}
                <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-gray-100 p-8 md:p-14 mb-16 overflow-hidden relative group/stats">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover/stats:scale-110 transition-transform duration-1000">
                        <Star size={300} fill="currentColor" className="text-yellow-500" />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="text-center">
                                <span className="text-7xl md:text-9xl font-black text-[#152239] tracking-tighter">
                                    {metadata?.rating || "4.9"}
                                </span>
                                <div className="flex justify-center text-yellow-400 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={24} fill="currentColor" />
                                    ))}
                                </div>
                            </div>
                            <div className="h-28 w-px bg-gray-100 hidden md:block" />
                            <div className="text-center md:text-left">
                                <div className="flex items-baseline justify-center md:justify-start gap-2">
                                    <span className="block text-3xl md:text-5xl font-black text-[#152239] tracking-tight">
                                        {metadata?.user_ratings_total || "1200"}+
                                    </span>
                                    <span className="text-lg font-bold text-gray-400">Yorum</span>
                                </div>
                                <div className="flex flex-col gap-2 mt-2">
                                    <span className="text-gray-400 font-black text-xs uppercase tracking-[0.2em] block">
                                        Google İşletme Profili
                                    </span>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-black text-sm uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100/50">
                                        <BadgeCheck size={18} /> Resmi Google Partner
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="text-center md:text-right">
                                <p className="text-[#152239] font-black text-xl mb-1">
                                    Şeffaf ve Gerçek
                                </p>
                                <p className="text-gray-500 text-sm font-medium">
                                    Tüm yorumlar müşterilerimiz tarafından
                                    <br className="hidden md:block" /> bizzat yazılmaktadır.
                                </p>
                            </div>
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border-2 border-gray-100">
                                <Users size={32} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Indicator */}
                <div className="flex justify-between items-center mb-8 px-2">
                    <h3 className="text-2xl font-black text-[#152239] tracking-tight">
                        Tüm Yorumlar{" "}
                        <span className="text-gray-400 text-lg font-medium ml-2">
                            ({reviews.length})
                        </span>
                    </h3>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                        <ListFilter size={16} className="text-gray-400" />
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:inline">
                            Sıralama:{" "}
                            <span className="text-blue-600">En Yeni</span>
                        </span>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-6">
                            <Loader2 className="animate-spin text-blue-500" size={64} />
                            <span className="text-gray-400 font-black text-sm uppercase tracking-[0.3em]">
                                Google Verileri Güncelleniyor...
                            </span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <p className="text-red-500 font-bold mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-blue-600 underline font-bold"
                            >
                                Sayfayı Yenile
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                <AnimatePresence mode="popLayout">
                                    {reviews.map((review, idx) => (
                                        <motion.div
                                            ref={idx === reviews.length - 1 ? lastReviewRef : null}
                                            key={`${review.id || idx}-${review.author_name}`}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-blue-400 hover:shadow-2xl transition-all flex flex-col group relative h-full"
                                        >
                                            {/* Decorative Quote */}
                                            <div className="absolute top-8 right-10 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Quote size={64} fill="currentColor" />
                                            </div>

                                            {/* Author */}
                                            <div className="flex items-center gap-5 mb-8 relative z-10">
                                                <img
                                                    src={review.profile_photo_url}
                                                    alt={review.author_name}
                                                    className="w-16 h-16 rounded-2xl object-cover shadow-lg border-4 border-white bg-gray-100"
                                                    onError={(e) => {
                                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=random`;
                                                    }}
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-black text-[#152239] text-xl leading-none">
                                                            {review.author_name}
                                                        </h4>
                                                        <BadgeCheck
                                                            size={16}
                                                            className="text-blue-500"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                            {review.relative_time_description}
                                                        </span>
                                                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                        <div className="flex text-yellow-400 gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={12}
                                                                    fill={
                                                                        i < review.rating
                                                                            ? "currentColor"
                                                                            : "none"
                                                                    }
                                                                    className={
                                                                        i < review.rating
                                                                            ? "text-yellow-400"
                                                                            : "text-gray-200"
                                                                    }
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Review text */}
                                            <p className="text-gray-600 text-lg leading-relaxed font-medium flex-grow mb-8 italic line-clamp-6">
                                                &ldquo;{review.text}&rdquo;
                                            </p>

                                            {/* Footer */}
                                            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                                    <CheckCircle2 size={14} /> Google Doğrulamalı
                                                </span>
                                                {review.author_url &&
                                                    review.author_url !== "#" && (
                                                        <a
                                                            href={review.author_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all grayscale hover:grayscale-0"
                                                        >
                                                            <span className="text-[10px] font-black text-[#152239]">
                                                                ORİJİNALİ GÖR
                                                            </span>
                                                            <GoogleLogoSvg />
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Loading more indicator */}
                            {loadingMore && (
                                <div className="flex justify-center py-12">
                                    <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
                                        <Loader2
                                            className="animate-spin text-blue-600"
                                            size={20}
                                        />
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                                            Daha Fazla Yorum Yükleniyor...
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* CTA Footer */}
                <div className="mt-20 p-10 md:p-20 bg-[#152239] rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden border border-white/5">
                    <div className="relative z-10 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-white/20">
                            <Award size={14} className="text-yellow-400" /> Atasa Kalite
                            Güvencesi
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none">
                            Mutlu Müşterilerimiz
                            <br className="hidden md:block" /> Arasına Katılın
                        </h3>
                        <p className="text-gray-400 text-xl max-w-2xl font-medium leading-relaxed">
                            Google Partneri olmanın getirdiği şeffaflık ve binlerce onaylı
                            dosyanın tecrübesiyle, eğitim süreçlerinizi profesyonelce
                            yönetiyoruz.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto">
                        <Link
                            href="/iletisim"
                            className="bg-blue-600 text-white px-14 py-7 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 text-center"
                        >
                            İletişime Geç
                        </Link>
                        <a
                            href={writeReviewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-500 font-bold text-center hover:text-white transition-colors underline decoration-gray-800 underline-offset-8"
                        >
                            Yorum Yaparak Bize Destek Olun
                        </a>
                    </div>
                </div>

                {/* Footer Warning */}
                <div className="mt-16 p-8 bg-gray-200/30 rounded-[2.5rem] border border-gray-200 flex flex-col md:flex-row gap-6 items-center text-gray-500">
                    <Info className="shrink-0 text-blue-500" size={32} />
                    <p className="text-sm leading-relaxed font-bold italic text-center md:text-left">
                        Bu sayfadaki veriler{" "}
                        <strong>Atasa Danışmanlık Google İşletme Profilinden</strong> ve
                        onaylı veritabanımızdan dinamik olarak çekilmektedir.{" "}
                        <strong>
                            Atasa Danışmanlık resmi bir Google Partneri&apos;dir.
                        </strong>
                    </p>
                </div>
            </Container>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import {
    Youtube,
    Instagram,
    Star,
    BadgeCheck,
    ExternalLink,
} from "lucide-react";
import Link from "next/link";

/* ── TikTok Icon ─────────────────────────────────── */
const TikTokIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
);

/* ── Platforms Data ──────────────────────────────── */
const platforms = [
    {
        name: "YouTube",
        handle: "@atasadanismanlik",
        value: "100K+",
        label: "Abone",
        icon: Youtube,
        color: "from-red-500 to-red-600",
        iconBg: "bg-red-500/10",
        iconColor: "text-red-500",
        hoverBorder: "hover:border-red-200",
        url: "https://youtube.com/@atasadanismanlik",
    },
    {
        name: "Instagram",
        handle: "@atasadanismanlik",
        value: "50K+",
        label: "Takipçi",
        icon: Instagram,
        color: "from-pink-500 to-purple-600",
        iconBg: "bg-gradient-to-br from-pink-500/10 to-purple-500/10",
        iconColor: "text-pink-500",
        hoverBorder: "hover:border-pink-200",
        url: "https://instagram.com/atasadanismanlik",
    },
    {
        name: "TikTok",
        handle: "@atasadanismanlik",
        value: "25K+",
        label: "Takipçi",
        icon: null,
        customIcon: TikTokIcon,
        color: "from-gray-800 to-black",
        iconBg: "bg-gray-900/10",
        iconColor: "text-gray-900",
        hoverBorder: "hover:border-gray-300",
        url: "https://tiktok.com/@atasadanismanlik",
    },
    {
        name: "Google",
        handle: "Atasa Danışmanlık",
        value: "4.9",
        label: "1200+ Yorum",
        icon: null,
        color: "from-blue-500 to-blue-600",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600",
        hoverBorder: "hover:border-blue-200",
        url: "/google-yorumlari",
        isInternal: true,
        showStars: true,
    },
];

/* ── Google Logo SVG ─────────────────────────────── */
function GoogleLogo({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

/* ── Main Component ──────────────────────────────── */
export function SocialProofSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

            <Container className="relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-4 justify-center"
                    >
                        <span className="w-12 h-[2px] bg-blue-600" />
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                            SOSYAL MEDYA
                        </span>
                        <span className="w-12 h-[2px] bg-blue-600" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-[#152239] tracking-tight mb-4"
                    >
                        Bizi Takip Eden Topluluk
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
                    >
                        Yüz binlerce kişi eğitim yolculuğunda bize güveniyor.
                        Sosyal medyada da yanınızdayız.
                    </motion.p>
                </div>

                {/* Platform Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {platforms.map((platform, index) => {
                        const Icon = platform.icon;
                        const CustomIcon = platform.customIcon;
                        const isGoogle = platform.name === "Google";

                        const cardContent = (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`
                                    bg-white rounded-[2rem] p-8 border border-gray-100
                                    shadow-[0_8px_30px_-8px_rgba(0,0,0,0.05)]
                                    hover:shadow-2xl hover:-translate-y-2
                                    ${platform.hoverBorder}
                                    transition-all duration-500 group cursor-pointer
                                    relative overflow-hidden h-full
                                `}
                            >
                                {/* Gradient background on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                                />

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl ${platform.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {isGoogle ? (
                                        <GoogleLogo />
                                    ) : Icon ? (
                                        <Icon className={`w-7 h-7 ${platform.iconColor}`} />
                                    ) : CustomIcon ? (
                                        <CustomIcon className={`w-7 h-7 ${platform.iconColor}`} />
                                    ) : null}
                                </div>

                                {/* Platform Name */}
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-[0.15em]">
                                        {platform.name}
                                    </span>
                                    {isGoogle && (
                                        <BadgeCheck size={14} className="text-blue-500" />
                                    )}
                                </div>

                                {/* Value */}
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-4xl md:text-5xl font-black text-[#152239] tracking-tighter leading-none">
                                        {platform.value}
                                    </span>
                                </div>

                                {/* Label / Stars */}
                                {platform.showStars ? (
                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <div className="flex text-yellow-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill="currentColor" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold text-gray-500">
                                            {platform.label}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-sm font-bold text-gray-500 block mt-1">
                                        {platform.label}
                                    </span>
                                )}

                                {/* Handle */}
                                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-400 truncate">
                                        {platform.handle}
                                    </span>
                                    <ExternalLink
                                        size={14}
                                        className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0"
                                    />
                                </div>
                            </motion.div>
                        );

                        return platform.isInternal ? (
                            <Link key={platform.name} href={platform.url} className="block h-full">
                                {cardContent}
                            </Link>
                        ) : (
                            <a
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full"
                            >
                                {cardContent}
                            </a>
                        );
                    })}
                </div>

                {/* Bottom Summary Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 bg-gradient-to-r from-[#152239] to-[#1e3a5f] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl"
                >
                    <div className="flex items-center gap-6 text-center md:text-left">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                            <BadgeCheck size={32} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-black mb-1">
                                Resmi Google Partner
                            </h3>
                            <p className="text-gray-400 text-sm font-medium">
                                Toplam <span className="text-white font-bold">175.000+</span> kişilik dijital topluluk
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/google-yorumlari"
                            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-blue-600 hover:border-blue-600 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap"
                        >
                            Yorumları Gör
                        </Link>
                        <a
                            href="https://youtube.com/@atasadanismanlik"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap"
                        >
                            <Youtube size={18} /> Abone Ol
                        </a>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

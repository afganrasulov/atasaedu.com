"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Phone, Mail, Menu, X, Clock, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { label: "ANA SAYFA", href: "/" },
    { label: "HAKKIMIZDA", href: "/hakkimizda" },
    { label: "HİZMETLERİMİZ", href: "/hizmetlerimiz" },
    { label: "BAŞVURU SÜRECİ", href: "/basvuru-sureci" },
    { label: "YORUMLAR", href: "/google-yorumlari" },
    { href: "/universiteler", label: "ÜNİVERSİTELERİMİZ" },
    { href: "/blog", label: "BLOG" },
    { href: "/iletisim", label: "İLETİŞİM" },
];

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
);

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full font-sans bg-white">
            {/* Top Bar */}
            <div className="hidden md:block relative h-12 bg-white">
                <div className="relative h-full flex items-center rounded-tl-[120px] bg-gradient-to-r from-[#0056D2] to-[#0040D1] transition-all overflow-visible shadow-sm">
                    {/* Info Section */}
                    <div className="flex-1 flex items-center">
                        <Container className="flex items-center text-white text-[13px] py-0 w-full ml-12">
                            <div className="flex items-center gap-8 font-medium tracking-wide">
                                <a href="tel:+908503086998" className="flex items-center gap-2 hover:text-blue-100 transition-all hover:scale-105 active:scale-95">
                                    <Phone size={14} className="fill-white" />
                                    <span>+90 (850) 308 69 98</span>
                                </a>
                                <span className="text-white/20 h-4 w-[1px] bg-white/20" />
                                <a href="mailto:tr@atasaedu.com" className="flex items-center gap-2 hover:text-blue-100 transition-all hover:scale-105 active:scale-95">
                                    <Mail size={14} className="fill-white" />
                                    <span>tr@atasaedu.com</span>
                                </a>
                                <span className="text-white/20 h-4 w-[1px] bg-white/20" />
                                <div className="flex items-center gap-2 text-white/90">
                                    <Clock size={14} className="text-white/70" />
                                    <span className="whitespace-nowrap uppercase text-[11px] font-bold tracking-[0.1em]">Pzt - Cmt: 09:00 - 17:00</span>
                                </div>

                                <span className="text-white/20 h-4 w-[1px] bg-white/20 hidden xl:block" />

                                <div className="hidden xl:flex items-center gap-6 ml-auto pr-10">
                                    <span className="text-white/60 text-[11px] font-bold uppercase tracking-[0.2em]">Sosyal Medya</span>
                                    <div className="flex items-center gap-5">
                                        <a href="#" className="hover:scale-125 transition-all text-white/90 hover:text-white"><span className="text-base font-bold leading-none">f</span></a>
                                        <a href="#" className="hover:scale-125 transition-all text-white/90 hover:text-white"><TikTokIcon /></a>
                                        <a href="#" className="hover:scale-125 transition-all text-white/90 hover:text-white"><Instagram size={18} /></a>
                                        <a href="#" className="hover:scale-125 transition-all text-white/90 hover:text-white"><Youtube size={18} /></a>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
                <Container>
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <div className="relative overflow-hidden group ml-2">
                                <Image
                                    src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/logo.png"
                                    alt="Atasa Education"
                                    width={190}
                                    height={50}
                                    className="h-9 md:h-10 w-auto transform transition-transform group-hover:scale-[1.01]"
                                />
                                <motion.div
                                    initial={{ left: '-150%', opacity: 0 }}
                                    animate={{ left: '250%', opacity: [0, 1, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatDelay: 6,
                                        duration: 1.5,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none"
                                />
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-slate-900 text-[12px] xl:text-[13px] font-extrabold hover:text-[#0056D2] transition-colors tracking-tight xl:tracking-wide whitespace-nowrap"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </Container>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-1 shadow-2xl absolute w-full left-0 animate-in slide-in-from-top duration-300">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-4 px-4 text-slate-800 font-bold border-b border-gray-50 hover:bg-slate-50 hover:text-[#0056D2] transition-all rounded-lg"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </header>
        </div>
    );
}

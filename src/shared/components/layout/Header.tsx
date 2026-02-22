"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Phone, Mail, Menu, X, Clock, Instagram, Youtube, Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: "Başvuru Süreci", href: "/basvuru-sureci" },
    { label: "Yorumlar", href: "/google-yorumlari" },
    { href: "/universiteler", label: "Üniversitelerimiz" },
    { href: "/blog", label: "Blog" },
    { href: "/iletisim", label: "İletişim" },
];

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
);

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full font-sans bg-white">
            {/* Top Bar */}
            <div className="hidden md:block bg-[#0056D2] text-white">
                <Container className="py-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-[12px] font-medium tracking-wide">
                            <a href="tel:+908503086998" className="flex items-center gap-2 hover:text-blue-100 transition-all">
                                <Phone size={14} className="fill-white" />
                                <span>+90 (850) 308 69 98</span>
                            </a>
                            <span className="text-white/30">|</span>
                            <a href="mailto:tr@atasaedu.com" className="flex items-center gap-2 hover:text-blue-100 transition-all">
                                <Mail size={14} className="fill-white" />
                                <span>tr@atasaedu.com</span>
                            </a>
                            <span className="text-white/30">|</span>
                            <div className="flex items-center gap-2 text-white/90">
                                <Clock size={14} className="text-white/70" />
                                <span className="uppercase text-[11px] font-bold tracking-wider">Pzt - Cmt: 09:00 - 17:00</span>
                            </div>
                            <span className="text-white/30 hidden xl:block">|</span>
                            <div className="hidden xl:flex items-center gap-4">
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Sosyal Medya</span>
                                <div className="flex items-center gap-4">
                                    <a href="#" className="hover:scale-110 transition-all text-white/90 hover:text-white"><span className="text-base font-bold leading-none">f</span></a>
                                    <a href="#" className="hover:scale-110 transition-all text-white/90 hover:text-white"><TikTokIcon /></a>
                                    <a href="#" className="hover:scale-110 transition-all text-white/90 hover:text-white"><Instagram size={16} /></a>
                                    <a href="#" className="hover:scale-110 transition-all text-white/90 hover:text-white"><Youtube size={16} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Main Nav */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm"
                : "bg-white border-b border-gray-100"
                }`}>
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
                        <div className="hidden lg:flex items-center gap-6 text-slate-600 font-medium">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:block">
                            <Link href="/iletisim">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-blue-600/20">
                                    Bilgi Al
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden text-slate-800"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </Container>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-slate-600 font-medium border-b"
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


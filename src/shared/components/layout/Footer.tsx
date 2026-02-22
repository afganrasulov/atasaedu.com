"use client";

import Link from "next/link";
import { useCookieConsent } from "../legal/CookieConsent";
import { Container } from "../ui/Container";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Star, ShieldCheck, Award } from "lucide-react";
import Image from "next/image";

export function Footer() {
    const { openModal } = useCookieConsent();

    return (
        <footer className="footer-gradient text-white pt-28 pb-14 overflow-hidden relative">
            {/* Ambient High-End Lighting */}
            <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse" />
            <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-20" />

            <Container className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20 relative z-10">

                    {/* Brand Identity Section */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-8">
                            <Image
                                src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/logo-white.png"
                                alt="Atasa Education"
                                width={240}
                                height={72}
                                className="h-14 w-auto brightness-110 contrast-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                            />
                            <div className="space-y-6">
                                <p className="text-gray-400 leading-bold text-[17px] max-w-md font-medium">
                                    Yurtdışında eğitim hayallerinize giden yolda dünyanın kapılarını aralıyoruz. <br />
                                    <span className="text-primary/80">Modern, kurumsal ve sonuç odaklı danışmanlık uzmanlığı.</span>
                                </p>

                                {/* Google Rating Badge */}
                                <div className="google-rating-badge group cursor-default">
                                    <div className="flex bg-[#4285F4] w-8 h-8 rounded-lg items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span className="text-white font-black text-sm">4.9</span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={10} fill="#FBBC05" className="text-[#FBBC05]" />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">1200+ Google Yorumu</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            {[
                                { icon: Instagram, href: "https://instagram.com/atasadanismanlik", name: "Instagram" },
                                { icon: Youtube, href: "https://youtube.com/@atasadanismanlik", name: "Youtube" },
                                {
                                    icon: ({ className }: { className?: string }) => (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                                        </svg>
                                    ),
                                    href: "https://tiktok.com/@atasadanismanlik",
                                    name: "TikTok"
                                }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-[1.25rem] premium-social-icon flex items-center justify-center group"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-500" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-2">
                        <h4 className="premium-heading mb-12">KURUMSAL</h4>
                        <ul className="space-y-6">
                            {[
                                { name: "Hakkımızda", href: "/hakkimizda" },
                                { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
                                { name: "Üniversiteler", href: "/universiteler" },
                                { name: "Başvuru Süreci", href: "/basvuru-sureci" },
                                { name: "Yorumlar", href: "/google-yorumlari" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="premium-link text-[16px] font-medium inline-flex items-center">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="premium-heading mb-12">DESTEK</h4>
                        <ul className="space-y-6">
                            {[
                                { name: "İletişim", href: "/iletisim" },
                                { name: "KVKK Aydınlatma", href: "/kvkk" },
                                { name: "Çerez Politikası", href: "/cookie-policy" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="premium-link text-[16px] font-medium inline-flex items-center">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Detail Section */}
                    <div className="lg:col-span-3">
                        <h4 className="premium-heading mb-12">İLETİŞİM</h4>
                        <ul className="space-y-10">
                            <li className="flex items-start space-x-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                                    <MapPin className="w-6 h-6 text-primary/80 group-hover:text-white transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-widest font-black">Genel Merkez</p>
                                    <p className="text-gray-300 text-[15px] leading-relaxed font-medium">Ataköy 7-8-10. Kısım Mah. <br />Çobançeşme E-5, İstanbul</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                                    <Phone className="w-6 h-6 text-primary/80 group-hover:text-white transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-widest font-black">7/24 Destek Hattı</p>
                                    <p className="text-gray-300 text-[15px] font-medium">+90 (850) 308 69 98</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>



                {/* Refined Bottom Navigation */}
                <div className="pt-12 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
                            <p className="text-gray-500 text-sm font-medium tracking-tight">
                                &copy; {new Date().getFullYear()} <span className="text-white/90 font-bold">ATASA EDUCATION</span>
                            </p>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-white/[0.08]" />
                        <p className="text-gray-600 text-[11px] tracking-[0.2em] font-black uppercase pointer-events-none">Eğitimde Mükemmeliyet</p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-10">
                        <Link href="/kvkk" className="text-gray-500 hover:text-white text-xs font-semibold transition-all duration-300">GİZLİLİK POLİTİKASI</Link>
                        <Link href="/cookie-policy" className="text-gray-500 hover:text-white text-xs font-semibold transition-all duration-300">YASAL BİLDİRİM</Link>
                        <button
                            onClick={openModal}
                            className="group relative px-6 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.08] hover:border-primary/50 transition-all duration-500 overflow-hidden"
                        >
                            <span className="relative z-10 text-gray-400 group-hover:text-white text-xs font-bold transition-colors">ÇEREZ AYARLARI</span>
                            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from "@/shared/components/ui/Container";
import Link from "next/link";
import {
    ShieldCheck, Briefcase, Flag, GraduationCap, UserCheck,
    ArrowRight
} from 'lucide-react';

const SERVICES_DATA = [
    {
        id: 'residency',
        title: 'İkamet İzni',
        desc: 'Eğitim süreniz boyunca Türkiye\'de kalmanızı sağlayacak ikamet izni alımı konusunda danışmanlık ve yardım hizmetleri.',
        icon: <ShieldCheck />,
        link: '/iletisim',
        color: 'blue'
    },
    {
        id: 'work',
        title: 'Çalışma İzni',
        desc: 'Eğitim hayatınızın yanı sıra Türkiye\'de çalışmak istemeniz durumunda gerekli olan çalışma izni başvurularında sizlere rehberlik ediyoruz.',
        icon: <Briefcase />,
        link: '/iletisim',
        color: 'blue'
    },
    {
        id: 'citizenship',
        title: 'Türk Vatandaşlığı',
        desc: 'Türkiye\'de uzun süreli kalmayı ve Türk vatandaşlığına geçmeyi düşünen bireyler için gerekli danışmanlık hizmetleri.',
        icon: <Flag />,
        link: '/iletisim',
        color: 'blue'
    },
    {
        id: 'student',
        title: 'Öğrenci İşlemleri',
        desc: 'Yurt dışından Türkiye\'ye eğitim amacıyla gelen öğrenciler için üniversite kayıtları, öğrenci vizesi, denklik işlemleri gibi eğitim sürecinin her aşamasında destek sağlıyoruz.',
        icon: <GraduationCap />,
        link: '/iletisim',
        color: 'blue'
    },
    {
        id: 'consultancy',
        title: 'Özel Danışmanlık Hizmetleri',
        desc: 'Her öğrencinin ve yabancı vatandaşın ihtiyaçlarına özel çözümler sunarak, akademik danışmanlık, kariyer planlaması, kültürel uyum programları ve daha fazlasıyla bire bir destek sağlıyoruz.',
        icon: <UserCheck />,
        link: '/iletisim',
        color: 'blue'
    }
];

export function ServiceList() {
    return (
        <section className="py-28 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(0,71,187,0.03)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,rgba(0,71,187,0.02)_0%,transparent_50%)] pointer-events-none" />

            <Container className="relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 px-5 py-2 rounded-full bg-white text-[#0047BB] font-black mb-8 mx-auto w-fit border border-slate-100 shadow-sm"
                    >
                        <ShieldCheck size={20} className="text-blue-500" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black">Resmi Danışmanlık Hizmetleri</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0F172A] mb-8 leading-[1.05] tracking-tighter"
                    >
                        Size Nasıl <br className="hidden md:block" />
                        <span className="text-blue-600">Yardımcı</span> Olabiliriz?
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto"
                    >
                        Türkiye'deki tüm resmi işlemleri tek bir çatı altında, profesyonel ve güvenilir bir yaklaşımla yönetiyoruz.
                    </motion.p>
                </div>

                {/* Hizmet Kartları Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {SERVICES_DATA.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link
                                href={service.link}
                                className="group block h-full bg-white rounded-[3rem] p-10 border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,85,212,0.12)] transition-all duration-700 relative overflow-hidden transform-gpu hover:-translate-y-4"
                            >
                                {/* Decorative Large Icon Background */}
                                <div className="absolute -top-10 -right-10 w-48 h-48 text-blue-500/5 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12 group-hover:text-blue-500/10 pointer-events-none">
                                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 180, strokeWidth: 1 })}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-10 text-white shadow-2xl shadow-blue-600/20 bg-gradient-to-br from-blue-600 to-blue-800 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-blue-600/40 border border-white/20">
                                        {React.cloneElement(service.icon as React.ReactElement<any>, { size: 36, strokeWidth: 2.5 })}
                                    </div>

                                    <h3 className="text-3xl font-black text-[#0F172A] mb-5 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-slate-500 text-lg leading-relaxed mb-12 flex-grow font-medium">
                                        {service.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <button className="w-full bg-[#0F172A] text-white px-8 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/5 active:scale-95 flex items-center justify-center gap-3 group/btn uppercase">
                                            İLETİŞİME GEÇ
                                            <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-2" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

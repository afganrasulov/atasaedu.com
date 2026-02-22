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
        <section className="py-24 bg-gray-50/50 min-h-screen">
            <Container>
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#0047BB] font-bold mb-6 mx-auto w-fit border border-blue-100/50"
                    >
                        <ShieldCheck size={18} />
                        <span className="text-xs uppercase tracking-wider font-bold">Resmi Danışmanlık Hizmetleri</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
                    >
                        Size Nasıl Yardımcı <br className="hidden md:block" /> Olabiliriz?
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 leading-relaxed font-medium"
                    >
                        Türkiye'deki yaşamınızı kolaylaştırmak için tüm resmi işlemleri tek bir çatı altında topladık.
                        İhtiyacınız olan hizmeti seçin, gerisini profesyonel ekibimize bırakın.
                    </motion.p>
                </div>

                {/* Hizmet Kartları Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES_DATA.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={service.link}
                                className="group block h-full bg-white rounded-[2rem] p-8 border border-gray-100 hover:border-[#0047BB]/20 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className={`absolute -top-4 -right-4 w-32 h-32 opacity-[0.03] transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12`}>
                                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 120 })}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white text-3xl shadow-lg shadow-blue-600/10 bg-gradient-to-br from-blue-600 to-blue-700 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                        {React.cloneElement(service.icon as React.ReactElement<any>, { size: 32 })}
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#0047BB] transition-colors leading-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-500 text-base leading-relaxed mb-10 flex-grow font-medium">
                                        {service.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <button className="w-full bg-[#0047BB] text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95 flex items-center justify-center gap-2 group/btn">
                                            İLETİŞİME GEÇ <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
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

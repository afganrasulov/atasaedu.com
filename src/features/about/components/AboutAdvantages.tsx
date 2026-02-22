"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import { Users, Globe2, HeartHandshake, GraduationCap } from "lucide-react";

const advantages = [
    {
        icon: Users,
        title: "Uzmanlık Hizmeti",
        description: "Eğitim danışmanlarımız, sizin ihtiyaçlarınıza ve hedeflerinize özel rehberlik eder.",
        gradient: "from-blue-600 to-blue-700",
        shadow: "shadow-blue-500/20"
    },
    {
        icon: Globe2,
        title: "Geniş Ağ",
        description: "Dünya çapında birçok üniversiteyle iş birliklerimiz sayesinde geniş seçenekler sunarız.",
        gradient: "from-orange-500 to-orange-700",
        shadow: "shadow-orange-500/20"
    },
    {
        icon: HeartHandshake,
        title: "Tam Destek",
        description: "Üniversite başvuruları, vize işlemleri ve burs olanakları gibi konularda yanınızdayız.",
        gradient: "from-emerald-500 to-emerald-700",
        shadow: "shadow-emerald-500/20"
    },
    {
        icon: GraduationCap,
        title: "Burs Olanakları",
        description: "%50'ye varan burs imkanlarıyla eğitim hayallerinize ulaşmanızı kolaylaştırıyoruz.",
        gradient: "from-rose-500 to-rose-700",
        shadow: "shadow-rose-500/20"
    }
];

export function AboutAdvantages() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#0047BB] text-xs font-black uppercase tracking-widest mb-4"
                    >
                        Neden Biz?
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
                    >
                        Atasa Education <br /> <span className="text-[#0047BB]">Ayrıcalıkları</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 font-medium"
                    >
                        Geleceğinizi şekillendirirken size en iyi ve en güvenilir deneyimi sunmak için her detayda yanınızdayız.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {advantages.map((adv, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-[#0047BB]/10"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${adv.gradient} flex items-center justify-center mb-8 shadow-lg ${adv.shadow} group-hover:scale-110 transition-transform duration-500`}>
                                <adv.icon className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-[#0047BB] transition-colors">{adv.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed mb-6 italic">"{adv.description}"</p>

                            <div className="w-10 h-1 bg-gray-200 group-hover:w-20 group-hover:bg-[#0047BB] transition-all duration-500 rounded-full" />

                            {/* Dekoratif Köşe İkonu (Hover'da beliren) */}
                            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                                <adv.icon className="w-20 h-20 text-[#0047BB]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

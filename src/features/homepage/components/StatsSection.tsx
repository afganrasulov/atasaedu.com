"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import { Users, CheckCircle, Clock } from "lucide-react";

const stats = [
    { value: "5k+", label: "Öğrenci", icon: Users },
    { value: "99.5%", label: "Başarı Oranı", icon: CheckCircle },
    { value: "100.2k+", label: "Danışmanlık Saati", icon: Clock }
];

export function StatsSection() {
    return (
        <section className="py-20 bg-blue-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 shadow-xl backdrop-blur-sm border border-white/20">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 drop-shadow-md">
                                    {stat.value}
                                </div>
                                <div className="text-blue-100 font-bold tracking-widest uppercase text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

"use client";

import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ContactInfo() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const contactItems = [
        {
            icon: MapPin,
            title: "Adres",
            details: [
                { text: "Mecidiyeköy, Raşit Rıza Sokağı Hayati İş Hanı NO:13 K:5 D:503, Şişli/İstanbul", href: "https://maps.app.goo.gl/cQXVomJozJ6p8neS8" },
                { text: "Əhməd Rəcəbli küçəsi 1/10 Tivi Plaza Qat:1 Nərimanov/Bakı", href: "https://maps.app.goo.gl/cQXVomJozJ6p8neS8" }
            ]
        },
        {
            icon: Phone,
            title: "Telefon Numarası",
            details: [
                { text: "Mobil: (+90) - 850 - 308 - 69 - 98", href: "tel:+908503086998" },
                { text: "Mobil: (+994) - 10 - 323 - 69 - 98", href: "tel:+994103236998" }
            ]
        },
        {
            icon: Clock,
            title: "Çalışma Saatleri",
            details: [
                { text: "Pzt - Cmt: 09:00 - 17:00", href: null }
            ]
        }
    ];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-10"
        >
            <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#152239] mb-6">
                    Sizinle Tanışmak İçin <span className="text-primary">Heyecanlıyız</span>
                </h2>
                <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
                    Eğitim yolculuğunuzda size rehberlik etmek için buradayız. Her türlü sorunuz için bize ulaşabilirsiniz.
                </p>
            </motion.div>

            <div className="grid gap-6">
                {contactItems.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-bold text-[#152239] mb-2">{item.title}</h3>
                                <div className="space-y-2">
                                    {item.details.map((detail, idx) => (
                                        detail.href ? (
                                            <Link
                                                key={idx}
                                                href={detail.href}
                                                target={detail.href.startsWith('http') ? "_blank" : undefined}
                                                className="block text-gray-600 hover:text-primary transition-colors flex items-center group/link text-sm md:text-base font-medium"
                                            >
                                                {detail.text}
                                                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                            </Link>
                                        ) : (
                                            <p key={idx} className="text-gray-600 text-sm md:text-base font-medium">
                                                {detail.text}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                variants={itemVariants}
                className="pt-6"
            >
                <div className="w-full h-80 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.6897255476605!2d28.9918231!3d41.06644489999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6fca1215b21%3A0x6b4f74ab7b8b2ba6!2sAtasa%20Education!5e0!3m2!1str!2str!4v1709403314546!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border-t border-gray-100 rounded-[3rem]"></div>
                </div>
            </motion.div>
        </motion.div>
    );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { User, Mail, Globe, HelpCircle, Phone, MessageSquare, Send, Loader2 } from "lucide-react";

export function ContactForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Form submission logic here
        setTimeout(() => setLoading(false), 1000);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-soft border border-gray-100 relative overflow-hidden"
        >
            {/* Soft decorative background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10">
                <div className="mb-10 text-center md:text-left">
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center md:justify-start space-x-2 text-primary font-semibold mb-3"
                    >
                        <span className="w-8 h-[2px] bg-primary/50"></span>
                        <span className="text-xs uppercase tracking-[0.2em] font-bold">Bizimle İletişime Geçin</span>
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold tracking-tight text-[#152239] mb-4"
                    >
                        Mesaj Gönderin
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-500 text-base leading-relaxed max-w-md"
                    >
                        Sorularınız, iş birlikleri veya destek talepleriniz için uzman ekibimiz size yardımcı olmaya hazır.
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="name" className="sr-only">Ad Soyad*</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <Input
                                id="name"
                                required
                                placeholder="Ad Soyad*"
                                className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="email" className="sr-only">E-posta*</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                required
                                placeholder="E-posta*"
                                className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="nationality" className="sr-only">Uyruk*</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <Globe className="w-5 h-5" />
                            </div>
                            <select id="nationality" required className="w-full pl-12 pr-4 bg-gray-50 border border-gray-200 h-14 rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                                <option value="" disabled selected>Uyruk*</option>
                                <option value="Azerbaycan">Azerbaycan</option>
                                <option value="Özbekistan">Özbekistan</option>
                                <option value="Türkiye">Türkiye</option>
                                <option value="Türkmenistan">Türkmenistan</option>
                            </select>
                        </motion.div>
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="subject" className="sr-only">Konu*</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <select id="subject" required className="w-full pl-12 pr-4 bg-gray-50 border border-gray-200 h-14 rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                                <option value="" disabled selected>Konu*</option>
                                <option value="İkamet">İkamet</option>
                                <option value="Çalışma İzni">Çalışma İzni</option>
                                <option value="Eğitim Danışmanlığı">Eğitim Danışmanlığı</option>
                            </select>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="relative group">
                        <label htmlFor="phone" className="sr-only">Telefon Numarası*</label>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            placeholder="Telefon Numarası*"
                            className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative group">
                        <label htmlFor="message" className="sr-only">Mesaj*</label>
                        <div className="absolute top-4 left-4 text-gray-400 pointer-events-none group-focus-within:text-primary transition-colors">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <textarea
                            id="message"
                            required
                            placeholder="Mesaj*"
                            rows={4}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        ></textarea>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Button
                            type="submit"
                            size="xl"
                            disabled={loading}
                            className="w-full rounded-full font-bold bg-[#152239] hover:bg-primary transition-all duration-300 text-white h-14 flex items-center justify-center group active:scale-[0.98] shadow-lg shadow-primary/10"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Gönderiliyor...
                                </span>
                            ) : (
                                <>
                                    Gönder <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
}

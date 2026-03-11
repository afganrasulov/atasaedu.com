"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { User, Mail, Globe, HelpCircle, Phone, MessageSquare, Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactForm() {
    const t = useTranslations("contactForm");
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
                        <span className="text-xs uppercase tracking-[0.2em] font-bold">{t("contactUs")}</span>
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold tracking-tight text-[#152239] mb-4"
                    >
                        {t("sendMessage")}
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-500 text-base leading-relaxed max-w-md"
                    >
                        {t("description")}
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="name" className="sr-only">{t("nameLabel")}</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <Input
                                id="name"
                                required
                                placeholder={t("namePlaceholder")}
                                className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="email" className="sr-only">{t("emailLabel")}</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                required
                                placeholder={t("emailPlaceholder")}
                                className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="nationality" className="sr-only">{t("nationalityLabel")}</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <Globe className="w-5 h-5" />
                            </div>
                            <select id="nationality" required className="w-full pl-12 pr-4 bg-gray-50 border border-gray-200 h-14 rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                                <option value="" disabled selected>{t("nationalityPlaceholder")}</option>
                                <option value="Azerbaycan">{t("nationalityAzerbaijan")}</option>
                                <option value="Özbekistan">{t("nationalityUzbekistan")}</option>
                                <option value="Türkiye">{t("nationalityTurkey")}</option>
                                <option value="Türkmenistan">{t("nationalityTurkmenistan")}</option>
                            </select>
                        </motion.div>
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="subject" className="sr-only">{t("subjectLabel")}</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <select id="subject" required className="w-full pl-12 pr-4 bg-gray-50 border border-gray-200 h-14 rounded-2xl text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                                <option value="" disabled selected>{t("subjectPlaceholder")}</option>
                                <option value="İkamet">{t("subjectResidence")}</option>
                                <option value="Çalışma İzni">{t("subjectWorkPermit")}</option>
                                <option value="Eğitim Danışmanlığı">{t("subjectEducationConsulting")}</option>
                            </select>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="relative group">
                        <label htmlFor="phone" className="sr-only">{t("phoneLabel")}</label>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            placeholder={t("phonePlaceholder")}
                            className="pl-12 bg-gray-50 border-gray-200 h-14 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative group">
                        <label htmlFor="message" className="sr-only">{t("messageLabel")}</label>
                        <div className="absolute top-4 left-4 text-gray-400 pointer-events-none group-focus-within:text-primary transition-colors">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <textarea
                            id="message"
                            required
                            placeholder={t("messagePlaceholder")}
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
                                    {t("sending")}
                                </span>
                            ) : (
                                <>
                                    {t("send")} <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
}

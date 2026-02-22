"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useWhatsApp } from "./WhatsAppContext";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingWhatsAppButton: React.FC = () => {
    const { openWhatsApp, isOpen } = useWhatsApp();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (isOpen) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* --- MASAÜSTÜ VERSİYONU (Sol Alt Köşe) --- */}
                    <motion.button
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={openWhatsApp}
                        className="hidden md:flex fixed bottom-8 left-8 z-40 items-center gap-4 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full shadow-2xl shadow-green-900/30 group transition-all hover:scale-105 border-4 border-white/20 cursor-pointer"
                    >
                        {/* İkon Kutusu */}
                        <div className="bg-white/20 p-2 rounded-full">
                            <MessageCircle
                                size={32}
                                fill="currentColor"
                                className="text-white"
                            />
                        </div>

                        {/* Yazı Alanı */}
                        <div className="text-left">
                            <span className="block text-xs text-green-100 font-medium uppercase tracking-wider mb-0.5">
                                Canlı Destek
                            </span>
                            <span className="block text-xl font-extrabold tracking-tight">
                                WhatsApp&apos;tan Yaz
                            </span>
                        </div>

                        {/* Pulse Efekti */}
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white" />
                        </span>
                    </motion.button>

                    {/* --- MOBİL VERSİYONU (Alt Bar / Sticky Footer) --- */}
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
                    >
                        <button
                            onClick={openWhatsApp}
                            className="w-full bg-green-600 active:bg-green-700 text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-4 shadow-lg active:scale-95 transition-transform cursor-pointer"
                        >
                            <div className="bg-white text-green-600 rounded-full p-2 shadow-sm">
                                <MessageCircle size={28} fill="currentColor" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm text-green-100 font-medium leading-none mb-1">
                                    Yardım mı lazım?
                                </span>
                                <span className="text-2xl font-extrabold leading-none">
                                    WhatsApp Destek
                                </span>
                            </div>
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

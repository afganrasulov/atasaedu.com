"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface WhatsAppContextType {
    isOpen: boolean;
    openWhatsApp: () => void;
    closeWhatsApp: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(
    undefined
);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openWhatsApp = () => setIsOpen(true);
    const closeWhatsApp = () => setIsOpen(false);

    return (
        <WhatsAppContext.Provider value={{ isOpen, openWhatsApp, closeWhatsApp }}>
            {children}
        </WhatsAppContext.Provider>
    );
};

export const useWhatsApp = () => {
    const context = useContext(WhatsAppContext);
    if (!context) {
        throw new Error("useWhatsApp must be used within a WhatsAppProvider");
    }
    return context;
};

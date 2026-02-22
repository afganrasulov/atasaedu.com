import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/providers/Providers";
import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { FloatingWhatsAppButton } from "@/features/whatsapp/FloatingWhatsAppButton";
import { WhatsAppModal } from "@/features/whatsapp/WhatsAppModal";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Atasa Education - Yurtdışı Eğitim Danışmanlığı",
  description: "Modern ve yenilikçi yurtdışı eğitim danışmanlık hizmetleri.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { CookieConsentProvider, CookieConsentModal } from "@/shared/components/legal/CookieConsent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${jost.variable} antialiased min-h-screen flex flex-col`}
      >
        <CookieConsentProvider>
          <Providers>
            <Header />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <FloatingWhatsAppButton />
            <WhatsAppModal />
          </Providers>
          <CookieConsentModal />
        </CookieConsentProvider>
      </body>
    </html>
  );
}

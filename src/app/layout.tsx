import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Atasa Education - Yurtdışı Eğitim Danışmanlığı",
  description: "Modern ve yenilikçi yurtdışı eğitim danışmanlık hizmetleri.",
  manifest: "/manifest.json",
  icons: {
    icon: "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/favicon.png",
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

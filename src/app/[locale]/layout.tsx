import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Providers } from "@/shared/providers/Providers";
import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { FloatingWhatsAppButton } from "@/features/whatsapp/FloatingWhatsAppButton";
import { WhatsAppModal } from "@/features/whatsapp/WhatsAppModal";
import { CookieConsentProvider, CookieConsentModal } from "@/shared/components/legal/CookieConsent";
import { Jost } from "next/font/google";
import type { Metadata } from "next";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const RTL_LOCALES = ["ar", "fa"];
const BASE_URL = "https://atasaedu.com";

// SEO-optimize locale metadata — keyword-hedefli
const LOCALE_META: Record<string, { title: string; description: string; keywords: string[] }> = {
  tr: {
    title: "Atasa Education - Yurtdışı Eğitim Danışmanlığı | Türkiye'de Üniversite",
    description: "Türkiye'de üniversite eğitimi, çalışma izni, ikamet izni ve şirket kuruluşu danışmanlığı. Sınavsız üniversite kaydı ve garantili kabul ile hayalinizdeki eğitime ulaşın.",
    keywords: ["yurtdışı eğitim danışmanlığı", "türkiye üniversite", "sınavsız üniversite kaydı", "çalışma izni", "ikamet izni", "özel üniversiteler türkiye"],
  },
  en: {
    title: "Atasa Education - Study in Turkey | Private Universities & Scholarships",
    description: "Study in Turkey with Atasa Education. Find top private universities, affordable tuition, scholarships, and guaranteed admission. Expert guidance for international students.",
    keywords: ["study in turkey", "private universities in turkey", "cheapest universities in turkey", "study abroad turkey", "top universities in turkey", "scholarships in turkey", "engineering universities in turkey", "study visa turkey"],
  },
  ar: {
    title: "أتاسا للتعليم - الدراسة في تركيا | الجامعات التركية الخاصة والمنح",
    description: "ادرس في تركيا مع أتاسا للتعليم. اكتشف أفضل الجامعات التركية الخاصة، تكاليف الدراسة المناسبة، المنح الدراسية، والقبول المضمون. استشارة خبراء للطلاب الدوليين.",
    keywords: ["الدراسة في تركيا", "الجامعات التركية الخاصة", "تكاليف الدراسة في تركيا", "الدراسة في تركيا باللغة العربية", "المنح الدراسية في تركيا", "جامعات تركية تدرس باللغة العربية", "القبول الجامعي في تركيا"],
  },
  fa: {
    title: "آتاسا آموزش - تحصیل در ترکیه | دانشگاه‌های خصوصی و بورسیه",
    description: "با آتاسا آموزش در ترکیه تحصیل کنید. بهترین دانشگاه‌های خصوصی، شهریه مقرون به صرفه، بورسیه و پذیرش تضمینی. راهنمایی تخصصی برای دانشجویان بین‌المللی.",
    keywords: ["تحصیل در ترکیه", "دانشگاه‌های خصوصی ترکیه", "هزینه تحصیل در ترکیه", "بورسیه ترکیه"],
  },
  fr: {
    title: "Atasa Education - Étudier en Turquie | Universités Privées & Bourses",
    description: "Étudiez en Turquie avec Atasa Education. Découvrez les meilleures universités privées, des frais abordables, des bourses et une admission garantie. Conseils experts pour les étudiants internationaux.",
    keywords: ["étudier en turquie", "universités privées turquie", "bourses turquie", "universités turquie"],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_META[locale] || LOCALE_META.tr;

  // hreflang alternates
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }

  return {
    title: {
      default: meta.title,
      template: `%s | Atasa Education`,
    },
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}`,
      siteName: "Atasa Education",
      locale: locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : locale === "ar" ? "ar_SA" : locale === "fa" ? "fa_IR" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// JSON-LD Structured Data
function generateJsonLd(locale: string) {
  const meta = LOCALE_META[locale] || LOCALE_META.tr;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Atasa Education",
        alternateName: "Atasa Danışmanlık",
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.png`,
        sameAs: [
          "https://www.youtube.com/@atasa_tr",
          "https://www.instagram.com/atasa_tr",
          "https://www.tiktok.com/@atasa_tr",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+90-850-308-69-98",
          contactType: "customer service",
          availableLanguage: ["Turkish", "English", "Arabic", "Persian", "French"],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1200",
          bestRating: "5",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Atasa Education",
        description: meta.description,
        inLanguage: locale,
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/${locale}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${BASE_URL}/#edu`,
        name: "Atasa Education",
        description: meta.description,
        url: BASE_URL,
        areaServed: ["Turkey", "Middle East", "Central Asia", "North Africa"],
        serviceType: ["University Admission", "Study Abroad Consulting", "Work Permit", "Residence Permit", "Company Formation"],
      },
    ],
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  const jsonLd = generateJsonLd(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Blog editorial fonts: Playfair Display + Source Serif 4 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jost.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider locale={locale}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

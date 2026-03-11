"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";

const LOCALE_CONFIG: Record<Locale, { label: string; flag: string }> = {
  tr: { label: "Türkçe", flag: "🇹🇷" },
  en: { label: "English", flag: "🇬🇧" },
  ar: { label: "العربية", flag: "🇸🇦" },
  fa: { label: "فارسی", flag: "🇮🇷" },
  fr: { label: "Français", flag: "🇫🇷" },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale prefix from pathname
    const segments = pathname.split("/");
    const hasLocalePrefix = routing.locales.includes(segments[1] as Locale);
    const pathWithoutLocale = hasLocalePrefix
      ? "/" + segments.slice(2).join("/")
      : pathname;

    // Build new path
    const newPath = newLocale === routing.defaultLocale
      ? pathWithoutLocale || "/"
      : `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
    setIsOpen(false);
  };

  const current = LOCALE_CONFIG[locale];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white text-[12px] font-semibold"
        aria-label="Dil seçin"
      >
        <Globe size={14} />
        <span>{current.flag} {current.label}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[160px] animate-in fade-in slide-in-from-top-2 duration-200">
          {routing.locales.map((loc) => {
            const config = LOCALE_CONFIG[loc];
            const isActive = loc === locale;

            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{config.flag}</span>
                <span>{config.label}</span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

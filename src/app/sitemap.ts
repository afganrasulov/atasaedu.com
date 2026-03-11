import type { MetadataRoute } from "next";

const BASE_URL = "https://atasaedu.com";
const LOCALES = ["tr", "en", "ar", "fa", "fr"];

const STATIC_PAGES = [
  "",
  "/hakkimizda",
  "/hizmetlerimiz",
  "/basvuru-sureci",
  "/universiteler",
  "/google-yorumlari",
  "/blog",
  "/iletisim",
  "/kvkk",
  "/ogrenci-calisma-izni",
  "/ogrenci-ikamet-izni",
  "/hizmetlerimiz/calisma-izni",
  "/hizmetlerimiz/calisma-izni-uzatma",
  "/hizmetlerimiz/calisma-izni-transferi",
  "/hizmetlerimiz/bakici-calisma-izni",
  "/hizmetlerimiz/sirket-kurulusu",
  "/hizmetlerimiz/sektorel-danismanlik",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    const alternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      alternates[locale] = `${BASE_URL}/${locale}${page}`;
    }

    entries.push({
      url: `${BASE_URL}/tr${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "daily" : "weekly",
      priority: page === "" ? 1.0 : page === "/hizmetlerimiz" ? 0.9 : 0.8,
      alternates: {
        languages: alternates,
      },
    });
  }

  return entries;
}

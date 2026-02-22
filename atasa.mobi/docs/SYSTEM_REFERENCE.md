
# Atasa Danışmanlık - Sistem Referans Dokümanı (v1.0)

Bu belge, projenin mevcut durumunu, mimari kararlarını, uygulanan özellikleri ve tasarım sistemini özetler. Gelecekteki geliştirmeler ve mobil uygulama (React Native) dönüşümü için ana referans kaynağıdır.

## 1. Proje Kimliği ve Teknoloji Yığını

*   **Proje Adı:** Atasa Danışmanlık Web Uygulaması
*   **Amaç:** Yabancılar için İkamet İzni, Çalışma İzni ve Vatandaşlık işlemlerinde dijital danışmanlık, randevu oluşturma ve bilgi sağlama platformu.
*   **Platform:** Web (PWA Uyumlu)
*   **Framework:** React 19 (Vite)
*   **Dil:** TypeScript
*   **Stil:** Tailwind CSS
*   **Animasyon:** Framer Motion
*   **Yapay Zeka:** Google Gemini 2.5 Flash (`@google/genai`)
*   **Routing:** React Router DOM v7 (HashRouter)
*   **State Yönetimi:** React Context API (WhatsApp, CookieConsent)

## 2. Mimari Yapı (Feature-Based Architecture)

Proje, kodun bakımını kolaylaştırmak için `features/` tabanlı modüler bir yapı kullanır.

```
src/
├── features/
│   ├── admin/          # Blog Generator (AI destekli içerik üretici)
│   ├── appointment/    # Randevu formu, webhook entegrasyonu
│   ├── chat/           # AI Asistan (Gemini) widget'ı
│   ├── common/         # Ortak bileşenler (Logo, PageTransition, ScrollToTop)
│   ├── contact/        # İletişim sayfası
│   ├── design/         # Tasarım efektleri (SpotlightWrapper)
│   ├── home/           # Ana sayfa bileşenleri
│   ├── layout/         # Navbar, Footer
│   ├── legal/          # KVKK, Çerez Politikası, Modal
│   ├── professions/    # Meslek bazlı sayfalar (Kurye Sihirbazı)
│   ├── query/          # Kapalı mahalle sorgulama sistemi
│   ├── residency/      # İkamet izni alt sayfaları
│   ├── reviews/        # Google yorumları simülasyonu
│   ├── services/       # [YENİ] Tüm hizmetler sayfası
│   ├── whatsapp/       # WhatsApp modal ve context
│   └── work-permit/    # Çalışma izni alt sayfaları
├── services/           # Harici servisler (Gemini API)
├── docs/               # Proje dokümantasyonu
├── App.tsx             # Ana Router yapılandırması
├── index.html          # Entry point
└── index.tsx           # React mount noktası
```

## 3. Temel Özellikler ve İş Mantığı

### A. Hizmetler Sayfası (`/services`)
*   **Amaç:** Tüm hizmetlerin kategorize edildiği, 60+ yaş kullanıcı dostu, büyük butonlu ve net arayüz.
*   **Yapı:** Kategori sekmeleri (Tab) ile filtreleme.
*   **Tasarım:** Kartlar üzerine gelindiğinde renkli arka plan efektleri.

### B. Randevu Sistemi (`features/appointment`)
*   **Entegrasyon:** `n8n` Webhook.
*   **Yöntem:** CORS hatalarını aşmak için `x-www-form-urlencoded` formatında veri gönderimi.
*   **Özellikler:**
    *   Otomatik ülke kodu tespiti (ipapi.co).
    *   "Ömer Habib" seçildiğinde ücret uyarısı ve özel mesaj gösterimi.
    *   Demo butonu (Otomatik form doldurma).

### C. AI Asistan (`features/chat`)
*   **Model:** Gemini 2.5 Flash.
*   **Davranış:** `SYSTEM_INSTRUCTION` sabiti ile belirlenen şirket personası.
*   **Veri:** Şirket bilgileri, çalışma saatleri ve hizmet türleri hakkında soruları yanıtlar.

### D. Kurye Uygunluk Sihirbazı (`features/professions`)
*   **İşlev:** Kullanıcıya 3 soru sorarak (Süre, Çalışma Tipi, Ehliyet) en uygun yasal çalışma yöntemini (P1 Belgesi, Şirket Kurulumu vb.) önerir.

### E. Kapalı Mahalle Sorgulama (`features/query`)
*   **Veri:** `data.ts` içinde hardcoded olarak tutulan kısıtlamalı mahalle listesi.
*   **Mantık:** İl > İlçe > Mahalle seçimi ile bölgenin ikamete kapalı olup olmadığını kontrol eder.

### F. Animasyonlu Modallar
*   **Teknoloji:** Framer Motion (`AnimatePresence`).
*   **Efekt:** Apple tarzı "Spring" animasyonları, backdrop blur ve zoom-in giriş efektleri. (WhatsApp ve Çerez Modalları).

## 4. Tasarım Sistemi ve UI Detayları

*   **Spotlight Effect:** Tüm sayfalarda fareyi takip eden dinamik bir ışık huzmesi (`SpotlightWrapper`).
*   **Glassmorphism:** Kartlarda ve panellerde `backdrop-blur` ve yarı saydam beyaz arka planlar.
*   **Renk Paleti:**
    *   Ana: Slate-900 (Koyu), Slate-50 (Zemin)
    *   Aksiyon: Blue-600
    *   Vurgular: Orange-500 (Çalışma), Green-500 (Aile), Purple-600 (Uzun Dönem)
*   **Tipografi:** Inter font ailesi. Okunabilirlik odaklı.

## 5. Son Yapılan Güncellemeler (Change Log)

1.  **Hizmetler Sayfası:** `/services` rotası oluşturuldu. Yaşlı dostu, yüksek dönüşüm odaklı tasarım uygulandı.
2.  **Navigasyon Güncellemesi:** Navbar'daki "Hizmetlerimiz" linki artık `/services` sayfasına gidiyor.
3.  **Animasyon İyileştirmesi:** Popup ve modallara (WhatsApp, Cookie) yumuşak giriş/çıkış animasyonları eklendi.
4.  **Build Fix:** `index.html` içerisine eksik olan script tag'i eklendi.

## 6. Gelecek İçin Notlar (Next Steps)

*   **Mobil Uygulama:** Bu React yapısı, *React Native* veya *CapacitorJS* kullanılarak kolayca mobil uygulamaya dönüştürülebilir. `features/` yapısı buna uygundur.
*   **Admin Paneli:** Blog içeriklerinin veritabanına bağlanması gerekecektir.
*   **Backend Proxy:** Gemini API anahtarının frontend'de gizlenmesi için bir serverless function (Vercel API) yazılmalıdır.

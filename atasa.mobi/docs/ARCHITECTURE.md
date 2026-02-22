# Architecture Documentation

Bu belge, Atasa Danışmanlık uygulamasının teknik mimarisini ve tasarım kararlarını açıklar.

## 🏗️ Teknoloji Yığını (Tech Stack)

- **Frontend Framework:** React 19 (TypeScript ile)
- **Stil Kütüphanesi:** Tailwind CSS (CDN/Utility-first)
- **Routing:** React Router DOM v7 (HashRouter kullanılarak statik host uyumluluğu sağlandı)
- **AI Entegrasyonu:** Google GenAI SDK (`@google/genai`) - Model: `gemini-2.5-flash`
- **İkon Seti:** Lucide React
- **Veri İletişimi:** Fetch API & URLSearchParams (CORS-safe Webhook gönderimi için)

## 📂 Klasör Yapısı (Feature-Based)

Proje, özellik tabanlı (Feature-Based) bir klasör yapısını benimser. Bu, kodun bakımını ve ölçeklenebilirliğini kolaylaştırır.

```
/
├── components/         # (Legacy) Genel bileşenler
├── features/
│   ├── appointment/    # Randevu formu ve mantığı
│   ├── chat/           # AI Chat widget ve Gemini servisi
│   ├── common/         # Ortak kullanılan logo, buton vb.
│   ├── home/           # Ana sayfa bileşenleri
│   ├── layout/         # Navbar, Footer
│   └── reviews/        # Google yorumları ve servisi
├── services/           # (Legacy) Servis katmanı
├── docs/               # Proje dokümantasyonu
├── types.ts            # TypeScript tip tanımları
└── constants.ts        # Sabit veriler (Şirket bilgileri vb.)
```

## 🧠 Temel Bileşenler

### 1. AI Chatbot (`features/chat`)
- Doğrudan tarayıcı üzerinden Google Gemini API ile iletişim kurar.
- `SYSTEM_INSTRUCTION` sabiti ile botun kişiliği (Atasa Asistan) ve bilgi tabanı tanımlanır.
- Sohbet geçmişi state içinde tutulur (kullanıcı sayfayı yenileyene kadar).

### 2. Randevu Sistemi (`features/appointment`)
- Form verileri `appointmentService.ts` üzerinden işlenir.
- Veriler `n8n` webhook adresine `x-www-form-urlencoded` formatında gönderilir. Bu, tarayıcı tabanlı CORS hatalarını minimize etmek için seçilmiş bir yöntemdir ("Simple Request").

### 3. Google Yorumları (`features/reviews`)
- `reviewsService.ts` üzerinden asenkron veri çekme simülasyonu yapılır.
- Gelecekte gerçek Google Places API entegrasyonuna uygun yapıdadır.

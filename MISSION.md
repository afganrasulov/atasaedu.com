# atasaedu.com Yeniden Yazım Görevleri (Feature-Based Architecture)

Bu proje, atasaedu.com web sitesinin modern, performanslı ve yeni nesil bir Tek Sayfa Uygulaması (SPA) olarak yeniden geliştirilmesini kapsamaktadır.
Adres çubuğunda `#` içermeyen, temiz URL yapısına sahip bir SPA olacaktır.
Projede **Next.js + React + TS + TanStack Query + Tailwind CSS + Framer Motion + Zod** teknolojileri kullanılacak ve gelecekteki veritabanı / backend entegrasyonu için **Supabase** altyapısına hazır bir yapı kurulacaktır.

`Screenshots` klasöründeki dosyalara (`.png` ve `.mhtml`) bakılarak orijinal tasarıma sadık kalınacak, ilgili özellikler (feature) bazında "**Feature-Based Coding / Screaming Architecture**" kullanılarak **modüler** olarak geliştirilme yapılacaktır.

---

## 🏗 Klasör Yapısı (Feature-Based) Şablonu

Geliştirme süresince aşağıdaki gibi her özelliğin izole bir şekilde tutulduğu klasör yapısı zorunludur:

* `src/features/[feature-adı]/`
  * `components/` (Sadece bu özelliğe özel componentler)
  * `hooks/` (Data fetching, state vb.)
  * `services/` (API istekleri, Supabase queries)
  * `types.ts` (İlgili tipler, Zod şemaları)
* `src/shared/`
  * Uygulamanın tamamında (birden çok feature'da) kullanılacak tüm Core Componentler (Button, Input, Layout), Utils, Lib dosyaları burada bulunacaktır.

---

## 🛠 Temel Kurulum ve Çekirdek Yapı (Core Stack)

* [ ] **Next.js Kurulumu**: App Router ve TypeScript ile projenin başlatılması (`src` klasörü zorunlu).

* [ ] **Stil ve Tema**: Tailwind CSS konfigürasyonunun yapılması (Kullanılacak renkler, typography ve spacing ayarları).
* [ ] **Core Providers**: TanStack Query ve global state veya Tema yönetimlerinin Provider olarak Root Layout'a eklenmesi.
  * *Agresif Önbellekleme (Caching):* React Context veya TanStack Query'nin persistent cache özellikleri ile localStorage stratejisi.
* [ ] **Animasyonlar**: Framer Motion altyapısının eklenmesi (`AnimatePresence` modülü).
* [ ] **Çevre Değişkenleri**: `.env.local` dosyasının Supabase hazır şekilde projeye dahil edilmesi.
* [ ] **PWA ve Hibrit Mobil Hazırlık (CapacitorJS)**: İleride CapacitorJS ile iOS/Android uygulamasına çevrilebilmesi için `manifest.json`, `sw.js` (Service Worker) ve mobil Safe Area tanımlarının (`viewport-fit=cover`) ayarlanması.

## 🧩 Ortak (Shared) Bileşenler Modülü (`src/shared/`)

* [ ] **Layout ve Navigation**: Hash içermeyen Next.js `<Link>` kullanılarak, `Header` (responsive navbar + mobil menü) ve `Footer` bileşenlerinin kodlanması.

* [ ] **PageTransition Bileşeni**: Sayfalar arası geçişlerde "Blur-out/Blur-in" ve hafif "Scale" işlemi yapacak Apple/iOS tarzı modern sayfa geçiş bileşeni.
* [ ] **UI Kit**: Paylaşımlı kullanılacak temel Buton, Kart (Card), Container, Başlık ve Form Input bileşenlerinin `src/shared/components` altına oluşturulması.

---

Aşağıdaki görevler, tamamen kendi klasörü altında (`src/features/[özellik]`) izole biçimde geliştirilecektir:

## 🏠 Feature: Ana Sayfa (`src/features/homepage`)

*Referans: `Screenshots/ana-sayfa.png`, `Screenshots/ana-sayfa.mhtml`*

* [ ] **Hero Section**: Ana başlık, slogan ve CTA butonlarıyla geliştirilmesi. İlk açılış Layout Shift'ini engellemek için görsellerde `<Image priority>`.
* [ ] **Hizmet Özetleri**: Şirketin sunduğu hizmetlerin kısa özet kartları.
* [ ] **Öne Çıkan Üniversiteler**: Öne çıkan üniversitelerin logo/isimleriyle sergilendiği bir bölüm.
* [ ] **Giriş Animasyonları**: Framer Motion scroll efektleri.

## 🏢 Feature: Hakkımızda Sayfası (`src/features/about`)

*Referans: `Screenshots/hakkimizda.png`, `Screenshots/hakkimizda.mhtml`*

* [ ] **Kurumsal Bölüm**: Şirketin kuruluş amacı, vizyon ve misyon.
* [ ] **Tarihçe / Kilometre Taşları**: Şirketin zaman çizelgesi (timeline).
* [ ] **Görsel Düzenleme**: Ekip ve ofis görsellerinin `<Image>` ile uygun şekilde yerleştirilmesi.

## 🤝 Feature: Hizmetlerimiz Sayfası (`src/features/services`)

*Referans: `Screenshots/hizmetlerimiz.png`, `Screenshots/hizmetlerimiz.mhtml`*

* [ ] **Hizmet Listeleme**: Tüm hizmetlerin detaylı kartlar halinde responsive grid ile sergilenmesi.
* [ ] **Hizmet Detay Geçişleri (Opsiyonel)**: Hizmet kartlarına tıklanınca açılacak modal veya alt-sayfa konfigürasyonları.

## 📝 Feature: Başvuru Süreci Sayfası (`src/features/application-process`)

*Referans: `Screenshots/basvuru-sureci.png`, `Screenshots/basvuru-sureci.mhtml`*

* [ ] **Süreç Adımları (Step/Timeline)**: Adım adım kronolojik UI bileşeninin tasarlanması.
* [ ] **Görsel İnfografik Entegrasyonu**: İkon destekli içerik blokları.

## 🎓 Feature: Üniversiteler Sayfası (`src/features/universities`)

*Referans: `Screenshots/universieteler.png`, `Screenshots/universiteler.mhtml`*

* [ ] **Üniversite Kartları Modülü**: Üniversitelerin liste tasarımı sayfası.
* [ ] **Filtreleme ve Arama Data Katmanı**: Ülkeye veya isme göre filtrelemeye sahip (`hooks/useUniversities.ts` altından yönetilecek) TanStack Query yapısı.
* [ ] **Üniversite Listesi Grip Yapısı**: Responsive kolonlu grid dizilimi.

## 📞 Feature: İletişim Sayfası (`src/features/contact`)

*Referans: `Screenshots/iletisim.png`, `Screenshots/iletisim.mhtml`*

* [ ] **İletişim Bilgileri Gösterimi**: Adres, telefon, e-posta.
* [ ] **Harita Entegrasyonu**: API/iFrame bileşeni.
* [ ] **Zod Destekli İletişim Formu**: Form state yönetimi.
* [ ] **Form Validasyon ve Mutasyon Modülü**: Frontend doğrulaması ve `hooks/useSubmitContact.ts` ile form verisinin yollanması (TanStack Query Mutation).

---

## 🚀 Optimizasyon ve Kalite Kontrol (QA)

* [ ] **SEO Uygulaması**: Next.js Metadata API uygulamasının Feature'lardan Layout/Page katmanlarına exportu.

* [ ] **Performans Profiling**: Ağır bileşenlerde `next/dynamic` ile asenkron yükleme ve bundle size'ı düşürme.
* [ ] **Mobile/Tablet UX Testleri**: QA ajanları tarafından tüm Breakpoint'lerde UI onay süreci.
* [ ] **Genel Health Check / QA**: Dead-link testleri, konsol hata loglarının temizliği.

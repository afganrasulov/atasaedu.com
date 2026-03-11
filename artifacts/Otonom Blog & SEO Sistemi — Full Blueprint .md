# 🚀 Otonom Blog & SEO Sistemi — Full Blueprint

> **Amaç:** Bu doküman, Next.js + Supabase + OpenAI tabanlı tam otonom blog üretim ve SEO optimizasyon sistemini baştan sona açıklar. Yeni bir projeye birebir uyarlanabilir referans belgesidir.

---

## 📐 Genel Mimari

```
┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  CRON JOB    │───▶│  /api/blog/     │───▶│  OpenAI API      │
│  (Railway /  │    │  automate       │    │  (GPT + DALL-E)  │
│   Vercel)    │    │  [POST]         │    └──────────────────┘
└──────────────┘    └────────┬────────┘              │
                             │                       │
                    ┌────────▼────────┐     ┌────────▼────────┐
                    │  Supabase DB    │     │  Supabase       │
                    │  (keywords,     │     │  Storage        │
                    │   topics,       │     │  (OG Images)    │
                    │   posts,        │     └─────────────────┘
                    │   automation_   │
                    │   logs)         │
                    └─────────────────┘
```

### Otomasyon Çalışma Akışı (Her Tetiklenmede)

```
Adım 0 → Keyword Auto-Population  (Kelime azaldıysa AI yenilerini üretir)
Adım 1 → Topic Discovery          (Web araştırması yaparak konu keşfeder)
Adım 2 → Auto-Approve             (Keşfedilen konuları otomatik onaylar)
Adım 3 → Article Generation       (Onaylı konudan SEO blog makalesi üretir)
       → OG Image Generation      (DALL-E ile görsel üretir, Storage'a yükler)
       → Automation Logging        (Sonucu loglar)
```

---

## 🗄️ Veritabanı Şeması (Supabase / PostgreSQL)

### 1. `keywords` Tablosu

```sql
CREATE TABLE keywords (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword     TEXT NOT NULL UNIQUE,
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT now(),
    updated_at  TIMESTAMPTZ DEFAULT now()
);
```

| Kolon       | Açıklama                                                    |
|-------------|-------------------------------------------------------------|
| `keyword`   | SEO hedef anahtar kelime (lowercase, trim edilmiş)          |
| `is_active` | `true` ise otomasyon bu kelimeyi tarar, `false` ise atlar   |

### 2. `topics` Tablosu

```sql
CREATE TABLE topics (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword_id  UUID REFERENCES keywords(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    description TEXT,
    source_url  TEXT,
    status      TEXT DEFAULT 'discovered' 
                CHECK (status IN ('discovered','approved','generating','published','rejected','failed')),
    created_at  TIMESTAMPTZ DEFAULT now(),
    updated_at  TIMESTAMPTZ DEFAULT now()
);
```

| Status Akışı | Açıklama                                    |
|--------------|---------------------------------------------|
| `discovered` | AI tarafından keşfedildi, onay bekliyor     |
| `approved`   | Onaylandı, makale üretimi sırasında         |
| `generating` | Makale şu anda üretiliyor                   |
| `published`  | Makale başarıyla üretildi ve yayınlandı      |
| `rejected`   | Manuel olarak reddedildi                     |
| `failed`     | Üretim sırasında hata oluştu                |

### 3. `posts` Tablosu

```sql
CREATE TABLE posts (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id     UUID REFERENCES topics(id),
    title        TEXT NOT NULL,
    slug         TEXT NOT NULL UNIQUE,
    content      TEXT NOT NULL,        -- HTML formatında makale içeriği
    summary      TEXT,                 -- Meta description (150-160 karakter)
    keywords     TEXT[] DEFAULT '{}',  -- SEO anahtar kelimeleri dizisi
    faq          JSONB DEFAULT '[]',   -- [{question, answer}] formatında
    seo_score    INTEGER DEFAULT 0,    -- 1-100 arası SEO kalite puanı
    schema_json  JSONB DEFAULT '{}',   -- Article + FAQ Schema.org JSON-LD
    og_image_url TEXT,                 -- DALL-E ile üretilen OG görsel URL'i
    created_at   TIMESTAMPTZ DEFAULT now(),
    updated_at   TIMESTAMPTZ DEFAULT now()
);
```

### 4. `automation_logs` Tablosu

```sql
CREATE TABLE automation_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discovered  INTEGER DEFAULT 0,
    approved    INTEGER DEFAULT 0,
    generated   INTEGER DEFAULT 0,
    errors      TEXT[] DEFAULT '{}',
    duration_ms INTEGER DEFAULT 0,
    status      TEXT CHECK (status IN ('success','partial','failed')),
    created_at  TIMESTAMPTZ DEFAULT now()
);
```

---

## 📁 Dosya Yapısı

```
src/
├── lib/blog/
│   ├── supabaseAdmin.ts       # Supabase service-role client (singleton)
│   ├── blogService.ts         # CRUD fonksiyonları (keywords, topics, posts)
│   ├── keywordDiscovery.ts    # AI ile keyword üretimi + web araştırması
│   ├── seoOptimizer.ts        # AI ile makale üretimi + Schema.org
│   ├── ogImageGenerator.ts    # DALL-E ile OG görsel üretimi
│   └── aiSeoSchema.ts         # Statik Schema.org şemaları (Article, FAQ, HowTo, Service, vb.)
│
├── app/api/blog/
│   ├── automate/route.ts      # 🤖 CRON endpoint - Tam otonom pipeline
│   ├── keywords/route.ts      # CRUD: GET/POST/PUT/DELETE anahtar kelimeler
│   ├── topics/route.ts        # GET: Keşfedilen konuları listele
│   ├── discover/route.ts      # POST: Manuel konu keşfi tetikle
│   ├── generate/route.ts      # POST: Manuel makale üretimi tetikle
│   ├── internal-link/route.ts # POST: Makalelere otomatik iç link enjekte et
│   └── posts/
│       ├── route.ts           # GET: Blog yazılarını listele
│       └── [slug]/route.ts    # GET: Tek blog yazısını getir
│
├── app/blog/
│   ├── page.tsx               # Blog listeleme sayfası (SSR)
│   └── [slug]/page.tsx        # Blog detay sayfası (SSR + generateMetadata)
│
└── app/sitemap.ts             # Otomatik XML sitemap (blog + statik sayfalar)
```

---

## 🔧 Modül Detayları

### 1. `supabaseAdmin.ts` — Veritabanı Bağlantısı

```typescript
import { createClient } from '@supabase/supabase-js';

let _client: any = null;

export function getSupabaseAdmin() {
    if (!_client) {
        _client = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { db: { schema: 'your_schema_name' } }  // ← Projeye göre değiştir
        );
    }
    return _client;
}
```

> [!IMPORTANT]
> `SUPABASE_SERVICE_ROLE_KEY` **server-side only** kullanılmalı. Asla client'a expose etme!

---

### 2. `blogService.ts` — CRUD Servisleri

Bu dosya, veritabanı ile doğrudan iletişim kuran tüm fonksiyonları barındırır:

| Fonksiyon                | Açıklama                                           |
|--------------------------|---------------------------------------------------|
| `getKeywords()`          | Tüm anahtar kelimeleri getir                       |
| `addKeyword(keyword)`    | Yeni anahtar kelime ekle (lowercase, trim)         |
| `updateKeyword(id, ...)`  | Kelimeyi güncelle veya aktif/pasif yap             |
| `deleteKeyword(id)`      | Kelimeyi sil                                       |
| `getTopics(status?)`     | Konuları listele (opsiyonel status filtresi)        |
| `createTopic({...})`     | Yeni keşfedilmiş konu ekle                          |
| `updateTopicStatus(id)`  | Konu durumunu güncelle                              |
| `getTopicsByKeywordId()` | Bir kelimeye ait konuları getir (yineleme engeli)   |
| `getPosts(page, limit)`  | Sayfalanmış blog yazılarını getir                   |
| `getPostBySlug(slug)`    | Slug'a göre tek yazıyı getir                        |
| `createPost({...})`      | Yeni blog yazısını kaydet                           |
| `autoApproveTopics(n)`   | En yeni `n` adet discovered topic'i otomatik onayla |
| `getTodayGenerationCount()` | Bugün kaç makale üretildiğini say                |
| `logAutomationRun({...})`   | Otomasyon sonucunu logla                          |

---

### 3. `keywordDiscovery.ts` — Akıllı Keyword & Konu Keşfi

#### `discoverTopics()` — Web Araştırması ile Konu Bulma

```
1. Veritabanından aktif anahtar kelimeleri çek
2. Her kelime için OpenAI'a "web_search" aracıyla güncel araştırma yaptır
3. AI, 4 kategoride (news, evergreen, paa, long-tail) konu üretir
4. Her konuya 1-100 arası skor verir (alakalılık + arama potansiyeli + rekabet)
5. Skor eşiğini (SCORE_THRESHOLD = 50) geçen konular veritabanına kaydedilir
6. Daha önce kaydedilmiş URL ve başlıkla çakışanlar atlanır (deduplication)
```

> [!TIP]
> **Yeni projeye uyarlarken:** AI prompt'undaki sektör bilgilerini ve hizmet listesini değiştir. "DİKKAT EDİLECEK KURALLAR" bölümünde firmanın HİZMETLERİNİ ve YASAK konuları özelleştir.

#### `autoPopulateKeywords(minThreshold)` — Otomatik Keyword Üretici

```
1. Veritabanında aktif keyword sayısını kontrol et
2. Eğer aktif keyword sayısı < minThreshold (varsayılan: 5) ise:
   → AI'dan sektöre özel 5 yeni long-tail keyword iste
   → Mevcut kelimelerle çakışmayanları veritabanına ekle
3. Eğer aktif keyword yeterli ise: hiçbir şey yapma (return 0)
```

> [!IMPORTANT]
> **ÖRNEK ODAK KELİMELER** bölümünü yeni projenin ana kelimelerinin listesiyle değiştir! Bu liste, AI'a "Bu kalitede, bu nişlikte kelimeler üret" diye yol gösterir.

---

### 4. `seoOptimizer.ts` — AI Makale Üretici

```
1. Topic durumunu "generating" yap
2. OpenAI'a web_search tool'u ile zenginleştirilmiş, SEO uyumlu makale yazdır
3. AI şunları döndürür (JSON):
   - title (50-60 karakter)
   - slug (URL-friendly)
   - content (HTML, min 1500 kelime, H2/H3 hiyerarşisi)
   - summary (meta description, 150-160 karakter)
   - keywords (SEO anahtar kelimeler dizisi)
   - faq (3-5 adet soru-cevap)
   - seo_score (1-100)
4. Article + FAQ Schema.org JSON-LD oluştur
5. OG görselini üret (DALL-E) ve Supabase Storage'a yükle
6. Tüm veriyi posts tablosuna kaydet
7. Topic durumunu "published" yap
```

#### Prompt'taki Kritik Kurallar (Yeni Projeye Uyarlanmalı):

| Kural                        | Neden Var?                                               |
|------------------------------|----------------------------------------------------------|
| Title 50-60 karakter         | Google SERP'te kesintisiz görünsün                       |
| Summary 150-160 karakter     | Meta description SERP'te tam görünsün                    |
| Min 1500 kelime              | Google "thin content" cezası vermesin                    |
| HTML `<a>` zorunluluğu       | Markdown linkleri blog frontend'inde bozulmasın           |
| Sadece .gov.tr linkleri      | Üçüncü parti linklere güvenilirlik riski oluşmasın        |
| **İç Linkleme Kuralları**    | Makale içinde hizmet sayfalarına trafik akışı sağlansın  |
| Max 2 kez aynı kelimeyi linkle | Spam algılanmasın                                     |

#### İç Linkleme Tablosu (Yeni Projeye Göre Düzenle):

```
Anahtar Kelime         → Hedef URL
─────────────────────────────────────────
"çalışma izni"         → /calisma-izni
"ikamet izni"          → /ikamet-izni
"şirket kuruluşu"     → /sirket-kurulusu
"vatandaşlık"         → /vatandaslik
"çalışma izni uzatma"  → /calisma-izni-uzatma
...
```

---

### 5. `ogImageGenerator.ts` — OG Görsel Üretimi

```
1. DALL-E 3 ile Notion-style scribble illüstrasyon üret
2. Görseli fetch ile indir → Buffer'a çevir
3. Supabase Storage'a upload et (public-assets bucket)
4. Public URL'i döndür → posts tablosunda og_image_url'e kaydet
```

> [!NOTE]
> Görsel üretimi opsiyoneldir. Hata olursa makale yine yayınlanır. Prompt'taki stil (`Notion-style scribble`) değiştirilebilir.

---

### 6. `aiSeoSchema.ts` — Schema.org Yapılandırılmış Veri

Site genelinde kullanılan Schema.org JSON-LD şemalarını üretir:

| Fonksiyon                       | Schema Tipi      | Kullanım Yeri          |
|---------------------------------|------------------|------------------------|
| `generateArticleSchema()`       | Article          | Blog detay sayfası     |
| `generateFAQSchema()`           | FAQPage          | Blog + hizmet sayfaları|
| `generateBreadcrumbSchema()`    | BreadcrumbList   | Tüm alt sayfalar       |
| `generateOrganizationSchema()`  | Organization     | Root layout            |
| `generateLocalBusinessSchema()` | LocalBusiness    | Root layout            |
| `generateHowToSchema()`         | HowTo            | Rehber tipi blog yazıları |
| `generateServiceSchemas()`      | Service          | Hizmetlerimiz sayfası  |
| `generateWebSiteSchema()`       | WebSite          | Root layout (Sitelinks) |

---

## 🌐 API Endpoint'leri

### `POST /api/blog/automate` — 🤖 Tam Otonom Pipeline

**Auth:** `Authorization: Bearer {CRON_SECRET}` header'ı zorunlu.

**Akış:** Keyword Populate → Topic Discover → Auto-Approve → Article Generate

**Config sabitleri:**
```typescript
const DAILY_LIMIT = 2;    // Günlük toplam makale limiti
const PER_RUN_LIMIT = 1;  // Her cron çalışmasında max makale
```

**Response:**
```json
{
    "success": true,
    "populated": 3,
    "discovered": 8,
    "approved": 1,
    "generated": 1,
    "dailyLimit": 2,
    "todayTotal": 1,
    "errors": [],
    "duration_ms": 45230
}
```

### Diğer Endpoint'ler

| Method | Endpoint                     | Açıklama                           |
|--------|------------------------------|-------------------------------------|
| GET    | `/api/blog/keywords`         | Tüm anahtar kelimeleri listele      |
| POST   | `/api/blog/keywords`         | Yeni anahtar kelime ekle            |
| PUT    | `/api/blog/keywords`         | Anahtar kelimeyi güncelle           |
| DELETE | `/api/blog/keywords?id=xxx`  | Anahtar kelimeyi sil                |
| GET    | `/api/blog/topics`           | Keşfedilmiş konuları listele        |
| POST   | `/api/blog/discover`         | Manuel konu keşfi tetikle           |
| POST   | `/api/blog/generate`         | Manuel makale üretimi tetikle       |
| GET    | `/api/blog/posts`            | Blog yazılarını listele (paginated) |
| GET    | `/api/blog/posts/[slug]`     | Tek yazıyı getir                    |

---

## 🔑 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Otomasyon Güvenliği
CRON_SECRET=super-gizli-bir-token-buraya
```

---

## ⏰ CRON Job Kurulumu

### Railway ile (Önerilen)

Railway dashboard → Cron Jobs → New Cron Job:

```
Schedule: 0 8,14 * * *    (Her gün 08:00 ve 14:00'te)
Command:  curl -X POST https://your-domain.com/api/blog/automate \
          -H "Authorization: Bearer YOUR_CRON_SECRET" \
          -H "Content-Type: application/json"
```

### Vercel ile

`vercel.json`:
```json
{
    "crons": [
        {
            "path": "/api/blog/automate",
            "schedule": "0 8,14 * * *"
        }
    ]
}
```

### Alternatif: Ücretsiz Harici CRON (cron-job.org)

1. [cron-job.org](https://cron-job.org) adresine kayıt ol
2. URL: `https://your-domain.com/api/blog/automate`
3. Method: POST
4. Header: `Authorization: Bearer YOUR_CRON_SECRET`
5. Schedule: Günde 2 kez

---

## 🔄 Yeni Projeye Uyarlama Rehberi (Checklist)

### Adım 1: Veritabanı

- [ ] Supabase'de yeni schema oluştur
- [ ] 4 tabloyu (keywords, topics, posts, automation_logs) oluştur
- [ ] Supabase Storage'da `public-assets` bucket oluştur

### Adım 2: Environment Variables

- [ ] `.env.local` dosyasını oluştur ve 4 değişkeni tanımla
- [ ] `supabaseAdmin.ts` içindeki schema adını güncelle

### Adım 3: AI Prompt'larını Özelleştir

- [ ] `keywordDiscovery.ts` → `searchWebForKeyword()` prompt'unda:
  - Firma adını değiştir
  - Hizmet alanlarını bu projenin hizmetleriyle değiştir
  - "DİKKAT EDİLECEK KURALLAR" bölümünü özelleştir
  - "YASAK KONULAR" bölümünü güncelle

- [ ] `keywordDiscovery.ts` → `autoPopulateKeywords()` prompt'unda:
  - Firma hizmetleri listesini güncelle
  - "ÖRNEK ODAK KELİMELER" bölümünü yeni hedef kelimelerle değiştir
  - "YASAK KONULAR" bölümünü güncelle

- [ ] `seoOptimizer.ts` → `generateArticle()` prompt'unda:
  - Hedef kitle açıklamasını değiştir
  - "İÇ LİNKLEME KURALLARI" tablosunu yeni sayfalarla güncelle
  - Harici link kurallarını özelleştir

### Adım 4: Schema.org Şemalarını Güncelle

- [ ] `aiSeoSchema.ts` içinde:
  - `SITE_URL` değiştir
  - `COMPANY_INFO` referanslarını güncelle
  - `SERVICES[]` dizisini yeni hizmetlerle doldur
  - `generateLocalBusinessSchema()` adres/saat bilgilerini güncelle

### Adım 5: OG Görsel Stili

- [ ] `ogImageGenerator.ts` prompt'undaki stil tanımını değiştir (opsiyonel)
- [ ] Storage bucket/klasör adını güncelle

### Adım 6: Frontend

- [ ] Blog listeleme sayfası oluştur (`/blog/page.tsx`)
- [ ] Blog detay sayfası oluştur (`/blog/[slug]/page.tsx`)
- [ ] `generateMetadata()` fonksiyonunda SEO metadata'yı dinamik olarak oluştur
- [ ] `sitemap.ts` dosyasını oluştur (blog yazılarını otomatik dahil et)

### Adım 7: CRON Job

- [ ] CRON_SECRET oluştur ve environment'a ekle
- [ ] CRON job'u ayarla (günde 2 kez önerilir)
- [ ] İlk çalıştırmayı test et

---

## 💰 Maliyet Tahmini (Aylık)

| Kalem                  | Tahmini Maliyet |
|------------------------|-----------------|
| OpenAI GPT (makale)    | ~$5-10          |
| OpenAI GPT (keyword)   | ~$1-2           |
| OpenAI DALL-E (görsel) | ~$6-12          |
| Supabase Free Tier     | $0              |
| **Toplam**             | **~$12-24/ay**  |

> Günde 2 makale × 30 gün = Ayda 60 makale, 60 OG görsel. Yılda 730 benzersiz SEO makale.

---

## ⚠️ Dikkat Edilmesi Gereken Noktalar

> [!CAUTION]
> - **AI Content Spam:** Google "Helpful Content" algoritması var. Günde 2'den fazla makale üretme.
> - **Duplicate Content:** Slug benzersizliğini veritabanı UNIQUE constraint ile garanti et.
> - **API Key Güvenliği:** CRON_SECRET olmadan automate endpoint'i çalışmaz.
> - **Rate Limiting:** OpenAI API rate limit'lerine dikkat et. `PER_RUN_LIMIT = 1` güvenli bir değer.
> - **İç Linklemede Spam:** Aynı kelimeyi makale boyunca max 2 kez linkle.

> [!TIP]
> - Google Search Console'a site eklendikten sonra sitemap.xml'i hemen gönderin.
> - İlk 30 gün manuel keyword'ler ekleyin, sonra AI'ın kendisine bırakın.
> - Blog yazılarını sosyal medyada paylaşmak doğal backlink'in anahtarıdır.

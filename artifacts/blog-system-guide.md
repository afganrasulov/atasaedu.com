# AI Blog Sistemi — Teknik Dokümantasyon

> YouTube videolarından otomatik blog yazısı üreten, Supabase veritabanı üzerinde çalışan, SEO optimize tam otomatik blog sistemi.

---

## Mimari Genel Bakış

```mermaid
graph LR
    YT[YouTube Kanalı] -->|Otomatik Tarama| API[Blog API<br>Node.js/Express<br>Railway]
    API -->|OpenAI GPT-4o-mini| AI[AI Blog Yazarı]
    AI -->|INSERT| DB[(Supabase DB<br>blog_posts)]
    Admin[Blog Admin<br>HTML/Express<br>Railway] -->|CRUD| API
    Frontend[React Frontend<br>Vite] -->|SELECT| DB
    DB -->|anon key| Frontend
```

---

## 1. Bileşenler

### 1.1 Blog API (`atasa-blog-api`)

| Özellik | Detay |
|---------|-------|
| **Repo** | `afganrasulov/atasa-blog-api` |
| **Tech** | Node.js, Express, `pg` (PostgreSQL) |
| **Host** | Railway |
| **DB** | Supabase PostgreSQL (schema: `atasa_mobi`) |

**Ana işlevler:**
- YouTube video tarama (cron job, 6 saat aralıklarla)
- Video → ses çıkarma → transkript (OpenAI Whisper)
- Transkript → blog yazısı (GPT-4o-mini)
- CRUD API (`/api/posts/*`)
- Sitemap üretimi (`/sitemap-blog.xml`)
- Zamanlanmış yayınlama

**Pipeline akışı:**
```
YouTube Tarama → Video Bulma → Ses Çıkarma → Transkript → AI Blog → Draft/Publish
     ↑                                                                    ↓
   Cron Job                                                     blog_posts tablosu
```

**Önemli ayarlar** (`settings` tablosu):
| Key | Açıklama |
|-----|----------|
| `auto_scan_enabled` | YouTube otomatik tarama açık/kapalı |
| `auto_transcribe` | Otomatik transkript açık/kapalı |
| `auto_blog` | Otomatik blog oluşturma açık/kapalı |
| `auto_publish` | Otomatik yayınlama açık/kapalı |
| `autopilot` | Webhook'tan gelen yazıları otomatik yayınla |
| `blog_prompt` | AI blog yazma promptu |
| `ai_seo_rules` | SEO kuralları promptu |
| `openai_api_key` | OpenAI API anahtarı |
| `youtube_api_key` | YouTube Data API anahtarı |
| `scan_interval_hours` | Tarama aralığı (saat) |

---

### 1.2 Blog Admin (`atasa-blog-admin`)

| Özellik | Detay |
|---------|-------|
| **Repo** | `afganrasulov/atasa-blog-admin` |
| **Tech** | Vanilla HTML + JavaScript + Express (static serve) |
| **Host** | Railway |

**Özellikler:**
- Blog yazılarını listeleme, düzenleme, silme
- YouTube videolarını yönetme
- Transkript ve blog oluşturma tetikleme
- Prompt ve ayarları düzenleme
- Markdown önizleme

> **Not:** Admin paneli API'ye doğrudan HTTP istekleri gönderir. Auth, `allowed_users` tablosundaki email ile yapılır.

---

### 1.3 Frontend Blog Sayfaları (React)

#### `blogService.ts` — Supabase Veri Çekme

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: { schema: 'custom_schema' }, // ÖNEMLİ: custom schema
});

// Tüm yayınlanmış yazıları getir
export async function fetchBlogPosts(category?: string) {
    let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    if (category) query = query.eq('category', category);
    const { data } = await query;
    return data || [];
}

// Tek yazı getir (slug ile)
export async function fetchBlogPost(slug: string) {
    const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
    return data || null;
}
```

> **ÖNEMLİ:** Frontend `anon key` kullanır, sadece `SELECT` yapabilir. RLS policy gerekli.

#### `BlogListPage.tsx` — Yazı Listesi

- Kategori filtreleme (YouTube, Shorts, Genel)
- Responsive grid layout
- Kapak görseli, başlık, özet, tarih, okuma süresi

#### `BlogDetailPage.tsx` — Yazı Detayı

- Markdown render
- JSON-LD structured data (BlogPosting / VideoObject)
- FAQPage schema (otomatik parser ile)
- SEO meta tags (title, description, og:image)

---

### 1.4 FAQ Parser (`faqParser.ts`)

Blog içeriğindeki `## Sıkça Sorulan Sorular` bölümünü otomatik tespit edip Google FAQPage JSON-LD schema oluşturur.

**Desteklenen format:**
```markdown
## Sıkça Sorulan Sorular

### Soru 1?
Cevap 1 metni.

### Soru 2?
Cevap 2 metni.
```

**Çıktı (JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Soru 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cevap 1 metni."
      }
    }
  ]
}
```

---

## 2. Veritabanı Şeması

### `blog_posts` Tablosu

```sql
CREATE TABLE custom_schema.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    cover_image TEXT,
    tags TEXT[],
    author VARCHAR(100) DEFAULT 'Admin',
    category VARCHAR(100) DEFAULT 'Genel',
    video_id VARCHAR(50),          -- YouTube video ID (varsa)
    read_time VARCHAR(20),
    status VARCHAR(20) DEFAULT 'draft',   -- draft | published | scheduled
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    scheduled_at TIMESTAMP,
    meta_description TEXT,
    focus_keyword VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE custom_schema.blog_posts ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (published olanları)
CREATE POLICY "Public read" ON custom_schema.blog_posts
    FOR SELECT USING (is_published = true);

-- Service role her şeyi yapabilir (API tarafı)
CREATE POLICY "Service full access" ON custom_schema.blog_posts
    FOR ALL USING (auth.role() = 'service_role');
```

### `youtube_videos` Tablosu

```sql
CREATE TABLE custom_schema.youtube_videos (
    id VARCHAR(50) PRIMARY KEY,        -- YouTube video ID
    title VARCHAR(500),
    description TEXT,
    thumbnail VARCHAR(500),
    duration INTEGER,                   -- saniye
    view_count INTEGER,
    published_at TIMESTAMP,
    channel_id VARCHAR(50),
    video_type VARCHAR(20) DEFAULT 'video', -- video | short
    audio_url TEXT,
    audio_status VARCHAR(20) DEFAULT 'pending',
    transcript TEXT,
    transcript_status VARCHAR(20) DEFAULT 'pending',
    transcript_job_id VARCHAR(100),
    transcript_model VARCHAR(50),
    transcript_updated_at TIMESTAMP,
    blog_created BOOLEAN DEFAULT FALSE,
    blog_post_id UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### `settings` Tablosu

```sql
CREATE TABLE custom_schema.settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT
);
```

---

## 3. AI Blog Üretim Promptu

```text
Sen [KONU] konusunda uzman bir SEO blog yazarısın.

Video transkriptini kullanarak kapsamlı blog yazısı oluştur.

## FORMAT KURALLARI
- İlk satır: BAŞLIK: [SEO optimize başlık] ardından "---"
- İçerik min 1000 kelime
- Markdown formatı: ## alt başlıklar, **kalın**, - listeler
- Her 200-300 kelimede ## alt başlık

## İÇERİK YAPISI
1. Giriş (2-3 cümle)
2. Ana içerik (## başlıklarla bölümlenmiş)
3. Pratik adımlar (listeler)
4. ## Sıkça Sorulan Sorular (4 soru-cevap, ### ile)
5. Sonuç ve CTA

## SEO KURALLARI
- Başlık 50-60 karakter
- İlk 160 karakterde ana konu
- Doğal anahtar kelime yoğunluğu (%1-2)
- "2025", "güncel" gibi taze kelimeler

## AI SEO (AEO) KURALLARI
- Net, doğrudan cevaplar (AI snippet uyumlu)
- Soru-cevap formatı (Perplexity/ChatGPT alıntılayabilsin)
- Güvenilir kaynak referansları
```

---

## 4. Yeni Proje İçin Kurulum Adımları

### Adım 1: Supabase Kurulumu
```bash
# 1. Supabase'de yeni proje oluştur
# 2. Custom schema oluştur
CREATE SCHEMA IF NOT EXISTS my_project;

# 3. blog_posts tablosunu oluştur (yukarıdaki SQL)
# 4. RLS policy'leri ekle
# 5. Anon key ve URL'i al
```

### Adım 2: Blog API'yi Klonla ve Özelleştir
```bash
git clone https://github.com/afganrasulov/atasa-blog-api.git my-blog-api
cd my-blog-api

# .env dosyasını oluştur
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
PORT=3000
AUDIO_PROCESSOR_URL=http://localhost:3001
```

**Özelleştirmeler:**
- `search_path` schema adını değiştir
- `getDefaultBlogPrompt()` fonksiyonunu konuya göre güncelle
- `getDefaultSeoRules()` SEO kurallarını güncelle
- YouTube kanal bilgilerini `settings` tablosuna ekle

### Adım 3: Blog Admin'i Klonla
```bash
git clone https://github.com/afganrasulov/atasa-blog-admin.git my-blog-admin
cd my-blog-admin

# API URL'ini güncelle (public/index.html içinde)
# API_URL = 'https://my-blog-api.up.railway.app'
```

### Adım 4: Frontend Entegrasyonu
```typescript
// blogService.ts oluştur
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://[PROJECT].supabase.co',
    '[ANON_KEY]',
    { db: { schema: 'my_project' } }
);
```

### Adım 5: Railway'e Deploy
```bash
# Blog API
railway login
railway init
railway up

# Blog Admin
railway init
railway up
```

### Adım 6: FAQ ve SEO
```typescript
// faqParser.ts'i kopyala
// BlogDetailPage.tsx'e JSON-LD schema ekle
// sitemap-blog.xml build script'i ekle
```

---

## 5. Toplu FAQ Ekleme (Edge Function)

Mevcut blog yazılarına toplu FAQ eklemek için Supabase Edge Function:

```typescript
// generate-blog-faqs Edge Function
// OpenAI GPT-4o-mini ile blog içeriğinden 4 SSS üretir
// batch_size: 10 (bir seferde işlenecek yazı sayısı)
// dry_run: true (test), false (gerçek güncelleme)

// Kullanım:
curl -X POST "https://[PROJECT].supabase.co/functions/v1/generate-blog-faqs" \
  -H "Content-Type: application/json" \
  -d '{"batch_size": 10, "dry_run": false}'
```

---

## 6. Dosya Yapısı

```
📦 Proje
├── atasa-blog-api/          ← Blog API (Railway)
│   ├── src/
│   │   ├── index.js         ← Ana API (YouTube, Blog CRUD, Sitemap)
│   │   ├── carousel-render.js
│   │   └── instagram-publisher.js
│   └── package.json
│
├── atasa-blog-admin/        ← Admin Panel (Railway)
│   ├── server.js            ← Express static serve
│   └── public/
│       ├── index.html       ← Tek sayfa admin (SPA)
│       └── js/              ← Frontend logic
│
└── frontend/                ← React Frontend (Vite)
    └── features/blog/
        ├── blogService.ts   ← Supabase client (anon key, SELECT only)
        ├── BlogListPage.tsx ← Blog listesi
        ├── BlogDetailPage.tsx ← Blog detay + JSON-LD
        └── faqParser.ts     ← SSS otomatik çıkarma + FAQPage schema
```

---

## 7. Önemli Notlar

> [!IMPORTANT]
> **Custom Schema:** Supabase'de `public` schema yerine custom schema kullanılıyor. Frontend Supabase client'ında `db: { schema: 'my_schema' }` belirtmek zorunlu.

> [!WARNING]
> **RLS Policy:** Custom schema kullanırken blog verisi frontend'de görünmüyorsa RLS policy eksik demektir. `/supabase-custom-schema-fix` workflow'una bak.

> [!TIP]
> **Slug üretimi:** Türkçe karakterleri ASCII'ye çevir (ğ→g, ü→u, ş→s, ı→i, ö→o, ç→c), boşlukları tire yap, küçük harfe çevir.

# Blog API — Kullanım Kılavuzu

Kaynak sitelerden konu keşfi yapan, kullanıcı onayı ile OpenAI + web araştırması kullanarak SEO uyumlu Türkçe blog makaleleri üreten API sistemi.

---

## Sistem Mimarisi

```
Kaynak Siteler (StudyFans vb.)
        │
        ▼
  ┌─────────────┐
  │  /discover   │  Konu başlıklarını keşfet
  └──────┬──────┘
         │ status: "discovered"
         ▼
  ┌─────────────┐
  │  /topics     │  Konuları incele & onayla
  └──────┬──────┘
         │ status: "approved"
         ▼
  ┌─────────────┐
  │  /generate   │  OpenAI + Web Search ile makale üret
  └──────┬──────┘
         │ status: "published"
         ▼
  ┌─────────────┐
  │  /posts      │  Blog yazılarını listele & göster
  └─────────────┘
```

---

## Kullanım Akışı

### Adım 1: Kaynak Ekle (Opsiyonel)

4 kaynak varsayılan olarak ekli gelir. Yeni kaynak eklemek için:

```bash
curl -X POST http://localhost:6001/api/blog/sources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "StudyFans - Scholarships",
    "url": "https://studyfans.com/en/scholarships"
  }'
```

### Adım 2: Konu Keşfi

Tüm aktif kaynakları tarar, makale linklerini ve başlıklarını `blog.topics` tablosuna `discovered` olarak kaydeder.

```bash
curl -X POST http://localhost:6001/api/blog/discover
```

**Yanıt:**

```json
{
  "sourcesScanned": 4,
  "newTopics": 35
}
```

### Adım 3: Konuları İncele

Keşfedilen konuları listele ve hangilerini makaleye dönüştürmek istediğine karar ver.

```bash
curl http://localhost:6001/api/blog/topics?status=discovered
```

**Yanıt:**

```json
{
  "topics": [
    {
      "id": "uuid-1",
      "original_title": "Top 10 Engineering Faculties in Turkey",
      "original_url": "https://studyfans.com/en/blogs/968",
      "status": "discovered",
      "source": {
        "name": "StudyFans - Study in Turkey",
        "url": "https://studyfans.com/en/study-in-turkey"
      }
    }
  ]
}
```

### Adım 4: Konuyu Onayla veya Reddet

```bash
# Onayla
curl -X PATCH http://localhost:6001/api/blog/topics \
  -H "Content-Type: application/json" \
  -d '{"id": "uuid-1", "status": "approved"}'

# Reddet
curl -X PATCH http://localhost:6001/api/blog/topics \
  -H "Content-Type: application/json" \
  -d '{"id": "uuid-2", "status": "rejected"}'
```

### Adım 5: Makale Üret

Onaylanan konular için OpenAI GPT-4o + web araştırması ile SEO uyumlu makale üretir.

```bash
# Tek konu için
curl -X POST http://localhost:6001/api/blog/generate \
  -H "Content-Type: application/json" \
  -d '{"topicId": "uuid-1"}'

# Tüm onaylı konular için (toplu üretim)
curl -X POST http://localhost:6001/api/blog/generate \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Yanıt (toplu):**

```json
{
  "success": true,
  "generated": 3,
  "total": 5,
  "errors": ["Konu X: Rate limit exceeded"]
}
```

### Adım 6: Yazıları Görüntüle

```bash
# Listeleme (paginasyonlu)
curl http://localhost:6001/api/blog/posts?page=1&limit=10

# Tekil yazı
curl http://localhost:6001/api/blog/posts/turkiyede-en-ucuz-muhendislik-universiteleri
```

---

## Endpoint Referansı

### `GET /api/blog/sources`

Kayıtlı kaynakları listeler.

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| — | — | — | Parametre almaz |

**Yanıt:** `{ sources: BlogSource[] }`

---

### `POST /api/blog/sources`

Yeni kaynak ekler.

| Body | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| name | string | ✅ | Kaynak adı |
| url | string | ✅ | Kategori sayfası URL'i |

**Yanıt:** `{ source: BlogSource }` — `201 Created`

---

### `DELETE /api/blog/sources?id=UUID`

Kaynağı ve ilişkili tüm konuları siler.

| Query | Tip | Zorunlu | Açıklama |
|-------|-----|---------|----------|
| id | uuid | ✅ | Kaynak ID |

**Yanıt:** `{ success: true }`

---

### `POST /api/blog/discover`

Tüm aktif kaynakları tarar ve yeni konu başlıklarını keşfeder. Daha önce keşfedilmiş konuları atlar (duplikat kontrolü).

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| — | — | — | Parametre almaz |

**Yanıt:**

```json
{
  "sourcesScanned": 4,
  "newTopics": 12
}
```

---

### `GET /api/blog/topics`

Konuları listeler. Opsiyonel durum filtresi ile.

| Query | Tip | Zorunlu | Açıklama |
|-------|-----|---------|----------|
| status | string | ❌ | `discovered`, `approved`, `generating`, `published`, `rejected`, `failed` |

**Yanıt:** `{ topics: BlogTopic[] }`

---

### `PATCH /api/blog/topics`

Konu durumunu günceller (onay/red).

| Body | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| id | uuid | ✅ | Konu ID |
| status | string | ✅ | `discovered`, `approved`, `rejected` |

**Yanıt:** `{ success: true }`

---

### `POST /api/blog/generate`

Onaylanan konular için AI makale üretir.

| Body | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| topicId | uuid | ❌ | Belirli konu ID. Verilmezse tüm `approved` konular üretilir |

**Yanıt (tek konu):**

```json
{
  "success": true,
  "message": "Article generated for: Top 10 Engineering Faculties in Turkey"
}
```

**Yanıt (toplu):**

```json
{
  "success": true,
  "generated": 3,
  "total": 5,
  "errors": []
}
```

---

### `GET /api/blog/posts`

Yayınlanan blog yazılarını paginasyonlu olarak döner.

| Query | Tip | Zorunlu | Varsayılan | Açıklama |
|-------|-----|---------|------------|----------|
| page | number | ❌ | 1 | Sayfa numarası |
| limit | number | ❌ | 10 | Sayfa başına yazı |

**Yanıt:**

```json
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 35,
    "totalPages": 4
  }
}
```

---

### `GET /api/blog/posts/[slug]`

Tekil blog yazısını slug ile döner.

| Param | Tip | Zorunlu | Açıklama |
|-------|-----|---------|----------|
| slug | string | ✅ | URL slug |

**Yanıt:** `{ post: BlogPost }` veya `404`

---

## Konu Durumları (Topic Status Flow)

```
discovered ──► approved ──► generating ──► published
     │                          │
     ▼                          ▼
  rejected                    failed
```

| Durum | Açıklama |
|-------|----------|
| `discovered` | Kaynak siteden keşfedildi, onay bekliyor |
| `approved` | Kullanıcı onayladı, AI üretim bekliyor |
| `generating` | AI makale üretimi devam ediyor |
| `published` | Makale üretildi ve yayında |
| `rejected` | Kullanıcı reddetti |
| `failed` | AI üretimi başarısız oldu |

---

## Veritabanı Şeması

Tüm tablolar Supabase `atasa_edu` schema'sında:

| Tablo | Açıklama |
|-------|----------|
| `atasa_edu.sources` | Kaynak URL'ler (StudyFans kategorileri vb.) |
| `atasa_edu.topics` | Keşfedilen konu başlıkları + durum |
| `atasa_edu.posts` | SEO uyumlu blog yazıları |

---

## SEO Özellikleri

Her üretilen makale şunları içerir:

- **Title**: 50-60 karakter, anahtar kelime optimizeli
- **Meta Description**: 150-160 karakter, CTA içerir
- **Heading Yapısı**: H2/H3 hiyerarşisi
- **FAQ Bölümü**: 3-5 soru-cevap (AI alıntılama için)
- **Schema.org JSON-LD**: Article + FAQPage markup
- **Keywords**: Otomatik anahtar kelime listesi
- **SEO Skoru**: 1-100 arası değerlendirme

---

## Varsayılan Kaynaklar

Sistem kurulumunda 4 kaynak seed olarak eklenir:

| Kaynak | URL |
|--------|-----|
| StudyFans - Living in Turkiye | `https://studyfans.com/en/living-in-turkiye` |
| StudyFans - University Majors | `https://studyfans.com/en/university-majors` |
| StudyFans - Study in Turkey | `https://studyfans.com/en/study-in-turkey` |
| StudyFans - Self Development | `https://studyfans.com/en/tips-for-self-development` |

---

## Ortam Değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (blog schema erişimi) |
| `OPENAI_API_KEY` | OpenAI API key (GPT-4o + web search) |

---

## Backend Dosya Yapısı

```
src/
├── lib/blog/
│   ├── blogService.ts    ← Supabase CRUD (sources, topics, posts)
│   ├── blogScraper.ts    ← Web scraping (cheerio + pagination)
│   └── seoOptimizer.ts   ← OpenAI GPT-4o + web_search + Schema.org
│
├── app/api/blog/
│   ├── README.md          ← Bu dosya
│   ├── sources/route.ts   ← GET/POST/DELETE kaynaklar
│   ├── discover/route.ts  ← POST konu keşfi
│   ├── topics/route.ts    ← GET/PATCH konuları yönet
│   ├── generate/route.ts  ← POST AI makale üret
│   └── posts/
│       ├── route.ts       ← GET yazıları listele
│       └── [slug]/route.ts ← GET tekil yazı
│
└── app/blog/
    ├── page.tsx           ← Blog listeleme sayfası
    └── [slug]/page.tsx    ← Tekil yazı sayfası (SSR + SEO)
```

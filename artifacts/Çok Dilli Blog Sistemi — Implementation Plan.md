# Çok Dilli Blog Sistemi — Implementation Plan

Blog yazılarının içeriğini (title, content, excerpt, FAQ, keywords, schema) hedef dillere AI ile çeviren pipeline. Mevcut Türkçe blog üretim pipeline'ına dokunmadan, ayrı bir çeviri katmanı ekler.

## User Review Required

> [!IMPORTANT]
> - Blog slug'ları dile göre değişecek mi? (`/en/blog/work-permit-guide` vs `/en/blog/calisma-izni-rehberi`)
> - Dile özel slug önerim: **evet** — SEO için çok önemli, Google URL'deki keyword'ü dikkate alıyor

> [!WARNING]
> - Mevcut blog pipeline'a dokunulmuyor — sadece `post_translations` katmanı ekleniyor
> - Çeviri başarısız olsa bile orijinal Türkçe makale etkilenmez

---

## Proposed Changes

### Veritabanı (Supabase)

#### [NEW] `post_translations` tablosu (migration)

```sql
CREATE TABLE atasa_edu.post_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES atasa_edu.posts(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    meta_description TEXT,
    keywords TEXT[] DEFAULT '{}',
    faq JSONB DEFAULT '[]',
    schema_markup JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(post_id, locale)
);

CREATE INDEX idx_post_translations_locale ON atasa_edu.post_translations(locale);
CREATE INDEX idx_post_translations_slug ON atasa_edu.post_translations(slug);
CREATE INDEX idx_post_translations_post_id ON atasa_edu.post_translations(post_id);
```

---

### Blog Çeviri Script

#### [NEW] `scripts/translate-blog.ts`

Çevrilmemiş blog yazılarını tespit edip GPT-5-mini ile çevirir.

**Akış:**
```
1. posts tablosundan tüm published yazıları çek
2. post_translations'ta karşılığı olmayan (locale, post_id) çiftlerini bul
3. Her eksik çeviri için:
   a. GPT-5-mini'ye gönder (SEO keyword-aware prompt)
   b. Dönen JSON: { title, slug, excerpt, content, meta_description, keywords, faq }
   c. Schema markup'ı locale'e göre rebuild et
   d. post_translations'a kaydet
4. Rapor: X makale × Y dil = Z çeviri yapıldı
```

**AI Prompt stratejisi:**
- Sadece düz çeviri değil — hedef dilde SEO keyword optimizasyonu
- FAQ'lar hedef dilde yeniden yazılır
- Slug hedef dilde anlamlı olacak şekilde üretilir
- Internal linkler locale-prefixed olarak güncellenir (`/blog/x` → `/en/blog/x-en`)
- Schema.org `@id` ve `mainEntityOfPage` URL'leri locale'e göre güncellenir

**Günlük limit:** Makale başına ~3000 token → 4 dil × $0.03 = ~$0.12/makale

---

### Blog Service Güncellemeleri

#### [MODIFY] [blogService.ts](file:///Users/kent/Applications/atasaedu.com/src/lib/blog/blogService.ts)

Yeni fonksiyonlar:
- `getTranslatedPost(slug, locale)` — çevrilmiş post'u getir, yoksa orijinali döndür
- `getTranslatedPosts(page, limit, locale)` — çevrilmiş post listesi
- `createPostTranslation(translation)` — yeni çeviri kaydet
- `getUntranslatedPosts(locale)` — çevirisi eksik post'ları bul

---

### Frontend (Locale-Aware Blog)

#### [MODIFY] [blog/page.tsx](file:///Users/kent/Applications/atasaedu.com/src/app/[locale]/blog/page.tsx)

- `locale` parametresine göre `getTranslatedPosts()` çağır
- Türkçe ise mevcut `posts` tablosundan, diğer dillerde `post_translations`'tan çek
- Kategori isimleri zaten JSON çeviri sistemiyle çevrili

#### [MODIFY] [blog/[slug]/page.tsx](file:///Users/kent/Applications/atasaedu.com/src/app/[locale]/blog/[slug]/page.tsx)

- `getTranslatedPost(slug, locale)` kullan
- `generateMetadata` çevrilen içerikten title/description alsın
- Schema.org JSON-LD locale'e göre URL'leri güncellesin
- `hreflang` alternates eklensin (tüm dil versiyonları)
- Tarih formatı locale'e göre (`toLocaleDateString(locale)`)

---

### GitHub Actions

#### [MODIFY] `.github/workflows/translate.yml`

Mevcut nightly pipeline'a blog çeviri adımı eklenir:

```yaml
- name: Translate blog posts
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
    NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
    SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
  run: npx tsx scripts/translate-blog.ts
```

---

## SEO Koruma Stratejisi

| Özellik | Nasıl korunuyor |
|---------|-----------------|
| **hreflang** | Blog detail sayfasında tüm dil alternatifleri eklenir |
| **Canonical URL** | Her dil versiyonu kendi canonical'ına sahip |
| **Sitemap** | Blog post URL'leri tüm locallerde sitemap'e eklenir |
| **Schema.org** | Article + FAQ schema her dilde ayrı üretilir |
| **Meta tags** | title, description çevrilen içerikten alınır |
| **Slug** | Hedef dilde SEO-friendly slug (EN: `work-permit-guide`) |
| **Internal links** | Content içindeki linkler locale-prefixed olarak güncellenir |

---

## Verification Plan

### Automated Tests
```bash
# 1. Migration çalışıyor mu
npm run build

# 2. Blog çeviri scripti
npx tsx scripts/translate-blog.ts --dry-run

# 3. Frontend locale routing
# /en/blog/ → EN post listesi
# /ar/blog/slug → AR post detayı
```

### Manual Verification
- Browser'da `/en/blog` açıp EN makalelerin göründüğünü doğrula
- Google Rich Results Test ile çevrilen sayfanın schema'sını kontrol et
- `view-source:` ile hreflang alternate'lerin doğru olduğunu kontrol et

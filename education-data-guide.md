# Eğitim Verileri Entegrasyon Rehberi

Bu dokümanda üniversite, bölüm ve logo verilerine nasıl erişileceği açıklanmaktadır. Veriler **Supabase (PostgreSQL)** üzerinde tutulmaktadır
---

## Supabase Bağlantı Bilgileri

Projenin `.env` dosyasından aşağıdaki değerleri al:

```env
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
# Veya server-side için:
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

---

## Tablo Yapıları

### `universities` tablosu

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | `int` | Primary Key |
| `name` | `text` | Üniversite adı |
| `name_en` | `text` | İngilizce adı |
| `city` | `text` | Şehir |
| `country` | `text` | Ülke |
| `logo_url` | `text` | Logo (Storage path veya HTTP URL) |
| `meta_data` | `jsonb` | Ek bilgiler |

### `programs` tablosu

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | `int` | Primary Key |
| `name` | `text` | Program adı |
| `university_id` | `int` | FK → `universities.id` |
| `department` | `text` | Bölüm adı (EN) |
| `department_tr` | `text` | Bölüm adı (TR) |
| `faculty` | `text` | Fakülte (EN) |
| `faculty_tr` | `text` | Fakülte (TR) |
| `degree` | `text` | Derece: `BACHELOR`, `MASTER`, `PHD`, `ASSOCIATE` |
| `language` | `text` | Öğretim dili |
| `annual_fee` | `numeric` | Yıllık ücret |
| `cash_price` | `numeric` | Peşin fiyat |
| `currency` | `text` | Para birimi (`USD`, `TRY` vb.) |
| `years` | `int` | Süre (yıl) |
| `quota_status` | `text` | Kontenjan durumu |
| `deposit` | `numeric` | Depozito |
| `prep_fee` | `numeric` | Hazırlık ücreti |
| `campus_name` | `text` | Kampüs adı |
| `campus_address` | `text` | Kampüs adresi |
| `is_active` | `boolean` | Aktif program mı? |
| `metadata` | `jsonb` | Ek bilgiler |
**İlişki:** `programs.university_id` → `universities.id`

---

## Supabase JS Sorguları

### Kurulum

```bash
npm install @supabase/supabase-js
```

```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 1. Tüm Üniversiteler + Logolar

```typescript
const { data: universities, error } = await supabase
  .from('universities')
  .select('id, name, city, country, logo_url')
  .order('name');
```

### 2. Tüm Aktif Programlar + Üniversite Bilgisi

```typescript
const { data: programs, error } = await supabase
  .from('programs')
  .select(`
    id, name, department, department_tr, faculty, faculty_tr,
    degree, language, annual_fee, cash_price, currency, years,
    quota_status, campus_name, campus_address,
    universities (
      id, name, city, country, logo_url
    )
  `)
  .eq('is_active', true)
  .order('name');
```

### 3. Belirli Üniversitenin Programları

```typescript
const { data, error } = await supabase
  .from('programs')
  .select(`
    id, name, department, department_tr, degree, language,
    annual_fee, currency, years,
    universities (id, name, logo_url)
  `)
  .eq('university_id', 42)  // Üniversite ID
  .eq('is_active', true)
  .order('name');
```

### 4. Şehre Göre Filtreleme

```typescript
const { data, error } = await supabase
  .from('programs')
  .select(`
    *, universities!inner(id, name, city, country, logo_url)
  `)
  .eq('is_active', true)
  .ilike('universities.city', '%Istanbul%');
```

> **Not:** Üniversite alanına göre filtrelemede `!inner` kullanmak gerekir.
>
### 5. Arama (Program/Bölüm Adı)

```typescript
const searchTerm = 'bilgisayar';
const { data, error } = await supabase
  .from('programs')
  .select(`*, universities(id, name, logo_url)`)
  .eq('is_active', true)
  .or(`name.ilike.%${searchTerm}%,department.ilike.%${searchTerm}%`);
```

### 6. Sayfalama

```typescript
const page = 1;
const limit = 20;
const offset = (page - 1) * limit;
const { data, count, error } = await supabase
  .from('programs')
  .select(`*, universities(id, name, logo_url)`, { count: 'exact' })
  .eq('is_active', true)
  .order('name')
  .range(offset, offset + limit - 1);
// count → toplam kayıt sayısı
// Math.ceil(count / limit) → toplam sayfa
```

---

## SQL Sorguları (Alternatif)

```sql
-- Tüm üniversiteler
SELECT id, name, city, country, logo_url
FROM universities
ORDER BY name;
-- Tüm aktif programlar + üniversite
SELECT p.id, p.name, p.department, p.department_tr,
       p.degree, p.language, p.annual_fee, p.currency, p.years,
       u.name AS university_name, u.city, u.logo_url
FROM programs p
JOIN universities u ON u.id = p.university_id
WHERE p.is_active = true
ORDER BY u.name, p.name;
-- Benzersiz bölüm listesi
SELECT DISTINCT department, department_tr
FROM programs
WHERE is_active = true AND department IS NOT NULL
ORDER BY department;
-- Benzersiz fakülte listesi
SELECT DISTINCT faculty, faculty_tr
FROM programs
WHERE is_active = true AND faculty IS NOT NULL
ORDER BY faculty;
```

---

## Logo URL Kullanımı

`logo_url` iki formatta olabilir:

### 1. HTTP URL (Direkt kullanılabilir)

```
https://info.studyfans.com/universities/22/logo
```

→ Direkt `<img src={logo_url}>` olarak kullan.

### 2. Storage Path (Supabase Storage'da)

```
universities/41.png
```

→ Public URL oluşturman gerekir:

```typescript
function getLogoUrl(logoUrl: string): string {
  if (!logoUrl) return '/placeholder-university.png';
  
  // Zaten HTTP URL ise direkt döndür
  if (logoUrl.startsWith('http')) return logoUrl;
  
  // Storage path ise public URL oluştur
  const { data } = supabase.storage
    .from('public-assets')  // Bucket adı
    .getPublicUrl(logoUrl);
  
  return data.publicUrl;
}
```

**Kullanım:**

```tsx
<img src={getLogoUrl(university.logo_url)} alt={university.name} />
```

---

## Derece (Degree) Değerleri

| Değer | Anlamı |
|-------|--------|
| `BACHELOR` / `Lisans` | Lisans |
| `MASTER` / `Yüksek Lisans` | Yüksek Lisans |
| `PHD` / `Doktora` | Doktora |
| `ASSOCIATE` / `Önlisans` | Önlisans |

---

## Türkçe Çeviriler

Bölüm ve fakülte adlarının Türkçe versiyonları `department_tr` ve `faculty_tr` kolonlarında tutulur. Eğer boşsa, İngilizce (`department` / `faculty`) değerini fallback olarak kullan:

```typescript
const label = program.department_tr || program.department;
```

---

## Özet

| Ne istiyorsun? | Tablo | Sorgu |
|----------------|-------|-------|
| Üniversite listesi | `universities` | `select('id, name, city, logo_url')` |
| Bölüm/program listesi | `programs` | `select('*, universities(...)')` |
| Logolar | `universities.logo_url` | `getLogoUrl()` helper ile |
| Benzersiz bölümler | `programs` | `DISTINCT department, department_tr` |
| Fakülteler | `programs` | `DISTINCT faculty, faculty_tr` |

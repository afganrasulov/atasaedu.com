# "Bölümünü Bul" Özelliği — Uygulama Rehberi

Bu sayfa kullanıcıların üniversite programlarını **derece**, **dil** ve **bölüm adı** ile aramasını sağlar. Fiyat bilgisi gösterilmez
---

## Supabase Bağlantısı

```env
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## Kullanılan Tablolar

### `universities`

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | int | PK |
| `name` | text | Üniversite adı |
| `city` | text | Şehir |
| `country` | text | Ülke |
| `logo_url` | text | Logo (storage path veya HTTP URL) |

### `programs`

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | int | PK |
| `name` | text | Program adı |
| `university_id` | int | FK → universities.id |
| `department` | text | Bölüm adı (EN) |
| `department_tr` | text | Bölüm adı (TR) |
| `faculty` | text | Fakülte (EN) |
| `faculty_tr` | text | Fakülte (TR) |
| `degree` | text | Derece |
| `language` | text | Öğretim dili |
| `years` | int | Süre (yıl) |
| `is_active` | boolean | Aktif mi |

> **Not:** Fiyat kolonları (`annual_fee`, `cash_price`, `currency` vb.) tabloda mevcuttur ama bu özellikte kullanılmayacak.
---

## UI Bileşenleri

### 1. Filtreler

Üç filtre var:

| Filtre | Kaynak | Tip |
|--------|--------|-----|
| **Derece** | `programs.degree` | Dropdown — sabit değerler |
| **Dil** | `programs.language` | Dropdown — DB'den çek |
| **Bölüm Ara** | `programs.name` / `department` | Text input — serbest arama |

#### Derece Değerleri (Sabit)

| DB Değeri | Gösterilecek Label |
|-----------|--------------------|
| `BACHELOR` veya `Lisans` | Lisans |
| `MASTER` veya `Yüksek Lisans` | Yüksek Lisans |
| `PHD` veya `Doktora` | Doktora |
| `ASSOCIATE` veya `Önlisans` | Önlisans |

#### Dil Değerleri (DB'den)

```typescript
const { data } = await supabase
  .from('programs')
  .select('language')
  .eq('is_active', true)
  .not('language', 'is', null);
const languages = [...new Set(data.map(d => d.language))].sort();
// Örnek sonuç: ["Arabic", "English", "Turkish"]
```

---

### 2. Sonuç Kartında Gösterilecekler

Her program kartında şu bilgiler gösterilecek:

| Bilgi | Kaynak |
|-------|--------|
| Üniversite logosu | `universities.logo_url` |
| Üniversite adı | `universities.name` |
| Şehir | `universities.city` |
| Program / Bölüm adı | `programs.department_tr` (fallback: `programs.department`) |
| Fakülte | `programs.faculty_tr` (fallback: `programs.faculty`) |
| Derece | `programs.degree` |
| Dil | `programs.language` |
| Süre | `programs.years` yıl |

---

## Sorgular

### Filtre Seçeneklerini Yükleme (Sayfa ilk açıldığında)

```typescript
const { data: filterData } = await supabase
  .from('programs')
  .select('degree, language')
  .eq('is_active', true);
const degrees = [...new Set(filterData.map(d => d.degree).filter(Boolean))];
const languages = [...new Set(filterData.map(d => d.language).filter(Boolean))].sort();
```

### Program Arama (Filtrelerle)

```typescript
async function searchPrograms({
  degree,
  language,
  searchText,
  page = 1,
  limit = 20,
}: {
  degree?: string;
  language?: string;
  searchText?: string;
  page?: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;
  let query = supabase
    .from('programs')
    .select(`
      id, name, department, department_tr,
      faculty, faculty_tr, degree, language, years,
      universities(id, name, city, logo_url)
    `, { count: 'exact' })
    .eq('is_active', true);
  // Derece filtresi
  if (degree) {
    const degreeMap: Record<string, string[]> = {
      BACHELOR: ['BACHELOR', 'Lisans'],
      MASTER: ['MASTER', 'Yüksek Lisans', 'MASTER WITH THESIS', 'MASTER NON THESIS'],
      PHD: ['PHD', 'Doktora'],
      ASSOCIATE: ['ASSOCIATE', 'Önlisans'],
    };
    const terms = degreeMap[degree] || [degree];
    const orQuery = terms.map(t => `degree.ilike.%${t}%`).join(',');
    query = query.or(orQuery);
  }
  // Dil filtresi
  if (language) {
    query = query.eq('language', language);
  }
  // Metin araması (program adı veya bölüm adı)
  if (searchText) {
    query = query.or(
      `name.ilike.%${searchText}%,department.ilike.%${searchText}%,department_tr.ilike.%${searchText}%`
    );
  }
  // Sıralama ve sayfalama
  const { data, count, error } = await query
    .order('name')
    .range(offset, offset + limit - 1);
  return {
    programs: data,
    total: count,
    totalPages: count ? Math.ceil(count / limit) : 0,
    currentPage: page,
  };
}
```

---

## Logo URL Helper

`logo_url` iki formatta olabilir. Bu helper her iki durumu da yönetir:

```typescript
function getLogoUrl(logoUrl: string | null): string {
  if (!logoUrl) return '/placeholder-university.png';
  // HTTP URL → direkt kullan
  if (logoUrl.startsWith('http')) return logoUrl;
  // Supabase Storage path → public URL oluştur
  const { data } = supabase.storage
    .from('public-assets')
    .getPublicUrl(logoUrl);
  return data.publicUrl;
}
```

**Kullanım:**

```tsx
<img src={getLogoUrl(program.universities.logo_url)} alt={program.universities.name} />
```

---

## Türkçe Label Gösterimi

Bölüm ve fakülte için önce TR, yoksa EN göster:

```typescript
const departmentLabel = program.department_tr || program.department;
const facultyLabel = program.faculty_tr || program.faculty;
```

---

## Örnek Kullanım Akışı

```
1. Sayfa yüklenir → filtre seçenekleri (derece, dil) DB'den çekilir
2. Kullanıcı derece seçer (örn: Lisans)
3. Kullanıcı dil seçer (örn: English)
4. Kullanıcı "bilgisayar" yazar ve arar
5. searchPrograms({ degree: 'BACHELOR', language: 'English', searchText: 'bilgisayar' }) çalışır
6. Sonuçlar kart listesi olarak gösterilir:
   - [Logo] Üniversite Adı — Şehir
   - Bölüm: Bilgisayar Mühendisliği
   - Fakülte: Mühendislik Fakültesi
   - Derece: Lisans | Dil: English | Süre: 4 yıl
7. Sayfalama ile sonraki sayfalar yüklenir
```

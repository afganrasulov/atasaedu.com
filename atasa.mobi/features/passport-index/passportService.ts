
import { CacheService } from '../common/cache';

export interface VisaRequirement {
  passport: string;
  destination: string;
  code: string; // "visa free", "90", "visa required" etc.
}

export interface PassportData {
  passport: string;
  mobilityScore: number;
  rank: number;
  requirements: Record<string, string>;
}

// New API Base URL
const API_BASE_URL = 'https://passport-index-api-production.up.railway.app';

// Cache Config
const CACHE_KEY = 'atasa_passport_index_v1';

// ISO Code to Turkish Name Mapping
export const COUNTRY_NAMES_TR: Record<string, string> = {
  'AF': 'Afganistan', 'AL': 'Arnavutluk', 'DZ': 'Cezayir', 'AD': 'Andora', 'AO': 'Angola', 'AR': 'Arjantin', 'AM': 'Ermenistan', 'AU': 'Avustralya', 'AT': 'Avusturya', 'AZ': 'Azerbaycan',
  'BS': 'Bahama', 'BH': 'Bahreyn', 'BD': 'Bangladeş', 'BB': 'Barbados', 'BY': 'Belarus', 'BE': 'Belçika', 'BZ': 'Belize', 'BJ': 'Benin', 'BT': 'Bhutan', 'BO': 'Bolivya', 'BA': 'Bosna Hersek',
  'BW': 'Botsvana', 'BR': 'Brezilya', 'BN': 'Brunei', 'BG': 'Bulgaristan', 'BF': 'Burkina Faso', 'BI': 'Burundi', 'KH': 'Kamboçya', 'CM': 'Kamerun', 'CA': 'Kanada', 'CV': 'Yeşil Burun',
  'CF': 'Orta Afrika', 'TD': 'Çad', 'CL': 'Şili', 'CN': 'Çin', 'CO': 'Kolombiya', 'KM': 'Komorlar', 'CG': 'Kongo', 'CR': 'Kosta Rika', 'HR': 'Hırvatistan', 'CU': 'Küba', 'CY': 'Kıbrıs',
  'CZ': 'Çekya', 'DK': 'Danimarka', 'DJ': 'Cibuti', 'DM': 'Dominika', 'DO': 'Dominik Cum.', 'EC': 'Ekvador', 'EG': 'Mısır', 'SV': 'El Salvador', 'GQ': 'Ekvator Ginesi', 'ER': 'Eritre',
  'EE': 'Estonya', 'SZ': 'Esvatini', 'ET': 'Etiyopya', 'FJ': 'Fiji', 'FI': 'Finlandiya', 'FR': 'Fransa', 'GA': 'Gabon', 'GM': 'Gambiya', 'GE': 'Gürcistan', 'DE': 'Almanya', 'GH': 'Gana',
  'GR': 'Yunanistan', 'GD': 'Grenada', 'GT': 'Guatemala', 'GN': 'Gine', 'GW': 'Gine-Bissau', 'GY': 'Guyana', 'HT': 'Haiti', 'HN': 'Honduras', 'HU': 'Macaristan', 'IS': 'İzlanda', 'IN': 'Hindistan',
  'ID': 'Endonezya', 'IR': 'İran', 'IQ': 'Irak', 'IE': 'İrlanda', 'IL': 'İsrail', 'IT': 'İtalya', 'JM': 'Jamaika', 'JP': 'Japonya', 'JO': 'Ürdün', 'KZ': 'Kazakistan', 'KE': 'Kenya', 'KI': 'Kiribati',
  'KP': 'Kuzey Kore', 'KR': 'Güney Kore', 'KW': 'Kuveyt', 'KG': 'Kırgızistan', 'LA': 'Laos', 'LV': 'Letonya', 'LB': 'Lübnan', 'LS': 'Lesotho', 'LR': 'Liberya', 'LY': 'Libya', 'LI': 'Lihtenştayn',
  'LT': 'Litvanya', 'LU': 'Lüksemburg', 'MG': 'Madagaskar', 'MW': 'Malavi', 'MY': 'Malezya', 'MV': 'Maldivler', 'ML': 'Mali', 'MT': 'Malta', 'MH': 'Marshall Adaları', 'MR': 'Moritanya', 'MU': 'Mauritius',
  'MX': 'Meksika', 'FM': 'Mikronezya', 'MD': 'Moldova', 'MC': 'Monako', 'MN': 'Moğolistan', 'ME': 'Karadağ', 'MA': 'Fas', 'MZ': 'Mozambik', 'MM': 'Myanmar', 'NA': 'Namibya', 'NR': 'Nauru', 'NP': 'Nepal',
  'NL': 'Hollanda', 'NZ': 'Yeni Zelanda', 'NI': 'Nikaragua', 'NE': 'Nijer', 'NG': 'Nijerya', 'MK': 'Kuzey Makedonya', 'NO': 'Norveç', 'OM': 'Umman', 'PK': 'Pakistan', 'PW': 'Palau', 'PS': 'Filistin',
  'PA': 'Panama', 'PG': 'Papua Yeni Gine', 'PY': 'Paraguay', 'PE': 'Peru', 'PH': 'Filipinler', 'PL': 'Polonya', 'PT': 'Portekiz', 'QA': 'Katar', 'RO': 'Romanya', 'RU': 'Rusya', 'RW': 'Ruanda',
  'KN': 'St. Kitts ve Nevis', 'LC': 'St. Lucia', 'VC': 'St. Vincent', 'WS': 'Samoa', 'SM': 'San Marino', 'ST': 'Sao Tome', 'SA': 'Suudi Arabistan', 'SN': 'Senegal', 'RS': 'Sırbistan', 'SC': 'Seyşeller',
  'SL': 'Sierra Leone', 'SG': 'Singapur', 'SK': 'Slovakya', 'SI': 'Slovenya', 'SB': 'Solomon Adaları', 'SO': 'Somali', 'ZA': 'Güney Afrika', 'SS': 'Güney Sudan', 'ES': 'İspanya', 'LK': 'Sri Lanka',
  'SD': 'Sudan', 'SR': 'Surinam', 'SE': 'İsveç', 'CH': 'İsviçre', 'SY': 'Suriye', 'TW': 'Tayvan', 'TJ': 'Tacikistan', 'TZ': 'Tanzanya', 'TH': 'Tayland', 'TL': 'Doğu Timor', 'TG': 'Togo', 'TO': 'Tonga',
  'TT': 'Trinidad ve Tobago', 'TN': 'Tunus', 'TR': 'Türkiye', 'TM': 'Türkmenistan', 'TV': 'Tuvalu', 'UG': 'Uganda', 'UA': 'Ukrayna', 'AE': 'B.A.E', 'GB': 'İngiltere', 'US': 'ABD', 'UY': 'Uruguay',
  'UZ': 'Özbekistan', 'VU': 'Vanuatu', 'VA': 'Vatikan', 'VE': 'Venezuela', 'VN': 'Vietnam', 'YE': 'Yemen', 'ZM': 'Zambiya', 'ZW': 'Zimbabve'
};

let memoryCache: PassportData[] | null = null;

export const getPassportIndexData = async (): Promise<{ passports: PassportData[], list: {code: string, name: string}[] }> => {
  // 1. Önce Memory Cache Kontrolü (Sayfa geçişleri için)
  if (memoryCache) {
    return formatResponse(memoryCache);
  }

  // 2. LocalStorage Cache Kontrolü (1 Yıl - Uygulama kapatılıp açılsa bile)
  const cachedData = CacheService.get<PassportData[]>(CACHE_KEY);
  if (cachedData) {
    memoryCache = cachedData;
    return formatResponse(cachedData);
  }

  // 3. Cache yoksa API'ye git
  try {
    const response = await fetch(`${API_BASE_URL}/api/passports`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const flatData: { Passport: string; Destination: string; Requirement: string }[] = await response.json();
    
    const passportMap = new Map<string, PassportData>();

    // Group flat data by Passport
    flatData.forEach(item => {
      if (!passportMap.has(item.Passport)) {
        passportMap.set(item.Passport, {
          passport: item.Passport,
          mobilityScore: 0,
          rank: 0,
          requirements: {}
        });
      }
      
      const p = passportMap.get(item.Passport)!;
      p.requirements[item.Destination] = item.Requirement;
    });

    const passports = Array.from(passportMap.values());

    // Calculate Mobility Scores
    passports.forEach(p => {
      let score = 0;
      Object.values(p.requirements).forEach(req => {
        const r = String(req).toLowerCase().trim();
        if (r !== 'visa required' && r !== '-1' && r !== 'covid ban') {
          score++;
        }
      });
      p.mobilityScore = score;
    });

    // Calculate Global Rank
    passports.sort((a, b) => b.mobilityScore - a.mobilityScore);
    
    let currentRank = 1;
    passports.forEach((p, idx) => {
      if (idx > 0 && p.mobilityScore < passports[idx - 1].mobilityScore) {
        currentRank = idx + 1;
      }
      p.rank = currentRank;
    });

    memoryCache = passports;

    // 4. Yeni veriyi LocalStorage'a kaydet (1 Yıl)
    CacheService.set(CACHE_KEY, passports);

    return formatResponse(passports);

  } catch (error) {
    console.warn("Passport API failed, using empty data.", error);
    return formatResponse([]);
  }
};

const formatResponse = (passports: PassportData[]) => {
  const list = passports
    .map(p => ({ 
      code: p.passport, 
      name: COUNTRY_NAMES_TR[p.passport] || p.passport 
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

  return { passports, list };
};

export const getVisaStatusTR = (code: string) => {
  const c = String(code).toLowerCase().trim();

  if (c === 'visa required') return { label: 'VİZE GEREKLİ', color: 'red' };
  if (c === 'visa free') return { label: 'VİZESİZ', color: 'emerald' };
  if (c === 'visa on arrival') return { label: 'KAPIDA VİZE', color: 'blue' };
  if (c === 'e-visa' || c === 'eta') return { label: 'e-VİZE', color: 'amber' };
  if (c === '-1') return { label: 'KENDİ ÜLKESİ', color: 'slate' };
  if (c === 'covid ban') return { label: 'COVID YASAĞI', color: 'red' };

  if (!isNaN(Number(c))) {
    return { label: `VİZESİZ (${c} GÜN)`, color: 'emerald' };
  }

  return { label: c.toUpperCase(), color: 'slate' };
};

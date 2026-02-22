export interface VisaRegime {
  country: string;
  code: string;
  status: 'Exempt' | 'EVisa' | 'Sticker' | 'Conditional';
  duration: string;
  description: string;
}

export const VISA_REGIME_DATA: VisaRegime[] = [
  // --- AVRUPA ---
  { country: "Almanya", code: "DE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Avusturya", code: "AT", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Belçika", code: "BE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Bulgaristan", code: "BG", status: "Exempt", duration: "90 Gün", description: "Kimlik kartı ile giriş yapılabilir. 90 gün muaftır." },
  { country: "Çekya", code: "CZ", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Danimarka", code: "DK", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Estonya", code: "EE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Finlandiya", code: "FI", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Fransa", code: "FR", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Hollanda", code: "NL", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "İngiltere (Birleşik Krallık)", code: "GB", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "İrlanda", code: "IE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "İspanya", code: "ES", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "İsveç", code: "SE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "İsviçre", code: "CH", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "İtalya", code: "IT", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Macaristan", code: "HU", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Norveç", code: "NO", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Polonya", code: "PL", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Portekiz", code: "PT", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Romanya", code: "RO", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Yunanistan", code: "GR", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },

  // --- BDT VE ORTA ASYA ---
  { country: "Azerbaycan", code: "AZ", status: "Exempt", duration: "90 Gün", description: "Kimlik kartı ile giriş yapılabilir. 90 gün muaftır." },
  { country: "Beyaz Rusya (Belarus)", code: "BY", status: "Exempt", duration: "30 Gün", description: "30 güne kadar muaftır (Yıllık toplam 90 günü geçemez)." },
  { country: "Gürcistan", code: "GE", status: "Exempt", duration: "1 Yıl", description: "Kimlik kartı ile giriş yapılabilir. 1 yıla kadar muaftır." },
  { country: "Kazakistan", code: "KZ", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Kırgızistan", code: "KG", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Moldova", code: "MD", status: "Exempt", duration: "90 Gün", description: "Kimlik kartı ile giriş yapılabilir. 90 gün muaftır." },
  { country: "Özbekistan", code: "UZ", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Rusya", code: "RU", status: "Exempt", duration: "60 Gün", description: "60 günü aşmamak kaydıyla muaftır (180 günde toplam 90 gün)." },
  { country: "Tacikistan", code: "TJ", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Türkmenistan", code: "TM", status: "Sticker", duration: "Vize Gerekli", description: "Muafiyet kaldırılmıştır. e-vize alınması zorunludur." },
  { country: "Ukrayna", code: "UA", status: "Exempt", duration: "90 Gün", description: "Kimlik kartı ile giriş yapılabilir. 90 gün muaftır." },

  // --- ORTA DOĞU ---
  { country: "Bahreyn", code: "BH", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Birleşik Arap Emirlikleri", code: "AE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Filistin", code: "PS", status: "Sticker", duration: "Vize Gerekli", description: "Dış temsilciliklerden e-vize alınması gerekmektedir." },
  { country: "Irak", code: "IQ", status: "Conditional", duration: "30 Gün", description: "15 yaş altı ve 50 yaş üstü muaftır. Diğerleri e-vize almalıdır." },
  { country: "İran", code: "IR", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Katar", code: "QA", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Kuveyt", code: "KW", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Lübnan", code: "LB", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Suudi Arabistan", code: "SA", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Suriye", code: "SY", status: "Sticker", duration: "Vize Gerekli", description: "e-vize zorunludur." },
  { country: "Umman", code: "OM", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Ürdün", code: "JO", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },

  // --- AMERİKA ---
  { country: "ABD", code: "US", status: "Exempt", duration: "90 Gün", description: "2024 itibarıyla 90 gün süreyle vizeden muaftır." },
  { country: "Arjantin", code: "AR", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Brezilya", code: "BR", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Kanada", code: "CA", status: "Exempt", duration: "90 Gün", description: "2024 itibarıyla 90 gün süreyle vizeden muaftır." },
  { country: "Kolombiya", code: "CO", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Meksika", code: "MX", status: "EVisa", duration: "30 Gün", description: "Ücretsiz e-vize (Sadece havayoluyla girişlerde geçerlidir)." },
  { country: "Peru", code: "PE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Şili", code: "CL", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Venezuela", code: "VE", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },

  // --- ASYA VE PASİFİK ---
  { country: "Afganistan", code: "AF", status: "Sticker", duration: "Vize Gerekli", description: "e-vize başvurusu yapılmalıdır." },
  { country: "Çin", code: "CN", status: "EVisa", duration: "30 Gün", description: "Belirli şartlarda e-vize gereklidir." },
  { country: "Endonezya", code: "ID", status: "Exempt", duration: "30 Gün", description: "30 gün süreyle vizeden muaftır." },
  { country: "Filipinler", code: "PH", status: "Exempt", duration: "30 Gün", description: "30 gün süreyle vizeden muaftır." },
  { country: "Güney Kore", code: "KR", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Hindistan", code: "IN", status: "Sticker", duration: "Vize Gerekli", description: "e-vize gereklidir." },
  { country: "Japonya", code: "JP", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Malezya", code: "MY", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Pakistan", code: "PK", status: "EVisa", duration: "30 Gün", description: "Sadece e-vize hamili olarak giriş yapılabilir." },
  { country: "Singapur", code: "SG", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Tayland", code: "TH", status: "Exempt", duration: "30 Gün", description: "30 gün süreyle vizeden muaftır." },
  { country: "Vietnam", code: "VN", status: "Sticker", duration: "Vize Gerekli", description: "e-vize zorunludur." },

  // --- AFRİKA ---
  { country: "Cezayir", code: "DZ", status: "Conditional", duration: "30 Gün", description: "18 yaş altı ve 35 yaş üstü e-vize alabilir. Diğerleri e-vize." },
  { country: "Fas", code: "MA", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Güney Afrika", code: "ZA", status: "Exempt", duration: "30 Gün", description: "30 gün süreyle vizeden muaftır." },
  { country: "Libya", code: "LY", status: "Conditional", duration: "90 Gün", description: "16 yaş altı ve 55 yaş üstü muaftır. Diğerleri e-vize almalıdır." },
  { country: "Mısır", code: "EG", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır (Yeni düzenleme)." },
  { country: "Nijerya", code: "NG", status: "Sticker", duration: "Vize Gerekli", description: "e-vize zorunludur." },
  { country: "Senegal", code: "SN", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." },
  { country: "Tunus", code: "TN", status: "Exempt", duration: "90 Gün", description: "90 gün süreyle vizeden muaftır." }
];
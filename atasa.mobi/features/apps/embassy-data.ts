export interface Embassy {
  id: string;
  name: string;
  country: string;
  countryCode: string; // ISO 2-letter code for flags
  flag: string;
  city: 'Ankara' | 'İstanbul';
  type: 'Büyükelçilik' | 'Konsolosluk';
  address: string;
  phone: string;
  email?: string;
  website?: string;
  mapsUrl: string;
  whatsapp?: string;
  appointmentHours?: string;
  callCenterHours?: string;
  appointmentUrl?: string;
  warning?: string;
}

export const EMBASSY_DATA: Embassy[] = [
  // ANKARA
  {
    id: 'kz-ank',
    name: 'Kazakistan Büyükelçiliği',
    country: 'Kazakistan',
    countryCode: 'kz',
    flag: '🇰🇿',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Oran, Kılıç Ali Sk. No:6, 06450 Çankaya/Ankara',
    phone: '(0312) 491 91 00',
    email: 'ankara@mfa.kz',
    website: 'https://www.gov.kz',
    mapsUrl: 'https://www.google.com/maps/search/Kazakhstan+Embassy+Ankara'
  },
  {
    id: 'kg-ank',
    name: 'Kırgızistan Büyükelçiliği',
    country: 'Kırgızistan',
    countryCode: 'kg',
    flag: '🇰🇬',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Turan Güneş Boulevard, Galip Erdem Caddesi No:25',
    phone: '(0312) 491 35 06',
    website: 'https://mfa.gov.kg',
    mapsUrl: 'https://www.google.com/maps/search/Kyrgyz+Embassy+Ankara'
  },
  {
    id: 'uz-ank',
    name: 'Özbekistan Büyükelçiliği',
    country: 'Özbekistan',
    countryCode: 'uz',
    flag: '🇺🇿',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Sancak, 549. Sk. No:3, 06550 Çankaya/Ankara',
    phone: '(0312) 441 38 71',
    website: 'https://www.uzembassy.org.tr',
    mapsUrl: 'https://www.google.com/maps/search/Uzbekistan+Embassy+Ankara'
  },
  {
    id: 'tm-ank',
    name: 'Türkmenistan Büyükelçiliği',
    country: 'Türkmenistan',
    countryCode: 'tm',
    flag: '🇹🇲',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Kazım Özalp, Koza Sk. No:28, 06700 Çankaya/Ankara',
    phone: '(0312) 441 71 22',
    email: 'tmankara@yahoo.com',
    website: 'https://ankara.tmembassy.gov.m',
    mapsUrl: 'https://www.google.com/maps/search/Turkmenistan+Embassy+Ankara'
  },
  {
    id: 'az-ank',
    name: 'Azerbaycan Büyükelçiliği',
    country: 'Azerbaycan',
    countryCode: 'az',
    flag: '🇦🇿',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Oran, Bakü Sk. No:5 D:3, 06450 Çankaya/Ankara',
    phone: '(0312) 491 16 81',
    website: 'https://ankara.mfa.gov.az',
    mapsUrl: 'https://www.google.com/maps/search/Azerbaijan+Embassy+Ankara'
  },
  {
    id: 'tj-ank',
    name: 'Tacikistan Büyükelçiliği',
    country: 'Tacikistan',
    countryCode: 'tj',
    flag: '🇹🇯',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Ferit Recai Ertuğrul Cd. No:20',
    phone: '(0312) 491 16 07',
    website: 'https://mfa.tj',
    mapsUrl: 'https://www.google.com/maps/search/Tajikistan+Embassy+Ankara'
  },
  {
    id: 'ir-ank',
    name: 'İran Büyükelçiliği',
    country: 'İran',
    countryCode: 'ir',
    flag: '🇮🇷',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Gaziosmanpaşa, Tahran Cd. No:10, 06700 Çankaya/Ankara',
    phone: '(0312) 457 41 00',
    website: 'https://ankara.mfa.ir',
    mapsUrl: 'https://www.google.com/maps/search/Iran+Embassy+Ankara'
  },
  {
    id: 'ru-ank',
    name: 'Rusya Büyükelçiliği',
    country: 'Rusya',
    countryCode: 'ru',
    flag: '🇷🇺',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Andrey Karlov Sok. No:5',
    phone: '(0312) 439 21 83',
    website: 'https://ankara.mid.ru',
    mapsUrl: 'https://www.google.com/maps/search/Russian+Embassy+Ankara'
  },
  {
    id: 'ua-ank',
    name: 'Ukrayna Büyükelçiliği',
    country: 'Ukrayna',
    countryCode: 'ua',
    flag: '🇺🇦',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Kılıç Ali Cd. No: 10',
    phone: '(0312) 463 70 10',
    website: 'https://ankara.mfa.gov.ua',
    mapsUrl: 'https://www.google.com/maps/search/Ukraine+Embassy+Ankara'
  },
  {
    id: 'af-ank',
    name: 'Afganistan Büyükelçiliği',
    country: 'Afganistan',
    countryCode: 'af',
    flag: '🇦🇫',
    city: 'Ankara',
    type: 'Büyükelçilik',
    address: 'Azziye, Cinnah Cd. No:88, 65560 Çankaya/Ankara',
    phone: '(0312) 442 25 23',
    website: 'https://www.afghanembassy.org.tr',
    mapsUrl: 'https://www.google.com/maps/search/Afghanistan+Embassy+Ankara'
  },

  // İSTANBUL
  {
    id: 'kz-ist',
    name: 'Kazakistan Konsolosluğu',
    country: 'Kazakistan',
    countryCode: 'kz',
    flag: '🇰🇿',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Şenlikköy Mahallesi, YeşilYurt Caddesi, No: 7/9, Bakırköy, İstanbul',
    phone: '+90 212 662 53 47',
    whatsapp: '+90 501 262 14 65',
    email: 'istanbul@mfa.kz',
    website: 'https://www.gov.kz',
    appointmentHours: 'Pzt: 09:00 – 17:00 | Sal, Per, Cum: 09:30 – 12:30 / 16:00 – 17:00 | Çar: Kapalı',
    appointmentUrl: 'https://www.gov.kz/memleket/entities/mfa-istanbul/online-booking',
    mapsUrl: 'https://www.google.com/maps/search/Kazakhstan+Consulate+Istanbul'
  },
  {
    id: 'kg-ist',
    name: 'Kırgızistan Konsolosluğu',
    country: 'Kırgızistan',
    countryCode: 'kg',
    flag: '🇰🇬',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Altunay Apt, Gümüşsuyu, Lamartin Cd. No:7, 34437 Beyoğlu/İstanbul',
    phone: '+90 212 235 92 93',
    email: 'kgconsulate.istanbul@mfa.gov.kg',
    website: 'https://mfa.gov.kg',
    appointmentHours: 'Pzt-Cum: 09:00 – 12:30 / 14:00 – 17:00',
    mapsUrl: 'https://www.google.com/maps/search/Kyrgyz+Republic+Consulate+Istanbul'
  },
  {
    id: 'uz-ist',
    name: 'Özbekistan Konsolosluğu',
    country: 'Özbekistan',
    countryCode: 'uz',
    flag: '🇺🇿',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Levent Mahallesi Lale Sokak No:8, 34430 Beşiktaş/İstanbul',
    phone: '(0212) 909 08 04',
    website: 'https://www.uzconsulate.org.tr',
    appointmentUrl: 'http://e-navbat.mfa.uz/texnolog/usluga?id=48',
    appointmentHours: 'Pazartesi, Salı, Perşembe, Cuma: 10:00-13:00 / 14:30-16:00',
    callCenterHours: 'Bilgi hattı için: 09:00-10:00 ve 16:00-18:00 arası aranabilir.',
    mapsUrl: 'https://www.google.com/maps/search/Uzbekistan+Consulate+Istanbul'
  },
  {
    id: 'tm-ist',
    name: 'Türkmenistan Konsolosluğu',
    country: 'Türkmenistan',
    countryCode: 'tm',
    flag: '🇹🇲',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Mimar Sinan, Reyhan Sok. No:14, 34075 Eyüpsultan/İstanbul',
    phone: '(0212) 662 02 22',
    website: 'https://istanbul.tmconsulate.gov.tm',
    mapsUrl: 'https://www.google.com/maps/search/Turkmenistan+Consulate+Istanbul',
    appointmentHours: 'Pazartesi, Salı, Perşembe: 09:00 - 12:30',
    callCenterHours: 'Pazartesi, Salı, Perşembe, Cuma: 14:00 - 17:00 | Çarşamba: 09:00 - 17:00',
    appointmentUrl: 'http://istanbul.tmembassy.gov.tm/tr/appointment',
    warning: "Türkmenistan Konsolosluğu'na gitmeden önce mutlaka randevu almanız gerekmektedir."
  },
  {
    id: 'az-ist',
    name: 'Azerbaycan Konsolosluğu',
    country: 'Azerbaycan',
    countryCode: 'az',
    flag: '🇦🇿',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Akat, Zeytinoğlu Cd. No:65, 34335 Beşiktaş/İstanbul',
    phone: '(0212) 325 80 45',
    appointmentHours: 'Evrak Kabul: 09:00 - 12:30 | Teslimat: 14:30 - 16:30 (Pazartesi - Cuma)',
    website: 'https://istanbul.mfa.gov.az',
    warning: 'Acil Hat: +90 536 613 86 48 (Hafta sonları ve mesai dışı)',
    mapsUrl: 'https://www.google.com/maps/search/Azerbaijan+Consulate+Istanbul'
  },
  {
    id: 'tj-ist',
    name: 'Tacikistan Konsolosluğu',
    country: 'Tacikistan',
    countryCode: 'tj',
    flag: '🇹🇯',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Kartalktepe, Yıldıztepe Sk. No:23, 34145 Bakırköy/İstanbul',
    phone: '(0212) 426 50 54',
    website: 'https://mfa.tj',
    appointmentHours: 'Pzt-Cum: 10:00 – 13:00 / 14:00 – 17:00',
    mapsUrl: 'https://www.google.com/maps/search/Tajikistan+Consulate+Istanbul'
  },
  {
    id: 'ir-ist',
    name: 'İran Konsolosluğu',
    country: 'İran',
    countryCode: 'ir',
    flag: '🇮🇷',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Hobyar, Ankara Cd. No:1, 34112 Fatih/İstanbul',
    phone: '(0212) 513 82 30',
    website: 'https://istanbul.mfa.ir',
    appointmentHours: 'Pzt, Çar, Per, Cum: 07:45 – 13:30 | Sal: 08:30 – 13:30',
    mapsUrl: 'https://www.google.com/maps/search/Iran+Consulate+Istanbul'
  },
  {
    id: 'ru-ist',
    name: 'Rusya Konsolosluğu',
    country: 'Rusya',
    countryCode: 'ru',
    flag: '🇷🇺',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Tomtom, İstiklal Cd. No:219 D:225A, 34433 Beyoğlu/İstanbul',
    phone: '(0212) 292 51 02',
    website: 'https://istanbul.mid.ru',
    appointmentHours: 'Pzt-Cum: 09:00 – 17:00',
    mapsUrl: 'https://www.google.com/maps/search/Russian+Consulate+Istanbul'
  },
  {
    id: 'ua-ist',
    name: 'Ukrayna Konsolosluğu',
    country: 'Ukrayna',
    countryCode: 'ua',
    flag: '🇺🇦',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: 'Senlikköy, Adakale Sk. No:13, 34000 Florya/İstanbul',
    phone: '(0212) 662 25 41',
    website: 'https://istanbul.mfa.gov.ua',
    appointmentHours: 'Pzt-Cum: 09:30 – 13:00 / 14:00 – 18:00',
    mapsUrl: 'https://www.google.com/maps/search/Ukraine+Consulate+Istanbul'
  },
  {
    id: 'af-ist',
    name: 'Afganistan Konsolosluğu',
    country: 'Afganistan',
    countryCode: 'af',
    flag: '🇦🇫',
    city: 'İstanbul',
    type: 'Konsolosluk',
    address: '1. Levent mah., Levent Cd. No:28, 34330 Beşiktaş/İstanbul',
    phone: '(0212) 343 87 22',
    email: 'Appointment@afghanconsulate.org.tr',
    website: 'https://www.afghanconsulate.org.tr',
    appointmentHours: 'Genel: 09:00 - 16:00 | Konsolosluk Bölümü: 09:00 - 15:00 (Pazartesi - Cuma)',
    mapsUrl: 'https://www.google.com/maps/search/Afghanistan+Consulate+Istanbul'
  }
];
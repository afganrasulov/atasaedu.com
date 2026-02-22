
export interface Profession {
  name: string;
  law: string;
  article: string;
  isRestricted: boolean;
  alternative?: string;
  category?: string;
}

export const RESTRICTED_PROFESSIONS: Profession[] = [
  { 
    name: "Özel Güvenlik Şirketi Kurucusu", 
    law: "Özel Güvenlik Hizmetlerine Dair Kanun", 
    article: "5. madde", 
    isRestricted: true,
    category: "Güvenlik"
  },
  { 
    name: "Özel Güvenlik Yöneticisi", 
    law: "Özel Güvenlik Hizmetlerine Dair Kanun", 
    article: "5. madde", 
    isRestricted: true,
    category: "Güvenlik"
  },
  { 
    name: "Özel Güvenlik Görevlisi", 
    law: "Özel Güvenlik Hizmetlerine Dair Kanun", 
    article: "10. madde", 
    isRestricted: true,
    category: "Güvenlik"
  },
  { 
    name: "Çarşı ve Mahalle Bekçiliği", 
    law: "Çarşı ve Mahalle Bekçileri Hakkında Kanun", 
    article: "3. madde", 
    isRestricted: true,
    category: "Güvenlik"
  },
  { 
    name: "Mali Müşavirlik", 
    law: "S.M.M.M. ve Yeminli Mali Müşavirlik Kanunu", 
    article: "4. madde", 
    isRestricted: true,
    category: "Finans"
  },
  { 
    name: "Kooperatif Yönetim Kurulu Üyeliği", 
    law: "Kooperatifler Kanunu", 
    article: "56. madde", 
    isRestricted: true,
    category: "Finans"
  },
  { 
    name: "Gümrük Müşavir Yardımcılığı", 
    law: "Gümrük Kanunu", 
    article: "227. madde", 
    isRestricted: true,
    category: "Dış Ticaret"
  },
  { 
    name: "Özel Okul Kuruculuğu (Yabancı Okullar)", 
    law: "Özel Öğretim Kanunu", 
    article: "8. madde", 
    isRestricted: true,
    category: "Eğitim"
  },
  { 
    name: "Özel Hastanelerde Mesul Müdürlük", 
    law: "Hususi Hastaneler Kanunu", 
    article: "9. madde", 
    isRestricted: true,
    category: "Sağlık"
  },
  { 
    name: "Diş Hekimliği", 
    law: "Tababet ve Şuabatı Sanatlarının Tarzı İcrasına Dair Kanun", 
    article: "30. madde", 
    isRestricted: true,
    category: "Sağlık"
  },
  { 
    name: "Hastabakıcılık", 
    law: "Tababet ve Şuabatı Sanatlarının Tarzı İcrasına Dair Kanun", 
    article: "63. madde", 
    isRestricted: true,
    category: "Sağlık"
  },
  { 
    name: "Eczacılık", 
    law: "Eczacılar ve Eczaneler Hakkında Kanun", 
    article: "2. madde", 
    isRestricted: true,
    category: "Sağlık"
  },
  { 
    name: "Veterinerlik", 
    law: "Veteriner Hekimliği Mesleğinin İcrasına Dair Kanun", 
    article: "2. madde", 
    isRestricted: true,
    category: "Sağlık"
  },
  { 
    name: "Tıp Uzmanlık Dışı Yabancı Asistanlık", 
    law: "Tıpta Uzmanlık Tüzüğü", 
    article: "20. madde", 
    isRestricted: true,
    category: "Sağlık"
  },
  { 
    name: "Noterlik", 
    law: "Noterlik Kanunu", 
    article: "7. madde", 
    isRestricted: true,
    category: "Hukuk"
  },
  { 
    name: "Hakim ve Savcılık", 
    law: "Hakimler ve Savcılar Kanunu", 
    article: "7. madde", 
    isRestricted: true,
    category: "Hukuk"
  },
  { 
    name: "Avukatlık", 
    law: "Avukatlar Kanunu", 
    article: "3. madde", 
    isRestricted: true,
    category: "Hukuk",
    alternative: "Hukuk Danışmanı (Şartlı Açık)"
  },
  { 
    name: "Arabuluculuk", 
    law: "Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu", 
    article: "20. madde", 
    isRestricted: true,
    category: "Hukuk"
  },
  { 
    name: "Konkordato Komiseri", 
    law: "Konkordato Komiserliği Yönetmeliği", 
    article: "4. madde", 
    isRestricted: true,
    category: "Hukuk"
  },
  { 
    name: "Stajyer Havacılık Bilgi Yönetim Memuru", 
    law: "Havacılık Bilgi Yönetimi Personeli Yönetmeliği", 
    article: "16. madde", 
    isRestricted: true,
    category: "Teknik"
  },
  { 
    name: "Fahri Trafik Müfettişi", 
    law: "Karayolları Trafik Kanunu", 
    article: "Ek 6. madde", 
    isRestricted: true,
    category: "Kamu"
  },
  { 
    name: "Taşıma İşleri Organizatörlüğü", 
    law: "Taşıma İşleri Organizatörlüğü Yönetmeliği", 
    article: "7. madde", 
    isRestricted: true,
    category: "Lojistik"
  },
  { 
    name: "Turizm Acente Sorumlusu", 
    law: "Seyahat Acenteleri ve Seyahat Acenteleri Birliği Kanunu", 
    article: "3. madde", 
    isRestricted: true,
    category: "Turizm"
  },
  { 
    name: "Turist Rehberliği", 
    law: "Turist Rehberliği Meslek Kanunu", 
    article: "3. madde", 
    isRestricted: true,
    category: "Turizm"
  },
  { 
    name: "Kaptanlık (Türk Karasuları)", 
    law: "Kabotaj Kanunu", 
    article: "3. madde", 
    isRestricted: true,
    category: "Denizcilik"
  },
  { 
    name: "Balıkçılık, Midye ve Sünger Avcılığı", 
    law: "Kabotaj Kanunu", 
    article: "3. madde", 
    isRestricted: true,
    category: "Denizcilik"
  },
  { 
    name: "Dalgıçlık ve Kılavuzluk", 
    law: "Kabotaj Kanunu", 
    article: "3. madde", 
    isRestricted: true,
    category: "Denizcilik"
  },
  { 
    name: "Tayfalık ve Katiplik (Gemi)", 
    law: "Kabotaj Kanunu", 
    article: "3. madde", 
    isRestricted: true,
    category: "Denizcilik"
  },
  { 
    name: "Spor Müşavirliği", 
    law: "Spor Müşavirleri Atanma ve Çalıştırma Yönetmeliği", 
    article: "5. madde", 
    isRestricted: true,
    category: "Spor"
  },
  { 
    name: "Tarım Alanında İş Aracılığı", 
    law: "Tarımda İş Aracılığı Yönetmeliği", 
    article: "6. madde", 
    isRestricted: true,
    category: "Tarım"
  },
  { 
    name: "Gemi Acente Yetkilisi", 
    law: "Gemi Acenteleri Yönetmeliği", 
    article: "7. madde", 
    isRestricted: true,
    category: "Denizcilik"
  },
  { 
    name: "Maden Daimî Nezaretçisi", 
    law: "Maden Yönetmeliği", 
    article: "125. madde", 
    isRestricted: true,
    category: "Teknik"
  },
  { 
    name: "Maden Teknik Elemanı", 
    law: "Maden Yönetmeliği", 
    article: "130. madde", 
    isRestricted: true,
    category: "Teknik"
  },
  { 
    name: "Sağlık Meslek Hizmet Birimi Sorumlusu", 
    law: "Sağlık Meslek Mensuplarının Serbest Meslek Yönetmeliği", 
    article: "5. madde", 
    isRestricted: true,
    category: "Sağlık"
  }
];

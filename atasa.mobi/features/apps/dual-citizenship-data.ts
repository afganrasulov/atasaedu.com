
export type CitizenshipStatus = 'Serbest' | 'Kısıtlı' | 'Yasak' | 'Bilinmiyor';

export interface CountryCitizenshipRule {
  country: string;
  status: CitizenshipStatus;
  description: string;
  flag: string;
}

export const CITIZENSHIP_RULES: CountryCitizenshipRule[] = [
  // --- ALLOWED (SERBEST) ---
  {
    country: "Türkiye",
    status: "Serbest",
    description: "Türkiye çoklu vatandaşlığa izin verir. Başka bir vatandaşlık alırken Türk makamlarına bildirimde bulunulması gerekir.",
    flag: "🇹🇷"
  },
  {
    country: "Amerika Birleşik Devletleri",
    status: "Serbest",
    description: "ABD yasaları çifte vatandaşlığı yasaklamaz. Vatandaşlık yemini sırasında diğer sadakatlerden vazgeçilmesi istense de pratikte çifte vatandaşlık korunur.",
    flag: "🇺🇸"
  },
  {
    country: "Birleşik Krallık (İngiltere)",
    status: "Serbest",
    description: "Birleşik Krallık çifte vatandaşlığa izin verir. Başka bir ülkenin vatandaşı olmak için İngiliz vatandaşlığından vazgeçmeniz gerekmez.",
    flag: "🇬🇧"
  },
  {
    country: "Kanada",
    status: "Serbest",
    description: "Kanada vatandaşları başka bir ülkenin vatandaşlığını alabilir ve Kanada vatandaşlığını kaybetmezler.",
    flag: "🇨🇦"
  },
  {
    country: "Almanya",
    status: "Serbest",
    description: "27 Haziran 2024 tarihli yeni yasa ile Almanya artık çifte vatandaşlığı kısıtlamasız olarak kabul etmektedir.",
    flag: "🇩🇪"
  },
  {
    country: "Fransa",
    status: "Serbest",
    description: "Fransa çifte vatandaşlığa izin verir. Yabancı bir vatandaşlık edinmek Fransız vatandaşlığının kaybına neden olmaz.",
    flag: "🇫🇷"
  },
  {
    country: "Rusya",
    status: "Serbest",
    description: "Rusya çifte vatandaşlığa izin verir, ancak Rus vatandaşlarının diğer vatandaşlıklarını yetkililere bildirmeleri zorunludur.",
    flag: "🇷🇺"
  },
  {
    country: "İtalya",
    status: "Serbest",
    description: "İtalya çifte vatandaşlığı kabul eder. Vatandaşlar başka bir ülkenin vatandaşlığını alırken İtalyan vatandaşlığını koruyabilirler.",
    flag: "🇮🇹"
  },
  {
    country: "Portekiz",
    status: "Serbest",
    description: "Portekiz çifte vatandaşlığa izin verir.",
    flag: "🇵🇹"
  },
  {
    country: "İsrail",
    status: "Serbest",
    description: "İsrail çifte vatandaşlığa izin verir (Milletvekilleri ve diplomatlar hariç).",
    flag: "🇮🇱"
  },
  {
    country: "Brezilya",
    status: "Serbest",
    description: "Brezilya, doğumla kazanılan veya haklı nedenlerle sonradan kazanılan çifte vatandaşlığa izin verir.",
    flag: "🇧🇷"
  },
  {
    country: "Arjantin",
    status: "Serbest",
    description: "Arjantin vatandaşlığı feragat edilemez bir haktır, bu nedenle başka bir vatandaşlık alınsa bile Arjantin vatandaşlığı kalıcıdır.",
    flag: "🇦🇷"
  },

  // --- RESTRICTED (KISITLI) ---
  {
    country: "Hollanda",
    status: "Kısıtlı",
    description: "Prensipte tek vatandaşlığı savunur. Ancak evlilik yoluyla kazanım veya doğumla gelen haklar gibi istisnalarda çifte vatandaşlığa izin verir.",
    flag: "🇳🇱"
  },
  {
    country: "Avusturya",
    status: "Kısıtlı",
    description: "Genel kural olarak yasaktır. Ancak doğumla kazanılmışsa veya 'Beibehaltungsgenehmigung' (özel izin) alınırsa korunabilir.",
    flag: "🇦🇹"
  },
  {
    country: "İspanya",
    status: "Kısıtlı",
    description: "Genellikle önceki vatandaşlıktan feragat ister. Ancak İbero-Amerika ülkeleri, Filipinler ve Ekvator Ginesi vatandaşları için istisnalar vardır.",
    flag: "🇪🇸"
  },
  {
    country: "Güney Kore",
    status: "Kısıtlı",
    description: "2011'den itibaren sınırlı izin verilmektedir. Yabancı uyruğunu Kore içinde kullanmayacağına dair taahhüt verilmesi gerekir.",
    flag: "🇰🇷"
  },
  {
    country: "Letonya",
    status: "Kısıtlı",
    description: "Sadece AB, NATO ve EFTA ülkeleri ile çifte vatandaşlığa izin verir.",
    flag: "🇱🇻"
  },
  {
    country: "Litvanya",
    status: "Kısıtlı",
    description: "Çifte vatandaşlık genel olarak yasaktır, sadece çok istisnai durumlarda (örneğin sürgün edilenlerin torunları) izin verilir.",
    flag: "🇱🇹"
  },
  {
    country: "Mısır",
    status: "Kısıtlı",
    description: "Başka bir vatandaşlık almak isteyen Mısır vatandaşları hükümetten ön izin almalıdır.",
    flag: "🇪🇬"
  },
  {
    country: "Güney Afrika",
    status: "Kısıtlı",
    description: "Başka bir vatandaşlık almadan önce İçişleri Bakanlığı'ndan izin alınmazsa Güney Afrika vatandaşlığı otomatik olarak kaybedilebilir.",
    flag: "🇿🇦"
  },

  // --- FORBIDDEN (YASAK) ---
  {
    country: "Çin",
    status: "Yasak",
    description: "Çin Halk Cumhuriyeti çifte vatandaşlığı tanımaz. Başka bir ülke vatandaşlığına geçen kişinin Çin vatandaşlığı otomatik olarak düşer.",
    flag: "🇨🇳"
  },
  {
    country: "Hindistan",
    status: "Yasak",
    description: "Hindistan Anayasası çifte vatandaşlığa izin vermez. Ancak 'OCI' (Overseas Citizenship of India) kartı ile sınırlı haklar tanır.",
    flag: "🇮🇳"
  },
  {
    country: "Japonya",
    status: "Yasak",
    description: "Japonya çifte vatandaşlığa izin vermez. Çifte vatandaşlığa sahip kişilerin 22 yaşına kadar birini seçmesi gerekir.",
    flag: "🇯🇵"
  },
  {
    country: "Azerbaycan",
    status: "Yasak",
    description: "Azerbaycan yasalarına göre çifte vatandaşlık tanınmaz. Başka bir vatandaşlık kazanılması durumunda Azerbaycan vatandaşlığı kaybedilir.",
    flag: "🇦🇿"
  },
  {
    country: "Kazakistan",
    status: "Yasak",
    description: "Kazakistan Cumhuriyeti çifte vatandaşlığı kesinlikle tanımaz. Başka bir vatandaşlık alındığında Kazak vatandaşlığı otomatik düşer.",
    flag: "🇰🇿"
  },
  {
    country: "Türkmenistan",
    status: "Yasak",
    description: "Türkmenistan yasaları çifte vatandaşlığı tanımaz ve izin vermez.",
    flag: "🇹🇲"
  },
  {
    country: "Özbekistan",
    status: "Yasak",
    description: "Özbekistan çifte vatandaşlığı tanımaz. Yetkili makamlara bildirilmezse cezai yaptırımları olabilir.",
    flag: "🇺🇿"
  },
  {
    country: "İran",
    status: "Yasak",
    description: "İran vatandaşlıktan çıkmaya izin vermez, ancak ikinci vatandaşlığı da tanımaz. İranlılar her zaman İran vatandaşı muamelesi görür.",
    flag: "🇮🇷"
  },
  {
    country: "Ukrayna",
    status: "Yasak",
    description: "Ukrayna yasalarına göre tek vatandaşlık esastır. İkinci vatandaşlık alınması durumunda Ukrayna vatandaşlığı kaybedilebilir.",
    flag: "🇺🇦"
  },
  {
    country: "Singapur",
    status: "Yasak",
    description: "Singapur çifte vatandaşlığa izin vermez. 21 yaşına gelen çifte vatandaşlar birini seçmek zorundadır.",
    flag: "🇸🇬"
  },
  {
    country: "Endonezya",
    status: "Yasak",
    description: "Endonezya çifte vatandaşlığı tanımaz. Yetişkinler tek bir vatandaşlık seçmek zorundadır.",
    flag: "🇮🇩"
  },
  {
    country: "Suudi Arabistan",
    status: "Yasak",
    description: "Suudi Arabistan vatandaşlarının başka bir vatandaşlık alması yasaktır ve Başbakan iznine tabidir.",
    flag: "🇸🇦"
  },
  {
    country: "Malezya",
    status: "Yasak",
    description: "Malezya hükümeti çifte vatandaşlığa izin vermez. Tespit edilirse vatandaşlık iptal edilir.",
    flag: "🇲🇾"
  }
];

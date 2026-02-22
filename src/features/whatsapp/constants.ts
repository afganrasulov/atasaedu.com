export const WHATSAPP_COMPANY_INFO = {
    name: "Atasa Education",
    phone: "+90 850 308 69 98",
    email: "support@atasa.tr",
};

export const COUNTRY_CODES = [
    { code: "+90", country: "TR" },
    { code: "+994", country: "AZ" },
    { code: "+993", country: "TM" },
    { code: "+998", country: "UZ" },
    { code: "+7", country: "RU/KZ" },
    { code: "+98", country: "IR" },
    { code: "+49", country: "DE" },
    { code: "+1", country: "US/CA" },
    { code: "+44", country: "UK" },
    { code: "+33", country: "FR" },
    { code: "+31", country: "NL" },
    { code: "+964", country: "IQ" },
    { code: "+963", country: "SY" },
    { code: "+971", country: "AE" },
    { code: "+966", country: "SA" },
];

export const TOPICS = [
    "Üniversite Seçimi",
    "Burs İmkanları",
    "Başvuru Süreci",
    "Dil Okulları",
    "Vize & İkamet",
    "Diğer",
];

export const PREDEFINED_QUESTIONS: Record<string, string[]> = {
    "Üniversite Seçimi": [
        "Hangi ülkelerdeki üniversitelere başvuru yapabiliyorum?",
        "Bölüm seçiminde nasıl yardımcı oluyorsunuz?",
        "Üniversite sıralamalarına göre önerileriniz neler?",
        "Hangi üniversiteler Türk öğrencilere burs veriyor?",
        "Tıp/Mühendislik okumak için en iyi ülke hangisi?",
    ],
    "Burs İmkanları": [
        "Tam burslu programlar hakkında bilgi alabilir miyim?",
        "Burs başvurusu için gerekli belgeler nelerdir?",
        "Kısmi burs imkanları var mı?",
        "Burs başvuru tarihleri ne zaman?",
    ],
    "Başvuru Süreci": [
        "Üniversite başvurusu için hangi belgeler gerekli?",
        "Başvuru süreci ne kadar sürüyor?",
        "Kabul mektubu aldıktan sonra ne yapmalıyım?",
        "Denklik işlemleri nasıl yapılıyor?",
        "Online mı yoksa elden mi başvuru yapılıyor?",
    ],
    "Dil Okulları": [
        "İngilizce hazırlık programları hakkında bilgi alabilir miyim?",
        "Dil okulu süreleri ve ücretleri nedir?",
        "IELTS/TOEFL hazırlık desteğiniz var mı?",
        "Dil okulu ile üniversite programını birlikte planlayabilir miyiz?",
    ],
    "Vize & İkamet": [
        "Öğrenci vizesi başvurusu nasıl yapılır?",
        "Vize için hangi belgeler gerekli?",
        "İkamet izni süreçleri hakkında bilgi alabilir miyim?",
        "Vize reddedilirse ne yapabilirim?",
    ],
    Diğer: [
        "Danışmanlık ücretleriniz hakkında bilgi almak istiyorum.",
        "Ücretsiz ön görüşme yapabilir miyiz?",
        "Randevu almak istiyorum.",
    ],
};

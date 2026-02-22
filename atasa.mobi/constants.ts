
import { Service, BlogPost } from './types';

export const COMPANY_INFO = {
  name: "Atasa Danışmanlık",
  phone: "+90 850 308 69 98",
  email: "support@atasa.tr",
  address: "Mecidiyeköy mah. Raşit Rıza sk. Ahmet Esin İş Merkezi NO:4 K:2 D:7 Şişli/İstanbul",
  founder: "Ömer Habib",
  hours: {
    weekday: "09:00 - 18:00",
    saturday: "10:00 - 13:00",
    sunday: "Kapalı"
  }
};

export const COUNTRY_CODES = [
  { code: '+90', country: 'TR' },
  { code: '+994', country: 'AZ' },
  { code: '+993', country: 'TM' },
  { code: '+998', country: 'UZ' },
  { code: '+7', country: 'RU/KZ' },
  { code: '+98', country: 'IR' },
  { code: '+49', country: 'DE' },
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+33', country: 'FR' },
  { code: '+31', country: 'NL' },
  { code: '+964', country: 'IQ' },
  { code: '+963', country: 'SY' },
  { code: '+971', country: 'AE' },
  { code: '+966', country: 'SA' },
];

export const SERVICES: Service[] = [
  {
    id: "residency",
    title: "İkamet İzni",
    description: "Türkiye'de uzun dönem veya geçici süreli yaşam izinleri konusunda rehberlik ve destek sağlar, başvurularınızı kolay ve hızlı bir şekilde yönetiriz.",
    icon: "Home"
  },
  {
    id: "work",
    title: "Çalışma İzni",
    description: "Türkiye'de yasal çalışma izinleri için profesyonel danışmanlık sunar, gerekli belgeler ve resmi prosedürlerde size rehberlik ederiz.",
    icon: "Briefcase"
  },
  {
    id: "student",
    title: "Öğrenci İşlemleri",
    description: "Yabancı öğrenciler için vize, üniversite kaydı ve eğitimle ilgili işlemler konusunda kapsamlı destek sunarız.",
    icon: "GraduationCap"
  },
  {
    id: "citizenship",
    title: "Vatandaşlık İşlemleri",
    description: "Türk vatandaşlığına geçiş süreçlerinde hukuki ve bürokratik destek sağlıyoruz.",
    icon: "Flag"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Türkiye’de Uzun Dönem (Süresiz) İkamet İzni Nasıl Alınır?",
    summary: "8 yıl boyunca yasal olarak kalmış olmanın şartları ve bilinmesi gerekenler...",
    date: "Ocak 2025",
    image: "https://picsum.photos/400/250?random=1"
  },
  {
    id: "2",
    title: "Yabancıların Adres Kaydı İçin Gerekli Evraklar (2025)",
    summary: "Adres tescili ve Göç İdaresi kayıt süreçleri hakkında güncel bilgiler.",
    date: "Şubat 2025",
    image: "https://picsum.photos/400/250?random=2"
  },
  {
    id: "3",
    title: "Yabancı Uyruklular İçin İSKİ Su Aboneliği Rehberi",
    summary: "İstanbul'da yaşayan yabancılar için su abonelik işlemleri nasıl yapılır?",
    date: "Mart 2025",
    image: "https://picsum.photos/400/250?random=3"
  }
];

export const SYSTEM_INSTRUCTION = `
You are the intelligent virtual assistant for "Atasa Danışmanlık".
Your role is to help foreigners with Residency Permits, Work Permits, Student procedures, and Citizenship in Turkey.
Use the following context to answer questions:

Company: Atasa Danışmanlık
Founder: Ömer Habib
Phone: +90 850 308 69 98
Email: support@atasa.tr
Address: Mecidiyeköy mah. Raşit Rıza sk. Ahmet Esin İş Merkezi NO:4 K:2 D:7 Şişli/İstanbul
Working Hours: Weekdays 09:00 - 18:00, Saturday 10:00 - 13:00.

Core Services:
1. İkamet İzni (Residency Permit): Long term and short term guidance.
2. Çalışma İzni (Work Permit): Professional consulting for legal work permits.
3. Öğrenci İşlemleri (Student Procedures): University registration and visa support.
4. Vatandaşlık (Citizenship): Guidance for citizenship applications.

Value Proposition:
- Expertise & Experience
- Fast & Effective Service
- Personalized Support

Tone: Professional, helpful, reassuring, and polite.
Language: Answer in Turkish by default, but switch to English if the user asks in English.
Keep answers concise and direct users to the "Randevu Al" (Make Appointment) page for complex legal matters.
`;

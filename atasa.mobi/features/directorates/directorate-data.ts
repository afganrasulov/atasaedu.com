
export interface Directorate {
  id: string;
  name: string;
  address: string;
  hours: string;
  mapsUrl: string;
  city: string;
}

export const DIRECTORATE_DATA: Directorate[] = [
  {
    id: 'ist-il',
    name: 'İstanbul İl Göç İdaresi Müdürlüğü',
    address: 'Hırka-i Şerif Mah. Adnan Menderes Bulvarı No:64, 34091 Fatih/İstanbul',
    hours: 'Hafta içi 09:00–18:00 (12:30–13:30 öğle arası), Cmt-Paz kapalı',
    mapsUrl: 'https://maps.app.goo.gl/APMwWK8R3ATDeAF18',
    city: 'İstanbul'
  },
  {
    id: 'ist-esenyurt',
    name: 'Esenyurt İlçe Göç İdaresi Müdürlüğü',
    address: 'İstiklal Mah. 2663. Sokak No:6, 34522 Esenyurt/İstanbul',
    hours: 'Hafta içi 09:00–18:00 (öğle arası 12:30–13:30), hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/1kRyVJ3DnJLKWKnF7',
    city: 'İstanbul'
  },
  {
    id: 'ist-pendik',
    name: 'Pendik İlçe Göç İdaresi Müdürlüğü',
    address: 'Doğu Mah. İnce Sokak No:12, Hükümet Konağı Kat:1, 34890 Pendik/İstanbul',
    hours: 'Hafta içi 09:00–18:00 (öğle arası 12:30–13:30), hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/hs6Li1cpJJ9nXLuh7',
    city: 'İstanbul'
  },
  {
    id: 'ist-sultanbeyli',
    name: 'Sultanbeyli İlçe Göç İdaresi Müdürlüğü',
    address: 'Battalgazi Mah. Bosna Bulvarı No:136, 34935 Sultanbeyli/İstanbul',
    hours: 'Hafta içi 09:00–18:00 (öğle arası 12:30–13:30), hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/r4JvCTCREMUuiaXo9',
    city: 'İstanbul'
  },
  {
    id: 'ant-il',
    name: 'Antalya İl Göç İdaresi Müdürlüğü',
    address: 'Bayındır, Gazi Blv. Yanyolu No:2, 07030 Muratpaşa/Antalya',
    hours: 'Hafta içi 08:00-17:00 (12:30-13:30 öğle arası); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/A6WZXyrrngv74k1t9',
    city: 'Antalya'
  },
  {
    id: 'ant-manavgat',
    name: 'Manavgat İlçe Göç İdaresi Müdürlüğü',
    address: 'Kavaklı, Hasan Fehmi Boztepe Cd. No:186, 07600 Manavgat/Antalya',
    hours: 'Hafta içi 09:00-12:30 ve 13:30-17:00; hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/n1a2G5hcZDxQdAnK6',
    city: 'Antalya'
  },
  {
    id: 'ant-kemer',
    name: 'Kemer İlçe Göç İdaresi Müdürlüğü',
    address: 'Merkez Mah. Yalı Cad. No: 1 İç Kapı : D-E Kemer Bel. Altı, 07990 Kemer/Antalya',
    hours: 'Hafta içi 08:30-17:30 (öğle arası 12:30-13:30); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/gj7NtLMQySnTGETM6',
    city: 'Antalya'
  },
  {
    id: 'ank-il',
    name: 'Ankara İl Göç İdaresi Müdürlüğü',
    address: 'Barbaros, Binnaz Sk. No:2, 06680 Çankaya/Ankara',
    hours: 'Hafta içi 08:30-17:30 (öğle arası 12:30-13:30); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/GPDHS1ooAnieppJSA',
    city: 'Ankara'
  },
  {
    id: 'bur-il',
    name: 'Bursa İl Göç İdaresi Müdürlüğü',
    address: 'Veysel Karani, Sevgi Caddesi No:2, 16270 Osmangazi̇/Bursa',
    hours: 'Hafta içi 08:00-17:00 (12:00-13:00 öğle arası); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/qR6ibrN7yh181nZA9',
    city: 'Bursa'
  },
  {
    id: 'mer-il',
    name: 'Mersin İl Göç İdaresi Müdürlüğü',
    address: 'Cami Şerif, Uray Cd. No:17, 33060 Akdeniz/Mersin',
    hours: 'Hafta içi 08:00-17:00 (12:00-13:00 öğle arası); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/RTXKeqXxberqBjYo7',
    city: 'Mersin'
  },
  {
    id: 'izm-il',
    name: 'İzmir İl Göç İdaresi Müdürlüğü',
    address: 'Konak, 863. Sk. No:28, 35250 Konak/İzmir',
    hours: 'Hafta içi 08:30-17:30 (öğle arası 12:30-13:30); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/TznNxvehmDVuzpTz7',
    city: 'İzmir'
  },
  {
    id: 'gaz-il',
    name: 'Gaziantep İl Göç İdaresi Müdürlüğü',
    address: 'Değirmiçem, 84004. Cd. No: 6, 27090 Şehitkamil/Gaziantep',
    hours: 'Hafta içi 08:00-17:00 (12:00-13:00 öğle arası); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/sbRWqYs9b9S59VDaA',
    city: 'Gaziantep'
  },
  {
    id: 'hat-il',
    name: 'Hatay İl Göç İdaresi Müdürlüğü (Antakya)',
    address: 'Değirmiçem, 84004. Cd. No: 6, 27090 Şehitkamil/Gaziantep',
    hours: 'Hafta içi 08:00-17:00 (12:00-13:00 öğle arası); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/Sr1F7Mk7oMVYiCYc6',
    city: 'Hatay'
  },
  {
    id: 'koc-il',
    name: 'Kocaeli İl Göç İdaresi Müdürlüğü (İzmit)',
    address: 'Ayazma Mah. Gemici Sk. No:6, İzmit/Kocaeli',
    hours: 'Hafta içi 08:30-17:30 (öğle arası 12:30-13:30); hafta sonu kapalı',
    mapsUrl: 'https://maps.app.goo.gl/qri4C6JxowJgnpFS9',
    city: 'Kocaeli'
  },
  {
    id: 'koc-gebze',
    name: 'Gebze İlçe Göç İdaresi Müdürlüğü',
    address: 'Mevlana Mah. Issıkgöl Cad. No:111 (Proje 16/21), Gebze/Kocaeli',
    hours: 'Hafta içi 08:30-17:30 (öğle arası 12:30-13:30); hafta sonu kapalı',
    mapsUrl: 'https://www.google.com/maps/search/Gebze+%C4%B0l%C3%A7e+G%C3%B6%C3%A7+%C4%B0daresi+M%C3%BCd%C3%BCrl%C3%BC%C4%9F%C3%BC',
    city: 'Kocaeli'
  }
];

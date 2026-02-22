
export interface RejectionDetail {
  code: string;
  title: string;
  shortDesc: string;
  meaning: string;
  reasons: string[];
  examples: string[];
  solutions: string[];
  severity: 'warning' | 'danger' | 'info';
}

export const REJECTION_CODES: Record<string, RejectionDetail> = {
  "9/a": {
    code: "9/a",
    title: "Uluslararası İşgücü Politikasına Uygunsuzluk",
    shortDesc: "Başvurunun Türkiye'nin genel istihdam ve işgücü politikalarıyla örtüşmemesi.",
    meaning: "Bakanlık; yapılan işin, teklif edilen ücretin veya işverenin kapasitesinin genel politikalara uymadığını düşünmektedir. En geniş kapsamlı ret maddesidir.",
    reasons: [
      "İşyerinde 5 Türk vatandaşı istihdamı şartının sağlanmaması.",
      "Sunulan ücretin pozisyon seviyesine göre düşük olması (Mühendis için 4 kat, Uzman için 2 kat vb.).",
      "İşverenin ödenmiş sermayesinin yetersizliği (Min. 100.000 TL şartı).",
      "Yabancının eğitiminin iş ile uyumlu olmaması.",
      "Sektörel veya bölgesel yabancı istihdam kotasının dolmuş olması."
    ],
    examples: [
      "Garsonluk için başvuru yapılması (Yerli işgücüyle karşılanabilir görülür).",
      "Mühendise asgari ücret gösterilmesi.",
      "Yeni kurulmuş ve ciro yapmamış bir şirketin yabancı çalıştırmak istemesi."
    ],
    solutions: [
      "Önce işyerinde gerekli Türk istihdam dengesini kurun.",
      "Maaş tutarını mevzuattaki katsayılara göre güncelleyin.",
      "Yabancının o iş için neden vazgeçilmez olduğunu kanıtlayan belgeler (sertifika, dil belgesi) ekleyin.",
      "Şirket sermayesini ve aktifliğini banka/SGK dökümleriyle ispatlayın."
    ],
    severity: 'warning'
  },
  "9/b": {
    code: "9/b",
    title: "Sahte veya Yanıltıcı Bilgi ve Belgeler",
    shortDesc: "Başvuru dosyasında gerçeğe aykırı evrak tespiti.",
    meaning: "Bakanlığa sunulan belgelerin sahte olduğu veya formda verilen bilgilerin (adres, tecrübe vb.) doğru olmadığı tespit edilmiştir.",
    reasons: [
      "Sahte diploma veya fotokopi üzerinde oynama.",
      "Yanlış adres beyanı.",
      "Başkasına ait belgelerin sisteme yüklenmesi.",
      "Sahte iş sözleşmesi veya imza."
    ],
    examples: [
      "Yabancının tecrübesi olmadığı halde varmış gibi gösterilen referans mektupları.",
      "Geçersiz veya süresi geçmiş pasaport bilgileriyle başvuru."
    ],
    solutions: [
      "Tüm belgelerin orijinallerini ve güncelliğini kontrol edin.",
      "Eksik veya hatalı bilgi varsa dürüstçe düzeltip yeniden başvurun.",
      "Sahtecilik tespiti durumunda adli süreç başlayabileceği için bir avukattan destek alın."
    ],
    severity: 'danger'
  },
  "9/c": {
    code: "9/c",
    title: "İşverenin İstihdam Gerekçesinin Yetersizliği",
    shortDesc: "'Neden bu yabancı?' sorusuna makul bir yanıt verilememesi.",
    meaning: "İşveren, bu pozisyonda neden bir Türk vatandaşı değil de yabancı birini çalıştırmak zorunda olduğunu yeterince açıklayamamıştır.",
    reasons: [
      "Başvuru formundaki açıklamanın genel ve klişe ifadeler içermesi.",
      "Pozisyonun özel bir uzmanlık gerektirmemesi.",
      "Şirketin faaliyet alanıyla yabancının görev tanımının uyuşmaması."
    ],
    examples: [
      "'Çok iyi çalışıyor' gibi yetersiz gerekçeler sunulması.",
      "Türkçe bilmeyen bir yabancının sadece Türkçe konuşulan bir ofiste sekreter olarak gösterilmesi."
    ],
    solutions: [
      "Yabancının sunduğu katma değeri (yabancı dil, pazar bağlantısı, özel teknik bilgi) vurgulayın.",
      "Şirketin ihracat hedeflerini ve yabancının bu süreçteki rolünü dökümante edin."
    ],
    severity: 'warning'
  },
  "9/ç": {
    code: "9/ç",
    title: "Yabancılara Yasaklı Meslekler",
    shortDesc: "Sadece Türk vatandaşlarının yapabileceği bir meslek için başvuru.",
    meaning: "Kanun gereği Türkiye'de bazı mesleklerin yabancılar tarafından icrası yasaktır.",
    reasons: [
      "Eczacılık, Diş Hekimliği, Veterinerlik.",
      "Avukatlık, Noterlik.",
      "Özel Güvenlik Görevlisi, Çarşı ve Mahalle Bekçiliği.",
      "Gümrük Müşavir Yardımcılığı."
    ],
    examples: [
      "Bir yabancının diş polikliniğinde doktor olarak gösterilmesi.",
      "Hukuk bürosunda avukat olarak çalışma izni istenmesi."
    ],
    solutions: [
      "Meslek tanımını 'Danışman' veya 'Çevirmen' gibi yabancılara açık pozisyonlara uygun şekilde, gerçek iş tanımını bozmadan güncelleyin.",
      "Eğer meslek yasaklılar listesindeyse bu alanda çalışma izni alınması imkansızdır."
    ],
    severity: 'danger'
  },
  "9/d": {
    code: "9/d",
    title: "Nitelik ve Uzmanlık Eksikliği",
    shortDesc: "Yabancının iş için gereken yetkinliğe sahip olmaması.",
    meaning: "Başvurulan pozisyon için gereken diploma, sertifika veya tecrübenin yabancı tarafından ispatlanamaması.",
    reasons: [
      "Aşçılık başvurusu yapan birinin ustalık belgesinin olmaması.",
      "Teknik bir iş için gereken diplomanın sunulmaması veya denkliğinin bulunmaması."
    ],
    examples: [
      "Mühendis olarak başvurup diploma yerine lise mezuniyet belgesi sunmak.",
      "Kuaför asistanlığı için başvurup bu alanda hiç tecrübe beyan etmemek."
    ],
    solutions: [
      "Yabancının eğitim sertifikalarını ve önceki iş yerlerinden aldığı referansları dosyaya ekleyin.",
      "Diploma denklik süreçlerini (gerekiyorsa) başlatın."
    ],
    severity: 'warning'
  },
  "9/f": {
    code: "9/f",
    title: "6458 Sayılı Kanun Kapsamında Kısıtlamalar",
    shortDesc: "Yabancının Türkiye'ye giriş yasağı veya deport durumu.",
    meaning: "Yabancı hakkında Yabancılar ve Uluslararası Koruma Kanunu uyarınca Türkiye'ye girişi yasaklanmış veya sınır dışı kararı verilmiş olması.",
    reasons: [
      "Hakkında tahdit kodu (V-G vb.) olması.",
      "Vize süresini veya ikametini ihlal edip ceza ödemeden çıkış yapması.",
      "Kamu düzeni veya sağlığı açısından sakıncalı görülmesi (Madde 7, 15, 54)."
    ],
    examples: [
      "Daha önce sınır dışı edilmiş birinin tekrar başvuru yapması.",
      "Pasaport süresinin bitimine 60 günden az kalması."
    ],
    solutions: [
      "Önce Göç İdaresi'nden durum belgesi alıp yasağın süresini kontrol edin.",
      "Vize ihlali kaynaklı borçları ödeyin.",
      "Yasak süresi bittiyse özel meşruhatlı vize ile giriş yapmayı deneyin."
    ],
    severity: 'danger'
  },
  "9/g": {
    code: "9/g",
    title: "Kamu Düzeni ve Güvenliği Engeli",
    shortDesc: "Güvenlik veya sağlık yönünden riskli görülme.",
    meaning: "Yabancının Türkiye'de bulunmasının kamu düzeni, güvenliği veya genel sağlık açısından risk taşıdığının değerlendirilmesi.",
    reasons: [
      "Bulaşıcı hastalık taşıma riski.",
      "Adli sicil kaydının (Interpol dahil) kabarık olması.",
      "Terör veya suç örgütü bağlantısı şüphesi."
    ],
    examples: [
      "Sağlık raporunda toplum sağlığını tehdit eden bir hastalık çıkması.",
      "Yabancının yasa dışı faaliyetlerle bağlantılı görülmesi."
    ],
    solutions: [
      "Adli veya idari hatalar varsa temiz sicil belgeleriyle itiraz edin.",
      "Sağlık raporlarını tam teşekküllü hastanelerden yenileyin."
    ],
    severity: 'danger'
  },
  "9/h": {
    code: "9/h",
    title: "Eksik Evrak veya Süre Aşımı",
    shortDesc: "Belirtilen sürede başvurunun tamamlanmaması.",
    meaning: "Bakanlık tarafından istenen ek evrakların veya harç ödemelerinin yasal süresi (genellikle 30 gün) içinde yapılmaması.",
    reasons: [
      "Harç veya kart bedelinin ödenmemesi.",
      "İstenen ek belgelerin sisteme yüklenmemesi.",
      "Sistemsel hatalar nedeniyle eksik kalan işlemler."
    ],
    examples: [
      "Bakanlığın istediği yeni kira kontratının 30 gün içinde verilmemesi.",
      "Başvuru harcının dekontunun sisteme düşmemesi."
    ],
    solutions: [
      "E-izin portalını her gün takip edin.",
      "Tüm harçları zamanında ödeyip dekontları saklayın.",
      "Süre geçtiyse ret kararından sonra 15 gün içinde itiraz dilekçesi verin."
    ],
    severity: 'info'
  }
};

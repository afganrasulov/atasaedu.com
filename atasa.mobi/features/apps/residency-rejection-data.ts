export interface ResidencyRejectionDetail {
  code: string;
  title: string;
  shortDesc: string;
  meaning: string;
  reasons: string[];
  examples: string[];
  solutions: string[];
  severity: 'warning' | 'danger' | 'info';
  category: 'Visa' | 'Entry' | 'Residency' | 'Protection';
}

export const RESIDENCY_REJECTION_CODES: Record<string, ResidencyRejectionDetail> = {
  "Madde 9": {
    code: "Madde 9",
    title: "Girişine İzin Verilmeyecek Yabancılar",
    shortDesc: "Kamu güvenliği veya yasal ihlaller nedeniyle ülkeye girişin engellenmesi.",
    meaning: "Yabancının vize veya ikamet süresini ihlal etmesi, sınır dışı (deport) edilmesi veya kamu güvenliği için riskli (9A, 9D, 9F kodları gibi) görülmesi durumudur.",
    reasons: [
      "Vize veya ikamet süresi ihlali.",
      "Geçerli bir sınır dışı etme kararının bulunması.",
      "Kamu düzeni veya genel sağlık açısından tehdit oluşturmak.",
      "Hakkında tahdit kodu (9A-9D-9F vb.) bulunması."
    ],
    examples: [
      "Vize süresi bitmesine rağmen ülkeden çıkmayanlar.",
      "Hakkında terör veya ağır suç şüphesi olanlar."
    ],
    solutions: [
      "Giriş yasağı süresinin dolmasını bekleyin.",
      "Hukuka aykırı bir kod varsa iptal davası açın.",
      "Özel meşruhatlı vize (evlilik, çalışma vb.) yollarını araştırın."
    ],
    severity: 'danger',
    category: 'Entry'
  },
  "Madde 15": {
    code: "Madde 15",
    title: "Vize Verilmeyecek Yabancılar",
    shortDesc: "Vize başvurusunun temel şartlarının sağlanmaması.",
    meaning: "Pasaportun yetersizliği, geçerli bir sağlık sigortasının olmaması veya kalış amacının inandırıcı bulunmaması gibi nedenlerle vize talebinin reddidir.",
    reasons: [
      "Pasaportun vize süresinden en az 60 gün daha uzun olmaması.",
      "Sağlık sigortasının bulunmaması veya kapsamının yetersizliği.",
      "Türkiye'de kalış süresince geçimini sağlayacak maddi imkanın ispatlanamaması.",
      "Kalış amacının makul veya inandırıcı bulunmaması."
    ],
    examples: [
      "Turistik vizeye başvurup dönüş bileti veya otel rezervasyonu sunmamak.",
      "Geçim kaynağını belgeleyemeyen başvuru sahipleri."
    ],
    solutions: [
      "Pasaport süresini uzatıp yeniden başvurun.",
      "Banka hesap dökümü ve gelir belgelerini eksiksiz hazırlayın.",
      "Sigorta poliçenizi güncel mevzuata uygun hale getirin."
    ],
    severity: 'danger',
    category: 'Visa'
  },
  "Madde 25": {
    code: "Madde 25",
    title: "İkamet Başvurusunun Reddi / İptali",
    shortDesc: "İkamet başvurusu prosedürlerindeki hatalar.",
    meaning: "Türkiye içinden yapılan başvurularda yanlış ikamet türü seçilmesi veya yanlış zamanda/yerden başvuru yapılması nedeniyle reddedilme durumudur.",
    reasons: [
      "Vize süresi bittikten sonra yapılan geç başvurular.",
      "Bulunulan şehirden farklı bir şehir için başvuru yapılması.",
      "Şartları taşımadığı halde yanlış ikamet türüne (örn: turistik yerine aile) başvurmak."
    ],
    examples: [
      "Vize muafiyeti bittikten 15 gün sonra başvuru yapmak.",
      "İstanbul'da yaşayıp Ankara Göç İdaresi'ne randevu almak."
    ],
    solutions: [
      "Yasal süreleri kaçırmadan e-ikamet üzerinden başvuru yapın.",
      "Durumunuza en uygun ikamet türünü uzman eşliğinde belirleyin.",
      "Adres beyanı ve randevu yerinin uyuştuğundan emin olun."
    ],
    severity: 'warning',
    category: 'Residency'
  },
  "Madde 32": {
    code: "Madde 32",
    title: "Kısa Dönem İkamet Şartları",
    shortDesc: "Turizm veya ticari amaçlı kalış kriterlerinin sağlanmaması.",
    meaning: "Özellikle turizm amaçlı ikametlerde; turizm planının inandırıcı bulunmaması, evrak eksikliği veya maddi durumun yetersizliği durumudur.",
    reasons: [
      "Turizm amacını destekleyen seyahat planının sunulmaması.",
      "Adres kaydının (kira kontratı vb.) eksik veya hatalı olması.",
      "Maddi durumun asgari ücretin altında kalması.",
      "Genel sağlık sigortası şartının sağlanmaması."
    ],
    examples: [
      "Noter onaysız kira kontratı sunulması.",
      "Banka hesabında kalış süresine yetecek bakiye gösterilmemesi."
    ],
    solutions: [
      "Detaylı bir turizm/seyahat planı hazırlayın.",
      "Adresinizi Nüfus Müdürlüğü'nden teyit ederek güncelleyin.",
      "Resmi gelir belgeleri veya banka dökümlerini güncel tarihli alın."
    ],
    severity: 'warning',
    category: 'Residency'
  },
  "Madde 33": {
    code: "Madde 33",
    title: "Kısa Dönem İkametin Reddi / İptali",
    shortDesc: "Kullanım amacı dışına çıkılması veya şartların kaybı.",
    meaning: "İkamet izninin veriliş amacı dışında kullanılması (örn: turistle çalışmak) veya 120 günden fazla yurt dışında kalınması gibi durumları kapsar.",
    reasons: [
      "İkamet izninin veriliş amacı dışında kullanılması.",
      "Veriliş şartlarının sonradan ortadan kalkması.",
      "Yurt dışında kalış süresinin yasal limitleri (120 gün kuralı) aşması.",
      "Hakkında geçerli sınır dışı etme kararı bulunması."
    ],
    examples: [
      "Turistik ikamet ile bir işyerinde sigortasız çalışırken yakalanmak.",
      "Bir takvim yılında 5 aydan fazla Türkiye dışında kalmak."
    ],
    solutions: [
      "Çalışma planınız varsa mutlaka Çalışma İzni alın.",
      "Yurt dışı çıkış sürelerinizi 'Gün Hesaplayıcı' aracımızla kontrol edin.",
      "Şartların değişmesi durumunda ikamet türü değişikliği (geçiş) başvurusu yapın."
    ],
    severity: 'danger',
    category: 'Residency'
  },
  "Madde 34-35": {
    code: "Madde 34-35",
    title: "Aile İkamet İzni Şartları",
    shortDesc: "Aile birliği için gereken kriterlerin eksikliği.",
    meaning: "Destekleyicinin gelirinin yetersiz olması, tüm aileyi kapsayan sigortanın olmaması veya aile bağının kanıtlanamaması durumudur.",
    reasons: [
      "Destekleyicinin (sponsor) gelirinin fert başına asgari ücretten az olması.",
      "Aile bireylerini kapsayan geçerli sağlık sigortası eksikliği.",
      "Adres kayıt sistemindeki uyumsuzluklar.",
      "Evlilik veya çocuk bağını gösteren belgelerin (Apostil/Noter) eksikliği."
    ],
    examples: [
      "Yurt dışından alınan evlilik cüzdanının Türk makamlarınca onaylatılmaması.",
      "Destekleyicinin sigorta primlerinin ödenmemiş olması."
    ],
    solutions: [
      "Yurt dışı belgelerini mutlaka Apostil şerhli ve noter onaylı hazırlayın.",
      "Destekleyicinin gelir durumunu maaş bordrosu veya banka dökümüyle ispatlayın.",
      "Tüm aile fertlerini tek bir poliçede kapsayan sigorta yaptırın."
    ],
    severity: 'warning',
    category: 'Residency'
  },
  "Madde 36": {
    code: "Madde 36",
    title: "Aile İkametinin Reddi / İptali",
    shortDesc: "Evlilik birliğinin inandırıcı bulunmaması.",
    meaning: "Yapılan evliliğin sadece ikamet izni almak amacıyla (formalite/sahte) yapıldığının veya ailenin fiilen birlikte yaşamadığının tespiti durumudur.",
    reasons: [
      "Anlaşmalı veya sahte evlilik şüphesi.",
      "Eşlerin aynı adreste ikamet etmediğinin tespiti.",
      "Mülakat sırasında çelişkili beyanlar verilmesi."
    ],
    examples: [
      "Polis denetiminde eşlerin farklı evlerde yaşadığının görülmesi.",
      "Evlilik birliğini kanıtlayan sosyal veri eksikliği."
    ],
    solutions: [
      "Gerçek evlilik birliğini kanıtlayan ek belgeler (ortak fatura, fotoğraflar vb.) sunun.",
      "Adres kayıtlarınızı her zaman güncel ve doğru tutun.",
      "Ret durumunda 15 gün içinde hukuki süreci (dava) başlatın."
    ],
    severity: 'danger',
    category: 'Residency'
  },
  "Madde 39-40": {
    code: "Madde 39-40",
    title: "Öğrenci İkamet İzni Şartları",
    shortDesc: "Eğitim statüsünün kanıtlanamaması.",
    meaning: "Yabancının geçerli bir öğrencilik kaydının olmaması, okuldan ilişiğinin kesilmesi veya sağlık sigortasının bulunmamasıdır.",
    reasons: [
      "Aktif öğrenci belgesinin sunulamaması.",
      "Üniversite harcının ödenmemiş olması.",
      "Sağlık sigortası (GSS veya Özel) eksikliği.",
      "Yasal süresi içinde yapılmayan başvurular."
    ],
    examples: [
      "Okul kaydı dondurulduğu halde öğrenci ikametiyle kalmaya çalışmak.",
      "Pasaport süresinin eğitim döneminden kısa olması."
    ],
    solutions: [
      "Okuldan güncel ve e-imzalı öğrenci belgesi alın.",
      "GSS başvurunuzu süresinde yapın veya kapsamlı özel sigorta edinin.",
      "Kayıt dondurma durumunda ikamet türünüzü değiştirmek için bize danışın."
    ],
    severity: 'warning',
    category: 'Residency'
  },
  "Madde 41": {
    code: "Madde 41",
    title: "Öğrenci İkameti Ret / İptal",
    shortDesc: "Eğitim amacının dışına çıkılması.",
    meaning: "Okul ile ilişiğin kesilmesi, devamsızlık veya öğrenci ikametinin sadece Türkiye'de kalmak için bir araç olarak kullanılmasıdır.",
    reasons: [
      "Okuldan kayıt sildirme veya ilişiğin kesilmesi.",
      "Eğitimin tamamlanmış olması (mezuniyet sonrası 10 gün kuralı).",
      "Amaç dışı kullanım (Örn: Derse gitmeyip tam zamanlı çalışmak)."
    ],
    examples: [
      "Mezuniyetten sonra 10 gün içinde statü değişikliği yapmayanlar.",
      "Devamsızlık nedeniyle okuldan atılan öğrenciler."
    ],
    solutions: [
      "Mezuniyet sonrası 'Mezuniyet Sonrası Kısa Dönem' iznine hemen başvurun.",
      "Eğitim statünüz değiştikçe Göç İdaresi'ne bildirim yapın.",
      "Yasal itiraz süresini geçirmeden dosyanızı yeniden yapılandırın."
    ],
    severity: 'danger',
    category: 'Residency'
  },
  "Madde 45": {
    code: "Madde 45",
    title: "Uzun Dönem İkamet İptali",
    shortDesc: "Süresiz ikamet hakkının kaybedilmesi.",
    meaning: "Uzun dönem (süresiz) ikameti olan yabancının kamu güvenliğini tehdit etmesi veya yasal sınırların üzerinde yurt dışında kalmasıdır.",
    reasons: [
      "Kamu düzeni veya güvenliği açısından ciddi tehdit oluşturmak.",
      "Sağlık, eğitim ve zorunlu kamu hizmeti dışında kesintisiz 1 yıldan fazla yurt dışında kalmak.",
      "İptali gerektiren adli mahkumiyetlerin oluşması."
    ],
    examples: [
      "Süresiz ikameti olup 1.5 yıl boyunca Türkiye'ye hiç giriş yapmayanlar.",
      "Hakkında ağır suç dosyası açılan uzun dönem sahipleri."
    ],
    solutions: [
      "Türkiye dışında 1 yıldan fazla kalacaksanız geçerli mazeretinizi dökümante edin.",
      "İptal kararı tebliğ edildikten sonra 60 gün içinde dava açma hakkınızı kullanın.",
      "Hakkın yeniden kazanımı için Atasa uzmanlarından strateji desteği alın."
    ],
    severity: 'danger',
    category: 'Residency'
  },
  "Madde 46-47": {
    code: "Madde 46-47",
    title: "İnsani İkamet İzni İptali",
    shortDesc: "İnsani gerekçelerin ortadan kalkması.",
    meaning: "Zorunlu veya acil durumlar nedeniyle verilen insani ikametin, bu durumlar sona erdiğinde iptal edilmesidir.",
    reasons: [
      "İnsani ikamet verilmesini gerektiren şartların ortadan kalkması.",
      "Bakanlık onayı ile verilen iznin süresinin dolması ve uzatılmaması.",
      "Yabancının ülkesindeki durumun düzelmiş olması."
    ],
    examples: [
      "Savaş nedeniyle verilen iznin, savaş bittikten sonra iptali.",
      "Tedavi amaçlı verilen iznin iyileşme sonrası sonlandırılması."
    ],
    solutions: [
      "İnsani durum devam ediyorsa raporlarla birlikte uzatma talep edin.",
      "Şartlar bittiyse Kısa Dönem veya Çalışma İzni gibi kalıcı statülere geçin.",
      "İnsani gerekçenizi resmi kurum yazışmalarıyla destekleyin."
    ],
    severity: 'info',
    category: 'Residency'
  },
  "Madde 48-49": {
    code: "Madde 48-49",
    title: "Mağdur İkamet İzni İptali",
    shortDesc: "Mağduriyet statüsünün kaybı.",
    meaning: "İnsan ticareti mağduru yabancılara verilen koruma amaçlı iznin, kişinin mağdur olmadığı anlaşılması veya kurallara uymaması nedeniyle iptalidir.",
    reasons: [
      "Yabancının aslında mağdur olmadığının veya yanıltıcı bilgi verdiğinin anlaşılması.",
      "Belirlenen güvenlik ve koruma kurallarına uyulmaması.",
      "Kendi rızasıyla suça ortaklık ettiğinin tespit edilmesi."
    ],
    examples: [
      "Koruma evinden izinsiz ayrılan veya kuralları ihlal eden yabancılar.",
      "Mağduriyet beyanının asılsız olduğunun yargı kararıyla kesinleşmesi."
    ],
    solutions: [
      "Adli süreçleri titizlikle takip edin ve iş birliği yapın.",
      "Güvenlik birimlerinin talimatlarına tam uyum sağlayın.",
      "Hukuki statünüzün netleşmesi için barodan veya bizden avukat desteği alın."
    ],
    severity: 'danger',
    category: 'Residency'
  },
  "Madde 64": {
    code: "Madde 64",
    title: "Uluslararası Koruma Hariçte Bırakılma",
    shortDesc: "Ağır suçlar nedeniyle koruma hakkının verilmemesi.",
    meaning: "Sığınma talep eden kişinin ağır suç işlemesi, terör bağlantısı veya BM ilkelerine aykırı davranışları nedeniyle koruma dışı tutulmasıdır.",
    reasons: [
      "İnsanlığa karşı suç, savaş suçu veya barışa karşı suç işlemek.",
      "Terör eylemlerine katılmak veya desteklemek.",
      "Birleşmiş Milletler'in amaç ve ilkelerine aykırı fiillerde bulunmak.",
      "Türkiye'de işlediği ağır suçlar nedeniyle tehlike arz etmek."
    ],
    examples: [
      "Interpol tarafından kırmızı bültenle aranan şahısların başvuruları.",
      "Terör örgütü üyeliği kanıtlanan başvuru sahipleri."
    ],
    solutions: [
      "Hatalı kimlik eşleşmesi varsa adli belgelerle ispatlayın.",
      "AİHM ve Anayasa Mahkemesi tedbir yollarını avukatınızla görüşün.",
      "Sınır dışı edilmeme garantisi için 'Geri Göndermeme İlkesi' kapsamında savunma yapın."
    ],
    severity: 'danger',
    category: 'Protection'
  },
  "Madde 72": {
    code: "Madde 72",
    title: "Kabul Edilemez Başvuru",
    shortDesc: "Başvurunun incelenmeye dahi alınmaması.",
    meaning: "Güvenli bir üçüncü ülkeden gelmiş olmak veya aynı gerekçelerle mükerrer (tekrar) başvuru yapmak nedeniyle talebin geçersiz sayılmasıdır.",
    reasons: [
      "Zulüm görmediği güvenli bir ülkeden gelerek sığınma istemek.",
      "Aynı kişi tarafından farklı kimliklerle mükerrer kayıt açılması.",
      "Başvuru amacının tamamen kötü niyetli (zaman kazanma amaçlı) bulunması."
    ],
    examples: [
      "Avrupa'da oturumu varken Türkiye'de koruma talep etmek.",
      "Daha önce reddedilen aynı hikaye ile tekrar başvurmak."
    ],
    solutions: [
      "Yeni ve somut delilleriniz (hayatın olağan akışına uygun) varsa sunun.",
      "Güvenli üçüncü ülke statüsünü çürüten deliller getirin.",
      "Dosyanızı 'Kabul Edilebilir' hale getirmek için profesyonel danışmanlık alın."
    ],
    severity: 'info',
    category: 'Protection'
  },
  "Madde 78": {
    code: "Madde 78",
    title: "Uluslararası Koruma Esastan Ret",
    shortDesc: "Gerekçelerin inandırıcı bulunmaması.",
    meaning: "Yabancının sığınma hikayesinin, ülkesindeki zulüm riskinin veya kimliğinin inandırıcı ve tutarlı bulunmamasıdır.",
    reasons: [
      "Mülakat sırasında çelişkili beyanlar verilmesi.",
      "Zulüm riskini ispatlayan belgelerin sahte olduğunun anlaşılması.",
      "Ülkesine güvenli bir şekilde dönebileceğinin tespit edilmesi."
    ],
    examples: [
      "Kendi ülkesine tatile giden birinin 'ölüm riskim var' demesi.",
      "Siyasi baskı gördüğünü söyleyip pasaportunu kendi ülkesinden yasal yolla yenileyenler."
    ],
    solutions: [
      "Ret kararından sonra 30 gün içinde İdare Mahkemesine dava açın.",
      "Mülakat tutanaklarındaki çeviri hatalarını ve çelişkileri düzeltin.",
      "Ülkenizdeki güncel risk raporlarını bağımsız kuruluşlardan temin edin."
    ],
    severity: 'danger',
    category: 'Protection'
  },
  "Madde 79": {
    code: "Madde 79",
    title: "Hızlandırılmış Ret Kararı",
    shortDesc: "Kötü niyetli veya temelsiz başvurular.",
    meaning: "Başvurunun açıkça temelsiz, hileli veya sadece sınır dışı edilmeyi geciktirmek amacıyla yapıldığının anlaşıldığı durumlardır.",
    reasons: [
      "Sahte kimlik veya belge kullanımıyla yapılan başvurular.",
      "Başvuru sahibinin parmak izi vermeyi veya mülakata gelmeyi reddetmesi.",
      "Sınır dışı edilmek üzereyken (son dakikada) sığınma talebinde bulunulması."
    ],
    examples: [
      "Havalimanında yakalanınca hemen sığınma isteyen 'ekonomik' göçmenler.",
      "Gerçek dışı işkence iddiaları sunanlar."
    ],
    solutions: [
      "Hızlandırılmış kararlarda itiraz süresi çok kısıtlıdır (15 gün), hemen dava açın.",
      "Dürüst ve şeffaf bilgi paylaşımı ile dosyanızı revize edin.",
      "Mazeretinizi ispatlayan yeni, somut ve acil deliller ekleyin."
    ],
    severity: 'danger',
    category: 'Protection'
  }
};
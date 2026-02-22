import React from 'react';
import { Cookie, ChevronLeft, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
            <ChevronLeft size={20} />
            Ana Sayfaya Dön
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-blue-900 mb-6 shadow-lg shadow-blue-100 border border-slate-100">
             <Cookie size={32} />
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Çerez Aydınlatma Metni</h1>
           <p className="text-slate-600 max-w-2xl mx-auto">
             Web sitemizde kullanılan çerezler, amaçları ve bunları nasıl yönetebileceğiniz hakkında detaylı bilgiler.
           </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
            
            <p className="lead border-l-4 border-blue-500 pl-4 bg-blue-50 py-4 rounded-r-lg">
              İşbu aydınlatma metni, veri sorumlusu tarafından hangi kişisel verilerinizin; hangi amaçla,
              nasıl ve hangi nedenle işlendiği, kimlerle paylaşıldığı ve ne kadar süreyle saklandığı
              konularında sizi bilgilendirmek amacıyla hazırlanmıştır. Bilgilendirme, 6698 sayılı Kişisel
              Verilerin Korunması Kanunu’nun 10’uncu maddesi kapsamında yapılmaktadır.
            </p>

            <p className="mt-6">
              <strong className="text-slate-900">ATASA DANIŞMANLIK HİZMETLERİ LİMİTED ŞİRKETİ</strong> (“ATASA” veya
              “Şirket”) olarak, veri sorumlusu sıfatıyla,
              <a href="https://atasa.tr/" className="text-blue-600 hover:underline mx-1">https://atasa.tr</a>
              internet sitemizi ziyaret ettiğinizde sizlere daha iyi bir kullanıcı deneyimi sunabilmek, hizmetlerimizi geliştirebilmek ve
              sunduğumuz danışmanlık faaliyetlerini dijital ortamda daha etkin hâle getirebilmek amacıyla
              çerezlerden faydalanmaktayız.
            </p>

            <p>
              Bu çerezlerin kullanımı başta
              <strong className="text-slate-900 mx-1">6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)</strong>
              olmak üzere tabi olduğumuz ilgili mevzuata uygun şekilde gerçekleştirilmektedir.
            </p>

            <p>
              Bu <strong className="text-slate-900">Çerez Aydınlatma Metni,</strong> internet sitemiz aracılığıyla cihazınıza yerleştirilen çerezler
              yoluyla toplanan kişisel verilerin işlenme amaçları, türleri ve bu çerezlerin yönetimine ilişkin
              sizleri bilgilendirmek amacıyla hazırlanmıştır.
            </p>

            <hr className="my-8 border-slate-200" />

            <h3 className="text-2xl mb-4 text-blue-900">Çerez Türleri ve Amaçları</h3>
            <p className="mb-4">İnternet sitemizde aşağıdaki tür çerezler kullanılmaktadır:</p>

            <div className="grid md:grid-cols-2 gap-6 my-6">
               <div className="bg-slate-50 p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-slate-900 mb-3">1. Kullanım Süresine Göre</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong className="text-slate-900">Oturum Çerezleri:</strong> Tarayıcınızı kapattığınızda silinir. Ziyaretiniz süresince oturumun sürdürülmesini sağlar.</li>
                    <li><strong className="text-slate-900">Kalıcı Çerezler:</strong> Belirli bir süre boyunca cihazınızda kalır. Site tercihlerinizi hatırlamak gibi işlevleri yerine getirir.</li>
                  </ul>
               </div>
               <div className="bg-slate-50 p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-slate-900 mb-3">2. Tarafına Göre</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong className="text-slate-900">Birinci Taraf Çerezler:</strong> Doğrudan sitemiz tarafından yerleştirilen çerezlerdir.</li>
                    <li><strong className="text-slate-900">Üçüncü Taraf Çerezler:</strong> İş ortaklarımız veya hizmet sağlayıcılarımız tarafından yerleştirilen çerezlerdir.</li>
                  </ul>
               </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">3. Amacına Göre</h4>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-slate-900">Zorunlu Çerezler:</strong> Web sitemizin temel işlevlerinin çalışabilmesi için gereklidir. Örneğin; form doldurma, oturum açma işlemleri.</li>
                <li><strong className="text-slate-900">Performans/Analitik Çerezler:</strong> Site trafiğini analiz eder, en çok ziyaret edilen sayfaları belirler. Bu veriler anonimdir.</li>
                <li><strong className="text-slate-900">Reklam/Pazarlama Çerezleri:</strong> İlgi alanlarınıza uygun içerik ve danışmanlık hizmetlerinin sunulabilmesi amacıyla kullanılır.</li>
                <li><strong className="text-slate-900">İşlevsel Çerezler:</strong> Web sitesindeki tercihlerinizi (dil, ülke seçimi, kullanıcı tercihleri) hatırlamak için kullanılır.</li>
            </ul>

            <hr className="my-8 border-slate-200" />

            <h3 className="text-xl mb-4 text-blue-900">Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepler</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong className="text-slate-900">Zorunlu çerezler:</strong> KVKK madde 5/2(c) uyarınca, bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili hizmetin (örneğin online danışmanlık başvurusu, iletişim formları) sağlanması için zorunlu olarak işlenmektedir.
                </li>
                <li>
                    <strong className="text-slate-900">Analitik ve performans çerezleri:</strong> KVKK madde 5/1 uyarınca <em className="text-slate-900 not-italic border-b border-slate-300">açık rızanıza</em> dayalı olarak kullanılmaktadır.
                </li>
                <li>
                    <strong className="text-slate-900">Reklam/Pazarlama çerezleri:</strong> İlgi alanlarınıza özel içerik sunmak için <em className="text-slate-900 not-italic border-b border-slate-300">açık rızanıza</em> dayalı olarak işlenir.
                </li>
                <li>
                    <strong className="text-slate-900">İşlevsel çerezler:</strong> Tercihlerin hatırlanması için yine <em className="text-slate-900 not-italic border-b border-slate-300">açık rızanızla</em> kullanılmaktadır.
                </li>
            </ul>

            <h3 className="text-xl mt-8 mb-4 text-blue-900">Kişisel Verilerin Toplanma Yöntemi</h3>
            <p>
                Kişisel verileriniz, internet sitemizi ziyaretiniz sırasında kullanılan çerezler aracılığıyla, otomatik yollarla dijital ortamda toplanmaktadır.
            </p>

            <h3 className="text-xl mt-8 mb-4 text-blue-900">Çerez Tercihlerinin Yönetimi</h3>
            <p>
                Web sitemizin alt kısmında yer alan "Çerez Tercihlerini Düzenle" bağlantısı aracılığıyla,
                <strong className="text-slate-900 mx-1">Zorunlu Çerezler dışındaki tüm çerez türleri için tercihlerinizi belirleyebilir ve istediğiniz zaman değiştirebilirsiniz.</strong>
            </p>

            <h3 className="text-xl mt-8 mb-4 text-blue-900">Kişisel Verilerin Aktarılması</h3>
            <p>
                Kişisel verileriniz yalnızca yukarıda belirtilen amaçlarla sınırlı kalmak kaydıyla ve yürürlükteki mevzuat uyarınca; yurt içinde yerleşik olan, hizmet sağlayıcılarımız, iş ortaklarımız ve yasal yükümlülüklerimiz kapsamında yetkili kurum ve kuruluşlarla paylaşılabilir.
            </p>

            <h3 className="text-xl mt-8 mb-4 text-blue-900">Haklarınız</h3>
            <p>KVKK’nın 11. maddesi kapsamında, çerezler aracılığıyla işlenen kişisel verilerinize ilişkin:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Bilgi talep etme,</li>
                <li>İşlenip işlenmediğini öğrenme,</li>
                <li>İşlenmişse düzeltilmesini, silinmesini ya da yok edilmesini isteme,</li>
            </ul>
            <p className="mt-2">gibi haklarınızı kullanabilirsiniz.</p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                   <FileText size={20} className="text-blue-600"/> İletişim Bilgileri
                </h4>
                <p className="text-sm mb-4">
                    Taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun şekilde yazılı olarak veya elektronik imzalı olarak 
                    <a href="mailto:info@atasa.tr" className="text-blue-600 hover:underline mx-1">info@atasa.tr</a> 
                    adresine iletebilirsiniz.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-slate-200">
                   <div>
                      <span className="block font-bold text-slate-700 text-xs uppercase tracking-wider mb-1">Veri Sorumlusu</span>
                      <span className="font-bold text-slate-900 block mb-1">ATASA DANIŞMANLIK HİZMETLERİ LİMİTED ŞİRKETİ</span>
                      <span className="text-slate-600">Mecidiyeköy Mah. Raşit Rıza Sk. Ahmet Esin İş Merkezi No: 4 İç Kapı No: 7 Şişli/İstanbul</span>
                   </div>
                   <div>
                      <span className="block font-bold text-slate-700 text-xs uppercase tracking-wider mb-1">İletişim</span>
                      <a href="mailto:info@atasa.tr" className="text-blue-600 hover:underline font-medium">info@atasa.tr</a>
                   </div>
                </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  );
};
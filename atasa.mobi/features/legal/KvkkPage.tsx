import React from 'react';
import { Shield, FileText, ChevronLeft } from 'lucide-react';
// Fix: Use type casting for react-router-dom Link to bypass missing export error
import * as Router from 'react-router-dom';
const { Link } = Router as any;

export const KvkkPage: React.FC = () => {
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
             <Shield size={32} />
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">KVKK Aydınlatma Metni</h1>
           <p className="text-slate-600 max-w-2xl mx-auto">
             Kişisel verilerinizin güvenliği bizim için önceliklidir. Aşağıda verilerinizin nasıl işlendiğine dair detaylı bilgilendirmeyi bulabilirsiniz.
           </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
            
            <h2 className="text-xl md:text-2xl mb-6 text-center border-b border-slate-100 pb-4">
              KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA <br className="hidden md:block" /> AYDINLATMA VE İLETİŞİM RIZA METNİ
            </h2>

            <p className="lead">
              İşbu aydınlatma metni, veri sorumlusu tarafından hangi kişisel verilerinizin; hangi amaçla, nasıl ve hangi nedenle işlendiği, kimlerle paylaşıldığı ve ne kadar süreyle saklandığı konularında sizi bilgilendirmek amacıyla hazırlanmıştır. Bilgilendirme, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10’uncu maddesi kapsamında yapılmaktadır.
            </p>

            <div className="mt-8 space-y-8">
              
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-blue-900">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">1</span>
                  Veri Sorumlusu
                </h3>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong>ATASA Danışmanlık Hizmetleri Ltd. Şti.</strong> (MERSİS: 0097067292000001, Adres: Mecidiyeköy Mah. Raşit Rıza Sk. Ahmet Esin İş Merkezi No:4 İç Kapı No:7 Şişli / İstanbul) tarafından işlenmektedir.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-blue-900">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">2</span>
                  Kişisel Verilerin İşlenme Amaçları
                </h3>
                <p>Toplanan kişisel verileriniz:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Hizmetlerimizi sunmak</li>
                  <li>Bilgilendirme, kampanya ve duyurular yapmak</li>
                  <li>Müşteri ilişkileri yönetmek</li>
                  <li>Yasal yükümlülükleri yerine getirmek</li>
                  <li>Talep ve şikâyetlerinizi yönetmek,</li>
                </ul>
                <p className="mt-2">amaçlarıyla KVKK’nın 5. ve 6. maddelerine uygun olarak işlenecektir.</p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-blue-900">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">3</span>
                  İşlenen Kişisel Veri Türleri
                </h3>
                <p>
                  Ad, soyad, telefon numarası, e-posta adresi, adres bilgisi, talep/mesaj içerikleri ve hizmet sürecinde paylaşılan diğer bilgiler.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-blue-900">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">4</span>
                  Kişisel Verilerin Aktarılması
                </h3>
                <p>
                  Kişisel verileriniz; hizmet aldığımız iş ortakları, tedarikçiler, bilişim altyapı sağlayıcıları, yetkili kamu kurum ve kuruluşları ile yurt içi ve yurt dışında faaliyet gösteren hizmet sağlayıcılara, KVKK’nın 8. ve 9. maddelerine uygun olarak aktarılabilecektir.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-blue-900">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">5</span>
                  Kişisel Veri Toplama Yöntemleri ve Hukuki Sebepler
                </h3>
                <p>
                  Kişisel verileriniz; ofisimiz, web sitemiz, e-posta, telefon, sosyal medya ve diğer iletişim kanalları aracılığıyla, hizmetin ifası, hukuki yükümlülük, meşru menfaat ve açık rıza hukuki sebeplerine dayanarak toplanmaktadır.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-blue-900">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">6</span>
                  KVKK Kapsamındaki Haklarınız
                </h3>
                <p>KVKK’nın 11. maddesi uyarınca;</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> İşlenip işlenmediğini öğrenme</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Bilgi talep etme</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Amacına uygun işlenip işlenmediğini öğrenme</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Aktarıldığı üçüncü kişileri öğrenme</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Düzeltme, silme veya yok edilmesini talep etme</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> İşlemeye itiraz etme</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Zararın giderilmesini talep etme</li>
                </ul>
                <p className="mt-4 font-medium">haklarına sahipsiniz.</p>
              </section>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                   <FileText size={20} className="text-blue-600"/> İletişim Bilgileri
                </h4>
                <p className="text-sm mb-4">Başvuru ve taleplerinizi yazılı olarak veya elektronik posta adresimiz üzerinden iletebilirsiniz.</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                   <div>
                      <span className="block font-bold text-slate-700">Adres:</span>
                      <span>Mecidiyeköy Mah. Raşit Rıza Sk. Ahmet Esin İş Merkezi No: 4 İç Kapı No: 7 Şişli/İstanbul</span>
                   </div>
                   <div>
                      <span className="block font-bold text-slate-700">E-Posta:</span>
                      <a href="mailto:info@atasa.tr" className="text-blue-600 hover:underline">info@atasa.tr</a>
                   </div>
                </div>
              </div>

            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Cookie, ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: "Çerez Aydınlatma Metni - Atasa Education",
    description: "Web sitemizde kullanılan çerezler, amaçları ve bunları nasıl yönetebileceğiniz hakkında detaylı bilgiler.",
};

export default function CookiePolicyPage() {
    return (
        <div className="flex-1 bg-[#F0F4F8] pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Breadcrumb / Back Link */}
                <div className="mb-8 pl-4 lg:pl-0">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
                        <ChevronLeft size={20} />
                        Ana Sayfaya Dön
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-primary mb-6 shadow-soft border border-slate-100">
                        <Cookie size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#152239] mb-4 tracking-tight">Çerez Aydınlatma Metni</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Web sitemizde kullanılan çerezler, amaçları ve bunları nasıl yönetebileceğiniz hakkında detaylı bilgiler.
                    </p>
                </div>

                {/* Content Card */}
                <div className="glass-panel rounded-[2.5rem] shadow-soft border border-white/40 p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
                    <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#152239] prose-headings:tracking-tight prose-p:text-slate-600 prose-li:text-slate-600">

                        <p className="lead border-l-4 border-primary pl-4 bg-white/60 py-4 rounded-r-2xl font-medium text-lg text-slate-700 shadow-sm">
                            İşbu aydınlatma metni, veri sorumlusu tarafından hangi kişisel verilerinizin; hangi amaçla,
                            nasıl ve hangi nedenle işlendiği, kimlerle paylaşıldığı ve ne kadar süreyle saklandığı
                            konularında sizi bilgilendirmek amacıyla hazırlanmıştır. Bilgilendirme, 6698 sayılı Kişisel
                            Verilerin Korunması Kanunu’nun 10’uncu maddesi kapsamında yapılmaktadır.
                        </p>

                        <p className="mt-8 text-lg">
                            <strong className="text-[#152239] font-black">ATASA EDUCATION DANIŞMANLIK LİMİTED ŞİRKETİ</strong> (“ATASA” veya
                            “Şirket”) olarak, veri sorumlusu sıfatıyla,
                            <Link href="https://atasaedu.com/" className="text-primary hover:underline mx-1 font-semibold">https://atasaedu.com</Link>
                            internet sitemizi ziyaret ettiğinizde sizlere daha iyi bir kullanıcı deneyimi sunabilmek, hizmetlerimizi geliştirebilmek ve
                            sunduğumuz eğitim ve danışmanlık faaliyetlerini dijital ortamda daha etkin hâle getirebilmek amacıyla
                            çerezlerden faydalanmaktayız.
                        </p>

                        <p className="text-lg">
                            Bu çerezlerin kullanımı başta
                            <strong className="text-[#152239] font-black mx-1">6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)</strong>
                            olmak üzere tabi olduğumuz ilgili mevzuata uygun şekilde gerçekleştirilmektedir.
                        </p>

                        <p className="text-lg">
                            Bu <strong className="text-[#152239] font-black">Çerez Aydınlatma Metni,</strong> internet sitemiz aracılığıyla cihazınıza yerleştirilen çerezler
                            yoluyla toplanan kişisel verilerin işlenme amaçları, türleri ve bu çerezlerin yönetimine ilişkin
                            sizleri bilgilendirmek amacıyla hazırlanmıştır.
                        </p>

                        <hr className="my-10 border-slate-200" />

                        <h3 className="text-2xl md:text-3xl mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">Çerez Türleri ve Amaçları</h3>
                        <p className="mb-6 text-lg">İnternet sitemizde aşağıdaki tür çerezler kullanılmaktadır:</p>

                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-white/60 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</div> Kullanım Süresine Göre</h4>
                                <ul className="list-none pl-0 space-y-4">
                                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">Oturum Çerezleri:</strong> Tarayıcınızı kapattığınızda silinir. Ziyaretiniz süresince oturumun sürdürülmesini sağlar.</span></li>
                                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">Kalıcı Çerezler:</strong> Belirli bir süre boyunca cihazınızda kalır. Site tercihlerinizi hatırlamak gibi işlevleri yerine getirir.</span></li>
                                </ul>
                            </div>
                            <div className="bg-white/60 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</div> Tarafına Göre</h4>
                                <ul className="list-none pl-0 space-y-4">
                                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">Birinci Taraf Çerezler:</strong> Doğrudan sitemiz tarafından yerleştirilen çerezlerdir.</span></li>
                                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">Üçüncü Taraf Çerezler:</strong> İş ortaklarımız veya hizmet sağlayıcılarımız tarafından yerleştirilen çerezlerdir.</span></li>
                                </ul>
                            </div>
                        </div>

                        <h4 className="text-xl font-black text-[#152239] mt-10 mb-6 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</div> Amacına Göre</h4>
                        <ul className="list-none pl-0 space-y-6">
                            <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                                <div>
                                    <strong className="text-[#152239] font-bold block mb-1">Zorunlu Çerezler:</strong>
                                    Web sitemizin temel işlevlerinin çalışabilmesi için gereklidir. Örneğin; form doldurma, oturum açma işlemleri.
                                </div>
                            </li>
                            <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                                <div>
                                    <strong className="text-[#152239] font-bold block mb-1">Performans/Analitik Çerezler:</strong>
                                    Site trafiğini analiz eder, en çok ziyaret edilen sayfaları belirler. Bu veriler anonimdir.
                                </div>
                            </li>
                            <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                                <div>
                                    <strong className="text-[#152239] font-bold block mb-1">Reklam/Pazarlama Çerezleri:</strong>
                                    İlgi alanlarınıza uygun içerik ve danışmanlık hizmetlerinin sunulabilmesi amacıyla kullanılır.
                                </div>
                            </li>
                            <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                                <div>
                                    <strong className="text-[#152239] font-bold block mb-1">İşlevsel Çerezler:</strong>
                                    Web sitesindeki tercihlerinizi (dil, ülke seçimi, kullanıcı tercihleri) hatırlamak için kullanılır.
                                </div>
                            </li>
                        </ul>

                        <hr className="my-10 border-slate-200" />

                        <h3 className="text-2xl md:text-3xl mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepler</h3>
                        <ul className="list-none pl-0 space-y-4 text-lg">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                                <span><strong className="text-[#152239] font-bold">Zorunlu çerezler:</strong> KVKK madde 5/2(c) uyarınca, bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili hizmetin (örneğin online danışmanlık başvurusu, iletişim formları) sağlanması için zorunlu olarak işlenmektedir.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                                <span><strong className="text-[#152239] font-bold">Analitik ve performans çerezleri:</strong> KVKK madde 5/1 uyarınca <em className="text-primary not-italic font-bold bg-primary/10 px-2 py-0.5 rounded ml-1">açık rızanıza</em> dayalı olarak kullanılmaktadır.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                                <span><strong className="text-[#152239] font-bold">Reklam/Pazarlama çerezleri:</strong> İlgi alanlarınıza özel içerik sunmak için <em className="text-primary not-italic font-bold bg-primary/10 px-2 py-0.5 rounded ml-1">açık rızanıza</em> dayalı olarak işlenir.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                                <span><strong className="text-[#152239] font-bold">İşlevsel çerezler:</strong> Tercihlerin hatırlanması için yine <em className="text-primary not-italic font-bold bg-primary/10 px-2 py-0.5 rounded ml-1">açık rızanızla</em> kullanılmaktadır.</span>
                            </li>
                        </ul>

                        <h3 className="text-2xl md:text-3xl mt-10 mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">Kişisel Verilerin Toplanma Yöntemi</h3>
                        <p className="text-lg">
                            Kişisel verileriniz, internet sitemizi ziyaretiniz sırasında kullanılan çerezler aracılığıyla, otomatik yollarla dijital ortamda toplanmaktadır.
                        </p>

                        <h3 className="text-2xl md:text-3xl mt-10 mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">Çerez Tercihlerinin Yönetimi</h3>
                        <p className="text-lg bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                            Web sitemizin alt kısmında yer alan "Tercihler" veya "Çerez Ayarları" bağlantısı aracılığıyla,
                            <strong className="text-[#152239] font-black block mt-2">Zorunlu Çerezler dışındaki tüm çerez türleri için tercihlerinizi belirleyebilir ve istediğiniz zaman değiştirebilirsiniz.</strong>
                        </p>

                        <h3 className="text-xl mt-10 mb-4 text-[#152239] font-black">Kişisel Verilerin Aktarılması</h3>
                        <p className="text-lg">
                            Kişisel verileriniz yalnızca yukarıda belirtilen amaçlarla sınırlı kalmak kaydıyla ve yürürlükteki mevzuat uyarınca; yurt içinde yerleşik olan, hizmet sağlayıcılarımız, iş ortaklarımız ve yasal yükümlülüklerimiz kapsamında yetkili kurum ve kuruluşlarla paylaşılabilir.
                        </p>

                        <h3 className="text-xl mt-10 mb-4 text-[#152239] font-black">Haklarınız</h3>
                        <p className="text-lg mb-4">KVKK’nın 11. maddesi kapsamında, çerezler aracılığıyla işlenen kişisel verilerinize ilişkin:</p>
                        <ul className="list-none pl-0 space-y-3 mb-6 bg-white/40 p-6 rounded-2xl">
                            <li className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">✓</div> Bilgi talep etme,</li>
                            <li className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">✓</div> İşlenip işlenmediğini öğrenme,</li>
                            <li className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">✓</div> İşlenmişse düzeltilmesini, silinmesini ya da yok edilmesini isteme,</li>
                        </ul>
                        <p className="text-lg font-medium text-slate-700">gibi haklarınızı kullanabilirsiniz.</p>

                        <div className="bg-white shadow-soft p-8 rounded-[2.5rem] border border-slate-100 mt-12 relative overflow-hidden">
                            {/* Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none"></div>

                            <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><FileText size={24} /></div> İletişim Bilgileri
                            </h4>
                            <p className="text-lg mb-6 leading-relaxed">
                                Taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun şekilde yazılı olarak veya elektronik imzalı olarak
                                <a href="mailto:info@atasaedu.com" className="text-primary hover:underline mx-2 font-bold px-3 py-1 bg-primary/5 rounded-lg">info@atasaedu.com</a>
                                adresine iletebilirsiniz.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100/80">
                                <div className="bg-slate-50/80 p-5 rounded-2xl">
                                    <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-2">Veri Sorumlusu</span>
                                    <span className="font-black text-[#152239] block mb-2 text-lg">ATASA EDUCATION DANIŞMANLIK LİMİTED ŞİRKETİ</span>
                                    <span className="text-slate-600 text-sm">Ataköy 7-8-10. Kısım Mah. Çobançeşme E-5, Bakırköy/İstanbul</span>
                                </div>
                                <div className="bg-slate-50/80 p-5 rounded-2xl flex flex-col justify-center">
                                    <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-2">Kurumsal İletişim</span>
                                    <a href="mailto:info@atasaedu.com" className="text-slate-800 hover:text-primary transition-colors font-black text-xl mb-1">info@atasaedu.com</a>
                                    <a href="tel:+908503086998" className="text-slate-600 hover:text-primary transition-colors font-medium">+90 (850) 308 69 98</a>
                                </div>
                            </div>
                        </div>

                    </article>
                </div>
            </div>
        </div>
    );
}

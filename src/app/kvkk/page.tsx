import React from 'react';
import { Shield, FileText, ChevronLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: "KVKK Aydınlatma Metni - Atasa Education",
    description: "Kişisel verilerinizin güvenliği bizim için önceliklidir. Verilerinizin nasıl işlendiğine dair detaylı bilgilendirme.",
};

export default function KvkkPage() {
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
                        <Shield size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#152239] mb-4 tracking-tight">KVKK Aydınlatma Metni</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Kişisel verilerinizin güvenliği bizim için önceliklidir. Aşağıda verilerinizin nasıl işlendiğine dair detaylı bilgilendirmeyi bulabilirsiniz.
                    </p>
                </div>

                {/* Content Card */}
                <div className="glass-panel rounded-[2.5rem] shadow-soft border border-white/40 p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
                    <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#152239] prose-headings:tracking-tight prose-p:text-slate-600 prose-li:text-slate-600">

                        <h2 className="text-2xl md:text-3xl mb-8 text-center border-b-2 border-slate-100 pb-6 text-primary max-w-2xl mx-auto leading-snug">
                            KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA <br className="hidden md:block" /> AYDINLATMA VE İLETİŞİM RIZA METNİ
                        </h2>

                        <p className="lead text-lg bg-white/60 p-6 rounded-2xl border-l-4 border-primary shadow-sm font-medium text-slate-700">
                            İşbu aydınlatma metni, veri sorumlusu tarafından hangi kişisel verilerinizin; hangi amaçla, nasıl ve hangi nedenle işlendiği, kimlerle paylaşıldığı ve ne kadar süreyle saklandığı konularında sizi bilgilendirmek amacıyla hazırlanmıştır. Bilgilendirme, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10’uncu maddesi kapsamında yapılmaktadır.
                        </p>

                        <div className="mt-12 space-y-10">

                            <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">1</span>
                                    Veri Sorumlusu
                                </h3>
                                <p className="text-lg">
                                    6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong className="font-black text-[#152239] bg-primary/5 px-2 py-0.5 rounded">ATASA EDUCATION DANIŞMANLIK LTD. ŞTİ.</strong> (Adres: Ataköy 7-8-10. Kısım Mah. Çobançeşme E-5, Bakırköy / İstanbul) tarafından işlenmektedir.
                                </p>
                            </section>

                            <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">2</span>
                                    Kişisel Verilerin İşlenme Amaçları
                                </h3>
                                <p className="text-lg mb-4">Toplanan kişisel verileriniz:</p>
                                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                    <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                                        <CheckCircle2 className="text-primary shrink-0" size={20} />
                                        <span className="font-medium text-slate-700">Eğitim danışmanlık hizmetlerimizi sunmak</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                                        <CheckCircle2 className="text-primary shrink-0" size={20} />
                                        <span className="font-medium text-slate-700">Bilgilendirme, kampanya ve okul duyuruları yapmak</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                                        <CheckCircle2 className="text-primary shrink-0" size={20} />
                                        <span className="font-medium text-slate-700">Öğrenci/Veli ilişkileri yönetmek</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                                        <CheckCircle2 className="text-primary shrink-0" size={20} />
                                        <span className="font-medium text-slate-700">Yasal yükümlülükleri yerine getirmek</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50 sm:col-span-2">
                                        <CheckCircle2 className="text-primary shrink-0" size={20} />
                                        <span className="font-medium text-slate-700">Üniversite başvuru ve kabul süreçlerinizi yönetmek,</span>
                                    </div>
                                </div>
                                <p className="mt-6 text-lg font-medium text-slate-700 bg-blue-50/50 p-4 rounded-xl inline-block border border-blue-100">amaçlarıyla KVKK’nın 5. ve 6. maddelerine uygun olarak işlenecektir.</p>
                            </section>

                            <div className="grid md:grid-cols-2 gap-8">
                                <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                                    <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">3</span>
                                        İşlenen Kişisel Veri Türleri
                                    </h3>
                                    <p className="text-lg">
                                        Ad, soyad, telefon numarası, e-posta adresi, eğitim geçmişi bilgileri, pasaport/kimlik bilgileri, talep/mesaj içerikleri ve üniversite başvuru sürecinde paylaşılan diğer akademik belgeler/bilgiler.
                                    </p>
                                </section>

                                <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                                    <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">4</span>
                                        Kişisel Verilerin Aktarılması
                                    </h3>
                                    <p className="text-lg">
                                        Kişisel verileriniz; başvurulan partner üniversiteler, eğitim kurumları, vize danışmanları, bilişim altyapı sağlayıcıları ve yasal yetkili kurumlar ile KVKK’nın 8. ve 9. maddelerine uygun olarak aktarılabilecektir.
                                    </p>
                                </section>
                            </div>

                            <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">5</span>
                                    Kişisel Veri Toplama Yöntemleri ve Hukuki Sebepler
                                </h3>
                                <p className="text-lg">
                                    Kişisel verileriniz; ofisimiz, web sitemiz (başvuru ve iletişim formları), e-posta, telefon, sosyal medya ve seminer/fuar etkinlikleri aracılığıyla, hizmetin ifası, sözleşmenin kurulması, yasal yükümlülük ve açık rıza hukuki sebeplerine dayanarak toplanmaktadır.
                                </p>
                            </section>

                            <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">6</span>
                                    KVKK Kapsamındaki Haklarınız
                                </h3>
                                <p className="text-lg font-medium text-slate-700 mb-6">KVKK’nın 11. maddesi uyarınca;</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">İşlenip işlenmediğini öğrenme</span></div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">Bilgi talep etme</span></div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">Amacına uygun işlenmesini öğrenme</span></div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">Aktarıldığı üçüncü kişileri öğrenme</span></div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">Düzeltme veya silinmesini talep etme</span></div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">İşlemeye itiraz etme / Zarar giderme</span></div>
                                </div>
                                <p className="text-lg font-black text-[#152239] text-center bg-slate-50 py-3 rounded-xl border border-slate-100">haklarına sahipsiniz.</p>
                            </section>

                            <div className="bg-white shadow-soft p-8 md:p-10 rounded-[2.5rem] border border-slate-100 mt-12 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full pointer-events-none"></div>
                                <div className="absolute top-10 -right-5 w-20 h-20 bg-primary/5 rounded-full pointer-events-none delay-75"></div>

                                <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-3">
                                    <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><FileText size={24} /></div> İletişim Bilgileri
                                </h4>
                                <p className="text-lg mb-8 text-slate-600">Başvuru ve taleplerinizi yazılı olarak merkez ofisimize veya elektronik posta adresimiz üzerinden iletebilirsiniz.</p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 hover:border-primary/20 transition-colors">
                                        <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-3">Merkez Ofis Adresi</span>
                                        <p className="font-bold text-[#152239] leading-relaxed">
                                            Ataköy 7-8-10. Kısım Mah. <br />Çobançeşme E-5, <br />Bakırköy / İstanbul
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 hover:border-primary/20 transition-colors flex flex-col justify-center">
                                        <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-3">Elektronik İletişim</span>
                                        <a href="mailto:info@atasaedu.com" className="text-2xl font-black text-slate-800 hover:text-primary transition-colors mb-2 inline-block">info@atasaedu.com</a>
                                        <a href="tel:+908503086998" className="text-lg font-medium text-slate-600 hover:text-primary transition-colors">+90 (850) 308 69 98</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

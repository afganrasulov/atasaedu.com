"use client";

import { Container } from "@/shared/components/ui/Container";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const advantages = [
    "Başvurular ücretsizdir. Size rehberlik etmek için buradayız. Eğitim hedeflerinizi gerçekleştirmenize yardımcı olmak için bekliyoruz.",
    "Atasa Education'a özel indirimlerden otomatik olarak yararlanabilirsiniz. Ayrıca, sadece bizim aracılığımızla sunulan özel burs fırsatlarından faydalanma imkanınız bulunmaktadır.",
    "Tek bir başvuru formu ile birden fazla üniversiteye aynı anda başvurabilirsiniz. Kabul mektuplarınız, üniversiteler tarafından doğrudan e-posta adresinize gönderilecektir.",
    "Özel kontenjanlardan faydalanabilir, gerekliyse vize desteği alabilirsiniz. Ayrıca yurt veya konaklama konusunda da destek sağlıyoruz.",
    "Deneyimli danışmanlarımız, doğru bölüm ve üniversite tercihi yapmanızda size yardımcı olacaktır.",
    "Üniversiteye başlayana kadar sürecin her aşamasında destek sağlıyoruz.",
    "Üniversitenin resmi temsilcisi ile başvur!",
    "Sınavsız ve yalnızca diploma notunuzla üniversitelere kabul edilme imkanı sunuyoruz."
];

export function ApplyAdvantages() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100 uppercase tracking-wider">
                            <Sparkles size={14} />
                            <span>Avantajlarınız</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                            Atasa Education ile Başvurmanın <br />
                            <span className="text-[#0056D2]">Ayrıcalıklarını Yaşayın</span>
                        </h2>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8">
                            Türkiye'deki eğitim yolculuğunuzda size en iyi desteği sağlamak için buradayız. İşte sunduğumuz bazı avantajlar:
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {advantages.map((adv, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex gap-3 p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-100 transition-all group"
                            >
                                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <p className="text-slate-700 text-sm font-bold leading-snug">
                                    {adv}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

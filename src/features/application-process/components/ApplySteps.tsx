"use client";

import { Container } from "@/shared/components/ui/Container";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const steps = [
    {
        num: "01",
        title: "Online Başvuru",
        desc: "Başvurunuzu gerçekleştirmek için öncelikle Başvuru Formunu eksiksiz doldurmanız gerekmektedir. İlgili form üzerinden gerekli belgeleri yükleyin. Henüz hangi üniversiteye başvuracağınıza karar vermediyseniz, ilgilendiğiniz bölümleri seçmeniz yeterli olacaktır."
    },
    {
        num: "02",
        title: "Danışman İle İletişim",
        desc: "Başvurunuz bize ulaştığında, danışmanlarımız sizinle WhatsApp, e-posta veya telefon yoluyla iletişime geçecek, başvurunuz ve süreç hakkında bilgi verecektir."
    },
    {
        num: "03",
        title: "Danışman İle Randevu",
        desc: "Daha detaylı bilgi almak için ofisimize gelebilir ve eğitim uzmanlarımız tarafından sunulan ücretsiz danışmanlık hizmetlerinden faydalanabilirsiniz. Danışmanlarımız, üniversite ve bölüm seçiminden, kontenjan durumlarına, ödeme koşullarına kadar birçok konuda size yardımcı olacaktır."
    },
    {
        num: "04",
        title: "Üniversite Kabulü",
        desc: "Tercihlerinize ve kriterlerinize uygun olarak anlaşmalı olduğumuz üniversitelerden, kabul mektubunuz e-posta yoluyla gönderilecektir. Gönderilen kabul mektupları bağlayıcı nitelikte değildir, yani kayıt zorunluluğunuz yoktur. Bu mektupları bir teklif olarak değerlendirebilirsiniz."
    },
    {
        num: "05",
        title: "Üniversiteye Harç Ödemesi",
        desc: "Kabul edildiğiniz üniversite ve bölümü uygun bulduysanız, teklif mektubunda belirtilen üniversitenin resmi banka hesaplarına harç ödemenizi gerçekleştirmeniz gerekir. Harç ödemesini tüm yılı kapsayacak şekilde tek seferde ya da başlangıçta bir depozito olarak yapabilirsiniz."
    },
    {
        num: "06",
        title: "Dekont",
        desc: "Üniversiteye yaptığınız ödemenin ardından, ödeme dekontunuzu danışmanınıza WhatsApp veya E-Mail yoluyla iletmeyi unutmayın. Danışmanınız, işlemleri hızlandırmak amacıyla dekontu üniversiteyle paylaşacaktır."
    },
    {
        num: "07",
        title: "Resmi Kabul Mektubu",
        desc: "Harç ödemeniz üniversitenin banka hesabına ulaştığında, üniversite tarafından E-Mail adresinize resmi kabul mektubunuz gönderilecektir."
    },
    {
        num: "08",
        title: "Üniversite Kaydı",
        desc: "Resmi kabul mektubunuzu ve kayıt için gerekli tüm evrakları hazırlayarak üniversitenizi ziyaret edin ve kaydınızı tamamlayın."
    }
];

export function ApplySteps() {
    return (
        <section id="apply-steps-sec" className="py-24 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100 uppercase tracking-wider">
                            <Sparkles size={14} />
                            <span>Adım Adım Başvuru</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            8 Kolay Adımda <span className="text-[#0056D2]">Üniversiteli Olun!</span>
                        </h2>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed">
                            Atasa Education ile üniversite başvuruları artık çok kolay. Danışmanlarımız her adımda yanınızda olacak.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full flex items-start justify-end p-4 transition-colors group-hover:bg-blue-600">
                                <span className="text-xl font-black text-blue-600 group-hover:text-white transition-colors">
                                    {step.num}
                                </span>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Connector line for large screens */}
                            {idx < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-slate-200 z-0" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

import { Container } from "@/shared/components/ui/Container";
import { Card } from "@/shared/components/ui/Card";

const steps = [
    { num: "01", title: "Ön Görüşme ve Hedef Belirleme", icon: "💬" },
    { num: "02", title: "Uygun Program ve Bütçe Seçimi", icon: "🔍" },
    { num: "03", title: "Başvuru Evraklarının Hazırlanması", icon: "📄" },
    { num: "04", title: "Okul Kabul ve Onay Süreci", icon: "✅" },
    { num: "05", title: "Vize Başvurusu ve Oryantasyon", icon: "✈️" }
];

export function ApplicationProcess() {
    return (
        <section className="py-24 bg-white dark:bg-gray-950 min-h-screen border-b border-gray-100 dark:border-gray-800">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Nasıl Çalışıyoruz?</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        İlk günden gideceğiniz ana kadar tüm sürecinizi profesyonelce planlıyoruz.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative px-4">
                    <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 -translate-x-1/2 rounded-full hidden md:block"></div>

                    <div className="space-y-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                <div className="hidden md:flex absolute left-1/2 -ml-6 top-1/2 -mt-6 w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-600 items-center justify-center text-xl z-10 shadow-lg">
                                    {step.icon}
                                </div>
                                <div className="md:w-1/2 flex items-center justify-end"></div>
                                <div className={`md:w-1/2 flex items-center ${idx % 2 === 0 ? "justify-end text-left md:text-right" : "justify-start text-left"}`}>
                                    <Card className="p-8 w-full">
                                        <span className="text-5xl font-black text-blue-50/50 dark:text-gray-800/50 absolute top-4 right-4 z-0 pointer-events-none">{step.num}</span>
                                        <h3 className="text-xl font-bold relative z-10 mb-2">{step.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 relative z-10">
                                            Sürecin bu adımında uzman danışmanlarımız, gerekli tüm detayları sizin için şeffaf bir şekilde organize eder.
                                        </p>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

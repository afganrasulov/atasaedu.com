import { Container } from "@/shared/components/ui/Container";
import { GraduationCap, Landmark, Globe, CheckCircle } from "lucide-react";
import Image from "next/image";

const services = [
    {
        title: "Kültürel Zenginlik",
        description: "Türkiye'nin eşsiz kültürel mozaiğinde eğitim alma fırsatı.",
        icon: Globe
    },
    {
        title: "Kaliteli Eğitim",
        description: "Uluslararası standartlarda üniversitelerde lisansüstü eğitim.",
        icon: GraduationCap
    },
    {
        title: "Ekonomik Fırsatlar",
        description: "Bütçe dostu öğrenim ücretleri ve düşük yaşam maliyetleri.",
        icon: Landmark
    },
    {
        title: "Kolay Erişim",
        description: "Avrupa ve Asya'nın kesişim noktasında merkezi lokasyon.",
        icon: CheckCircle
    }
];

export function ServicesSummary() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Column - Content & Image */}
                    <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 mb-4 justify-center lg:justify-start">
                            <span className="w-12 h-[2px] bg-red-500" />
                            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Neden Bizi Seçmelisiniz?</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#152239] leading-tight mb-4">
                            Yabancı Öğrencilere Türkiye&apos;de Sınavsız Üniversite İmkanı: Geniş Eğitim Yelpazesi
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto lg:mx-0 rounded-full" />

                        <div className="relative w-full aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl mb-8 border-4 border-white group">
                            <Image
                                src="https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/university-campus.jpg"
                                alt="Students in Turkey"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <button className="bg-red-500 text-white font-bold px-10 h-14 rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-600 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                            BAŞVURU YAP
                        </button>
                    </div>

                    {/* Right Column - 2x2 Grid */}
                    <div className="w-full lg:w-7/12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <div key={index} className="bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col items-start h-full">

                                        {/* Decorative background shape */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                        <div className="relative z-10 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                            <Icon className="w-8 h-8" />
                                        </div>

                                        <h3 className="relative z-10 text-xl md:text-2xl font-black text-[#152239] mb-4 group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="relative z-10 text-gray-500 font-medium">
                                            {service.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}

import { Container } from "@/shared/components/ui/Container";
import Image from "next/image";
import { Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ekibimiz | Atasa Education",
    description: "Atasa Education uzman eğitim danışmanları ekibi. Alanında uzman, mevzuata hakim ve çözüm odaklı kadromuzla tanışın.",
};

const SUPABASE_CDN = "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/team";

const TEAM_MEMBERS = [
    {
        name: "Ömer Habib",
        role: "Genel Müdür & CEO",
        image: `${SUPABASE_CDN}/omer-habib.webp`,
        specialty: "Stratejik Yönetim & Vatandaşlık",
        featured: true
    },
    {
        name: "Pusat Habib",
        role: "Azerbaycan Şubesi Genel Müdürü",
        image: `${SUPABASE_CDN}/pusat-habib.jpg`,
        specialty: "Uluslararası İlişkiler"
    },
    {
        name: "Eda Shakir",
        role: "Türkmenistan Şubesi Genel Müdürü",
        image: `${SUPABASE_CDN}/eda-shakir.jpg`,
        specialty: "Orta Asya Operasyonları"
    },
    {
        name: "Buse Yıldız",
        role: "Çalışma İzni Departman Müdürü",
        image: `${SUPABASE_CDN}/buse-yildiz.jpg`,
        specialty: "Kurumsal Danışmanlık"
    },
    {
        name: "Sevda Tatiana Yerlikaya",
        role: "Çalışma İzni Danışmanı",
        image: `${SUPABASE_CDN}/sevda-yerlikaya.jpg`,
        specialty: "Yabancı Personel İstihdamı"
    },
    {
        name: "Royan Asker",
        role: "CMO",
        image: `${SUPABASE_CDN}/royan-asker.jpg`,
        specialty: "Dijital Pazarlama & İletişim",
        featured: true
    },
    {
        name: "Serdar Shakir",
        role: "Öğrenci İşleri Danışmanı",
        image: `${SUPABASE_CDN}/serdar-shakir.jpg`,
        specialty: "Eğitim Danışmanlığı"
    },
    {
        name: "Reza Vaez",
        role: "Yazılım Departman Müdürü",
        image: `${SUPABASE_CDN}/reza-vaez.jpg`,
        specialty: "Teknoloji & İnovasyon"
    },
    {
        name: "Gizem Varlı",
        role: "Çalışma İzni Danışmanı",
        image: `${SUPABASE_CDN}/gizem-varli.jpg`,
        specialty: "Yasal Mevzuat Takibi"
    },
    {
        name: "Nuray Shabab",
        role: "İkamet İzni Danışmanı",
        image: `${SUPABASE_CDN}/nuray-shabab.jpg`,
        specialty: "Oturum İzni Süreçleri"
    }
];

export default function AtasaEkipPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="relative bg-[#152239] py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-20" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500 rounded-full blur-[150px] opacity-10" />

                <Container className="relative z-10 text-center text-white">
                    <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 border border-white/20 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                        Uzman Kadromuz
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                        Başarımızın Arkasındaki{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">İsimler</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Alanında uzman, mevzuata hakim ve çözüm odaklı ekibimizle tanışın. Sizi dinliyor, anlıyor ve çözüyoruz.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/10 max-w-3xl mx-auto">
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-white mb-1">10K+</div>
                            <div className="text-sm text-gray-400 font-medium">Mutlu Müşteri</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-white mb-1">%98</div>
                            <div className="text-sm text-gray-400 font-medium">Başarı Oranı</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-white mb-1">8+</div>
                            <div className="text-sm text-gray-400 font-medium">Yıllık Tecrübe</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-white mb-1">3</div>
                            <div className="text-sm text-gray-400 font-medium">Ülke Ofisi</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Team Grid */}
            <section className="py-20 lg:py-28">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div
                                key={index}
                                className={`group bg-white rounded-[2.5rem] p-5 shadow-sm border transition-all duration-500 ${member.featured
                                        ? "border-blue-400 shadow-xl shadow-blue-500/10 scale-[1.02] z-10"
                                        : "border-gray-100 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2"
                                    }`}
                            >
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative bg-gray-100">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#152239]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <span className="text-white font-bold text-sm flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                            <Award className="w-4 h-4 text-yellow-400" /> {member.specialty}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center px-2 pb-4">
                                    <h3 className="text-2xl font-black text-[#152239] mb-1 tracking-tight">{member.name}</h3>
                                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
}

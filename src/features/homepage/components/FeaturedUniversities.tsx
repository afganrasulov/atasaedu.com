import { Container } from "@/shared/components/ui/Container";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

/** Fakülte/kategori bazlı görsel mapping */
const STORAGE_BASE =
    "https://khlvkvusavalbkjrwbsy.supabase.co/storage/v1/object/public/public-assets/atasaedu/home/categories";

const CATEGORY_IMAGES: Record<string, string> = {
    "Sağlık Bilimleri": `${STORAGE_BASE}/health-sciences.png`,
    Mühendislik: `${STORAGE_BASE}/engineering.png`,
    "Fen Bilimleri": `${STORAGE_BASE}/science-general.png`,
    "Sosyal Bilimler": `${STORAGE_BASE}/social-sciences.png`,
    Genel: `${STORAGE_BASE}/science-general.png`,
};

const DEFAULT_IMAGE = `${STORAGE_BASE}/science-general.png`;

/** department_tr → basit kategori eşleştirmesi */
function getCategory(facultyTr: string | null, departmentTr: string): string {
    if (facultyTr) {
        const lower = facultyTr.toLowerCase();
        if (
            lower.includes("sağlık") ||
            lower.includes("tıp") ||
            lower.includes("eczacılık") ||
            lower.includes("hemşirelik") ||
            lower.includes("diş")
        )
            return "Sağlık Bilimleri";
        if (lower.includes("mühendislik") || lower.includes("teknoloji"))
            return "Mühendislik";
        if (lower.includes("fen")) return "Fen Bilimleri";
        if (
            lower.includes("sosyal") ||
            lower.includes("hukuk") ||
            lower.includes("iktisat") ||
            lower.includes("işletme")
        )
            return "Sosyal Bilimler";
    }

    // Fallback: department adından tahmin
    const deptLower = departmentTr.toLowerCase();
    if (
        deptLower.includes("tıp") ||
        deptLower.includes("hemşirelik") ||
        deptLower.includes("diş") ||
        deptLower.includes("eczacılık") ||
        deptLower.includes("fizyoterapi")
    )
        return "Sağlık Bilimleri";
    if (deptLower.includes("mühendislik") || deptLower.includes("bilgisayar"))
        return "Mühendislik";
    if (deptLower.includes("mimarlık")) return "Mühendislik";
    if (
        deptLower.includes("psikoloji") ||
        deptLower.includes("işletme") ||
        deptLower.includes("hukuk")
    )
        return "Sosyal Bilimler";

    return "Genel";
}

interface PopularProgram {
    department_tr: string;
    faculty_tr: string | null;
    program_count: number;
    uni_count: number;
}

async function getPopularPrograms(): Promise<PopularProgram[]> {
    const { data, error } = await supabase.rpc("get_popular_departments", {
        limit_count: 6,
    });

    // Fallback: RPC yoksa direkt query
    if (error || !data) {
        const { data: rawData } = await supabase
            .from("programs")
            .select("department_tr, faculty_tr, university_id")
            .eq("is_active", true)
            .not("department_tr", "is", null);

        if (!rawData) return [];

        // Manuel gruplama
        const grouped = new Map<
            string,
            {
                faculty_tr: string | null;
                count: number;
                unis: Set<number>;
            }
        >();

        for (const row of rawData) {
            const key = row.department_tr as string;
            const existing = grouped.get(key);
            if (existing) {
                existing.count++;
                if (row.university_id) existing.unis.add(row.university_id as number);
            } else {
                grouped.set(key, {
                    faculty_tr: row.faculty_tr as string | null,
                    count: 1,
                    unis: new Set(
                        row.university_id ? [row.university_id as number] : [],
                    ),
                });
            }
        }

        return [...grouped.entries()]
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 6)
            .map(([dept, info]) => ({
                department_tr: dept,
                faculty_tr: info.faculty_tr,
                program_count: info.count,
                uni_count: info.unis.size,
            }));
    }

    return data as PopularProgram[];
}

export async function FeaturedUniversities() {
    const programs = await getPopularPrograms();

    // Eğer veri yoksa fallback göster
    if (programs.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-gray-50 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right -z-10" />

            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Column - Text & CTA */}
                    <div className="w-full lg:w-1/3 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 mb-4 justify-center lg:justify-start">
                            <span className="w-8 h-[2px] bg-red-500" />
                            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">
                                BÖLÜMLER
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#152239] leading-tight mb-6 tracking-tight">
                            En Çok Tercih Edilen Bölümleri Keşfedin!
                        </h2>
                        <p className="text-lg text-gray-500 font-medium mb-8">
                            Geleceğinizi şekillendirecek, global geçerliliği olan ve en çok
                            tercih edilen akademik programları detaylıca inceleyin.
                        </p>
                        <Link href="/universiteler">
                            <button className="bg-white text-blue-600 border border-blue-100 shadow-md hover:bg-blue-50 rounded-xl px-8 py-6 h-auto inline-flex items-center justify-center lg:justify-start gap-2 font-bold tracking-wide transition-all duration-300 w-full md:w-auto group">
                                TÜM BÖLÜMLERİ GÖR
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    {/* Right Column - Cards */}
                    <div className="w-full lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {programs.slice(0, 3).map((program, idx) => {
                                const category = getCategory(
                                    program.faculty_tr,
                                    program.department_tr,
                                );
                                const imageUrl = CATEGORY_IMAGES[category] || DEFAULT_IMAGE;

                                return (
                                    <Link
                                        key={idx}
                                        href={`/universiteler?search=${encodeURIComponent(program.department_tr)}`}
                                        className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2"
                                    >
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={imageUrl}
                                                alt={program.department_tr}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#152239]/80 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/20">
                                                    {category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-black text-[#152239] mb-3 group-hover:text-blue-600 transition-colors">
                                                {program.department_tr}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <span className="flex items-center gap-1">
                                                    <GraduationCap className="w-4 h-4" />
                                                    {program.uni_count} Üniversite
                                                </span>
                                            </div>
                                            <div className="mt-auto">
                                                <span className="flex items-center gap-2 text-blue-600 font-bold group/btn">
                                                    Detaylar
                                                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

"use client";

import { Container } from "@/shared/components/ui/Container";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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

async function fetchPopularPrograms(): Promise<PopularProgram[]> {
    try {
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
    } catch {
        return [];
    }
}

export function FeaturedUniversities() {
    const [programs, setPrograms] = useState<PopularProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        fetchPopularPrograms()
            .then(setPrograms)
            .finally(() => setLoading(false));
    }, []);

    // Loading skeleton
    if (loading) {
        return (
            <section className="py-24 bg-[#F8FAFC] overflow-hidden relative border-t border-slate-100">
                <Container>
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full lg:w-2/5 space-y-4">
                            <div className="h-4 bg-slate-200 rounded-full w-32 animate-pulse" />
                            <div className="h-12 bg-slate-200 rounded-2xl w-3/4 animate-pulse" />
                            <div className="h-6 bg-slate-100 rounded-xl w-full animate-pulse" />
                        </div>
                        <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 h-80 animate-pulse" />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        );
    }

    // Eğer veri yoksa fallback göster
    if (programs.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-[#F8FAFC] overflow-hidden relative border-t border-slate-100">
            {/* Background elements - Premium Mesh Gradient */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-50/40 via-transparent to-transparent -z-10 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Column - Text & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-2/5 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-3 mb-6 justify-center lg:justify-start">
                            <div className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-black tracking-[0.2em] border border-red-100 uppercase">
                                Popüler
                            </div>
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                                BÖLÜMLER
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] leading-[1.1] mb-8 tracking-tighter">
                            Geleceğinizi <br className="hidden lg:block" />
                            <span className="text-blue-600">Keşfetmeye</span> Başlayın
                        </h2>
                        <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Global geçerliliği olan, prestijli üniversitelerin en çok tercih edilen akademik programlarını sizin için seçtik.
                        </p>
                        <Link href="/universiteler" className="inline-block w-full md:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#0F172A] text-white shadow-2xl shadow-blue-900/10 hover:bg-blue-600 rounded-[2rem] px-10 py-5 h-auto inline-flex items-center justify-center gap-3 font-black tracking-wide transition-all duration-300 w-full md:w-auto group border border-white/10"
                            >
                                TÜM BÖLÜMLERİ GÖR
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Right Column - Cards */}
                    <div className="w-full lg:w-3/5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {programs.slice(0, 3).map((program, idx) => {
                                const category = getCategory(
                                    program.faculty_tr,
                                    program.department_tr,
                                );
                                const imageUrl = CATEGORY_IMAGES[category] || DEFAULT_IMAGE;

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={`/universiteler?search=${encodeURIComponent(program.department_tr)}`}
                                            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,85,212,0.12)] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-3"
                                        >
                                            <div className="relative h-56 w-full overflow-hidden">
                                                <Image
                                                    src={imageUrl}
                                                    alt={program.department_tr}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20 shadow-sm">
                                                        {category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-8 flex flex-col flex-grow relative">
                                                <h3 className="text-xl font-black text-[#0F172A] mb-4 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                                                    {program.department_tr}
                                                </h3>

                                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6">
                                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                                                        <GraduationCap className="w-4 h-4 text-blue-500" />
                                                        {program.uni_count} Üniversite
                                                    </span>
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                                    <span className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest group/btn">
                                                        Detaylar
                                                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

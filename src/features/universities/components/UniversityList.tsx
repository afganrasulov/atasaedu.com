"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Search, GraduationCap, Globe, Clock, ChevronLeft, ChevronRight, Loader2, BookOpen, MapPin } from "lucide-react";
import { searchPrograms, getFilterOptions, getDegreeLabel } from "@/lib/program-search";
import { getLogoUrl } from "@/lib/supabase";
import type { ProgramResult, FilterOptions } from "@/lib/program-search";

const DEGREE_LABELS: Record<string, string> = {
    BACHELOR: "Lisans",
    MASTER: "Yüksek Lisans",
    PHD: "Doktora",
    ASSOCIATE: "Önlisans",
};

export function UniversityList() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [programs, setPrograms] = useState<ProgramResult[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterOptions>({ degrees: [], languages: [] });

    // Filter state — initialize from URL params
    const [degree, setDegree] = useState(searchParams.get("degree") || "");
    const [language, setLanguage] = useState(searchParams.get("language") || "");
    const [searchText, setSearchText] = useState(searchParams.get("q") || "");

    // Load filter options
    useEffect(() => {
        getFilterOptions().then(setFilters);
    }, []);

    // Search function
    const doSearch = useCallback(async (page: number) => {
        setLoading(true);
        const result = await searchPrograms({
            degree: degree || undefined,
            language: language || undefined,
            searchText: searchText || undefined,
            page,
        });
        setPrograms(result.programs);
        setTotal(result.total);
        setTotalPages(result.totalPages);
        setCurrentPage(result.currentPage);
        setLoading(false);
    }, [degree, language, searchText]);

    // Run search on mount and filter changes
    useEffect(() => {
        doSearch(1);
    }, [doSearch]);

    // Update URL params
    const updateUrl = useCallback(() => {
        const params = new URLSearchParams();
        if (degree) params.set("degree", degree);
        if (language) params.set("language", language);
        if (searchText) params.set("q", searchText);
        router.replace(`/universiteler?${params.toString()}`, { scroll: false });
    }, [degree, language, searchText, router]);

    useEffect(() => {
        updateUrl();
    }, [degree, language, searchText, updateUrl]);

    return (
        <section className="py-16 bg-gray-50 min-h-screen">
            <Container>
                {/* Header */}
                <div className="flex flex-col mb-12 space-y-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-primary font-semibold tracking-wider uppercase text-sm">
                        <span className="w-8 h-[2px] bg-primary" />
                        <span>Program Bul</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#152239] leading-tight max-w-2xl">
                        Arzu Ettiğiniz Bölümü Bulun!
                    </h2>
                    <p className="text-gray-600 leading-relaxed max-w-4xl text-lg mt-4">
                        Yabancı öğrenciler için Türkiye&apos;nin en iyi özel üniversitelerinde eğitim almak hayal değil, gerçek.
                        Derece, dil ve bölüm adıyla arama yaparak size en uygun programı bulun.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 mb-10 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Derece</label>
                        <select
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        >
                            <option value="">Tümü</option>
                            {filters.degrees.map((d) => (
                                <option key={d} value={d}>
                                    {DEGREE_LABELS[d] || d}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Dil</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        >
                            <option value="">Tümü</option>
                            {filters.languages.map((l) => (
                                <option key={l} value={l}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-[2] w-full">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Bölüm Ara</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Bölüm veya program adı yazın..."
                                className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <Button
                            onClick={() => { setDegree(""); setLanguage(""); setSearchText(""); }}
                            variant="outline"
                            className="w-full md:w-auto h-12 px-6 border-gray-200 text-gray-600 rounded-xl"
                        >
                            Temizle
                        </Button>
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-gray-500 font-medium">
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Aranıyor...
                            </span>
                        ) : (
                            <span><strong className="text-[#152239]">{total}</strong> program bulundu</span>
                        )}
                    </p>
                    {totalPages > 1 && (
                        <p className="text-sm text-gray-400">
                            Sayfa {currentPage} / {totalPages}
                        </p>
                    )}
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                    </div>
                ) : programs.length === 0 ? (
                    <div className="text-center py-32">
                        <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-600 mb-2">Sonuç bulunamadı</h3>
                        <p className="text-gray-400">Farklı filtreler deneyebilirsiniz.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {programs.map((program) => {
                            const uni = program.universities;
                            const departmentLabel = program.department_tr || program.department || program.name;
                            const facultyLabel = program.faculty_tr || program.faculty;

                            return (
                                <div
                                    key={program.id}
                                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-5 group"
                                >
                                    {/* University Logo */}
                                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                                        {uni?.logo_url ? (
                                            <Image
                                                src={getLogoUrl(uni.logo_url)}
                                                alt={uni.name}
                                                fill
                                                className="object-contain p-2"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <GraduationCap className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-[#152239] mb-1 leading-snug group-hover:text-blue-600 transition-colors truncate">
                                            {departmentLabel}
                                        </h3>
                                        {uni && (
                                            <p className="text-sm text-gray-500 font-medium mb-3 flex items-center gap-1">
                                                {uni.name}
                                                {uni.city && (
                                                    <span className="flex items-center gap-0.5 text-gray-400">
                                                        <MapPin className="w-3.5 h-3.5" /> {uni.city}
                                                    </span>
                                                )}
                                            </p>
                                        )}
                                        {facultyLabel && (
                                            <p className="text-xs text-gray-400 mb-3">{facultyLabel}</p>
                                        )}

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {program.degree && (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                                                    <GraduationCap className="w-3.5 h-3.5" />
                                                    {getDegreeLabel(program.degree)}
                                                </span>
                                            )}
                                            {program.language && (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold">
                                                    <Globe className="w-3.5 h-3.5" />
                                                    {program.language}
                                                </span>
                                            )}
                                            {program.years && (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {program.years} Yıl
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link
                                            href="/iletisim"
                                            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
                                        >
                                            Başvur →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                        <button
                            onClick={() => doSearch(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                            let pageNum: number;
                            if (totalPages <= 7) {
                                pageNum = i + 1;
                            } else if (currentPage <= 4) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 3) {
                                pageNum = totalPages - 6 + i;
                            } else {
                                pageNum = currentPage - 3 + i;
                            }
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => doSearch(pageNum)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${pageNum === currentPage
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => doSearch(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </Container>
        </section>
    );
}

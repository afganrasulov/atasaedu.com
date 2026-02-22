import { supabase } from "./supabase";

export interface ProgramResult {
    id: number;
    name: string;
    department: string | null;
    department_tr: string | null;
    faculty: string | null;
    faculty_tr: string | null;
    degree: string | null;
    language: string | null;
    years: number | null;
    universities: {
        id: number;
        name: string;
        city: string | null;
        logo_url: string | null;
    } | null;
}

export interface SearchResult {
    programs: ProgramResult[];
    total: number;
    totalPages: number;
    currentPage: number;
}

export interface FilterOptions {
    degrees: string[];
    languages: string[];
}

const DEGREE_MAP: Record<string, string[]> = {
    BACHELOR: ["BACHELOR", "Lisans"],
    MASTER: ["MASTER", "Yüksek Lisans", "MASTER WITH THESIS", "MASTER NON THESIS"],
    PHD: ["PHD", "Doktora"],
    ASSOCIATE: ["ASSOCIATE", "Önlisans"],
};

const DEGREE_LABELS: Record<string, string> = {
    BACHELOR: "Lisans",
    MASTER: "Yüksek Lisans",
    PHD: "Doktora",
    ASSOCIATE: "Önlisans",
};

export function getDegreeLabel(degree: string): string {
    for (const [key, label] of Object.entries(DEGREE_LABELS)) {
        if (DEGREE_MAP[key]?.some((d) => d.toLowerCase() === degree.toLowerCase())) {
            return label;
        }
    }
    return degree;
}

export async function getFilterOptions(): Promise<FilterOptions> {
    const { data } = await supabase
        .from("programs")
        .select("degree, language")
        .eq("is_active", true);

    if (!data) return { degrees: [], languages: [] };

    const degrees = [...new Set(data.map((d) => d.degree).filter(Boolean))] as string[];
    const languages = [...new Set(data.map((d) => d.language).filter(Boolean))].sort() as string[];

    // Normalize degrees to main categories
    const normalizedDegrees: string[] = [];
    for (const key of Object.keys(DEGREE_MAP)) {
        if (degrees.some((d) => DEGREE_MAP[key].some((m) => m.toLowerCase() === d.toLowerCase()))) {
            normalizedDegrees.push(key);
        }
    }

    return {
        degrees: normalizedDegrees,
        languages,
    };
}

export async function searchPrograms({
    degree,
    language,
    searchText,
    page = 1,
    limit = 20,
}: {
    degree?: string;
    language?: string;
    searchText?: string;
    page?: number;
    limit?: number;
}): Promise<SearchResult> {
    const offset = (page - 1) * limit;

    let query = supabase
        .from("programs")
        .select(
            `
            id, name, department, department_tr,
            faculty, faculty_tr, degree, language, years,
            universities(id, name, city, logo_url)
        `,
            { count: "exact" }
        )
        .eq("is_active", true);

    // Derece filtresi
    if (degree) {
        const terms = DEGREE_MAP[degree] || [degree];
        const orQuery = terms.map((t) => `degree.ilike.%${t}%`).join(",");
        query = query.or(orQuery);
    }

    // Dil filtresi
    if (language) {
        query = query.eq("language", language);
    }

    // Metin araması
    if (searchText) {
        query = query.or(
            `name.ilike.%${searchText}%,department.ilike.%${searchText}%,department_tr.ilike.%${searchText}%`
        );
    }

    const { data, count, error } = await query
        .order("name")
        .range(offset, offset + limit - 1);

    if (error) {
        console.error("Program search error:", error);
        return { programs: [], total: 0, totalPages: 0, currentPage: page };
    }

    return {
        programs: (data as unknown as ProgramResult[]) || [],
        total: count ?? 0,
        totalPages: count ? Math.ceil(count / limit) : 0,
        currentPage: page,
    };
}

export interface Suggestion {
    label: string;
    degree: string | null;
    universityName: string | null;
}

export async function autocompleteSuggestions(
    text: string
): Promise<Suggestion[]> {
    if (!text || text.length < 2) return [];

    const { data, error } = await supabase
        .from("programs")
        .select("department_tr, department, degree, universities(name)")
        .eq("is_active", true)
        .or(
            `name.ilike.%${text}%,department.ilike.%${text}%,department_tr.ilike.%${text}%`
        )
        .limit(20);

    if (error || !data) return [];

    // Deduplicate by department name
    const seen = new Set<string>();
    const suggestions: Suggestion[] = [];

    for (const item of data) {
        const label = (item.department_tr || item.department || "") as string;
        const key = label.toLowerCase();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        const uni = item.universities as unknown as { name: string } | null;
        suggestions.push({
            label,
            degree: item.degree as string | null,
            universityName: uni?.name ?? null,
        });
        if (suggestions.length >= 8) break;
    }

    return suggestions;
}


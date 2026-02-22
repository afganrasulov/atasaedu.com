"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, GraduationCap } from "lucide-react";
import { getFilterOptions, autocompleteSuggestions, getDegreeLabel } from "@/lib/program-search";
import type { FilterOptions, Suggestion } from "@/lib/program-search";

const DEGREE_LABELS: Record<string, string> = {
    BACHELOR: "Lisans",
    MASTER: "Yüksek Lisans",
    PHD: "Doktora",
    ASSOCIATE: "Önlisans",
};

export function ProgramSearchSection() {
    const router = useRouter();
    const [filters, setFilters] = useState<FilterOptions>({ degrees: [], languages: [] });
    const [degree, setDegree] = useState("");
    const [language, setLanguage] = useState("");
    const [searchText, setSearchText] = useState("");

    // Autocomplete state
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getFilterOptions().then(setFilters);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Debounced autocomplete
    const fetchSuggestions = useCallback((text: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (text.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        debounceRef.current = setTimeout(async () => {
            const results = await autocompleteSuggestions(text);
            setSuggestions(results);
            setShowSuggestions(results.length > 0);
            setActiveIndex(-1);
        }, 300);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchText(val);
        fetchSuggestions(val);
    };

    const selectSuggestion = (suggestion: Suggestion) => {
        setSearchText(suggestion.label);
        setShowSuggestions(false);
        // Navigate immediately
        const params = new URLSearchParams();
        if (degree) params.set("degree", degree);
        if (language) params.set("language", language);
        params.set("q", suggestion.label);
        router.push(`/universiteler?${params.toString()}`);
    };

    const handleSearch = () => {
        setShowSuggestions(false);
        const params = new URLSearchParams();
        if (degree) params.set("degree", degree);
        if (language) params.set("language", language);
        if (searchText) params.set("q", searchText);
        router.push(`/universiteler?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions) {
            if (e.key === "Enter") handleSearch();
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0 && suggestions[activeIndex]) {
                selectSuggestion(suggestions[activeIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    return (
        <section className="relative w-full bg-blue-600 py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-blue-700/20 backdrop-blur-sm pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center justify-center text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-md mb-4 shadow-lg shadow-blue-900/20">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-white font-semibold tracking-wide text-sm uppercase">Başvuru Yap</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
                        Arzu ettiğiniz bölümü bulun!
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto bg-white/10 border border-white/20 backdrop-blur-md p-4 md:p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                        <select
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            className="w-full h-12 rounded-xl border border-white/30 bg-white/80 backdrop-blur-sm px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                        >
                            <option value="">Derece</option>
                            {filters.degrees.map((d) => (
                                <option key={d} value={d}>
                                    {DEGREE_LABELS[d] || d}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 w-full">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full h-12 rounded-xl border border-white/30 bg-white/80 backdrop-blur-sm px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                        >
                            <option value="">Dil</option>
                            {filters.languages.map((l) => (
                                <option key={l} value={l}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search input with autocomplete */}
                    <div className="flex-[2] w-full relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchText}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            placeholder="Bölüm Ara..."
                            autoComplete="off"
                            className="w-full h-12 rounded-xl border border-white/30 bg-white/80 backdrop-blur-sm px-4 pr-12 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

                        {/* Autocomplete Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div
                                ref={dropdownRef}
                                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                            >
                                {suggestions.map((suggestion, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => selectSuggestion(suggestion)}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${idx === activeIndex ? "bg-blue-50" : "hover:bg-gray-50"
                                            } ${idx > 0 ? "border-t border-gray-50" : ""}`}
                                    >
                                        <GraduationCap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-gray-800 text-sm truncate">
                                                {suggestion.label}
                                            </p>
                                            <p className="text-xs text-gray-400 truncate">
                                                {suggestion.universityName}
                                                {suggestion.degree && ` · ${getDegreeLabel(suggestion.degree)}`}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-auto mt-2 md:mt-0">
                        <button
                            onClick={handleSearch}
                            className="w-full md:w-auto h-12 px-8 bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 text-white font-bold tracking-wide rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300 group"
                        >
                            ARA
                            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

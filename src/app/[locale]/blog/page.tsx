"use client";

import { Container } from "@/shared/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Search, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/blog/blogService";
import { useTranslations } from "next-intl";

interface PostsResponse {
    posts: BlogPost[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function BlogPage() {
    const t = useTranslations("blogPage");

    const [data, setData] = useState<PostsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    async function fetchPosts() {
        setLoading(true);
        try {
            const res = await fetch(`/api/blog/posts?page=${page}&limit=9`);
            const json = await res.json();
            setData(json);
        } catch {
            // silently fail
        } finally {
            setLoading(false);
        }
    }

    const categories = [
        "Türkiye'de Yaşam",
        "Üniversite Bölümleri",
        "Türkiye'de Eğitim",
        "Kişisel Gelişim",
    ];

    const filteredPosts = selectedCategory
        ? data?.posts.filter((p) => p.category === selectedCategory)
        : data?.posts;

    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#0047BB] via-[#0055D4] to-[#2979FF] py-24 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
                </div>

                <Container>
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Search className="w-4 h-4 text-white/80" />
                            <span className="text-white/90 text-sm font-medium">
                                {t("heroBadge")}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            {t("heroTitle")}
                        </h1>
                        <p className="text-xl text-white/80 max-w-xl mx-auto">
                            {t("heroDescription")}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Categories */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-30 backdrop-blur-xl bg-white/90">
                <Container>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${!selectedCategory
                                    ? "bg-[#0055D4] text-white shadow-lg shadow-blue-200"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <Tag className="w-4 h-4" />
                            <span>{t("categoryAll")}</span>
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                        ? "bg-[#0055D4] text-white shadow-lg shadow-blue-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Posts Grid */}
            <section className="py-16 bg-gray-50/50">
                <Container>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-3xl overflow-hidden animate-pulse"
                                >
                                    <div className="h-56 bg-gray-200" />
                                    <div className="p-8 space-y-4">
                                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                                        <div className="h-6 bg-gray-200 rounded w-full" />
                                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredPosts && filteredPosts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="group flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                                            {post.image_url ? (
                                                <Image
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-2xl bg-[#0055D4]/10 flex items-center justify-center">
                                                        <Search className="w-8 h-8 text-[#0055D4]/40" />
                                                    </div>
                                                </div>
                                            )}
                                            {post.category && (
                                                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0055D4] px-3 py-1 rounded-full text-xs font-bold">
                                                    {post.category}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow p-8">
                                            <div className="flex items-center space-x-2 text-sm text-gray-400 font-medium mb-4">
                                                <Calendar className="w-4 h-4 text-[#0055D4]" />
                                                <span>
                                                    {post.published_at
                                                        ? new Date(post.published_at).toLocaleDateString(
                                                            "tr-TR",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        )
                                                        : ""}
                                                </span>
                                            </div>
                                            <h2 className="text-xl font-bold text-[#152239] mb-4 group-hover:text-[#0055D4] transition-colors leading-snug line-clamp-2">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="before:absolute before:inset-0"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h2>
                                            <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto">
                                                <span className="inline-flex items-center space-x-2 text-[#0055D4] font-semibold text-sm group-hover:space-x-3 transition-all">
                                                    <span>{t("readMore")}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {data && data.pagination.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-16">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        {t("paginationPrevious")}
                                    </button>
                                    {Array.from(
                                        { length: data.pagination.totalPages },
                                        (_, i) => i + 1
                                    ).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${p === page
                                                    ? "bg-[#0055D4] text-white shadow-lg shadow-blue-200"
                                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() =>
                                            setPage((p) =>
                                                Math.min(data.pagination.totalPages, p + 1)
                                            )
                                        }
                                        disabled={page === data.pagination.totalPages}
                                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        {t("paginationNext")}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-24">
                            <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-[#0055D4]/40" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#152239] mb-3">
                                {t("noPostsTitle")}
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                {t("noPostsDescription")}
                            </p>
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
}

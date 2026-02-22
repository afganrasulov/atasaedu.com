"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText } from "lucide-react";

export function DualActionCards() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

                    {/* Working Permit Card (Blue Theme) */}
                    <div className="relative group overflow-hidden bg-blue-50 border border-blue-100 rounded-3xl p-8 lg:p-12 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:opacity-10" />

                        <div className="relative z-10 flex flex-col items-start h-full">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 pr-12">
                                Öğrenci Çalışma İzni
                            </h3>

                            <div className="mt-auto">
                                <Link href="/ogrenci-calisma-izni" className="bg-white text-blue-600 border border-blue-100 shadow-sm hover:shadow-md hover:bg-blue-50 rounded-xl px-6 h-12 inline-flex items-center gap-2 font-bold transition-all duration-300 group/btn">
                                    BİLGİ AL
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Residence Permit Card (Red Theme) */}
                    <div className="relative group overflow-hidden bg-red-50 border border-red-100 rounded-3xl p-8 lg:p-12 hover:shadow-2xl hover:shadow-red-100 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:opacity-10" />

                        <div className="relative z-10 flex flex-col items-start h-full">
                            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 pr-12">
                                Öğrenci İkamet İzni
                            </h3>

                            <div className="mt-auto">
                                <Link href="/ogrenci-ikamet-izni" className="bg-white text-red-500 border border-red-100 shadow-sm hover:shadow-md hover:bg-red-50 rounded-xl px-6 h-12 inline-flex items-center gap-2 font-bold transition-all duration-300 group/btn">
                                    BİLGİ AL
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

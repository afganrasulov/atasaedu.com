import { Container } from "./Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
    title: string;
    breadcrumbs: { label: string; href: string }[];
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
    return (
        <section className="bg-[#152239] py-16 md:py-24 relative overflow-hidden">
            <Container className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    {title}
                </h1>
                <div className="flex items-center space-x-2 text-gray-300 text-sm md:text-base">
                    {breadcrumbs.map((crumb, idx) => (
                        <div key={idx} className="flex items-center">
                            {idx > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                            <Link
                                href={crumb.href}
                                className={`transition-colors ${idx === breadcrumbs.length - 1 ? 'text-white font-medium' : 'hover:text-white'}`}
                            >
                                {crumb.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

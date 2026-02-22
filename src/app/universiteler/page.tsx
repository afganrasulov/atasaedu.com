import { Suspense } from "react";
import { PageTransition } from "@/shared/components/layout/PageTransition";
import { UniversityList } from "@/features/universities/components/UniversityList";
import { AboutContact } from "@/features/about/components/AboutContact";

export default function UniversitiesPage() {
    return (
        <PageTransition>
            <Suspense fallback={<div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" /></div>}>
                <UniversityList />
            </Suspense>
            <AboutContact />
        </PageTransition>
    );
}


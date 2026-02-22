import { PageTransition } from "@/shared/components/layout/PageTransition";
import { AboutCompany } from "@/features/about/components/AboutCompany";
import { Timeline } from "@/features/about/components/Timeline";
import { AboutAdvantages } from "@/features/about/components/AboutAdvantages";
import { AboutContact } from "@/features/about/components/AboutContact";

export default function AboutPage() {
    return (
        <PageTransition>
            <AboutCompany />
            <AboutAdvantages />
            <Timeline />
            <AboutContact />
        </PageTransition>
    );
}

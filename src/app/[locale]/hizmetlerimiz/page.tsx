import { PageTransition } from "@/shared/components/layout/PageTransition";
import { ServiceList } from "@/features/services/components/ServiceList";
import { AboutContact } from "@/features/about/components/AboutContact";

export default function ServicesPage() {
    return (
        <PageTransition>
            <ServiceList />
            <AboutContact />
        </PageTransition>
    );
}

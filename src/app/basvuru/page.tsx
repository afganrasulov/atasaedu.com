import { PageTransition } from "@/shared/components/layout/PageTransition";
import { ApplyHero } from "@/features/application-process/components/ApplyHero";
import { ApplyWhyUs } from "@/features/application-process/components/ApplyWhyUs";
import { ApplySteps } from "@/features/application-process/components/ApplySteps";
import { ApplyAdvantages } from "@/features/application-process/components/ApplyAdvantages";
import { ApplyDocuments } from "@/features/application-process/components/ApplyDocuments";

export default function ApplicationPage() {
    return (
        <PageTransition>
            <ApplyHero />
            <ApplyWhyUs />
            <ApplySteps />
            <ApplyAdvantages />
            <ApplyDocuments />
        </PageTransition>
    );
}

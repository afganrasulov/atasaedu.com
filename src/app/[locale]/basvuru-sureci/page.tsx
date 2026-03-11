import { PageTransition } from "@/shared/components/layout/PageTransition";
import { ApplyHero } from "@/features/application-process/components/ApplyHero";
import { ApplyWhyUs } from "@/features/application-process/components/ApplyWhyUs";
import { ApplySteps } from "@/features/application-process/components/ApplySteps";
import { ApplyAdvantages } from "@/features/application-process/components/ApplyAdvantages";
import { ApplyDocuments } from "@/features/application-process/components/ApplyDocuments";

export const metadata = {
    title: "Başvuru Süreci | Atasa Education",
    description: "Yabancı uyruklu öğrenciler için Türkiye'deki üniversitelere başvuru ve kayıt süreci rehberi. 8 adımda üniversiteli olun.",
};

export default function ApplicationProcessPage() {
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

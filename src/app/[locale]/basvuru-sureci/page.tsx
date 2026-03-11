import { PageTransition } from "@/shared/components/layout/PageTransition";
import { ApplyHero } from "@/features/application-process/components/ApplyHero";
import { ApplyWhyUs } from "@/features/application-process/components/ApplyWhyUs";
import { ApplySteps } from "@/features/application-process/components/ApplySteps";
import { ApplyAdvantages } from "@/features/application-process/components/ApplyAdvantages";
import { ApplyDocuments } from "@/features/application-process/components/ApplyDocuments";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("basvuruSureciPage");
    return {
        title: t("pageTitle"),
        description: t("pageDescription")
    };
}

export default async function ApplicationProcessPage() {
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

import { PageTransition } from "@/shared/components/layout/PageTransition";
import { ResidencyPermitContent } from "@/features/student-permits/components/ResidencyPermitContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ogrenciIkametIzniPage");
  return {
    title: t("pageTitle"),
    description: t("pageDescription")
  };
}

export default async function StudentResidencyPage() {
  return (
    <PageTransition>
      <ResidencyPermitContent />
    </PageTransition>
  );
}

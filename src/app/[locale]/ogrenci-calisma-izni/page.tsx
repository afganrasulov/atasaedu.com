import { PageTransition } from "@/shared/components/layout/PageTransition";
import { WorkPermitContent } from "@/features/student-permits/components/WorkPermitContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ogrenciCalismaIzniPage");
  return {
    title: t("pageTitle"),
    description: t("pageDescription")
  };
}

export default function StudentWorkPermitPage() {
  return (
    <PageTransition>
      <WorkPermitContent />
    </PageTransition>
  );
}

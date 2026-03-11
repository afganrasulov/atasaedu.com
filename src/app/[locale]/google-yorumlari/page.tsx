import { GoogleReviewsSection } from "@/features/google-reviews/GoogleReviewsSection";
import { PageTransition } from "@/shared/components/layout/PageTransition";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("googleYorumlariPage");
  return {
    title: t("pageTitle"),
    description: t("pageDescription")
  };
}

export default async function GoogleReviewsPage() {
  return (
    <PageTransition>
      <GoogleReviewsSection />
    </PageTransition>
  );
}

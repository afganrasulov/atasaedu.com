import { GoogleReviewsSection } from "@/features/google-reviews/GoogleReviewsSection";
import { PageTransition } from "@/shared/components/layout/PageTransition";

export const metadata = {
    title: "Google Yorumları — Atasa Education",
    description: "Atasa Danışmanlık Google İşletme Profili üzerinden doğrulanmış müşteri yorumları ve puanlar.",
};

export default function GoogleReviewsPage() {
    return (
        <PageTransition>
            <GoogleReviewsSection />
        </PageTransition>
    );
}

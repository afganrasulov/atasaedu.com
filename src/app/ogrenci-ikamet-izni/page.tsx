import { PageTransition } from "@/shared/components/layout/PageTransition";
import { ResidencyPermitContent } from "@/features/student-permits/components/ResidencyPermitContent";

export const metadata = {
    title: "Öğrenci İkamet İzni | Atasa Education",
    description: "Türkiye'de üniversite eğitimi alacak yabancı öğrenciler için zorunlu olan öğrenci ikamet izni hakkında detaylı bilgi ve danışmanlık hizmetleri.",
};

export default function StudentResidencyPage() {
    return (
        <PageTransition>
            <ResidencyPermitContent />
        </PageTransition>
    );
}

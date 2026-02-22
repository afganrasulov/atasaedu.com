import { PageTransition } from "@/shared/components/layout/PageTransition";
import { WorkPermitContent } from "@/features/student-permits/components/WorkPermitContent";

export const metadata = {
    title: "Öğrenci Çalışma İzni | Atasa Education",
    description: "Türkiye'de öğrenim gören ön lisans, lisans, yüksek lisans ve doktora öğrencileri için Türkiye'de çalışma izni şartları, hakları ve süreçleri hakkında kapsamlı danışmanlık.",
};

export default function StudentWorkPermitPage() {
    return (
        <PageTransition>
            <WorkPermitContent />
        </PageTransition>
    );
}

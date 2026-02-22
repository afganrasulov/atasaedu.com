import { PageTransition } from "@/shared/components/layout/PageTransition";
import { Container } from "@/shared/components/ui/Container";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import { AboutContact } from "@/features/about/components/AboutContact";

export default function ContactPage() {
    return (
        <PageTransition>
            <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none"></div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </Container>
            </section>
            <AboutContact />
        </PageTransition>
    );
}

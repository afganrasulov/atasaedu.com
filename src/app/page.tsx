import { PageTransition } from "@/shared/components/layout/PageTransition";
import { HeroSection } from "@/features/homepage/components/HeroSection";
import { ProgramSearchSection } from "@/features/homepage/components/ProgramSearchSection";
import { FeaturedUniversities } from "@/features/homepage/components/FeaturedUniversities";
import { AboutSection } from "@/features/homepage/components/AboutSection";
import { CtaBanner } from "@/features/homepage/components/CtaBanner";
import { ServicesSummary } from "@/features/homepage/components/ServicesSummary";
import { StatsSection } from "@/features/homepage/components/StatsSection";
import { BursarySection } from "@/features/homepage/components/BursarySection";
import { TeamSection } from "@/features/homepage/components/TeamSection";
import { PartnersSection } from "@/features/homepage/components/PartnersSection";
import { DualActionCards } from "@/features/homepage/components/DualActionCards";
import { SocialProofSection } from "@/features/homepage/components/SocialProofSection";
import { TestimonialSection } from "@/features/homepage/components/TestimonialSection";

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturedUniversities />
      <ProgramSearchSection />
      <AboutSection />
      <CtaBanner />
      <ServicesSummary />
      <StatsSection />
      <BursarySection />
      <TeamSection />
      <PartnersSection />
      <DualActionCards />
      <SocialProofSection />
      <TestimonialSection />
    </PageTransition>
  );
}

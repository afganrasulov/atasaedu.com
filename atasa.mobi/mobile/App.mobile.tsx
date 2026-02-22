import React from 'react';
import * as Router from 'react-router-dom';
const { Routes, Route, Navigate, useLocation } = Router as any;
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '../features/common/PageTransition';

// Mobile Navigation Components
import { MobileTabBar } from './components/navigation/MobileTabBar';
import { HomePageMobile } from './pages/HomePage.mobile';
import { ServicesPageMobile } from './pages/ServicesPage.mobile';
import { AboutPageMobile } from './pages/AboutPage.mobile';
import { ContactPageMobile } from './pages/ContactPage.mobile';

// Feature Page Imports
import { AppointmentPage } from '../features/appointment/AppointmentPage';
import { QueryPage } from '../features/query/QueryPage';
import { AppsHubPage } from '../features/apps/AppsHubPage';
import { DeportCalculatorPage } from '../features/apps/DeportCalculatorPage';
import { TahditCodeQueryPage } from '../features/tahdit-codes/TahditCodeQueryPage';
import { VisaPenaltyCalculator } from '../features/apps/VisaPenaltyCalculator';
import { ResidencyPage } from '../features/residency/ResidencyPage';
import { WorkPermitPage } from '../features/work-permit/WorkPermitPage';
import { ShortTermResidencyPage } from '../features/residency/ShortTermResidencyPage';
import { LongTermResidencyPage } from '../features/residency/LongTermResidencyPage';
import { StudentResidencyPage } from '../features/residency/StudentResidencyPage';
import { FamilyResidencyPage } from '../features/residency/FamilyResidencyPage';
import { TemporaryWorkPermitPage } from '../features/work-permit/TemporaryWorkPermitPage';
import { IndefiniteWorkPermitPage } from '../features/work-permit/IndefiniteWorkPermitPage';
import { IndependentWorkPermitPage } from '../features/work-permit/IndependentWorkPermitPage';
import { TurquoiseCardPage } from '../features/work-permit/TurquoiseCardPage';
import { CourierWorkPermitPage } from '../features/professions/CourierWorkPermitPage';
import { RejectionGuidePage } from '../features/apps/RejectionGuidePage';
import { ProfessionsCheckerPage } from '../features/apps/ProfessionsCheckerPage';
import { WorkPermitRenewalCalculator } from '../features/apps/WorkPermitRenewalCalculator';
import { ResidencyRenewalCalculator } from '../features/apps/ResidencyRenewalCalculator';
import { ResidencyTypeQueryPage } from '../features/apps/ResidencyTypeQueryPage';
import { ResidencyLawSearchPage } from '../features/apps/ResidencyLawSearchPage';
import { EmbassyFinderPage } from '../features/apps/EmbassyFinderPage';
import { TurkmenistanVisaWizard } from '../features/apps/TurkmenistanVisaWizard';
import { WageCalculatorPage } from '../features/apps/WageCalculatorPage';
import { LongTermEligibilityWizard } from '../features/apps/LongTermEligibilityWizard';
import { BranchFinderPage } from '../features/branches/BranchFinderPage';
import { ShortsBlogPage } from '../features/blog/ShortsBlogPage';
import { ReferencesPage } from '../features/references/ReferencesPage';
import { DualCitizenshipPage } from '../features/apps/DualCitizenshipPage';
import { PassportSufficientCalculator } from '../features/apps/PassportSufficientCalculator';
import { PassportIndexPage } from '../features/passport-index/PassportIndexPage';
import { AbroadDaysCalculator } from '../features/abroad-days/AbroadDaysCalculator';
import { GoogleReviewsPage } from '../features/google-reviews/GoogleReviewsPage';
import { CitizenshipPage } from '../features/citizenship/CitizenshipPage';
import { CitizenshipExceptionalPage } from '../features/citizenship/CitizenshipExceptionalPage';
import { StudentAgeChecker } from '../features/apps/StudentAgeChecker';
import { DirectorateFinderPage } from '../features/directorates/DirectorateFinderPage';
import { VisaRegimePage } from '../features/apps/VisaRegimePage';
import { WhatsAppGroupsPage } from '../features/whatsapp-groups/WhatsAppGroupsPage';
import { BankInfoPage } from '../features/payment/BankInfoPage';

import './styles/variables.css';
import './styles/mobile.css';

export const AppMobile: React.FC = () => {
  const location = useLocation();

  return (
    <div className="mobile-view flex flex-col min-h-screen overflow-x-hidden relative">
      <main className="flex-grow pb-[90px]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Core Pages */}
            <Route path="/" element={<PageTransition><HomePageMobile /></PageTransition>} />
            <Route path="/services" element={<PageTransition><ServicesPageMobile /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPageMobile /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPageMobile /></PageTransition>} />
            <Route path="/appointment" element={<PageTransition><AppointmentPage /></PageTransition>} />
            <Route path="/evaluation/closed-areas-for-foreigners" element={<PageTransition><QueryPage /></PageTransition>} />
            <Route path="/branches" element={<PageTransition><BranchFinderPage /></PageTransition>} />
            <Route path="/blog/shorts" element={<PageTransition><ShortsBlogPage /></PageTransition>} />
            <Route path="/references" element={<PageTransition><ReferencesPage /></PageTransition>} />
            <Route path="/reviews" element={<PageTransition><GoogleReviewsPage /></PageTransition>} />
            <Route path="/payment/bank-info" element={<PageTransition><BankInfoPage /></PageTransition>} />

            {/* Residency Group */}
            <Route path="/accommodation-permit" element={<PageTransition><ResidencyPage /></PageTransition>} />
            <Route path="/accommodation-permit/short-term" element={<PageTransition><ShortTermResidencyPage /></PageTransition>} />
            <Route path="/accommodation-permit/long-term" element={<PageTransition><LongTermResidencyPage /></PageTransition>} />
            <Route path="/student-permit" element={<PageTransition><StudentResidencyPage /></PageTransition>} />
            <Route path="/accommodation-permit/family" element={<PageTransition><FamilyResidencyPage /></PageTransition>} />

            {/* Work Permit Group */}
            <Route path="/work-permit" element={<PageTransition><WorkPermitPage /></PageTransition>} />
            <Route path="/work-permit/temporary" element={<PageTransition><TemporaryWorkPermitPage /></PageTransition>} />
            <Route path="/work-permit/long-term" element={<PageTransition><IndefiniteWorkPermitPage /></PageTransition>} />
            <Route path="/work-permit/independent" element={<PageTransition><IndependentWorkPermitPage /></PageTransition>} />
            <Route path="/work-permit/turkuaz" element={<PageTransition><TurquoiseCardPage /></PageTransition>} />
            <Route path="/profession/couriers" element={<PageTransition><CourierWorkPermitPage /></PageTransition>} />

            {/* Citizenship Routes */}
            <Route path="/citizenship" element={<PageTransition><CitizenshipPage /></PageTransition>} />
            <Route path="/citizenship/exceptional" element={<PageTransition><CitizenshipExceptionalPage /></PageTransition>} />

            {/* Apps Hub & Digital Tools */}
            <Route path="/apps" element={<PageTransition><AppsHubPage /></PageTransition>} />
            <Route path="/apps/whatsapp-groups" element={<PageTransition><WhatsAppGroupsPage /></PageTransition>} />
            <Route path="/apps/visa-regime" element={<PageTransition><VisaRegimePage /></PageTransition>} />
            <Route path="/apps/abroad-days" element={<PageTransition><AbroadDaysCalculator /></PageTransition>} />
            <Route path="/apps/deport-calculator" element={<PageTransition><DeportCalculatorPage /></PageTransition>} />
            <Route path="/apps/tahdit-codes" element={<PageTransition><TahditCodeQueryPage /></PageTransition>} />
            <Route path="/apps/visa-penalty" element={<PageTransition><VisaPenaltyCalculator /></PageTransition>} />
            <Route path="/apps/rejection-guide" element={<PageTransition><RejectionGuidePage /></PageTransition>} />
            <Route path="/apps/profession-checker" element={<PageTransition><ProfessionsCheckerPage /></PageTransition>} />
            <Route path="/apps/work-permit-renewal" element={<PageTransition><WorkPermitRenewalCalculator /></PageTransition>} />
            <Route path="/apps/residency-renewal" element={<PageTransition><ResidencyRenewalCalculator /></PageTransition>} />
            <Route path="/apps/residency-type-query" element={<PageTransition><ResidencyTypeQueryPage /></PageTransition>} />
            <Route path="/apps/law-search" element={<PageTransition><ResidencyLawSearchPage /></PageTransition>} />
            <Route path="/apps/embassy-finder" element={<PageTransition><EmbassyFinderPage /></PageTransition>} />
            <Route path="/apps/turkmenistan-visa" element={<PageTransition><TurkmenistanVisaWizard /></PageTransition>} />
            <Route path="/apps/wage-calculator" element={<PageTransition><WageCalculatorPage /></PageTransition>} />
            <Route path="/apps/long-term-calculator" element={<PageTransition><LongTermEligibilityWizard /></PageTransition>} />
            <Route path="/apps/dual-citizenship" element={<PageTransition><DualCitizenshipPage /></PageTransition>} />
            <Route path="/apps/passport-check" element={<PageTransition><PassportSufficientCalculator /></PageTransition>} />
            <Route path="/apps/passport-index" element={<PageTransition><PassportIndexPage /></PageTransition>} />
            <Route path="/apps/student-age-checker" element={<PageTransition><StudentAgeChecker /></PageTransition>} />
            <Route path="/apps/directorate-finder" element={<PageTransition><DirectorateFinderPage /></PageTransition>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Persistent Mobile Navigation */}
      <MobileTabBar />
    </div>
  );
};
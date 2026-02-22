import React, { useState, useEffect, lazy, Suspense } from 'react';
import * as Router from 'react-router-dom';
const { HashRouter, Routes, Route, Navigate, useLocation } = Router as any;
import { AnimatePresence, motion } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { ShieldAlert, X, Loader2 } from 'lucide-react';
import { TrackingService } from './services/trackingService';

import { Navbar } from './features/layout/Navbar';
import { Footer } from './features/layout/Footer';
import { Home } from './features/home/Home';
import { WhatsAppProvider } from './features/whatsapp/WhatsAppContext';
import { WhatsAppModal } from './features/whatsapp/WhatsAppModal';
import { FloatingWhatsAppButton } from './features/whatsapp/FloatingWhatsAppButton';
import { SpotlightWrapper } from './features/design/SpotlightWrapper';
import { CookieConsentProvider, CookieConsentModal } from './features/legal/CookieConsent';
import { ScrollToTop } from './features/common/ScrollToTop';
import { PageTransition } from './features/common/PageTransition';

// Lazy loaded feature components
const AppointmentPage = lazy(() => import('./features/appointment/AppointmentPage').then(m => ({ default: m.AppointmentPage })));
const QueryPage = lazy(() => import('./features/query/QueryPage').then(m => ({ default: m.QueryPage })));
const KvkkPage = lazy(() => import('./features/legal/KvkkPage').then(m => ({ default: m.KvkkPage })));
const CookiePolicyPage = lazy(() => import('./features/legal/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const ContactPage = lazy(() => import('./features/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const ResidencyPage = lazy(() => import('./features/residency/ResidencyPage').then(m => ({ default: m.ResidencyPage })));
const WorkPermitPage = lazy(() => import('./features/work-permit/WorkPermitPage').then(m => ({ default: m.WorkPermitPage })));
const CourierWorkPermitPage = lazy(() => import('./features/professions/CourierWorkPermitPage').then(m => ({ default: m.CourierWorkPermitPage })));
const ShortsBlogPage = lazy(() => import('./features/blog/ShortsBlogPage').then(m => ({ default: m.ShortsBlogPage })));
const AboutPage = lazy(() => import('./features/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./features/services/ServicesPage').then(m => ({ default: m.ServicesPage })));
const BranchFinderPage = lazy(() => import('./features/branches/BranchFinderPage').then(m => ({ default: m.BranchFinderPage })));
const AppsHubPage = lazy(() => import('./features/apps/AppsHubPage').then(m => ({ default: m.AppsHubPage })));
const LongTermEligibilityWizard = lazy(() => import('./features/apps/LongTermEligibilityWizard').then(m => ({ default: m.LongTermEligibilityWizard })));
const RejectionGuidePage = lazy(() => import('./features/apps/RejectionGuidePage').then(m => ({ default: m.RejectionGuidePage })));
const ResidencyRejectionPage = lazy(() => import('./features/apps/ResidencyRejectionPage').then(m => ({ default: m.ResidencyRejectionPage })));
const ProfessionsCheckerPage = lazy(() => import('./features/apps/ProfessionsCheckerPage').then(m => ({ default: m.ProfessionsCheckerPage })));
const WorkPermitRenewalCalculator = lazy(() => import('./features/apps/WorkPermitRenewalCalculator').then(m => ({ default: m.WorkPermitRenewalCalculator })));
const ResidencyRenewalCalculator = lazy(() => import('./features/apps/ResidencyRenewalCalculator').then(m => ({ default: m.ResidencyRenewalCalculator })));
const ResidencyTypeQueryPage = lazy(() => import('./features/apps/ResidencyTypeQueryPage').then(m => ({ default: m.ResidencyTypeQueryPage })));
const ResidencyLawSearchPage = lazy(() => import('./features/apps/ResidencyLawSearchPage').then(m => ({ default: m.ResidencyLawSearchPage })));
const EmbassyFinderPage = lazy(() => import('./features/apps/EmbassyFinderPage').then(m => ({ default: m.EmbassyFinderPage })));
const TurkmenistanVisaWizard = lazy(() => import('./features/apps/TurkmenistanVisaWizard').then(m => ({ default: m.TurkmenistanVisaWizard })));
const WageCalculatorPage = lazy(() => import('./features/apps/WageCalculatorPage').then(m => ({ default: m.WageCalculatorPage })));
const VisaPenaltyCalculator = lazy(() => import('./features/apps/VisaPenaltyCalculator').then(m => ({ default: m.VisaPenaltyCalculator })));
const TahditCodeQueryPage = lazy(() => import('./features/tahdit-codes/TahditCodeQueryPage').then(m => ({ default: m.TahditCodeQueryPage })));
const DeportCalculatorPage = lazy(() => import('./features/apps/DeportCalculatorPage').then(m => ({ default: m.DeportCalculatorPage })));
const GoogleReviewsPage = lazy(() => import('./features/google-reviews/GoogleReviewsPage').then(m => ({ default: m.GoogleReviewsPage })));
const CitizenshipPage = lazy(() => import('./features/citizenship/CitizenshipPage').then(m => ({ default: m.CitizenshipPage })));
const CitizenshipExceptionalPage = lazy(() => import('./features/citizenship/CitizenshipExceptionalPage').then(m => ({ default: m.CitizenshipExceptionalPage })));
const ReferencesPage = lazy(() => import('./features/references/ReferencesPage').then(m => ({ default: m.ReferencesPage })));
const DualCitizenshipPage = lazy(() => import('./features/apps/DualCitizenshipPage').then(m => ({ default: m.DualCitizenshipPage })));
const PassportSufficientCalculator = lazy(() => import('./features/apps/PassportSufficientCalculator').then(m => ({ default: m.PassportSufficientCalculator })));
const PassportIndexPage = lazy(() => import('./features/passport-index/PassportIndexPage').then(m => ({ default: m.PassportIndexPage })));
const AbroadDaysCalculator = lazy(() => import('./features/abroad-days/AbroadDaysCalculator').then(m => ({ default: m.AbroadDaysCalculator })));
const StudentAgeChecker = lazy(() => import('./features/apps/StudentAgeChecker').then(m => ({ default: m.StudentAgeChecker })));
const DirectorateFinderPage = lazy(() => import('./features/directorates/DirectorateFinderPage').then(m => ({ default: m.DirectorateFinderPage })));
const VisaRegimePage = lazy(() => import('./features/apps/VisaRegimePage').then(m => ({ default: m.VisaRegimePage })));
const WhatsAppGroupsPage = lazy(() => import('./features/whatsapp-groups/WhatsAppGroupsPage').then(m => ({ default: m.WhatsAppGroupsPage })));
const BankInfoPage = lazy(() => import('./features/payment/BankInfoPage').then(m => ({ default: m.BankInfoPage })));

const ShortTermResidencyPage = lazy(() => import('./features/residency/ShortTermResidencyPage').then(m => ({ default: m.ShortTermResidencyPage })));
const LongTermResidencyPage = lazy(() => import('./features/residency/LongTermResidencyPage').then(m => ({ default: m.LongTermResidencyPage })));
const StudentResidencyPage = lazy(() => import('./features/residency/StudentResidencyPage').then(m => ({ default: m.StudentResidencyPage })));
const FamilyResidencyPage = lazy(() => import('./features/residency/FamilyResidencyPage').then(m => ({ default: m.FamilyResidencyPage })));

const TemporaryWorkPermitPage = lazy(() => import('./features/work-permit/TemporaryWorkPermitPage').then(m => ({ default: m.TemporaryWorkPermitPage })));
const IndefiniteWorkPermitPage = lazy(() => import('./features/work-permit/IndefiniteWorkPermitPage').then(m => ({ default: m.IndefiniteWorkPermitPage })));
const IndependentWorkPermitPage = lazy(() => import('./features/work-permit/IndependentWorkPermitPage').then(m => ({ default: m.IndependentWorkPermitPage })));
const TurquoiseCardPage = lazy(() => import('./features/work-permit/TurquoiseCardPage').then(m => ({ default: m.TurquoiseCardPage })));

import { AppMobile } from './mobile/App.mobile';
import { PushNotificationService } from './mobile/services/PushNotificationService';

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <Loader2 className="animate-spin text-blue-600" size={48} />
    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Yükleniyor...</p>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    TrackingService.trackPageView();
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/references" element={<PageTransition><ReferencesPage /></PageTransition>} />
          <Route path="/appointment" element={<PageTransition><AppointmentPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/kvkk" element={<PageTransition><KvkkPage /></PageTransition>} />
          <Route path="/cookie-policy" element={<PageTransition><CookiePolicyPage /></PageTransition>} />
          <Route path="/apps" element={<PageTransition><AppsHubPage /></PageTransition>} />
          <Route path="/citizenship" element={<PageTransition><CitizenshipPage /></PageTransition>} />
          <Route path="/citizenship/exceptional" element={<PageTransition><CitizenshipExceptionalPage /></PageTransition>} />
          <Route path="/apps/deport-calculator" element={<PageTransition><DeportCalculatorPage /></PageTransition>} />
          <Route path="/apps/tahdit-codes" element={<PageTransition><TahditCodeQueryPage /></PageTransition>} />
          <Route path="/apps/visa-penalty" element={<PageTransition><VisaPenaltyCalculator /></PageTransition>} />
          <Route path="/apps/long-term-calculator" element={<PageTransition><LongTermEligibilityWizard /></PageTransition>} />
          <Route path="/apps/rejection-guide" element={<PageTransition><RejectionGuidePage /></PageTransition>} />
          <Route path="/apps/residency-rejection" element={<PageTransition><ResidencyRejectionPage /></PageTransition>} />
          <Route path="/apps/profession-checker" element={<PageTransition><ProfessionsCheckerPage /></PageTransition>} />
          <Route path="/apps/work-permit-renewal" element={<PageTransition><WorkPermitRenewalCalculator /></PageTransition>} />
          <Route path="/apps/residency-renewal" element={<PageTransition><ResidencyRenewalCalculator /></PageTransition>} />
          <Route path="/apps/residency-type-query" element={<PageTransition><ResidencyTypeQueryPage /></PageTransition>} />
          <Route path="/apps/law-search" element={<PageTransition><ResidencyLawSearchPage /></PageTransition>} />
          <Route path="/apps/embassy-finder" element={<PageTransition><EmbassyFinderPage /></PageTransition>} />
          <Route path="/apps/turkmenistan-visa" element={<PageTransition><TurkmenistanVisaWizard /></PageTransition>} />
          <Route path="/apps/wage-calculator" element={<PageTransition><WageCalculatorPage /></PageTransition>} />
          <Route path="/apps/dual-citizenship" element={<PageTransition><DualCitizenshipPage /></PageTransition>} />
          <Route path="/apps/passport-check" element={<PageTransition><PassportSufficientCalculator /></PageTransition>} />
          <Route path="/apps/passport-index" element={<PageTransition><PassportIndexPage /></PageTransition>} />
          <Route path="/apps/abroad-days" element={<PageTransition><AbroadDaysCalculator /></PageTransition>} />
          <Route path="/apps/student-age-checker" element={<PageTransition><StudentAgeChecker /></PageTransition>} />
          <Route path="/apps/directorate-finder" element={<PageTransition><DirectorateFinderPage /></PageTransition>} />
          <Route path="/apps/visa-regime" element={<PageTransition><VisaRegimePage /></PageTransition>} />
          <Route path="/apps/whatsapp-groups" element={<PageTransition><WhatsAppGroupsPage /></PageTransition>} />
          <Route path="/reviews" element={<PageTransition><GoogleReviewsPage /></PageTransition>} />
          <Route path="/evaluation/closed-areas-for-foreigners" element={<PageTransition><QueryPage /></PageTransition>} />
          <Route path="/branches" element={<PageTransition><BranchFinderPage /></PageTransition>} />
          <Route path="/payment/bank-info" element={<PageTransition><BankInfoPage /></PageTransition>} />
          
          <Route path="/accommodation-permit" element={<PageTransition><ResidencyPage /></PageTransition>} />
          <Route path="/accommodation-permit/short-term" element={<PageTransition><ShortTermResidencyPage /></PageTransition>} />
          <Route path="/accommodation-permit/long-term" element={<PageTransition><LongTermResidencyPage /></PageTransition>} />
          <Route path="/student-permit" element={<PageTransition><StudentResidencyPage /></PageTransition>} />
          <Route path="/accommodation-permit/family" element={<PageTransition><FamilyResidencyPage /></PageTransition>} />

          <Route path="/work-permit" element={<PageTransition><WorkPermitPage /></PageTransition>} />
          <Route path="/work-permit/temporary" element={<PageTransition><TemporaryWorkPermitPage /></PageTransition>} />
          <Route path="/work-permit/long-term" element={<PageTransition><IndefiniteWorkPermitPage /></PageTransition>} />
          <Route path="/work-permit/independent" element={<PageTransition><IndependentWorkPermitPage /></PageTransition>} />
          <Route path="/work-permit/turkuaz" element={<PageTransition><TurquoiseCardPage /></PageTransition>} />
          
          <Route path="/profession/couriers" element={<PageTransition><CourierWorkPermitPage /></PageTransition>} />
          <Route path="/blog/shorts" element={<PageTransition><ShortsBlogPage /></PageTransition>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowWarning(true);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p' || e.key === 'v')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        setShowWarning(true);
      }
    };
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {showWarning && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl"
          >
            <div className="w-10 h-10 bg-red-50/20 text-red-500 rounded-full flex items-center justify-center shrink-0">
               <ShieldAlert size={24} />
            </div>
            <div>
               <p className="text-sm font-bold">İçerik Koruması Aktif</p>
               <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Telif hakları Atasa Danışmanlık'a aittir.</p>
            </div>
            <button onClick={() => setShowWarning(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export function App() {
  const [isMobile, setIsMobile] = useState(Capacitor.getPlatform() !== 'web' || window.innerWidth <= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(Capacitor.getPlatform() !== 'web' || window.innerWidth <= 1280);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (Capacitor.getPlatform() !== 'web') {
      PushNotificationService.init();
    }
  }, []);

  const content = isMobile ? (
    <HashRouter>
      <ScrollToTop />
      <AppMobile />
      <WhatsAppModal />
      <CookieConsentModal />
    </HashRouter>
  ) : (
    <HashRouter>
      <ScrollToTop />
      <SpotlightWrapper>
        <div className="min-h-screen flex flex-col text-slate-900 pb-safe">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
          <FloatingWhatsAppButton />
          <WhatsAppModal />
          <CookieConsentModal />
        </div>
      </SpotlightWrapper>
    </HashRouter>
  );

  return (
    <WhatsAppProvider>
      <CookieConsentProvider>
        <SecurityProvider>
          {content}
        </SecurityProvider>
      </CookieConsentProvider>
    </WhatsAppProvider>
  );
}
import React, { useEffect, useState } from 'react';
import { PageView, SeoPage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ProductCarousel } from './components/ProductCarousel';
import { DevelopersSection } from './components/DevelopersSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ManufacturingSection } from './components/ManufacturingSection';
import { SeoHead } from './components/SeoHead';

import { DesignPageView } from './components/Views/DesignPageView';
import { ProductPageView } from './components/Views/ProductPageView';
import { FALLBACK_DESIGN_CATEGORIES } from './data/designCategories';
import { FALLBACK_SEO_PAGES } from './data/seo';
import { MokymaiView } from './components/Views/MokymaiView';
import { DokumentaiView } from './components/Views/DokumentaiView';
import { SkaiciuoklesView } from './components/Views/SkaiciuoklesView';
import { PrivacyView } from './components/Views/PrivacyView';
import { CalculatorView } from './components/Views/CalculatorView';
import { findCalculator } from './data/calculators';
import { TinklarastisView } from './components/Views/TinklarastisView';

import { TrainingRegisterModal } from './components/Modals/TrainingRegisterModal';
import { ProjectAnalysisModal } from './components/Modals/ProjectAnalysisModal';
import { fetchSeoPages } from './api/seo';
import { CORE_VIEWS, pathForView, useAppRoute } from './routing';

const DESIGN_SLUGS = FALLBACK_DESIGN_CATEGORIES.map((item) => item.slug);

export default function App() {
  const { path, route, navigate } = useAppRoute();
  const activeView = route.view;
  const [seoPages, setSeoPages] = useState<SeoPage[]>(FALLBACK_SEO_PAGES);
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);

  useEffect(() => {
    fetchSeoPages().then(setSeoPages);
  }, []);

  useEffect(() => {
    const onOpenAnalysis = () => setAnalysisModalOpen(true);
    const onOpenCalculator = (event: Event) => {
      const href = (event as CustomEvent<{ href?: string }>).detail?.href;
      if (href) navigate(href);
    };
    window.addEventListener('helstomm-open-analysis', onOpenAnalysis as EventListener);
    window.addEventListener('helstomm-open-calculator', onOpenCalculator as EventListener);
    return () => {
      window.removeEventListener('helstomm-open-analysis', onOpenAnalysis as EventListener);
      window.removeEventListener('helstomm-open-calculator', onOpenCalculator as EventListener);
    };
  }, [navigate]);

  const setActiveView = (view: PageView) => {
    navigate(pathForView(view));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col selection:bg-[#b8cd33] selection:text-slate-950">
      <SeoHead path={path} pages={seoPages} />

      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenTrainingModal={() => setTrainingModalOpen(true)}
        onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
      />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection
              onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
              onOpenRoiCalculator={() => setActiveView('skaiciuokles')}
              setActiveView={setActiveView}
            />
            <ProductCarousel
              setActiveView={setActiveView}
              onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
            />
            <DevelopersSection
              onOpenRoiCalculator={() => setActiveView('skaiciuokles')}
              onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
            />
            <ProjectsSection
              onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
            />
            <ManufacturingSection />
          </>
        )}

        {activeView === 'igyyvendinti-projektai' && (
          <>
            <ProjectsSection
              onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
            />
            <ManufacturingSection />
          </>
        )}

        {activeView === 'gamyba' && (
          <ManufacturingSection />
        )}

        {DESIGN_SLUGS.includes(activeView) && (
          <DesignPageView
            slug={activeView}
            onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
          />
        )}

        {!CORE_VIEWS.includes(activeView) && !DESIGN_SLUGS.includes(activeView) && (
          <ProductPageView
            slug={activeView}
            onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
            onOpenSkaiciuokles={() => setActiveView('skaiciuokles')}
          />
        )}

        {activeView === 'mokymai' && (
          <MokymaiView onOpenTrainingModal={() => setTrainingModalOpen(true)} />
        )}

        {activeView === 'privatumas' && <PrivacyView />}

        {activeView === 'dokumentai' && (
          <DokumentaiView
            onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
            onOpenRoiCalculator={() => setActiveView('skaiciuokles')}
          />
        )}

        {activeView === 'skaiciuokles' && (
          <SkaiciuoklesView
            onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
            onOpenCalculator={(to) => navigate(to)}
          />
        )}

        {activeView === 'skaiciuokles' && findCalculator(route.calculatorSlug) && (
          <CalculatorView
            key={window.location.pathname + window.location.search}
            calculator={findCalculator(route.calculatorSlug)!}
            onClose={() => navigate(pathForView('skaiciuokles'))}
          />
        )}

        {activeView === 'tinklarastis' && (
          <TinklarastisView
            articleSlug={route.articleSlug}
            onOpenArticle={(slug) => navigate(pathForView('tinklarastis', slug))}
            onCloseArticle={() => navigate(pathForView('tinklarastis'))}
            onOpenAnalysisModal={() => setAnalysisModalOpen(true)}
          />
        )}
      </main>

      <Footer />

      <TrainingRegisterModal
        isOpen={trainingModalOpen}
        onClose={() => setTrainingModalOpen(false)}
      />

      <ProjectAnalysisModal
        isOpen={analysisModalOpen}
        onClose={() => setAnalysisModalOpen(false)}
      />

    </div>
  );
}

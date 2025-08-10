import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './context/LanguageContext';
import Navigation from './components/Navigation';
import About from './components/About';
import Projects from './components/Projects';
import CaseStudies from './components/CaseStudies';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollProgressBar from './components/ScrollProgressBar';
import SEO from './components/SEO';
import InfoPanel from './components/InfoPanel';
import ROICalculator from './components/ROICalculator';
import ErrorBoundary from './components/ErrorBoundary';
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const Hero = lazy(() => import('./components/Hero'));

const AppContent = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO />
      <ScrollProgressBar />
      <InfoPanel />
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
        <Navigation />
        <main id="main-content" tabIndex="-1">
          <section id="home" role="banner">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
                </div>
              }>
                <Hero />
              </Suspense>
            </ErrorBoundary>
          </section>
          <section id="about" role="region" aria-labelledby="about-heading">
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
          </section>
          <section id="projects" role="region" aria-labelledby="projects-heading">
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
          </section>
          <section id="case-studies" role="region" aria-labelledby="case-studies-heading">
            <ErrorBoundary>
              <CaseStudies />
            </ErrorBoundary>
          </section>
          <section id="skills" role="region" aria-labelledby="skills-heading">
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
          </section>
          <section id="roi-calculator" role="region" aria-labelledby="roi-heading">
            <ErrorBoundary>
              <ROICalculator />
            </ErrorBoundary>
          </section>
          <section id="contact" role="region" aria-labelledby="contact-heading">
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </section>
        </main>
        <footer className="py-8 text-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-surface">
          <p>&copy; <span className="text-blue-500 font-medium">2025</span> <span className="gradient-text font-semibold">{t('hero.name')}</span>. 
            {t('footer.text')}
          </p>
        </footer>
      </div>
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
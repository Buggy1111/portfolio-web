import { useState, lazy, Suspense, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Lazy load CaseStudyModal
const CaseStudyModal = lazy(() => import('./CaseStudyModal'));

const CaseStudies = () => {
  const { t } = useLanguage();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const getCaseStudies = (t) => [
    {
      id: 1,
      title: t('caseStudies.studies.weather.title'),
      description: t('caseStudies.studies.weather.description'),
      challenge: t('caseStudies.studies.weather.challenge'),
      solution: t('caseStudies.studies.weather.solution'),
      results: t('caseStudies.studies.weather.results'),
      technologies: ["JavaScript ES6+", "Three.js", "Web Audio API", "OpenWeatherMap API", "CSS Variables", "PWA"],
      features: t('caseStudies.studies.weather.features'),
      images: [
        "/image/pocasi/weather-app-overview-3cities.webp",
        "/image/pocasi/weather-app-7day-forecast.webp"
      ]
    },
    {
      id: 2,
      title: t('caseStudies.studies.financial.title'),
      description: t('caseStudies.studies.financial.description'),
      challenge: t('caseStudies.studies.financial.challenge'),
      solution: t('caseStudies.studies.financial.solution'),
      results: t('caseStudies.studies.financial.results'),
      technologies: ["React 18", "Firebase", "Firestore", "Web Audio API", "Tailwind CSS", "Framer Motion"],
      features: t('caseStudies.studies.financial.features'),
      images: [
        "/image/banka/financial-overview-dashboard.webp",
        "/image/banka/expense-analysis-pie-chart.webp"
      ]
    },
    {
      id: 3,
      title: t('caseStudies.studies.production.title'),
      description: t('caseStudies.studies.production.description'),
      challenge: t('caseStudies.studies.production.challenge'),
      solution: t('caseStudies.studies.production.solution'),
      results: t('caseStudies.studies.production.results'),
      technologies: ["React 18", "TypeScript", "Vite", "Zustand", "Recharts", "TailwindCSS", "XLSX"],
      features: t('caseStudies.studies.production.features'),
      images: [
        "/image/produkce/production-metrics-kpi-dashboard.webp",
        "/image/produkce/vmq-production-control-center-homepage.webp"
      ]
    },
    {
      id: 4,
      title: t('caseStudies.studies.attendance.title'),
      description: t('caseStudies.studies.attendance.description'),
      challenge: t('caseStudies.studies.attendance.challenge'),
      solution: t('caseStudies.studies.attendance.solution'),
      results: t('caseStudies.studies.attendance.results'),
      technologies: ["React", "JavaScript", "Create React App", "CSS3", "Local Storage"],
      features: t('caseStudies.studies.attendance.features'),
      images: [
        "/image/dochazka/dashboard-overview-light.webp",
        "/image/dochazka/dashboard-overview-dark.webp"
      ]
    },
    {
      id: 5,
      title: t('caseStudies.studies.waste.title'),
      description: t('caseStudies.studies.waste.description'),
      challenge: t('caseStudies.studies.waste.challenge'),
      solution: t('caseStudies.studies.waste.solution'),
      results: t('caseStudies.studies.waste.results'),
      technologies: ["React", "JavaScript", "LocalStorage", "CSS3", "Responsive Design"],
      features: t('caseStudies.studies.waste.features'),
      images: [
        "/image/waste/statistics-dashboard.webp",
        "/image/waste/waste-inventory-table.webp"
      ]
    }
  ];

  const caseStudies = useMemo(() => getCaseStudies(t), [t]);

  return (
    <section id="case-studies" className="section-padding bg-white dark:bg-dark-bg">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 id="case-studies-heading" className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-4">
            <span className="gradient-text">{t('caseStudies.title')}</span>
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16">
            {t('caseStudies.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="group cursor-pointer" onClick={() => setSelectedCaseStudy(study)}>
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm border border-white/10">
                  <div className="relative h-72">
                    <img
                      src={study.images[0]}
                      alt={`${study.title} - screenshot aplikace ukazující hlavní funkcionalitu`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Luxury overlay with glass effect */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/30 backdrop-blur-lg border-t border-white/10">
                      <h3 className="text-xl font-bold text-white mb-2 font-playfair">
                        {study.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">
                        {study.description}
                      </p>
                    </div>
                    
                    {/* Luxury badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500/90 to-blue-500/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                      {study.images.length} {t('caseStudies.modal.photos')}
                    </div>
                    
                    {/* Luxury corner accent */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl"></div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl ring-2 ring-emerald-500/0 group-hover:ring-emerald-500/30 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Modal */}
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>}>
            <CaseStudyModal 
              caseStudy={selectedCaseStudy}
              isOpen={!!selectedCaseStudy}
              onClose={() => setSelectedCaseStudy(null)}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
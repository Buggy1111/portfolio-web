import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiCheck, FiCode, FiTarget, FiTrendingUp } from 'react-icons/fi';
import ModalScrollProgress from './ModalScrollProgress';
import { useLanguage } from '../context/LanguageContext';

// Technology color mapping based on Skills component
const getTechnologyColor = (tech) => {
  const colorMap = {
    // Frontend
    'React': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-800 dark:text-cyan-200' },
    'JavaScript': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200' },
    'HTML5': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-200' },
    'CSS3': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-200' },
    'Tailwind CSS': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-800 dark:text-cyan-200' },
    'TailwindCSS': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-800 dark:text-cyan-200' },
    'Framer Motion': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-200' },
    'Three.js': { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-800 dark:text-gray-200' },
    // Backend & Tools
    'Node.js': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-200' },
    'Vite': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-200' },
    'Git': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-200' },
    'Firebase': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200' },
    'Firestore': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200' },
    // APIs
    'OpenWeatherMap API': { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-800 dark:text-sky-200' },
    'Web Audio API': { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-800 dark:text-indigo-200' },
    'Banking API': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-800 dark:text-emerald-200' },
    // Other
    'TypeScript': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-200' },
    'LocalStorage': { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-800 dark:text-gray-200' },
    'Zustand': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-200' },
    'Recharts': { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-800 dark:text-teal-200' },
    'XLSX': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-200' },
    'PWA': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-200' },
    'CSS Variables': { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-800 dark:text-pink-200' },
    'Create React App': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-800 dark:text-cyan-200' },
    'Responsive Design': { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-800 dark:text-violet-200' },
    'JavaScript ES6+': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200' },
    'React 18': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-800 dark:text-cyan-200' }
  };
  
  return colorMap[tech] || { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-800 dark:text-gray-200' };
};

// Funkce pro generování specifických alt textů podle projektu a indexu obrázku
const getImageDescription = (title, imageIndex, currentLanguage = 'cs') => {
  const imageDescriptions = {
    cs: {
      "Weather Ultimate": [
        "přehled počasí pro tři města s 3D animacemi a AI predikcemi",
        "7denní předpověď počasí s detailními statistikami",
        "předpověď pro New York s realistickými vizuálními efekty",
        "statistiky na hlavní stránce s interaktivními prvky",
        "nastavení zvukových efektů a audio konfigurace"
      ],
      "Financial Tracker": [
        "finanční dashboard s pulzujícím srdcem a KPI metrikami",
        "přihlašovací obrazovka s Firebase autentizací",
        "analýza výdajů pomocí interaktivního koláčového grafu",
        "radarový graf pro analýzu finančních vzorců",
        "seznam posledních transakcí s real-time synchronizací"
      ],
      "VMQ Výrobní Aplikace": [
        "KPI dashboard s metrikami výroby a real-time daty",
        "hlavní řídicí centrum pro správu výroby VMQ materiálů",
        "distribuce materiálů a výrobní statistiky",
        "přihlašovací obrazovka s enterprise designem"
      ],
      "Docházkový Systém": [
        "hlavní dashboard ve světlém režimu s přehledem docházky",
        "hlavní dashboard v tmavém režimu s moderním UI",
        "záložka pro zaznamenávání docházky a projektů",
        "výkazy a reporty docházky zaměstnanců",
        "statistiky a analýzy pracovní doby"
      ],
      "Sklad směsí": [
        "dashboard se statistikami a přehledy skladových směsí",
        "tabulka s inventurou odpadů a skladových zásob",
        "reporty o likvidaci odpadů a materiálů",
        "historie likvidovaných odpadů",
        "o aplikaci - modální dialog s informacemi"
      ]
    },
    en: {
      "Weather Ultimate": [
        "weather overview for three cities with 3D animations and AI predictions",
        "7-day weather forecast with detailed statistics",
        "New York forecast with realistic visual effects",
        "statistics on main page with interactive elements",
        "sound effects settings and audio configuration"
      ],
      "Financial Tracker": [
        "financial dashboard with pulsing heart and KPI metrics",
        "login screen with Firebase authentication",
        "expense analysis using interactive pie chart",
        "radar chart for financial pattern analysis",
        "list of recent transactions with real-time synchronization"
      ],
      "VMQ Production Application": [
        "KPI dashboard with production metrics and real-time data",
        "main control center for VMQ materials production management",
        "material distribution and production statistics",
        "login screen with enterprise design"
      ],
      "Attendance System": [
        "main dashboard in light mode with attendance overview",
        "main dashboard in dark mode with modern UI",
        "tab for recording attendance and projects",
        "attendance reports and employee timesheets",
        "statistics and work time analysis"
      ],
      "Warehouse Mixtures": [
        "dashboard with statistics and warehouse mixture overviews",
        "table with waste inventory and warehouse stocks",
        "reports on waste and material disposal",
        "history of disposed waste",
        "about application - modal dialog with information"
      ]
    }
  };
  
  const descriptions = imageDescriptions[currentLanguage] || imageDescriptions.cs;
  return descriptions[title]?.[imageIndex] || (currentLanguage === 'cs' ? "screenshot aplikace" : "application screenshot");
};

const ImageGallery = ({ images, title, currentLanguage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage]);

  return (
    <div className="relative group">
      <div className="relative h-96 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - screenshot ${currentIndex + 1}: ${getImageDescription(title, currentIndex, currentLanguage)}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          decoding="async"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}
        
        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-emerald-500 opacity-100' 
                  : 'border-gray-300 dark:border-gray-600 opacity-60 hover:opacity-80'
              }`}
            >
              <img
                src={image}
                alt={`${title} - ${currentLanguage === 'cs' ? 'náhled screenshotu' : 'screenshot preview'} ${index + 1}: ${getImageDescription(title, index, currentLanguage)}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CaseStudyModal = ({ caseStudy, isOpen, onClose }) => {
  const { t, currentLanguage } = useLanguage();
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!caseStudy) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FiCode className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {caseStudy.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('caseStudies.modal.caseStudyDetail')}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div ref={scrollContainerRef} className="overflow-y-auto max-h-[calc(90vh-80px)] relative">
              <ModalScrollProgress scrollContainerRef={scrollContainerRef} />
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div>
                    <ImageGallery images={caseStudy.images} title={caseStudy.title} currentLanguage={currentLanguage} />
                  </div>
                  
                  {/* Project Details */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {t('caseStudies.modal.projectDescription')}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {caseStudy.description}
                      </p>
                    </div>
                    
                    {/* Technologies */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <FiCode className="w-5 h-5 text-emerald-500" />
                        {t('caseStudies.modal.technologies')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.technologies.map((tech, index) => {
                          const colors = getTechnologyColor(tech);
                          return (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Key Features */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <FiCheck className="w-5 h-5 text-blue-500" />
                        {t('caseStudies.modal.keyFeatures')}
                      </h3>
                      <div className="space-y-2">
                        {caseStudy.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Challenge, Solution, Results */}
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                      <FiTarget className="w-5 h-5" />
                      {t('caseStudies.modal.challenge')}
                    </h3>
                    <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                      <FiCode className="w-5 h-5" />
                      {t('caseStudies.modal.solution')}
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                      <FiTrendingUp className="w-5 h-5" />
                      {t('caseStudies.modal.results')}
                    </h3>
                    <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                      {caseStudy.results}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
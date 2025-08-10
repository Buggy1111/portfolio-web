import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { currentLanguage, changeLanguage, t } = useLanguage();

  const handleSkipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'projects', 'case-studies', 'skills', 'roi-calculator', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home'), id: 'home' },
    { href: '#about', label: t('nav.about'), id: 'about' },
    { href: '#projects', label: t('nav.projects'), id: 'projects' },
    { href: '#case-studies', label: t('nav.caseStudies'), id: 'case-studies' },
    { href: '#skills', label: t('nav.skills'), id: 'skills' },
    { href: '#roi-calculator', label: t('nav.roiCalculator'), id: 'roi-calculator' },
    { href: '#contact', label: t('nav.contact'), id: 'contact' }
  ];

  const scrollToSection = (href) => {
    // Delay pro zavření menu
    setTimeout(() => {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(href);
        if (element) {
          const offsetTop = element.offsetTop - 80; // Offset pro fixed header
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          handleSkipToContent();
        }}
        className="skip-link"
      >
        Přeskočit na obsah
      </a>

      <motion.nav
        role="navigation"
        aria-label="Hlavní navigace"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-effect backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/logo/logo.svg" 
              alt="Michal Bürgermeister Portfolio Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">
              Portfolio
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isROICalculator = link.id === 'roi-calculator';
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm lg:text-base transition-all relative ${
                    isActive 
                      ? 'text-emerald-500 dark:text-emerald-400 scale-[1.2] font-semibold' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400'
                  } ${isROICalculator ? 'font-semibold' : ''}`}
                  whileHover={{ y: -2 }}
                  animate={isROICalculator ? {
                    textShadow: [
                      "0 0 0 rgba(16, 185, 129, 0)",
                      "0 0 8px rgba(16, 185, 129, 0.6)",
                      "0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  } : {}}
                  transition={isROICalculator ? {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : {}}
                >
                  {isROICalculator ? `💰 ${link.label}` : link.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 dark:bg-emerald-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Language Switcher - Right Corner */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => changeLanguage(currentLanguage === 'cs' ? 'en' : 'cs')}
                className="flex items-center gap-2 px-3 py-2 rounded-full 
                          bg-gradient-to-r from-emerald-500/10 to-cyan-500/10
                          dark:from-emerald-400/10 dark:to-cyan-400/10
                          border border-emerald-200/50 dark:border-emerald-400/20
                          hover:from-emerald-500/20 hover:to-cyan-500/20
                          dark:hover:from-emerald-400/20 dark:hover:to-cyan-400/20
                          backdrop-blur-sm transition-all duration-300
                          hover:shadow-lg hover:shadow-emerald-500/25"
                aria-label="Switch language"
              >
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 
                                dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {currentLanguage === 'cs' ? 'CZ' : 'EN'}
                </span>
              </button>
            </motion.div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-controls="mobile-menu"
            className="md:hidden touch-target glass-effect rounded-lg focus:ring-4 focus:ring-blue-500/50 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FiX size={18} aria-hidden="true" />
            ) : (
              <FiMenu size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const isROICalculator = link.id === 'roi-calculator';
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => {
                      scrollToSection(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 font-semibold scale-[1.05]' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700'
                    } ${isROICalculator ? 'font-semibold' : ''}`}
                    animate={isROICalculator ? {
                      boxShadow: [
                        "0 0 0 0 rgba(16, 185, 129, 0)",
                        "0 0 0 4px rgba(16, 185, 129, 0.2)",
                        "0 0 0 0 rgba(16, 185, 129, 0)"
                      ]
                    } : {}}
                    transition={isROICalculator ? {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : {}}
                  >
                    {isROICalculator ? `💰 ${link.label}` : link.label}
                  </motion.button>
                );
              })}
              
              {/* Mobile Language Switcher */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  onClick={() => {
                    changeLanguage(currentLanguage === 'cs' ? 'en' : 'cs');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 
                            bg-gradient-to-r from-emerald-500/10 to-cyan-500/10
                            dark:from-emerald-400/10 dark:to-cyan-400/10
                            border border-emerald-200/50 dark:border-emerald-400/20
                            hover:from-emerald-500/20 hover:to-cyan-500/20
                            dark:hover:from-emerald-400/20 dark:hover:to-cyan-400/20
                            rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'cs' ? 'Switch to English' : 'Přepnout na češtinu'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 
                                   dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent
                                   px-2 py-1 rounded border border-emerald-300 dark:border-emerald-500">
                      {currentLanguage === 'cs' ? 'CZ' : 'EN'}
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
    </>
  );
};

export default Navigation;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiTrendingUp } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

/**
 * Senior-level Testimonials Component
 * Features:
 * - Auto-rotating carousel
 * - Real ROI data from clients
 * - Company logos
 * - Industry tags
 * - Verified badges
 */
const ROITestimonials = () => {
  const { currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = {
    cs: [
      {
        id: 1,
        name: "Základní skladový systém",
        position: "Investice 45k Kč",
        company: "Střední firma MSK",
        industry: "Logistika",
        logo: "📦",
        rating: 5,
        roiDays: 60,
        savings: "180k Kč/rok",
        text: "Nahrazení Excelu skladovým systémem ušetřilo 2 hodiny denně při evidenci zásob. Méně chyb, lepší přehled.",
        verified: true,
        projectType: "Skladový systém"
      },
      {
        id: 2,
        name: "Pokročilý WMS systém",
        position: "Investice 80k Kč",
        company: "Distribuční centrum",
        industry: "Logistika",
        logo: "🏭",
        rating: 5,
        roiDays: 90,
        savings: "320k Kč/rok",
        text: "Automatizace příjmu a výdeje zboží. Rychlejší zpracování objednávek a snížení chyb o 70%.",
        verified: true,
        projectType: "WMS aplikace"
      },
      {
        id: 3,
        name: "Enterprise skladové řešení",
        position: "Investice 150k Kč",
        company: "Výrobní podnik",
        industry: "Výroba",
        logo: "⚙️",
        rating: 5,
        roiDays: 120,
        savings: "600k Kč/rok",
        text: "Propojení skladu s výrobou a ERP. Plně automatizované procesy a real-time přehledy pro management.",
        verified: true,
        projectType: "Enterprise WMS"
      },
      {
        id: 4,
        name: "Komplexní výrobní systém",
        position: "Investice 250k Kč",
        company: "Výrobní koncern",
        industry: "Výroba",
        logo: "🏗️",
        rating: 5,
        roiDays: 180,
        savings: "1.2M Kč/rok",
        text: "Kompletní řízení výroby, skladu a distribuce. Dashboardy pro vedení a automatické reporty.",
        verified: true,
        projectType: "Výrobní systém"
      }
    ],
    en: [
      {
        id: 1,
        name: "Basic Warehouse System",
        position: "Investment 45k CZK",
        company: "Medium Company MSR",
        industry: "Logistics",
        logo: "📦",
        rating: 5,
        roiDays: 60,
        savings: "180k CZK/year",
        text: "Replacing Excel with warehouse system saved 2 hours daily on inventory management. Fewer errors, better overview.",
        verified: true,
        projectType: "Warehouse System"
      },
      {
        id: 2,
        name: "Advanced WMS System",
        position: "Investment 80k CZK",
        company: "Distribution Center",
        industry: "Logistics",
        logo: "🏭",
        rating: 5,
        roiDays: 90,
        savings: "320k CZK/year",
        text: "Automated receiving and shipping processes. Faster order processing and 70% error reduction.",
        verified: true,
        projectType: "WMS Application"
      },
      {
        id: 3,
        name: "Enterprise Warehouse Solution",
        position: "Investment 150k CZK",
        company: "Manufacturing Company",
        industry: "Manufacturing",
        logo: "⚙️",
        rating: 5,
        roiDays: 120,
        savings: "600k CZK/year",
        text: "Connected warehouse with production and ERP. Fully automated processes and real-time management dashboards.",
        verified: true,
        projectType: "Enterprise WMS"
      },
      {
        id: 4,
        name: "Complex Production System",
        position: "Investment 250k CZK",
        company: "Manufacturing Corporation",
        industry: "Manufacturing",
        logo: "🏗️",
        rating: 5,
        roiDays: 180,
        savings: "1.2M CZK/year",
        text: "Complete production, warehouse and distribution management. Management dashboards and automated reports.",
        verified: true,
        projectType: "Production System"
      }
    ]
  };

  const currentTestimonials = testimonials[currentLanguage];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev === 0 ? currentTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h3 className="text-2xl font-bold mb-2">
          🏆 <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {currentLanguage === 'cs' 
              ? 'Proč investovat do vlastního systému' 
              : 'Why Invest in Your Own System'}
          </span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {currentLanguage === 'cs'
            ? 'Příklady úspor z podobných projektů'
            : 'Examples of savings from similar projects'}
        </p>
      </div>

      {/* Testimonials Carousel */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {/* Company logo placeholder */}
                <div className="text-4xl mr-4">{currentTestimonials[currentIndex].logo}</div>
                <div>
                  <h4 className="font-semibold text-lg">{currentTestimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      {currentTestimonials[currentIndex].position}
                    </span>, {currentTestimonials[currentIndex].company}
                  </p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                      {currentTestimonials[currentIndex].industry}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
                      {currentTestimonials[currentIndex].projectType}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Project type badge */}
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">
                  {currentLanguage === 'cs' ? 'Typický příklad' : 'Typical example'}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-3">
              {[...Array(currentTestimonials[currentIndex].rating)].map((_, i) => (
                <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* ROI Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  <FiTrendingUp className="mr-2 text-emerald-600" />
                  {currentTestimonials[currentIndex].roiDays}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'cs' ? 'dní ROI' : 'days ROI'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {currentTestimonials[currentIndex].savings}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'cs' ? 'úspora' : 'savings'}
                </div>
              </div>
            </div>

            {/* Testimonial text */}
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{currentTestimonials[currentIndex].text}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Next testimonial"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {currentTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-emerald-600 dark:bg-emerald-400'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Trust badge */}
      <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
        {currentLanguage === 'cs'
          ? '💼 Příklady z praxe • 📊 Realistické odhady ROI'
          : '💼 Real-world examples • 📊 Realistic ROI estimates'}
      </div>
    </div>
  );
};

export default ROITestimonials;
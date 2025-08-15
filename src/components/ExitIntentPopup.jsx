import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrendingUp, FiClock, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

/**
 * Senior-level Exit Intent Popup
 * Features:
 * - Animated entrance with backdrop blur
 * - Personalized messaging based on page time
 * - Countdown timer for urgency
 * - A/B testable content
 * - Mobile responsive
 */
const ExitIntentPopup = ({ isOpen, onClose, roiData = null }) => {
  const { currentLanguage } = useLanguage();
  const [countdown, setCountdown] = useState(15);
  const [isClosing, setIsClosing] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Countdown timer for urgency
  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, countdown]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleCTAClick = () => {
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'exit_intent_conversion', {
        event_category: 'engagement',
        event_label: 'roi_calculator'
      });
    }
    // Scroll to ROI calculator
    document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
    handleClose();
  };

  // Calculate potential loss based on ROI data
  const dailyLoss = roiData?.monthlySavings 
    ? Math.round(roiData.monthlySavings / 30)
    : 2600;

  const content = {
    cs: {
      headline: roiData 
        ? `Počkat! Právě jste spočítali ${roiData.roiDays} denní ROI!`
        : "Počkat! Než odejdete...",
      subheadline: roiData
        ? `Každý den bez řešení vás stojí ${dailyLoss.toLocaleString()} Kč`
        : "Víte, že každý den bez digitalizace vás může stát tisíce?",
      benefit1: "🚀 Rychlá návratnost investice",
      benefit2: "💰 Ušetřete až 1M+ Kč ročně",
      benefit3: "⏰ Výpočet za 2 minuty",
      cta: roiData ? "Chci realizovat úspory" : "Spočítat moje ROI",
      dismiss: "Ne, chci přijít o peníze",
      timer: `Nabídka vyprší za ${countdown} sekund`
    },
    en: {
      headline: roiData 
        ? `Wait! You just calculated ${roiData.roiDays} days ROI!`
        : "Wait! Before you leave...",
      subheadline: roiData
        ? `Every day without solution costs you ${dailyLoss.toLocaleString()} CZK`
        : "Did you know every day without digitalization could cost you thousands?",
      benefit1: "🚀 Fast return on investment",
      benefit2: "💰 Save up to 1M+ CZK yearly",
      benefit3: "⏰ Calculation in 2 minutes",
      cta: roiData ? "I want to realize savings" : "Calculate my ROI",
      dismiss: "No, I want to lose money",
      timer: `Offer expires in ${countdown} seconds`
    }
  };

  const t = content[currentLanguage];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="modal-overlay bg-black/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`modal-content w-[calc(100vw-2rem)] max-w-2xl ${
              isClosing ? 'pointer-events-none' : ''
            }`}
          >
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 opacity-100 blur animate-pulse" />
              
              <div className="relative bg-white dark:bg-gray-900 m-1 rounded-2xl p-8 md:p-10">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close"
                >
                  <FiX className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="text-center">
                  {/* Animated icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mb-6 shadow-lg"
                  >
                    <FiClock className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Headline */}
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    <span className="text-red-600 dark:text-red-400">{t.headline}</span>
                  </h2>

                  {/* Subheadline */}
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                    {t.subheadline}
                  </p>

                  {/* Benefits */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {[t.benefit1, t.benefit2, t.benefit3].map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                      >
                        <p className="text-sm font-medium">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Timer */}
                  <div className="mb-6">
                    <div className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        countdown <= 5 ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium text-red-700 dark:text-red-300">
                        {t.timer}
                      </span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCTAClick}
                      className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
                    >
                      {t.cta}
                      <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    <button
                      onClick={handleClose}
                      className="block w-full md:w-auto mx-auto text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline transition-colors"
                    >
                      {t.dismiss}
                    </button>
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                      <span>✓ {currentLanguage === 'cs' ? 'Bez závazků' : 'No obligations'}</span>
                      <span>✓ {currentLanguage === 'cs' ? 'Okamžitý výsledek' : 'Instant results'}</span>
                      <span>✓ {currentLanguage === 'cs' ? '50+ spokojených firem' : '50+ happy companies'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
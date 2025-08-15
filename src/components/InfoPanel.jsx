import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const InfoPanel = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Info Button */}
      <motion.div
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 
                   md:top-1/2 md:-translate-y-1/2
                   max-md:bottom-6 max-md:top-auto max-md:translate-y-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.button
          onClick={togglePanel}
          aria-label={t('infoPanel.title')}
          aria-expanded={isOpen}
          className="group relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 
                     dark:from-emerald-400 dark:to-blue-500
                     shadow-lg hover:shadow-xl transition-all duration-300
                     flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Info Icon */}
          <span className="relative text-white font-bold text-xl drop-shadow-lg">
            i
          </span>
        </motion.button>
      </motion.div>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={togglePanel}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 
                         backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-2xl z-50"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                    ℹ️ {t('infoPanel.title')}
                  </h3>
                  <button
                    onClick={togglePanel}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
                {/* Tech Stack */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🚀 {t('infoPanel.tech')}</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                      <span className="text-blue-500">⚛️</span>
                      <span className="text-gray-700 dark:text-gray-300">React 19</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                      <span className="text-purple-500">⚡</span>
                      <span className="text-gray-700 dark:text-gray-300">Vite</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                      <span className="text-cyan-500">🎨</span>
                      <span className="text-gray-700 dark:text-gray-300">Tailwind CSS</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                      <span className="text-pink-500">✨</span>
                      <span className="text-gray-700 dark:text-gray-300">Framer Motion</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                      <span className="text-green-500">🌐</span>
                      <span className="text-gray-700 dark:text-gray-300">Three.js</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">✨ {t('infoPanel.features')}</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                      <span className="text-yellow-500">📱</span>
                      <span className="text-gray-700 dark:text-gray-300">{t('infoPanel.featuresData.0')}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                      <span className="text-blue-500">🌙</span>
                      <span className="text-gray-700 dark:text-gray-300">{t('infoPanel.featuresData.1')}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                      <span className="text-purple-500">🔮</span>
                      <span className="text-gray-700 dark:text-gray-300">{t('infoPanel.featuresData.2')}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                      <span className="text-green-500">🎯</span>
                      <span className="text-gray-700 dark:text-gray-300">{t('infoPanel.featuresData.3')}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                      <span className="text-red-500">📧</span>
                      <span className="text-gray-700 dark:text-gray-300">{t('infoPanel.featuresData.4')}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                      <span className="text-indigo-500">📭</span>
                      <span className="text-gray-700 dark:text-gray-300">{t('infoPanel.featuresData.5')}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Score */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 dark:text-white font-semibold">{t('infoPanel.performance')}</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      94/100
                    </span>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm">
                    ⭐ ⭐ ⭐ ⭐ ⭐ Excelentní hodnocení
                  </div>
                </div>

                {/* Author Info */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">👨‍💻 {t('infoPanel.author')}</h4>
                  
                  <div className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-900 dark:text-white">{t('hero.name')}</div>
                      <div className="text-gray-700 dark:text-gray-300">{t('hero.title')}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">React Specialist</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">📍 {t('hero.location')}</div>
                    </div>
                  </div>
                </div>

                {/* Fun Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-center">
                    <div className="text-lg font-bold text-emerald-500">50+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t('infoPanel.stats.images')}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-center">
                    <div className="text-lg font-bold text-cyan-500">60KB</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t('infoPanel.stats.bundle')}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-400/20 text-center">
                    <div className="text-lg font-bold text-blue-500">v3</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t('infoPanel.stats.worker')}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-400/20 text-center">
                    <div className="text-lg font-bold text-purple-500">100%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t('infoPanel.stats.responsive')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InfoPanel;
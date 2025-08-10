import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';

const ROIPriceTooltip = ({ children, content, price }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleTooltipToggle = () => {
    setIsVisible(!isVisible);
  };
  
  return (
    <div 
      className="inline-block" 
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={handleTooltipToggle}
      onTouchStart={handleTooltipToggle}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 bottom-full right-0 mb-2 pointer-events-none sm:pointer-events-auto sm:right-0 right-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-lg shadow-xl min-w-[280px] max-w-[320px] sm:max-w-[320px] max-w-[calc(100vw-2rem)]">
              {/* Arrow */}
              <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900 dark:border-t-gray-100" />
              
              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-gray-700 dark:border-gray-300 pb-2 mb-2">
                  <span className="font-semibold text-sm">{content.category}</span>
                  <span className="text-xs opacity-80">{content.employees}</span>
                </div>
                
                <div className="space-y-1">
                  {content.features.map((feature, index) => (
                    <div key={index} className="flex items-start text-xs">
                      <span className="text-emerald-400 dark:text-emerald-600 mt-0.5 mr-1.5">✓</span>
                      <span className="opacity-90">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 mt-2 border-t border-gray-700 dark:border-gray-300">
                  <p className="text-xs opacity-80 italic">{content.priceNote}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ROIPriceTooltip;
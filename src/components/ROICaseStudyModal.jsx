import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiUsers, FiTarget, FiTrendingUp, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const ROICaseStudyModal = ({ isOpen, onClose, caseStudy }) => {
  const { currentLanguage } = useLanguage();

  if (!isOpen || !caseStudy) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  caseStudy.type === 'production' 
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    : caseStudy.type === 'services'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                }`}>
                  {caseStudy.type === 'production' ? <FiTarget size={24} /> : 
                   caseStudy.type === 'services' ? <FiDollarSign size={24} /> : 
                   <FiCheckCircle size={24} />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">
                    {currentLanguage === 'cs' ? caseStudy.title.cs : caseStudy.title.en}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FiMapPin size={14} />
                      <span>{currentLanguage === 'cs' ? caseStudy.location.cs : caseStudy.location.en}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUsers size={14} />
                      <span>{caseStudy.employees} {currentLanguage === 'cs' ? 'zaměstnanců' : 'employees'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Project Info */}
            {caseStudy.projectInfo && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">
                  {currentLanguage === 'cs' ? 'Informace o projektu' : 'Project Information'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {currentLanguage === 'cs' ? caseStudy.projectInfo.cs.plan : caseStudy.projectInfo.en.plan}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currentLanguage === 'cs' ? 'Typ řešení' : 'Solution Type'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {currentLanguage === 'cs' ? caseStudy.projectInfo.cs.price : caseStudy.projectInfo.en.price}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currentLanguage === 'cs' ? 'Investice' : 'Investment'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {currentLanguage === 'cs' ? caseStudy.projectInfo.cs.duration : caseStudy.projectInfo.en.duration}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currentLanguage === 'cs' ? 'Doba vývoje' : 'Development Time'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentLanguage === 'cs' ? caseStudy.projectInfo.cs.description : caseStudy.projectInfo.en.description}
                  </p>
                </div>
              </div>
            )}

            {/* Company Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {currentLanguage === 'cs' ? 'O firmě' : 'About Company'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {currentLanguage === 'cs' ? caseStudy.description.cs : caseStudy.description.en}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {caseStudy.employees}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentLanguage === 'cs' ? 'Zaměstnanců' : 'Employees'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {caseStudy.type === 'other' 
                      ? formatCurrency(caseStudy.averageHourlyWage)
                      : formatCurrency(caseStudy.averageSalary || caseStudy.monthlyRevenue)
                    }
                  </div>
                  <div className="text-xs text-gray-500">
                    {caseStudy.type === 'production' 
                      ? (currentLanguage === 'cs' ? 'Průměrná mzda' : 'Avg Salary')
                      : caseStudy.type === 'services'
                      ? (currentLanguage === 'cs' ? 'Měsíční tržby' : 'Monthly Revenue')
                      : (currentLanguage === 'cs' ? 'Hodinová mzda' : 'Hourly Wage')
                    }
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {caseStudy.type === 'production' 
                      ? `${caseStudy.adminTimePercentage}%`
                      : caseStudy.type === 'services'
                      ? caseStudy.lostOrdersPerMonth
                      : `${caseStudy.hoursWastedWeekly}h`
                    }
                  </div>
                  <div className="text-xs text-gray-500">
                    {caseStudy.type === 'production'
                      ? (currentLanguage === 'cs' ? 'Admin čas' : 'Admin Time')
                      : caseStudy.type === 'services'
                      ? (currentLanguage === 'cs' ? 'Ztracené zakázky' : 'Lost Orders')
                      : (currentLanguage === 'cs' ? 'Hodiny týdně' : 'Hours Weekly')
                    }
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {caseStudy.type === 'other' 
                      ? caseStudy.peopleAffected
                      : caseStudy.industry
                    }
                  </div>
                  <div className="text-xs text-gray-500">
                    {caseStudy.type === 'other'
                      ? (currentLanguage === 'cs' ? 'Ovlivněných lidí' : 'People Affected')
                      : (currentLanguage === 'cs' ? 'Odvětví' : 'Industry')
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
                <FiTarget />
                {currentLanguage === 'cs' ? 'Problémy před řešením' : 'Problems Before Solution'}
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                <blockquote className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
                  "{currentLanguage === 'cs' ? caseStudy.problemQuote.cs : caseStudy.problemQuote.en}"
                </blockquote>
                <ul className="mt-4 space-y-2">
                  {(currentLanguage === 'cs' ? caseStudy.problems.cs : caseStudy.problems.en).map((problem, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Solution Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <FiCheckCircle />
                {currentLanguage === 'cs' ? 'Naše řešení' : 'Our Solution'}
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {currentLanguage === 'cs' ? caseStudy.solution.cs : caseStudy.solution.en}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {(currentLanguage === 'cs' ? caseStudy.features.cs : caseStudy.features.en).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FiCheckCircle className="text-blue-500 flex-shrink-0" size={16} />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <FiTrendingUp />
                {currentLanguage === 'cs' ? 'Výsledky a ROI' : 'Results & ROI'}
              </h3>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {caseStudy.results.roiDays}
                      <span className="text-sm ml-1">{currentLanguage === 'cs' ? 'dní' : 'days'}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentLanguage === 'cs' ? 'Návratnost' : 'ROI Period'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {formatCurrency(caseStudy.results.monthlySavings)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentLanguage === 'cs' ? 'Měsíční úspora' : 'Monthly Savings'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {Math.round(caseStudy.results.yearlyROI)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentLanguage === 'cs' ? 'Roční ROI' : 'Yearly ROI'}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-emerald-200 dark:border-emerald-700 pt-4">
                  <h4 className="font-medium mb-2">
                    {currentLanguage === 'cs' ? 'Další přínosy:' : 'Additional Benefits:'}
                  </h4>
                  <ul className="space-y-1">
                    {(currentLanguage === 'cs' ? caseStudy.results.benefits.cs : caseStudy.results.benefits.en).map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FiCheckCircle className="text-emerald-500 flex-shrink-0" size={14} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  "{currentLanguage === 'cs' ? caseStudy.testimonial.quote.cs : caseStudy.testimonial.quote.en}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {caseStudy.testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentLanguage === 'cs' ? caseStudy.testimonial.position.cs : caseStudy.testimonial.position.en}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <FiClock />
                {currentLanguage === 'cs' ? 'Časová osa projektu' : 'Project Timeline'}
              </h3>
              <div className="space-y-4">
                {caseStudy.timeline.map((phase, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      {index < caseStudy.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-purple-200 dark:bg-purple-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {currentLanguage === 'cs' ? phase.phase.cs : phase.phase.en}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                        {phase.duration}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {currentLanguage === 'cs' ? phase.description.cs : phase.description.en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-r from-blue-500/10 to-emerald-500/10 dark:from-blue-400/10 dark:to-emerald-400/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {currentLanguage === 'cs' 
                  ? 'Podobné výsledky chcete i pro svou firmu?' 
                  : 'Want similar results for your company?'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 px-8 rounded-lg font-medium hover:shadow-lg transition-all inline-block"
              >
                {currentLanguage === 'cs' ? 'Pojďme si promluvit!' : 'Let\'s Talk!'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ROICaseStudyModal;
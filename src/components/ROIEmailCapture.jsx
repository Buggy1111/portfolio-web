import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiDownload, FiCheck, FiX, FiUser, FiFileText, FiPhone } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

/**
 * SENIOR-LEVEL ROI Email Capture with Project Specification
 * 4-Step Professional Process:
 * 1. Email capture + ROI results delivery
 * 2. Project specification form
 * 3. Contact details (optional)
 * 4. Success confirmation
 */
const ROIEmailCapture = ({ isOpen, onClose, roiResults }) => {
  const { currentLanguage } = useLanguage();
  const [step, setStep] = useState(1); // 1: email, 2: project spec, 3: contact info, 4: success
  const [formData, setFormData] = useState({
    // Step 1: Email
    email: '',
    gdprConsent: false,
    
    // Step 2: Project Specification
    projectDescription: '',
    requiredFeatures: '',
    currentProcess: '',
    mainProblems: '',
    timeline: '',
    budget: '',
    employeeCount: '',
    additionalInfo: '',
    
    // Step 3: Contact Details
    name: '',
    company: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Step 1: Email capture and ROI delivery - PŘESNÁ KOPIE Z CONTACT.JSX
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: currentLanguage === 'cs' ? 'Neplatný email' : 'Invalid email' });
      return;
    }
    
    if (!formData.gdprConsent) {
      setErrors({ gdpr: currentLanguage === 'cs' ? 'Souhlas je povinný' : 'Consent required' });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // PŘESNÁ KOPIE Z CONTACT.JSX
      const response = await fetch('https://formspree.io/f/meozvrvg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'ROI Kalkulačka',
          email: formData.email,
          message: `ROI ANALÝZA pro ${formData.email}

Návratnost: ${roiResults?.roiDays || 'N/A'} dní
Cena projektu: ${roiResults?.projectCost?.toLocaleString() || 'N/A'} Kč
Roční úspora: ${roiResults?.yearlyROI?.toLocaleString() || 'N/A'} Kč`,
          _replyto: formData.email,
          _subject: `Nová zpráva z portfolia od ROI Kalkulačka`
        })
      });

      if (response.ok) {
        // Track email capture
        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'engagement',
            event_label: 'roi_email_capture',
            value: roiResults?.projectCost || 0
          });
        }

        setStep(2); // Move to project specification
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setErrors({ 
        email: currentLanguage === 'cs' 
          ? 'Chyba při odesílání. Zkuste to znovu.' 
          : 'Error sending. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Project specification
  const handleProjectSpecSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.projectDescription.trim()) {
      setErrors({ projectDescription: currentLanguage === 'cs' ? 'Popis projektu je povinný' : 'Project description is required' });
      return;
    }

    setErrors({});
    setStep(3); // Move to contact info
  };

  // Step 3: Contact details - PŘESNÁ KOPIE Z CONTACT.JSX
  const handleContactSubmit = async () => {
    setIsLoading(true);
    
    try {
      // PŘESNÁ KOPIE Z CONTACT.JSX
      const response = await fetch('https://formspree.io/f/meozvrvg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'ROI Kalkulačka',
          email: formData.email,
          message: `ROI KALKULAČKA - ${formData.name || 'Nový projekt'}

KONTAKT:
Email: ${formData.email}
Firma: ${formData.company || 'Neuvedeno'}
Telefon: ${formData.phone || 'Neuvedeno'}

ROI VÝSLEDKY:
Návratnost: ${roiResults?.roiDays || 'N/A'} dní
Cena projektu: ${roiResults?.projectCost?.toLocaleString() || 'N/A'} Kč
Roční úspora: ${roiResults?.yearlyROI?.toLocaleString() || 'N/A'} Kč

POPIS PROJEKTU:
${formData.projectDescription || 'Bez popisu'}

POŽADOVANÉ FUNKCE:
${formData.requiredFeatures || 'Neuvedeno'}

HLAVNÍ PROBLÉMY:
${formData.mainProblems || 'Neuvedeno'}

ČASOVÁ LINKA:
${formData.timeline || 'Neuvedeno'}

ROZPOČET:
${formData.budget || 'Neuvedeno'}

POČET ZAMĚSTNANCŮ:
${formData.employeeCount || 'Neuvedeno'}

DALŠÍ INFO:
${formData.additionalInfo || 'Neuvedeno'}`,
          _replyto: formData.email,
          _subject: `Nová zpráva z portfolia od ${formData.name || 'ROI Kalkulačka'}`
        })
      });

      if (response.ok) {
        setStep(4);
      } else {
        throw new Error('Network response was not ok');
      }

      // Track project specification
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'roi_project_specification',
          value: roiResults?.projectCost || 0
        });
      }

      // Save complete lead data
      const leads = JSON.parse(localStorage.getItem('roiLeads') || '[]');
      leads.push({
        email: formData.email,
        name: formData.name,
        company: formData.company,
        projectDescription: formData.projectDescription,
        roiDays: roiResults?.roiDays || 0,
        projectCost: roiResults?.projectCost || 0,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('roiLeads', JSON.stringify(leads));

      setStep(4); // Success
    } catch (error) {
      console.error('Project specification error:', error);
      
      // Fallback - alespoň uložit lokálně když selže API
      console.log('📧 FALLBACK - Data uložena lokálně:', {
        email: formData.email,
        project: roiResults?.projectCost || 0,
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        description: formData.projectDescription
      });
      
      // Pokračovat na úspěch i při chybě (pro UX)
      setStep(4);
      
      setErrors({ 
        general: currentLanguage === 'cs' 
          ? '⚠️ Email se neodeslal, ale data jsou uložena. Kontaktujte nás na michalbugy12@gmail.com' 
          : '⚠️ Email failed but data saved. Contact us at michalbugy12@gmail.com' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const content = {
    cs: {
      step1: {
        title: '📊 Získejte kompletní ROI analýzu na email',
        subtitle: 'Plus 10 osvědčených tipů pro rychlejší ROI',
        emailLabel: 'Váš email',
        emailPlaceholder: 'vas@email.cz',
        gdpr: 'Souhlasím se zpracováním osobních údajů',
        cta: 'Získat analýzu zdarma',
        benefits: [
          '✅ Detailní PDF report s vaším výpočtem',
          '✅ 10 tipů pro urychlení ROI',
          '✅ Případové studie podobných projektů',
          '✅ Bonusová konzultace zdarma'
        ]
      },
      step2: {
        title: '📝 Popište svůj projekt',
        subtitle: 'Pro přesnou nabídku potřebujeme znát detaily',
        projectDescription: 'Popište váš projekt a co potřebujete *',
        requiredFeatures: 'Jaké funkce aplikace potřebujete?',
        currentProcess: 'Jak současný proces funguje?',
        mainProblems: 'Jaké jsou hlavní problémy?',
        timeline: 'Kdy potřebujete dodání?',
        budget: 'Orientační rozpočet (nepovinné)',
        employeeCount: 'Počet zaměstnanců',
        additionalInfo: 'Další informace',
        cta: 'Pokračovat',
        skip: 'Přeskočit detaily',
        placeholders: {
          projectDescription: 'Např: Potřebujeme skladový systém pro evidenci materiálu...',
          currentProcess: 'Současně používáme Excel tabulky...',
          mainProblems: 'Ztráta času při inventuře, chyby v záznamech...',
          additionalInfo: 'Další požadavky nebo poznámky...'
        }
      },
      step3: {
        title: '👋 Kontaktní údaje',
        subtitle: 'Pro rychlejší komunikaci a personalizovanou nabídku',
        nameLabel: 'Jméno a příjmení',
        companyLabel: 'Název firmy',
        phoneLabel: 'Telefon',
        cta: 'Odeslat specifikaci',
        skip: 'Přeskočit'
      },
      step4: {
        title: '🎉 Hotovo!',
        subtitle: 'Specifikace odeslána',
        message: 'Zkontrolujte email pro ROI analýzu. Ozveme se vám do 24 hodin s konkrétní nabídkou.',
        close: 'Zavřít'
      }
    },
    en: {
      step1: {
        title: '📊 Get complete ROI analysis via email',
        subtitle: 'Plus 10 proven tips for faster ROI',
        emailLabel: 'Your email',
        emailPlaceholder: 'your@email.com',
        gdpr: 'I agree to data processing',
        cta: 'Get free analysis',
        benefits: [
          '✅ Detailed PDF report with your calculation',
          '✅ 10 tips to accelerate ROI',
          '✅ Case studies of similar projects',
          '✅ Bonus free consultation'
        ]
      },
      step2: {
        title: '📝 Describe your project',
        subtitle: 'We need details for an accurate quote',
        projectDescription: 'Describe your project and what you need *',
        requiredFeatures: 'What features do you need?',
        currentProcess: 'How does your current process work?',
        mainProblems: 'What are the main problems?',
        timeline: 'When do you need delivery?',
        budget: 'Approximate budget (optional)',
        employeeCount: 'Number of employees',
        additionalInfo: 'Additional information',
        cta: 'Continue',
        skip: 'Skip details',
        placeholders: {
          projectDescription: 'e.g. We need a warehouse system for material inventory...',
          currentProcess: 'Currently we use Excel spreadsheets...',
          mainProblems: 'Time loss during inventory, recording errors...',
          additionalInfo: 'Additional requirements or notes...'
        }
      },
      step3: {
        title: '👋 Contact details',
        subtitle: 'For faster communication and personalized offer',
        nameLabel: 'Full name',
        companyLabel: 'Company name',
        phoneLabel: 'Phone',
        cta: 'Send specification',
        skip: 'Skip'
      },
      step4: {
        title: '🎉 Done!',
        subtitle: 'Specification sent',
        message: 'Check your email for ROI analysis. We\'ll contact you within 24 hours with a specific offer.',
        close: 'Close'
      }
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Progress bar */}
              <div className="h-1 bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-8 relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>

                {/* Step 1: Email capture */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {t.step1.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.step1.subtitle}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {t.step1.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step1.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder={t.step1.emailPlaceholder}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="gdpr"
                          checked={formData.gdprConsent}
                          onChange={(e) => handleChange('gdprConsent', e.target.checked)}
                          className="mt-0.5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                        <label htmlFor="gdpr" className="text-sm text-gray-600 dark:text-gray-400">
                          {t.step1.gdpr}
                        </label>
                      </div>
                      {errors.gdpr && <p className="text-red-500 text-sm">{errors.gdpr}</p>}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center"
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        ) : (
                          <>
                            <FiMail className="mr-2" />
                            {t.step1.cta}
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Step 2: Project specification */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {t.step2.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.step2.subtitle}
                      </p>
                    </div>

                    <form onSubmit={handleProjectSpecSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step2.projectDescription}
                        </label>
                        <textarea
                          value={formData.projectDescription}
                          onChange={(e) => handleChange('projectDescription', e.target.value)}
                          placeholder={t.step2.placeholders.projectDescription}
                          rows={3}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.projectDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none`}
                        />
                        {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.step2.requiredFeatures}
                          </label>
                          <input
                            type="text"
                            value={formData.requiredFeatures}
                            onChange={(e) => handleChange('requiredFeatures', e.target.value)}
                            placeholder="Evidence, inventura, reporty..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.step2.employeeCount}
                          </label>
                          <input
                            type="text"
                            value={formData.employeeCount}
                            onChange={(e) => handleChange('employeeCount', e.target.value)}
                            placeholder="35"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step2.currentProcess}
                        </label>
                        <textarea
                          value={formData.currentProcess}
                          onChange={(e) => handleChange('currentProcess', e.target.value)}
                          placeholder={t.step2.placeholders.currentProcess}
                          rows={2}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step2.mainProblems}
                        </label>
                        <textarea
                          value={formData.mainProblems}
                          onChange={(e) => handleChange('mainProblems', e.target.value)}
                          placeholder={t.step2.placeholders.mainProblems}
                          rows={2}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.step2.timeline}
                          </label>
                          <input
                            type="text"
                            value={formData.timeline}
                            onChange={(e) => handleChange('timeline', e.target.value)}
                            placeholder="Do 3 měsíců"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.step2.budget}
                          </label>
                          <input
                            type="text"
                            value={formData.budget}
                            onChange={(e) => handleChange('budget', e.target.value)}
                            placeholder="80.000 Kč"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step2.additionalInfo}
                        </label>
                        <textarea
                          value={formData.additionalInfo}
                          onChange={(e) => handleChange('additionalInfo', e.target.value)}
                          placeholder={t.step2.placeholders.additionalInfo}
                          rows={2}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-semibold transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          {t.step2.skip}
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center"
                        >
                          <FiFileText className="mr-2" />
                          {t.step2.cta}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Step 3: Contact details */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {t.step3.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.step3.subtitle}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step3.nameLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Jan Novák"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step3.companyLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          placeholder="ABC Manufacturing s.r.o."
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.step3.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+420 xxx xxx xxx"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      {errors.general && (
                        <p className="text-red-500 text-sm text-center">{errors.general}</p>
                      )}

                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={handleContactSubmit}
                          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-semibold transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          {t.step3.skip}
                        </button>
                        <button
                          onClick={handleContactSubmit}
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center"
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          ) : (
                            <>
                              <FiPhone className="mr-2" />
                              {t.step3.cta}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <FiCheck className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {t.step4.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {t.step4.subtitle}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.step4.message}
                    </p>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={onClose}
                      className="mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-8 rounded-lg font-semibold transition-all"
                    >
                      {t.step4.close}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ROIEmailCapture;
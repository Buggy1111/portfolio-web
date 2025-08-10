import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { useLanguage } from '../context/LanguageContext';
// Removed unused imports

const Contact = () => {
  const { t } = useLanguage();
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });
  const [lastSubmission, setLastSubmission] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Rate limiting - maximálně 1 zpráva za 30 sekund
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmission;
    const RATE_LIMIT_MS = 30000; // 30 sekund
    
    if (timeSinceLastSubmission < RATE_LIMIT_MS) {
      const remainingTime = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmission) / 1000);
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: t('contact.rateLimit').replace('{seconds}', remainingTime)
      });
      return;
    }
    
    setStatus({ submitting: true, submitted: false, error: false, message: '' });
    setLastSubmission(now);

    // EmailJS odeslání
    emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      form.current,
      EMAILJS_CONFIG.PUBLIC_KEY
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: t('contact.success')
      });
      setFormData({ name: '', email: '', message: '' });
    }, (error) => {
      console.error('Email send failed:', error.text);
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: t('contact.error')
      });
    });
  };

  const handleChange = (e) => {
    const fieldName = e.target.name.replace('from_', '');
    setFormData({
      ...formData,
      [fieldName]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-white dark:bg-dark-bg" itemScope itemType="https://schema.org/ContactPoint">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
              {t('nav.contact')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
              {t('contact.description')}
            </p>

            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4 p-4 glass-effect rounded-lg"
                whileHover={{ x: 10 }}
              >
                <FiMail className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('contact.info.email')}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{t('contact.info.emailHint')}</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 glass-effect rounded-lg"
                whileHover={{ x: 10 }}
              >
                <FiPhone className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('contact.info.phone')}</p>
                  <a href="tel:+420605954429" className="text-gray-600 dark:text-gray-300 hover:text-emerald-500">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">+420 605 954 429</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 glass-effect rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                whileHover={{ x: 10 }}
                onClick={() => window.open('https://maps.google.com/?q=Kamenka,+Česká+republika', '_blank')}
              >
                <FiMapPin className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('contact.info.location')}</p>
                  <p className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition-colors">
                    <span className="font-semibold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Kamenka</span>, <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Moravskoslezský kraj</span>
                    <span className="text-xs block text-gray-500 dark:text-gray-400 mt-1">{t('contact.info.clickToOpenMaps')}</span>
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>

          <motion.form
            ref={form}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6 order-1 lg:order-2"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg glass-effect bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                placeholder={t('contact.form.name')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="from_email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg glass-effect bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                placeholder={t('contact.form.email')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg glass-effect bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                placeholder={t('contact.form.message')}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status.submitting}
              className={`w-full ${status.submitting ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-600'} text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors`}
              whileHover={!status.submitting ? { scale: 1.02 } : {}}
              whileTap={!status.submitting ? { scale: 0.98 } : {}}
            >
              {status.submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  <FiSend />
                  {t('contact.form.send')}
                </>
              )}
            </motion.button>

            {/* Status zprávy */}
            {(status.submitted || status.error) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  status.error 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
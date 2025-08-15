import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-surface">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-4">
<span className="gradient-text">{t('about.title')}</span>
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                {t('about.intro')}
              </p>
              
              <p className="text-lg leading-relaxed">
                {t('about.experience')}
              </p>
              
              <p className="text-lg leading-relaxed">
                {t('about.cities')} {t('about.and')}...
              </p>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t('about.aiTitle')}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">✓</span>
                    <span>{t('about.aiTools.0')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">✓</span>
                    <span>{t('about.aiTools.1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">✓</span>
                    <span>{t('about.aiTools.2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">✓</span>
                    <span>{t('about.aiTools.3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">✓</span>
                    <span>{t('about.aiTools.4')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">✓</span>
                    <span>{t('about.aiDescription')}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 text-center">
                <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
{t('nav.contact')}
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
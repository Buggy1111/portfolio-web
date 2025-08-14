import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Technology color mapping based on Skills component
// Funkce pro generování detailních alt textů pro projekt obrázky
const getProjectImageDescription = (projectTitle, imageIndex) => {
  const projectDescriptions = {
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
    "Docházkový Systém": [
      "hlavní dashboard ve světlém režimu s přehledem docházky",
      "hlavní dashboard v tmavém režimu s moderním UI",
      "záložka pro zaznamenávání docházky a projektů",
      "výkazy a reporty docházky zaměstnanců",
      "statistiky a analýzy pracovní doby"
    ],
    "VMQ Výrobní Aplikace": [
      "KPI dashboard s metrikami výroby a real-time daty",
      "hlavní řídicí centrum pro správu výroby VMQ materiálů",
      "distribuce materiálů a výrobní statistiky",
      "přihlašovací obrazovka s enterprise designem"
    ],
    "Sklad směsí": [
      "dashboard se statistikami a přehledy skladových směsí",
      "tabulka s inventurou odpadů a skladových zásob",
      "reporty o likvidaci odpadů a materiálů",
      "historie likvidovaných odpadů",
      "o aplikaci - modální dialog s informacemi"
    ]
  };
  
  return projectDescriptions[projectTitle]?.[imageIndex] || "screenshot aplikace";
};

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

const getProjectsData = (t) => [
  {
    id: 1,
    title: t('projects.projectData.autoservis.title'),
    description: t('projects.projectData.autoservis.description'),
    technologies: ['JavaScript ES6+', 'Three.js', 'Web Audio API', 'OpenWeatherMap API'],
    images: [
      '/image/pocasi/weather-app-overview-3cities.webp',
      '/image/pocasi/weather-app-7day-forecast.webp',
      '/image/pocasi/weather-app-7day-forecast-newyork.webp',
      '/image/pocasi/weather-app-homepage-stats.webp',
      '/image/pocasi/weather-app-sound-settings.webp'
    ],
    demoUrl: '#',
    githubUrl: '#contact',
    category: 'frontend'
  },
  {
    id: 2,
    title: t('projects.projectData.cukrarna.title'),
    description: t('projects.projectData.cukrarna.description'),
    technologies: ['React 18', 'Firebase', 'Tailwind CSS', 'Firestore'],
    images: [
      '/image/banka/financial-overview-dashboard.webp',
      '/image/banka/financial-tracker-login-screen.webp',
      '/image/banka/expense-analysis-pie-chart.webp',
      '/image/banka/expense-analysis-radar-chart.webp',
      '/image/banka/recent-transactions-list.webp'
    ],
    demoUrl: '#',
    githubUrl: '#contact',
    category: 'frontend'
  },
  {
    id: 3,
    title: t('projects.projectData.fitness.title'),
    description: t('projects.projectData.fitness.description'),
    technologies: ['React', 'JavaScript', 'CSS3', 'LocalStorage'],
    images: [
      '/image/dochazka/dashboard-overview-light.webp',
      '/image/dochazka/dashboard-overview-dark.webp',
      '/image/dochazka/records-zaznamenat-tab.webp',
      '/image/dochazka/reports-vykazy-tab.webp',
      '/image/dochazka/statistics-statistiky-tab.webp'
    ],
    demoUrl: '#',
    githubUrl: '#contact',
    category: 'frontend'
  },
  {
    id: 4,
    title: t('projects.projectData.stavebni.title'),
    description: t('projects.projectData.stavebni.description'),
    technologies: ['TypeScript', 'Zustand', 'Recharts', 'XLSX'],
    images: [
      '/image/produkce/production-metrics-kpi-dashboard.webp',
      '/image/produkce/vmq-production-control-center-homepage.webp',
      '/image/produkce/production-dashboard-material-distribution.webp',
      '/image/produkce/vmq-production-login-screen.webp'
    ],
    demoUrl: '#',
    githubUrl: '#contact',
    category: 'frontend'
  },
  {
    id: 5,
    title: t('projects.projectData.veterinar.title'),
    description: t('projects.projectData.veterinar.description'),
    technologies: ['React', 'JavaScript', 'CSS3', 'LocalStorage'],
    images: [
      '/image/waste/statistics-dashboard.webp',
      '/image/waste/waste-inventory-table.webp',
      '/image/waste/disposal-reports-table.webp',
      '/image/waste/disposed-waste-history.webp',
      '/image/waste/about-modal-dialog.webp'
    ],
    demoUrl: '#',
    githubUrl: '#contact',
    category: 'frontend'
  },
];

const getCategories = (t) => [
  { id: 'all', label: t('projects.categories.all') },
  { id: 'frontend', label: t('projects.categories.frontend') }
];

const ImageGallery = ({ images, title, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      {/* Gallery Progress Bar */}
      <div className="fixed top-0 left-0 h-full w-2 bg-gray-900/50 backdrop-blur-sm z-10">
        <div
          className="w-full bg-gradient-to-b from-emerald-500 to-blue-500 transition-all duration-300"
          style={{ 
            height: `${((currentIndex + 1) / images.length) * 100}%`,
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)'
          }}
        />
      </div>
      <div className="relative max-w-4xl w-full">
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-black/70 rounded-full hover:bg-black/90 transition-colors border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiX className="w-6 h-6 text-white" />
        </motion.button>

        <div className="relative">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - screenshot ${currentIndex + 1}: ${getProjectImageDescription(title, currentIndex)}`}
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/70 rounded-full hover:bg-black/90 transition-colors border border-white/20"
          >
            <FiChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/70 rounded-full hover:bg-black/90 transition-colors border border-white/20"
          >
            <FiChevronRight className="w-8 h-8 text-white" />
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Přejít na obrázek ${index + 1} z ${images.length}`}
              className="touch-target rounded-full p-2 focus:ring-2 focus:ring-white/50 focus:outline-none"
            >
              <span className={`block w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`} />
            </button>
          ))}
        </div>

        <p className="text-center text-white mt-2">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, onGalleryClick, t }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % project.images.length;
          setNextImageIndex((newIndex + 1) % project.images.length);
          return newIndex;
        });
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 300);
    }, 7000);

    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-white dark:bg-dark-bg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative overflow-hidden h-56">
          <div className="absolute inset-0">
            <motion.img
              key={`current-${currentImageIndex}`}
              src={project.images[currentImageIndex]}
              alt={`${project.title} - ${getProjectImageDescription(project.title, currentImageIndex)}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer absolute inset-0 z-10"
              onClick={() => onGalleryClick(project)}
              initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              animate={{ 
                opacity: isTransitioning ? 0 : 1,
                scale: isTransitioning ? 1.08 : 1,
                filter: isTransitioning ? 'blur(4px)' : 'blur(0px)'
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
            
            {/* Preloaded next image for smooth transition */}
            <motion.img
              key={`next-${nextImageIndex}`}
              src={project.images[nextImageIndex]}
              alt={`${project.title} - ${getProjectImageDescription(project.title, nextImageIndex)}`}
              className="w-full h-full object-cover cursor-pointer absolute inset-0 z-5"
              onClick={() => onGalleryClick(project)}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ 
                opacity: isTransitioning ? 0.3 : 0,
                scale: isTransitioning ? 1 : 1.05
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
            {project.images.length} {t('caseStudies.modal.photos')}
          </div>
          
          <div className="absolute top-4 left-4 flex gap-1">
            {project.images.map((_, imgIndex) => (
              <button
                key={imgIndex}
                onClick={() => setCurrentImageIndex(imgIndex)}
                aria-label={`Zobrazit obrázek ${imgIndex + 1} projektu ${project.title}`}
                className="touch-target rounded-full p-1 focus:ring-2 focus:ring-white/50 focus:outline-none"
              >
                <motion.div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    imgIndex === currentImageIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/40'
                }`}
                animate={{
                  scale: imgIndex === currentImageIndex ? 1.2 : 1,
                  opacity: imgIndex === currentImageIndex ? 1 : 0.6
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              />
              </button>
            ))}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex gap-3 z-20">
            <motion.button
              onClick={() => onGalleryClick(project)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink />
              {t('projects.buttons.gallery')}
            </motion.button>
            <motion.a
              href={project.githubUrl}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub />
              {t('projects.buttons.contact')}
            </motion.a>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => {
              const colors = getTechnologyColor(tech);
              return (
                <span
                  key={tech}
                  className={`px-3 py-1 text-sm rounded-full font-medium ${colors.bg} ${colors.text}`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedGallery, setSelectedGallery] = useState(null);
  
  const projectsData = useMemo(() => getProjectsData(t), [t]);
  const categories = useMemo(() => getCategories(t), [t]);
  
  const filteredProjects = useMemo(() => 
    activeCategory === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.category === activeCategory),
    [activeCategory, projectsData]
  );

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 py-2 rounded-full transition-all text-sm md:text-base ${
                activeCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'glass-effect hover-glow text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onGalleryClick={setSelectedGallery}
              t={t}
            />
          ))}
        </div>
      </div>

      <ImageGallery
        images={selectedGallery?.images || []}
        title={selectedGallery?.title || ''}
        isOpen={!!selectedGallery}
        onClose={() => setSelectedGallery(null)}
      />
    </section>
  );
};

export default Projects;
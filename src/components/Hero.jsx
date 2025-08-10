import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FiGithub, FiLinkedin, FiMail, FiChevronDown } from 'react-icons/fi';
import { Suspense, useMemo } from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useLanguage } from '../context/LanguageContext';
import { getCityColor } from '../utils/cityColors';

const AnimatedSphere = () => {
  const sphereConfig = useMemo(() => ({
    args: [1, 50, 100], // Reduced geometry complexity
    scale: 2.5
  }), []);
  
  const materialConfig = useMemo(() => ({
    color: "#00ff88",
    distort: 0.3,
    speed: 1.5,
    roughness: 0.4
  }), []);

  return (
    <Sphere {...sphereConfig}>
      <MeshDistortMaterial
        {...materialConfig}
        attach="material"
      />
    </Sphere>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0" itemScope itemType="https://schema.org/Person">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg dark:opacity-100 opacity-0 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:opacity-0 opacity-100 transition-opacity duration-500" />
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* 3D Koule - nahoře na mobilu/tabletu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-3xl" />
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: false }} dpr={[1, 2]}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">{t('hero.greeting')}</span>
              <br />
              <span className="gradient-text" itemProp="name">{t('hero.name')}</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
              <strong itemProp="jobTitle" className="gradient-text font-bold">{t('hero.title')}</strong> z <span itemProp="addressLocality">{t('hero.location')}</span>. {t('hero.description')} {t('hero.locations').map((city, index) => {
                const colorClass = getCityColor(city);
                
                return (
                  <span key={city}>
                    <span className={`font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>{city}</span>
                    {index < t('hero.locations').length - 2 && ', '}
                    {index === t('hero.locations').length - 2 && ', '}
                  </span>
                );
              })} {t('hero.and')}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToProjects();
                }}
                className="px-6 md:px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-medium transition-colors text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
{t('hero.cta')}
              </motion.a>
              
              <motion.a
                href="#contact"
                className="px-6 md:px-8 py-3 glass-effect hover-glow rounded-full font-medium text-gray-900 dark:text-white text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
{t('nav.contact')}
              </motion.a>
            </div>
            
            <div className="flex gap-4 justify-center lg:justify-start">
              <motion.a
                href="https://github.com/Buggy1111"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-effect rounded-full hover-glow"
                whileHover={{ y: -5 }}
              >
                <FiGithub className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/michal-burgermeister-889b10340"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-effect rounded-full hover-glow"
                whileHover={{ y: -5 }}
              >
                <FiLinkedin className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
              
              <motion.a
                href="mailto:michal@michalbugar.dev"
                className="p-3 glass-effect rounded-full hover-glow"
                whileHover={{ y: -5 }}
              >
                <FiMail className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.button
        onClick={scrollToProjects}
        aria-label="Přejít na sekci projektů"
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 p-2 md:p-3 glass-effect rounded-full hover-glow touch-target focus:ring-4 focus:ring-blue-500/50 focus:outline-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToProjects();
          }
        }}
      >
        <FiChevronDown className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        <span className="sr-only">Scroll dolů na projekty</span>
      </motion.button>
    </section>
  );
};

export default Hero;
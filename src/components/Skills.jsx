import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaNodeJs, 
  FaGitAlt,
  FaDatabase,
  FaRobot 
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: FaReact, level: 95, color: "#61DAFB" },
      { name: "JavaScript", icon: FaJs, level: 90, color: "#F7DF1E" },
      { name: "HTML5", icon: FaHtml5, level: 95, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, level: 90, color: "#1572B6" },
      { name: "Tailwind CSS", icon: FaCss3Alt, level: 90, color: "#06B6D4" },
      { name: "Framer Motion", icon: FaReact, level: 80, color: "#0055FF" },
      { name: "Three.js", icon: FaJs, level: 75, color: "#000000" },
    ]
  },
  {
    category: "Backend & Tools",
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: 85, color: "#339933" },
      { name: "Vite", icon: FaJs, level: 90, color: "#646CFF" },
      { name: "Git", icon: FaGitAlt, level: 85, color: "#F05032" },
      { name: "Firebase", icon: FaDatabase, level: 80, color: "#FFCA28" },
      { name: "AI (ChatGPT/Claude)", icon: FaRobot, level: 95, color: "#10A37F" },
    ]
  }
];

const Skills = () => {
  const { t } = useLanguage();
  
  return (
    <section id="skills" className="py-12 md:py-20 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4">
            <span className="gradient-text">{t('skills.title')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: categoryIndex === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
                {category.category}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon 
                          className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                          style={{ color: skill.color }}
                        />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="h-2 rounded-full relative overflow-hidden"
                        style={{ backgroundColor: skill.color }}
                      >
                        <div 
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                            animation: 'shimmer 2s infinite'
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-full">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-gray-700 dark:text-gray-300">
              Stále se učím nové technologie
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
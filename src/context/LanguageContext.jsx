import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  cs: {
    // Navigation
    nav: {
      home: 'Domů',
      about: 'O mně',
      projects: 'Projekty',
      caseStudies: 'Case Studies',
      skills: 'Dovednosti',
      roiCalculator: 'ROI Kalkulačka',
      contact: 'Kontakt'
    },
    
    // Hero section
    hero: {
      greeting: 'Ahoj, jsem',
      name: 'Michal Bürgermeister',
      title: 'Frontend Developer',
      description: 'Specializuji se na React a moderní webové technologie. Vytvářím luxusní, responzivní a uživatelsky přívětivé aplikace pro firmy z',
      locations: ['Opavy', 'Ostravy', 'Nového Jičína', 'Frýdku-Místku', 'Karviné', 'Havířova', 'Třince', 'Českého Těšína'],
      and: 'a celého Moravskoslezského kraje',
      cta: 'Prohlédnout práci',
      location: 'Kamenky, Moravskoslezský kraj'
    },
    
    // About section
    about: {
      title: 'O mně',
      intro: (
        <>
          Jsem <span className="font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">frontend developer</span> z Kamenky v <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Moravskoslezském kraji</span> s více než <span className="font-semibold text-orange-600 dark:text-orange-400">3 lety zkušeností</span>. Specializuji se na vytváření moderních webových aplikací pomocí <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">React ekosystému</span>. Na komplexnějších projektech <span className="font-semibold text-indigo-600 dark:text-indigo-400">spolupracuji s ověřeným partnerem</span>, což nám umožňuje dodávat <span className="font-semibold text-purple-600 dark:text-purple-400">rozsáhlejší řešení</span> v <span className="font-semibold text-emerald-600 dark:text-emerald-400">kratším čase</span>.
        </>
      ),
      experience: (
        <>
          Pracuji s nejnovějšími technologiemi jako <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">React 19</span>, <span className="font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">TypeScript</span>, <span className="font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Tailwind CSS</span> a <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Three.js</span>. Vytvářím aplikace, které nejsou jen <span className="font-semibold text-green-600 dark:text-green-400">funkční</span>, ale také <span className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">vizuálně působivé</span> a optimalizované pro <span className="font-semibold text-orange-600 dark:text-orange-400">výkon</span>.
        </>
      ),
      cities: 'Poskytuju služby pro celý Moravskoslezský kraj včetně',
      and: 'a',
      aiTitle: 'Práce s AI nástroji',
      aiDescription: 'Efektivně využívám pokročilé AI asistenty jako ChatGPT a Claude',
      aiTools: [
        'Optimalizaci kódu a code review',
        'Generování a refactoring komponent',
        'Debugging a řešení problémů',
        'Dokumentaci a komentáře',
        'Návrh architektur a patterns'
      ]
    },
    
    // Projects section
    projects: {
      title: 'Moje projekty',
      subtitle: 'Ukázky moderních webových aplikací',
      categories: {
        all: 'Všechny',
        frontend: 'Frontend'
      },
      buttons: {
        gallery: 'Galerie',
        demo: 'Demo',
        contact: 'Kontakt',
        code: 'Kód',
        viewCaseStudy: 'Zobrazit Case Study'
      },
      projectData: {
        autoservis: {
          title: 'Weather Ultimate',
          description: 'Aplikace počasí nové generace s AI predikcemi, real-time 3D vizualizacemi a pohlcujícími zvukovými efekty'
        },
        cukrarna: {
          title: 'Financial Tracker',
          description: 'Moderní aplikace pro sledování osobních financí s Firebase backendem, real-time synchronizací a pokročilými vizuálními efekty'
        },
        fitness: {
          title: 'Docházkový Systém',
          description: 'React aplikace pro správu docházky zaměstnanců s moderním uživatelským rozhraním a pokročilými reporting funkcemi'
        },
        stavebni: {
          title: 'VMQ Výrobní Aplikace',
          description: 'Kompletní systém pro řízení výroby VMQ (silikonových) materiálů s real-time dashboardy a Excel integrací'
        },
        veterinar: {
          title: 'Sklad směsí',
          description: 'Firemní aplikace pro evidenci skladových směsí, zásob a odpadů s automatickým ukládáním dat a intuitivním rozhraním'
        }
      }
    },
    
    // Case Studies section
    caseStudies: {
      title: 'Case Studies',
      subtitle: 'Detailní pohled na vybrané projekty a jejich realizaci',
      modal: {
        caseStudyDetail: 'Case Study Detail',
        projectDescription: 'Popis projektu',
        technologies: 'Technologie',
        keyFeatures: 'Klíčové funkce',
        challenge: 'Výzva',
        solution: 'Řešení',
        results: 'Výsledky',
        photos: 'photos'
      },
      studies: {
        weather: {
          title: 'Weather Ultimate',
          description: 'Aplikace počasí nové generace s AI predikcemi, real-time 3D vizualizacemi a pohlcujícími zvukovými efekty.',
          challenge: 'Vytvořit revoluční aplikaci počasí, která kombinuje přesná data s immersivními 3D efekty a realistickými zvuky. Výzvou bylo integrovat Three.js, Web Audio API a OpenWeatherMap API do plynulé uživatelské zkušenosti.',
          solution: 'Implementoval jsem modulární architekturu s čtyřmi hlavními komponentami: jádro aplikace pro správu stavu, 2D efekty pro základní animace, 3D engine pro volumetrickou mlhu a blesky, a zvukový engine pro syntetizované zvuky počasí. Použil jsem vanilla JavaScript pro maximální výkon.',
          results: 'Aplikace poskytuje unikátní zážitek sledování počasí s realistickými 3D animacemi (déšť, sníh, bouřky), AI predikcemi a zvukovými efekty. Podporuje více měst, má 7-denní předpověď a je optimalizovaná pro všechna zařízení.',
          features: [
            'Real-time 3D animace počasí',
            'AI předpovědi počasí',
            'Syntetizované zvuky pomocí Web Audio API',
            'Sledování více měst současně',
            'Glass-morphism UI design',
            'Mobile-first responzivní design'
          ]
        },
        financial: {
          title: 'Financial Tracker',
          description: 'Moderní aplikace pro sledování osobních financí s Firebase backendem, real-time synchronizací a pokročilými vizuálními efekty.',
          challenge: 'Vytvořit bezpečnou a zábavnou aplikaci pro správu financí s unikátním "denním rozpočtem" reprezentovaným pulzujícím srdcem. Výzvou bylo implementovat real-time synchronizaci s Firebase a vytvořit WOW efekty pro motivaci uživatelů.',
          solution: 'Vyvinul jsem Firebase-powered backend s pokročilou autentizací, real-time Firestore databází a inovativní UI s 3D kartami, magnetickými hover efekty a achievement systémem. Implementoval jsem unikátní "EKG monitor" pro vizualizaci zdraví rozpočtu.',
          results: 'Aplikace poskytuje komplexní správu financí s motivačními prvky jako konfety při synchronizaci, pulzující srdce pro rozpočet a "money rain" efekt. Uživatelé mají přehled o příjmech, výdajích a mohou exportovat data do CSV/PDF.',
          features: [
            'Firebase Authentication (Email/Google)',
            'Real-time synchronizace dat',
            'Pulzující srdce pro denní rozpočet',
            '3D karty s magnetickými hover efekty',
            'Achievement systém s konfetami',
            'Dark/Light mode s plynulými přechody'
          ]
        },
        production: {
          title: 'VMQ Výrobní Aplikace',
          description: 'Kompletní systém pro řízení výroby VMQ (silikonových) materiálů s real-time dashboardy a Excel integrací.',
          challenge: 'Vytvořit enterprise aplikaci pro kompletní řízení výroby silikonových materiálů s importem z Excel souborů, real-time dashboardy a pokročilou archivací dat. Výzvou bylo zvládnout 45 polí výrobních záznamů a komplexní business logiku.',
          solution: 'Implementoval jsem TypeScript aplikaci s Zustand store managementem, automatickým importem z Excel souborů (VMQ_Ztráty_Extruze_2025.xls) a pokročilými Recharts vizualizacemi. Vytvořil jsem archivační systém místo mazání dat a real-time KPI dashboard.',
          results: 'Aplikace úspěšně spravuje celý výrobní proces od importu dat, přes sledování KPI metrik, až po archivaci směsí. Obsahuje kompletní českou lokalizaci, enterprise dark theme design a exportní funkcionalitu.',
          features: [
            'Automatický import z Excel souborů',
            'Real-time KPI dashboard s animacemi',
            'Archivace směsí místo mazání',
            'Komplexní výrobní záznamy (45 polí)',
            'Enterprise dark theme design',
            'Export do Excel s českými hlavičkami'
          ]
        },
        attendance: {
          title: 'Docházkový Systém',
          description: 'React aplikace pro správu docházky zaměstnanců s moderním uživatelským rozhraním a pokročilými reporting funkcemi.',
          challenge: 'Vytvořit intuitivní systém pro evidenci pracovní doby s podporou pro různé projekty, generování reportů a správu uživatelských rolí. Výzvou bylo vytvořit flexibilní systém pro různé typy pracovních pozic.',
          solution: 'Implementoval jsem React aplikaci s modulární architekturou, která podporuje check-in/check-out systém, správu projektů a úkolů, generování reportů a export dat do různých formátů. Vytvořil jsem tmavý i světlý režim pro lepší uživatelskou zkušenost.',
          results: 'Aplikace úspěšně eviduje pracovní dobu zaměstnanců, generuje detailní reporty a statistiky. Podporuje různé uživatelské role a umožňuje export dat pro další zpracování v účetnictví.',
          features: [
            'Check-in/check-out systém',
            'Správa projektů a úkolů',
            'Generování reportů',
            'Uživatelské role a oprávnění',
            'Dark/Light mode',
            'Export dat do různých formátů'
          ]
        },
        waste: {
          title: 'Sklad směsí',
          description: 'Firemní aplikace pro evidenci skladových směsí, zásob a odpadů s automatickým ukládáním dat a intuitivním rozhraním.',
          challenge: 'Vytvořit jednoduchou a spolehlivou aplikaci pro evidenci skladových směsí, kterou mohou používat všichni zaměstnanci bez složitého školení. Výzvou bylo zajistit automatické ukládání dat a možnost zálohy.',
          solution: 'Vyvinul jsem React aplikaci s localStorage pro persistentní ukládání dat, automatickou evidenci odpadů podle kategorií a intuitivní rozhraní pro správu zásob. Implementoval jsem systém zálohování dat a jednoduchou instalaci.',
          results: 'Aplikace je úspěšně nasazena ve firmě a umožňuje efektivní evidenci skladových směsí, sledování odpadů a generování reportů. Zaměstnanci ji používají denně bez potřeby školení.',
          features: [
            'Evidence skladových směsí',
            'Automatické ukládání dat',
            'Kategorizace odpadů',
            'Jednoduché uživatelské rozhraní',
            'Systém zálohování dat',
            'Měsíční přehledy a statistiky'
          ]
        }
      }
    },
    
    // Skills section
    skills: {
      title: 'Moje dovednosti',
      subtitle: 'Technologie, které ovládám'
    },
    
    // Contact section
    contact: {
      title: 'Kontaktujte mě',
      subtitle: 'Rád si s vámi promluvím o vašem projektu',
      description: (
        <>
          Jsem připraven vám pomoci s vývojem <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">moderních webových aplikací</span>. Specializuji se na <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">React</span>, <span className="font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">TypeScript</span> a další <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">moderní technologie</span>.
        </>
      ),
      form: {
        name: 'Jméno',
        email: 'Email',
        message: 'Zpráva',
        send: 'Odeslat zprávu',
        sending: 'Odesílám...'
      },
      info: {
        email: 'Email',
        phone: 'Telefon',
        location: 'Lokace',
        servingCities: 'Působím v městech:',
        clickToOpenMaps: 'Kliknutím otevřete mapy',
        emailHint: 'Použijte formulář'
      },
      success: 'Děkuji za vaši zprávu! Ozvu se vám co nejdříve.',
      error: 'Něco se pokazilo. Zkuste to prosím znovu nebo mě kontaktujte přímo na michalbugy12@gmail.com',
      rateLimit: 'Příliš mnoho požadavků. Zkuste to prosím za {seconds} sekund.'
    },

    // Error handling
    error: {
      title: 'Něco se pokazilo',
      description: 'Omlouváme se, došlo k neočekávané chybě. Zkuste to prosím znovu.',
      technicalDetails: 'Technické detaily',
      tryAgain: 'Zkusit znovu',
      reloadPage: 'Obnovit stránku',
      contactSupport: 'Kontaktovat podporu'
    },
    
    // InfoPanel
    infoPanel: {
      title: 'O tomto webu',
      tech: 'Technologie',
      features: 'Funkce',
      performance: 'Performance Score',
      author: 'Autor',
      stats: {
        images: 'WebP Obrázků',
        bundle: 'Hlavní Bundle',
        worker: 'Service Worker',
        responsive: 'Responsive'
      },
      featuresData: [
        'PWA Ready',
        'Auto Dark/Light Mode (20:00-6:00)',
        'Glassmorphism Design',
        '3D Animace (Lazy loaded)',
        'EmailJS Kontakt',
        'Custom Scrollbar (22px)'
      ]
    },
    
    // Footer
    footer: {
      text: 'Vytvořeno s vášní pro dokonalost.'
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      caseStudies: 'Case Studies',
      skills: 'Skills',
      roiCalculator: 'ROI Calculator',
      contact: 'Contact'
    },
    
    // Hero section
    hero: {
      greeting: 'Hi, I am',
      name: 'Michal Bürgermeister',
      title: 'Frontend Developer',
      description: 'I specialize in React and modern web technologies. I create luxurious, responsive and user-friendly applications for companies from',
      locations: ['Opava', 'Ostrava', 'Nový Jičín', 'Frýdek-Místek', 'Karviná', 'Havířov', 'Třinec', 'Český Těšín'],
      and: 'and the entire Moravian-Silesian Region',
      cta: 'View my work',
      location: 'Kamenka, Czech Republic'
    },
    
    // About section
    about: {
      title: 'About me',
      intro: (
        <>
          I am a <span className="font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">frontend developer</span> from Kamenka in the <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Moravian-Silesian Region</span> with over <span className="font-semibold text-orange-600 dark:text-orange-400">3 years of experience</span>. I specialize in creating modern web applications using the <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">React ecosystem</span>. For complex projects, <span className="font-semibold text-indigo-600 dark:text-indigo-400">I collaborate with a trusted partner</span>, allowing us to deliver <span className="font-semibold text-purple-600 dark:text-purple-400">larger solutions</span> in <span className="font-semibold text-emerald-600 dark:text-emerald-400">shorter time</span>.
        </>
      ),
      experience: (
        <>
          I work with the latest technologies like <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">React 19</span>, <span className="font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">TypeScript</span>, <span className="font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Tailwind CSS</span> and <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Three.js</span>. I create applications that are not just <span className="font-semibold text-green-600 dark:text-green-400">functional</span>, but also <span className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">visually impressive</span> and optimized for <span className="font-semibold text-orange-600 dark:text-orange-400">performance</span>.
        </>
      ),
      cities: 'I provide services for the entire Moravian-Silesian Region including',
      and: 'and',
      aiTitle: 'Working with AI Tools',
      aiDescription: 'I effectively use advanced AI assistants like ChatGPT and Claude',
      aiTools: [
        'Code optimization and code review',
        'Component generation and refactoring',
        'Debugging and problem solving',
        'Documentation and comments',
        'Architecture design and patterns'
      ]
    },
    
    // Projects section
    projects: {
      title: 'My projects',
      subtitle: 'Showcase of modern web applications',
      categories: {
        all: 'All',
        frontend: 'Frontend'
      },
      buttons: {
        gallery: 'Gallery',
        demo: 'Demo',
        contact: 'Contact',
        code: 'Code',
        viewCaseStudy: 'View Case Study'
      },
      projectData: {
        autoservis: {
          title: 'Weather Ultimate',
          description: 'Next-generation weather application with AI predictions, real-time 3D visualizations and immersive sound effects'
        },
        cukrarna: {
          title: 'Financial Tracker',
          description: 'Modern application for personal finance tracking with Firebase backend, real-time synchronization and advanced visual effects'
        },
        fitness: {
          title: 'Attendance System',
          description: 'React application for employee attendance management with modern user interface and advanced reporting features'
        },
        stavebni: {
          title: 'VMQ Production Application',
          description: 'Complete system for VMQ (silicone) materials production management with real-time dashboards and Excel integration'
        },
        veterinar: {
          title: 'Warehouse Mixtures',
          description: 'Corporate application for warehouse mixture inventory, stocks and waste with automatic data saving and intuitive interface'
        }
      }
    },
    
    // Case Studies section
    caseStudies: {
      title: 'Case Studies',
      subtitle: 'Detailed look at selected projects and their implementation',
      modal: {
        caseStudyDetail: 'Case Study Detail',
        projectDescription: 'Project Description',
        technologies: 'Technologies',
        keyFeatures: 'Key Features',
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        photos: 'photos'
      },
      studies: {
        weather: {
          title: 'Weather Ultimate',
          description: 'Next-generation weather application with AI predictions, real-time 3D visualizations and immersive sound effects.',
          challenge: 'Create a revolutionary weather app that combines accurate data with immersive 3D effects and realistic sounds. The challenge was integrating Three.js, Web Audio API, and OpenWeatherMap API into a seamless user experience.',
          solution: 'I implemented a modular architecture with four main components: application core for state management, 2D effects for basic animations, 3D engine for volumetric fog and lightning, and sound engine for synthesized weather sounds. I used vanilla JavaScript for maximum performance.',
          results: 'The application provides a unique weather monitoring experience with realistic 3D animations (rain, snow, storms), AI predictions and sound effects. It supports multiple cities, has a 7-day forecast and is optimized for all devices.',
          features: [
            'Real-time 3D weather animations',
            'AI weather predictions',
            'Synthesized sounds using Web Audio API',
            'Multiple city tracking simultaneously',
            'Glass-morphism UI design',
            'Mobile-first responsive design'
          ]
        },
        financial: {
          title: 'Financial Tracker',
          description: 'Modern application for personal finance tracking with Firebase backend, real-time synchronization and advanced visual effects.',
          challenge: 'Create a secure and fun finance management app with a unique "daily budget" represented by a pulsing heart. The challenge was implementing real-time Firebase synchronization and creating WOW effects to motivate users.',
          solution: 'I developed a Firebase-powered backend with advanced authentication, real-time Firestore database and innovative UI with 3D cards, magnetic hover effects and achievement system. I implemented a unique "EKG monitor" for budget health visualization.',
          results: 'The application provides comprehensive financial management with motivational elements like confetti on sync, pulsing heart for budget and "money rain" effect. Users have overview of income, expenses and can export data to CSV/PDF.',
          features: [
            'Firebase Authentication (Email/Google)',
            'Real-time data synchronization',
            'Pulsing heart for daily budget',
            '3D cards with magnetic hover effects',
            'Achievement system with confetti',
            'Dark/Light mode with smooth transitions'
          ]
        },
        production: {
          title: 'VMQ Production Application',
          description: 'Complete system for VMQ (silicone) materials production management with real-time dashboards and Excel integration.',
          challenge: 'Create an enterprise application for complete silicone material production management with Excel file imports, real-time dashboards and advanced data archiving. The challenge was handling 45 production record fields and complex business logic.',
          solution: 'I implemented a TypeScript application with Zustand store management, automatic Excel file imports (VMQ_Ztráty_Extruze_2025.xls) and advanced Recharts visualizations. I created an archiving system instead of data deletion and real-time KPI dashboard.',
          results: 'The application successfully manages the entire production process from data import, through KPI metrics monitoring, to mixture archiving. It includes complete Czech localization, enterprise dark theme design and export functionality.',
          features: [
            'Automatic Excel file import',
            'Real-time KPI dashboard with animations',
            'Mixture archiving instead of deletion',
            'Complex production records (45 fields)',
            'Enterprise dark theme design',
            'Excel export with Czech headers'
          ]
        },
        attendance: {
          title: 'Attendance System',
          description: 'React application for employee attendance management with modern user interface and advanced reporting features.',
          challenge: 'Create an intuitive system for work time tracking with support for various projects, report generation and user role management. The challenge was creating a flexible system for different types of work positions.',
          solution: 'I implemented a React application with modular architecture that supports check-in/check-out system, project and task management, report generation and data export to various formats. I created both dark and light modes for better user experience.',
          results: 'The application successfully tracks employee work time, generates detailed reports and statistics. It supports various user roles and allows data export for further processing in accounting.',
          features: [
            'Check-in/check-out system',
            'Project and task management',
            'Report generation',
            'User roles and permissions',
            'Dark/Light mode',
            'Data export to various formats'
          ]
        },
        waste: {
          title: 'Warehouse Mixtures',
          description: 'Corporate application for warehouse mixture inventory, stocks and waste with automatic data saving and intuitive interface.',
          challenge: 'Create a simple and reliable application for warehouse mixture inventory that all employees can use without complex training. The challenge was ensuring automatic data saving and backup capability.',
          solution: 'I developed a React application with localStorage for persistent data storage, automatic waste tracking by categories and intuitive interface for stock management. I implemented a data backup system and simple installation.',
          results: 'The application is successfully deployed in the company and enables efficient warehouse mixture inventory, waste tracking and report generation. Employees use it daily without need for training.',
          features: [
            'Warehouse mixture inventory',
            'Automatic data saving',
            'Waste categorization',
            'Simple user interface',
            'Data backup system',
            'Monthly overviews and statistics'
          ]
        }
      }
    },
    
    // Skills section
    skills: {
      title: 'My skills',
      subtitle: 'Technologies I master'
    },
    
    // Contact section
    contact: {
      title: 'Contact me',
      subtitle: 'I would love to talk about your project',
      description: (
        <>
          I am ready to help you develop <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">modern web applications</span>. I specialize in <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">React</span>, <span className="font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">TypeScript</span> and other <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">modern technologies</span>.
        </>
      ),
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send message',
        sending: 'Sending...'
      },
      info: {
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        servingCities: 'I serve cities:',
        clickToOpenMaps: 'Click to open maps',
        emailHint: 'Use the form'
      },
      success: 'Thank you for your message! I will get back to you as soon as possible.',
      error: 'Something went wrong. Please try again or contact me directly at michalbugy12@gmail.com',
      rateLimit: 'Too many requests. Please try again in {seconds} seconds.'
    },

    // Error handling
    error: {
      title: 'Something went wrong',
      description: 'We apologize, an unexpected error occurred. Please try again.',
      technicalDetails: 'Technical Details',
      tryAgain: 'Try Again',
      reloadPage: 'Reload Page',
      contactSupport: 'Contact Support'
    },
    
    // InfoPanel
    infoPanel: {
      title: 'About this website',
      tech: 'Technologies',
      features: 'Features',
      performance: 'Performance Score',
      author: 'Author',
      stats: {
        images: 'WebP Images',
        bundle: 'Main Bundle',
        worker: 'Service Worker',
        responsive: 'Responsive'
      },
      featuresData: [
        'PWA Ready',
        'Auto Dark/Light Mode (8PM-6AM)',
        'Glassmorphism Design',
        '3D Animations (Lazy loaded)',
        'EmailJS Contact',
        'Custom Scrollbar (22px)'
      ]
    },
    
    // Footer
    footer: {
      text: 'Created with passion for perfection.'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('cs');
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };
  
  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      t,
      isEnglish: currentLanguage === 'en'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
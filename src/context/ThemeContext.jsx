import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Inicializace podle aktuálního času už při prvním renderu
  const [isDark, setIsDark] = useState(() => {
    // Vždy se nastavuje podle času, localStorage se nepoužívá pro automatické přepínání
    const hour = new Date().getHours();
    return hour < 6 || hour >= 20; // 20:00 - 6:00 je noční režim
  });


  // Automatické přepínání podle času
  useEffect(() => {
    const checkTime = () => {
      // Vždy se přepíná podle času, bez ohledu na ruční nastavení
      const hour = new Date().getHours();
      const isNightTime = hour < 6 || hour >= 20; // 20:00 - 6:00 je noční režim
      setIsDark(isNightTime);
    };

    // Okamžitá kontrola při načtení
    checkTime();
    
    // Kontrola každou minutu
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
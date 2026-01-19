// Copie du fichier de correction pour le projet fonctionnel
// Voir etapes/etape-6-context-hooks/correction/ThemeContext.jsx pour les explications détaillées

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }

  function setTheme(newTheme) {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  }

  const value = {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
}

export default ThemeContext;

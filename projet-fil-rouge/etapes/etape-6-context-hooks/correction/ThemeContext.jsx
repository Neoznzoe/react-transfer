// ═══════════════════════════════════════════════════════════════════════════
// THEMECONTEXT.JSX - Contexte pour le thème clair/sombre
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Context API pour état global
// - Hook personnalisé useLocalStorage
// - Effet sur le DOM (classe CSS sur body)
//
// ═══════════════════════════════════════════════════════════════════════════

import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

// ═══════════════════════════════════════════════════════════════════════════
// CRÉER LE CONTEXTE
// ═══════════════════════════════════════════════════════════════════════════
const ThemeContext = createContext(null);

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════════════
export function ThemeProvider({ children }) {
  // ─────────────────────────────────────────────────────────────────────────
  // STATE PERSISTÉ
  //
  // On utilise notre hook useLocalStorage pour que le choix du thème
  // soit conservé entre les sessions
  // ─────────────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // ─────────────────────────────────────────────────────────────────────────
  // EFFET : Appliquer le thème au DOM
  //
  // ⚠️ POINT BLOQUANT : Manipuler le DOM avec useEffect
  //
  // On ajoute une classe au body pour que le CSS puisse s'adapter
  // C'est une des rares fois où on manipule le DOM directement en React
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Retirer les anciennes classes de thème
    document.body.classList.remove('theme-light', 'theme-dark');

    // Ajouter la nouvelle classe
    document.body.classList.add(`theme-${theme}`);

    // Mettre à jour l'attribut data-theme (utile pour CSS)
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ─────────────────────────────────────────────────────────────────────────
  // FONCTIONS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Basculer entre les thèmes
   */
  function toggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  /**
   * Définir un thème spécifique
   * @param {'light' | 'dark'} newTheme
   */
  function setThemeValue(newTheme) {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // VALEUR DU CONTEXTE
  // ─────────────────────────────────────────────────────────────────────────
  const value = {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme: setThemeValue,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK PERSONNALISÉ
// ═══════════════════════════════════════════════════════════════════════════
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme doit être utilisé à l\'intérieur d\'un <ThemeProvider>'
    );
  }

  return context;
}

export default ThemeContext;


// ═══════════════════════════════════════════════════════════════════════════
// CSS NÉCESSAIRE (à ajouter dans index.css ou App.css)
// ═══════════════════════════════════════════════════════════════════════════
//
// /* Variables CSS pour le thème */
// :root {
//   --bg-primary: #ffffff;
//   --bg-secondary: #f3f4f6;
//   --text-primary: #1f2937;
//   --text-secondary: #6b7280;
//   --border-color: #e5e7eb;
// }
//
// /* Thème sombre */
// [data-theme="dark"] {
//   --bg-primary: #1f2937;
//   --bg-secondary: #111827;
//   --text-primary: #f9fafb;
//   --text-secondary: #9ca3af;
//   --border-color: #374151;
// }
//
// /* Appliquer les variables */
// body {
//   background-color: var(--bg-secondary);
//   color: var(--text-primary);
//   transition: background-color 0.3s ease, color 0.3s ease;
// }
//
// ═══════════════════════════════════════════════════════════════════════════

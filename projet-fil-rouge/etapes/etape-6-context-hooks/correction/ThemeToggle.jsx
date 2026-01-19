// ═══════════════════════════════════════════════════════════════════════════
// THEMETOGGLE.JSX - Composant bouton de changement de thème
// ═══════════════════════════════════════════════════════════════════════════

import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  // Consommer le contexte du thème
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      aria-label={`Basculer vers le thème ${isDark ? 'clair' : 'sombre'}`}
      title={`Thème actuel : ${theme}`}
    >
      <span className="toggle-icon">
        {isDark ? '🌙' : '☀️'}
      </span>
      <span className="toggle-label">
        {isDark ? 'Sombre' : 'Clair'}
      </span>
    </button>
  );
}

export default ThemeToggle;

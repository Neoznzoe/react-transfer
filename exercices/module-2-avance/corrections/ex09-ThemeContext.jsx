// Exercice 9 - Context API pour thème global
// Concepts : createContext, useContext, Provider, Consumer

import { createContext, useContext, useState, useCallback } from 'react';
import './ThemeContext.css';

// Définition des thèmes
const themes = {
  light: {
    name: 'light',
    colors: {
      background: '#ffffff',
      surface: '#f3f4f6',
      text: '#1f2937',
      textSecondary: '#6b7280',
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      border: '#e5e7eb',
    }
  },
  dark: {
    name: 'dark',
    colors: {
      background: '#1f2937',
      surface: '#374151',
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      primary: '#60a5fa',
      primaryHover: '#3b82f6',
      border: '#4b5563',
    }
  },
  nature: {
    name: 'nature',
    colors: {
      background: '#ecfdf5',
      surface: '#d1fae5',
      text: '#064e3b',
      textSecondary: '#047857',
      primary: '#10b981',
      primaryHover: '#059669',
      border: '#a7f3d0',
    }
  }
};

// Création du Context
const ThemeContext = createContext(null);

// Provider Component
function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('light');

  const theme = themes[currentTheme];

  const setTheme = useCallback((themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = {
    theme,
    currentTheme,
    setTheme,
    toggleTheme,
    availableThemes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook pour utiliser le contexte
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
}

// Composants utilisant le thème

function Header() {
  const { theme, toggleTheme, currentTheme } = useTheme();

  return (
    <header
      className="theme-header"
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border
      }}
    >
      <h1 style={{ color: theme.colors.text }}>🎨 Theme Context Demo</h1>
      <button
        onClick={toggleTheme}
        className="toggle-btn"
        style={{
          backgroundColor: theme.colors.primary,
          color: '#fff'
        }}
      >
        {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}

function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes, theme } = useTheme();

  return (
    <div
      className="theme-selector"
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border
      }}
    >
      <h3 style={{ color: theme.colors.text }}>Choisir un thème</h3>
      <div className="theme-buttons">
        {availableThemes.map(themeName => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            className={`theme-btn ${currentTheme === themeName ? 'active' : ''}`}
            style={{
              backgroundColor: currentTheme === themeName
                ? theme.colors.primary
                : theme.colors.background,
              color: currentTheme === themeName
                ? '#fff'
                : theme.colors.text,
              borderColor: theme.colors.border
            }}
          >
            {themeName === 'light' && '☀️'}
            {themeName === 'dark' && '🌙'}
            {themeName === 'nature' && '🌿'}
            {' '}{themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  const { theme } = useTheme();

  return (
    <div
      className="theme-card"
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border
      }}
    >
      <h3 style={{ color: theme.colors.text }}>{title}</h3>
      <div style={{ color: theme.colors.textSecondary }}>{children}</div>
    </div>
  );
}

function Button({ children, onClick }) {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className="themed-button"
      style={{
        backgroundColor: theme.colors.primary,
        color: '#fff'
      }}
    >
      {children}
    </button>
  );
}

function Input({ placeholder, ...props }) {
  const { theme } = useTheme();

  return (
    <input
      {...props}
      placeholder={placeholder}
      className="themed-input"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        borderColor: theme.colors.border
      }}
    />
  );
}

function ContentArea() {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="content-area">
      <ThemeSelector />

      <div className="cards-grid">
        <Card title="Carte d'exemple">
          <p>Cette carte s'adapte automatiquement au thème sélectionné.</p>
          <p>Le contexte permet de partager l'état du thème dans toute l'app.</p>
        </Card>

        <Card title="Formulaire thématisé">
          <Input
            placeholder="Tapez quelque chose..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={() => alert(`Valeur: ${inputValue}`)}>
            Soumettre
          </Button>
        </Card>

        <Card title="Avantages du Context">
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>Pas de prop drilling</li>
            <li>État global accessible partout</li>
            <li>Re-render optimisé</li>
            <li>Séparation des concerns</li>
          </ul>
        </Card>
      </div>

      <div
        className="color-palette"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border
        }}
      >
        <h3 style={{ color: theme.colors.text }}>Palette de couleurs actuelle</h3>
        <div className="colors-grid">
          {Object.entries(theme.colors).map(([name, color]) => (
            <div key={name} className="color-item">
              <div
                className="color-swatch"
                style={{ backgroundColor: color }}
              />
              <span style={{ color: theme.colors.text }}>{name}</span>
              <code style={{ color: theme.colors.textSecondary }}>{color}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant principal
function ThemeContextDemo() {
  const { theme } = useTheme();

  return (
    <div
      className="theme-app"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Header />
      <ContentArea />
    </div>
  );
}

// Export avec Provider
function App() {
  return (
    <ThemeProvider>
      <ThemeContextDemo />
    </ThemeProvider>
  );
}

export default App;

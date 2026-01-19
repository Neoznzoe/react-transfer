// Exercice 8 - Toggle de thème
// Concepts : Classes dynamiques, useState

import { useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return (
    <div className={`theme-container ${isDark ? 'dark' : 'light'}`}>
      <div className="theme-card">
        <h2>Toggle de Thème</h2>
        <p>Le thème actuel est : <strong>{isDark ? 'Sombre' : 'Clair'}</strong></p>

        <button
          onClick={toggleTheme}
          className={`theme-btn ${isDark ? 'btn-light' : 'btn-dark'}`}
        >
          {isDark ? '☀️ Passer en clair' : '🌙 Passer en sombre'}
        </button>

        <div className="demo-content">
          <h3>Contenu de démonstration</h3>
          <p>
            Ce contenu change d'apparence selon le thème sélectionné.
            Les classes CSS sont appliquées dynamiquement.
          </p>
          <div className="demo-boxes">
            <div className="demo-box">Box 1</div>
            <div className="demo-box">Box 2</div>
            <div className="demo-box">Box 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeToggle;

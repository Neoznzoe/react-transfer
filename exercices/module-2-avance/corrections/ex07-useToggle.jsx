// Exercice 7 - Custom Hook useToggle
// Concepts : Création de hooks personnalisés, réutilisation de logique

import { useState, useCallback } from 'react';
import './useToggle.css';

// Custom Hook useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, { setTrue, setFalse, setValue }];
}

// Custom Hook useLocalStorage (bonus)
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Erreur localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// Composant Modal utilisant useToggle
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// Composant Accordion utilisant useToggle
function AccordionItem({ title, children }) {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={toggle}>
        <span>{title}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
}

// Composant principal de démonstration
function UseToggleDemo() {
  // Modal avec useToggle
  const [isModalOpen, toggleModal, { setFalse: closeModal }] = useToggle(false);

  // Dark mode avec useToggle
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  // Sidebar avec useToggle
  const [isSidebarOpen, toggleSidebar] = useToggle(true);

  // Favoris avec useLocalStorage
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const toggleFavorite = (item) => {
    setFavorites(prev =>
      prev.includes(item)
        ? prev.filter(f => f !== item)
        : [...prev, item]
    );
  };

  const items = ['React', 'Vue', 'Angular', 'Svelte'];

  return (
    <div className={`toggle-demo ${isDarkMode ? 'dark' : ''}`}>
      <div className="demo-header">
        <h2>Demo useToggle & useLocalStorage</h2>
        <button onClick={toggleDarkMode} className="theme-btn">
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="demo-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <h3>Menu</h3>
          <ul>
            <li>Accueil</li>
            <li>Profil</li>
            <li>Paramètres</li>
          </ul>
        </aside>

        <main className="main-area">
          <button onClick={toggleSidebar} className="toggle-sidebar-btn">
            {isSidebarOpen ? '◀ Fermer' : '▶ Ouvrir'} Sidebar
          </button>

          {/* Section Modal */}
          <section className="demo-section">
            <h3>Modal avec useToggle</h3>
            <button onClick={toggleModal} className="action-btn">
              Ouvrir la Modal
            </button>
          </section>

          {/* Section Accordion */}
          <section className="demo-section">
            <h3>Accordion avec useToggle</h3>
            <div className="accordion">
              <AccordionItem title="Qu'est-ce que useToggle ?">
                useToggle est un custom hook qui encapsule la logique
                de basculement d'un état booléen.
              </AccordionItem>
              <AccordionItem title="Pourquoi créer des custom hooks ?">
                Les custom hooks permettent de réutiliser la logique
                entre composants sans dupliquer le code.
              </AccordionItem>
              <AccordionItem title="Comment tester un custom hook ?">
                On peut utiliser @testing-library/react-hooks ou
                tester les composants qui utilisent le hook.
              </AccordionItem>
            </div>
          </section>

          {/* Section Favoris */}
          <section className="demo-section">
            <h3>Favoris avec useLocalStorage</h3>
            <p className="hint">Les favoris persistent après refresh !</p>
            <div className="favorites-grid">
              {items.map(item => (
                <button
                  key={item}
                  onClick={() => toggleFavorite(item)}
                  className={`favorite-btn ${favorites.includes(item) ? 'active' : ''}`}
                >
                  {favorites.includes(item) ? '★' : '☆'} {item}
                </button>
              ))}
            </div>
            <p className="selected">
              Sélectionnés: {favorites.length > 0 ? favorites.join(', ') : 'Aucun'}
            </p>
          </section>
        </main>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Exemple de Modal">
        <p>Cette modal utilise le hook useToggle pour gérer son état ouvert/fermé.</p>
        <p>Cliquez en dehors ou sur × pour fermer.</p>
      </Modal>
    </div>
  );
}

export default UseToggleDemo;

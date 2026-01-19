// ═══════════════════════════════════════════════════════════════════════════
// USELOCALSTORAGE.JS - Hook personnalisé pour la persistance
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Custom hook (fonction commençant par "use")
// - useState avec initialisation paresseuse
// - useEffect pour la synchronisation
// - Sérialisation JSON
//
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour persister un state dans localStorage
 *
 * ⚠️ POINT BLOQUANT : Qu'est-ce qu'un custom hook ?
 *
 * Un custom hook est une fonction JavaScript qui :
 * - Commence par "use" (convention obligatoire)
 * - Peut utiliser d'autres hooks (useState, useEffect, etc.)
 * - Permet de réutiliser de la logique stateful entre composants
 *
 * @param {string} key - La clé localStorage
 * @param {any} initialValue - La valeur initiale si rien n'est stocké
 * @returns {[any, function]} - [valeur, setValue] comme useState
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * // theme est initialisé depuis localStorage ou 'light' si absent
 * // setTheme('dark') met à jour le state ET localStorage
 */
function useLocalStorage(key, initialValue) {
  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALISATION DU STATE
  //
  // ⚠️ POINT BLOQUANT : Lazy initialization
  //
  // On passe une FONCTION à useState au lieu d'une valeur directe :
  // useState(() => { ... })
  //
  // Pourquoi ? La fonction n'est exécutée qu'au PREMIER rendu
  // Cela évite de lire localStorage à chaque re-rendu
  // ═══════════════════════════════════════════════════════════════════════════
  const [storedValue, setStoredValue] = useState(() => {
    // ─────────────────────────────────────────────────────────────────────────
    // VÉRIFICATION CÔTÉ CLIENT
    //
    // ⚠️ POINT BLOQUANT : SSR (Server-Side Rendering)
    //
    // localStorage n'existe pas côté serveur (Node.js)
    // On vérifie que window existe avant d'y accéder
    // ─────────────────────────────────────────────────────────────────────────
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Essayer de lire depuis localStorage
      const item = window.localStorage.getItem(key);

      // ⚠️ JSON.parse pour convertir la chaîne en objet/valeur
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // En cas d'erreur (JSON invalide, etc.), utiliser la valeur initiale
      console.warn(`Erreur lecture localStorage pour "${key}":`, error);
      return initialValue;
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SYNCHRONISATION AVEC LOCALSTORAGE
  //
  // ⚠️ POINT BLOQUANT : useEffect pour les effets de bord
  //
  // Chaque fois que storedValue ou key change, on met à jour localStorage
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // ⚠️ JSON.stringify pour convertir en chaîne
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Erreur écriture localStorage pour "${key}":`, error);
    }
  }, [key, storedValue]);

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTION DE MISE À JOUR
  //
  // ⚠️ POINT BLOQUANT : Compatibilité avec le pattern de setState
  //
  // setValue peut recevoir :
  // - Une valeur directe : setValue('dark')
  // - Une fonction : setValue(prev => prev === 'light' ? 'dark' : 'light')
  // ═══════════════════════════════════════════════════════════════════════════
  const setValue = (value) => {
    try {
      // Gérer le cas où value est une fonction
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;

      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Erreur mise à jour localStorage pour "${key}":`, error);
    }
  };

  // Retourner le même format que useState : [value, setValue]
  return [storedValue, setValue];
}

export default useLocalStorage;


// ═══════════════════════════════════════════════════════════════════════════
// EXEMPLES D'UTILISATION
// ═══════════════════════════════════════════════════════════════════════════
//
// 1. Thème clair/sombre :
//
//    function ThemeToggle() {
//      const [theme, setTheme] = useLocalStorage('theme', 'light');
//
//      const toggleTheme = () => {
//        setTheme(prev => prev === 'light' ? 'dark' : 'light');
//      };
//
//      return (
//        <button onClick={toggleTheme}>
//          Thème : {theme}
//        </button>
//      );
//    }
//
// 2. Préférences utilisateur :
//
//    function Settings() {
//      const [prefs, setPrefs] = useLocalStorage('userPrefs', {
//        notifications: true,
//        language: 'fr',
//      });
//
//      const toggleNotifications = () => {
//        setPrefs(prev => ({
//          ...prev,
//          notifications: !prev.notifications,
//        }));
//      };
//    }
//
// 3. Historique de recherche :
//
//    function SearchBar() {
//      const [history, setHistory] = useLocalStorage('searchHistory', []);
//
//      const addToHistory = (term) => {
//        setHistory(prev => [term, ...prev.slice(0, 9)]);  // Max 10 items
//      };
//    }
//
// ═══════════════════════════════════════════════════════════════════════════

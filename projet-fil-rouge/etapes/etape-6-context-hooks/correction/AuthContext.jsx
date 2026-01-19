// ═══════════════════════════════════════════════════════════════════════════
// AUTHCONTEXT.JSX - Contexte d'authentification global
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - createContext pour créer un contexte
// - Provider pattern pour fournir les données
// - Hook personnalisé pour consommer le contexte
// - Persistance avec localStorage
//
// ═══════════════════════════════════════════════════════════════════════════

import { createContext, useContext, useState, useEffect } from 'react';
import { getEmployeeById } from '../../../data/employees';

// ═══════════════════════════════════════════════════════════════════════════
// ÉTAPE 1 : CRÉER LE CONTEXTE
//
// ⚠️ POINT BLOQUANT : createContext
//
// createContext(defaultValue) crée un objet Context
// - defaultValue : utilisé quand un composant n'est pas dans un Provider
// - Généralement null ou une valeur par défaut
//
// Le contexte a deux propriétés importantes :
// - Context.Provider : composant pour fournir les données
// - Context.Consumer : (ancien) composant pour consommer (remplacé par useContext)
// ═══════════════════════════════════════════════════════════════════════════
const AuthContext = createContext(null);

// ═══════════════════════════════════════════════════════════════════════════
// ÉTAPE 2 : CRÉER LE PROVIDER
//
// Le Provider est un composant qui :
// - Enveloppe les composants qui ont besoin du contexte
// - Fournit une `value` accessible à tous ses descendants
// - Gère la logique et le state liés à l'authentification
// ═══════════════════════════════════════════════════════════════════════════
export function AuthProvider({ children }) {
  // ─────────────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ─────────────────────────────────────────────────────────────────────────
  // EFFECT : Charger l'utilisateur depuis localStorage au démarrage
  //
  // ⚠️ POINT BLOQUANT : Persistance de session
  //
  // On stocke l'ID de l'utilisateur dans localStorage
  // Au chargement de l'app, on récupère cet ID et on charge l'utilisateur
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const storedUserId = localStorage.getItem('currentUserId');

    if (storedUserId) {
      const foundUser = getEmployeeById(Number(storedUserId));
      if (foundUser) {
        setUser(foundUser);
      }
    }

    setIsLoading(false);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // FONCTIONS D'AUTHENTIFICATION
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Connecter un utilisateur
   * @param {number} userId - L'ID de l'utilisateur à connecter
   */
  function login(userId) {
    const foundUser = getEmployeeById(userId);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUserId', String(userId));
      return true;
    }

    return false;
  }

  /**
   * Déconnecter l'utilisateur
   */
  function logout() {
    setUser(null);
    localStorage.removeItem('currentUserId');
  }

  /**
   * Mettre à jour les données de l'utilisateur
   * @param {object} updatedData - Les nouvelles données
   */
  function updateUser(updatedData) {
    setUser(prev => ({ ...prev, ...updatedData }));
  }

  // ─────────────────────────────────────────────────────────────────────────
  // VALEUR FOURNIE AU CONTEXTE
  //
  // ⚠️ POINT BLOQUANT : Que mettre dans value ?
  //
  // Tout ce qui doit être accessible aux descendants :
  // - Les données (user)
  // - Les fonctions pour modifier ces données (login, logout)
  // - Les états dérivés (isAuthenticated)
  // ─────────────────────────────────────────────────────────────────────────
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,  // Convertit user en booléen
    login,
    logout,
    updateUser,
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDU
  //
  // ⚠️ POINT BLOQUANT : Provider avec value
  //
  // <AuthContext.Provider value={value}> rend `value` accessible à tous
  // les composants enfants qui utilisent useContext(AuthContext)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ÉTAPE 3 : HOOK PERSONNALISÉ POUR CONSOMMER LE CONTEXTE
//
// ⚠️ POINT BLOQUANT : Pourquoi un hook personnalisé ?
//
// Au lieu de faire :
//   const context = useContext(AuthContext);
//   if (!context) throw new Error(...);
//
// On encapsule cette logique dans useAuth() :
// - Plus simple à utiliser
// - Vérifie que le Provider est présent
// - Meilleurs messages d'erreur
// ═══════════════════════════════════════════════════════════════════════════
export function useAuth() {
  const context = useContext(AuthContext);

  // Vérifier que le hook est utilisé dans un AuthProvider
  if (!context) {
    throw new Error(
      'useAuth doit être utilisé à l\'intérieur d\'un <AuthProvider>. ' +
      'Vérifiez que votre composant est bien enveloppé par <AuthProvider>.'
    );
  }

  return context;
}

// Export par défaut du contexte (rarement utilisé directement)
export default AuthContext;


// ═══════════════════════════════════════════════════════════════════════════
// NOTES PÉDAGOGIQUES : Comment utiliser
// ═══════════════════════════════════════════════════════════════════════════
//
// 1. Envelopper l'application avec le Provider (dans main.jsx ou App.jsx) :
//
//    import { AuthProvider } from './contexts/AuthContext';
//
//    <AuthProvider>
//      <App />
//    </AuthProvider>
//
// 2. Utiliser le hook dans n'importe quel composant descendant :
//
//    import { useAuth } from './contexts/AuthContext';
//
//    function Header() {
//      const { user, logout, isAuthenticated } = useAuth();
//
//      if (!isAuthenticated) {
//        return <LoginButton />;
//      }
//
//      return (
//        <div>
//          Bonjour {user.firstName}
//          <button onClick={logout}>Déconnexion</button>
//        </div>
//      );
//    }
//
// ═══════════════════════════════════════════════════════════════════════════

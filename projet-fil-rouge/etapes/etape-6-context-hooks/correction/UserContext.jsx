// Contexte utilisateur - Gère l'utilisateur actuellement sélectionné
// Remplace un vrai système d'authentification par un sélecteur simple

import { createContext, useContext, useState } from 'react';
import { employees } from '../../../src/data/employees';

// 1. Créer le contexte
const UserContext = createContext(null);

// 2. Créer le Provider
function UserProvider({ children }) {
  // Par défaut, le premier utilisateur (Victor) est sélectionné
  const [currentUser, setCurrentUser] = useState(employees[0]);

  // Fonction pour changer d'utilisateur
  const selectUser = (userId) => {
    const user = employees.find(e => e.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  // Fonction pour "déconnecter" (remettre à null)
  const clearUser = () => {
    setCurrentUser(null);
  };

  // Valeur fournie à tous les descendants
  const value = {
    currentUser,
    selectUser,
    clearUser,
    isAdmin: currentUser?.isAdmin || false,
    isLoggedIn: currentUser !== null,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Hook personnalisé pour consommer le contexte
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
}

export { UserProvider, useUser };

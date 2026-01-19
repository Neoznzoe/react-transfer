// Contexte utilisateur - Gère l'utilisateur actuellement sélectionné
// Utilise un sélecteur simple plutôt qu'un vrai système d'authentification

import { createContext, useContext, useState, useEffect } from 'react';
import { employees, getEmployeeById } from '../data/employees';

// Créer le contexte
const UserContext = createContext(null);

// Provider du contexte
export function UserProvider({ children }) {
  // Récupérer l'utilisateur sauvegardé ou prendre le premier par défaut
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUserId = localStorage.getItem('selectedUserId');
    if (storedUserId) {
      const user = getEmployeeById(Number(storedUserId));
      if (user) return user;
    }
    return employees[0]; // Victor par défaut
  });

  // Sauvegarder l'utilisateur sélectionné dans localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('selectedUserId', String(currentUser.id));
    }
  }, [currentUser]);

  // Fonction pour changer d'utilisateur
  function selectUser(userId) {
    const user = getEmployeeById(userId);
    if (user) {
      setCurrentUser(user);
    }
  }

  // Valeur fournie à tous les descendants
  const value = {
    currentUser,
    selectUser,
    isAdmin: currentUser?.isAdmin || false,
    // Liste des employés disponibles pour le sélecteur
    availableUsers: employees,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
}

export default UserContext;

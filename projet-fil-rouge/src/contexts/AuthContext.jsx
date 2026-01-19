// Copie du fichier de correction pour le projet fonctionnel
// Voir etapes/etape-6-context-hooks/correction/AuthContext.jsx pour les explications détaillées

import { createContext, useContext, useState, useEffect } from 'react';
import { getEmployeeById } from '../data/employees';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  function login(userId) {
    const foundUser = getEmployeeById(userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUserId', String(userId));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('currentUserId');
  }

  function updateUser(updatedData) {
    setUser(prev => ({ ...prev, ...updatedData }));
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}

export default AuthContext;

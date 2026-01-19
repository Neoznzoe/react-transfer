# Étape 6 : Context API et Hooks personnalisés

## Objectif

Finaliser l'application avec un état global (authentification) et des fonctionnalités transversales (thème, persistance).

## Concepts pratiqués

- Context API pour l'état global
- useContext pour consommer le contexte
- Hooks personnalisés (custom hooks)
- Persistance avec localStorage

---

## À créer

### 1. `AuthContext.jsx` - Contexte d'authentification

Un contexte global pour :
- Stocker l'utilisateur connecté
- Fournir des fonctions login/logout
- Accessible partout dans l'application

### 2. `useLocalStorage.js` - Hook personnalisé

Un hook qui :
- Synchronise un state avec localStorage
- Persiste les données entre les sessions
- Gère la sérialisation/désérialisation

### 3. Thème clair/sombre

Une fonctionnalité qui :
- Toggle entre thème clair et sombre
- Persiste le choix via useLocalStorage
- Applique les styles CSS correspondants

---

## Context API : Quand l'utiliser ?

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            SANS CONTEXT                                 │
│                                                                         │
│                              App                                        │
│                               │                                         │
│                        user={user}                                      │
│                               │                                         │
│                            Layout                                       │
│                               │                                         │
│                        user={user}                                      │
│                               │                                         │
│                            Header                                       │
│                               │                                         │
│                        user={user}  ← "Prop drilling"                  │
│                               │                                         │
│                          UserMenu                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                            AVEC CONTEXT                                 │
│                                                                         │
│              AuthProvider ─────────────────────┐                        │
│                    │                           │                        │
│                   App                     Context                       │
│                    │                       user                         │
│                 Layout                         │                        │
│                    │                           │                        │
│                 Header                         │                        │
│                    │                           │                        │
│               UserMenu ◄───────────────────────┘                        │
│                                                                         │
│              Accès direct sans passer par les props !                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Indices

<details>
<summary>💡 Structure d'un Context</summary>

```jsx
// 1. Créer le contexte
const AuthContext = createContext(null);

// 2. Créer le Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // Valeur fournie à tous les descendants
  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook personnalisé pour consommer
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}
```

</details>

<details>
<summary>💡 Hook useLocalStorage</summary>

```jsx
function useLocalStorage(key, initialValue) {
  // État initialisé depuis localStorage
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // Synchroniser avec localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

</details>

---

## Points d'attention

### ⚠️ Provider doit envelopper l'application

```jsx
// Dans main.jsx ou App.jsx
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>
```

### ⚠️ Vérifier que le context existe

```jsx
function useAuth() {
  const context = useContext(AuthContext);

  // Si useAuth() est appelé en dehors du Provider
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }

  return context;
}
```

### ⚠️ localStorage et SSR

```jsx
// localStorage n'existe pas côté serveur
const [value, setValue] = useState(() => {
  // Vérifier qu'on est côté client
  if (typeof window === 'undefined') {
    return initialValue;
  }
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : initialValue;
});
```

---

## Critères de validation

- [ ] L'utilisateur connecté est accessible partout
- [ ] Le login/logout fonctionne
- [ ] Le thème toggle fonctionne
- [ ] Le choix du thème est persisté
- [ ] Pas d'erreur si context non disponible

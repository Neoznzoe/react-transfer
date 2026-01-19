# Projet Fil Rouge : TeamHub

## Présentation

TeamHub est un mini intranet d'entreprise qui permet de :
- Consulter l'annuaire des employés
- Lire et poster des annonces internes
- Gérer son profil utilisateur

Ce projet permet de mettre en pratique **tous les concepts** des modules 1 et 2.

---

## Architecture fonctionnelle

```
┌─────────────────────────────────────────────────────────────────┐
│                         TeamHub                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Accueil    │  │  Annuaire    │  │   Profil     │          │
│  │              │  │              │  │              │          │
│  │ - Dernières  │  │ - Liste      │  │ - Voir       │          │
│  │   annonces   │  │   employés   │  │ - Modifier   │          │
│  │ - Poster     │  │ - Recherche  │  │              │          │
│  │   (si admin) │  │ - Filtres    │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Progression par étapes

Le projet est découpé en **6 étapes**, chacune correspondant à des concepts précis.

### Étape 1 : Structure de base (Module 1)

**Concepts** : Composants, JSX, Props, CSS

**À créer** :
- `App.jsx` : composant racine
- `Header.jsx` : en-tête avec navigation
- `Footer.jsx` : pied de page
- Structure de layout

**Fichiers fournis** : Données mockées (`data/employees.js`, `data/announcements.js`)

---

### Étape 2 : Annuaire (Module 1)

**Concepts** : map(), key, Props, Rendu conditionnel

**À créer** :
- `EmployeeList.jsx` : liste des employés
- `EmployeeCard.jsx` : carte d'un employé
- Affichage conditionnel (statut en ligne)

---

### Étape 3 : Recherche et filtres (Module 1 + 2)

**Concepts** : useState, Controlled inputs, filter()

**À créer** :
- `SearchBar.jsx` : barre de recherche
- `DepartmentFilter.jsx` : filtre par département
- Logique de filtrage dans `EmployeeList`

---

### Étape 4 : Annonces (Module 2)

**Concepts** : useEffect, Fetch API, États loading/error

**À créer** :
- `AnnouncementList.jsx` : liste des annonces
- `AnnouncementCard.jsx` : une annonce
- `AnnouncementForm.jsx` : formulaire d'ajout (admin)

---

### Étape 5 : Profil utilisateur (Module 2)

**Concepts** : useReducer, Formulaires complexes, Validation

**À créer** :
- `ProfilePage.jsx` : page profil
- `ProfileForm.jsx` : formulaire d'édition
- Gestion du state avec useReducer

---

### Étape 6 : Finalisation (Module 2)

**Concepts** : Context API, Custom Hooks, Optimisation

**À créer** :
- `AuthContext.jsx` : contexte d'authentification
- `useLocalStorage.jsx` : hook personnalisé
- Thème clair/sombre

---

## Structure des dossiers

```
projet-fil-rouge/
├── README.md
├── etapes/
│   ├── etape-1-structure/
│   │   ├── enonce.md
│   │   └── correction/
│   ├── etape-2-annuaire/
│   │   ├── enonce.md
│   │   └── correction/
│   └── ...
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── employees/
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeCard.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── announcements/
│   │   │   ├── AnnouncementList.jsx
│   │   │   ├── AnnouncementCard.jsx
│   │   │   └── AnnouncementForm.jsx
│   │   ├── profile/
│   │   │   ├── ProfilePage.jsx
│   │   │   └── ProfileForm.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Modal.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── data/
│   │   ├── employees.js
│   │   └── announcements.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## Données mockées

### employees.js

```javascript
export const employees = [
  {
    id: 1,
    firstName: "Victor",
    lastName: "Besson",
    email: "victor.besson@teamhub.com",
    department: "Développement",
    role: "Lead Developer",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "01 23 45 67 89",
    isOnline: true,
    joinedAt: "2022-03-15"
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Martin",
    email: "alice.martin@teamhub.com",
    department: "Design",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "01 23 45 67 90",
    isOnline: false,
    joinedAt: "2023-01-10"
  },
  // ... autres employés
];

export const departments = [
  "Développement",
  "Design",
  "Marketing",
  "RH",
  "Direction"
];
```

### announcements.js

```javascript
export const announcements = [
  {
    id: 1,
    title: "Bienvenue sur TeamHub !",
    content: "Notre nouvel intranet est maintenant disponible...",
    author: "Victor Besson",
    authorRole: "Admin",
    createdAt: "2025-01-15T10:30:00",
    category: "Général",
    isPinned: true
  },
  // ... autres annonces
];

export const categories = [
  "Général",
  "RH",
  "Technique",
  "Événements"
];
```

---

## Critères de réussite

### Par étape

| Étape | Critères |
|-------|----------|
| 1 | Layout responsive, navigation fonctionnelle |
| 2 | Toutes les cartes s'affichent, statut visible |
| 3 | Recherche temps réel, filtres combinables |
| 4 | Chargement affiché, erreurs gérées |
| 5 | Formulaire valide, données persistées |
| 6 | Thème toggle, état global fonctionnel |

### Globaux

- [ ] Pas d'erreurs dans la console
- [ ] Code propre et commenté
- [ ] Composants réutilisables
- [ ] Responsive (mobile-first)

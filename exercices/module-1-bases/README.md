# Module 1 - Les Bases de React

## Organisation des exercices

Chaque exercice suit cette structure :
- **Objectif** : Ce que l'apprenant doit savoir faire à la fin
- **Contexte** : Mise en situation concrète
- **Énoncé** : Les étapes à réaliser
- **Indices** : Aide progressive (à révéler si besoin)
- **Points d'attention** : Erreurs courantes à éviter
- **Correction** : Code complet commenté

---

## Progression des exercices

| # | Exercice | Concepts | Difficulté |
|---|----------|----------|------------|
| 1 | Carte de visite | JSX, expressions | ⭐ |
| 2 | Composants Header/Footer | Composants, export/import | ⭐ |
| 3 | Liste de courses | map(), key | ⭐⭐ |
| 4 | Compteur interactif | useState, événements | ⭐⭐ |
| 5 | Carte utilisateur | Props, déstructuration | ⭐⭐ |
| 6 | Galerie d'images | Images, CSS | ⭐⭐ |
| 7 | Affichage conditionnel | Ternaire, && | ⭐⭐ |
| 8 | Toggle de thème | Classes dynamiques | ⭐⭐⭐ |
| 9 | Formulaire de contact | Controlled inputs | ⭐⭐⭐ |
| 10 | Mini application | Synthèse Module 1 | ⭐⭐⭐⭐ |

---

## Comment utiliser ces exercices

### Pour le formateur

1. Présenter le concept avec le cours
2. Montrer la cheatsheet correspondante
3. Donner l'énoncé de l'exercice
4. Laisser les apprenants chercher (15-30 min selon difficulté)
5. Faire un point intermédiaire avec les indices si besoin
6. Correction collective en expliquant les points d'attention

### Pour l'apprenant

1. Lire l'énoncé complet
2. Essayer de coder sans regarder les indices
3. Si bloqué > 10 min : consulter l'indice 1
4. Si toujours bloqué : consulter les indices suivants
5. Comparer avec la correction
6. Comprendre les points d'attention

---

## Setup initial

Avant de commencer les exercices, créer un projet Vite :

```bash
npm create vite@latest exercices-react
# Choisir : React > JavaScript

cd exercices-react
npm install
npm run dev
```

Structure recommandée pour les exercices :

```
src/
  exercices/
    ex01-carte-visite/
      CarteVisite.jsx
    ex02-header-footer/
      Header.jsx
      Footer.jsx
      Layout.jsx
    ex03-liste-courses/
      ListeCourses.jsx
    ...
  App.jsx
```

Dans `App.jsx`, importer l'exercice en cours :

```jsx
// Décommenter l'exercice en cours
import CarteVisite from './exercices/ex01-carte-visite/CarteVisite';
// import Layout from './exercices/ex02-header-footer/Layout';

function App() {
  return <CarteVisite />;
}

export default App;
```

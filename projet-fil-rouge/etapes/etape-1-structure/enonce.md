# Étape 1 : Structure de base

## Objectif

Mettre en place la structure de l'application avec les composants de layout.

## Concepts pratiqués

- Création de composants React
- Import/Export de modules
- Props et children
- CSS et structure de fichiers

---

## À créer

### 1. Composant `Header.jsx`

L'en-tête de l'application avec :
- Logo ou titre "TeamHub"
- Navigation (Accueil, Annuaire, Profil)
- Indicateur utilisateur connecté

### 2. Composant `Footer.jsx`

Le pied de page avec :
- Copyright
- Liens utiles
- Version de l'application

### 3. Composant `Layout.jsx`

Le conteneur principal qui :
- Enveloppe le Header et Footer
- Affiche le contenu (`children`)
- Structure la mise en page

### 4. Fichier `App.jsx`

Le composant racine qui :
- Utilise le Layout
- Affiche un message de bienvenue temporaire

---

## Structure attendue

```
src/
├── components/
│   └── layout/
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── Layout.jsx
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

---

## Indices

<details>
<summary>💡 Structure d'un composant de layout</summary>

```jsx
function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

</details>

<details>
<summary>💡 Navigation avec état actif</summary>

```jsx
const [activePage, setActivePage] = useState('home');

<nav>
  <button
    className={activePage === 'home' ? 'active' : ''}
    onClick={() => setActivePage('home')}
  >
    Accueil
  </button>
</nav>
```

</details>

---

## Critères de validation

- [ ] Le Header s'affiche avec le titre et la navigation
- [ ] Le Footer s'affiche avec le copyright
- [ ] Le Layout enveloppe correctement le contenu
- [ ] Le CSS est appliqué et responsive
- [ ] Pas d'erreurs dans la console

---

## Pour aller plus loin

- Ajouter des icônes à la navigation
- Rendre le header sticky
- Ajouter un menu hamburger pour mobile

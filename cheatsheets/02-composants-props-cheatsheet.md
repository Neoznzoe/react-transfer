# Cheat Sheet - Composants & Props

## Qu'est-ce qu'un composant ?

Un composant React = **une fonction qui retourne du JSX**

```jsx
// Composant minimal
function MonComposant() {
  return <h1>Hello</h1>;
}
```

---

## Les 3 règles d'un composant

### 1. Nom en PascalCase (majuscule au début)

```jsx
// OK
function UserCard() { ... }
function NavigationMenu() { ... }

// ERREUR - React ne reconnaîtra pas comme composant
function userCard() { ... }  // minuscule = balise HTML
function navigation_menu() { ... }
```

### 2. Retourne du JSX (ou null)

```jsx
function MonComposant() {
  return <div>Contenu</div>;  // OK
}

function ComposantVide() {
  return null;  // OK - n'affiche rien
}
```

### 3. Export pour être utilisable ailleurs

```jsx
// Export par défaut (1 seul par fichier)
export default function MonComposant() { ... }

// Import
import MonComposant from './MonComposant';

// ---

// Export nommé (plusieurs possibles)
export function ComposantA() { ... }
export function ComposantB() { ... }

// Import
import { ComposantA, ComposantB } from './Composants';
```

---

## Les Props : passer des données au composant

### Analogie simple

> Les props sont comme les **paramètres d'une fonction** ou les **attributs HTML**.

```jsx
// HTML natif
<img src="photo.jpg" alt="Photo" width="200" />
     └── attributs ──┘

// Composant React
<UserCard name="Victor" age={26} isAdmin={true} />
          └──────── props ────────┘
```

### Recevoir les props

```jsx
// Méthode 1 : objet props
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.age} ans</p>
    </div>
  );
}

// Méthode 2 : déstructuration (RECOMMANDÉ)
function UserCard({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age} ans</p>
    </div>
  );
}

// Utilisation
<UserCard name="Victor" age={26} />
```

### Types de props

```jsx
// String : guillemets
<Composant titre="Bonjour" />

// Number : accolades
<Composant age={26} />

// Boolean : accolades (ou juste le nom pour true)
<Composant isActive={true} />
<Composant isActive />  // équivalent à isActive={true}
<Composant isActive={false} />

// Objet : accolades + accolades
<Composant user={{ name: "Victor", age: 26 }} />

// Tableau : accolades
<Composant items={[1, 2, 3]} />

// Fonction : accolades
<Composant onClick={handleClick} />
<Composant onClick={() => console.log('click')} />
```

---

## Props par défaut

```jsx
// Méthode 1 : dans la déstructuration (RECOMMANDÉ)
function Button({ label = "Cliquez", color = "blue" }) {
  return <button style={{ color }}>{label}</button>;
}

// Utilisation
<Button />                    // label="Cliquez", color="blue"
<Button label="Envoyer" />    // label="Envoyer", color="blue"
```

---

## Props spéciale : children

`children` = tout ce qui est entre les balises ouvrante et fermante

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Utilisation
<Card title="Ma carte">
  <p>Ceci est le contenu</p>
  <button>Action</button>
</Card>
```

**Résultat :**
```html
<div class="card">
  <h2>Ma carte</h2>
  <div class="card-body">
    <p>Ceci est le contenu</p>
    <button>Action</button>
  </div>
</div>
```

---

## Schéma mental : Flux des données

```
┌─────────────────────────────────────────────────────────┐
│  PARENT (App.jsx)                                       │
│                                                         │
│    const user = { name: "Victor", age: 26 };            │
│                                                         │
│    <UserCard                                            │
│       name={user.name}    ─────────────┐                │
│       age={user.age}      ─────────────┤                │
│    />                                  │                │
│                                        │ Props          │
└────────────────────────────────────────│────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────┐
│  ENFANT (UserCard.jsx)                                  │
│                                                         │
│    function UserCard({ name, age }) {                   │
│                         │      │                        │
│      return (           │      │                        │
│        <div>            │      │                        │
│          <h2>{name}</h2>◄──────┘                        │
│          <p>{age} ans</p>◄─────────────────────────     │
│        </div>                                           │
│      );                                                 │
│    }                                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Règle d'or : Props en lecture seule !

```jsx
function UserCard({ name }) {
  // INTERDIT : ne jamais modifier une prop
  name = "Autre nom";  // NON !

  // OK : utiliser la prop pour créer une nouvelle valeur
  const displayName = name.toUpperCase();

  return <h2>{displayName}</h2>;
}
```

> **Les props descendent** du parent vers l'enfant.
> Pour remonter des données : utiliser une **fonction callback** en prop.

---

## Pattern : Fonction callback en prop

```jsx
// Parent
function App() {
  function handleUserClick(userId) {
    console.log("User cliqué:", userId);
  }

  return <UserCard id={42} onUserClick={handleUserClick} />;
}

// Enfant
function UserCard({ id, onUserClick }) {
  return (
    <button onClick={() => onUserClick(id)}>
      Voir profil
    </button>
  );
}
```

---

## Checklist composant

- [ ] Nom en PascalCase
- [ ] Fichier `.jsx` avec le même nom
- [ ] Export (default ou nommé)
- [ ] Props déstructurées
- [ ] Props en lecture seule
- [ ] Un seul élément parent retourné

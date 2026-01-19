# Exercice 6 - Galerie d'images

## Objectif

Manipuler des images (locales et externes) et appliquer du CSS.

## Concepts abordés

- Import d'images locales
- Images externes via URL
- Attribut `alt` pour l'accessibilité
- Application de CSS

---

## Énoncé

Créer une galerie d'images avec :
1. Au moins une image importée localement (depuis `src/assets`)
2. Au moins deux images externes (URLs)
3. Un style CSS pour la galerie (grille)
4. Un effet au survol sur les images

### Structure de fichiers

```
ex06-galerie/
  Galerie.jsx
  Galerie.css
```

---

## Correction

```jsx
// src/exercices/ex06-galerie/Galerie.jsx

// ═══════════════════════════════════════════════════════════════
// IMPORT D'IMAGE LOCALE
// Vite transforme cet import en URL optimisée
// L'image doit exister dans src/assets/
// ═══════════════════════════════════════════════════════════════
import logoReact from '../../assets/react.svg';
import './Galerie.css';

function Galerie() {
  // Images externes (URLs directes)
  const imagesExternes = [
    {
      id: 1,
      url: "https://picsum.photos/400/300?random=1",
      alt: "Paysage aléatoire 1",
      title: "Nature"
    },
    {
      id: 2,
      url: "https://picsum.photos/400/300?random=2",
      alt: "Paysage aléatoire 2",
      title: "Architecture"
    },
    {
      id: 3,
      url: "https://picsum.photos/400/300?random=3",
      alt: "Paysage aléatoire 3",
      title: "Urbain"
    }
  ];

  return (
    <div className="galerie">
      <h2>Ma Galerie</h2>

      <div className="galerie-grid">
        {/* ═══════════════════════════════════════════════════════
            IMAGE LOCALE
            - Import en haut du fichier
            - Utilisée comme valeur de src
            - Vite optimise automatiquement
        ═══════════════════════════════════════════════════════ */}
        <figure className="galerie-item">
          <img
            src={logoReact}
            alt="Logo React"
            className="galerie-img"
          />
          <figcaption>Logo React (local)</figcaption>
        </figure>

        {/* ═══════════════════════════════════════════════════════
            IMAGES EXTERNES
            - URL directe dans src
            - Toujours mettre un alt descriptif !
        ═══════════════════════════════════════════════════════ */}
        {imagesExternes.map(image => (
          <figure key={image.id} className="galerie-item">
            <img
              src={image.url}
              alt={image.alt}
              className="galerie-img"
              loading="lazy"  // Chargement différé pour les performances
            />
            <figcaption>{image.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Galerie;
```

```css
/* src/exercices/ex06-galerie/Galerie.css */

.galerie {
  padding: 1rem;
}

.galerie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.galerie-item {
  margin: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Effet au survol */
.galerie-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.galerie-img {
  width: 100%;
  height: 200px;
  object-fit: cover;  /* L'image remplit sans se déformer */
  display: block;
}

.galerie-item figcaption {
  padding: 0.75rem;
  text-align: center;
  background: #f9fafb;
  font-weight: 500;
}
```

---

## Points d'attention

### Import d'image locale vs URL externe

```jsx
// IMAGE LOCALE (dans src/)
import monImage from './assets/photo.jpg';
<img src={monImage} alt="..." />

// IMAGE DANS PUBLIC (servie telle quelle)
<img src="/images/photo.jpg" alt="..." />

// IMAGE EXTERNE
<img src="https://example.com/photo.jpg" alt="..." />
```

### Toujours mettre un attribut `alt`

```jsx
// MAUVAIS : pas d'alt
<img src={url} />

// MAUVAIS : alt vide pour une image informative
<img src={url} alt="" />

// BON : alt descriptif
<img src={url} alt="Coucher de soleil sur la mer" />

// BON : alt vide pour image décorative uniquement
<img src={decoratif} alt="" role="presentation" />
```

### object-fit pour contrôler le redimensionnement

```css
/* L'image est coupée pour remplir l'espace */
object-fit: cover;

/* L'image est entièrement visible, espace vide possible */
object-fit: contain;

/* L'image est déformée pour remplir */
object-fit: fill;
```

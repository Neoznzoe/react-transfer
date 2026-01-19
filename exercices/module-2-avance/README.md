# Module 2 - React Avancé

## Prérequis

Avoir complété le Module 1 (Les Bases de React).

---

## Progression des exercices

| # | Exercice | Concepts | Difficulté |
|---|----------|----------|------------|
| 1 | Chronomètre | useEffect, cleanup, useRef | ⭐⭐ |
| 2 | Fetch de données | useEffect, API, loading/error | ⭐⭐ |
| 3 | Recherche en temps réel | useEffect avec dépendances, debounce | ⭐⭐⭐ |
| 4 | Modal réutilisable | props.children, portals | ⭐⭐ |
| 5 | Gestion de panier | useReducer, actions | ⭐⭐⭐ |
| 6 | Hook personnalisé useLocalStorage | Custom hooks | ⭐⭐⭐ |
| 7 | Liste infinie | IntersectionObserver, pagination | ⭐⭐⭐⭐ |
| 8 | Optimisation avec memo | React.memo, useCallback, useMemo | ⭐⭐⭐ |
| 9 | Mini app avec Context | Context API, Provider, useContext | ⭐⭐⭐⭐ |
| 10 | Projet synthèse | Tous les concepts | ⭐⭐⭐⭐⭐ |

---

## Conseils pour le formateur

### Ordre recommandé

1. **useEffect** (ex 1-3) : Fondamental pour comprendre les effets de bord
2. **props.children** (ex 4) : Composants réutilisables
3. **useReducer** (ex 5) : Alternative à useState pour état complexe
4. **Custom hooks** (ex 6) : Réutilisation de logique
5. **Optimisation** (ex 7-8) : Performance
6. **Context** (ex 9) : État global

### Points de vigilance

- **useEffect** : La notion de "dépendances" est souvent mal comprise
- **cleanup** : Expliquer QUAND le cleanup est appelé
- **useReducer** : Faire le parallèle avec Redux si connu
- **Context** : Attention à la sur-utilisation (prop drilling n'est pas toujours mauvais)

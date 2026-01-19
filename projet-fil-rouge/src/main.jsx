// ═══════════════════════════════════════════════════════════════════════════
// MAIN.JSX - Point d'entrée de l'application
// ═══════════════════════════════════════════════════════════════════════════
//
// Ce fichier est le point d'entrée de l'application React.
// Il monte le composant App dans le DOM.
//
// ⚠️ POINT BLOQUANT pour les débutants :
//
// Ce fichier est généralement créé automatiquement par Vite ou Create React App.
// Il n'est pas nécessaire de le modifier dans la plupart des cas.
//
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// ═══════════════════════════════════════════════════════════════════════════
// MONTER L'APPLICATION
//
// 1. On récupère l'élément HTML avec id="root" (dans index.html)
// 2. On crée une "racine" React avec createRoot
// 3. On rend le composant App dedans
//
// <React.StrictMode> :
// - Mode de développement qui détecte les problèmes potentiels
// - Rend les composants deux fois pour détecter les effets de bord
// - Ne s'applique PAS en production
// ═══════════════════════════════════════════════════════════════════════════
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ═══════════════════════════════════════════════════════════════════════════
// NOTES PÉDAGOGIQUES
// ═══════════════════════════════════════════════════════════════════════════
//
// POURQUOI React.StrictMode ?
//
// StrictMode aide à :
// - Détecter les cycles de vie dépréciés
// - Détecter les effets de bord dans le rendu
// - Détecter l'utilisation de l'ancienne API de contexte
// - Détecter les refs string dépréciées
//
// En mode strict, certaines fonctions sont appelées deux fois :
// - Le constructeur du composant (si classe)
// - Le render (ou le corps de la fonction pour les composants fonctionnels)
// - Les fonctions passées à useState, useMemo
// - Le corps de useEffect (en mode développement)
//
// Cela peut surprendre les débutants qui voient leurs console.log
// s'afficher deux fois !
//
// ═══════════════════════════════════════════════════════════════════════════

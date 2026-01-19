// ═══════════════════════════════════════════════════════════════════════════
// ANNOUNCEMENTLIST.JSX - Liste des annonces avec chargement
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - useEffect pour charger les données
// - useState pour gérer loading/error/data
// - Simulation d'API avec Promise
// - Cleanup function
//
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import AnnouncementCard from './AnnouncementCard';
import { announcements as mockAnnouncements, categories } from '../../../data/announcements';
import './AnnouncementList.css';

// ─────────────────────────────────────────────────────────────────────────────
// FONCTION DE SIMULATION D'API
//
// Dans une vraie application, on utiliserait fetch() vers une API
// Ici, on simule un délai pour voir le loading
// ─────────────────────────────────────────────────────────────────────────────
function simulateFetch(data, delay = 1500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simuler une erreur aléatoire (décommenter pour tester)
      // if (Math.random() > 0.8) {
      //   reject(new Error('Erreur de connexion au serveur'));
      //   return;
      // }
      resolve(data);
    }, delay);
  });
}

function AnnouncementList() {
  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  //
  // ⚠️ POINT BLOQUANT : 3 états pour gérer le fetch
  //
  // - announcements : les données chargées
  // - isLoading : true pendant le chargement
  // - error : le message d'erreur si échec
  //
  // Ces 3 états couvrent tous les cas possibles :
  // 1. Loading = true → Afficher le loader
  // 2. Error !== null → Afficher l'erreur
  // 3. Sinon → Afficher les données
  // ═══════════════════════════════════════════════════════════════════════════
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  // ═══════════════════════════════════════════════════════════════════════════
  // EFFECT : Charger les données au montage
  //
  // ⚠️ POINT BLOQUANT : Pourquoi [] comme dépendances ?
  //
  // Le tableau vide [] signifie : "exécuter cet effet UNE SEULE FOIS,
  // au montage du composant"
  //
  // Sans [] → s'exécute à CHAQUE rendu (boucle infinie !)
  // Avec [id] → s'exécute quand `id` change
  // Avec [] → s'exécute une seule fois
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    // ─────────────────────────────────────────────────────────────────────────
    // VARIABLE POUR ÉVITER LES UPDATES SUR COMPOSANT DÉMONTÉ
    //
    // ⚠️ POINT BLOQUANT : Memory leak
    //
    // Si le composant est démonté PENDANT le chargement, on ne veut pas
    // appeler setAnnouncements() car ça causerait un warning/erreur
    // ─────────────────────────────────────────────────────────────────────────
    let isMounted = true;

    // ─────────────────────────────────────────────────────────────────────────
    // FONCTION ASYNC POUR LE CHARGEMENT
    //
    // ⚠️ POINT BLOQUANT : useEffect ne peut PAS être async
    //
    // On crée donc une fonction async DANS le useEffect
    // Puis on l'appelle immédiatement
    // ─────────────────────────────────────────────────────────────────────────
    async function loadAnnouncements() {
      try {
        setIsLoading(true);
        setError(null);

        // Simuler l'appel API
        const data = await simulateFetch(mockAnnouncements, 1500);

        // Vérifier que le composant est toujours monté
        if (isMounted) {
          setAnnouncements(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Une erreur est survenue');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // Appeler la fonction
    loadAnnouncements();

    // ─────────────────────────────────────────────────────────────────────────
    // CLEANUP FUNCTION
    //
    // ⚠️ POINT BLOQUANT : Retourner une fonction de nettoyage
    //
    // Cette fonction est appelée :
    // 1. Quand le composant est démonté
    // 2. Avant de ré-exécuter l'effet (si les dépendances changent)
    // ─────────────────────────────────────────────────────────────────────────
    return () => {
      isMounted = false;
    };
  }, []); // ← Tableau vide = exécution au montage uniquement

  // ═══════════════════════════════════════════════════════════════════════════
  // FILTRAGE ET TRI
  // ═══════════════════════════════════════════════════════════════════════════
  const filteredAnnouncements = announcements
    // Filtrer par catégorie
    .filter(a => selectedCategory === 'Toutes' || a.category === selectedCategory)
    // Trier : épinglées d'abord, puis par date
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU CONDITIONNEL : État de chargement
  // ═══════════════════════════════════════════════════════════════════════════
  if (isLoading) {
    return (
      <div className="announcements-section">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des annonces...</p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU CONDITIONNEL : État d'erreur
  // ═══════════════════════════════════════════════════════════════════════════
  if (error) {
    return (
      <div className="announcements-section">
        <div className="error-state">
          <p>Erreur : {error}</p>
          <button onClick={() => window.location.reload()}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <section className="announcements-section">
      {/* En-tête */}
      <div className="section-header">
        <h2>Annonces</h2>
        <span className="count">{filteredAnnouncements.length} annonce(s)</span>
      </div>

      {/* Filtre par catégorie */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Liste des annonces */}
      {filteredAnnouncements.length === 0 ? (
        <p className="no-announcements">Aucune annonce dans cette catégorie.</p>
      ) : (
        <div className="announcements-list">
          {filteredAnnouncements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AnnouncementList;


// ═══════════════════════════════════════════════════════════════════════════
// SCHÉMA MENTAL : Cycle de vie du fetch
// ═══════════════════════════════════════════════════════════════════════════
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │                         MONTAGE                                         │
// │                            │                                            │
// │                            ▼                                            │
// │                   useEffect exécuté                                     │
// │                            │                                            │
// │                            ▼                                            │
// │              isLoading = true (affiche spinner)                         │
// │                            │                                            │
// │                      fetch(...)                                         │
// │                            │                                            │
// │              ┌─────────────┴─────────────┐                              │
// │              ▼                           ▼                              │
// │          SUCCÈS                       ERREUR                            │
// │              │                           │                              │
// │              ▼                           ▼                              │
// │   isLoading = false           isLoading = false                         │
// │   announcements = [...]       error = "message"                         │
// │              │                           │                              │
// │              ▼                           ▼                              │
// │   Afficher liste              Afficher erreur                           │
// │                                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
//
// ═══════════════════════════════════════════════════════════════════════════

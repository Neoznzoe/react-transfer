// ═══════════════════════════════════════════════════════════════════════════
// HEADER.JSX - En-tête de l'application TeamHub
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Props pour recevoir la page active et la fonction de changement
// - Événements onClick pour la navigation
// - Classes conditionnelles pour l'état actif
// - Déstructuration des props
//
// ═══════════════════════════════════════════════════════════════════════════

import './Header.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT HEADER
//
// Props attendues :
// - activePage : string (la page actuellement active)
// - onNavigate : function (appelée quand on clique sur un lien)
// - currentUser : object (l'utilisateur connecté, optionnel)
// ─────────────────────────────────────────────────────────────────────────────
function Header({ activePage, onNavigate, currentUser }) {
  // ═══════════════════════════════════════════════════════════════════════════
  // DONNÉES DE NAVIGATION
  // On centralise les liens ici pour faciliter la maintenance
  // ═══════════════════════════════════════════════════════════════════════════
  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'directory', label: 'Annuaire' },
    { id: 'profile', label: 'Profil' },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <header className="header">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LOGO / TITRE                                                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="header-brand">
        <h1 className="header-logo">TeamHub</h1>
        <span className="header-tagline">Votre intranet d'entreprise</span>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* NAVIGATION                                                          */}
      {/* On utilise map() pour générer les liens dynamiquement               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <nav className="header-nav">
        {navLinks.map(link => (
          <button
            key={link.id}
            // ⚠️ POINT BLOQUANT : Classes conditionnelles
            // On combine 'nav-link' avec 'active' si c'est la page courante
            className={`nav-link ${activePage === link.id ? 'active' : ''}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* INDICATEUR UTILISATEUR                                              */}
      {/* Rendu conditionnel : on n'affiche que si currentUser existe         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {currentUser && (
        <div className="header-user">
          <img
            src={currentUser.avatar}
            alt={`${currentUser.firstName} ${currentUser.lastName}`}
            className="user-avatar"
          />
          <span className="user-name">
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </div>
      )}
    </header>
  );
}

// ⚠️ POINT BLOQUANT : Export par défaut
// Permet d'importer avec : import Header from './Header'
export default Header;

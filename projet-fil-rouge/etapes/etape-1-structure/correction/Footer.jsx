// ═══════════════════════════════════════════════════════════════════════════
// FOOTER.JSX - Pied de page de l'application TeamHub
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Composant fonctionnel simple (sans état)
// - Expressions JavaScript dans JSX
// - Composant statique (pas de props requises)
//
// ═══════════════════════════════════════════════════════════════════════════

import './Footer.css';

function Footer() {
  // ═══════════════════════════════════════════════════════════════════════════
  // CALCUL DE L'ANNÉE COURANTE
  // On utilise new Date().getFullYear() pour avoir toujours l'année actuelle
  // ⚠️ Ce calcul est fait à chaque rendu.
  // ═══════════════════════════════════════════════════════════════════════════
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION LIENS                                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="footer-links">
        <a href="#aide" className="footer-link">Aide</a>
        <a href="#contact" className="footer-link">Contact</a>
        <a href="#mentions" className="footer-link">Mentions légales</a>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* COPYRIGHT                                                           */}
      {/* ⚠️ POINT BLOQUANT : Expressions dans JSX                           */}
      {/* On utilise {currentYear} pour insérer la valeur JavaScript         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="footer-copyright">
        <p>&copy; {currentYear} TeamHub - Tous droits réservés</p>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* VERSION                                                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="footer-version">
        <span>Version 1.0.0</span>
      </div>
    </footer>
  );
}

export default Footer;

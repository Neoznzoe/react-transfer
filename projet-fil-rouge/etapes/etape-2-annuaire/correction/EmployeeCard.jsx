// ═══════════════════════════════════════════════════════════════════════════
// EMPLOYEECARD.JSX - Carte d'un employé
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Déstructuration des props
// - Rendu conditionnel avec ternaire et &&
// - Classes CSS dynamiques
// - Formatage de données
//
// ═══════════════════════════════════════════════════════════════════════════

import './EmployeeCard.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT EMPLOYEECARD
//
// ⚠️ POINT BLOQUANT : Déstructuration des props
//
// On peut déstructurer directement dans les paramètres :
// function EmployeeCard({ employee }) { ... }
//
// Ou déstructurer l'objet employee à l'intérieur :
// const { firstName, lastName, ... } = employee;
//
// ─────────────────────────────────────────────────────────────────────────────
function EmployeeCard({ employee }) {
  // Déstructuration pour un code plus lisible
  const {
    firstName,
    lastName,
    email,
    department,
    role,
    avatar,
    phone,
    isOnline,
    joinedAt
  } = employee;

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTION UTILITAIRE
  // Formater la date d'arrivée
  // ═══════════════════════════════════════════════════════════════════════════
  function formatJoinDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <article className="employee-card">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* EN-TÊTE AVEC AVATAR ET STATUT                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="card-header">
        <div className="avatar-container">
          <img
            src={avatar}
            alt={`${firstName} ${lastName}`}
            className="avatar"
          />
          {/* ⚠️ POINT BLOQUANT : Classe conditionnelle
              On ajoute 'online' ou 'offline' selon le statut */}
          <span
            className={`status-indicator ${isOnline ? 'online' : 'offline'}`}
            title={isOnline ? 'En ligne' : 'Hors ligne'}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* INFORMATIONS PRINCIPALES                                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="card-body">
        <h3 className="employee-name">{firstName} {lastName}</h3>
        <p className="employee-role">{role}</p>
        <span className="employee-department">{department}</span>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* INFORMATIONS DE CONTACT                                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="card-footer">
        <a href={`mailto:${email}`} className="contact-link">
          {email}
        </a>
        <span className="phone">{phone}</span>
        <span className="joined-date">
          Depuis {formatJoinDate(joinedAt)}
        </span>
      </div>
    </article>
  );
}

export default EmployeeCard;

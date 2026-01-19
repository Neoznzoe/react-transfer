// ═══════════════════════════════════════════════════════════════════════════
// ANNOUNCEMENTCARD.JSX - Carte d'une annonce
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Déstructuration des props
// - Formatage de dates
// - Rendu conditionnel
// - Classes dynamiques
//
// ═══════════════════════════════════════════════════════════════════════════

import { getRelativeTime } from '../../../data/announcements';
import './AnnouncementCard.css';

function AnnouncementCard({ announcement }) {
  // Déstructuration pour un code plus lisible
  const {
    title,
    content,
    author,
    authorRole,
    createdAt,
    category,
    isPinned
  } = announcement;

  return (
    // ⚠️ Classes conditionnelles : on ajoute 'pinned' si l'annonce est épinglée
    <article className={`announcement-card ${isPinned ? 'pinned' : ''}`}>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* EN-TÊTE                                                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <header className="announcement-header">
        <div className="announcement-meta">
          {/* Badge épinglé (rendu conditionnel avec &&) */}
          {isPinned && (
            <span className="pinned-badge" title="Annonce épinglée">
              📌
            </span>
          )}

          {/* Badge catégorie */}
          <span className={`category-badge category-${category.toLowerCase()}`}>
            {category}
          </span>
        </div>

        <h3 className="announcement-title">{title}</h3>
      </header>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CONTENU                                                             */}
      {/*                                                                     */}
      {/* ⚠️ POINT BLOQUANT : white-space: pre-line                          */}
      {/* Le contenu peut avoir des retours à la ligne (\n)                  */}
      {/* En CSS, white-space: pre-line les préserve                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="announcement-content">
        <p>{content}</p>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* PIED DE CARTE                                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <footer className="announcement-footer">
        <div className="author-info">
          <span className="author-name">{author}</span>
          <span className="author-role">{authorRole}</span>
        </div>

        {/* ⚠️ Formatage de date avec une fonction utilitaire */}
        <time className="announcement-date" dateTime={createdAt}>
          {getRelativeTime(createdAt)}
        </time>
      </footer>
    </article>
  );
}

export default AnnouncementCard;

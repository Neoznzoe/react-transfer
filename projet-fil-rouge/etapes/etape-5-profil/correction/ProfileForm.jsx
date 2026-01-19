// ═══════════════════════════════════════════════════════════════════════════
// PROFILEFORM.JSX - Formulaire d'édition du profil
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Formulaire contrôlé
// - Props callback pour remonter les changements
// - Gestion des erreurs par champ
//
// ═══════════════════════════════════════════════════════════════════════════

import './ProfileForm.css';

function ProfileForm({
  user,
  errors,
  isSaving,
  onFieldChange,
  onSave,
  onCancel
}) {
  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLER GÉNÉRIQUE
  //
  // ⚠️ POINT BLOQUANT : Remontée des changements
  //
  // Ce composant ne gère PAS le state lui-même
  // Il appelle onFieldChange() qui dispatch une action dans le parent
  // ═══════════════════════════════════════════════════════════════════════════
  function handleChange(e) {
    const { name, value } = e.target;
    onFieldChange(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave();
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {/* Erreur générale */}
      {errors.general && (
        <div className="form-error-general">{errors.general}</div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* PRÉNOM                                                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
        <label htmlFor="firstName">Prénom *</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        {errors.firstName && (
          <span className="field-error">{errors.firstName}</span>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* NOM                                                                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
        <label htmlFor="lastName">Nom *</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
        {errors.lastName && (
          <span className="field-error">{errors.lastName}</span>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* EMAIL                                                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="field-error">{errors.email}</span>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TÉLÉPHONE                                                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
        <label htmlFor="phone">Téléphone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <span className="field-error">{errors.phone}</span>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BIO                                                                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={user.bio || ''}
          onChange={handleChange}
          rows={4}
          placeholder="Décrivez-vous en quelques mots..."
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BOUTONS                                                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="cancel-btn"
          disabled={isSaving}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="save-btn"
          disabled={isSaving}
        >
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;

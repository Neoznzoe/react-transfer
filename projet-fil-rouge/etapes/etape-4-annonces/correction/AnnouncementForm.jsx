// ═══════════════════════════════════════════════════════════════════════════
// ANNOUNCEMENTFORM.JSX - Formulaire d'ajout d'annonce
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Formulaire contrôlé avec plusieurs champs
// - Validation avant soumission
// - Événement onSubmit
// - Réinitialisation du formulaire
//
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { categories } from '../../../data/announcements';
import './AnnouncementForm.css';

// ─────────────────────────────────────────────────────────────────────────────
// ÉTAT INITIAL DU FORMULAIRE
// On le définit en dehors pour pouvoir réinitialiser facilement
// ─────────────────────────────────────────────────────────────────────────────
const initialFormState = {
  title: '',
  content: '',
  category: 'Général',
  isPinned: false
};

function AnnouncementForm({ onAddAnnouncement, currentUser }) {
  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────────────────────
  // HANDLER GÉNÉRIQUE POUR TOUS LES CHAMPS
  //
  // ⚠️ POINT BLOQUANT : Spread operator et computed property
  //
  // [e.target.name] : utilise la valeur de name comme clé d'objet
  // ...formData : copie toutes les autres propriétés
  //
  // Permet d'avoir UN SEUL handler pour tous les champs
  // ─────────────────────────────────────────────────────────────────────────────
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      // Pour les checkbox, on utilise 'checked', sinon 'value'
      [name]: type === 'checkbox' ? checked : value
    });

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // VALIDATION DU FORMULAIRE
  // ─────────────────────────────────────────────────────────────────────────────
  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Le titre doit faire au moins 5 caractères';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Le contenu est requis';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Le contenu doit faire au moins 10 caractères';
    }

    setErrors(newErrors);

    // Retourne true si pas d'erreurs
    return Object.keys(newErrors).length === 0;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SOUMISSION DU FORMULAIRE
  //
  // ⚠️ POINT BLOQUANT : e.preventDefault()
  //
  // Par défaut, un formulaire recharge la page à la soumission
  // preventDefault() empêche ce comportement
  // ─────────────────────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault(); // ⚠️ CRUCIAL : empêche le rechargement

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Créer la nouvelle annonce
    const newAnnouncement = {
      id: Date.now(), // ID temporaire
      ...formData,
      author: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Anonyme',
      authorRole: currentUser?.role || 'Employé',
      authorId: currentUser?.id,
      createdAt: new Date().toISOString()
    };

    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 500));

    // Appeler le callback parent
    onAddAnnouncement(newAnnouncement);

    // Réinitialiser le formulaire
    setFormData(initialFormState);
    setIsSubmitting(false);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <form onSubmit={handleSubmit} className="announcement-form">
      <h3>Publier une annonce</h3>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CHAMP TITRE                                                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
        <label htmlFor="title">Titre *</label>
        <input
          type="text"
          id="title"
          name="title"              // ⚠️ name correspond à la clé dans formData
          value={formData.title}
          onChange={handleChange}
          placeholder="Titre de l'annonce"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CHAMP CONTENU                                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`form-group ${errors.content ? 'has-error' : ''}`}>
        <label htmlFor="content">Contenu *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Contenu de l'annonce..."
          rows={5}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CHAMP CATÉGORIE                                                     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.filter(c => c !== 'Toutes').map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CHECKBOX ÉPINGLÉ                                                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isPinned"
            checked={formData.isPinned}  // ⚠️ Pour checkbox : checked, pas value
            onChange={handleChange}
          />
          Épingler cette annonce
        </label>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BOUTON SOUMETTRE                                                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Publication...' : 'Publier l\'annonce'}
      </button>
    </form>
  );
}

export default AnnouncementForm;

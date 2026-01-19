// Exercice 9 - Formulaire de contact
// Concepts : Formulaires contrôlés, validation, onSubmit

import { useState } from 'react';

function FormulaireContact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.sujet.trim()) {
      newErrors.sujet = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit faire au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      console.log('Formulaire soumis :', formData);
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-success">
        <h2>✅ Message envoyé !</h2>
        <p>Merci {formData.nom}, nous vous répondrons bientôt.</p>
        <button onClick={() => {
          setIsSubmitted(false);
          setFormData({ nom: '', email: '', sujet: '', message: '' });
        }}>
          Nouveau message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contactez-nous</h2>

      <div className={`form-group ${errors.nom ? 'has-error' : ''}`}>
        <label htmlFor="nom">Nom *</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Votre nom"
        />
        {errors.nom && <span className="error">{errors.nom}</span>}
      </div>

      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="votre@email.com"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className={`form-group ${errors.sujet ? 'has-error' : ''}`}>
        <label htmlFor="sujet">Sujet *</label>
        <select
          id="sujet"
          name="sujet"
          value={formData.sujet}
          onChange={handleChange}
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="question">Question générale</option>
          <option value="support">Support technique</option>
          <option value="commercial">Demande commerciale</option>
          <option value="autre">Autre</option>
        </select>
        {errors.sujet && <span className="error">{errors.sujet}</span>}
      </div>

      <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message..."
          rows={5}
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>

      <button type="submit" className="submit-btn">
        Envoyer
      </button>
    </form>
  );
}

export default FormulaireContact;

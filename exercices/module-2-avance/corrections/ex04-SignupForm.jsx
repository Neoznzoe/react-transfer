// Exercice 4 - Formulaire avec validation
// Concepts : Validation, état touched, indicateur de force

import { useState } from 'react';
import './SignupForm.css';

const validators = {
  name: (v) => !v.trim() ? 'Le nom est requis' : v.length < 2 ? 'Minimum 2 caractères' : null,
  email: (v) => !v.trim() ? 'L\'email est requis' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Email invalide' : null,
  password: (v) => {
    if (!v) return 'Le mot de passe est requis';
    if (v.length < 8) return 'Minimum 8 caractères';
    if (!/[A-Z]/.test(v)) return 'Au moins une majuscule';
    if (!/[0-9]/.test(v)) return 'Au moins un chiffre';
    return null;
  },
  confirmPassword: (v, form) => !v ? 'Confirmez le mot de passe' : v !== form.password ? 'Les mots de passe ne correspondent pas' : null
};

function PasswordStrength({ password }) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1,2,3,4,5].map(l => (
          <div key={l} className="strength-bar" style={{ backgroundColor: l <= score ? colors[score-1] : '#e5e7eb' }} />
        ))}
      </div>
      <span style={{ color: colors[score-1] }}>{labels[score-1] || ''}</span>
    </div>
  );
}

function SignupForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validators[name]?.(value, { ...formData, [name]: value }) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validators[name]?.(value, formData) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const newErrors = {};
    Object.keys(formData).forEach(k => {
      const err = validators[k]?.(formData[k], formData);
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  }

  if (submitSuccess) {
    return <div className="signup-success"><h2>✅ Inscription réussie !</h2><p>Bienvenue, {formData.name} !</p></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Créer un compte</h2>
      {['name', 'email', 'password', 'confirmPassword'].map(field => (
        <div key={field} className={`form-group ${errors[field] && touched[field] ? 'has-error' : ''}`}>
          <label htmlFor={field}>{field === 'confirmPassword' ? 'Confirmer' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
            id={field} name={field} value={formData[field]} onChange={handleChange} onBlur={handleBlur} />
          {errors[field] && touched[field] && <span className="error-message">{errors[field]}</span>}
          {field === 'password' && <PasswordStrength password={formData.password} />}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Inscription...' : 'S\'inscrire'}</button>
    </form>
  );
}

export default SignupForm;

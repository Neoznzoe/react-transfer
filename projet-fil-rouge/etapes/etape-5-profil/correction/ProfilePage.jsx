// ═══════════════════════════════════════════════════════════════════════════
// PROFILEPAGE.JSX - Page de profil avec useReducer
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - useReducer pour gérer un état complexe
// - Pattern action / dispatch
// - Reducer pur (sans mutation)
// - Gestion des modes (lecture/édition)
//
// ═══════════════════════════════════════════════════════════════════════════

import { useReducer, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import { getEmployeeById } from '../../../data/employees';
import './ProfilePage.css';

// ═══════════════════════════════════════════════════════════════════════════
// ÉTAT INITIAL
// ═══════════════════════════════════════════════════════════════════════════
const initialState = {
  user: null,           // Données utilisateur originales
  editedUser: null,     // Copie de travail pour l'édition
  isEditing: false,     // Mode édition actif ?
  isSaving: false,      // Sauvegarde en cours ?
  errors: {},           // Erreurs de validation par champ
  message: null,        // Message de succès/info
};

// ═══════════════════════════════════════════════════════════════════════════
// REDUCER
//
// ⚠️ POINT BLOQUANT : Qu'est-ce qu'un reducer ?
//
// Un reducer est une fonction PURE qui :
// - Reçoit l'état actuel et une action
// - Retourne le NOUVEL état
// - NE MODIFIE JAMAIS l'état directement (immutabilité)
//
// Avantages :
// - Logique centralisée en un seul endroit
// - Facile à tester (fonction pure)
// - Prévisible (même entrée = même sortie)
// ═══════════════════════════════════════════════════════════════════════════
function profileReducer(state, action) {
  switch (action.type) {
    // ─────────────────────────────────────────────────────────────────────────
    // INITIALISER LES DONNÉES UTILISATEUR
    // ─────────────────────────────────────────────────────────────────────────
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        editedUser: action.payload,
      };

    // ─────────────────────────────────────────────────────────────────────────
    // PASSER EN MODE ÉDITION
    //
    // ⚠️ On fait une COPIE de user dans editedUser
    // Ainsi les modifications ne touchent pas l'original
    // ─────────────────────────────────────────────────────────────────────────
    case 'START_EDIT':
      return {
        ...state,
        isEditing: true,
        editedUser: { ...state.user },  // Copie !
        errors: {},
        message: null,
      };

    // ─────────────────────────────────────────────────────────────────────────
    // ANNULER LES MODIFICATIONS
    //
    // On restaure editedUser avec les données originales
    // ─────────────────────────────────────────────────────────────────────────
    case 'CANCEL_EDIT':
      return {
        ...state,
        isEditing: false,
        editedUser: { ...state.user },  // Restaure l'original
        errors: {},
        message: null,
      };

    // ─────────────────────────────────────────────────────────────────────────
    // MODIFIER UN CHAMP
    //
    // ⚠️ POINT BLOQUANT : Computed property name
    //
    // [action.field] permet d'utiliser la valeur de action.field
    // comme clé de l'objet
    //
    // Si action.field = 'email', cela devient { email: action.value }
    // ─────────────────────────────────────────────────────────────────────────
    case 'UPDATE_FIELD':
      return {
        ...state,
        editedUser: {
          ...state.editedUser,
          [action.field]: action.value,  // ⚠️ Computed property
        },
        // Effacer l'erreur du champ modifié
        errors: {
          ...state.errors,
          [action.field]: null,
        },
      };

    // ─────────────────────────────────────────────────────────────────────────
    // DÉFINIR LES ERREURS DE VALIDATION
    // ─────────────────────────────────────────────────────────────────────────
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    // ─────────────────────────────────────────────────────────────────────────
    // COMMENCER LA SAUVEGARDE
    // ─────────────────────────────────────────────────────────────────────────
    case 'SAVE_START':
      return {
        ...state,
        isSaving: true,
        message: null,
      };

    // ─────────────────────────────────────────────────────────────────────────
    // SAUVEGARDE RÉUSSIE
    //
    // On met à jour user avec editedUser (les nouvelles données)
    // ─────────────────────────────────────────────────────────────────────────
    case 'SAVE_SUCCESS':
      return {
        ...state,
        user: { ...state.editedUser },  // Nouvelles données = originales
        isSaving: false,
        isEditing: false,
        message: 'Profil mis à jour avec succès !',
      };

    // ─────────────────────────────────────────────────────────────────────────
    // SAUVEGARDE ÉCHOUÉE
    // ─────────────────────────────────────────────────────────────────────────
    case 'SAVE_ERROR':
      return {
        ...state,
        isSaving: false,
        errors: { general: action.payload },
      };

    // ─────────────────────────────────────────────────────────────────────────
    // EFFACER LE MESSAGE
    // ─────────────────────────────────────────────────────────────────────────
    case 'CLEAR_MESSAGE':
      return {
        ...state,
        message: null,
      };

    // ─────────────────────────────────────────────────────────────────────────
    // ACTION INCONNUE
    // ─────────────────────────────────────────────────────────────────────────
    default:
      console.warn(`Action inconnue : ${action.type}`);
      return state;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT PROFILEPAGE
// ═══════════════════════════════════════════════════════════════════════════
function ProfilePage({ userId = 1 }) {
  // ─────────────────────────────────────────────────────────────────────────────
  // useReducer
  //
  // ⚠️ POINT BLOQUANT : Syntaxe de useReducer
  //
  // const [state, dispatch] = useReducer(reducer, initialState)
  //
  // - state : l'état actuel
  // - dispatch : fonction pour envoyer des actions
  // - reducer : la fonction qui calcule le nouvel état
  // - initialState : l'état de départ
  // ─────────────────────────────────────────────────────────────────────────────
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Charger les données utilisateur au montage
  useEffect(() => {
    const user = getEmployeeById(userId);
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, [userId]);

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  function handleStartEdit() {
    dispatch({ type: 'START_EDIT' });
  }

  function handleCancelEdit() {
    dispatch({ type: 'CANCEL_EDIT' });
  }

  function handleFieldChange(field, value) {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  }

  async function handleSave() {
    // Validation
    const errors = validateProfile(state.editedUser);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    dispatch({ type: 'SAVE_START' });

    // Simuler une sauvegarde API
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SAVE_SUCCESS' });

      // Effacer le message après 3 secondes
      setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' });
      }, 3000);
    } catch (error) {
      dispatch({ type: 'SAVE_ERROR', payload: error.message });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDATION
  // ═══════════════════════════════════════════════════════════════════════════
  function validateProfile(user) {
    const errors = {};

    if (!user.firstName?.trim()) {
      errors.firstName = 'Le prénom est requis';
    }

    if (!user.lastName?.trim()) {
      errors.lastName = 'Le nom est requis';
    }

    if (!user.email?.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = 'Email invalide';
    }

    if (user.phone && !/^[\d\s]+$/.test(user.phone)) {
      errors.phone = 'Numéro de téléphone invalide';
    }

    return errors;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU
  // ═══════════════════════════════════════════════════════════════════════════

  if (!state.user) {
    return <div className="profile-loading">Chargement du profil...</div>;
  }

  const displayUser = state.isEditing ? state.editedUser : state.user;

  return (
    <div className="profile-page">
      {/* Message de succès */}
      {state.message && (
        <div className="success-message">{state.message}</div>
      )}

      {/* En-tête du profil */}
      <div className="profile-header">
        <img
          src={displayUser.avatar}
          alt={`${displayUser.firstName} ${displayUser.lastName}`}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1>{displayUser.firstName} {displayUser.lastName}</h1>
          <p className="profile-role">{displayUser.role}</p>
          <p className="profile-department">{displayUser.department}</p>
        </div>
      </div>

      {/* Mode lecture ou édition */}
      {state.isEditing ? (
        <ProfileForm
          user={state.editedUser}
          errors={state.errors}
          isSaving={state.isSaving}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{displayUser.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Téléphone</span>
            <span className="detail-value">{displayUser.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Bio</span>
            <span className="detail-value">{displayUser.bio || 'Non renseignée'}</span>
          </div>

          <button onClick={handleStartEdit} className="edit-btn">
            Modifier le profil
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

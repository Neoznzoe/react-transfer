import { useReducer, useEffect } from 'react';
import { getEmployeeById } from '../../data/employees';
import './ProfilePage.css';

const initialState = {
  user: null,
  editedUser: null,
  isEditing: false,
  isSaving: false,
  errors: {},
  message: null,
};

function profileReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, editedUser: action.payload };
    case 'START_EDIT':
      return { ...state, isEditing: true, editedUser: { ...state.user }, errors: {} };
    case 'CANCEL_EDIT':
      return { ...state, isEditing: false, editedUser: { ...state.user }, errors: {} };
    case 'UPDATE_FIELD':
      return {
        ...state,
        editedUser: { ...state.editedUser, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: null },
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SAVE_START':
      return { ...state, isSaving: true };
    case 'SAVE_SUCCESS':
      return {
        ...state,
        user: { ...state.editedUser },
        isSaving: false,
        isEditing: false,
        message: 'Profil mis à jour !',
      };
    case 'CLEAR_MESSAGE':
      return { ...state, message: null };
    default:
      return state;
  }
}

function ProfilePage({ userId = 1 }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  useEffect(() => {
    const user = getEmployeeById(userId);
    if (user) dispatch({ type: 'SET_USER', payload: user });
  }, [userId]);

  function handleFieldChange(e) {
    dispatch({ type: 'UPDATE_FIELD', field: e.target.name, value: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    const errors = {};
    if (!state.editedUser.firstName?.trim()) errors.firstName = 'Requis';
    if (!state.editedUser.lastName?.trim()) errors.lastName = 'Requis';
    if (!state.editedUser.email?.trim()) errors.email = 'Requis';

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    dispatch({ type: 'SAVE_START' });
    await new Promise(r => setTimeout(r, 500));
    dispatch({ type: 'SAVE_SUCCESS' });
    setTimeout(() => dispatch({ type: 'CLEAR_MESSAGE' }), 3000);
  }

  if (!state.user) return <div className="profile-loading">Chargement...</div>;

  const displayUser = state.isEditing ? state.editedUser : state.user;

  return (
    <div className="profile-page">
      {state.message && <div className="success-message">{state.message}</div>}

      <div className="profile-header">
        <img src={displayUser.avatar} alt={displayUser.firstName} className="profile-avatar" />
        <div className="profile-info">
          <h1>{displayUser.firstName} {displayUser.lastName}</h1>
          <p className="profile-role">{displayUser.role}</p>
          <p className="profile-department">{displayUser.department}</p>
        </div>
      </div>

      {state.isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label>Prénom</label>
            <input name="firstName" value={state.editedUser.firstName} onChange={handleFieldChange} />
            {state.errors.firstName && <span className="error">{state.errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input name="lastName" value={state.editedUser.lastName} onChange={handleFieldChange} />
            {state.errors.lastName && <span className="error">{state.errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" value={state.editedUser.email} onChange={handleFieldChange} />
            {state.errors.email && <span className="error">{state.errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input name="phone" value={state.editedUser.phone || ''} onChange={handleFieldChange} />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea name="bio" value={state.editedUser.bio || ''} onChange={handleFieldChange} rows={3} />
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => dispatch({ type: 'CANCEL_EDIT' })} className="cancel-btn">Annuler</button>
            <button type="submit" className="save-btn" disabled={state.isSaving}>
              {state.isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="detail-row"><span className="label">Email</span><span>{displayUser.email}</span></div>
          <div className="detail-row"><span className="label">Téléphone</span><span>{displayUser.phone}</span></div>
          <div className="detail-row"><span className="label">Bio</span><span>{displayUser.bio || 'Non renseignée'}</span></div>
          <button onClick={() => dispatch({ type: 'START_EDIT' })} className="edit-btn">Modifier</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

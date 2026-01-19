// Composant sélecteur d'utilisateur
// Permet de choisir "qui je suis" parmi les employés

import { useUser } from '../../contexts/UserContext';
import './UserSelector.css';

function UserSelector({ compact = false }) {
  const { currentUser, selectUser, availableUsers } = useUser();

  return (
    <div className={`user-selector ${compact ? 'compact' : ''}`}>
      {!compact && (
        <label htmlFor="user-select">Connecté en tant que :</label>
      )}

      <select
        id="user-select"
        value={currentUser?.id || ''}
        onChange={(e) => selectUser(Number(e.target.value))}
      >
        {availableUsers.map(employee => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName} {employee.lastName}
            {employee.isAdmin && ' (Admin)'}
          </option>
        ))}
      </select>

      {!compact && currentUser && (
        <div className="current-user-info">
          <img
            src={currentUser.avatar}
            alt={currentUser.firstName}
            className="user-avatar"
          />
          <div className="user-details">
            <span className="user-name">
              {currentUser.firstName} {currentUser.lastName}
            </span>
            <span className="user-role">{currentUser.role}</span>
            {currentUser.isAdmin && (
              <span className="admin-badge">Admin</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSelector;

// Composant sélecteur d'utilisateur
// Permet de simuler différents utilisateurs sans système de login

import { useUser } from './UserContext';
import { employees } from '../../../src/data/employees';
import './UserSelector.css';

function UserSelector() {
  const { currentUser, selectUser } = useUser();

  return (
    <div className="user-selector">
      <label htmlFor="user-select">Connecté en tant que :</label>
      <select
        id="user-select"
        value={currentUser?.id || ''}
        onChange={(e) => selectUser(Number(e.target.value))}
      >
        {employees.map(employee => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName} {employee.lastName}
            {employee.isAdmin && ' (Admin)'}
          </option>
        ))}
      </select>

      {currentUser && (
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

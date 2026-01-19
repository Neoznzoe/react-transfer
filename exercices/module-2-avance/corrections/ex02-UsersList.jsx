// Exercice 2 - Fetch de données
// Concepts : useEffect, fetch, états loading/error

import { useState, useEffect } from 'react';
import './UsersList.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchUsers() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="users-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-container">
        <div className="error">
          <p>Erreur : {error}</p>
          <button onClick={fetchUsers}>Réessayer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Utilisateurs ({users.length})</h2>
        <button onClick={fetchUsers}>Rafraîchir</button>
      </div>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-company">{user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;

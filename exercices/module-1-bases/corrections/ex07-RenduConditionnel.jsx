// Exercice 7 - Rendu conditionnel
// Concepts : Ternaire, &&, if/else

import { useState } from 'react';

function StatusPanel() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function simulateLoading() {
    setStatus('loading');
    setTimeout(() => {
      // Simuler succès ou erreur aléatoire
      setStatus(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
  }

  // Rendu conditionnel avec fonction
  function renderStatus() {
    switch (status) {
      case 'loading':
        return <div className="status loading">⏳ Chargement...</div>;
      case 'success':
        return <div className="status success">✅ Opération réussie !</div>;
      case 'error':
        return <div className="status error">❌ Une erreur est survenue</div>;
      default:
        return <div className="status idle">En attente...</div>;
    }
  }

  return (
    <div className="status-panel">
      <h2>Rendu conditionnel</h2>

      {/* Méthode 1 : Ternaire */}
      <section>
        <h3>Authentification (Ternaire)</h3>
        {isLoggedIn ? (
          <div className="auth-status logged-in">
            <p>Bienvenue, utilisateur !</p>
            <button onClick={() => setIsLoggedIn(false)}>Déconnexion</button>
          </div>
        ) : (
          <div className="auth-status logged-out">
            <p>Vous n'êtes pas connecté</p>
            <button onClick={() => setIsLoggedIn(true)}>Connexion</button>
          </div>
        )}
      </section>

      {/* Méthode 2 : && */}
      <section>
        <h3>Badges conditionnels (&&)</h3>
        <div className="badges">
          {isLoggedIn && <span className="badge green">Connecté</span>}
          {status === 'loading' && <span className="badge blue">En cours</span>}
          {status === 'error' && <span className="badge red">Erreur</span>}
        </div>
      </section>

      {/* Méthode 3 : Switch/fonction */}
      <section>
        <h3>Statut (Switch)</h3>
        {renderStatus()}
        <button onClick={simulateLoading} disabled={status === 'loading'}>
          Lancer une opération
        </button>
        <button onClick={() => setStatus('idle')}>Reset</button>
      </section>
    </div>
  );
}

export default StatusPanel;

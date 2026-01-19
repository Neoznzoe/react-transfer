// Composant Header pour le projet fonctionnel
// Voir etapes/etape-1-structure/correction/Header.jsx pour les explications détaillées

import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

function Header({ activePage, onNavigate }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'directory', label: 'Annuaire' },
    { id: 'profile', label: 'Profil' },
  ];

  return (
    <header className="header">
      <div className="header-brand">
        <h1 className="header-logo">TeamHub</h1>
        <span className="header-tagline">Votre intranet d'entreprise</span>
      </div>

      <nav className="header-nav">
        {navLinks.map(link => (
          <button
            key={link.id}
            className={`nav-link ${activePage === link.id ? 'active' : ''}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {user && (
          <div className="header-user">
            <img src={user.avatar} alt={user.firstName} className="user-avatar" />
            <span className="user-name">{user.firstName}</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

// Composant Header pour le projet fonctionnel
// Voir etapes/etape-1-structure/correction/Header.jsx pour les explications détaillées

import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';
import UserSelector from '../ui/UserSelector';
import './Header.css';

function Header({ activePage, onNavigate }) {
  const { currentUser, isAdmin } = useUser();
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
        <button onClick={toggleTheme} className="theme-toggle" title="Changer de thème">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Sélecteur d'utilisateur en version compacte */}
        <UserSelector compact />

        {currentUser && (
          <div className="header-user">
            <img src={currentUser.avatar} alt={currentUser.firstName} className="user-avatar" />
            <div className="user-info">
              <span className="user-name">{currentUser.firstName}</span>
              {isAdmin && <span className="admin-indicator">Admin</span>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

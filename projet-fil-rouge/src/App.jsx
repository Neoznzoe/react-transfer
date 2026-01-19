// ═══════════════════════════════════════════════════════════════════════════
// APP.JSX - Composant racine de TeamHub
// ═══════════════════════════════════════════════════════════════════════════
//
// Ce fichier évolue au fil des étapes du projet.
// Ci-dessous, la version finale avec toutes les fonctionnalités.
//
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import EmployeeList from './components/employees/EmployeeList';
import AnnouncementList from './components/announcements/AnnouncementList';
import ProfilePage from './components/profile/ProfilePage';
import './styles/index.css';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT DE CONTENU PRINCIPAL
// Gère l'affichage en fonction de la page active
// ═══════════════════════════════════════════════════════════════════════════
function MainContent({ activePage }) {
  const { currentUser } = useUser();

  switch (activePage) {
    case 'directory':
      return <EmployeeList />;

    case 'profile':
      return <ProfilePage userId={currentUser?.id || 1} />;

    case 'home':
    default:
      return (
        <div>
          <h1>Bienvenue sur TeamHub</h1>
          <p className="text-muted mb-4">
            Votre intranet d'entreprise pour rester connecté avec votre équipe.
          </p>
          <AnnouncementList />
        </div>
      );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT APP
// Version avec Context (étape 6)
// ═══════════════════════════════════════════════════════════════════════════
function AppContent() {
  const [activePage, setActivePage] = useState('home');

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      <MainContent activePage={activePage} />
    </Layout>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT RACINE AVEC PROVIDERS
//
// ⚠️ L'ordre des Providers est important :
// - Les Providers extérieurs sont accessibles aux Providers intérieurs
// - UserProvider gère l'utilisateur actuellement sélectionné
// - ThemeProvider gère le thème clair/sombre
// ═══════════════════════════════════════════════════════════════════════════
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;


// ═══════════════════════════════════════════════════════════════════════════
// VERSIONS SIMPLIFIÉES POUR LES PREMIÈRES ÉTAPES
// ═══════════════════════════════════════════════════════════════════════════

/*
// ─────────────────────────────────────────────────────────────────────────────
// ÉTAPE 1 : Structure de base
// ─────────────────────────────────────────────────────────────────────────────

import Layout from './components/layout/Layout';
import './styles/index.css';

function App() {
  return (
    <Layout>
      <h1>Bienvenue sur TeamHub</h1>
      <p>Votre intranet d'entreprise.</p>
    </Layout>
  );
}

export default App;

// ─────────────────────────────────────────────────────────────────────────────
// ÉTAPE 2 : Annuaire
// ─────────────────────────────────────────────────────────────────────────────

import Layout from './components/layout/Layout';
import EmployeeList from './components/employees/EmployeeList';
import './styles/index.css';

function App() {
  return (
    <Layout>
      <EmployeeList />
    </Layout>
  );
}

export default App;

// ─────────────────────────────────────────────────────────────────────────────
// ÉTAPE 3 : Avec recherche et filtres
// ─────────────────────────────────────────────────────────────────────────────

import Layout from './components/layout/Layout';
import EmployeeListWithFilters from './components/employees/EmployeeListWithFilters';
import './styles/index.css';

function App() {
  return (
    <Layout>
      <EmployeeListWithFilters />
    </Layout>
  );
}

export default App;

*/

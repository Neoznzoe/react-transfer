// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT.JSX - Composant de mise en page principal
// ═══════════════════════════════════════════════════════════════════════════
//
// CONCEPTS UTILISÉS :
// - Props spéciale "children" pour le contenu dynamique
// - Composition de composants
// - useState pour la navigation
// - Pattern de "lifting state up"
//
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

// Données mockées pour l'utilisateur courant
// Plus tard, ça viendra du Context d'authentification
const mockCurrentUser = {
  id: 1,
  firstName: "Victor",
  lastName: "Besson",
  avatar: "https://i.pravatar.cc/150?img=1"
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT LAYOUT
//
// ⚠️ POINT BLOQUANT : La prop "children"
//
// "children" est une prop SPÉCIALE de React qui contient tout ce qui est
// placé ENTRE les balises ouvrante et fermante du composant :
//
// <Layout>
//   <h1>Ceci est passé dans children</h1>
//   <p>Ceci aussi !</p>
// </Layout>
//
// ─────────────────────────────────────────────────────────────────────────────
function Layout({ children }) {
  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // On gère la navigation ici pour que Header puisse la modifier
  // et que le contenu puisse changer en fonction
  // ═══════════════════════════════════════════════════════════════════════════
  const [activePage, setActivePage] = useState('home');

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLER DE NAVIGATION
  // Cette fonction sera passée au Header via props
  // ═══════════════════════════════════════════════════════════════════════════
  function handleNavigate(pageId) {
    setActivePage(pageId);
    // Plus tard, on pourra utiliser React Router ici
    console.log(`Navigation vers : ${pageId}`);
  }

  return (
    <div className="layout">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HEADER                                                              */}
      {/* On passe les props nécessaires pour la navigation                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        currentUser={mockCurrentUser}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* CONTENU PRINCIPAL                                                   */}
      {/* ⚠️ {children} affiche tout ce qui est passé entre <Layout>...</Layout> */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <main className="main-content">
        {children}
      </main>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* FOOTER                                                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}

export default Layout;

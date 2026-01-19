// Exercice 2 - Header et Footer
// Concepts : Composants multiples, import/export

// Header.jsx
export function Header() {
  return (
    <header className="header">
      <h1>Mon Site</h1>
      <nav>
        <a href="#accueil">Accueil</a>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

// Footer.jsx
export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {annee} - Mon Site. Tous droits réservés.</p>
    </footer>
  );
}

// App.jsx - Composition
function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h2>Bienvenue</h2>
        <p>Contenu de la page...</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;

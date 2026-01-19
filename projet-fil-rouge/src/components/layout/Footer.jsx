import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#aide" className="footer-link">Aide</a>
        <a href="#contact" className="footer-link">Contact</a>
        <a href="#mentions" className="footer-link">Mentions légales</a>
      </div>

      <div className="footer-copyright">
        <p>&copy; {currentYear} TeamHub - Tous droits réservés</p>
      </div>

      <div className="footer-version">
        <span>Version 1.0.0</span>
      </div>
    </footer>
  );
}

export default Footer;

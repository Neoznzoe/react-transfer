import Header from './Header';
import Footer from './Footer';
import './Layout.css';

function Layout({ children, activePage, onNavigate }) {
  return (
    <div className="layout">
      <Header activePage={activePage} onNavigate={onNavigate} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

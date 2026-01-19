import { useState, useEffect } from 'react';
import { announcements as mockAnnouncements, categories, getRelativeTime } from '../../data/announcements';
import './AnnouncementList.css';

function AnnouncementCard({ announcement }) {
  const { title, content, author, authorRole, createdAt, category, isPinned } = announcement;

  return (
    <article className={`announcement-card ${isPinned ? 'pinned' : ''}`}>
      <header className="announcement-header">
        <div className="announcement-meta">
          {isPinned && <span className="pinned-badge">📌</span>}
          <span className={`category-badge category-${category.toLowerCase()}`}>{category}</span>
        </div>
        <h3 className="announcement-title">{title}</h3>
      </header>

      <div className="announcement-content">
        <p>{content}</p>
      </div>

      <footer className="announcement-footer">
        <div className="author-info">
          <span className="author-name">{author}</span>
          <span className="author-role">{authorRole}</span>
        </div>
        <time className="announcement-date">{getRelativeTime(createdAt)}</time>
      </footer>
    </article>
  );
}

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  useEffect(() => {
    let isMounted = true;

    async function loadAnnouncements() {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      if (isMounted) {
        setAnnouncements(mockAnnouncements);
        setIsLoading(false);
      }
    }

    loadAnnouncements();
    return () => { isMounted = false; };
  }, []);

  const filteredAnnouncements = announcements
    .filter(a => selectedCategory === 'Toutes' || a.category === selectedCategory)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (isLoading) {
    return (
      <div className="announcements-section">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des annonces...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="announcements-section">
      <div className="section-header">
        <h2>Annonces</h2>
        <span className="count">{filteredAnnouncements.length} annonce(s)</span>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </section>
  );
}

export default AnnouncementList;

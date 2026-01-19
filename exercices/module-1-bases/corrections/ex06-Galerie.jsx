// Exercice 6 - Galerie d'images
// Concepts : map(), événements, state pour sélection

import { useState } from 'react';

function Galerie() {
  const images = [
    { id: 1, src: "https://picsum.photos/400/300?random=1", title: "Paysage 1" },
    { id: 2, src: "https://picsum.photos/400/300?random=2", title: "Paysage 2" },
    { id: 3, src: "https://picsum.photos/400/300?random=3", title: "Paysage 3" },
    { id: 4, src: "https://picsum.photos/400/300?random=4", title: "Paysage 4" },
    { id: 5, src: "https://picsum.photos/400/300?random=5", title: "Paysage 5" },
    { id: 6, src: "https://picsum.photos/400/300?random=6", title: "Paysage 6" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  function openModal(image) {
    setSelectedImage(image);
  }

  function closeModal() {
    setSelectedImage(null);
  }

  return (
    <div className="galerie">
      <h2>Galerie Photos</h2>

      <div className="galerie-grid">
        {images.map(image => (
          <div
            key={image.id}
            className="galerie-item"
            onClick={() => openModal(image)}
          >
            <img src={image.src} alt={image.title} />
            <div className="galerie-overlay">
              <span>{image.title}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
            <button onClick={closeModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Galerie;

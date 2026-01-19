// Exercice 6 - useMemo et useCallback
// Concepts : Optimisation des performances, mémoïsation

import { useState, useMemo, useCallback, memo } from 'react';
import './OptimizedList.css';

// Liste de produits simulée
const generateProducts = () => {
  const categories = ['Électronique', 'Vêtements', 'Maison', 'Sport', 'Livres'];
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Produit ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 10,
    category: categories[Math.floor(Math.random() * categories.length)],
  }));
};

const PRODUCTS = generateProducts();

// Composant mémoïsé pour éviter les re-renders inutiles
const ProductItem = memo(function ProductItem({ product, onAddToCart }) {
  console.log(`Render ProductItem: ${product.name}`);

  return (
    <div className="product-item">
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-price">{product.price} €</div>
      <button onClick={() => onAddToCart(product)}>Ajouter</button>
    </div>
  );
});

function OptimizedList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);

  // useMemo pour éviter de recalculer les catégories à chaque render
  const categories = useMemo(() => {
    console.log('Calcul des catégories...');
    return [...new Set(PRODUCTS.map(p => p.category))].sort();
  }, []); // Dépendances vides car PRODUCTS est constant

  // useMemo pour filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    console.log('Filtrage et tri des produits...');

    let result = PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [searchTerm, selectedCategory, sortBy]);

  // useMemo pour calculer le total du panier
  const cartTotal = useMemo(() => {
    console.log('Calcul du total panier...');
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // useCallback pour stabiliser la référence de la fonction
  const handleAddToCart = useCallback((product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  // useCallback pour supprimer du panier
  const handleRemoveFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  return (
    <div className="optimized-list">
      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Tri par nom</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
      </div>

      <div className="main-content">
        <div className="products-list">
          <h2>Produits ({filteredProducts.length})</h2>
          <div className="products-container">
            {filteredProducts.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <div className="cart-sidebar">
          <h2>Panier ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Panier vide</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{item.price * item.quantity} €</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: {cartTotal} €</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OptimizedList;

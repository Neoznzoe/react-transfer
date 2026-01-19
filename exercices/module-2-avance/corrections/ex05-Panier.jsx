// Exercice 5 - Panier avec useReducer
// Concepts : useReducer, actions, dispatch

import { useReducer } from 'react';
import './Panier.css';

const PRODUCTS = [
  { id: 1, name: 'React T-Shirt', price: 25 },
  { id: 2, name: 'JavaScript Mug', price: 12 },
  { id: 3, name: 'Node.js Sticker Pack', price: 5 },
  { id: 4, name: 'TypeScript Cap', price: 18 },
];

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function Panier() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="shop">
      <section className="catalog">
        <h2>Produits</h2>
        <div className="products-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">{product.price} €</p>
              <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>
                Ajouter
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <div className="cart-header">
          <h2>Panier ({totalItems})</h2>
          {state.items.length > 0 && (
            <button onClick={() => dispatch({ type: 'CLEAR_CART' })} className="clear-btn">
              Vider
            </button>
          )}
        </div>

        {state.items.length === 0 ? (
          <p className="empty-cart">Votre panier est vide</p>
        ) : (
          <>
            <ul className="cart-items">
              {state.items.map(item => (
                <li key={item.id} className="cart-item">
                  <span className="item-name">{item.name}</span>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
                  </div>
                  <span className="item-total">{item.price * item.quantity} €</span>
                  <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })} className="remove-btn">×</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <strong>Total : {totalPrice.toFixed(2)} €</strong>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Panier;

// Exercice 4 - Compteur
// Concepts : useState, événements onClick

import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div className="compteur">
      <h2>Compteur</h2>
      <div className="compteur-display">{count}</div>
      <div className="compteur-buttons">
        <button onClick={decrement} className="btn btn-minus">-</button>
        <button onClick={reset} className="btn btn-reset">Reset</button>
        <button onClick={increment} className="btn btn-plus">+</button>
      </div>
    </div>
  );
}

export default Compteur;

// Exercice 10 - Application Todo complète
// Concepts : Synthèse Module 1 - tous les concepts combinés

import { useState } from 'react';

// Composant pour un item todo
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        ×
      </button>
    </li>
  );
}

// Composant pour le formulaire d'ajout
function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Ajouter une tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

// Composant pour les filtres
function TodoFilters({ filter, onFilterChange, counts }) {
  return (
    <div className="todo-filters">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        Toutes ({counts.all})
      </button>
      <button
        className={filter === 'active' ? 'active' : ''}
        onClick={() => onFilterChange('active')}
      >
        Actives ({counts.active})
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
      >
        Terminées ({counts.completed})
      </button>
    </div>
  );
}

// Composant principal
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Apprendre React', completed: true },
    { id: 2, text: 'Faire les exercices', completed: false },
    { id: 3, text: 'Créer une application', completed: false },
  ]);
  const [filter, setFilter] = useState('all');

  // Ajouter une tâche
  function addTodo(text) {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  }

  // Basculer l'état d'une tâche
  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  // Supprimer une tâche
  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // Supprimer les tâches terminées
  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  // Filtrer les todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Compter les todos
  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return (
    <div className="todo-app">
      <h1>Ma Todo List</h1>

      <TodoForm onAdd={addTodo} />

      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      {filteredTodos.length === 0 ? (
        <p className="empty-message">
          {filter === 'all'
            ? 'Aucune tâche. Ajoutez-en une !'
            : filter === 'active'
            ? 'Aucune tâche active.'
            : 'Aucune tâche terminée.'}
        </p>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      {counts.completed > 0 && (
        <button onClick={clearCompleted} className="clear-btn">
          Supprimer les tâches terminées
        </button>
      )}
    </div>
  );
}

export default TodoApp;

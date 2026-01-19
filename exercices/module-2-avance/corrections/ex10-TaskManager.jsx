// Exercice 10 - Mini Application Complète : TaskManager
// Concepts : Synthèse de tous les hooks (useState, useEffect, useReducer, useContext, useRef, useMemo, useCallback, custom hooks)

import { createContext, useContext, useReducer, useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import './TaskManager.css';

// ============ Custom Hooks ============

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Erreur localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ============ Context ============

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  filter: 'all', // all, active, completed
  sortBy: 'date', // date, priority, name
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now(),
          text: action.payload.text,
          priority: action.payload.priority || 'medium',
          completed: false,
          createdAt: new Date().toISOString()
        }]
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        )
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SORT':
      return { ...state, sortBy: action.payload };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed)
      };

    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [storedTasks, setStoredTasks] = useLocalStorage('taskmanager-tasks', []);
  const [state, dispatch] = useReducer(taskReducer, { ...initialState, tasks: storedTasks });

  // Sync avec localStorage
  useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks, setStoredTasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks doit être utilisé dans un TaskProvider');
  }
  return context;
}

// ============ Components ============

const TaskInput = memo(function TaskInput() {
  const { dispatch } = useTasks();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const inputRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({ type: 'ADD_TASK', payload: { text: text.trim(), priority } });
    setText('');
    inputRef.current?.focus();
  }, [text, priority, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter une tâche..."
        className="task-text-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="low">🟢 Basse</option>
        <option value="medium">🟡 Moyenne</option>
        <option value="high">🔴 Haute</option>
      </select>
      <button type="submit" className="add-btn">Ajouter</button>
    </form>
  );
});

const TaskItem = memo(function TaskItem({ task }) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  }, [dispatch, task.id]);

  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  }, [dispatch, task.id]);

  const handleEdit = useCallback(() => {
    if (editText.trim() && editText !== task.text) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: editText.trim() } });
    }
    setIsEditing(false);
  }, [dispatch, task.id, task.text, editText]);

  const priorityIcon = {
    low: '🟢',
    medium: '🟡',
    high: '🔴'
  }[task.priority];

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="task-checkbox"
      />

      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          className="edit-input"
        />
      ) : (
        <span className="task-text" onDoubleClick={() => setIsEditing(true)}>
          {priorityIcon} {task.text}
        </span>
      )}

      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="edit-btn" title="Modifier">
          ✏️
        </button>
        <button onClick={handleDelete} className="delete-btn" title="Supprimer">
          🗑️
        </button>
      </div>
    </div>
  );
});

function TaskFilters() {
  const { state, dispatch } = useTasks();

  return (
    <div className="task-filters">
      <div className="filter-group">
        <label>Filtrer :</label>
        <select
          value={state.filter}
          onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
        >
          <option value="all">Toutes</option>
          <option value="active">Actives</option>
          <option value="completed">Terminées</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Trier :</label>
        <select
          value={state.sortBy}
          onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value })}
        >
          <option value="date">Date</option>
          <option value="priority">Priorité</option>
          <option value="name">Nom</option>
        </select>
      </div>
    </div>
  );
}

function TaskList({ searchTerm }) {
  const { state } = useTasks();
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...state.tasks];

    // Filtrer par recherche
    if (debouncedSearch) {
      result = result.filter(task =>
        task.text.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Filtrer par statut
    if (state.filter === 'active') {
      result = result.filter(task => !task.completed);
    } else if (state.filter === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Trier
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    result.sort((a, b) => {
      switch (state.sortBy) {
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'name':
          return a.text.localeCompare(b.text);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return result;
  }, [state.tasks, state.filter, state.sortBy, debouncedSearch]);

  if (filteredAndSortedTasks.length === 0) {
    return (
      <div className="empty-state">
        {state.tasks.length === 0
          ? '📝 Aucune tâche. Ajoutez-en une !'
          : '🔍 Aucune tâche ne correspond à votre recherche.'}
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredAndSortedTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

function TaskStats() {
  const { state, dispatch } = useTasks();

  const stats = useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const highPriority = state.tasks.filter(t => t.priority === 'high' && !t.completed).length;

    return { total, completed, active, highPriority };
  }, [state.tasks]);

  return (
    <div className="task-stats">
      <div className="stat">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats.active}</span>
        <span className="stat-label">Actives</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats.completed}</span>
        <span className="stat-label">Terminées</span>
      </div>
      <div className="stat urgent">
        <span className="stat-value">{stats.highPriority}</span>
        <span className="stat-label">Urgentes</span>
      </div>

      {stats.completed > 0 && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          className="clear-completed-btn"
        >
          Effacer terminées
        </button>
      )}
    </div>
  );
}

function TaskManager() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="task-manager">
      <header className="tm-header">
        <h1>📋 TaskManager</h1>
        <p>Gérez vos tâches avec tous les hooks React</p>
      </header>

      <TaskStats />

      <TaskInput />

      <div className="search-and-filters">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Rechercher..."
          className="search-input"
        />
        <TaskFilters />
      </div>

      <TaskList searchTerm={searchTerm} />

      <footer className="tm-footer">
        <p>
          Hooks utilisés : useState, useEffect, useReducer, useContext,
          useRef, useMemo, useCallback, memo + custom hooks
        </p>
      </footer>
    </div>
  );
}

// Export avec Provider
function App() {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  );
}

export default App;

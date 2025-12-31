import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : ['Personal', 'Work'];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('dateCreated');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const addTodo = (text, category, priority, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      category: category,
      priority: priority,
      dueDate: dueDate,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText, newCategory, newPriority, newDueDate) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, category: newCategory, priority: newPriority, dueDate: newDueDate } : todo
    ));
  };

  const addCategory = (newCategory) => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const deleteCategory = (categoryToDelete) => {
    if (['Personal', 'Work'].includes(categoryToDelete)) {
      alert("Cannot delete default categories!");
      return;
    }

    const todosInCategory = todos.filter(todo => todo.category === categoryToDelete);
    if (todosInCategory.length > 0) {
      const confirm = window.confirm(`There are ${todosInCategory.length} todos in this category. Delete anyway?`);
      if (!confirm) return;

      setTodos(todos.filter(todo => todo.category !== categoryToDelete));
    }

    setCategories(categories.filter(cat => cat !== categoryToDelete));

    if (filter === categoryToDelete) {
      setFilter('All');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearAllTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const filteredTodos = todos
    .filter(todo => {
      const matchesCategory = filter === 'All' || todo.category === filter;
      const matchesSearch = todo.text.toLowerCase().includes(searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dateCreated':
          return b.id - a.id;
        case 'dateCreatedOldest':
          return a.id - b.id;
        case 'alphabeticalAZ':
          return a.text.localeCompare(b.text);
        case 'alphabeticalZA':
          return b.text.localeCompare(a.text);
        case 'priorityHighLow':
          const priorityOrderHL = { 'High': 1, 'Medium': 2, 'Low': 3 };
          return priorityOrderHL[a.priority] - priorityOrderHL[b.priority];
        case 'priorityLowHigh':
          const priorityOrderLH = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return priorityOrderLH[a.priority] - priorityOrderLH[b.priority];
        case 'completed':
          return a.completed - b.completed;
        case 'completedFirst':
          return b.completed - a.completed;
        case 'dueDateSoonest':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'dueDateLatest':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate) - new Date(a.dueDate);
        default:
          return 0;
      }
    });

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <h1>My To-Do List</h1>
      <TodoForm
        addTodo={addTodo}
        categories={categories}
      />
      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        deleteCategory={deleteCategory}
        addCategory={addCategory}
      />
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search todos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        {searchText && (
          <button onClick={() => setSearchText('')} className="clear-search">
            ✕
          </button>
        )}
      </div>
      <div className="sort-container">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="dateCreated">Date Created (Newest)</option>
          <option value="dateCreatedOldest">Date Created (Oldest)</option>
          <option value="alphabeticalAZ">Alphabetical (A-Z)</option>
          <option value="alphabeticalZA">Alphabetical (Z-A)</option>
          <option value="priorityHighLow">Priority (High to Low)</option>
          <option value="priorityLowHigh">Priority (Low to High)</option>
          <option value="completed">Status (Incomplete First)</option>
          <option value="completedFirst">Status (Completed First)</option>
          <option value="dueDateSoonest">Due Date (Soonest)</option>
          <option value="dueDateLatest">Due Date (Latest)</option>
        </select>
      </div>
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        categories={categories}
      />
      <p>Todos: {todos.length}</p>
      <button onClick={clearAllTodos}>Clear All Todos</button>
    </div>
  );
}

export default App;
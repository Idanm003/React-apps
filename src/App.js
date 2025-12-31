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
    return savedCategories ? JSON.parse(savedCategories) : ['Personal', 'Work',];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTodo = (text, category) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      category: category,
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

  const addCategory = (newCategory) => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const deleteCategory = (categoryToDelete) => {
    if (['Personal', 'Work',].includes(categoryToDelete)) {
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

  const clearAllTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const filteredTodos = filter === 'All'
    ? todos
    : todos.filter(todo => todo.category === filter);

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <TodoForm
        addTodo={addTodo}
        categories={categories}
        addCategory={addCategory}
      />
      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        deleteCategory={deleteCategory}
      />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
      <p>Todos: {todos.length}</p>
      <button onClick={clearAllTodos}>Clear All Todos</button>
    </div>
  );
}

export default App;
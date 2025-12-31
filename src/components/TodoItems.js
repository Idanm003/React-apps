function TodoItem({ todo, toggleComplete, deleteTodo }) {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'priority-high';
            case 'Medium': return 'priority-medium';
            case 'Low': return 'priority-low';
            default: return 'priority-medium';
        }
    };

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            {' '}
            <span className="category-badge">{todo.category}</span>
            {' '}
            <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                {todo.priority}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    );
}

export default TodoItem;
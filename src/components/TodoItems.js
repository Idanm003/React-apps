function TodoItems({ todo, toggleComplete, deleteTodo }) {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.Complete}
                onChange={() => toggleComplete(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            {' '}
            <span className="category-badge">{todo.category}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    );
}

export default TodoItems;
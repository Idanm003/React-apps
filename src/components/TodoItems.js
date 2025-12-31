import { useState } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo, categories }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editCategory, setEditCategory] = useState(todo.category);
    const [editPriority, setEditPriority] = useState(todo.priority);
    const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'priority-high';
            case 'Medium': return 'priority-medium';
            case 'Low': return 'priority-low';
            default: return 'priority-medium';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const isOverdue = (dateString) => {
        if (!dateString || todo.completed) return false;
        const dueDate = new Date(dateString);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        return dueDate < todayDate;
    };

    const handleSave = () => {
        if (editText.trim() !== '') {
            editTodo(todo.id, editText, editCategory, editPriority, editDueDate);
            setIsEditing(false);
        } else {
            alert('Todo text cannot be empty!');
        }
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setEditCategory(todo.category);
        setEditPriority(todo.priority);
        setEditDueDate(todo.dueDate || '');
        setIsEditing(false);
    };

    return (
        <div className={`todo-item ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                disabled={isEditing}
            />

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-input"
                        autoFocus
                    />
                    <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="edit-category-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="edit-priority-select"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        min={today}
                        className="edit-date-picker"
                    />
                </>
            ) : (
                <>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                    </span>
                    {' '}
                    <span className="category-badge">{todo.category}</span>
                </>
            )}

            {!isEditing && (
                <>
                    {' '}
                    <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                        {todo.priority}
                    </span>
                    {' '}
                    {todo.dueDate && (
                        <span className={`due-date-badge ${isOverdue(todo.dueDate) ? 'overdue-badge' : ''}`}>
                            📅 {formatDate(todo.dueDate)}
                        </span>
                    )}
                </>
            )}

            {isEditing ? (
                <>
                    <button onClick={handleSave} className="save-btn">✓</button>
                    <button onClick={handleCancel} className="cancel-btn">✕</button>
                </>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
            )}
        </div>
    );
}

export default TodoItem;
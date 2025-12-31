import TodoItem from './TodoItems';

function TodoList({ todos, toggleComplete, deleteTodo, editTodo, categories }) {
    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <p>No todos yet! Add one above.</p>
            ) : (
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        categories={categories}
                    />
                ))
            )}
        </div>
    );
}

export default TodoList;
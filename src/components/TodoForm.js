import { useState } from "react";

function TodoForm(props) {
    const [text, setText] = useState("");
    const [category, setCategory] = useState(props.categories[0]);
    const [newCategory, setNewCategory] = useState("");
    const [showNewCategory, setShowNewCategory] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.trim() === "") {
            alert("Please enter a todo task");
            return;
        }

        props.addTodo(text, category);
        setText("");
    };

    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            props.addCategory(newCategory);
            setCategory(newCategory);
            setNewCategory("");
            setShowNewCategory(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {props.categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <button type="submit">Add</button>
            </form>

            <div className="add-category-section">
                {!showNewCategory ? (
                    <button onClick={() => setShowNewCategory(true)} className="add-category-btn">
                        + Add Category
                    </button>
                ) : (
                    <div className="new-category-form">
                        <input
                            type="text"
                            placeholder="New category name..."
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button onClick={handleAddCategory}>Add</button>
                        <button onClick={() => setShowNewCategory(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoForm;
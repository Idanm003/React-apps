import { useState } from "react";

function TodoForm(props) {
    const [text, setText] = useState("");
    const [category, setCategory] = useState(props.categories[0]);
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.trim() === "") {
            alert("Please enter a todo task");
            return;
        }

        props.addTodo(text, category, priority, dueDate);
        setText("");
        setPriority("Medium");
        setDueDate("");
    };

    return (
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

            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={today}
                className="date-picker"
            />

            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;
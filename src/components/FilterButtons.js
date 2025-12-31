import { useState } from 'react';

function FilterButtons({ filter, setFilter, categories, deleteCategory, addCategory }) {
    const allCategories = ['All', ...categories];
    const defaultCategories = ['Personal', 'Work'];
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            addCategory(newCategory);
            setNewCategory("");
            setShowNewCategory(false);
        }
    };

    return (
        <div>
            <div className="filter-buttons">
                {allCategories.map(category => (
                    <div key={category} className="filter-button-wrapper">
                        <button
                            onClick={() => setFilter(category)}
                            className={filter === category ? 'active' : ''}
                        >
                            {category}
                        </button>
                        {category !== 'All' && !defaultCategories.includes(category) && (
                            <button
                                className="delete-category-btn"
                                onClick={() => deleteCategory(category)}
                                title="Delete category"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}

                {!showNewCategory ? (
                    <button onClick={() => setShowNewCategory(true)} className="add-category-inline-btn">
                        + Add Category
                    </button>
                ) : (
                    <div className="new-category-inline">
                        <input
                            type="text"
                            placeholder="Category name..."
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="category-inline-input"
                        />
                        <button onClick={handleAddCategory} className="save-category-btn">✓</button>
                        <button onClick={() => setShowNewCategory(false)} className="cancel-category-btn">✕</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilterButtons;
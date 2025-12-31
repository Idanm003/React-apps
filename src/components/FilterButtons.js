function FilterButtons({ filter, setFilter, categories, deleteCategory }) {
    const allCategories = ['All', ...categories];
    const defaultCategories = ['Personal', 'Work',];

    return (
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
        </div>
    );
}

export default FilterButtons;
import React from 'react';

const RecipeFilter = ({ filter, setFilter }) => {
  const filters = [
    { value: 'all', label: 'All Recipes' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'glutenFree', label: 'Gluten-Free' },
    { value: 'dairyFree', label: 'Dairy-Free' },
  ];

  return (
    <div className="flex justify-center mb-8 space-x-4 flex-wrap">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-4 py-2 rounded-md text-white font-medium transition-colors m-2 ${
            filter === value ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default RecipeFilter;
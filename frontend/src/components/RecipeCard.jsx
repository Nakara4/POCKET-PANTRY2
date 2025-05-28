import React from 'react';

function RecipeCard({ recipe }) {
  return (
    <div
      className="bg-gray-800 shadow-lg rounded-xl overflow-hidden p-6 space-y-3 text-gray-200
                 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-44 object-cover rounded-lg"
      />
      <h2 className="text-xl font-semibold">{recipe.title}</h2>
      <p className="text-sm text-gray-400">
        <strong>Ready in:</strong> {recipe.readyInMinutes} mins
      </p>
      <p className="text-sm text-gray-400">
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <p className="text-sm text-gray-400">
        <strong>Vegetarian:</strong> {recipe.vegetarian ? 'Yes' : 'No'}
      </p>
      <p className="text-sm text-gray-400">
        <strong>Vegan:</strong> {recipe.vegan ? 'Yes' : 'No'}
      </p>
      <p className="text-sm text-gray-400">
        <strong>Health Score:</strong> {recipe.healthScore}
      </p>
      <a
        href={recipe.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-blue-400 hover:text-blue-600 hover:underline text-sm transition-colors duration-300"
      >
        View full recipe →
      </a>

      <div className="mt-4">
        <p className="font-semibold mb-1 text-sm text-gray-300">Ingredients:</p>
        <ul className="list-disc pl-5 text-xs text-gray-400 max-h-32 overflow-y-auto">
          {recipe.extendedIngredients?.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeCard;

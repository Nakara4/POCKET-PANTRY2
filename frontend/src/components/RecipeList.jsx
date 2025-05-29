import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, savedRecipes, onSave }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSave={onSave}
            isSaved={savedRecipes.some((saved) => saved.id === recipe.id)}
          />
        ))
      ) : (
        <p className="text-lg text-green-300 col-span-full text-center">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
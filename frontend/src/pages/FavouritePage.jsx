import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import { auth } from '../firebase';
import RecipeCard from '../components/RecipeCard';
import ErrorMessage from '../components/ErrorMessage';

function FavoritesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      const db = getDatabase();
      const userFavoritesRef = ref(db, `userFavorites/${auth.currentUser.uid}`);

      onValue(userFavoritesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const recipes = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          })).filter(
            (recipe) => recipe && recipe.id && recipe.title && recipe.image
          );
          setSavedRecipes(recipes);
        } else {
          setSavedRecipes([]);
        }
      }, (error) => {
        setError('Failed to load favorite recipes.');
        console.error('Firebase error:', error);
      });
    } else {
      setError('Please log in to view your favorite recipes.');
    }
  }, []);

  const toggleFavorite = (recipe) => {
    if (auth.currentUser) {
      const db = getDatabase();
      const recipeRef = ref(db, `userFavorites/${auth.currentUser.uid}/${recipe.id}`);
      if (savedRecipes.some((r) => r.id === recipe.id)) {
        // Remove from favorites
        remove(recipeRef).catch((error) => {
          setError('Failed to remove recipe from favorites.');
          console.error('Error removing recipe:', error);
        });
      } else {
        // Add to favorites
        set(recipeRef, recipe).catch((error) => {
          setError('Failed to save recipe to favorites.');
          console.error('Error saving recipe:', error);
        });
      }
    } else {
      setError('Please log in to manage your favorite recipes.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-8 tracking-wide animate-pulse">
        FAVORITE RECIPES
      </h1>

      {error && <ErrorMessage message={error} />}

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            >
              <RecipeCard
                recipe={recipe}
                isFavorite={savedRecipes.some((r) => r.id === recipe.id)}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-cyan-300 col-span-full animate-fade-in">
            Your favorites list is empty.
          </p>
        )}
      </div>
    </div>
  );
}



export default FavoritesPage;
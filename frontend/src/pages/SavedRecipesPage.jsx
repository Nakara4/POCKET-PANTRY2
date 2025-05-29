	import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { auth } from '../firebase';
import RecipeCard from '../components/RecipeCard';
import ErrorMessage from '../components/ErrorMessage';

function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('SavedRecipesPage: Checking auth:', auth.currentUser);
    if (auth.currentUser) {
      const db = getDatabase();
      const userRecipesRef = ref(db, `savedRecipes/${auth.currentUser.uid}`);
      console.log('SavedRecipesPage: Listening to Firebase path:', `savedRecipes/${auth.currentUser.uid}`);
      onValue(
        userRecipesRef,
        (snapshot) => {
          const data = snapshot.val();
          console.log('SavedRecipesPage: Firebase data:', data);
          if (data) {
            const recipes = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setSavedRecipes(recipes);
          } else {
            setSavedRecipes([]);
            setError('No saved recipes found.');
          }
        },
        (err) => {
          console.error('SavedRecipesPage: Firebase fetch error:', err);
          setError(`Failed to fetch saved recipes: ${err.message}`);
        }
      );
    } else {
      setSavedRecipes([]);
      setError('Please log in to view your saved recipes.');
    }
  }, []);

  const deleteRecipe = (recipeId) => {
    if (auth.currentUser) {
      const db = getDatabase();
      const recipeRef = ref(db, `savedRecipes/${auth.currentUser.uid}/${recipeId}`);
      console.log('Deleting recipe:', recipeId);
      remove(recipeRef)
        .then(() => {
          console.log('Recipe deleted:', recipeId);
          setSavedRecipes((prev) => prev.filter((r) => r.id !== recipeId));
        })
        .catch((error) => {
          console.error('Error deleting recipe:', error);
          setError(`Failed to delete recipe: ${error.message}`);
        });
    } else {
      setError('Please log in to delete recipes.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Your Saved Recipes</h1>
      {error && <ErrorMessage message={error} />}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} isSaved={true} />
          ))
        ) : (
          <p className="text-lg text-green-300 col-span-full">No recipes saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default SavedRecipesPage;


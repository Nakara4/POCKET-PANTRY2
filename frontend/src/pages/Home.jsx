import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';
import { auth } from '../firebase';
import SearchBar from '../components/SearchBar';
import RecipeFilter from '../components/RecipeFilter';
import RecipeList from '../components/RecipeList';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch saved recipes from Firebase
  useEffect(() => {
    console.log('Checking auth:', auth.currentUser);
    if (auth.currentUser) {
      const db = getDatabase();
      const userRecipesRef = ref(db, `savedRecipes/${auth.currentUser.uid}`);
      console.log('Listening to Firebase path:', `savedRecipes/${auth.currentUser.uid}`);
      onValue(
        userRecipesRef,
        (snapshot) => {
          const data = snapshot.val();
          console.log('Firebase data:', data);
          if (data) {
            const recipes = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setSavedRecipes(recipes);
          } else {
            setSavedRecipes([]);
          }
        },
        (err) => {
          console.error('Firebase fetch error:', err);
          setError(`Failed to fetch saved recipes: ${err.message}`);
        }
      );
    } else {
      setSavedRecipes([]);
      setError('Please log in to save recipes.');
    }
  }, []);

  // Fetch recipes from API
  useEffect(() => {
    setError(null);
    axios
      .get('http://localhost:8000/recipes/?ingredients=rice')
      .then((res) => {
        console.log('API Response:', res.data);
        let data = Array.isArray(res.data) ? res.data : res.data?.results || [];
        if (!Array.isArray(data)) {
          console.warn('API data is not an array:', data);
          data = [];
        }

        // Apply search filter
        if (searchQuery.trim()) {
          data = data.filter((recipe) =>
            recipe?.title?.toLowerCase?.()?.includes(searchQuery.toLowerCase()) ?? false
          );
        }

        // Apply dietary filter
        if (filter === 'vegetarian') {
          data = data.filter((recipe) => recipe?.vegetarian === true);
        } else if (filter === 'vegan') {
          data = data.filter((recipe) => recipe?.vegan === true);
        } else if (filter === 'glutenFree') {
          data = data.filter((recipe) => recipe?.glutenFree === true);
        } else if (filter === 'dairyFree') {
          data = data.filter((recipe) => recipe?.dairyFree === true);
        }

        setRecipes(data);
        if (data.length === 0) {
          let errorMessage = 'No recipes found';
          if (searchQuery || filter !== 'all') {
            errorMessage = `No ${filter === 'all' ? '' : filter} recipes found`;
            if (searchQuery) {
              errorMessage += ` matching "${searchQuery}"`;
            }
            errorMessage += ' for the given ingredients.';
          }
          setError(errorMessage);
        }
      })
      .catch((err) => {
        console.error('API error:', err);
        setRecipes([]);
        setError(`Failed to fetch recipes: ${err.message}`);
      });
  }, [filter, searchQuery]);

  const toggleSave = (recipe) => {
    if (!auth.currentUser) {
      setError('Please log in to save recipes.');
      console.log('No user logged in');
      return;
    }

    const db = getDatabase();
    const recipeRef = ref(db, `savedRecipes/${auth.currentUser.uid}/${recipe.id}`);
    console.log('Saving/Unsaving recipe:', recipe.id, 'at', `savedRecipes/${auth.currentUser.uid}/${recipe.id}`);
    if (savedRecipes.some((saved) => saved.id === recipe.id)) {
      remove(recipeRef)
        .then(() => {
          console.log('Recipe unsaved:', recipe.id);
        })
        .catch((err) => {
          console.error('Error unsaving recipe:', err);
          setError(`Failed to unsave recipe: ${err.message}`);
        });
    } else {
      set(recipeRef, recipe)
        .then(() => {
          console.log('Recipe saved:', recipe.id);
        })
        .catch((err) => {
          console.error('Error saving recipe:', err);
          setError(`Failed to save recipe: ${err.message}`);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Suggested Recipes</h1>

      {error && <ErrorMessage message={error} />}

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <RecipeFilter filter={filter} setFilter={setFilter} />
      <RecipeList recipes={recipes} savedRecipes={savedRecipes} onSave={toggleSave} />
    </div>
  );
}

export default Home;
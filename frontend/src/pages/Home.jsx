import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/recipes/?ingredients=rice,tomato')
      .then((res) => {
        console.log('API Response:', res.data);
        const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
        setRecipes(data);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
        setRecipes([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-white text-center">Suggested Recipes</h1>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10 text-lg">No recipes found.</p>
      )}
    </div>
  );
}

export default Home;

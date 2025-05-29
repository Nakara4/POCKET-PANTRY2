import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SavedRecipesPage from './pages/SavedRecipesPage';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <Link to="/" className="text-white mx-4 hover:text-green-400">
          Home
        </Link>
        <Link to="/saved-recipes" className="text-white mx-4 hover:text-green-400">
          Favorites
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
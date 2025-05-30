import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import SavedRecipesPage from './pages/SavedRecipesPage';
import Landing from './pages/LandingPage';
import Login from './pages/Login';
import About from './pages/About';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {!hideNavbar && (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <div>
            <Link to="/about" className="text-white mx-4 hover:text-green-400">
              About
            </Link>
            <Link to="/home" className="text-white mx-4 hover:text-green-400">
              Home
            </Link>
            <Link to="/saved-recipes" className="text-white mx-4 hover:text-green-400">
              Favorites
            </Link>
          </div>
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-white mx-4 hover:text-red-400 font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-white mx-4 hover:text-green-400">
                Login
              </Link>
            )}
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/home" replace /> : <Login />}
        />
         <Route path="/about" element={<About />} />
         <Route
          path="/saved-recipes"
          element={<ProtectedRoute><SavedRecipesPage /></ProtectedRoute>}
        />
        <Route
          path="/Home"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path="/saved-recipes"
          element={<ProtectedRoute><SavedRecipesPage /></ProtectedRoute>}
        />
      </Routes>
    </>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;

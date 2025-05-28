import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* Add more routes as needed */}
      {/* Example: <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
}

export default App;

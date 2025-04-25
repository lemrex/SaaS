// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated imports
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Welcome from './pages/Welcome';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Routes> {/* Replacing Switch with Routes */}
        <Route path="/" element={token ? <Home onLogout={handleLogout} /> : <Welcome />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
};

export default App;


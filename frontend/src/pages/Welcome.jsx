import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to Book Management</h1>
      <p className="mt-1 mb-2">Manage your book collection with ease</p>
      <nav>
        <ul>
          <li>
            <Link to="/login" className="button">Login</Link>
          </li>
          <li>
            <Link to="/register" className="button secondary">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Welcome;
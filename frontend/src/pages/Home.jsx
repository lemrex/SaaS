import React, { useState, useEffect } from 'react';
import BookTable from '../components/BookTable';
import BookUpload from '../components/BookUpload';
import { getBooks } from '../services/api';

const Home = ({ onLogout }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Book Management</h1>
        <button onClick={onLogout} className="secondary">Logout</button>
      </div>
      <BookUpload onBookAdded={fetchBooks} />
      <BookTable books={books} />
    </div>
  );
};

export default Home;
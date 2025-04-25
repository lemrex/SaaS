import React from 'react';

const BookTable = ({ books }) => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td className="monospace">{book.isbn}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {books.length === 0 && <p className="text-center mt-2">No books found</p>}
  </div>
);

export default BookTable;
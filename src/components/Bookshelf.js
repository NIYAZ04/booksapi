import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    setBookshelf(JSON.parse(localStorage.getItem('bookshelf')) || []);
  }, []);

  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookToRemove.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="container">
      <h1>My Bookshelf</h1>
      <div className="bookshelf-list">
        {bookshelf.length === 0 ? (
          <p>Your bookshelf is empty.</p>
        ) : (
          bookshelf.map((book) => (
            <div key={book.key} className="book-card">
              <h3>{book.title}</h3>
              <p>{book.author_name?.join(', ')}</p>
              <button onClick={() => removeFromBookshelf(book)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <Link to="/" className="back-link">Back to Search</Link>
    </div>
  );
}

export default Bookshelf;

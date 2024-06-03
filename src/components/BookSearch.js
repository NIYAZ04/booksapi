import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem('bookshelf')) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=bestseller&limit=10&page=1`);
        setBooks(response.data.docs);
      } catch (error) {
        console.error("Error fetching initial books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${e.target.value}&limit=10&page=1`);
        setBooks(response.data.docs);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setBooks([]);
      setLoading(false);
    }
  };

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="container">
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for books"
      />
      {loading ? (
        <p>Getting books...</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.key} className="book-card">
              <h3>{book.title}</h3>
              <p>Edition Count: {book.edition_count}</p>
              <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
            </div>
          ))}
        </div>
      )}
      <Link to="/bookshelf" className="back-link">Go to My Bookshelf</Link>
    </div>
  );
}

export default BookSearch;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/Bookshelf';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Search Books</Link> | <Link to="/bookshelf">My Bookshelf</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

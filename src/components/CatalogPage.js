import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.css';

function CatalogPage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    axios.get(`${apiUrl}/api/books/`)
      .then(response => setBooks(response.data))
      .catch(error => console.log(error));
  }, [apiUrl]);

  const handleSearch = () => {
    // Search for books or users based on query
    axios.get(`${apiUrl}/api/books/?search=${searchQuery}`)
      .then(response => {
        if (response.data.length > 0) {
          setBooks(response.data);
        } else {
          // If no books found, search for users
          axios.get(`${apiUrl}/api/users/?search=${searchQuery}`)
            .then(userResponse => {
              if (userResponse.data.length > 0) {
                navigate(`/users`); // Redirect to user details
              } else {
                alert('No books or users found.');
              }
            });
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="catalog-container">
      <header>
        <nav className='NAV'>
          <a href="/">Home</a>
          <a href="/users">User</a>
          <a href="/catalog">Catalog</a>
          <div className="search-container">
          <input
            type="text"
            placeholder="Search Books or Users"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">Search</button>
          </div>
        </nav>
      </header>

      <div className="book-list">
        {books.map(book => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p>${book.price}</p>
            <button onClick={() => navigate(`/books/${book.id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;

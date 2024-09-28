import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.css';

function CatalogPage() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '', isbn: '', published_date: '', image: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal
  const navigate = useNavigate();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://127.0.0.1:8000/api/books/')
      .then(response => setBooks(response.data))
      .catch(error => console.log(error));
  };

  const handleSearch = () => {
    axios.get(`http://127.0.0.1:8000/api/books/?search=${searchQuery}`)
      .then(response => setBooks(response.data))
      .catch(error => console.log(error));
  };

  const handleAddBook = () => {
    const formData = new FormData();
    for (let key in newBook) {
      formData.append(key, newBook[key]);
    }

    axios.post('http://127.0.0.1:8000/api/books/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      fetchBooks();
      setNewBook({ title: '', author: '', price: '', isbn: '', image: null });
      setIsModalOpen(false); // Close modal after adding
    }).catch(error => console.log(error));
  };

  return (
    <div className="catalog-container">
      <header>
        <nav className="NAV">
          <a href="/">Home</a>
          <a href="/users">User</a>
          <a href="/catalog">Catalog</a>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Books"
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
            <p>₹{book.price}</p>
            <button onClick={() => navigate(`/books/${book.id}`)}>View Details</button>
          </div>
        ))}
        <div className="book-card">
          <button onClick={() => setIsModalOpen(true)}>Add New Book</button>
        </div>
      </div>

      {/* Modal for adding a book */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Book</h3>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              value={newBook.price}
              onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="ISBN"
              value={newBook.isbn}
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
            />
            <input
              type="date"
              value={newBook.published_date}
              onChange={(e) => setNewBook({ ...newBook, published_date: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
            />
            <button onClick={handleAddBook}>Add Book</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CatalogPage;

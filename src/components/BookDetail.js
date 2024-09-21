import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';

function BookDetail() {
  const { id } = useParams();  // Get the book ID from the URL parameter
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the book details by ID from the backend
    axios.get(`http://127.0.0.1:8000//api/books/${id}/`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the book details!", error);
      });
  }, [id]);

  // Navigate back to the catalog
  const goBack = () => {
    navigate('/catalog');
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail-container">
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/users">User</a>
          <a href="/catalog">Catalog</a>
        </nav>
      </header>

      <div className="book-detail">
        <img src={book.image} alt={book.title} className="book-detail-image" />
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Published Date:</strong> {book.published_date}</p>
          <button onClick={goBack} className="back-button">Back to Catalog</button>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Public Library. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default BookDetail;

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null); // Store editable book details
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal

  // Fetch book details
  const fetchBook = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => setBook(response.data))
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const handleDeleteBook = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      axios.delete(`http://127.0.0.1:8000/api/books/${id}/`)
        .then(() => navigate('/catalog'))
        .catch(error => console.log(error));
    }
  };  

  const handleUpdateBook = () => {
    const formData = new FormData();
    for (let key in editingBook) {
      formData.append(key, editingBook[key]);
    }
    axios.put(`http://127.0.0.1:8000/api/books/${id}/`, formData)
      .then(() => {
        setIsModalOpen(false);
        fetchBook(); // Refresh the book details after updating
      })
      .catch(error => console.log(error));
  };

  // Function to open the modal and set the current book details in the form
  const handleEditButtonClick = () => {
    setEditingBook({ ...book }); // Prepopulate the form with the current book data
    setIsModalOpen(true); // Open the modal
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail-container">
      <div className="book-detail">
        <img className="book-detail-image" src={book.image} alt={book.title} />
        <div className="book-info">
          <h2><strong>{book.title}</strong></h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Published Date:</strong> {book.published_date}</p>
          
          <div>
          <button onClick={handleEditButtonClick}>Edit</button>
          <button onClick={handleDeleteBook}>Delete</button></div>
          <button className="back-button" onClick={() => navigate('/catalog')}>Back to Catalog</button>
        </div>
      </div>

      {/* Edit Book Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Book</h3>
            <input
              type="text"
              value={editingBook?.title || ''}
              onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              value={editingBook?.author || ''}
              onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
              placeholder="Author"
            />
            <input
              type="text"
              value={editingBook?.price || ''}
              onChange={(e) => setEditingBook({ ...editingBook, price: e.target.value })}
              placeholder="Price"
            />
            <input
              type="text"
              value={editingBook?.isbn || ''}
              onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })}
              placeholder="ISBN"
            />
            <input
              type="date"
              value={editingBook?.published_date || ''}
              onChange={(e) => setEditingBook({ ...editingBook, published_date: e.target.value })}
              placeholder="Published Date"
            />
            <input
              type="file"
              onChange={(e) => setEditingBook({ ...editingBook, image: e.target.files[0] })}
            />
            <button onClick={handleUpdateBook}>Update</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetail;

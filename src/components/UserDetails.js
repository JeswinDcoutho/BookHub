import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';


function UserDetails() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/users/`)
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSearch = () => {
    // Perform search query to find users or books
    axios.get(`http://127.0.0.1:8000/api/users/?search=${searchQuery}`)
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data);
        } else {
          // If no users found, search for books
          axios.get(`http://127.0.0.1:8000/api/books/?search=${searchQuery}`)
            .then(bookResponse => {
              if (bookResponse.data.length > 0) {
                // Redirect to book details if a book is found
                navigate(`/books/${bookResponse.data[0].id}`);
              } else {
                alert('No users or books found.');
              }
            });
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="user-container">
      <header>
        <nav className='NAV'>
          <a href="/">Home</a>
          <a href="/users">User</a>
          <a href="/catalog">Catalog</a>
          <div className="search-container">
          <input
            type="text"
            placeholder="Search Users or Books"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">Search</button>
          </div>
        </nav>
      </header>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;

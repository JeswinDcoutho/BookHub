import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css';

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newUser, setNewUser] = useState({ name: '', role: 'patron', email: '' });
  const [editingUser, setEditingUser] = useState(null); // For editing user
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the add user modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For controlling the edit modal

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  };

  const handleSearch = () => {
    axios.get(`http://127.0.0.1:8000/api/users/?search=${searchQuery}`)
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  };

  const handleAddUser = () => {
    axios.post('http://127.0.0.1:8000/api/users/', newUser)
      .then(() => {
        fetchUsers();
        setNewUser({ name: '', role: 'patron', email: '' });
        setIsModalOpen(false);
      })
      .catch(error => console.log(error));
  };

  const handleEditUser = () => {
    axios.put(`http://127.0.0.1:8000/api/users/${editingUser.id}/`, editingUser)
      .then(() => {
        fetchUsers();
        setEditingUser(null);
        setIsEditModalOpen(false);
      })
      .catch(error => console.log(error));
  };

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      axios.delete(`http://127.0.0.1:8000/api/users/${id}/`)
        .then(() => fetchUsers())
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="user-container">
      <header>
        <nav className="NAV">
          <a href="/">Home</a>
          <a href="/users">User</a>
          <a href="/catalog">Catalog</a>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Users"
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => { setEditingUser(user); setIsEditModalOpen(true); }}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setIsModalOpen(true)} className="add-user-button">Add User</button>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="patron">Patron</option>
              <option value="librarian">Librarian</option>
            </select>
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button onClick={handleAddUser}>Add User</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            >
              <option value="patron">Patron</option>
              <option value="librarian">Librarian</option>
            </select>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
            <button onClick={handleEditUser}>Update</button>
            <button onClick={() => setIsEditModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;

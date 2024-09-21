import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserDetails from './components/UserDetails';
import CatalogPage from './components/CatalogPage';
import BookDetail from './components/BookDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserDetails />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/books/:id" element={<BookDetail />} /> {/* BookDetail route */}
      </Routes>
    </Router>
  );
}

export default App;

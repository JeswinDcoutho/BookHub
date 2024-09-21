import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/users">User</a>
          <a href="/catalog">Catalog</a>
        </nav>
      </header>

      <section className="welcome-section">
        <h1>WELCOME TO OUR PUBLIC LIBRARY!</h1>
        <p>Discover amazing books, programs, and events.</p>
      </section>

      <footer className="footer">
        <p>© 2024 Public Library. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;

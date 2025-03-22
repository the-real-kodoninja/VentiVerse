import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC<{ toggleDarkMode: () => void; darkMode: boolean }> = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">VentiVerse</Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/feed">Feed</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/fandom">Fandom</Link>
          <Link to="/discussions">Discussions</Link>
          <Link to="/nft-market">NFT Market</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/events">Events</Link>
          <Link to="/store">Store</Link>
          <Link to="/defi">DeFi</Link>
          <Link to="/settings">Settings</Link>
        </div>
        <button onClick={toggleDarkMode} className="p-2">
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">VentiVerse</Link>
        <div>
          <Link to="/discussions" className="mx-2">Discussions</Link>
          <Link to="/nft-market" className="mx-2">NFT Market</Link>
          <Link to="/gallery" className="mx-2">Gallery</Link>
          <Link to="/events" className="mx-2">Events</Link>
          <Link to="/store" className="mx-2">Store</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
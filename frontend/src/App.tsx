import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Discussions from './pages/Discussions';
import NFTMarket from './pages/NFTMarket';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Store from './pages/Store';
import DeFi from './pages/DeFi';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Explore from './pages/Explore';
import Fandom from './pages/Fandom';
import Feed from './pages/Feed';

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  
    return (
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <Header toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
          <main className="pb-16 md:pb-0">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element={<Search />} />
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/fandom" element={<Fandom />} />
              <Route path="/discussions" element={<Discussions />} />
              <Route path="/nft-market" element={<NFTMarket />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/store" element={<Store />} />
              <Route path="/defi" element={<DeFi />} />
            </Routes>
          </main>
          <nav className="mobile-nav">
            <Link to="/feed" className="p-2 text-white">Feed</Link>
            <Link to="/explore" className="p-2 text-white">Explore</Link>
            <Link to="/fandom" className="p-2 text-white">Fandom</Link>
            <Link to="/search" className="p-2 text-white">Search</Link>
            <Link to="/settings" className="p-2 text-white">Settings</Link>
          </nav>
        </div>
      </Router>
    );
  };

export default App;
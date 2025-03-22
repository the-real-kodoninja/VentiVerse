import React from 'react';
import Profile from '../components/Profile';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to VentiVerse</h1>
      <Profile principal="aaaaa-aa" /> {/* Placeholder principal */}
    </div>
  );
};

export default Home;
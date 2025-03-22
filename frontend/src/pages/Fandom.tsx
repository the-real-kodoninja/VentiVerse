import React from 'react';
import Messaging from '../components/Messaging';

const Fandom: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fandom Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl">Community Chat</h2>
          <Messaging />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl">Fan Leaderboard</h2>
          <p>Top VTC earners coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Fandom;
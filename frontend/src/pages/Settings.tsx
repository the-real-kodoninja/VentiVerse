import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Settings: React.FC = () => {
  const { call } = useCanister('user');
  const [username, setUsername] = React.useState('');

  const handleSave = () => call('updateProfile', [username, null, null]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="p-2 border rounded w-full mb-2"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
    </div>
  );
};
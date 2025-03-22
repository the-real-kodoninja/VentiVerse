import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Settings: React.FC = () => {
  const { call } = useCanister('post');
  const [username, setUsername] = React.useState('');
  const [nsfwEnabled, setNsfwEnabled] = React.useState(false);
  const [blockUser, setBlockUser] = React.useState('');

  const handleSave = () => call('updateProfile', [username, null, null]);
  const handleBlock = () => call('blockUser', [Principal.fromText(blockUser)]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="p-2 border rounded w-full mb-2"
      />
      <label className="flex items-center mb-2">
        <input type="checkbox" checked={nsfwEnabled} onChange={() => setNsfwEnabled(!nsfwEnabled)} />
        <span className="ml-2">Show NSFW Content</span>
      </label>
      <input
        value={blockUser}
        onChange={(e) => setBlockUser(e.target.value)}
        placeholder="Block user (principal)"
        className="p-2 border rounded w-full mb-2"
      />
      <button onClick={handleBlock} className="bg-red-500 text-white p-2 rounded mb-2">Block</button>
      <button onClick={handleSave} className="bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded">
        Save
      </button>
    </div>
  );
};
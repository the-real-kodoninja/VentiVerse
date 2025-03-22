import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanister } from '../hooks/useCanister';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { call } = useCanister('user');

  const handleXLogin = async () => {
    // Placeholder X OAuth flow
    const xToken = 'mock-x-token'; // Replace with real X API call
    await call('updateProfile', [`@${xToken}-user`, null, null]); // Sync X username
    navigate('/feed');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Login to VentiVerse</h1>
      <button onClick={handleXLogin} className="bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded">
        Login with X
      </button>
    </div>
  );
};

export default Login;
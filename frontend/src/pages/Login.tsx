import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleXLogin = () => {
    // Simulate X OAuth redirect (replace with real X API integration)
    window.location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token=placeholder';
    // On callback, sync with Internet Identity and redirect
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Login to VentiVerse</h1>
      <button onClick={handleXLogin} className="bg-blue-500 text-white p-2 rounded">
        Login with X
      </button>
    </div>
  );
};

export default Login;
import React from 'react';
import { useCanister } from '../hooks/useCanister';

const DeFiPanel: React.FC = () => {
  const { call } = useCanister('defi');

  const handleStake = () => call('stake', [100]); // Stake 100 VTC
  const handleLend = () => call('lend', [50]);   // Lend 50 VTC

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2>DeFi Hub</h2>
      <button onClick={handleStake} className="m-2 bg-green-500 text-white p-2 rounded">Stake VTC</button>
      <button onClick={handleLend} className="m-2 bg-blue-500 text-white p-2 rounded">Lend VTC</button>
    </div>
  );
};

export default DeFiPanel;
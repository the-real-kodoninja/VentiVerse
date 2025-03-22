import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Wallet: React.FC = () => {
  const { call } = useCanister('venticoin');
  const [balance, setBalance] = React.useState(0);
  const [to, setTo] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  React.useEffect(() => {
    call('balanceOf', [/* user principal */]).then(setBalance);
  }, [call]);

  const handleDonate = () => call('donateVTC', [Principal.fromText(to), amount]);
  const handleGift = () => call('giftVTC', [Principal.fromText(to), amount]);
  const handleMint = () => call('mintVTC', [amount]); // Admin only

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2>VentiCoin: {balance} VTC</h2>
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Recipient Principal"
        className="w-full p-2 border rounded mt-2"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className="w-full p-2 border rounded mt-2"
      />
      <div className="flex space-x-2 mt-2">
        <button onClick={handleDonate} className="bg-green-500 text-white p-2 rounded">Donate</button>
        <button onClick={handleGift} className="bg-blue-500 text-white p-2 rounded">Gift</button>
        <button onClick={handleMint} className="bg-purple-500 text-white p-2 rounded">Mint (Admin)</button>
      </div>
    </div>
  );
};

export default Wallet;
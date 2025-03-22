import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Wallet: React.FC = () => {
  const { call } = useCanister('venticoin');
  const [balance, setBalance] = React.useState<number>(0);

  React.useEffect(() => {
    call('balanceOf', [/* user principal */]).then(setBalance);
  }, [call]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2>VentiCoin Balance: {balance} VTC</h2>
      <button className="mt-2 bg-blue-500 text-white p-2 rounded">Transfer</button>
    </div>
  );
};

export default Wallet;
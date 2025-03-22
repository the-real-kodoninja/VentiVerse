import React from 'react';
import { useCanister } from '../hooks/useCanister';

const StoreItem: React.FC<{ item: any }> = ({ item }) => {
  const { call } = useCanister('store');

  const handleBuy = () => call('buyItem', [item.id]);

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3>{item.name}</h3>
      <p>Price: {item.price} ICP</p>
      <p>Stock: {item.stock}</p>
      <button onClick={handleBuy} className="mt-2 bg-green-500 text-white p-2 rounded">Buy</button>
    </div>
  );
};

export default StoreItem;
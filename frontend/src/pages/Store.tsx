import React from 'react';
import StoreItem from '../components/StoreItem';
import { useCanister } from '../hooks/useCanister';

const Store: React.FC = () => {
  const { call } = useCanister('store');
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Fetch all items (simplified)
    const fetchItems = async () => {
      const itemList = [];
      for (let i = 0; i < 10; i++) {
        const item = await call('getItem', [i]); // Assume getItem exists
        if (item) itemList.push(item);
      }
      setItems(itemList);
    };
    fetchItems();
  }, [call]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Merchandise Store</h1>
      {items.map((item) => <StoreItem key={item.id} item={item} />)}
    </div>
  );
};

export default Store;
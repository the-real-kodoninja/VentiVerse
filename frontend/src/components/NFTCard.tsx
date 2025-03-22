import React from 'react';
import { useCanister } from '../hooks/useCanister';

const NFTCard: React.FC<{ nft: any }> = ({ nft }) => {
  const { call } = useCanister('nft');

  const handleRemix = () => {
    const metadata = prompt('Enter new metadata for derivative NFT:');
    if (metadata) call('mintDerivative', [nft.id, metadata]);
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3>NFT #{nft.id}</h3>
      <p>{nft.metadata}</p>
      <p>Owner: {nft.owner.toString()}</p>
      {nft.isVentiMinted && <button onClick={handleRemix} className="mt-2 bg-blue-500 text-white p-2 rounded">Remix</button>}
    </div>
  );
};

export default NFTCard;
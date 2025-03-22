import React from 'react';
import NFTCard from '../components/NFTCard';
import { useCanister } from '../hooks/useCanister';

const NFTMarket: React.FC = () => {
  const { call } = useCanister('nft');
  const [nfts, setNfts] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Fetch all NFTs (simplified; real app would paginate)
    const fetchNfts = async () => {
      const nftList = [];
      for (let i = 0; i < 10; i++) {
        const nft = await call('getNFT', [i]);
        if (nft) nftList.push(nft);
      }
      setNfts(nftList);
    };
    fetchNfts();
  }, [call]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NFT Market</h1>
      {nfts.map((nft) => <NFTCard key={nft.id} nft={nft} />)}
    </div>
  );
};

export default NFTMarket;
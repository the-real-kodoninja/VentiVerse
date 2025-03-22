import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const NFTMarket: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call } = useCanister('nft');
  const [nfts, setNfts] = useState<any[]>([]);
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  useEffect(() => {
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>NFT Market</Text>
      <FlatList
        data={nfts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.accent1 }]}>
            <Text style={{ color: theme.text }}>NFT #{item.id}</Text>
            <Text style={{ color: theme.text }}>{item.metadata}</Text>
            <Text style={{ color: theme.accent2 }}>Owner: {item.owner.toString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 16, borderWidth: 1, borderRadius: 8, marginBottom: 8 },
});

export default NFTMarket;
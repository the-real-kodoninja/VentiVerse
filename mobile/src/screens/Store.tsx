import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const Store: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call } = useCanister('store');
  const [items, setItems] = useState<any[]>([]);
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  useEffect(() => {
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Merchandise Store</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.accent1 }]}>
            <Text style={{ color: theme.text }}>{item.name}</Text>
            <Text style={{ color: theme.accent2 }}>Price: {item.price} VTC</Text>
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

export default Store;
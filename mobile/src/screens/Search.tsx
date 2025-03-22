import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import PostCard from '../components/PostCard';
import { autumnTheme } from '../styles/theme';

const Search: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call } = useCanister('post');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  const handleSearch = async () => {
    const posts = await call('getPosts', ['General']);
    setResults(posts.filter((p: any) => p.content.includes(query)));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Search VentiVerse</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search posts..."
        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
      />
      <TouchableOpacity onPress={handleSearch} style={[styles.button, { backgroundColor: theme.accent1 }]}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} darkMode={darkMode} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Search;
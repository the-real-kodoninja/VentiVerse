import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import PostCard from '../components/PostCard';
import { autumnTheme } from '../styles/theme';

const Feed: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call } = useCanister('post');
  const [posts, setPosts] = useState<any[]>([]);
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  useEffect(() => {
    call('getPosts', ['General']).then(setPosts);
  }, [call]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Your Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} darkMode={darkMode} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
});

export default Feed;
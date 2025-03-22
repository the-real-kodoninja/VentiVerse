import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const PostCard: React.FC<{ post: any; darkMode: boolean }> = ({ post, darkMode }) => {
  const { call } = useCanister('post');
  const [liked, setLiked] = useState(false);
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  const handleLike = async () => {
    await call('likePost', [post.id]);
    setLiked(true);
  };

  const handleReport = () => call('reportPost', [post.id]);
  const handleHide = () => call('hidePost', [post.id]);

  return (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.accent1 }]}>
      <Text style={{ color: theme.text, fontSize: 16 }}>{post.content}</Text>
      {post.media && (
        post.media.isVideo ? (
          <Text style={{ color: theme.text }}>[Video Placeholder: {post.media.url}]</Text>
        ) : (
          <Image source={{ uri: post.media.url }} style={styles.media} />
        )
      )}
      <Text style={{ color: theme.accent2, fontSize: 12 }}>
        By: {post.author.toString()} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
        {post.isNSFW && ' (NSFW)'}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <Text style={{ color: liked ? '#A7333F' : theme.text }}>❤️ {post.likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReport} style={styles.actionButton}>
          <Text style={{ color: theme.text }}>🚨</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHide} style={styles.actionButton}>
          <Text style={{ color: theme.text }}>👁️</Text>
        </TouchableOpacity>
      </View>
      {post.isPremium && (
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent1 }]}>
          <Text style={styles.buttonText}>Unlock for {post.price} VTC</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1, borderRadius: 8, marginBottom: 8 },
  media: { width: '100%', height: 200, borderRadius: 8, marginVertical: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  actionButton: { padding: 8 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default PostCard;
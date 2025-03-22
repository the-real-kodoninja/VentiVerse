import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const Messaging: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call } = useCanister('post');
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [emoji, setEmoji] = useState<string | null>(null);
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  useEffect(() => {
    call('getMessages', [/* user principal */]).then(setMessages);
  }, [call]);

  const handleSend = async () => {
    await call('sendMessage', [/* recipient principal */, content, false, emoji]);
    setContent('');
    setEmoji(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: theme.text }}>
            {item.content} {item.emoji && item.emoji}
          </Text>
        )}
        style={styles.messageList}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Type a message..."
        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
      />
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setEmoji('😊')} style={styles.emojiButton}>
          <Text>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend} style={[styles.button, { backgroundColor: theme.accent1 }]}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  messageList: { flex: 1 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  emojiButton: { padding: 12 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Messaging;
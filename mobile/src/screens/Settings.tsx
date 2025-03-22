import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const Settings: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call } = useCanister('post');
  const [username, setUsername] = useState('');
  const [nsfwEnabled, setNsfwEnabled] = useState(false);
  const [blockUser, setBlockUser] = useState('');
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  const handleSave = () => call('updateProfile', [username, null, null]);
  const handleBlock = () => call('blockUser', [blockUser]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
      />
      <View style={styles.switchRow}>
        <Text style={{ color: theme.text }}>Show NSFW Content</Text>
        <Switch
          value={nsfwEnabled}
          onValueChange={setNsfwEnabled}
          trackColor={{ false: theme.accent2, true: theme.accent1 }}
        />
      </View>
      <TextInput
        value={blockUser}
        onChangeText={setBlockUser}
        placeholder="Block user (principal)"
        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
      />
      <TouchableOpacity onPress={handleBlock} style={[styles.button, { backgroundColor: '#A7333F' }]}>
        <Text style={styles.buttonText}>Block</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: theme.accent1 }]}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Settings;
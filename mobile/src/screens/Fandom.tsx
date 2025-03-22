import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Messaging from '../components/Messaging';
import { autumnTheme } from '../styles/theme';

const Fandom: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Fandom Hub</Text>
      <View style={styles.section}>
        <Text style={{ color: theme.text, fontSize: 18, marginBottom: 8 }}>Community Chat</Text>
        <Messaging darkMode={darkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  section: { padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8 },
});

export default Fandom;
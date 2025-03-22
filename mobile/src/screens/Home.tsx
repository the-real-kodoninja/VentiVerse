import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { autumnTheme } from '../styles/theme';

const Home: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome to VentiVerse</Text>
      <Text style={{ color: theme.text }}>Your decentralized hub for Brittany Venti fans!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default Home;
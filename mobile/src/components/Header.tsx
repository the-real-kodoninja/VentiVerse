import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { autumnTheme } from '../styles/theme';

const Header: React.FC<{ title: string; darkMode: boolean }> = ({ title, darkMode }) => {
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.accent1 }]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
});

export default Header;
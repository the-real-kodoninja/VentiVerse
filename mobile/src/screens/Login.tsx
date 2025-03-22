import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const Login: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const navigation = useNavigation();
  const { call } = useCanister('user');
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  const handleXLogin = async () => {
    const xToken = 'mock-x-token'; // Placeholder X OAuth
    await call('updateProfile', [`@${xToken}-user`, null, null]);
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Login to VentiVerse</Text>
      <TouchableOpacity onPress={handleXLogin} style={[styles.button, { backgroundColor: theme.accent1 }]}>
        <Text style={styles.buttonText}>Login with X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: { padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Login;
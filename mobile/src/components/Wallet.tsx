import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const Wallet: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const { call } = useCanister('venticoin');
  const [balance, setBalance] = useState(0);
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  useEffect(() => {
    call('balanceOf', [/* user principal */]).then((bal) => setBalance(bal || 0));
  }, [call]);

  const handleDonate = () => call('donateVTC', [to, parseInt(amount)]);
  const handleGift = () => call('giftVTC', [to, parseInt(amount)]);
  const handleMint = () => call('mintVTC', [parseInt(amount)]); // Admin only

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text, fontSize: 18 }}>VentiCoin: {balance} VTC</Text>
      <TextInput
        value={to}
        onChangeText={setTo}
        placeholder="Recipient Principal"
        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
      />
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
      />
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleDonate} style={[styles.button, { backgroundColor: '#34C759' }]}>
          <Text style={styles.buttonText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGift} style={[styles.button, { backgroundColor: theme.accent1 }]}>
          <Text style={styles.buttonText}>Gift</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMint} style={[styles.button, { backgroundColor: '#5856D6' }]}>
          <Text style={styles.buttonText}>Mint</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, borderRadius: 8 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginVertical: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { padding: 12, borderRadius: 8, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Wallet;
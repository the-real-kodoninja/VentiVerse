import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import Wallet from '../components/Wallet';
import { autumnTheme } from '../styles/theme';

const DeFi: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call: callDeFi } = useCanister('defi');
  const { call: callVentiCoin } = useCanister('venticoin');
  const [stakeAmount, setStakeAmount] = useState('');
  const [lendAmount, setLendAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState(0);
  const [lendingPool, setLendingPool] = useState(0);
  const [vtcBalance, setVtcBalance] = useState(0);

  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  useEffect(() => {
    const fetchData = async () => {
      const balance = await callVentiCoin('balanceOf', [/* user principal */]);
      setVtcBalance(balance || 0);
      setStakedBalance(0); // Placeholder
      setLendingPool(0);   // Placeholder
    };
    fetchData();
  }, [callVentiCoin]);

  const handleStake = async () => {
    const amount = parseInt(stakeAmount);
    if (amount > 0) {
      const success = await callDeFi('stake', [amount]);
      if (success) {
        setVtcBalance(vtcBalance - amount);
        setStakedBalance(stakedBalance + amount);
        setStakeAmount('');
      }
    }
  };

  const handleUnstake = async () => {
    const success = await callDeFi('unstake', []);
    if (success) {
      setStakedBalance(0);
      setVtcBalance(vtcBalance + stakedBalance);
    }
  };

  const handleLend = async () => {
    const amount = parseInt(lendAmount);
    if (amount > 0) {
      const success = await callDeFi('lend', [amount]);
      if (success) {
        setVtcBalance(vtcBalance - amount);
        setLendingPool(lendingPool + amount);
        setLendAmount('');
      }
    }
  };

  const handleBorrow = async () => {
    const amount = parseInt(borrowAmount);
    if (amount > 0 && amount <= lendingPool) {
      const success = await callDeFi('borrow', [amount]);
      if (success) {
        setVtcBalance(vtcBalance + amount);
        setLendingPool(lendingPool - amount);
        setBorrowAmount('');
      }
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>DeFi Hub</Text>

      {/* Wallet */}
      <View style={styles.section}>
        <Wallet />
      </View>

      {/* Staking */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Stake VentiCoin</Text>
        <Text style={{ color: theme.text }}>Staked: {stakedBalance} VTC</Text>
        <TextInput
          value={stakeAmount}
          onChangeText={setStakeAmount}
          placeholder="Amount to stake"
          keyboardType="numeric"
          style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleStake} style={[styles.button, { backgroundColor: theme.accent1 }]}>
            <Text style={styles.buttonText}>Stake</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUnstake} style={[styles.button, { backgroundColor: theme.accent2 }]}>
            <Text style={styles.buttonText}>Unstake</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lending */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Lend VentiCoin</Text>
        <Text style={{ color: theme.text }}>Pool: {lendingPool} VTC</Text>
        <TextInput
          value={lendAmount}
          onChangeText={setLendAmount}
          placeholder="Amount to lend"
          keyboardType="numeric"
          style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
        />
        <TouchableOpacity onPress={handleLend} style={[styles.button, { backgroundColor: theme.accent1 }]}>
          <Text style={styles.buttonText}>Lend</Text>
        </TouchableOpacity>
      </View>

      {/* Borrowing */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Borrow VentiCoin</Text>
        <Text style={{ color: theme.text }}>Available: {lendingPool} VTC</Text>
        <TextInput
          value={borrowAmount}
          onChangeText={setBorrowAmount}
          placeholder="Amount to borrow"
          keyboardType="numeric"
          style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.accent1 }]}
        />
        <TouchableOpacity onPress={handleBorrow} style={[styles.button, { backgroundColor: theme.accent2 }]}>
          <Text style={styles.buttonText}>Borrow</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  section: { padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginVertical: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { padding: 12, borderRadius: 8, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default DeFi;
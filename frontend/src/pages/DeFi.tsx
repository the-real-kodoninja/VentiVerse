import React, { useState, useEffect } from 'react';
import { useCanister } from '../hooks/useCanister';
import Wallet from '../components/Wallet';

const DeFi: React.FC = () => {
  const { call: callDeFi } = useCanister('defi');
  const { call: callVentiCoin } = useCanister('venticoin');
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [lendAmount, setLendAmount] = useState<number>(0);
  const [borrowAmount, setBorrowAmount] = useState<number>(0);
  const [stakedBalance, setStakedBalance] = useState<number>(0);
  const [lendingPool, setLendingPool] = useState<number>(0);
  const [vtcBalance, setVtcBalance] = useState<number>(0);

  // Fetch user balance and pool data on mount
  useEffect(() => {
    const fetchData = async () => {
      const balance = await callVentiCoin('balanceOf', [/* user principal, e.g., from auth */]);
      setVtcBalance(balance || 0);

      // Placeholder: Fetch staked balance and lending pool (extend DeFi.mo with queries if needed)
      setStakedBalance(0); // Replace with real query
      setLendingPool(0);   // Replace with real query
    };
    fetchData();
  }, [callVentiCoin]);

  // Handle staking VTC
  const handleStake = async () => {
    if (stakeAmount > 0) {
      const success = await callDeFi('stake', [stakeAmount]);
      if (success) {
        setVtcBalance(vtcBalance - stakeAmount);
        setStakedBalance(stakedBalance + stakeAmount);
        setStakeAmount(0);
      }
    }
  };

  // Handle unstaking VTC
  const handleUnstake = async () => {
    const success = await callDeFi('unstake', []);
    if (success) {
      // Assume unstake returns total amount with rewards
      setStakedBalance(0);
      setVtcBalance(vtcBalance + stakedBalance); // Simplified; adjust with real reward calc
    }
  };

  // Handle lending VTC
  const handleLend = async () => {
    if (lendAmount > 0) {
      const success = await callDeFi('lend', [lendAmount]);
      if (success) {
        setVtcBalance(vtcBalance - lendAmount);
        setLendingPool(lendingPool + lendAmount);
        setLendAmount(0);
      }
    }
  };

  // Handle borrowing VTC
  const handleBorrow = async () => {
    if (borrowAmount > 0 && borrowAmount <= lendingPool) {
      const success = await callDeFi('borrow', [borrowAmount]);
      if (success) {
        setVtcBalance(vtcBalance + borrowAmount);
        setLendingPool(lendingPool - borrowAmount);
        setBorrowAmount(0);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 text-[var(--light-text)] dark:text-[var(--dark-text)]">
        DeFi Hub
      </h1>

      {/* Wallet Overview */}
      <div className="mb-6">
        <Wallet /> {/* Reuses Wallet.tsx for VTC balance and transactions */}
      </div>

      {/* Staking Section */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4">Stake VentiCoin</h2>
        <p className="text-sm mb-2">Staked: {stakedBalance} VTC (1% daily yield)</p>
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          placeholder="Amount to stake"
          className="w-full p-2 border rounded mb-4 text-[var(--light-text)] dark:text-[var(--dark-text)] bg-[var(--light-bg)] dark:bg-[var(--dark-bg)]"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleStake}
            className="bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Stake
          </button>
          <button
            onClick={handleUnstake}
            className="bg-[var(--light-accent2)] dark:bg-[var(--dark-accent2)] text-white p-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Unstake
          </button>
        </div>
      </section>

      {/* Lending Section */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4">Lend VentiCoin</h2>
        <p className="text-sm mb-2">Lending Pool: {lendingPool} VTC</p>
        <input
          type="number"
          value={lendAmount}
          onChange={(e) => setLendAmount(Number(e.target.value))}
          placeholder="Amount to lend"
          className="w-full p-2 border rounded mb-4 text-[var(--light-text)] dark:text-[var(--dark-text)] bg-[var(--light-bg)] dark:bg-[var(--dark-bg)]"
        />
        <button
          onClick={handleLend}
          className="bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded hover:bg-opacity-90 transition-colors"
        >
          Lend
        </button>
      </section>

      {/* Borrowing Section */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4">Borrow VentiCoin</h2>
        <p className="text-sm mb-2">Available: {lendingPool} VTC</p>
        <input
          type="number"
          value={borrowAmount}
          onChange={(e) => setBorrowAmount(Number(e.target.value))}
          placeholder="Amount to borrow"
          className="w-full p-2 border rounded mb-4 text-[var(--light-text)] dark:text-[var(--dark-text)] bg-[var(--light-bg)] dark:bg-[var(--dark-bg)]"
        />
        <button
          onClick={handleBorrow}
          className="bg-[var(--light-accent2)] dark:bg-[var(--dark-accent2)] text-white p-2 rounded hover:bg-opacity-90 transition-colors"
        >
          Borrow
        </button>
      </section>

      {/* Trading Placeholder */}
      <section className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4">Trade VentiCoin (Coming Soon)</h2>
        <p className="text-sm">Swap VTC with ICP or other tokens on our upcoming DEX.</p>
      </section>
    </div>
  );
};

export default DeFi;
actor DeFi {
  type Stake = { user: Principal; amount: Nat; startTime: Time.Time };
  var stakes = HashMap.HashMap<Principal, Stake>(0, Principal.equal, Principal.hash);
  var lendingPool: Nat = 0;

  public shared(msg) func stake(amount: Nat) : async Bool {
    let success = await VentiCoin.transfer(Principal.fromText("stake-canister-id"), amount);
    if (success) {
      stakes.put(msg.caller, { user = msg.caller; amount; startTime = Time.now() });
      true
    } else { false }
  };

  public shared(msg) func unstake() : async Bool {
    switch (stakes.get(msg.caller)) {
      case (?stake) {
        let reward = (Time.now() - stake.startTime) / 1000000 * stake.amount / 100; // 1% daily yield
        await VentiCoin.mint(msg.caller, stake.amount + reward);
        stakes.delete(msg.caller);
        true
      };
      case null { false };
    }
  };

  public shared(msg) func lend(amount: Nat) : async Bool {
    let success = await VentiCoin.transfer(Principal.fromText("defi-canister-id"), amount);
    if (success) { lendingPool += amount; true } else { false }
  };

  public shared(msg) func borrow(amount: Nat) : async Bool {
    if (lendingPool >= amount) {
      await VentiCoin.mint(msg.caller, amount);
      lendingPool -= amount;
      true
    } else { false }
  };
};
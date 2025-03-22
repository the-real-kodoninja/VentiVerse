import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

actor VentiCoin {
  type Balance = Nat;
  var balances = HashMap.HashMap<Principal, Balance>(0, Principal.equal, Principal.hash);
  var totalSupply: Nat = 1000000; // Initial supply: 1M VTC

  public shared(msg) func mint(to: Principal, amount: Nat) : async Bool {
    let current = switch (balances.get(to)) { case (?b) b; case null 0; };
    balances.put(to, current + amount);
    true
  };

  public shared(msg) func transfer(to: Principal, amount: Nat) : async Bool {
    let senderBalance = switch (balances.get(msg.caller)) { case (?b) b; case null 0; };
    if (senderBalance < amount) return false;
    balances.put(msg.caller, senderBalance - amount);
    let receiverBalance = switch (balances.get(to)) { case (?b) b; case null 0; };
    balances.put(to, receiverBalance + amount);
    true
  };

  public query func balanceOf(user: Principal) : async Balance {
    switch (balances.get(user)) { case (?b) b; case null 0; }
  };
};
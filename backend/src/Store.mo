import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";

actor Store {
  type Item = { id: Nat; name: Text; price: Nat; stock: Nat };
  var items = HashMap.HashMap<Nat, Item>(0, Nat.equal, Nat.hash);

  public shared func addItem(name: Text, price: Nat, stock: Nat) : async Nat {
    let id = items.size();
    items.put(id, { id; name; price; stock });
    id
  };

  public shared(msg) func buyItem(id: Nat) : async Bool {
    switch (items.get(id)) {
      case (?item) {
        if (item.stock > 0) {
          items.put(id, { id; name = item.name; price = item.price; stock = item.stock - 1 });
          true // Placeholder for ICP payment
        } else { false }
      };
      case null { false };
    }
  };
};
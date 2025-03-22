import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

actor NFT {
  type NFT = { id: Nat; owner: Principal; metadata: Text; isVentiMinted: Bool };
  var nfts = HashMap.HashMap<Nat, NFT>(0, Nat.equal, Nat.hash);
  let ventiPrincipal = Principal.fromText("aaaaa-aa"); // Placeholder for Brittany’s principal

  public shared(msg) func mintVentiNFT(metadata: Text) : async ?Nat {
    if (msg.caller != ventiPrincipal) return null;
    let id = nfts.size();
    nfts.put(id, { id; owner = ventiPrincipal; metadata; isVentiMinted = true });
    ?id
  };

  public shared(msg) func mintDerivative(originalId: Nat, metadata: Text) : async ?Nat {
    switch (nfts.get(originalId)) {
      case (?original) {
        if (not original.isVentiMinted) return null;
        let id = nfts.size();
        nfts.put(id, { id; owner = msg.caller; metadata; isVentiMinted = false });
        ?id
      };
      case null { null };
    }
  };

  public query func getNFT(id: Nat) : async ?NFT {
    nfts.get(id)
  };
};
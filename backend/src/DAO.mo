actor DAO {
  type Proposal = { id: Nat; title: Text; votes: Nat };
  var proposals = HashMap.HashMap<Nat, Proposal>(0, Nat.equal, Nat.hash);

  public shared(msg) func submitProposal(title: Text) : async Nat {
    let balance = await VentiCoin.balanceOf(msg.caller);
    if (balance < 100) return 0; // Require 100 VTC to propose
    let id = proposals.size();
    proposals.put(id, { id; title; votes = 0 });
    id
  };

  public shared(msg) func vote(proposalId: Nat) : async Bool {
    switch (proposals.get(proposalId)) {
      case (?p) {
        let balance = await VentiCoin.balanceOf(msg.caller);
        proposals.put(proposalId, { id = p.id; title = p.title; votes = p.votes + balance });
        true
      };
      case null { false };
    }
  };
};
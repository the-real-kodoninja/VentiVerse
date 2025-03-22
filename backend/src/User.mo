import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor User {
  type Profile = { username: Text; bio: ?Text; avatar: ?Blob };
  var profiles = HashMap.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);

  public shared(msg) func updateProfile(username: Text, bio: ?Text, avatar: ?Blob) : async () {
    profiles.put(msg.caller, { username; bio; avatar });
  };

  public query func getProfile(user: Principal) : async ?Profile {
    profiles.get(user)
  };
};
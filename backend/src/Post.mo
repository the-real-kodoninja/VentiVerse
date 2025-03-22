import Vec "mo:base/Vector";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import VentiCoin "canister:venticoin";
import Nimbus "canister:nimbus";

actor Post {
  type Post = {
    id: Nat;
    author: Principal;
    content: Text;
    category: Text;
    timestamp: Time.Time;
    isPremium: Bool;
    price: Nat;
    likes: [Principal];
    media: ?{ url: Text; isVideo: Bool }; // Photo or video
    isHidden: Bool;
    isNSFW: Bool;
    reports: Nat;
  };

  type Comment = {
    id: Nat;
    postId: Nat;
    author: Principal;
    content: Text;
    timestamp: Time.Time;
    emoji: ?Text; // Emoji or GIF URL
  };

  type Message = {
    id: Nat;
    sender: Principal;
    recipient: Principal;
    content: Text;
    timestamp: Time.Time;
    isPriority: Bool;
    emoji: ?Text;
  };

  var posts = Vec.Vector<Post>();
  var comments = Vec.Vector<Comment>();
  var messages = Vec.Vector<Message>();
  var blockedUsers = HashMap.HashMap<Principal, [Principal]>(0, Principal.equal, Principal.hash);
  var verifiedUsers = HashMap.HashMap<Principal, Bool>(0, Principal.equal, Principal.hash);
  var nextPostId: Nat = 0;
  var nextCommentId: Nat = 0;
  var nextMessageId: Nat = 0;

  let adminPrincipal = Principal.fromText("aaaaa-aa"); // Placeholder admin

  // --- Post Functions ---

  public shared(msg) func createPost(content: Text, category: Text, isPremium: Bool, price: Nat, mediaUrl: ?Text, isVideo: Bool, isNSFW: Bool) : async Nat {
    let id = nextPostId;
    posts.add({
      id; author = msg.caller; content; category; timestamp = Time.now(); isPremium; price;
      likes = []; media = ?{ url = switch mediaUrl { case (?url) url; case null "" }; isVideo };
      isHidden = false; isNSFW; reports = 0
    });
    nextPostId += 1;
    await VentiCoin.mint(msg.caller, 10);
    id
  };

  public shared(msg) func createAIPost(category: Text) : async Nat {
    let response = await http_request("https://api.huggingface.co/models/gpt2", "POST", category); // Placeholder NLP call
    let id = nextPostId;
    posts.add({
      id; author = msg.caller; content = response; category; timestamp = Time.now();
      isPremium = false; price = 0; likes = []; media = null; isHidden = false; isNSFW = false; reports = 0
    });
    nextPostId += 1;
    await VentiCoin.mint(msg.caller, 15);
    id
  };

  public shared(msg) func likePost(id: Nat) : async Bool {
    switch (Vec.get(posts, id)) {
      case (?post) {
        if (Vec.contains(post.likes, msg.caller, Principal.equal)) return false;
        let updatedLikes = Vec.append(post.likes, Vec.fromArray([msg.caller]));
        posts.put(id, { post with likes = updatedLikes });
        await VentiCoin.mint(post.author, 2); // 2 VTC per like
        true
      };
      case null { false };
    }
  };

  public shared(msg) func reportPost(id: Nat) : async Bool {
    switch (Vec.get(posts, id)) {
      case (?post) {
        posts.put(id, { post with reports = post.reports + 1 });
        if (post.reports >= 5 and msg.caller == adminPrincipal) {
          posts.put(id, { post with isHidden = true });
        };
        true
      };
      case null { false };
    }
  };

  public shared(msg) func hidePost(id: Nat) : async Bool {
    switch (Vec.get(posts, id)) {
      case (?post) {
        if (msg.caller == post.author or msg.caller == adminPrincipal) {
          posts.put(id, { post with isHidden = true });
          true
        } else { false }
      };
      case null { false };
    }
  };

  public query func getPosts(category: Text) : async [Post] {
    Vec.toArray(Vec.filter(posts, func (p: Post) : Bool { p.category == category and not p.isHidden }))
  };

  public query func getUserFeed(user: Principal) : async [Post] {
    Vec.toArray(Vec.filter(posts, func (p: Post) : Bool { p.author == user and not p.isHidden }))
  };

  public query func getLikes(id: Nat) : async [Principal] {
    switch (Vec.get(posts, id)) { case (?post) post.likes; case null [] }
  };

  // --- Comment Functions ---

  public shared(msg) func addComment(postId: Nat, content: Text, emoji: ?Text) : async Nat {
    let id = nextCommentId;
    comments.add({ id; postId; author = msg.caller; content; timestamp = Time.now(); emoji });
    nextCommentId += 1;
    await VentiCoin.mint(msg.caller, 5);
    id
  };

  // --- Messaging Functions ---

  public shared(msg) func sendMessage(recipient: Principal, content: Text, isPriority: Bool, emoji: ?Text) : async Nat {
    let blocked = switch (blockedUsers.get(recipient)) { case (?list) list; case null [] };
    if (Vec.contains(blocked, msg.caller, Principal.equal)) return 0;
    let id = nextMessageId;
    if (isPriority) await VentiCoin.transfer(recipient, 10);
    messages.add({ id; sender = msg.caller; recipient; content; timestamp = Time.now(); isPriority; emoji });
    nextMessageId += 1;
    id
  };

  public shared(msg) func blockUser(user: Principal) : async () {
    let current = switch (blockedUsers.get(msg.caller)) { case (?list) list; case null [] };
    blockedUsers.put(msg.caller, Vec.append(current, Vec.fromArray([user])));
  };

  // --- Admin & CMS ---

  public shared(msg) func verifyUser(user: Principal) : async Bool {
    if (msg.caller != adminPrincipal) return false;
    verifiedUsers.put(user, true);
    true
  };

  public query func isVerified(user: Principal) : async Bool {
    switch (verifiedUsers.get(user)) { case (?v) v; case null false }
  };

  // --- VTC Functions ---

  public shared(msg) func donateVTC(to: Principal, amount: Nat) : async Bool {
    await VentiCoin.transfer(to, amount)
  };

  public shared(msg) func giftVTC(to: Principal, amount: Nat) : async Bool {
    await VentiCoin.transfer(to, amount)
  };

  public shared(msg) func mintVTC(amount: Nat) : async Bool {
    if (msg.caller != adminPrincipal) return false;
    await VentiCoin.mint(msg.caller, amount)
  };

  // Placeholder HTTP outcall (requires IC canister upgrade)
  func http_request(url: Text, method: Text, body: Text) : async Text {
    "AI-generated content" // Replace with real outcall
  };
};
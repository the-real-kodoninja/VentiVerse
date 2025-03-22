import Vec "mo:base/Vector";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import VentiCoin "canister:venticoin";
import Nimbus "canister:nimbus";

actor Post {
  // Post structure with premium content
  type Post = {
    id: Nat;
    author: Principal;
    content: Text;
    category: Text;
    timestamp: Time.Time;
    isPremium: Bool;
    price: Nat; // VTC cost to unlock
  };

  // Comment structure
  type Comment = {
    id: Nat;
    postId: Nat;
    author: Principal;
    content: Text;
    timestamp: Time.Time;
  };

  // Message structure
  type Message = {
    id: Nat;
    sender: Principal;
    recipient: Principal;
    content: Text;
    timestamp: Time.Time;
    isPriority: Bool; // Priority messages cost VTC
  };

  // Storage
  var posts = Vec.Vector<Post>();
  var comments = Vec.Vector<Comment>();
  var messages = Vec.Vector<Message>();
  var nextPostId: Nat = 0;
  var nextCommentId: Nat = 0;
  var nextMessageId: Nat = 0;

  // --- Post Functions ---

  // Create a standard or premium post
  public shared(msg) func createPost(content: Text, category: Text, isPremium: Bool, price: Nat) : async Nat {
    let id = nextPostId;
    posts.add({
      id;
      author = msg.caller;
      content;
      category;
      timestamp = Time.now();
      isPremium;
      price
    });
    nextPostId += 1;
    await VentiCoin.mint(msg.caller, 10); // Reward 10 VTC for posting
    id
  };

  // AI-generated post by Nimbus.ai
  public shared(msg) func createAIPost(category: Text) : async Nat {
    let aiContent = await Nimbus.analyzePost(category # " trending topic"); // Simulated AI call
    let id = nextPostId;
    posts.add({
      id;
      author = msg.caller;
      content = "Nimbus.ai: " # aiContent;
      category;
      timestamp = Time.now();
      isPremium = false;
      price = 0
    });
    nextPostId += 1;
    await VentiCoin.mint(msg.caller, 15); // Bonus 15 VTC for AI collaboration
    id
  };

  // Unlock premium post
  public shared(msg) func unlockPost(id: Nat) : async Bool {
    switch (Vec.get(posts, id)) {
      case (?post) {
        if (post.isPremium) {
          let success = await VentiCoin.transfer(post.author, post.price);
          if (success) { true } else { false }
        } else { true }
      };
      case null { false };
    }
  };

  // Query posts by category
  public query func getPosts(category: Text) : async [Post] {
    Vec.toArray(Vec.filter(posts, func (p: Post) : Bool { p.category == category }))
  };

  // --- Comment Functions ---

  public shared(msg) func addComment(postId: Nat, content: Text) : async Nat {
    let id = nextCommentId;
    comments.add({
      id;
      postId;
      author = msg.caller;
      content;
      timestamp = Time.now()
    });
    nextCommentId += 1;
    await VentiCoin.mint(msg.caller, 5); // 5 VTC for commenting
    // AI-suggested comment reward
    let aiSuggestion = await Nimbus.analyzePost(content);
    if (Text.contains(aiSuggestion, "Great insight")) {
      await VentiCoin.mint(msg.caller, 2); // Bonus 2 VTC for quality
    };
    id
  };

  public query func getComments(postId: Nat) : async [Comment] {
    Vec.toArray(Vec.filter(comments, func (c: Comment) : Bool { c.postId == postId }))
  };

  // --- Messaging Functions ---

  public shared(msg) func sendMessage(recipient: Principal, content: Text, isPriority: Bool) : async Nat {
    let id = nextMessageId;
    if (isPriority) {
      let success = await VentiCoin.transfer(recipient, 10); // 10 VTC for priority
      if (not success) return 0;
    };
    messages.add({
      id;
      sender = msg.caller;
      recipient;
      content;
      timestamp = Time.now();
      isPriority
    });
    nextMessageId += 1;
    id
  };

  // AI-assisted message drafting
  public shared(msg) func sendAIMessage(recipient: Principal, topic: Text) : async Nat {
    let aiContent = await Nimbus.postChat("Draft a message about " # topic);
    let id = nextMessageId;
    messages.add({
      id;
      sender = msg.caller;
      recipient;
      content = aiContent;
      timestamp = Time.now();
      isPriority = false
    });
    nextMessageId += 1;
    id
  };

  public query func getMessages(recipient: Principal) : async [Message] {
    Vec.toArray(Vec.filter(messages, func (m: Message) : Bool { m.recipient == recipient }))
  };

  // --- Helper Functions ---

  // Simulate AI moderation (basic)
  public shared func moderateContent(content: Text) : async Bool {
    let analysis = await Nimbus.analyzePost(content);
    not Text.contains(analysis, "spam") and not Text.contains(analysis, "toxic")
  };
};
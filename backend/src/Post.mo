import Vec "mo:base/Vector";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor Post {
  type Post = { id: Nat; author: Principal; content: Text; category: Text; timestamp: Time.Time };
  var posts = Vec.Vector<Post>();

  public shared(msg) func createPost(content: Text, category: Text) : async Nat {
    let id = posts.size();
    posts.add({ id; author = msg.caller; content; category; timestamp = Time.now() });
    id
  };

  public query func getPosts(category: Text) : async [Post] {
    Vec.toArray(Vec.filter(posts, func (p: Post) : Bool { p.category == category }))
  };
};
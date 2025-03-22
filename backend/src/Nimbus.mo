import Vec "mo:base/Vector";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

actor Nimbus {
  type ChatMessage = { sender: Principal; content: Text; timestamp: Time.Time };
  var chats = Vec.Vector<ChatMessage>();

  public shared(msg) func postChat(content: Text) : async Text {
    chats.add({ sender = msg.caller; content; timestamp = Time.now() });
    "Nimbus.ai: Interesting take! Here’s a related thought: " # content // Simulated AI
  };

  public query func getChats() : async [ChatMessage] {
    Vec.toArray(chats)
  };

  public shared func analyzePost(content: Text) : async Text {
    if (Text.contains(content, "redpill")) { "Redpill Philosophy" }
    else if (Text.contains(content, "gaming")) { "Gaming Culture" }
    else { "General" }
  };
};
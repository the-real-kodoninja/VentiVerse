import Vec "mo:base/Vector";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor Event {
  type Event = { id: Nat; title: Text; time: Time.Time; organizer: Principal };
  var events = Vec.Vector<Event>();

  public shared(msg) func scheduleEvent(title: Text, time: Time.Time) : async Nat {
    let id = events.size();
    events.add({ id; title; time; organizer = msg.caller });
    id
  };

  public query func getEvents() : async [Event] {
    Vec.toArray(events)
  };
};
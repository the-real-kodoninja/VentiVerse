import React from 'react';
import EventCard from '../components/EventCard';
import { useCanister } from '../hooks/useCanister';

const Events: React.FC = () => {
  const { call } = useCanister('event');
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    call('getEvents', []).then(setEvents);
  }, [call]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Community Events</h1>
      {events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
};

export default Events;
import React from 'react';

const EventCard: React.FC<{ event: any }> = ({ event }) => {
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3>{event.title}</h3>
      <p>{new Date(Number(event.time) / 1000000).toLocaleString()}</p>
      <p>Organizer: {event.organizer.toString()}</p>
    </div>
  );
};

export default EventCard;
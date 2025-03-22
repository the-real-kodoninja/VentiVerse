import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Messaging: React.FC = () => {
  const { call } = useCanister('post');
  const [messages, setMessages] = React.useState<any[]>([]);
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    call('getMessages', [/* user principal */]).then(setMessages);
  }, [call]);

  const handleSend = () => {
    call('sendMessage', [/* recipient principal */, content, false]).then(() => setContent(''));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2>Messages</h2>
      {messages.map((msg) => (
        <p key={msg.id}>{msg.content} - {msg.sender.toString()}</p>
      ))}
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      <button onClick={handleSend} className="mt-2 bg-blue-500 text-white p-2 rounded">Send</button>
    </div>
  );
};

export default Messaging;
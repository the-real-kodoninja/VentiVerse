import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Messaging: React.FC = () => {
  const { call } = useCanister('post');
  const [messages, setMessages] = React.useState<any[]>([]);
  const [content, setContent] = React.useState('');
  const [emoji, setEmoji] = React.useState<string | null>(null);

  React.useEffect(() => {
    call('getMessages', [/* user principal */]).then(setMessages);
  }, [call]);

  const handleSend = async () => {
    await call('sendMessage', [/* recipient */, content, false, emoji]);
    setContent('');
    setEmoji(null);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="h-64 overflow-y-auto">
        {messages.map((msg) => (
          <p key={msg.id}>{msg.content} {msg.emoji && <span>{msg.emoji}</span>}</p>
        ))}
      </div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      <div className="flex space-x-2 mt-2">
        <button onClick={() => setEmoji('😊')} className="p-2">😊</button>
        <button onClick={() => setEmoji('https://example.com/gif')} className="p-2">GIF</button>
        <button onClick={handleSend} className="bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Messaging;
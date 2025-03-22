import React from 'react';
import { useCanister } from '../hooks/useCanister';

const NimbusChat: React.FC = () => {
  const { call } = useCanister('nimbus');
  const [messages, setMessages] = React.useState<any[]>([]);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    call('getChats', []).then(setMessages);
  }, [call]);

  const handleSend = async () => {
    const response = await call('postChat', [input]);
    setMessages([...messages, { content: input }, { content: response }]);
    setInput('');
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <p key={i}>{msg.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      <button onClick={handleSend} className="mt-2 bg-blue-500 text-white p-2 rounded">Send</button>
    </div>
  );
};

export default NimbusChat;
import { useState, useCallback } from 'react';
import { useSession } from '../../../contextos/SessionProvider';
import { useChat } from '../../../contextos/ChatProvider';
import ReactMarkdown from 'react-markdown';

export default function ChatComponent() {
  const { messages, loading, inventory } = useSession();
  const { sendMessage, sending, chatError } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      await sendMessage(input.trim());
      setInput('');
    },
    [input, sending, sendMessage]
  );

  if (loading) return <p className="p-4 text-gray-500">Loading session...</p>;

  return (
    <div className="flex flex-col h-[75vh] border rounded-lg shadow p-4 space-y-4 w-full max-w-3xl mx-auto mt-4 mb-6 px-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl break-words max-w-[85%] ${
              msg.role === 'user'
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-gray-200 text-black'
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {sending && (
          <div className="mr-auto bg-gray-100 text-gray-600 p-3 rounded-xl max-w-[85%] italic animate-pulse">
            Assistant is thinking...
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 items-stretch"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>

      {chatError && <p className="text-red-500 text-sm">{chatError}</p>}

      {/* Descomenta si quieres mostrar el inventario */}
      {/* 
      {inventory.length > 0 && (
        <div className="border rounded p-2 bg-yellow-100 text-sm">
          <p className="font-semibold">Inventory:</p>
          <ul className="list-disc list-inside">
            {inventory.map((item) => (
              <li key={item.id}>{item.item_name}</li>
            ))}
          </ul>
        </div>
      )} 
      */}
    </div>
  );
}

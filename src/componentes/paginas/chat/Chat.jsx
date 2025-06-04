import { useState, useCallback } from 'react';
import { useSession } from '../../../contextos/SessionProvider';
import { useChat } from '../../../contextos/ChatProvider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ReactMarkdown from 'react-markdown';

export default function ChatComponent() {
  const { messages, loading, inventory, room, deleteCurrentSession, completeSession } = useSession();
  const { sendMessage, sending, chatError } = useChat();
  const [input, setInput] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();
   const { t } = useTranslation("chat");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      await sendMessage(input.trim());
      setInput('');
    }, [input, sending, sendMessage]
  );

  const handleDeleteSession = async () => {
    await deleteCurrentSession();
    setShowConfirmDelete(false);
    navigate('/escape-rooms'); // Navigate back to room selection
  };

  const handleCompleteSession = async () => {
    await completeSession();
    navigate('/escape-rooms'); // Navigate back to room selection
  };

  if (loading) return <p className="p-4 text-gray-500">Loading session...</p>;

  return (
    <div className="flex flex-col h-[75vh] border rounded-lg shadow p-4 space-y-4 w-full max-w-3xl mx-auto mt-4 mb-6 px-4">
      {/* Session Controls Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold">{room?.room_name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/escape-rooms')}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 hover:text-black"
          >
            {t('backToRooms')}
          </button>
          <button
            onClick={handleCompleteSession}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          >
            {t('completeRoom')}
          </button>
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t('quitGame')}
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">{t('confirmDeleteTitle')}</h3>
            <p className="text-gray-600 mb-6">
              {t('confirmDeleteMessage')}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 border rounded hover:bg-gray-800 bg-gray-400"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDeleteSession}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t('quitGame')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-2 max-h-[60vh]">
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
            {t('assistantThinking')}
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
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          {t('sendButton')}
        </button>
      </form>

      {chatError && <p className="text-red-500 text-sm">{chatError}</p>}

      {/*Inventario */}
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
      )}*/}
    </div>
  );
};

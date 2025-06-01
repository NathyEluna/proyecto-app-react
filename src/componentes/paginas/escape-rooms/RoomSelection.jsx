import { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabase';
import { useSession } from '../../../contextos/SessionProvider';
import { useAuth } from '../../../contextos/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import imagenFondo from '../../../assets/img/Laberinto_pasillo.jpg';

const RoomSelection = () => {
  const { t } = useTranslation("roomSelection");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { startNewSession, session, room, deleteCurrentSession, hasActiveSession } = useSession();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showActiveSessionWarning, setShowActiveSessionWarning] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const loadRooms = async () => {
    const { data, error } = await supabase
      .from('escape_rooms')
      .select('*');

    if (error) {
      setRooms([]); // Set to empty array if there's an error
      setLoading(false);
      return;
    } else {
      setRooms(data);
    };

    setLoading(false);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleStart = async (roomId) => {
    // Check if user has an active session
    if (hasActiveSession()) {
      setSelectedRoomId(roomId);
      setShowActiveSessionWarning(true);
      return;
    }

    try {
      await startNewSession(roomId);
      navigate('/play');
    } catch (err) {
      console.error('Error starting room:', err);
    };
  };

  const handleContinueActiveSession = () => {
    navigate('/play');
  };

  const handleStartNewAfterDelete = async () => {
    await deleteCurrentSession();
    setShowActiveSessionWarning(false);

    if (selectedRoomId) {
      try {
        await startNewSession(selectedRoomId);
        navigate('/play');
      } catch (err) {
        console.error('Error starting new room:', err);
      }
    }
    setSelectedRoomId(null);
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div className="min-h-screen p-4 md:p-10 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${imagenFondo})` }}>
      <div className="w-full max-w-3xl backdrop-blur-sm bg-black/20 rounded-xl shadow-lg p-8 text-white">
        <h2>{t('title')}</h2>

        {/* Active Session Warning Modal */}
        {showActiveSessionWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg  max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">Active Session Found</h3>
              <p className="text-gray-600 mb-4">
                You have an active session in "{room?.room_name}". What would you like to do?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleContinueActiveSession}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Continue Current Session
                </button>
                <button
                  onClick={handleStartNewAfterDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Current & Start New
                </button>
                <button
                  onClick={() => {
                    setShowActiveSessionWarning(false);
                    setSelectedRoomId(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-800 bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Session Alert */}
        {hasActiveSession() && (
          <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-800">Active Session</p>
                <p className="text-blue-600">You have an ongoing session in "{room?.room_name}"</p>
              </div>
              <button
                onClick={handleContinueActiveSession}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        <ul>
          {rooms.map((room) => (
            <li key={room.id} className="my-4 p-4 border rounded-lg shadow-md w-sm mx-auto">
              <h3 className="text-2xl ">{room.room_name}</h3>
              <p className="text-slate-100">{room.intro_message}</p>
              {isAuthenticated ? (
                <button
                  onClick={() => handleStart(room.id)}
                  className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Start Room
                </button>
              ) : (
                <div className="text-center mt-4">
                  <p className='mb-3'>Please login to start this room</p>
                  <Link to="/login" className="border p-2 rounded-lg ">Login</Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomSelection;

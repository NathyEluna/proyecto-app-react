import { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabase';
import { useSession } from '../../../contextos/SessionProvider';
import { useNavigate } from 'react-router-dom';

const RoomSelection = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { startNewSession } = useSession();

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
    try {
      await startNewSession(roomId);
      navigate('/play');
    } catch (err) {
      console.error('Error starting room:', err);
    };
  };
  if (loading) return <p>Loading rooms...</p>;

  return (
    <div>
      <h2>Choose a Room</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="my-4 p-4 border rounded-lg shadow-md w-sm mx-auto">
            <h3 className="text-2xl ">{room.room_name}</h3>
            <button onClick={() => handleStart(room.id)}>Start Room</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomSelection;
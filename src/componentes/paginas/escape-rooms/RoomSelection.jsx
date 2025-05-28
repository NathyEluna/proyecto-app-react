import { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabase';
import { useSession } from '../../../contextos/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import imagenFondo from '../../../assets/img/Laberinto_pasillo.jpg';

const RoomSelection = () => {
  const { t } = useTranslation("roomSelection");
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
  if (loading) return <p>{t('loading')}</p>;

  return (
    <div className="min-h-screen p-4 md:p-10 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${imagenFondo})` }}>
      <div className="w-full max-w-3xl backdrop-blur-sm bg-black/20 rounded-xl shadow-lg p-8 text-white">
        <h2>{t('title')}</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id} className="my-4 p-4 border rounded-lg shadow-md w-sm mx-auto">
              <h3 className="text-2xl ">{room.room_name}</h3>
              <button onClick={() => handleStart(room.id)}>{t('buttomStart')}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoomSelection;
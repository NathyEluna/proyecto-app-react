import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase.js';
import { useAuth } from './AuthProvider.jsx';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const { user } = useAuth();
    const [session, setSession] = useState(null);      // room_sessions
    const [room, setRoom] = useState(null);            // escape_rooms
    const [messages, setMessages] = useState([]);      // chat_messages
    const [inventory, setInventory] = useState([]);    // inventory_items
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadSession = async () => {
        setLoading(true);
        setError('');

        try {
            // Load room session for current user
            const { data, error: sessionError } = await supabase
                .from('room_sessions')
                .select('*')
                .eq('user_id', user.id)
                .eq('completed', false)
                .order('last_active', { ascending: false })
                .limit(1);

            if (sessionError) throw sessionError;

            const sessionData = data?.[0];

            if (!sessionData) {
                // No active session found — reset state
                setSession(null);
                setRoom(null);
                setMessages([]);
                setInventory([]);
                setLoading(false);
                return;
            };

            setSession(sessionData);

            // Load room info
            const { data: roomData, error: roomError } = await supabase
                .from('escape_rooms')
                .select('*')
                .eq('id', sessionData.room_id)
                .single();
            if (roomError) throw roomError;
            setRoom(roomData);

            // Load chat messages
            const { data: chatData, error: chatError } = await supabase
                .from('chat_messages')
                .select('*')
                .eq('session_id', sessionData.id)
                .order('created_at', { ascending: true });
            if (chatError) throw chatError;

            // If no chat messages, insert intro message automatically
            if (chatData.length === 0 && roomData?.intro_message) {
                const { data: insertedIntro, error: insertError } = await supabase
                    .from('chat_messages')
                    .insert({
                        session_id: sessionData.id,
                        role: 'assistant',
                        content: roomData.intro_message,
                    })
                    .select('*')
                    .single();

                if (insertError) throw insertError;

                setMessages([insertedIntro]);
            } else {
                setMessages(chatData);
            }

            // Load inventory
            const { data: inventoryData, error: inventoryError } = await supabase
                .from('inventory_items')
                .select('*')
                .eq('session_id', sessionData.id)
                .order('found_at', { ascending: true });
            if (inventoryError) throw inventoryError;
            setInventory(inventoryData);

        } catch (err) {
            console.error('Failed to load session:', err);
            setError('Could not load session');
        }

        setLoading(false);
    };

    const startNewSession = async (roomId) => {
        try {
            const { data, error } = await supabase.from('room_sessions').insert({
                user_id: user.id,
                room_id: roomId,
                started_at: new Date(),
                last_active: new Date(),
                completed: false,
            }).select('*').single();

            if (error) throw error;

            setSession(data);
            setMessages([]);
            setInventory([]);

            const { data: roomData, error: roomError } = await supabase
                .from('escape_rooms')
                .select('*')
                .eq('id', roomId)
                .single();
            if (roomError) throw roomError;

            setRoom(roomData);

            // Insert intro message immediately for new session
            if (roomData?.intro_message) {
                const { data: insertedIntro, error: insertError } = await supabase
                    .from('chat_messages')
                    .insert({
                        session_id: data.id,
                        role: 'assistant',
                        content: roomData.intro_message,
                    })
                    .select('*')
                    .single();

                if (!insertError) {
                    setMessages([insertedIntro]);
                }
            }

        } catch (err) {
            console.error('Failed to start session:', err);
            setError('Could not start session');
        };
    };

    const completeSession = async () => {
        if (!session) return;

        try {
            const { error } = await supabase
                .from('room_sessions')
                .update({ completed: true })
                .eq('id', session.id);

            if (error) throw error;
            setSession((prev) => ({ ...prev, completed: true }));
        } catch (err) {
            console.error('Failed to complete session:', err);
            setError('Could not complete session');
        };
    };

    useEffect(() => {
        if (user) {
            loadSession();
        };
    }, [user]);

    const exportData = {
        session,
        room,
        messages,
        inventory,
        loading,
        error,
        loadSession,
        startNewSession,
        completeSession,
        setMessages,
        setInventory,
    };

    return (<SessionContext.Provider value={exportData}>{children}</SessionContext.Provider>);
};

export const useSession = () => useContext(SessionContext);
export default SessionProvider;

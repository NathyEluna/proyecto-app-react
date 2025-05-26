import { createContext, useContext, useState } from 'react';
import { supabase } from '../config/supabase.js';
import { useSession } from './SessionProvider.jsx';
import sendMessageToRoomSession from '../biblioteca/funciones.js';

export const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
    const { session, messages, setMessages } = useSession();
    const [sending, setSending] = useState(false);
    const [chatError, setChatError] = useState('');

    const sendMessage = async (userMessage) => {
        if (!session) return;

        setSending(true);
        setChatError('');

        try {
            // 1. Store user message
            const { data: insertedUserMessage, error: insertUserError } = await supabase
                .from('chat_messages')
                .insert({
                    session_id: session.id,
                    role: 'user',
                    content: userMessage,
                })
                .select('*')
                .single();

            if (insertUserError) throw insertUserError;

            setMessages(prev => [...prev, insertedUserMessage]);

            // 2. Call function to generate assistant reply
            const assistantResponse = await sendMessageToRoomSession(
                session.id,
                userMessage,
            );

            if (assistantResponse.error || !assistantResponse.response) {
                throw new Error(assistantResponse.error || 'No assistant response');
            }

            // 3. Store assistant reply
            const { data: insertedAssistantMessage, error: insertAssistantError } = await supabase
                .from('chat_messages')
                .insert({
                    session_id: session.id,
                    role: 'assistant',
                    content: assistantResponse.response,
                })
                .select('*')
                .single();

            if (insertAssistantError) throw insertAssistantError;
            setMessages(prev => [...prev, insertedAssistantMessage]);

            //setMessages((prev) => [...prev, insertedUserMessage, insertedAssistantMessage]);
        } catch (err) {
            setChatError('Failed to send message.');
        };

        setSending(false);
    };

    const exportData = {
        sendMessage,
        sending,
        chatError,
    };

    return (<ChatContext.Provider value={exportData}>{children}</ChatContext.Provider>);
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;

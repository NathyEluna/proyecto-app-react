import { OpenAI } from 'openai';
import { supabase } from '../config/supabase';

export async function sendMessageToRoomSession(sessionId, userMessage) {
  //openai is the OpenAI client used to interact with the GPT model.
  const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  try {
    const { data: sessionData, error: sessionError } = await supabase
      .from('room_sessions')
      .select('escape_rooms(system_prompt, intro_message), inventory_items(item_name)')
      .eq('id', sessionId)
      .single();

    if (sessionError || !sessionData) {
      return { error: 'Session not found' };
    };

    const systemPrompt = sessionData.escape_rooms?.system_prompt || '';
    const inventory = sessionData.inventory_items?.map((item) => item.item_name) || [];

    let { data: chatMessages, error: chatError } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (chatError || !chatMessages) chatMessages = [];

    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatMessages.map(({ role, content }) => ({ role, content })),
      ...(userMessage ? [{ role: 'user', content: userMessage }] : [])
    ];

    //Prune messages to fit within token limits.
    const maxTokens = 2800;
    let tokenEstimate = messages.reduce((sum, msg) => sum + Math.ceil(msg.content.length / 4), 0);
    while (tokenEstimate > maxTokens && messages.length > 3) {
      messages.splice(2, 1); // remove oldest user/assistant messages first
      tokenEstimate = messages.reduce((sum, msg) => sum + Math.ceil(msg.content.length / 4), 0);
    };

    //Send the full conversation context.
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: messages,
      max_tokens: 150,
    });

    const assistantReply = completion.choices[0].message.content.trim();

    /* //Save user and assistant messages.
    await supabase.from('chat_messages').insert([
      { session_id: sessionId, role: 'user', content: userMessage },
      { session_id: sessionId, role: 'assistant', content: assistantReply }
    ]); */

    //Detect items in assistant reply.
    const foundMatches = [...assistantReply.matchAll(/\[ITEM FOUND: (.*?)\]/gi)];
    const usedMatches = [...assistantReply.matchAll(/\[(ITEM USED|REMOVE ITEM): (.*?)\]/gi)];
    const foundItems = foundMatches.map((m) => m[1].trim());
    const usedItems = usedMatches.map((m) => m[2].trim());

    //Save items found in the reply to the inventory.
    for (const itemName of foundItems) {
      if (!inventory.includes(itemName)) {
        await supabase.from('inventory_items').insert({
          session_id: sessionId,
          item_name: itemName
        });
      };
    };

    //Remove used items from inventory.
    for (const itemName of usedItems) {
      await supabase
        .from('inventory_items')
        .delete()
        .eq('session_id', sessionId)
        .eq('item_name', itemName);
    };

    return { response: assistantReply };

  } catch (e) {
    console.error("Error in frontend GPT call:", e);
    return { error: e.message || 'Unexpected error' };
  };
};

export default sendMessageToRoomSession;
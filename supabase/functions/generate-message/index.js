import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { OpenAI } from 'https://deno.land/x/openai@v4.29.1/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173', // change to '*' only if not using custom headers like x-client-info
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    // Handle CORS preflight
    return new Response('OK', { headers: corsHeaders });
  };

  try {
    const { sessionId, userMessage } = await req.json();
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY')
    });

    // Fetch system prompt, intro, and inventory
    const { data: sessionData, error: sessionError } = await supabase
      .from('room_sessions')
      .select('escape_rooms(system_prompt, intro_message), inventory_items(item_name)')
      .eq('id', sessionId)
      .single();

    if (sessionError || !sessionData) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: corsHeaders
      });
    };

    const systemPrompt = sessionData.escape_rooms.system_prompt;
    const introMessage = sessionData.escape_rooms.intro_message;
    const inventory = sessionData.inventory_items.map((item) => item.item_name);

    // Fetch previous chat messages
    let { data: chatMessages, error: chatError } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (chatError || !chatMessages) chatMessages = [];

    const isFirstTime = chatMessages.length === 0;

    if (isFirstTime && introMessage) {
      await supabase.from('chat_messages').insert({
        session_id: sessionId,
        role: 'assistant',
        content: introMessage
      });

      if (!userMessage) {
        return new Response(JSON.stringify({ assistantReply: introMessage }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
        });
      };

      chatMessages.push({
        role: 'assistant',
        content: introMessage
      });
    };

    // Build OpenAI input
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatMessages.map(({ role, content }) => ({ role, content })),
      { role: 'user', content: userMessage }
    ];

    // Token pruning
    const maxTokens = 2800;
    let tokenEstimate = messages.reduce((sum, msg) => sum + Math.ceil(msg.content.length / 4), 0);
    while (tokenEstimate > maxTokens && messages.length > 3) {
      messages.splice(2, 1);
      tokenEstimate = messages.reduce((sum, msg) => sum + Math.ceil(msg.content.length / 4), 0);
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages,
      temperature: 0.7
    });

    const assistantReply = response.choices[0].message.content;

    await supabase.from('chat_messages').insert([
      { session_id: sessionId, role: 'user', content: userMessage },
      { session_id: sessionId, role: 'assistant', content: assistantReply }
    ]);

    // Inventory updates
    const foundMatches = [...assistantReply.matchAll(/\[ITEM FOUND: (.*?)\]/gi)];
    const usedMatches = [...assistantReply.matchAll(/\[(ITEM USED|REMOVE ITEM): (.*?)\]/gi)];
    const foundItems = foundMatches.map((m) => m[1].trim());
    const usedItems = usedMatches.map((m) => m[2].trim());

    for (const itemName of foundItems) {
      if (!inventory.includes(itemName)) {
        await supabase.from('inventory_items').insert({
          session_id: sessionId,
          item_name: itemName
        });
      };
    };

    for (const itemName of usedItems) {
      await supabase
        .from('inventory_items')
        .delete()
        .eq('session_id', sessionId)
        .eq('item_name', itemName);
    };

    return new Response(JSON.stringify({ assistantReply }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: 'Unexpected error', details: e.message }), {
      status: 500,
      headers: corsHeaders
    });
  };
});
# 🚀 MindEscape - Escape Room Adventure App

Welcome to **MindEscape**! This is a dynamic, AI-powered escape room adventure app built with **React**, **Vite**, and **Supabase**. Players engage in unique room adventures powered by OpenAI

---

## 🎯 Features

:white_check_mark: **Escape Room Adventures**  
- Engage in immersive, theme-based escape room sessions.  
- Chat-driven gameplay where the assistant guides you through the adventure.  

:white_check_mark: **Session Progression**  
- Each session is tracked and stored in Supabase for resuming at any time.

:white_check_mark: **Dynamic Theming**  
- System prompts and messages adapt to the chosen theme.

---

## :soon: Future Features

:x: **Inventory Management**  
- Discover items along the way.  
- Use and remove items to progress in the adventure.

:x: **Badge System**  
- Earn badges for your achievements and milestones.

:x: **Subscription System** 
- Different tiers, from free to anually.
- Promp limits for free tier.
- Full access to all rooms and unlimited promp count.

## 🏗️ Tech Stack

- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions, Realtime)  
- **AI Model:** OpenAI Chat Completions API (GPT-4.1-mini)

---

## 🚀 Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/<your-username>/mindescape.git
cd mindescape
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Environment Variables:
  Create a .env.local file in the root:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_OPENAI_API_KEY=<your-openai-api-key>
```

### 4. Start the development server:

```bash
npm run dev
```

---

## 🛠️ Key Notes

- Edge Function Bypass:
  Currently, the project bypasses Edge Functions and calls the OpenAI API directly from the frontend (funciones.js).
  Make sure your OpenAI API Key is secure and that you’re aware of usage and rate limits.

- Rate Limit / 429 Errors:
  If you see 429 Too Many Requests errors, your OpenAI API usage is exceeding quota.
  Consider adjusting your usage or moving the API calls to a secure Edge Function.

---

## 💡 Contributing
  PRs are welcome! If you’d like to contribute, fork the repo and submit a pull request.

---

## 📄 License

[AGPL](LICENSE)

---

## Repository Mantainer

- **Nathália C R** – [NathyEluna](https://github.com/NathyEluna)

---

## Main Contributor

- **Jessica A F** – [AlexaLop01](https://github.com/AlexaLop01)

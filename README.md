# 🧠 IQlympics

**IQlympics** is a competitive, real-time trivia game where players compete to prove their wits and reaction time. It’s a fast, fun, and fair battle of brains — inspired by the collaborative chaos of Reddit’s r/Place and the excitement of quiz shows.

---

## 🚀 Concept

IQlympics is designed as a lightweight, scalable web game where anyone can join trivia “rounds” that refresh periodically. Trivia questions are AI-generated using **Google Gemini** and cached in batches to reduce API costs and ensure smooth performance.

Each round contains a mix of topics and difficulty levels, and players compete for points based on accuracy and speed. The game focuses on accessibility, quick play, and organic community competition.

---

## 🧩 Current Features

✅ **AI-Generated Questions** — 100 trivia questions generated and stored at once, automatically refreshed when only a few remain.  
✅ **Multiple-Choice Format** — Each question includes 4 options and a single correct answer.  
✅ **Fast Refresh System** — Cached questions to reduce generation latency and API calls.  
✅ **Fair Play** — Answers validated in real-time, scoring based on correctness and speed.  
✅ **Simple UI** — Clean, responsive interface inspired by casual web trivia games.  
✅ **Lightweight Backend** — Built with Node.js and TypeScript, optimized for quick deployment and scalability.

---

## 🌟 Planned Features

🔹 **Leaderboard System** — Track global and session-based rankings.  
🔹 **Player Profiles** — Let players choose usernames and track their stats.  
🔹 **Timed Challenges** — Introduce “speed rounds” with faster question turnover.  
🔹 **Daily Trivia Streaks** — Encourage players to return daily for extra rewards.  
🔹 **Multiplayer Mode** — Real-time head-to-head matches or team trivia.  
🔹 **Topic Selection** — Players can choose trivia categories (e.g., Science, Movies, Geography).  
🔹 **Community Rounds** — Periodic global events where everyone answers the same set of questions at the same time.  

---

## ⚙️ Technical Overview

- **Frontend:** React / Next.js (planned), inspired by clean, competitive UI design.  
- **Backend:** Node.js + Express + TypeScript.  
- **AI Integration:** Google Gemini API for trivia generation with structured output.  
- **Database:** MongoDB / PostgreSQL (to be decided) for storing players, questions, and scores.  
- **Caching:** Local caching of trivia sets with automatic regeneration triggers.  

---

## 🧠 Example Question Structure

```json
{
  "question": "What is the capital city of Canada?",
  "options": ["Toronto", "Ottawa", "Vancouver", "Montreal"],
  "answer": "Ottawa",
  "difficulty": "Easy",
  "category": "Geography"
}
```

---

## 💡 Future Direction

IQlympics aims to be more than just a trivia app — it’s a social challenge space. The long-term goal is to evolve into a **seasonal trivia tournament platform**, with community events, badges, and evolving question pools.

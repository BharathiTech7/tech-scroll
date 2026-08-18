# TechScroll AI 🎯

> **Turn your scrolling into smarter learning.**
> An AI-powered Reel recommendation agent for technology students — built for hackathon demo.

---

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd server
# Add your API key to .env if using real AI (optional, works in mock mode by default)
npm run dev
```

Server runs at: `http://localhost:3001`

### 2. Start the Frontend

```bash
cd client
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 3. Open the App

Navigate to `http://localhost:5173` and click **⚡ Run AI Analysis**

---

## ⚙️ Environment Variables

### `server/.env`

| Variable | Values | Default | Description |
|----------|--------|---------|-------------|
| `AI_PROVIDER` | `gemini`, `openai`, `mock` | `mock` | LLM provider |
| `GEMINI_API_KEY` | string | — | [Get here](https://aistudio.google.com/app/apikey) |
| `OPENAI_API_KEY` | string | — | OpenAI key if using GPT |
| `PORT` | number | `3001` | Server port |
| `CORS_ORIGIN` | URL | `http://localhost:5173` | Frontend URL |

**No API key needed** — set `AI_PROVIDER=mock` and the demo works fully offline.

---

## 🏗️ Project Structure

```
hackathon/
├── server/                    # Node.js + Express backend
│   ├── src/
│   │   ├── agents/
│   │   │   ├── reelAnalyzer.js        # Agent 1: Semantic reel analysis
│   │   │   ├── interestInference.js   # Agent 2: Cross-reel interest inference
│   │   │   ├── recommendationEngine.js # Agent 3: Semantic recommendation
│   │   │   └── qualityValidator.js    # Agent 4: Anti-hype filter
│   │   ├── services/
│   │   │   ├── aiService.js           # LLM abstraction (Gemini/OpenAI/Mock)
│   │   │   └── mockResponses.js       # Offline fallback responses
│   │   ├── data/
│   │   │   └── sampleReels.js         # 12 demo reel objects
│   │   ├── routes/api.js              # REST endpoints
│   │   └── index.js                   # Express server
│   ├── .env                           # Environment config
│   └── package.json
│
└── client/                    # React + Vite + Tailwind frontend
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx             # App header + Run Analysis button
    │   │   ├── ReelCard.jsx           # Individual reel display card
    │   │   ├── InterestCard.jsx       # Interest with score visualization
    │   │   ├── RecommendationCard.jsx # Full recommendation display
    │   │   ├── AgentPipeline.jsx      # Animated pipeline visualization
    │   │   ├── ReasoningFlow.jsx      # Expandable reasoning flow
    │   │   └── ShallowVsSmart.jsx     # Side-by-side comparison
    │   ├── pages/Dashboard.jsx        # Main dashboard page
    │   ├── services/api.js            # Backend API calls
    │   └── data/config.js             # Category/badge/step config
    └── vite.config.js
```

---

## 🧠 How the AI Agents Work

### Agent Pipeline

```
Reel Interaction Data
        ↓
[Agent 1] Reel Understanding Agent
  Extracts: topic, context, intent, tech relevance, semantic signals
        ↓
[Agent 2] Interest Inference Agent
  Analyzes ALL reels together → finds cross-content patterns
  Scores interests: Explicit, Implicit, Emerging, Weak
        ↓
[Agent 3] Recommendation Agent
  Generates semantic tech recommendation (NOT keyword match)
        ↓
[Agent 4] Quality Validator
  Rejects: clickbait, hype, misleading claims
  Retries up to 2x if rejected
        ↓
Final Recommendation + Explanation
```

---

## 🎯 Hackathon Demo Scenario

**Input Reels:**
- Java Developer Problems (96% watched, liked)
- Day in the Life of a Software Engineer (91% watched, saved)
- Coding Interview Gone Wrong (88% watched)
- MacBook vs Windows for Developers (84% watched, liked)

**Shallow system would say:** "User likes Java → Recommend another Java Reel"

**TechScroll AI infers:**
> Java + SE lifestyle + coding interview + developer tools = **SOFTWARE ENGINEERING** (0.91, High Confidence)

**Recommends:**
> "From Code to Production: What Software Engineers Actually Do" — Career/Intermediate

**Rejected example:**
> "10 AI Tools That Will GUARANTEE You a ₹50 LPA Job" — Exaggerated career claims, clickbait

---

## 🛡️ Anti-Hype Filter

The Quality Validator (Agent 4) checks for:

| Pattern | Example |
|---------|---------|
| Guaranteed outcomes | "Guaranteed ₹50 LPA" |
| Exaggerated claims | "1000x faster" |
| Clickbait | "You won't BELIEVE this" |
| Fear-based | "AI will replace you unless..." |
| Generic hype | "10 AI tools that change everything" |

Prefers: practical tutorials, real engineering concepts, evidence-based content.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health + provider info |
| GET | `/api/reels` | All 12 sample reels |
| GET | `/api/reels/demo` | Demo scenario reels |
| POST | `/api/analyze` | Run full AI pipeline |

### POST /api/analyze

```json
// Request
{ "reelIds": ["reel_01", "reel_02", "reel_03"] }

// Response
{
  "success": true,
  "pipeline": { "reelsAnalyzed": 3, "provider": "mock" },
  "reelAnalyses": [...],
  "interestProfile": { "primaryInterest": {...}, "interests": [...] },
  "recommendation": { "recommendation": {...}, "confidence": "High" },
  "validation": { "passed": true, "qualityScore": 0.93 },
  "explanation": { "reasoningSteps": [...], "shallowVsSmart": {...} }
}
```

---

## 🔮 Limitations

- Uses fictional/demo reel data (no real social media integration)
- Mock mode responses are pre-authored for the specific demo scenario
- No persistent user history (stateless demo)
- Interest scoring is heuristic, not trained ML model

---

## 🚀 Future Improvements

- Real social media API integration (with user consent)
- Vector DB (Pinecone/Weaviate) for semantic reel search
- User account with persistent interest history
- Personalized learning paths based on interest profile
- A/B testing different recommendation strategies
- Fine-tuned model on educational content quality signals
- Multi-language support

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS 3 + Framer Motion |
| Backend | Node.js + Express |
| AI | Google Gemini 2.0 Flash / OpenAI GPT-4o-mini / Mock |
| Data | In-memory JSON (MongoDB-ready) |

# TechScroll AI — Implementation Plan

## Overview
A full-stack AI-powered Reel recommendation agent that semantically infers student interests from their Reel interaction history and recommends high-quality technology content — avoiding keyword matching and clickbait.

---

## Architecture

```
d:\hackathon\
├── server/               # Node.js + Express backend
│   ├── src/
│   │   ├── agents/
│   │   │   ├── reelAnalyzer.js        # Agent 1: Semantic reel understanding
│   │   │   ├── interestInference.js   # Agent 2: Multi-reel interest inference
│   │   │   ├── recommendationEngine.js # Agent 3: Recommendation generator
│   │   │   └── qualityValidator.js    # Agent 4: Anti-hype quality checker
│   │   ├── services/
│   │   │   ├── aiService.js           # LLM API abstraction layer
│   │   │   └── mockResponses.js       # Fallback mock AI data
│   │   ├── data/
│   │   │   └── sampleReels.js         # 12 demo reel objects
│   │   ├── routes/
│   │   │   └── api.js                 # REST endpoints
│   │   └── index.js                   # Express entry point
│   ├── .env.example
│   └── package.json
│
└── client/               # React + Vite + Tailwind frontend
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── ReelCard.jsx
    │   │   ├── InterestCard.jsx
    │   │   ├── RecommendationCard.jsx
    │   │   ├── ReasoningFlow.jsx      # Visual pipeline viz
    │   │   ├── ShallowVsSmart.jsx     # Comparison section
    │   │   ├── AgentPipeline.jsx      # Animated pipeline
    │   │   └── LoadingOverlay.jsx
    │   ├── pages/
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js                 # Frontend API calls
    │   ├── data/
    │   │   └── mockData.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## Agent Pipeline

```
Reel Interaction Data
        ↓
[Agent 1] Reel Understanding Agent
  → Extracts: topic, context, intent, tech relevance,
    educational value, career relevance, technical concepts
        ↓
Semantic Topic Extraction (per reel)
        ↓
[Agent 2] Interest Inference Agent
  → Multi-reel analysis: recurring patterns, broader domains,
    explicit vs implicit interests, confidence scoring
        ↓
Interest Profile (scored + ranked)
        ↓
[Agent 3] Recommendation Agent
  → Generates tech reel recommendation based on inferred profile
  → NOT keyword matching — semantic inference
        ↓
[Agent 4] Quality / Anti-Hype Validator
  → Rejects: exaggerated claims, clickbait, misleading career promises
  → Retries up to 2x if rejected
        ↓
Final Structured JSON Recommendation
        ↓
Explanation Generator → UI
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reels` | Fetch sample reel data |
| POST | `/api/analyze` | Run full AI pipeline on selected reels |
| GET | `/api/health` | Health check |

---

## Frontend Sections

1. **Header** — TechScroll AI branding
2. **Recent Reels Grid** — Reel cards with watch%, like status
3. **"Run AI Analysis" button** — Triggers animated pipeline
4. **Agent Pipeline Visualization** — Animated step-by-step flow
5. **AI Detected Interests** — Scored interest cards with confidence
6. **Recommendation Card** — Full recommendation with explanation
7. **Reasoning Flow** — "Show AI Reasoning" expandable view
8. **Shallow vs Smart Comparison** — Side-by-side comparison

---

## AI Provider

- Primary: **Google Gemini** (`@google/generative-ai`) — `gemini-2.0-flash`
- Fallback: **Mock responses** (works 100% offline)
- Configurable via `AI_PROVIDER=gemini|openai|mock` in `.env`

---

## Key Design Decisions

- Backend agents use structured JSON prompts that explicitly instruct the LLM to avoid keyword matching
- Interest scoring uses semantic weights: watch%, liked, category recency, cross-content signals
- Quality validator has hardcoded heuristics + LLM check for robustness
- Frontend uses Framer Motion for animated pipeline visualization
- Tailwind CSS for styling
- Full mock fallback so demo never breaks

---

## Sample Reel Dataset (12 reels)

Covers: Java meme, SE lifestyle, coding interview, laptop comparison, gaming setup, AI model, DSA problem, cloud deployment, cybersecurity, web dev, career advice, entertainment

---

## Verification Plan

- Run backend: `cd server && npm run dev` → verify `/api/health` returns 200
- Run frontend: `cd client && npm run dev` → verify dashboard loads
- Click "Run AI Analysis" → verify pipeline animates and recommendation appears
- Test fallback: set `AI_PROVIDER=mock` → verify mock responses work

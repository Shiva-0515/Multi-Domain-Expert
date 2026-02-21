# Multi-Domain AI Expert

A full-stack AI-powered platform that generates structured, research-backed expert reports across multiple domains — finance, healthcare, career, education, travel, and software architecture.

---

## Overview

Multi-Domain AI Expert uses a multi-agent pipeline built with **CrewAI** and **Gemini LLMs** to produce high-quality, validated markdown reports from user queries. Each report goes through an intent extraction stage, a web research stage, an expert drafting stage, and a critic validation loop — ensuring accuracy, logical consistency, and domain compliance before delivery.

---

## Features

- **6 Expert Domains** — Finance, Medical, Career, Software, Education, Travel
- **Multi-agent pipeline** — Intent extraction → Web research → Expert draft → Critic validation → Refinement loop
- **Structured markdown output** — Enforced section formats, domain constraints, and scoring
- **Authentication** — Email/password signup + Google OAuth
- **JWT session management** via HTTP-only cookies
- **Responsive UI** — Split-panel analysis workspace with live skeleton loading

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI |
| AI Agents | CrewAI |
| LLMs | Google Gemini (Flash, Flash-Lite) |
| Web Search | Tavily API |
| Database | MongoDB (via PyMongo) |
| Auth | JWT + Google OAuth (Authlib) |
| Password hashing | Passlib + bcrypt |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP client | Axios |
| Markdown rendering | react-markdown + remark-gfm |
| Icons | Lucide React |

---

## Project Structure

```
├── Backend/
│   ├── main.py                   # FastAPI app entry point
│   ├── database.py               # MongoDB connection (experts collection)
│   ├── expert_factory.py         # Load expert configs from DB
│   ├── llm_factory.py            # LLM provider factory (Gemini / HuggingFace)
│   ├── core/
│   │   ├── config.py             # Environment settings
│   │   ├── database.py           # Users collection connection
│   │   ├── security.py           # JWT + password hashing
│   │   └── logging_config.py     # Structured logging setup
│   ├── crews/
│   │   ├── expert_crew.py        # Main pipeline orchestrator
│   │   └── stages/
│   │       ├── intent.py         # Intent extraction agent
│   │       ├── research.py       # Tavily web search stage
│   │       ├── expert.py         # Expert draft generation agent
│   │       ├── critic.py         # Critic validation agent
│   │       └── refinement.py     # Iterative refinement loop
│   ├── routes/
│   │   ├── auth_routes.py        # Signup, login, logout, /me, Google OAuth
│   │   └── research_generator_routes.py  # POST /research/generate
│   ├── models/
│   │   └── user_model.py         # User CRUD helpers
│   ├── schemas/
│   │   ├── user_schema.py        # Pydantic user models
│   │   └── query_schema.py       # Query request schema
│   ├── services/
│   │   └── auth_service.py       # Signup/login business logic
│   ├── tools/
│   │   └── tavily_tool.py        # Tavily search wrapper
│   └── utils/
│       └── oauth.py              # Authlib Google OAuth client
│
└── Frontend/
    └── src/
        ├── App.jsx               # Routes + AuthProvider wrapper
        ├── main.jsx              # React root
        ├── index.css             # Tailwind theme + custom tokens
        ├── context/
        │   └── AuthContext.jsx   # Auth state, login/signup/logout
        ├── services/
        │   └── api.js            # Axios instance with credentials
        ├── components/
        │   ├── Navbar.jsx        # Sticky nav with user dropdown
        │   ├── QueryForm.jsx     # Expert selector + query textarea
        │   ├── MarkdownViewer.jsx# Report renderer with skeleton loader
        │   ├── Hero.jsx          # Landing hero section
        │   └── ProtectedRoute.jsx# Auth guard wrapper
        └── pages/
            ├── LandingPage.jsx   # Marketing landing page
            ├── AnalysisPage.jsx  # Split-panel workspace
            ├── LoginPage.jsx     # Login with email + Google
            └── SignupPage.jsx    # Signup with password strength meter
```

---

## Pipeline Architecture

```
User Query
    │
    ▼
[1] Intent Extraction (gemini-2.5-flash-lite)
    │  Extracts structured intent + search queries
    │
    ▼
[2] Web Research (Tavily)
    │  Fetches top results for each search query
    │
    ▼
[3] Expert Draft (gemini-2.5-flash)
    │  Generates structured markdown report
    │
    ▼
[4] Critic Validation (gemini-3-flash-preview)
    │  Scores 1–10, decides APPROVE or REVISE
    │
    ▼
[5] Refinement Loop (up to 3 iterations)
    │  If score < 8, regenerate with feedback
    │
    ▼
Final Report (best scoring draft)
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 20+
- MongoDB instance (local or Atlas)
- API keys: `GEMINI_API_KEY`, `TAVILY_API_KEY`, `MONGO_URI`
- Google OAuth credentials (optional)

### Backend Setup

```bash
cd Backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env           # Fill in your keys (see Environment Variables below)

uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
cd Frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:8000`.

---

## Environment Variables

### Backend `.env`

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=multi_domain_ai

JWT_SECRET=your-secret-key-here

GEMINI_API_KEY=your-gemini-api-key
TAVILY_API_KEY=your-tavily-api-key

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register with email + password |
| `POST` | `/api/auth/login` | Login, sets `JWTtoken` cookie |
| `POST` | `/api/auth/logout` | Clears session cookie |
| `GET` | `/api/auth/me` | Returns authenticated user |
| `GET` | `/api/auth/google` | Initiates Google OAuth flow |
| `GET` | `/api/auth/google/callback` | Google OAuth callback |

### Research

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/research/generate` | Generate expert report |

**Request body:**
```json
{
  "expert_id": "finance_v1",
  "query": "I have $50,000 to invest over 10 years with moderate risk tolerance..."
}
```

**Response:**
```json
{
  "expert_id": "finance_v1",
  "query": "...",
  "report_markdown": "# Investment Strategy Report\n...",
  "execution_time": "28.4s"
}
```

---

## Expert Domains

| Expert ID | Domain | Description |
|---|---|---|
| `finance_v1` | Finance | Investment strategy, portfolio analysis, market trends |
| `medical_v1` | Medical | Symptom analysis, treatment overviews, clinical guidance |
| `career_v1` | Career | Job strategy, skill roadmaps, career growth |
| `education_v1` | Education | Study plans, learning paths, curriculum design |
| `travel_v1` | Travel | Itinerary planning, budgeting, destination insights |
| `software_v1` | Software | System design, architecture, tech stack decisions |

Expert configurations (roles, goals, output formats, constraints) are stored as documents in the MongoDB `experts` collection and loaded at runtime via `expert_factory.py`.

---

## Adding a New Expert

1. Insert a new document into the `experts` collection in MongoDB with the following fields:

```json
{
  "expert_id": "legal_v1",
  "domain": "Legal",
  "query_role": "Legal Query Analyst",
  "expert_role": "Senior Legal Expert",
  "expert_goal": "Provide structured legal analysis...",
  "critic_role": "Legal Report Auditor",
  "critic_goal": "Validate legal accuracy and completeness",
  "output_format": "## Executive Summary\n## Legal Analysis\n...",
  "domain_constraints": "Always include disclaimers. Do not provide definitive legal advice..."
}
```

2. Add the expert to the `EXPERTS` array in `Frontend/src/components/QueryForm.jsx`.

---

## Deployment Notes

- Set `secure=True` on cookies and configure HTTPS for production
- Update `origins` in `main.py` CORS config with your production frontend URL
- Set `CLIENT_URL` env var to your production frontend URL for OAuth redirects
- Consider rate-limiting the `/api/research/generate` endpoint — each request makes multiple LLM calls

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

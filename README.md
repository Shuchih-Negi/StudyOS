# 🎓 StudyOS — Agentic AI Learning Operating System
```markdown
StudyOS is an **agentic AI-powered learning system** that goes beyond chatbots and dashboards.  
It models a student’s academic life, reasons about progress and risk, and **autonomously plans, monitors, reflects, and adapts** their study journey.

Think:

> **Coursera + Discord + Autonomous AI Mentor**

Built for **agentic AI hackathons**, StudyOS demonstrates how multiple specialized AI agents can collaborate inside a real product interface.

---

## 🧠 Why StudyOS?

Most students don’t fail because of a lack of resources — they fail due to:
- poor long-term planning  
- inconsistent execution  
- silent backlog buildup  
- lack of adaptive mentorship  

Existing platforms are **passive**.  
StudyOS is **active**.

It doesn’t just track what happened — it decides **what should change next**.

---

## 🧩 Core Idea: Agentic Architecture

StudyOS runs on a continuous agent loop:

```

Observe → Model → Strategize → Plan → Act → Monitor → Reflect → Replan

```

Each step is handled by a **specialized agent**, coordinated by an orchestrator.

---

## 🏗️ Project Structure

```

StudyOS/
├── ui/                  # React + Tailwind frontend (Discord-style)
│   └── studyos-ui
│
├── agents/              # Python agent modules (brains)
│   ├── orchestrator.py
│   ├── context_agent.py
│   ├── strategy_agent.py
│   ├── planning_agent.py
│   ├── monitoring_agent.py
│   ├── reflection_agent.py
│   └── execution_agent.py
│
├── core/                # Shared backend logic
│   ├── student_state.py
│   ├── event_log.py
│   └── gemini_client.py
│
├── bridge/              # API bridge (React ↔ Python)
│   └── api.py
│
├── .gitignore
└── README.md

````

---

## 🤖 Agents Overview

| Agent | Responsibility |
|------|---------------|
| **Orchestrator** | Coordinates the full agent loop |
| **Context Agent** | Builds the student world model |
| **Strategy Agent** | Long-horizon reasoning & trade-offs |
| **Planning Agent** | Daily & weekly execution plans |
| **Monitoring Agent** | Detects drift, overload, inactivity |
| **Reflection Agent** | Diagnoses failure & replans |
| **Execution Agent** | Generates actionable tasks & nudges |

LLM used: **Gemini 2.5 Flash** (fast, low-latency reasoning).

---

## 🖥️ Frontend (UI)

- Built with **React + Tailwind CSS**
- Discord-inspired layout:
  - Channels (`#your-study`, `#reflection`, etc.)
  - Voice room simulation
  - Agent reasoning popups
- Visual **Journey Map** showing agent loop state
- “Run Agent Loop” button for demo purposes

The UI is intentionally designed as a **surface for agent decisions**, not a chat window.

---

## 🚀 Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/Shuchih-Negi/StudyOS.git
cd StudyOS
````

---

### 🔹 2. Frontend Setup (React + Tailwind)

```bash
cd ui/studyos-ui
npm install
npm start
```

The UI will be available at:

```
http://localhost:3000
```

> Tailwind CSS is already configured.
> If styles don’t appear, restart the dev server.

---

### 🔹 3. Backend Setup (Python)

**Recommended Python version:** `3.11.x`
(3.13 may cause dependency build issues)

#### Create virtual environment

```bash
python -m venv .venv
```

#### Activate it

**Windows**

```bash
.venv\Scripts\activate
```

**macOS / Linux**

```bash
source .venv/bin/activate
```

#### Install dependencies

```bash
pip install fastapi uvicorn google-generativeai
```

#### Set Gemini API key

```bash
export GEMINI_API_KEY="your_api_key_here"
```

(Windows PowerShell)

```powershell
setx GEMINI_API_KEY "your_api_key_here"
```

---

### 🔹 4. Run Backend

```bash
uvicorn bridge.api:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

## 🔌 Frontend ↔ Backend Connection

The UI sends a POST request to:

```
POST /run
```

Example payload:

```json
{
  "exam": "JEE Advanced",
  "deadline_days": 42,
  "weak_subjects": ["Math"]
}
```

The response includes:

* daily plan
* agent reasoning logs

---

## 🎬 Demo Flow (Hackathon-Friendly)

1. Open StudyOS UI
2. Click **Run Agent Loop**
3. Show:

   * Journey Map
   * Today’s Mission
   * Agent reasoning modal
4. Explain how each agent contributes

This clearly demonstrates **agentic AI**, not just LLM prompting.

---

## 🚧 Out of Scope (Intentional)

* Authentication
* Payments
* Mobile app
* Full LMS features

StudyOS is an **agentic intelligence demo**, not a production LMS.

---

## 🌱 Future Extensions

* Persistent student memory
* Multi-user collaboration
* Background autonomous agent cycles
* Burnout & motivation modeling
* Adaptation beyond academics (professionals, founders, athletes)

---

## 🏁 Final Note

StudyOS is designed to answer one question:

> **“What is happening to this student, and what should change next?”**

Not:

> “What did the student do?”

---

Built for agentic AI demos, hackathons, and future human-development systems 🚀

```

---

If you want next:
- a **pitch slide deck**
- **architecture diagram**
- **demo script for judges**
- **README badges & visuals**

Just say the word.
```

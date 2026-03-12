# SYSTEM ARCHITECTURE & AI IMPLEMENTATION BLUEPRINT

**Project:** Enterprise Employee Lifecycle & Knowledge Graph Platform
**Purpose:** Context file for AI coding assistants to understand system boundaries, data flow, and tech stack.

## 1. GLOBAL TECH STACK DEFINITION

- **Frontend:** Next.js (React), TailwindCSS, Shadcn UI (for dashboard and chat interfaces).
- **Backend:** Python (FastAPI) for AI/ML and data ingestion routing; Node.js (Express) for standard CRUD, auth, and webhooks.
- **Primary Database (Relational):** PostgreSQL (stores user profiles, organizational hierarchy, daily logs, and structured tracking metrics).
- **Knowledge Graph Database:** Neo4j (maps employees, skills, decisions, and cross-department dependencies).
- **AI Core:** Base LLM (e.g., GPT-4o, Claude 3.5, or Llama 3) integrated with a GraphRAG (Retrieval-Augmented Generation) pipeline.
- **MLOps & Predictive Pipeline:** Automated pipelines managing ADWIN, Cox PH, and XGBoost model lifecycles.

---

## 2. AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)

**Module:** `auth_service`

- **Strategy:** Strict Google OAuth 2.0. No password authentication.
- **Role Definitions:**
  - `ROLE_EMPLOYEE`: Can access the chat interface, view their own profile, log daily updates, and initiate the onboarding/matching workflows.
  - `ROLE_MANAGER`: Inherits Employee permissions PLUS access to the `/manager-dashboard`, monthly aggregated reports, and the Neo4j visual dependency graph.

---

## 3. CORE SYSTEM COMPONENTS & DATA FLOW

### Component A: The Ingestion Engine (Layer 1)

**Module:** `data_ingestion_service`

- **Google Meet API Integration:**
  - **Trigger:** Webhook fires when a scheduled Google Meet concludes.
  - **Action:** Pulls the meeting transcript and media stream.
  - **Processing:** Passes transcript to the Base LLM to extract key entities using LangChain: `{decision_statement}`, `{rationale}`, `{context_factors}`, and `{participants}`.
- **Daily Employee Logging:** Employees submit short text updates via the chatbot. These are standardized and appended to their PostgreSQL record.

### Component B: The GraphRAG Chatbot Intermediary

**Module:** `chatbot_core`
This is the primary interface for employees, replacing traditional search and static forms.

- **Architecture:** Research-oriented chatbot utilizing GraphRAG.
- **Query Flow:**
  1. User prompts the chatbot (e.g., "Why did we switch our cloud provider last year?").
  2. **Intent Classification:** Base LLM determines if this is a factual query, a logging command, or a matching request.
  3. **Graph Retrieval:** System queries Neo4j via Cypher to find the specific `[Decision]` node and its connected `[Rationale]` and `[Context]` nodes.
  4. **Context Assembly:** Retrieved graph data is injected into the Base LLM's prompt window.
  5. **Response Generation:** The LLM generates a highly accurate, hallucination-free response grounded _only_ in the retrieved graph data.

### Component C: Employee Onboarding & Matching Engine

**Module:** `employee_matching`

- **Trigger:** Triggered when a new user logs in for the first time.
- **Mechanism:**
  - System creates a new `[Employee]` node in Neo4j.
  - Extracts skills and department from the user's initial chat onboarding.
  - Executes a graph similarity search (incorporating vector embeddings of employee profiles) to find existing `[Employee]` nodes with the highest structural overlap.
  - **Output:** Recommends 1-3 "Buddies" to the new hire.

### Component D: MLOps & Decision Mortality Pipeline (Layer 2)

**Module:** `predictive_analytics`
A dedicated MLOps pipeline manages the lifecycle of the decision analytics models.

- **Data Source:** Continuous stream of organizational context from PostgreSQL and Neo4j.
- **Model 1 (ADWIN):** Monitors incoming data streams to detect context drift (e.g., sudden shifts in market keywords or internal project velocity).
- **Model 2 (Cox PH):** Performs survival analysis on historical decisions to generate a baseline hazard ratio.
- **Model 3 (XGBoost):** Takes the outputs from ADWIN and Cox PH to output a final numerical probability (0-100) quantifying how likely a specific decision is to be obsolete.
- **Action:** If a `Mortality Score` exceeds the threshold (e.g., > 85), it flags the decision node in Neo4j and triggers an alert to the relevant Manager.

### Component E: Manager Reporting & Graph Dashboard

**Module:** `manager_dashboard`

- **Monthly Tracking Engine:** A chron job runs on the 1st of every month. It aggregates data from PostgreSQL (number of daily logs, meeting participations) and Neo4j (number of decisions the employee is linked to).
- **API Endpoint:** `GET /api/v1/reports/monthly?teamId=123` returns structured JSON for the frontend to render performance and knowledge-contribution charts.
- **Dependency Explorer:** The frontend utilizes a library like `react-force-graph` to visually render the Neo4j data, showing managers the visible "lock-in" dependencies.

---

## 4. API CONTRACT EXAMPLES (For AI Generation)

**POST /api/chat/message**

```json
{
  "userId": "google-oauth-uid",
  "message": "Log this: I updated the auth schema today to include role-based tokens.",
  "context": "daily_update"
}
```

**GET /api/matches/onboarding?userId=123**

```json
{
  "matches": [
    {
      "employeeId": "456",
      "name": "Sarah Connor",
      "matchScore": 0.92,
      "sharedNodes": ["React", "Auth Module", "Frontend Team"]
    }
  ]
}
```

---

## 5. CROSS-REFERENCE TO DETAILED DOCS

For component-level deep dives and implementation guidance, refer to:

- `docs/01_Product_Scope.md` - Vision and problem statements
- `docs/02_Features_and_Roles.md` - User roles and feature specifications
- `docs/03_System_Architecture.md` - 4-Layer system breakdown
- `docs/04_AI_ML_Pipeline.md` - MLOps and model architecture
- `docs/05_Implementation_Timeline.md` - Phased rollout strategy

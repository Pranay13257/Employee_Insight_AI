# Features & Role-Based Access Control

## User Roles & Authentication

### Authentication Strategy

**Strictly handled via Google OAuth 2.0**

- No password-based authentication
- Single Sign-On (SSO) for seamless access
- Leverages existing organizational Google Workspace accounts
- Automatic profile creation on first login

---

## Role Definitions

### ROLE_EMPLOYEE

**Primary User Type:** Individual contributors, team members, new hires

**Permissions:**

- Access the AI chatbot interface for queries and logging
- View their own employee profile and contribution history
- Log daily updates via natural language input
- Initiate onboarding buddy-matching workflows
- Search and retrieve organizational knowledge via GraphRAG
- Participate in exit interview workflows (when offboarding)

**Restricted Access:**

- Cannot view other employees' private logs or profiles
- Cannot access aggregated team reports
- Cannot view the full organizational dependency graph
- Cannot configure system settings or model thresholds

---

### ROLE_MANAGER

**Primary User Type:** Team leads, department heads, organizational leadership

**Permissions:**

- **Inherits all Employee permissions** (can use chatbot, log updates, etc.)
- Access the `/manager-dashboard` interface
- View monthly aggregated performance reports for their team
- Visualize the Neo4j organizational dependency graph
- Receive automated alerts for obsolete decisions (Decision Mortality alerts)
- Export team knowledge contribution metrics
- View cross-team dependency relationships

**Restricted Access:**

- Cannot view private daily logs of employees (only aggregated metrics)
- Cannot modify decision mortality thresholds (requires admin role, not in V1)
- Cannot access other departments' detailed reports without cross-functional authorization

---

## Core Lifecycle Features

### 1. Onboarding & Matching

**Trigger:** When a new employee logs in for the first time via Google OAuth

**Workflow:**

1. System creates a new `[Employee]` node in Neo4j
2. Chatbot initiates conversational onboarding:
   - "What department are you joining?"
   - "What are your primary skills?" (e.g., Python, React, Product Management)
   - "What projects will you be working on?"
3. System analyzes the current organizational graph
4. Executes graph similarity search incorporating:
   - Shared skills and technologies
   - Department and team alignment
   - Historical project involvement
   - Vector embeddings of employee profiles for semantic matching
5. **Output:** Recommends 1-3 "Buddies" ranked by match score (0-1)
6. New hire receives introduction messages with buddy profiles and suggested first conversations

**Data Stored:**

- Employee profile (name, email, department, skills)
- Match scores and rationale
- Onboarding completion status

---

### 2. Daily Operations & Google Meet Integration

**Primary Interface:** AI Chatbot + Automated Event Listeners

#### Feature 2A: Daily Logging

**User Action:** Employee messages the chatbot with updates

- Example: "Log this: I completed the auth refactor today and updated the OAuth flow."

**System Processing:**

1. Intent classification identifies this as a logging command
2. NLP extracts structured data: `{date, task, category, keywords}`
3. Appends entry to employee's PostgreSQL daily log table
4. Updates Neo4j graph with any new node relationships (e.g., links to existing project or decision nodes)

**Manager Visibility:**

- Aggregated count of daily logs per employee (for monthly reports)
- No direct access to individual log content

#### Feature 2B: Google Meet Integration

**Trigger:** Webhook fires when a scheduled Google Meet concludes

**Automated Workflow:**

1. System pulls meeting transcript and media stream via Google Meet API
2. Transcript is passed to the Base LLM + LangChain for entity extraction:
   - `{decision_statement}`: "We decided to migrate from AWS to GCP"
   - `{rationale}`: "Cost savings and better BigQuery integration"
   - `{context_factors}`: ["budget constraints", "data analytics prioritization", "Q4 2025"]
   - `{participants}`: List of employee IDs from meeting attendees
3. Extracted decision is stored in PostgreSQL (Decision Intelligence DB)
4. Decision node and relationships are created/updated in Neo4j graph
5. Participants are notified via chatbot: "A new decision was captured from your meeting with Jane. Review it here."

**Benefits:**

- Zero manual data entry
- Captures decisions in real-time, before context is lost
- Links decisions to the people involved for future reference

---

### 3. Monthly Manager Reports

**Trigger:** Automated cron job on the 1st of every month

**Report Contents:**

- **Employee Contribution Metrics:**
  - Number of daily logs submitted
  - Number of decisions they were involved in (from meeting transcripts)
  - Number of knowledge graph nodes they contributed to
- **Team Dependency Visualization:**
  - Graph view showing how employee work connects to broader organizational decisions
  - Identification of "knowledge bottlenecks" (employees with high centrality in the graph)
- **Decision Mortality Alerts:**
  - List of flagged decisions with Mortality Scores > 85
  - Suggested action items for refactoring or sunsetting outdated systems

**API Endpoint:**

```
GET /api/v1/reports/monthly?teamId=123&month=2026-03
```

**Frontend Display:**

- Interactive charts (bar graphs for contributions, line graphs for trends)
- `react-force-graph` visualization of the Neo4j organizational graph
- Exportable PDF reports for leadership presentations

---

### 4. Offboarding (Exit Interview Bot)

**Trigger:** Manager marks an employee as "offboarding" in the system

**Workflow:**

1. Chatbot initiates conversational exit interview:
   - "What key decisions were you involved in that the team should remember?"
   - "What context or rationale do you think might be lost when you leave?"
   - "Which systems or processes do you think are becoming outdated?"
2. Responses are processed via NLP to extract:
   - Critical knowledge not yet captured in the system
   - Warnings about technical debt or organizational lock-in
   - Recommendations for knowledge transfer to specific team members
3. Extracted knowledge is stored in PostgreSQL and linked to the departing employee's node in Neo4j
4. Manager receives a summary report with action items for knowledge preservation

**Benefits:**

- Captures "tribal knowledge" before it walks out the door
- Provides structured handoff documentation
- Feeds into Decision Mortality predictions (departing employees often flag obsolete decisions)

---

## Feature Summary Table

| Feature                            | Employee Access                  | Manager Access                    | Automation Level                 |
| ---------------------------------- | -------------------------------- | --------------------------------- | -------------------------------- |
| **AI Chatbot Queries**             | ✅ Full access                   | ✅ Full access                    | Manual (user-initiated)          |
| **Daily Logging**                  | ✅ Log own updates               | 📊 View aggregated metrics only   | Manual (user-initiated)          |
| **Google Meet Ingestion**          | 🔔 Receive notifications         | 🔔 Receive notifications + alerts | Fully automated                  |
| **Onboarding Matching**            | ✅ Receive buddy recommendations | ❌ No direct access               | Fully automated                  |
| **Monthly Reports**                | ❌ No access                     | ✅ Full access                    | Fully automated (cron-based)     |
| **Exit Interview**                 | ✅ Participate when offboarding  | ✅ Review results                 | Semi-automated (chatbot-guided)  |
| **Dependency Graph Visualization** | ❌ No access                     | ✅ Full access                    | Real-time (Neo4j queries)        |
| **Decision Mortality Alerts**      | ❌ No access                     | ✅ Receive alerts                 | Fully automated (MLOps pipeline) |

---

## Cross-References

- **Authentication Implementation:** See `system_architecture.md` Section 2
- **API Specifications:** See `system_architecture.md` Section 4
- **ML Pipeline Details:** See `docs/04_AI_ML_Pipeline.md`

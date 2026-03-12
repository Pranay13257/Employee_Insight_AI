# System Architecture: 4-Layer Design

## Architectural Overview

The Enterprise Employee Lifecycle Platform is built on a **4-layer architecture** that separates concerns between active capture, intelligent extraction, analytics, and knowledge mapping.

```
┌─────────────────────────────────────────────────────────────────┐
│                         LAYER 0                                 │
│              Active Capture & Interactions                      │
│   (AI Chatbot, Exit Bot, Google Connectors, SSO)              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         LAYER 1                                 │
│            Intelligent Decision Extraction                      │
│    (LangChain, Base LLM, NLP Entity Extraction)                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         LAYER 2                                 │
│          Decision Analytics & Tracking                          │
│  (PostgreSQL, Monthly Reports, Mortality Detection)            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         LAYER 3                                 │
│           Knowledge Mapping & Graph Storage                     │
│     (Neo4j, GraphRAG, Employee Matching Engine)                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer 0: Active Capture & Interactions

**Purpose:** Provide user-facing interfaces for knowledge capture and authentication

### Components

#### 0.1 AI Chatbot UI

- **Tech Stack:** Next.js (React), TailwindCSS, Shadcn UI
- **Functionality:**
  - Primary conversational interface for employees
  - Natural language query processing
  - Daily logging interface
  - Onboarding workflow guidance
- **API Integration:** WebSocket connection to FastAPI chatbot backend

#### 0.2 Exit Interview Bot

- **Tech Stack:** React component embedded in offboarding workflow
- **Functionality:**
  - Conversational exit interview capture
  - Knowledge extraction from departing employees
  - Handoff documentation generation
- **Trigger:** Activated when manager marks employee as "offboarding"

#### 0.3 Google Connectors

**Google OAuth 2.0:**

- SSO authentication via Google Workspace
- Role extraction from organizational directory
- Profile data synchronization

**Google Meet API:**

- Webhook listener for meeting completion events
- Transcript and media stream retrieval
- Participant metadata extraction

#### 0.4 Manager Dashboard

- **Tech Stack:** Next.js, react-force-graph, Chart.js
- **Functionality:**
  - Monthly aggregated reports visualization
  - Neo4j dependency graph rendering
  - Decision mortality alerts dashboard
  - Team performance metrics

---

## Layer 1: Intelligent Decision Extraction

**Purpose:** Transform unstructured conversational data into structured, queryable knowledge

### Components

#### 1.1 NLP Extraction Pipeline

**Tech Stack:** Python (FastAPI), LangChain, Base LLM (GPT-4o/Claude/Llama)

**Extraction Workflow:**

```python
# Pseudocode representation
def extract_decision_from_transcript(transcript: str) -> Decision:
    """
    Uses LangChain to extract structured decision data from meeting transcripts
    """
    prompt = f"""
    Extract the following from this meeting transcript:
    - decision_statement: The core decision made
    - rationale: Why this decision was chosen
    - context_factors: Environmental/business factors influencing the decision
    - participants: People involved in the decision

    Transcript: {transcript}
    """

    response = llm.invoke(prompt)
    return Decision(
        statement=response.decision_statement,
        rationale=response.rationale,
        context=response.context_factors,
        participants=response.participants
    )
```

#### 1.2 Entity Standardization

**Problem:** Aliases and synonyms fragment the knowledge graph

- "John Smith", "John", "J.Smith" → Unified to canonical employee ID
- "React", "ReactJS", "React.js" → Standardized skill node

**Solution:** Named Entity Recognition (NER) + fuzzy matching against existing PostgreSQL/Neo4j entities

#### 1.3 Daily Log Processing

**Input:** Natural language employee updates via chatbot
**Output:** Structured log entries in PostgreSQL

**Example:**

```
Input: "Log this: I fixed the auth bug in prod today"
Output:
{
  "employee_id": "google-uid-123",
  "date": "2026-03-12",
  "task": "Fixed auth bug",
  "environment": "production",
  "category": "bug_fix",
  "keywords": ["auth", "production", "bug"]
}
```

---

## Layer 2: Decision Analytics & Tracking

**Purpose:** Store structured organizational data and compute tracking metrics

### Components

#### 2.1 PostgreSQL Database (Decision Intelligence DB - Silver Layer)

**Schema Design:**

**Table: employees**

```sql
CREATE TABLE employees (
    id UUID PRIMARY KEY,
    google_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    role ENUM('ROLE_EMPLOYEE', 'ROLE_MANAGER') NOT NULL,
    onboarding_date DATE,
    offboarding_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Table: decisions**

```sql
CREATE TABLE decisions (
    id UUID PRIMARY KEY,
    statement TEXT NOT NULL,
    rationale TEXT,
    context_factors JSONB,
    decision_date DATE NOT NULL,
    source VARCHAR(50), -- 'google_meet', 'manual', 'exit_interview'
    mortality_score INT DEFAULT NULL, -- 0-100, updated by MLOps pipeline
    is_obsolete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Table: daily_logs**

```sql
CREATE TABLE daily_logs (
    id SERIAL PRIMARY KEY,
    employee_id UUID REFERENCES employees(id),
    log_date DATE NOT NULL,
    task_description TEXT NOT NULL,
    category VARCHAR(50),
    keywords TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Table: decision_participants**

```sql
CREATE TABLE decision_participants (
    decision_id UUID REFERENCES decisions(id),
    employee_id UUID REFERENCES employees(id),
    role VARCHAR(50), -- 'decision_maker', 'contributor', 'informed'
    PRIMARY KEY (decision_id, employee_id)
);
```

#### 2.2 Monthly Aggregation Engine

**Implementation:** Python cron job (scheduled via APScheduler or Celery Beat)

**Process:**

1. Runs on the 1st of every month at 00:00 UTC
2. Queries PostgreSQL for all employees in each manager's team
3. Aggregates metrics per employee:
   - Total daily logs submitted
   - Total decisions participated in (via decision_participants table)
   - Knowledge graph nodes contributed (queries Neo4j for nodes created by employee)
4. Stores aggregated data in `monthly_reports` table
5. Triggers email notification to managers

**API Endpoint:**

```
GET /api/v1/reports/monthly?teamId=123&month=2026-03
```

#### 2.3 Decision Mortality Tracking

**Data Source:** MLOps pipeline (Layer 2 - see AI/ML Pipeline doc)
**Action:** Updates `mortality_score` field in decisions table
**Alert Logic:**

- If mortality_score > 85: Flag as obsolete, trigger manager alert
- If mortality_score > 70: Warn manager to review decision validity

---

## Layer 3: Knowledge Mapping & Graph Storage

**Purpose:** Model organizational knowledge as a dynamic, queryable graph

### Components

#### 3.1 Neo4j Knowledge Graph

**Node Types:**

- `[Employee]`: Individual team members
- `[Decision]`: Key organizational decisions
- `[Rationale]`: Reasoning behind decisions
- `[Context]`: Environmental/business factors
- `[Skill]`: Technical or domain expertise
- `[Department]`: Organizational units
- `[Project]`: Work initiatives

**Relationship Types:**

- `(Employee)-[:MADE_DECISION]->(Decision)`
- `(Decision)-[:HAS_RATIONALE]->(Rationale)`
- `(Decision)-[:INFLUENCED_BY]->(Context)`
- `(Employee)-[:HAS_SKILL]->(Skill)`
- `(Employee)-[:BELONGS_TO]->(Department)`
- `(Employee)-[:WORKS_ON]->(Project)`
- `(Decision)-[:DEPENDS_ON]->(Decision)` ← Critical for lock-in detection

**Example Cypher Query (Find Similar Employees for Matching):**

```cypher
MATCH (new_employee:Employee {id: $new_employee_id})-[:HAS_SKILL]->(skill:Skill)
MATCH (existing_employee:Employee)-[:HAS_SKILL]->(skill)
WITH existing_employee, COUNT(skill) AS shared_skills
WHERE existing_employee.id <> $new_employee_id
RETURN existing_employee.name, existing_employee.id, shared_skills
ORDER BY shared_skills DESC
LIMIT 3
```

#### 3.2 GraphRAG Integration

**Traditional RAG Problem:**

- Retrieves text chunks without understanding relationships
- Loses context about _why_ a decision was made

**GraphRAG Solution:**

1. User query: "Why did we switch to GCP?"
2. **Graph Query:** Find `[Decision]` nodes matching "GCP switch"
3. **Traverse Relationships:** Retrieve connected `[Rationale]` and `[Context]` nodes
4. **Context Assembly:** Inject structured graph data into LLM prompt
5. **Response Generation:** LLM generates answer grounded in graph facts

**Benefits:**

- Eliminates hallucinations (LLM only uses retrieved graph data)
- Preserves causal relationships (decision → rationale → context)
- Supports multi-hop reasoning ("What decisions depend on the GCP switch?")

#### 3.3 Employee Matching Engine

**Trigger:** New employee first login (via Google OAuth)

**Matching Algorithm:**

1. **Create Employee Node:** Insert new `[Employee]` node into Neo4j
2. **Extract Profile Data:** Skills, department, project assignments (from onboarding chat)
3. **Compute Similarity:**
   - Graph-based: Count shared skills, projects, department
   - Embedding-based: Generate vector embeddings of employee profiles, compute cosine similarity
4. **Rank Candidates:** Combine graph and embedding scores with weighted formula
5. **Return Top 3 Matches:** Present to new hire as "Recommended Buddies"

**Match Score Formula:**

```
match_score = (0.5 * graph_overlap) + (0.3 * embedding_similarity) + (0.2 * department_proximity)
```

---

## Data Flow Example: Google Meet Decision Capture

```
1. [Google Meet Ends] → Webhook fires
2. [Layer 0] Google Meet API pulls transcript
3. [Layer 1] LangChain extracts decision entities
4. [Layer 2] PostgreSQL stores structured decision record
5. [Layer 3] Neo4j creates/updates decision nodes and relationships
6. [Layer 0] Chatbot notifies participants: "New decision captured"
7. [Manager Dashboard] Decision appears in monthly report (if within reporting period)
```

---

## Technology Stack Summary

| Layer       | Component              | Technology                                 |
| ----------- | ---------------------- | ------------------------------------------ |
| **Layer 0** | Chatbot Frontend       | Next.js, React, TailwindCSS, Shadcn UI     |
| **Layer 0** | Authentication         | Google OAuth 2.0                           |
| **Layer 0** | Meeting Ingestion      | Google Meet API                            |
| **Layer 1** | NLP Extraction         | Python, FastAPI, LangChain, Base LLM       |
| **Layer 1** | Entity Standardization | NER (spaCy/HuggingFace), Fuzzy Matching    |
| **Layer 2** | Relational DB          | PostgreSQL                                 |
| **Layer 2** | Aggregation Jobs       | Python, APScheduler/Celery                 |
| **Layer 2** | MLOps Pipeline         | ADWIN, Cox PH, XGBoost (see AI/ML doc)     |
| **Layer 3** | Graph Database         | Neo4j                                      |
| **Layer 3** | GraphRAG               | LangChain + Neo4j Cypher queries           |
| **Layer 3** | Embeddings             | OpenAI/Anthropic embeddings or HuggingFace |

---

## Cross-References

- **Authentication Details:** See `system_architecture.md` Section 2
- **API Contracts:** See `system_architecture.md` Section 4
- **ML Pipeline:** See `docs/04_AI_ML_Pipeline.md`
- **Implementation Phases:** See `docs/05_Implementation_Timeline.md`

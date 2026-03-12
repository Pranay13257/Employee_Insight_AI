# AI/ML Pipeline & MLOps Architecture

## Overview

To ensure model consistency and avoid hallucination, the AI features are strictly partitioned. This document outlines the robust MLOps framework that manages model versioning, tracks context drift, and orchestrates the training pipelines for all AI/ML components.

---

## Model Partitioning Strategy

**Critical Principle:** Each AI/ML component has a specific, isolated responsibility to prevent feature bleed and hallucination.

| Component                  | Model Type                    | Primary Function              | Input Data                          | Output                      |
| -------------------------- | ----------------------------- | ----------------------------- | ----------------------------------- | --------------------------- |
| **Chatbot Core**           | Base LLM + GraphRAG           | Natural language interface    | User queries + Neo4j graph data     | Conversational responses    |
| **Decision Extraction**    | Base LLM + LangChain          | Entity extraction from text   | Meeting transcripts, employee logs  | Structured decision records |
| **Decision Mortality**     | ADWIN + Cox PH + XGBoost      | Predict decision obsolescence | PostgreSQL + Neo4j time-series data | Mortality score (0-100)     |
| **Employee Matching**      | Graph algorithms + Embeddings | Find similar employees        | Neo4j graph + employee profiles     | Match scores (0-1)          |
| **Entity Standardization** | NER + Fuzzy matching          | Resolve aliases and synonyms  | Raw text entities                   | Canonical entity IDs        |

---

## Component 1: The Chatbot Core (GraphRAG & Base LLM)

### Purpose

The intermediary AI chatbot utilizes a base LLM integrated with Graph Retrieval-Augmented Generation (GraphRAG) to provide accurate, hallucination-free responses.

### Architecture

**Traditional RAG Limitations:**

- Retrieves flat text chunks from vector databases
- Loses structural relationships between entities
- Cannot answer "why" questions that require causal reasoning

**GraphRAG Solution:**

```
User Query
    ↓
Intent Classification (Base LLM)
    ↓
Neo4j Cypher Query Generation
    ↓
Graph Traversal & Context Retrieval
    ↓
Structured Context Assembly
    ↓
Base LLM Response Generation (grounded in graph facts)
    ↓
User Response
```

### Implementation Details

**Step 1: Intent Classification**

```python
# Pseudocode
def classify_intent(user_message: str) -> Intent:
    """
    Determines if the user is:
    - Asking a factual question
    - Logging a daily update
    - Requesting onboarding matching
    """
    prompt = f"Classify this user message: {user_message}"
    response = base_llm.invoke(prompt)
    return Intent(type=response.intent_type, entities=response.entities)
```

**Step 2: Graph Query Generation**

```python
def generate_cypher_query(intent: Intent) -> str:
    """
    Converts natural language intent into a Cypher query
    """
    if intent.type == "factual_query":
        # Extract key entities (e.g., "GCP switch")
        entities = intent.entities
        query = f"""
        MATCH (d:Decision)-[:HAS_RATIONALE]->(r:Rationale)
        WHERE d.statement CONTAINS '{entities[0]}'
        RETURN d, r
        """
        return query
```

**Step 3: Context Assembly & Response**

```python
def generate_response(user_query: str, graph_context: dict) -> str:
    """
    Injects retrieved graph context into LLM prompt
    """
    prompt = f"""
    You are an organizational knowledge assistant.

    User Question: {user_query}

    Retrieved Context from Knowledge Graph:
    {json.dumps(graph_context, indent=2)}

    Instructions:
    - Answer ONLY using the provided context
    - If the context doesn't contain the answer, say "I don't have that information"
    - Do NOT make assumptions or add external knowledge
    """

    response = base_llm.invoke(prompt)
    return response
```

### Hallucination Prevention Mechanisms

1. **Context Grounding:** LLM is explicitly instructed to only use retrieved graph data
2. **Confidence Scoring:** If graph retrieval returns empty results, chatbot responds with "I don't have that information in our records"
3. **User Feedback Loop:** Users can flag incorrect responses, which trigger manual review

---

## Component 2: The Decision Mortality Engine

### Purpose

Predicts when organizational decisions become obsolete using an ensemble of three specialized models.

### Model Ensemble Architecture

```
PostgreSQL + Neo4j Data Streams
            ↓
    ┌───────┴────────┐
    ↓                ↓
ADWIN (Drift)    Historical Data
    ↓                ↓
Context Drift    Cox PH (Survival)
    Score            ↓
    ↓            Hazard Ratio
    └───────┬────────┘
            ↓
    XGBoost (Ensemble)
            ↓
    Mortality Score (0-100)
```

### Model 1: ADWIN (Adaptive Windowing)

**Type:** Online learning algorithm for concept drift detection

**Purpose:** Detect when the organizational context surrounding a decision has fundamentally shifted

**Input Features:**

- Market keyword frequencies (e.g., "cloud migration", "AI strategy")
- Internal project velocity metrics
- Technology adoption signals
- Competitive landscape changes

**Output:** Drift score (0-1) indicating context stability

**Example Use Case:**

```
Decision: "Use Heroku for all production deployments" (made in 2018)

ADWIN detects:
- Spike in "Kubernetes" mentions across organization
- Decline in "Heroku" references
- Increase in DevOps hiring signals

→ High drift score (0.85) suggests the decision's context has shifted
```

**Implementation:**

```python
from river import drift

# Initialize ADWIN detector
adwin = drift.ADWIN(delta=0.002)

def detect_context_drift(decision_id: str) -> float:
    """
    Monitors streaming data associated with a decision
    """
    # Fetch time-series data of context factors
    context_stream = fetch_context_metrics(decision_id)

    for data_point in context_stream:
        adwin.update(data_point)

        if adwin.drift_detected:
            # Context has significantly changed
            return adwin.estimation  # Drift magnitude

    return 0.0  # No drift detected
```

### Model 2: Cox Proportional Hazards (Cox PH)

**Type:** Survival analysis model

**Purpose:** Estimate the "lifespan" of a decision based on historical patterns

**Input Features:**

- Decision age (time since creation)
- Number of dependent decisions (from Neo4j `DEPENDS_ON` relationships)
- Number of employees involved
- Decision category (architectural, operational, strategic)

**Output:** Hazard ratio (relative risk of obsolescence)

**Example Use Case:**

```
Decision: "Use MongoDB for user data storage" (created 3 years ago)

Cox PH analysis shows:
- Similar database decisions have median lifespan of 4 years
- High dependency count increases hazard ratio
- Category "architectural" has slower decay rate

→ Hazard ratio: 1.8 (80% higher risk than baseline)
```

**Implementation:**

```python
from lifelines import CoxPHFitter

def train_cox_model(historical_decisions: pd.DataFrame):
    """
    Trains survival model on historical decision data
    """
    # Features: decision_age, dependency_count, employee_count, category
    # Duration: time until decision was marked obsolete
    # Event: boolean indicating if decision became obsolete

    cph = CoxPHFitter()
    cph.fit(historical_decisions, duration_col='lifespan', event_col='is_obsolete')
    return cph

def predict_hazard_ratio(decision: dict, model: CoxPHFitter) -> float:
    """
    Predicts relative risk for a specific decision
    """
    features = pd.DataFrame([{
        'decision_age': decision['age_days'],
        'dependency_count': decision['dependencies'],
        'employee_count': decision['participants'],
        'category': decision['category']
    }])

    hazard_ratio = model.predict_partial_hazard(features)
    return hazard_ratio.iloc[0]
```

### Model 3: XGBoost (Ensemble Aggregator)

**Type:** Gradient boosting classifier

**Purpose:** Combine drift scores and hazard ratios to produce final mortality prediction

**Input Features:**

- ADWIN drift score
- Cox PH hazard ratio
- Graph centrality metrics (from Neo4j)
- Employee turnover rate (participants who left)
- Time since last reference (from daily logs or meetings)

**Output:** Mortality score (0-100, where 100 = highly likely to be obsolete)

**Training Data:**

- Historical decisions manually labeled as "obsolete" or "still relevant"
- Requires initial human annotation of 200-500 decisions

**Implementation:**

```python
import xgboost as xgb
from sklearn.model_selection import train_test_split

def train_mortality_model(training_data: pd.DataFrame):
    """
    Trains XGBoost model to predict decision mortality
    """
    X = training_data[['drift_score', 'hazard_ratio', 'centrality', 'turnover_rate', 'days_since_reference']]
    y = training_data['is_obsolete']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = xgb.XGBClassifier(
        objective='binary:logistic',
        max_depth=6,
        learning_rate=0.1,
        n_estimators=100
    )

    model.fit(X_train, y_train)

    # Evaluate
    accuracy = model.score(X_test, y_test)
    print(f"Model accuracy: {accuracy}")

    return model

def predict_mortality_score(decision_id: str, models: dict) -> int:
    """
    Generates final mortality score for a decision
    """
    # Get features from other models
    drift_score = models['adwin'].detect_drift(decision_id)
    hazard_ratio = models['cox_ph'].predict_hazard(decision_id)

    # Get graph metrics
    graph_metrics = get_neo4j_metrics(decision_id)

    features = pd.DataFrame([{
        'drift_score': drift_score,
        'hazard_ratio': hazard_ratio,
        'centrality': graph_metrics['centrality'],
        'turnover_rate': graph_metrics['turnover'],
        'days_since_reference': graph_metrics['days_since_ref']
    }])

    # Predict probability and convert to 0-100 score
    probability = models['xgboost'].predict_proba(features)[0][1]
    mortality_score = int(probability * 100)

    return mortality_score
```

---

## Component 3: Employee Matching & Entity Extraction

### Named Entity Recognition (NER)

**Purpose:** Identify and classify entities from unstructured text

**Model:** HuggingFace Transformers (e.g., `bert-base-NER` or custom-trained model)

**Entities Extracted:**

- `PERSON`: Employee names
- `SKILL`: Technologies, tools, methodologies
- `PROJECT`: Project names and initiatives
- `DECISION`: Decision statements

**Implementation:**

```python
from transformers import pipeline

ner_pipeline = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")

def extract_entities(text: str) -> dict:
    """
    Extracts and categorizes entities from text
    """
    entities = ner_pipeline(text)

    # Group by entity type
    categorized = {
        'people': [],
        'skills': [],
        'projects': []
    }

    for entity in entities:
        if entity['entity'] == 'PER':
            categorized['people'].append(entity['word'])
        elif entity['entity'] == 'MISC':
            categorized['skills'].append(entity['word'])

    return categorized
```

### Embedding Matching

**Purpose:** Compute semantic similarity between employee profiles

**Model:** Sentence transformers (e.g., `all-MiniLM-L6-v2`)

**Implementation:**

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

def compute_employee_similarity(employee_a: dict, employee_b: dict) -> float:
    """
    Computes cosine similarity between employee profiles
    """
    # Create profile text
    profile_a = f"{employee_a['skills']} {employee_a['department']} {employee_a['projects']}"
    profile_b = f"{employee_b['skills']} {employee_b['department']} {employee_b['projects']}"

    # Generate embeddings
    embedding_a = model.encode(profile_a, convert_to_tensor=True)
    embedding_b = model.encode(profile_b, convert_to_tensor=True)

    # Compute cosine similarity
    similarity = util.cos_sim(embedding_a, embedding_b).item()

    return similarity
```

---

## MLOps Infrastructure

### Model Lifecycle Management

**Tool Recommendations:**

- **Experiment Tracking:** MLflow or Weights & Biases
- **Model Registry:** MLflow Model Registry
- **Pipeline Orchestration:** Apache Airflow or Prefect
- **Model Serving:** FastAPI + Docker

### Monitoring & Retraining Strategy

**Continuous Monitoring:**

- Track prediction accuracy via user feedback
- Monitor ADWIN drift detection performance
- Log Cox PH prediction errors

**Retraining Triggers:**

- Monthly scheduled retraining (for Cox PH and XGBoost)
- Drift detection (ADWIN runs continuously)
- Accuracy drops below 85% threshold

**Data Versioning:**

- Use DVC (Data Version Control) for training dataset snapshots
- Maintain audit trail of model versions and performance metrics

### Deployment Pipeline

```
1. Model Training (Python scripts)
    ↓
2. Model Validation (hold-out test set)
    ↓
3. Model Registration (MLflow)
    ↓
4. Containerization (Docker)
    ↓
5. Staging Deployment (test environment)
    ↓
6. A/B Testing (10% traffic)
    ↓
7. Production Deployment (gradual rollout)
    ↓
8. Monitoring & Alerting (Prometheus + Grafana)
```

---

## Model Performance Targets

| Component               | Metric              | Target | Measurement Method                          |
| ----------------------- | ------------------- | ------ | ------------------------------------------- |
| **GraphRAG Chatbot**    | Retrieval Precision | > 95%  | User feedback + manual audit                |
| **Decision Extraction** | Entity F1 Score     | > 90%  | Benchmark against human annotations         |
| **Decision Mortality**  | Prediction Accuracy | > 85%  | Retrospective analysis of flagged decisions |
| **Employee Matching**   | Top-3 Match Rate    | > 80%  | User surveys ("Was this buddy helpful?")    |

---

## Cross-References

- **System Architecture:** See `docs/03_System_Architecture.md`
- **Implementation Timeline:** See `docs/05_Implementation_Timeline.md`
- **Tech Stack:** See `system_architecture.md` Section 1

# Phase 7: Database Integration, History Tracking, and Advanced Analytics

---

## 1. Objective

The objective of Phase 7 is to transform the machine learning system into a **persistent, production-ready backend** by introducing a database layer and analytics APIs.

This phase enables the system to:

* Store predictions permanently
* Retrieve historical prediction data
* Generate aggregated insights
* Support dashboard-level analytics

---

## 2. Problem Before Phase 7

Before this phase:

* Predictions were generated but not stored
* No historical tracking existed
* No analytics or aggregation was possible
* System behaved like a temporary ML script

---

## 3. Solution Introduced in Phase 7

Phase 7 introduces:

* Database (SQLite)
* ORM (SQLAlchemy)
* Persistent storage for predictions
* API endpoints for history and analytics

---

## 4. System Architecture After Phase 7

```
User Request → Prediction API → ML Model → Prediction
                                      ↓
                               Store in Database
                                      ↓
          -------------------------------------------------
          ↓                     ↓                      ↓
      History API         Analytics API        Advanced Analytics API
```

---

## 5. Step-by-Step Implementation

---

## Step 1: Environment Setup

### Actions:

* Verified Python installation
* Created virtual environment
* Activated environment

### Commands:

```
python -m venv venv
venv\Scripts\activate
```

### Purpose:

* Isolate dependencies
* Ensure reproducibility

---

## Step 2: Database Setup (SQLite + SQLAlchemy)

### Tools Used:

* SQLite (lightweight database)
* SQLAlchemy (ORM for database interaction)

### Installation:

```
pip install flask_sqlalchemy
```

### Configuration:

File:

```
backend/config.py
```

Key settings:

```
DB_PATH = os.path.join(BASE_DIR, "database.db")
SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
```

---

## Step 3: Database Model Creation

File:

```
backend/models/db_models.py
```

### Prediction Table Structure

Fields:

* id (Primary Key)
* symbol (Stock ticker)
* prediction (UP / DOWN)
* confidence (Model probability)
* rsi (Technical indicator)
* volatility (Market volatility)
* sentiment_score (NLP feature)
* news_count (Number of news articles)
* created_at (Timestamp)

### Purpose:

Each prediction becomes a **database record**

---

## Step 4: Integrating Database with Flask App

File:

```
backend/app.py
```

### Key Additions:

```
from models.db_models import db

db.init_app(app)

with app.app_context():
    db.create_all()
```

### Purpose:

* Initialize database connection
* Automatically create tables

---

## Step 5: Saving Predictions to Database

File:

```
backend/routes/prediction_routes.py
```

### Logic:

```
new_entry = Prediction(...)
db.session.add(new_entry)
db.session.commit()
```

### Flow:

```
User → /predict/AAPL
     → Model predicts
     → Data stored in database
```

### Result:

Predictions are now **persistent**

---

## Step 6: History API

### Endpoint:

```
/history
```

### File:

```
backend/routes/history_routes.py
```

### Functionality:

* Fetch all stored predictions
* Return as JSON

### Use Case:

* Display prediction history
* Debug model outputs

---

## Step 7: Basic Analytics API

### Endpoint:

```
/analytics
```

### File:

```
backend/routes/analytics_routes.py
```

### Metrics Computed:

* Total predictions
* UP vs DOWN count
* Average confidence

### Purpose:

* Provide quick system overview

---

## Step 8: Advanced Analytics API

File:

```
backend/routes/advanced_analytics_routes.py
```

---

### 8.1 Summary API

Endpoint:

```
/analytics/summary
```

Provides:

* Total predictions
* UP / DOWN counts
* Average confidence

---

### 8.2 Stock-wise Analytics

Endpoint:

```
/analytics/stock/<symbol>
```

Provides:

* Metrics for a specific stock
* Latest prediction
* Confidence values

---

### 8.3 Trend Analysis

Endpoint:

```
/analytics/trends
```

Provides:

* Date-wise prediction counts
* Separate counts for UP and DOWN

Example:

```
2026-04-25 → UP: 1, DOWN: 2
```

Used for:

* Line charts
* Time-series analysis

---

### 8.4 Recent Predictions

Endpoint:

```
/analytics/recent
```

Provides:

* Last 10 predictions
* Sorted by timestamp

Used for:

* Dashboard tables
* Latest activity tracking

---

## 9. Data Flow Summary

```
Prediction API
      ↓
ML Model
      ↓
Prediction + Features
      ↓
Saved in Database
      ↓
-----------------------------------
      ↓
History API → Raw records
Analytics API → Aggregated summary
Advanced Analytics → Trends & insights
```

---

## 10. Key Design Decisions

### 10.1 SQLite

* Lightweight and easy setup
* Suitable for development and small-scale deployment

---

### 10.2 SQLAlchemy

* Simplifies database interaction
* Avoids raw SQL queries

---

### 10.3 API-Based Architecture

* Modular design
* Easily integrable with frontend

---

### 10.4 Data Persistence

* Ensures reproducibility
* Enables long-term analysis

---

## 11. Challenges and Solutions

### Challenge 1: No Data Persistence

Solution:

* Introduced database storage

---

### Challenge 2: Data Retrieval

Solution:

* Built `/history` API

---

### Challenge 3: Lack of Insights

Solution:

* Built analytics APIs

---

### Challenge 4: Dashboard Readiness

Solution:

* Created structured endpoints for frontend use

---

## 12. Current System Capabilities

The system can now:

* Predict stock movement
* Explain predictions
* Store prediction data
* Retrieve historical data
* Provide aggregated insights
* Generate trend analysis

---

## 13. Backend APIs Summary

### Prediction

```
/predict/<symbol>
```

---

### Stock Data

```
/stock/<symbol>
```

---

### History

```
/history
```

---

### Basic Analytics

```
/analytics
```

---

### Advanced Analytics

```
/analytics/summary
/analytics/stock/<symbol>
/analytics/trends
/analytics/recent
```

---

## 14. Outcome of Phase 7

* Backend evolved into a **full data-driven system**
* Predictions are persistent and analyzable
* APIs support real-time and historical insights
* System is ready for frontend dashboard integration

---

## 15. Next Phase

The next phase focuses on:

* Frontend dashboard design
* API integration with UI
* Data visualization (charts, tables, insights)

---

## 16. Conclusion

Phase 7 converts the project from a machine learning prototype into a **complete backend system** with:

* Intelligence (ML models)
* Memory (Database)
* Communication (APIs)
* Insight (Analytics)

This forms the foundation for a full-stack AI application.

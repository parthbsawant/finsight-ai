# Phase 6: Backend API Development (Flask Integration)

## 1. Objective

The goal of this phase is to transform the machine learning pipeline into a usable backend system by exposing its functionality through REST APIs.

This phase enables:

- Access to processed stock data
- Real-time prediction generation
- Model explainability
- Integration readiness for frontend/dashboard

---

## 2. System Architecture Overview

The backend follows a modular service-based architecture:

backend/
│
├── app.py                  → Main Flask application
├── config.py               → Central configuration
│
├── routes/                 → API endpoints
│   ├── stock_routes.py
│   ├── prediction_routes.py
│
├── services/               → Business logic layer
│   ├── data_service.py
│   ├── model_service.py
│   ├── explain_service.py
│
├── data/
│   └── ml_enhanced/        → Final dataset (input to API)
│
├── models/                 → Trained ML models (.pkl)

---

## 3. Design Principles

### 3.1 Separation of Concerns

- Routes handle HTTP requests/responses
- Services handle logic and processing
- Config manages environment setup

---

### 3.2 Reusability

- Services are reusable across endpoints
- Models are dynamically loaded per stock

---

### 3.3 Scalability

- Easy to extend with:
  - Database layer
  - Authentication
  - Additional APIs

---

## 4. Configuration Layer

File: backend/config.py

Responsibilities:

- Define paths for:
  - Dataset (ml_enhanced)
  - Models
  - Feature importance
- Setup database URI (future use)
- Manage debug settings

---

## 5. Service Layer Implementation

### 5.1 Data Service

File: services/data_service.py

Function:
- Load stock data dynamically from CSV

Key logic:
- Reads data from ml_enhanced directory
- Ensures correct symbol-based loading

---

### 5.2 Model Service

File: services/model_service.py

Functions:
- Load trained ML model
- Generate predictions

Key logic:
- Uses joblib to load XGBoost models
- Ensures symbol-specific prediction

---

### 5.3 Explainability Service

File: services/explain_service.py

Purpose:
- Convert model outputs into human-readable explanations

Key Features:
- Uses feature importance
- Applies domain logic:
  - RSI interpretation
  - Sentiment interpretation
  - Volatility meaning
  - Volume insights

---

## 6. API Routes

### 6.1 Root Endpoint


GET /


Purpose:
- Health check
- API discovery

---

### 6.2 Stock Data Endpoint


GET /stock/<symbol>


Returns:
- Last 100 records
- Includes:
  - Price data
  - Technical indicators
  - Sentiment features

---

### 6.3 Prediction Endpoint


GET /predict/<symbol>


Pipeline:

1. Load latest stock data
2. Extract ML features
3. Load trained model
4. Generate prediction
5. Compute feature importance
6. Generate explanation

Returns:

- Prediction (UP / DOWN)
- Feature values
- Top influencing features
- Human-readable explanation

---

## 7. Data Flow

User Request
→ API Route
→ Data Service
→ Model Service
→ Prediction
→ Explanation Service
→ JSON Response

---

## 8. Example Output


{
"symbol": "AAPL",
"prediction": "DOWN",
"features": {...},
"confidence_top_features": [...],
"explanation": [
"RSI indicates overbought condition",
"Neutral sentiment",
"High trading volume observed"
]
}


---

## 9. Key Features Achieved

- End-to-end ML pipeline integration
- Real-time prediction capability
- Explainable AI layer
- Clean modular architecture
- API ready for frontend

---

## 10. Challenges Faced

### 10.1 Feature Mismatch
- Model required exact feature alignment
- Fixed by dropping unused columns

---

### 10.2 Data Path Confusion
- Multiple dataset folders created
- Final decision: ml_enhanced used

---

### 10.3 API Errors (404)
- Root route missing
- Fixed by adding home endpoint

---

## 11. Outcome of Phase 6

- Fully functional backend API
- Stable prediction system
- Ready for:
  - Database integration
  - Frontend dashboard

---

## 12. Current Capabilities

The system can:

- Serve stock data via API
- Predict stock movement
- Explain predictions logically
- Support multiple stocks dynamically

---

## 13. Next Phase

Phase 7: Database Integration

Planned features:

- Store prediction history
- Track model performance
- Enable analytics
- Support user interactions

---
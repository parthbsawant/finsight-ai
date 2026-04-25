# Phase 4: Machine Learning Modeling and Prediction (Detailed Explanation)

---

## 1. Objective

The purpose of this phase is to convert your prepared dataset into a **prediction system**.

Until Phase 3:

* You collected data
* Cleaned it
* Extracted features
* Added intelligence using NLP and Deep Learning

In this phase, you:

* Train models to learn patterns
* Use those patterns to make predictions
* Evaluate how good those predictions are

---

## 2. What You Start With (Input)

Your input comes from:

```text
backend/data/final/
```

Each file (AAPL.csv, AMZN.csv, etc.) contains one row per day with:

### Price Features

* open
* high
* low
* close
* volume

### Technical Indicators

* returns → day-to-day price change
* rsi → momentum indicator
* macd → trend indicator
* volatility → risk measure

### NLP Features

* news_count → number of news articles that day
* sentiment_score → average sentiment from FinBERT

---

## 3. What You Want to Predict

You are solving this question:

```text
Will the stock go UP or DOWN tomorrow?
```

So you create:

```text
target = 1 → price goes UP
target = 0 → price goes DOWN or stays same
```

---

## 4. Target Variable Creation

### Why Needed

Machine learning needs:

* Input (features)
* Output (target)

You already have features, so you create the target.

---

### How It Works

For each row:

```text
Compare:
Tomorrow’s close vs Today’s close
```

If:

```text
close(t+1) > close(t) → target = 1
else → target = 0
```

---

### Important Detail

The last row has no "next day", so:

```text
It is removed
```

---

### Script Used

```text
backend/scripts/ml/create_target.py
```

---

## 5. Preparing Data for Machine Learning

Now your dataset has both:

```text
Features (X)
Target (y)
```

---

### Step 1: Remove Non-Useful Columns

```text
date is removed
```

Reason:

* ML models cannot use dates directly

---

### Step 2: Separate Features and Target

```text
X → all columns except target
y → target column
```

---

### Step 3: Train-Test Split

You divide data into:

```text
80% → Training data
20% → Testing data
```

---

### Why Split?

* Training data → model learns patterns
* Testing data → model is evaluated

---

### Important Rule

```text
shuffle = False
```

Reason:

This is time-series data.

If shuffled:

* Future data leaks into past
* Model becomes unrealistic

---

### Script Used

```text
backend/scripts/ml/prepare_data.py
```

---

## 6. Models Used

You trained two models to compare performance.

---

### 6.1 Random Forest

How it works:

* Creates many decision trees
* Each tree makes a prediction
* Final output = majority vote

---

### Why Use It

* Simple and stable
* Handles noise well
* Easy to understand

---

### 6.2 XGBoost

How it works:

* Builds trees sequentially
* Each new tree fixes previous errors

---

### Why Use It

* Captures complex patterns
* Usually more accurate
* Industry standard model

---

## 7. Model Training Process

For each stock:

1. Load dataset
2. Split into train and test
3. Train Random Forest
4. Train XGBoost
5. Save models

---

### Model Files

Stored in:

```text
backend/models/
```

Examples:

```text
AAPL_rf.pkl
AAPL_xgb.pkl
```

---

## 8. Model Evaluation

After training, you test model performance.

---

### Metrics Used

#### 1. Accuracy

```text
How many predictions are correct?
```

---

#### 2. Precision

```text
When model says "UP", how often is it correct?
```

---

#### 3. Recall

```text
Out of all actual "UP" days, how many did model detect?
```

---

#### 4. F1 Score

```text
Balance between Precision and Recall
```

---

### Script Used

```text
backend/scripts/ml/evaluate_models.py
```

---

## 9. Your Actual Results (Interpretation)

You obtained:

```text
Accuracy: ~0.57 – 0.62
F1 Score: ~0.58 – 0.67
```

---

### What This Means

* Better than random (0.50)
* Model is learning real patterns
* Performance is realistic for stock prediction

---

### Key Observations

* XGBoost performs better in most cases
* Performance varies across stocks
* Sentiment improves prediction quality

---

## 10. Full Data Flow (Important Understanding)

```text
Final Dataset
   ↓
Create Target (UP/DOWN)
   ↓
Prepare Features (X, y)
   ↓
Train-Test Split
   ↓
Train Models
   ↓
Make Predictions
   ↓
Evaluate Performance
```

---

## 11. Key Design Decisions

### Time-Series Handling

* No shuffling
* Maintains real-world order

---

### Binary Classification

* Simplifies prediction problem
* Easier to evaluate

---

### Model Comparison

* Two models used
* Helps justify final choice

---

## 12. Challenges Faced

### 1. Financial Data is Noisy

Solution:

* Added technical + sentiment features

---

### 2. Risk of Data Leakage

Solution:

* Used sequential split

---

### 3. Model Performance Variation

Solution:

* Used multiple models

---

## 13. What You Achieved

You built a system that can:

* Analyze stock trends
* Use news sentiment
* Predict market direction
* Evaluate prediction quality

---

## 14. Current Capability

Your system can now:

```text
Take historical data → Predict next-day movement
```

This is a complete ML pipeline.

---

## 15. What Is Missing (Next Step)

To improve further:

* Add more features (lag, rolling averages)
* Improve accuracy
* Add feature importance
* Explain predictions

---

## 16. Final Understanding

This phase converts your project from:

```text
Data Processing System
```

to:

```text
Prediction System
```

---

## 17. Next Phase Direction

You will now focus on:

* Improving model accuracy
* Understanding model decisions
* Building explainable AI system

---

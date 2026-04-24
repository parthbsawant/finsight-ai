# Phase 3: NLP, Sentiment Analysis, and Event Intelligence Integration

## 1. Objective

The objective of this phase is to enhance the financial dataset by incorporating Natural Language Processing (NLP) and Deep Learning (DL) techniques. This phase transforms raw textual data into meaningful numerical signals that can be used for machine learning.

The system is extended to:

* Understand financial news content
* Extract meaningful entities and events
* Compute sentiment using a domain-specific deep learning model
* Integrate textual intelligence into structured stock data

---

## 2. Transition from Phase 2 to Phase 3

At the end of Phase 2, the dataset contained:

* Stock market features (technical indicators)
* News activity (news_count)
* Placeholder sentiment values (all zeros)

Phase 3 replaces the placeholder sentiment with **real, model-driven sentiment values** and adds contextual understanding of news.

---

## 3. Phase 3 Pipeline Overview

The Phase 3 pipeline processes textual data through multiple stages:

Raw Headlines → NLP Processing → Sentiment Analysis → Event Extraction → Aggregation → Dataset Integration

---

## 4. NLP Processing using spaCy

### 4.1 Objective

To extract structured information from unstructured text using Named Entity Recognition (NER).

---

### 4.2 Method

* Loaded pre-trained spaCy model: en_core_web_sm
* Processed each headline
* Extracted entities such as:

  * Organizations (companies)
  * Monetary values
  * Dates
  * Locations

---

### 4.3 Optimization

* Used batch processing (`nlp.pipe`) to improve performance
* Reduced execution time significantly compared to single-line processing

---

### 4.4 Output

File generated:

backend/data/processed/news_with_entities.csv

New column added:

* entities: list of extracted entities per headline

---

## 5. Sentiment Analysis using FinBERT

### 5.1 Objective

To compute sentiment scores for financial news using a deep learning model trained specifically for financial text.

---

### 5.2 Model Used

* FinBERT (from HuggingFace: ProsusAI/finbert)

---

### 5.3 Method

For each headline:

1. Tokenize text
2. Pass through FinBERT model
3. Obtain probability distribution:

   * Negative
   * Neutral
   * Positive
4. Convert to numerical score:

sentiment_score = (positive probability - negative probability)

---

### 5.4 Output

File generated:

backend/data/processed/news_with_sentiment.csv

New column:

* sentiment_score (continuous value between -1 and +1)

---

### 5.5 Observations

* This step is computationally intensive
* Processing large datasets requires optimization (batching, GPU)

---

## 6. Event Extraction (Rule-Based)

### 6.1 Objective

To identify key financial events from news headlines.

---

### 6.2 Method

Used keyword-based classification to detect events:

* earnings: earnings, profit, revenue
* loss: loss, decline, drop
* growth: growth, increase, rise
* acquisition: acquire, merger, deal

---

### 6.3 Output

File generated:

backend/data/processed/news_with_events.csv

New column:

* event (categorical feature)

---

## 7. Daily Aggregation of News Data

### 7.1 Objective

To convert headline-level data into daily-level features.

---

### 7.2 Method

Grouped data by date and computed:

* Average sentiment score per day
* Number of headlines per day (news_count)

---

### 7.3 Output

File generated:

backend/data/processed/news_daily.csv

Structure:

* date
* sentiment_score (mean)
* news_count

---

## 8. Final Dataset Integration

### 8.1 Objective

To merge textual intelligence with stock data.

---

### 8.2 Method

* Loaded feature-engineered stock dataset
* Loaded aggregated news dataset
* Merged on date
* Filled missing values

---

### 8.3 Output

Final datasets:

backend/data/final/

Each file contains:

* date
* open, high, low, close, volume
* returns
* rsi
* macd
* volatility
* news_count
* sentiment_score

---

## 9. Data Flow Summary

Stock Data → Feature Engineering
News Data → NLP → Sentiment → Events → Aggregation

→ Merge → Final ML Dataset

---

## 10. Key Design Decisions

### 10.1 Use of FinBERT

Chosen because:

* Domain-specific model for financial sentiment
* Higher accuracy than general NLP models

---

### 10.2 Batch Processing in NLP

Used `nlp.pipe` to:

* Improve speed
* Handle large datasets efficiently

---

### 10.3 Daily Aggregation Strategy

Converted multiple headlines into:

* Single sentiment score per day

This aligns with stock data frequency.

---

### 10.4 Modular Pipeline

Each step is implemented as a separate script:

* nlp_processing.py
* sentiment_finbert.py
* event_extraction.py
* update_sentiment_scores.py
* merge_datasets.py

This ensures:

* maintainability
* scalability
* easier debugging

---

## 11. Challenges and Solutions

### Challenge 1: Slow NLP processing

Solution: Batch processing with spaCy

### Challenge 2: Heavy DL inference

Solution: Sequential processing (future optimization possible)

### Challenge 3: Incorrect merging logic

Solution: Used aggregated dataset directly

### Challenge 4: Data consistency

Solution: Standardized date formats across all datasets

---

## 12. Outcome of Phase 3

* NLP pipeline successfully implemented
* Deep learning sentiment model integrated
* Event extraction added
* Real sentiment values generated
* Final dataset enriched with textual intelligence

---

## 13. Current System Capability

The system can now:

* Analyze stock price trends
* Interpret financial news
* Quantify market sentiment
* Detect key financial events
* Combine all signals into a unified dataset

---

## 14. Next Phase

Phase 4 will focus on:

* Machine learning model development
* Prediction tasks (price movement, trend classification)
* Model evaluation and comparison
* Feature importance and explainability

---

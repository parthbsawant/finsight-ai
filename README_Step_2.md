# Phase 2: Data Preprocessing, Feature Engineering, and Dataset Merging

## 1. Objective

The objective of this phase is to transform raw datasets into a clean, structured, and machine learning-ready format. This phase focuses on:

* Cleaning inconsistencies in raw data
* Standardizing formats across datasets
* Extracting meaningful features
* Integrating multiple data sources into a unified dataset

This phase is the foundation of the machine learning pipeline and directly impacts model performance and reliability.

---

## 2. Overview of Processing Pipeline

The data transformation pipeline consists of the following stages:

Raw Data → Data Cleaning → Data Transformation → Feature Engineering → Dataset Merging → Final ML Dataset

---

## 3. Stock Data Preprocessing

### 3.1 Problem

The stock dataset obtained via yfinance contains:

* Multi-level headers (Price, Ticker rows)
* Mixed formatting
* Additional unnecessary columns (e.g., Adj Close)

---

### 3.2 Steps Performed

* Skipped extra header rows
* Standardized column names to lowercase
* Removed unnecessary columns
* Converted date column to datetime format
* Sorted data chronologically
* Removed null values

---

### 3.3 Output

Processed stock files stored in:

backend/data/processed/stock/

Each file contains:

* date
* open
* high
* low
* close
* volume

---

## 4. News Data Preprocessing

### 4.1 Problem

The news dataset contains:

* 25 headlines per row (Top1 to Top25)
* Non-standard date format (DD-MM-YYYY)

---

### 4.2 Steps Performed

* Converted wide format (Top1–Top25) into long format
* Extracted each headline into a separate row
* Renamed columns for consistency
* Converted date format using day-first parsing
* Removed null headlines

---

### 4.3 Output

Processed file:

backend/data/processed/news.csv

Structure:

* date
* headline

---

## 5. Sentiment Dataset Preprocessing

### 5.1 Problem

The sentiment dataset contains:

* Non-UTF8 encoding (latin1)
* Mixed formatting in some rows

---

### 5.2 Steps Performed

* Loaded dataset using correct encoding (latin1)
* Standardized column names
* Mapped sentiment labels to numerical values:

  * positive → 1
  * neutral → 0
  * negative → -1
* Removed invalid or missing entries

---

### 5.3 Output

Processed file:

backend/data/processed/sentiment.csv

Structure:

* sentiment
* sentence
* label

---

## 6. Feature Engineering

### 6.1 Objective

Enhance stock data by generating additional features that capture market behavior and trends.

---

### 6.2 Features Generated

#### Returns

* Percentage change in closing price

#### RSI (Relative Strength Index)

* Measures momentum of price movement

#### MACD (Moving Average Convergence Divergence)

* Captures trend direction

#### Volatility

* Rolling standard deviation of returns

---

### 6.3 Tools Used

* ta (technical analysis library)

---

### 6.4 Steps Performed

* Calculated returns from close price
* Generated RSI indicator
* Computed MACD values
* Calculated rolling volatility
* Removed rows with insufficient data (NaN values)

---

### 6.5 Output

Feature-enhanced datasets stored in:

backend/data/features/

---

## 7. Dataset Merging

### 7.1 Objective

Combine stock features with news-based information to create a unified dataset.

---

### 7.2 Steps Performed

* Loaded processed news dataset
* Aggregated headlines per date:

  * Count of headlines (news_count)
* Assigned placeholder sentiment score (0)
* Merged stock data with aggregated news data using date
* Filled missing values with default values

---

### 7.3 Output

Final datasets stored in:

backend/data/final/

Each file contains:

* date
* open
* high
* low
* close
* volume
* returns
* rsi
* macd
* volatility
* news_count
* sentiment_score

---

## 8. Data Flow Summary

Stock Data → Clean → Feature Engineering
News Data → Transform → Aggregate
Sentiment Data → Encode

→ Merge All Sources → Final ML Dataset

---

## 9. Key Design Decisions

### 9.1 Use of Placeholder Sentiment

A temporary sentiment score (0) is used because:

* Sentiment model is not yet implemented
* Will be replaced in Phase 3 using NLP and DL models

---

### 9.2 Modular Processing

Each dataset is processed independently to:

* Improve maintainability
* Enable debugging
* Support scalability

---

### 9.3 Feature-Driven Approach

Focus on extracting meaningful features rather than raw data to improve model performance.

---

## 10. Challenges and Solutions

### Challenge 1: Multi-header stock data

Solution: Skipped initial rows and standardized columns

### Challenge 2: Date format mismatch

Solution: Used day-first parsing

### Challenge 3: Encoding issues

Solution: Loaded data using latin1 encoding

### Challenge 4: Complex news structure

Solution: Flattened dataset using melt operation

---

## 11. Outcome of Phase 2

* Clean and structured datasets created
* Technical indicators successfully generated
* Multi-source data successfully merged
* Machine learning-ready dataset prepared

---

## 12. Next Phase

Phase 3 will focus on:

* NLP pipeline implementation (spaCy)
* Named Entity Recognition (NER)
* Event extraction
* Deep learning sentiment analysis (FinBERT)
* Replacing placeholder sentiment scores with real values

---

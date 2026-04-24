# Phase 1: Dataset Collection and Preparation

## 1. Objective

The objective of this phase is to collect, organize, and validate all datasets required to build an AI-driven financial intelligence system. This phase establishes the foundation for all subsequent stages, including preprocessing, feature engineering, machine learning, and model deployment.

The datasets are selected to support:

* Time-series stock analysis
* Natural Language Processing of financial text
* Sentiment analysis using deep learning
* Multi-source feature integration for machine learning models

---

## 2. Dataset Requirements

The system requires three primary types of data:

### 2.1 Market Data

Used for:

* Price trend analysis
* Technical indicator generation
* Machine learning model training

---

### 2.2 Textual Data

Used for:

* Extracting financial events
* Understanding company-related news
* Sentiment-driven feature generation

---

### 2.3 Labeled Sentiment Data

Used for:

* Training deep learning sentiment models
* Improving contextual understanding of financial text

---

## 3. Datasets Used

---

### 3.1 Stock Market Dataset

#### Source

Yahoo Finance (downloaded using yfinance Python library)

#### Stocks Selected

* AAPL (Apple)
* MSFT (Microsoft)
* TSLA (Tesla)
* GOOGL (Google)
* AMZN (Amazon)

#### Time Range

* Historical data (multiple years)

#### Features Included

* Date
* Open price
* High price
* Low price
* Close price
* Volume

#### Purpose

* Core dataset for machine learning models
* Used for movement prediction and risk analysis
* Basis for technical indicator computation

---

### 3.2 Financial News Dataset

#### Dataset Name

Combined News DJIA Dataset

#### Source

Kaggle

#### Structure

* Date column
* Label column (market movement indicator)
* Top1 to Top25 columns (daily headlines)

#### Characteristics

* Each row contains 25 news headlines for a specific date
* Headlines are related to financial and global events

#### Purpose

* Input for NLP pipeline
* Event extraction (mergers, losses, expansions)
* Sentiment aggregation for each trading day

---

### 3.3 Sentiment Dataset

#### Dataset Name

Financial PhraseBank

#### Source

Kaggle

#### Structure

* Sentence (financial text)
* Sentiment label (positive, negative, neutral)

#### Characteristics

* Domain-specific dataset
* Clean and well-labeled financial sentences

#### Purpose

* Training and fine-tuning sentiment analysis models (FinBERT / DistilBERT)
* Generating accurate sentiment scores for financial text

---

### 3.4 Reddit Dataset (Optional Enhancement)

#### Dataset Name

WallStreetBets Dataset

#### Source

Kaggle

#### Structure

* Title
* Content
* Timestamp
* Metadata

#### Characteristics

* Noisy and unstructured user-generated content
* Real-world retail investor sentiment

#### Purpose

* Enhances realism of NLP pipeline
* Provides diverse sentiment signals
* Improves robustness of the system

---

## 4. Folder Structure

The datasets are organized in a structured format to ensure modularity and scalability.

backend/data/raw/

```
stock/
news/
sentiment/
```

---

### Folder Description

#### stock/

Contains historical stock data for selected companies.

#### news/

Contains financial news datasets and optional Reddit data.

#### sentiment/

Contains labeled sentiment datasets for training deep learning models.

---

## 5. Data Collection Methodology

### Stock Data

* Downloaded using yfinance Python library
* Automated script ensures reproducibility

### News Data

* Downloaded from Kaggle
* Extracted from ZIP files and stored locally

### Sentiment Data

* Downloaded from Kaggle
* Used directly for model training

---

## 6. Key Design Decisions

### 6.1 Use of Static Datasets

Instead of relying on real-time APIs, static datasets are used to:

* Avoid API limitations
* Ensure reproducibility
* Enable controlled experimentation

---

### 6.2 Multi-Source Data Integration

The system combines:

* Market data
* News data
* Sentiment data

This improves:

* Prediction accuracy
* Model robustness
* Real-world relevance

---

### 6.3 Limited Initial Stock Selection

A small set of stocks is used initially to:

* Simplify development
* Enable debugging
* Ensure faster experimentation

The system can later be scaled to include more stocks.

---

### 6.4 Simulation-Based Approach

Static data will be used to simulate real-time behavior by:

* Incrementally revealing data over time
* Mimicking live market updates

---

## 7. Data Validation

After downloading, the datasets were validated for:

* Correct file structure
* Presence of required columns
* Data consistency
* Proper formatting

---

## 8. Outcome of Phase 1

* All required datasets successfully collected
* Folder structure established
* Data validated and ready for preprocessing
* Foundation prepared for machine learning pipeline

---

## 9. Next Phase

Phase 2 will focus on:

* Data preprocessing
* Data cleaning
* Feature engineering
* Dataset merging

---

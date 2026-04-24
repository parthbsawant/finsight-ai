import pandas as pd

df = pd.read_csv(
    "backend/data/raw/sentiment/financial_phrasebank.csv",
    encoding="latin1"
)

# Some datasets are formatted as: sentiment, sentence
# Some as: sentence | sentiment → handle both

if df.shape[1] == 2:
    df.columns = ["sentiment", "sentence"]
else:
    # fallback if separator issue
    df = df.iloc[:, 0].str.split(",", n=1, expand=True)
    df.columns = ["sentiment", "sentence"]

mapping = {
    "positive": 1,
    "neutral": 0,
    "negative": -1
}

df["label"] = df["sentiment"].map(mapping)

df.dropna(inplace=True)

df.to_csv("backend/data/processed/sentiment.csv", index=False)

print("Sentiment preprocessing completed.")
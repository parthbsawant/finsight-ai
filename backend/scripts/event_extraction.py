import pandas as pd

df = pd.read_csv("backend/data/processed/news_with_sentiment.csv")

keywords = {
    "earnings": ["earnings", "profit", "revenue"],
    "loss": ["loss", "decline", "drop"],
    "growth": ["growth", "increase", "rise"],
    "acquisition": ["acquire", "merger", "deal"]
}

def detect_event(text):
    text = str(text).lower()
    for event, words in keywords.items():
        for word in words:
            if word in text:
                return event
    return "neutral"

df["event"] = df["headline"].apply(detect_event)

df.to_csv("backend/data/processed/news_with_events.csv", index=False)

print("Event extraction completed.")

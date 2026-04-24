import pandas as pd

df = pd.read_csv("backend/data/processed/news_with_events.csv")
df["date"] = pd.to_datetime(df["date"])

agg = df.groupby("date").agg({
    "sentiment_score": "mean",
    "headline": "count"
}).reset_index()

agg.rename(columns={"headline": "news_count"}, inplace=True)

agg.to_csv("backend/data/processed/news_daily.csv", index=False)

print("Daily aggregation completed.")
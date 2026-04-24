import pandas as pd
import os

stock_path = "backend/data/features"
news_path = "backend/data/processed/news.csv"

news_df = pd.read_csv(news_path)
news_df["date"] = pd.to_datetime(news_df["date"])

# Dummy sentiment score (placeholder)
news_df["sentiment_score"] = 0

news_agg = news_df.groupby("date").agg({
    "headline": "count",
    "sentiment_score": "mean"
}).reset_index()

news_agg.rename(columns={"headline": "news_count"}, inplace=True)

output_path = "backend/data/final"
os.makedirs(output_path, exist_ok=True)

for file in os.listdir(stock_path):
    stock_df = pd.read_csv(os.path.join(stock_path, file))
    stock_df["date"] = pd.to_datetime(stock_df["date"])

    merged = pd.merge(stock_df, news_agg, on="date", how="left")

    merged.fillna(0, inplace=True)

    merged.to_csv(os.path.join(output_path, file), index=False)

print("Merging completed.")
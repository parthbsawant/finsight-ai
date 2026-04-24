import pandas as pd
import os

stock_path = "backend/data/features"
news_path = "backend/data/processed/news_daily.csv"

# Load already aggregated news data
news_df = pd.read_csv(news_path)
news_df["date"] = pd.to_datetime(news_df["date"])

output_path = "backend/data/final"
os.makedirs(output_path, exist_ok=True)

for file in os.listdir(stock_path):
    stock_df = pd.read_csv(os.path.join(stock_path, file))
    stock_df["date"] = pd.to_datetime(stock_df["date"])

    # Merge directly (NO grouping)
    merged = pd.merge(stock_df, news_df, on="date", how="left")

    merged.fillna(0, inplace=True)

    merged.to_csv(os.path.join(output_path, file), index=False)

print("Merging completed.")
import pandas as pd

df = pd.read_csv("backend/data/raw/news/Combined_News_DJIA.csv")

headline_cols = [col for col in df.columns if "Top" in col]

df_melted = df.melt(
    id_vars=["Date"],
    value_vars=headline_cols,
    var_name="news_id",
    value_name="headline"
)

df_melted.dropna(inplace=True)

df_melted.rename(columns={"Date": "date"}, inplace=True)

# FIXED DATE PARSING
df_melted["date"] = pd.to_datetime(df_melted["date"], dayfirst=True)

df_melted.to_csv("backend/data/processed/news.csv", index=False)

print("News preprocessing completed.")
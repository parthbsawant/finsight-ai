import pandas as pd
import os
from ta.momentum import RSIIndicator
from ta.trend import MACD
from ta.volatility import BollingerBands

input_path = "backend/data/processed/stock"
output_path = "backend/data/features"
os.makedirs(output_path, exist_ok=True)

for file in os.listdir(input_path):
    df = pd.read_csv(os.path.join(input_path, file))

    df["date"] = pd.to_datetime(df["date"])

    # Returns
    df["returns"] = df["close"].pct_change()

    # RSI
    df["rsi"] = RSIIndicator(df["close"]).rsi()

    # MACD
    macd = MACD(df["close"])
    df["macd"] = macd.macd()

    # Volatility
    df["volatility"] = df["returns"].rolling(window=10).std()

    df.dropna(inplace=True)

    df.to_csv(os.path.join(output_path, file), index=False)

print("Feature engineering completed.")
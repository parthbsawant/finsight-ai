import pandas as pd
import os

input_path = "backend/data/ml_ready"
output_path = "backend/data/ml_enhanced"
os.makedirs(output_path, exist_ok=True)

for file in os.listdir(input_path):
    df = pd.read_csv(os.path.join(input_path, file))

    # --- ONLY IMPORTANT FEATURES ---
    
    # Lag (keep minimal)
    df["returns_lag_1"] = df["returns"].shift(1)
    df["sentiment_lag_1"] = df["sentiment_score"].shift(1)

    # Rolling (keep only 1 strong)
    df["sentiment_ma_3"] = df["sentiment_score"].rolling(3).mean()

    # Remove NaN
    df.dropna(inplace=True)

    df.to_csv(os.path.join(output_path, file), index=False)

print("Clean feature enhancement completed.")
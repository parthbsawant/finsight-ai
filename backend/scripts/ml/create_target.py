import pandas as pd
import os

input_path = "backend/data/final"
output_path = "backend/data/ml_ready"
os.makedirs(output_path, exist_ok=True)

for file in os.listdir(input_path):
    df = pd.read_csv(os.path.join(input_path, file))

    df["date"] = pd.to_datetime(df["date"])

    # Create target
    df["target"] = (df["close"].shift(-1) > df["close"]).astype(int)

    # Drop last row (no future data)
    df = df[:-1]

    df.to_csv(os.path.join(output_path, file), index=False)

print("Target creation completed.")
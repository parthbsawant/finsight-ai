import pandas as pd
import os

input_path = "backend/data/raw/stock"
output_path = "backend/data/processed/stock"
os.makedirs(output_path, exist_ok=True)

for file in os.listdir(input_path):
    file_path = os.path.join(input_path, file)

    # Skip first 2 rows (multi-header issue)
    df = pd.read_csv(file_path, skiprows=2)

    # Rename columns properly
    df.columns = ["date", "open", "high", "low", "close", "volume"]

    # Convert date
    df["date"] = pd.to_datetime(df["date"])

    # Sort
    df = df.sort_values("date")

    # Drop nulls
    df.dropna(inplace=True)

    df.to_csv(os.path.join(output_path, file), index=False)

print("Stock preprocessing completed.")
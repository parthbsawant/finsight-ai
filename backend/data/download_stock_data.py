import yfinance as yf
import os

# Stocks list
stocks = ["AAPL", "MSFT", "TSLA", "GOOGL", "AMZN"]

# Save path
save_path = "backend/data/raw/stock"

os.makedirs(save_path, exist_ok=True)

for stock in stocks:
    print(f"Downloading {stock}...")
    df = yf.download(stock, start="2015-01-01", end="2024-12-31")
    
    file_path = f"{save_path}/{stock}.csv"
    df.to_csv(file_path)
    
    print(f"Saved: {file_path}")

print("All downloads completed.")
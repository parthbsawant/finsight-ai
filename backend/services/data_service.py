import pandas as pd
import os
from config import Config

def get_stock_data(symbol):
    path = os.path.join(Config.DATA_PATH, f"{symbol}.csv")

    if not os.path.exists(path):
        raise FileNotFoundError(f"{symbol} data not found")

    df = pd.read_csv(path)
    return df
import joblib
import os
from config import Config

def load_model(symbol):
    path = os.path.join(Config.MODEL_PATH, f"{symbol}_xgb.pkl")

    if not os.path.exists(path):
        raise FileNotFoundError(f"{symbol} model not found")

    return joblib.load(path)

def predict(model, X):
    return model.predict(X)[0]
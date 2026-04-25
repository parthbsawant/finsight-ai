import joblib
import os
from config import Config

MODEL_CACHE = {}

def load_model(symbol):
    if symbol in MODEL_CACHE:
        return MODEL_CACHE[symbol]

    path = os.path.join(Config.MODEL_PATH, f"{symbol}_xgb.pkl")

    if not os.path.exists(path):
        raise FileNotFoundError(f"{symbol} model not found")

    model = joblib.load(path)
    MODEL_CACHE[symbol] = model

    return model

def predict(model, X):
    # Ensure feature consistency
    if hasattr(model, "feature_names_in_"):
        X = X[model.feature_names_in_]

    return model.predict(X)[0]
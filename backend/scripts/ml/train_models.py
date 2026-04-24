import pandas as pd
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

input_path = "backend/data/ml_ready"
model_path = "backend/models"
os.makedirs(model_path, exist_ok=True)

results = []

for file in os.listdir(input_path):
    df = pd.read_csv(os.path.join(input_path, file))
    df = df.drop(columns=["date"])

    X = df.drop(columns=["target"])
    y = df["target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, shuffle=False
    )

    # Random Forest
    rf = RandomForestClassifier(n_estimators=200, random_state=42)
    rf.fit(X_train, y_train)

    # XGBoost
    xgb = XGBClassifier(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        eval_metric="logloss",
        random_state=42
    )
    xgb.fit(X_train, y_train)

    # Save models
    name = file.replace(".csv", "")
    joblib.dump(rf, os.path.join(model_path, f"{name}_rf.pkl"))
    joblib.dump(xgb, os.path.join(model_path, f"{name}_xgb.pkl"))

    print(f"{name} models trained and saved.")

print("All models trained.")
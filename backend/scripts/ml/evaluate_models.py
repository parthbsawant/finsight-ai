import pandas as pd
import os

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

input_path = "backend/data/ml_ready"

def evaluate(name, y_true, y_pred):
    print(f"\n{name}")
    print("Accuracy :", accuracy_score(y_true, y_pred))
    print("Precision:", precision_score(y_true, y_pred))
    print("Recall   :", recall_score(y_true, y_pred))
    print("F1 Score :", f1_score(y_true, y_pred))

for file in os.listdir(input_path):
    df = pd.read_csv(os.path.join(input_path, file))
    df = df.drop(columns=["date"])

    X = df.drop(columns=["target"])
    y = df["target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, shuffle=False
    )

    rf = RandomForestClassifier(n_estimators=200, random_state=42)
    rf.fit(X_train, y_train)

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

    rf_pred = rf.predict(X_test)
    xgb_pred = xgb.predict(X_test)

    print(f"\n===== {file} =====")
    evaluate("Random Forest", y_test, rf_pred)
    evaluate("XGBoost", y_test, xgb_pred)

print("\nEvaluation completed.")
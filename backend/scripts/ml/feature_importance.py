import pandas as pd
import os
import matplotlib.pyplot as plt
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split

input_path = "backend/data/ml_enhanced"
output_path = "backend/models/feature_importance"
os.makedirs(output_path, exist_ok=True)

for file in os.listdir(input_path):
    df = pd.read_csv(os.path.join(input_path, file))
    df = df.drop(columns=["date"])

    X = df.drop(columns=["target"])
    y = df["target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, shuffle=False
    )

    model = XGBClassifier(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        eval_metric="logloss"
    )

    model.fit(X_train, y_train)

    importance = model.feature_importances_

    importance_df = pd.DataFrame({
        "feature": X.columns,
        "importance": importance
    }).sort_values(by="importance", ascending=False)

    # Save CSV
    name = file.replace(".csv", "")
    importance_df.to_csv(os.path.join(output_path, f"{name}_importance.csv"), index=False)

    # Plot
    plt.figure(figsize=(10, 6))
    plt.barh(importance_df["feature"], importance_df["importance"])
    plt.gca().invert_yaxis()
    plt.title(f"Feature Importance - {name}")
    plt.xlabel("Importance")
    plt.tight_layout()

    # Save graph
    plt.savefig(os.path.join(output_path, f"{name}_importance.png"))
    plt.close()

    print(f"{name} feature importance saved.")

print("Feature importance analysis completed.")
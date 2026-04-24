import pandas as pd
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv("backend/data/ml_ready/AAPL.csv")

# Drop non-usable columns
df = df.drop(columns=["date"])

# Features and target
X = df.drop(columns=["target"])
y = df["target"]

# Train-test split (ADD THIS HERE)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, shuffle=False
)

print("Features shape:", X.shape)
print("Target shape:", y.shape)

print("Train size:", len(X_train))
print("Test size:", len(X_test))
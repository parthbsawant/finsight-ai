import pandas as pd
import joblib

# Load model
model = joblib.load("backend/models/AAPL_xgb.pkl")

# Load data
df = pd.read_csv("backend/data/ml_enhanced/AAPL.csv")

# Latest row
latest = df.iloc[-1:]
# X = latest.drop(columns=["date", "target"])
X = latest.drop(columns=["date", "target", "open", "high", "low", "close"])

prediction = model.predict(X)[0]

print("\nPrediction:", "UP" if prediction == 1 else "DOWN")

# Feature importance
importance = model.feature_importances_
features = X.columns

importance_df = pd.DataFrame({
    "feature": features,
    "importance": importance
}).sort_values(by="importance", ascending=False)

top_features = importance_df.head(5)

print("\nTop Influencing Features:")
print(top_features)

print("\nExplanation:")

for _, row in top_features.iterrows():
    feature = row["feature"]
    value = X.iloc[0][feature]

    if feature == "rsi":
        if value > 70:
            print(f"- RSI is {value:.2f} (overbought), indicating possible price drop")
        elif value < 30:
            print(f"- RSI is {value:.2f} (oversold), indicating possible price rise")
        else:
            print(f"- RSI is {value:.2f}, neutral momentum")

    elif "sentiment" in feature:
        if value > 0:
            print(f"- Positive sentiment ({value:.2f}) supports upward movement")
        elif value < 0:
            print(f"- Negative sentiment ({value:.2f}) indicates bearish signal")
        else:
            print(f"- Neutral sentiment, no strong signal")

    elif feature == "volatility":
        print(f"- Volatility at {value:.4f} indicates market uncertainty")

    elif feature == "volume":
        print(f"- Volume is {int(value)}, showing trading activity strength")

    elif feature == "news_count":
        if value == 0:
            print("- No major news events impacting the market")
        else:
            print(f"- {int(value)} news articles influenced market sentiment")

    else:
        print(f"- {feature} = {value:.4f} influenced the model")
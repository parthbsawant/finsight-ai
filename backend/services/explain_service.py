def generate_explanation(X, importance_df):
    explanation = []

    for _, row in importance_df.head(5).iterrows():
        feature = row["feature"]
        value = X.iloc[0].get(feature, 0)

        if feature == "rsi":
            if value > 70:
                explanation.append(f"RSI {value:.2f} indicates overbought condition")
            elif value < 30:
                explanation.append(f"RSI {value:.2f} indicates oversold condition")
            else:
                explanation.append(f"RSI {value:.2f} is neutral")

        elif "sentiment" in feature:
            if value > 0:
                explanation.append("Positive sentiment supports upward movement")
            elif value < 0:
                explanation.append("Negative sentiment indicates bearish trend")
            else:
                explanation.append("Neutral sentiment, no strong signal")

        elif feature == "news_count":
            if value == 0:
                explanation.append("No major news events impacting the market")
            else:
                explanation.append(f"{int(value)} news articles influencing the market")

        elif feature == "volatility":
            explanation.append(f"Volatility at {value:.4f} indicates market uncertainty")

        elif feature == "volume":
            explanation.append(f"Volume is {int(value)}, indicating trading activity")

        else:
            explanation.append(f"{feature} = {value:.4f} influenced prediction")

    return explanation
from flask import Blueprint, jsonify
import pandas as pd

from services.data_service import get_stock_data
from services.model_service import load_model, predict
from services.explain_service import generate_explanation

from models.db_models import db, Prediction

prediction_bp = Blueprint("prediction", __name__)

@prediction_bp.route("/predict/<symbol>", methods=["GET"])
def predict_stock(symbol):
    symbol = symbol.upper()

    df = get_stock_data(symbol)
    model = load_model(symbol)

    latest = df.iloc[-1:]

    # IMPORTANT: match training features
    X = latest.drop(columns=["date", "target", "open", "high", "low", "close"], errors="ignore")

    pred = predict(model, X)

    importance_df = pd.DataFrame({
        "feature": X.columns,
        "importance": model.feature_importances_
    }).sort_values(by="importance", ascending=False)

    explanation = generate_explanation(X, importance_df)

    # -----------------------------
    # SAVE TO DATABASE
    # -----------------------------
    record = Prediction(
        symbol=symbol,
        prediction="UP" if pred == 1 else "DOWN",
        confidence=float(max(model.predict_proba(X)[0])),  # optional
        rsi=float(X["rsi"].iloc[0]) if "rsi" in X.columns else None,
        volatility=float(X["volatility"].iloc[0]) if "volatility" in X.columns else None,
        sentiment_score=float(X["sentiment_score"].iloc[0]) if "sentiment_score" in X.columns else None,
        news_count=int(X["news_count"].iloc[0]) if "news_count" in X.columns else None,
    )

    db.session.add(record)
    db.session.commit()

    return jsonify({
        "symbol": symbol,
        "prediction": record.prediction,
        "confidence": record.confidence,
        "features": X.iloc[0].to_dict(),
        "explanation": explanation
    })
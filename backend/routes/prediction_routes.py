from flask import Blueprint, jsonify
import pandas as pd

from services.data_service import get_stock_data
from services.model_service import load_model, predict
from services.explain_service import generate_explanation

prediction_bp = Blueprint("prediction", __name__)

@prediction_bp.route("/predict/<symbol>", methods=["GET"])
def predict_stock(symbol):
    try:
        symbol = symbol.upper()

        # Load data + model
        df = get_stock_data(symbol)
        model = load_model(symbol)

        # Latest row
        latest = df.iloc[-1:]

        # EXACT features used during training
        X = latest.drop(columns=[
            "date", "target", "open", "high", "low", "close"
        ])

        # Prediction
        pred = predict(model, X)

        # Feature importance
        importance_df = pd.DataFrame({
            "feature": X.columns,
            "importance": model.feature_importances_
        }).sort_values(by="importance", ascending=False)

        # Explanation
        explanation = generate_explanation(X, importance_df)

        return jsonify({
            "symbol": symbol,
            "prediction": "UP" if pred == 1 else "DOWN",
            "confidence_top_features": importance_df.head(5).to_dict(orient="records"),
            "features": X.iloc[0].to_dict(),
            "explanation": explanation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400
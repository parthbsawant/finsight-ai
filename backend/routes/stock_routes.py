from flask import Blueprint, jsonify
from services.data_service import get_stock_data

stock_bp = Blueprint("stock", __name__)

@stock_bp.route("/stock/<symbol>", methods=["GET"])
def get_stock(symbol):
    try:
        df = get_stock_data(symbol.upper())

        return jsonify({
            "symbol": symbol.upper(),
            "data": df.tail(100).to_dict(orient="records")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400
from flask import Blueprint, jsonify
from models.db_models import Prediction, db
from sqlalchemy import func
from services.db_service import (
    get_stock_analytics,
    get_trends,
    get_recent
)

advanced_analytics_bp = Blueprint("advanced_analytics", __name__)

@advanced_analytics_bp.route("/analytics/summary", methods=["GET"])
def analytics_summary():
    total = Prediction.query.count()
    up_count = Prediction.query.filter_by(prediction="UP").count()
    down_count = Prediction.query.filter_by(prediction="DOWN").count()

    avg_confidence = db.session.query(func.avg(Prediction.confidence)).scalar()

    return jsonify({
        "total_predictions": total,
        "up_predictions": up_count,
        "down_predictions": down_count,
        "avg_confidence": round(avg_confidence, 4) if avg_confidence else 0
    })


@advanced_analytics_bp.route("/analytics/stock/<symbol>", methods=["GET"])
def stock_analytics(symbol):
    symbol = symbol.upper()

    total = Prediction.query.filter_by(symbol=symbol).count()
    up_count = Prediction.query.filter_by(symbol=symbol, prediction="UP").count()
    down_count = Prediction.query.filter_by(symbol=symbol, prediction="DOWN").count()

    avg_confidence = db.session.query(func.avg(Prediction.confidence)).filter(
        Prediction.symbol == symbol
    ).scalar()

    latest = Prediction.query.filter_by(symbol=symbol).order_by(
        Prediction.created_at.desc()
    ).first()

    # return jsonify({
    #     "symbol": symbol,
    #     "total_predictions": total,
    #     "up_predictions": up_count,
    #     "down_predictions": down_count,
    #     "avg_confidence": round(avg_confidence, 4) if avg_confidence else 0,
    #     "latest_prediction": latest.to_dict() if latest else None
    # })

    return jsonify(get_stock_analytics(symbol.upper()))


@advanced_analytics_bp.route("/analytics/trends", methods=["GET"])
def prediction_trends():
    trends = db.session.query(
        func.date(Prediction.created_at).label("date"),
        Prediction.prediction,
        func.count(Prediction.id).label("count")
    ).group_by(
        func.date(Prediction.created_at),
        Prediction.prediction
    ).order_by(
        func.date(Prediction.created_at)
    ).all()

    data = []
    for row in trends:
        data.append({
            "date": str(row.date),
            "prediction": row.prediction,
            "count": row.count
        })

    # return jsonify({
    #     "data": data
    # })
    return jsonify({"data": get_trends()})

@advanced_analytics_bp.route("/analytics/recent", methods=["GET"])
def recent_predictions():
    records = Prediction.query.order_by(Prediction.created_at.desc()).limit(10).all()

    # return jsonify({
    #     "count": len(records),
    #     "data": [r.to_dict() for r in records]
    # })
    data = get_recent()

    return jsonify({
        "count": len(data),
        "data": data
    })
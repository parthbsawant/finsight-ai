from backend.models.db_models import db, Prediction
from sqlalchemy import func


# -----------------------------
# CREATE (Save Prediction)
# -----------------------------
def save_prediction(symbol, prediction, confidence, X):
    record = Prediction(
        symbol=symbol,
        prediction=prediction,
        confidence=confidence,
        rsi=float(X.get("rsi", 0)),
        volatility=float(X.get("volatility", 0)),
        sentiment_score=float(X.get("sentiment_score", 0)),
        news_count=int(X.get("news_count", 0))
    )

    db.session.add(record)
    db.session.commit()

    return record


# -----------------------------
# READ (History)
# -----------------------------
def get_all_history():
    records = Prediction.query.order_by(Prediction.created_at.desc()).all()
    return [r.to_dict() for r in records]


def get_history_by_symbol(symbol):
    records = Prediction.query.filter_by(symbol=symbol).order_by(
        Prediction.created_at.desc()
    ).all()
    return [r.to_dict() for r in records]


# -----------------------------
# ANALYTICS (Basic)
# -----------------------------
def get_basic_analytics():
    total = Prediction.query.count()
    up = Prediction.query.filter_by(prediction="UP").count()
    down = Prediction.query.filter_by(prediction="DOWN").count()

    avg_conf = db.session.query(func.avg(Prediction.confidence)).scalar()

    return {
        "total_predictions": total,
        "up_predictions": up,
        "down_predictions": down,
        "avg_confidence": round(avg_conf, 4) if avg_conf else 0
    }


# -----------------------------
# ANALYTICS (Advanced)
# -----------------------------
def get_stock_analytics(symbol):
    total = Prediction.query.filter_by(symbol=symbol).count()
    up = Prediction.query.filter_by(symbol=symbol, prediction="UP").count()
    down = Prediction.query.filter_by(symbol=symbol, prediction="DOWN").count()

    avg_conf = db.session.query(func.avg(Prediction.confidence)).filter(
        Prediction.symbol == symbol
    ).scalar()

    latest = Prediction.query.filter_by(symbol=symbol).order_by(
        Prediction.created_at.desc()
    ).first()

    return {
        "symbol": symbol,
        "total_predictions": total,
        "up_predictions": up,
        "down_predictions": down,
        "avg_confidence": round(avg_conf, 4) if avg_conf else 0,
        "latest_prediction": latest.to_dict() if latest else None
    }


def get_trends():
    trends = db.session.query(
        func.date(Prediction.created_at).label("date"),
        Prediction.prediction,
        func.count(Prediction.id).label("count")
    ).group_by(
        func.date(Prediction.created_at),
        Prediction.prediction
    ).all()

    return [
        {
            "date": str(row.date),
            "prediction": row.prediction,
            "count": row.count
        }
        for row in trends
    ]


def get_recent(limit=10):
    records = Prediction.query.order_by(
        Prediction.created_at.desc()
    ).limit(limit).all()

    return [r.to_dict() for r in records]

def get_analytics():
    total = Prediction.query.count()
    
    if total == 0:
        return {
            "total_predictions": 0,
            "up_predictions": 0,
            "down_predictions": 0,
            "avg_confidence": 0
        }

    up = Prediction.query.filter_by(prediction="UP").count()
    down = Prediction.query.filter_by(prediction="DOWN").count()

    avg_conf = db.session.query(func.avg(Prediction.confidence)).scalar()

    return {
        "total_predictions": total,
        "up_predictions": up,
        "down_predictions": down,
        "avg_confidence": round(avg_conf or 0, 4)
    }
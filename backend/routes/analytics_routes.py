from flask import Blueprint, jsonify
from models.db_models import Prediction, db
from sqlalchemy import func

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/analytics", methods=["GET"])
def get_analytics():
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
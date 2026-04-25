from flask import Blueprint, jsonify
from backend.models.db_models import Prediction, db
from sqlalchemy import func
# from services.db_service import get_basic_analytics
from backend.services.db_service import get_basic_analytics
analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/analytics", methods=["GET"])
# def get_analytics():
#     total = Prediction.query.count()

#     up_count = Prediction.query.filter_by(prediction="UP").count()
#     down_count = Prediction.query.filter_by(prediction="DOWN").count()

#     avg_confidence = db.session.query(func.avg(Prediction.confidence)).scalar()

#     return jsonify(get_basic_analytics())

@analytics_bp.route("/analytics", methods=["GET"])
def get_analytics():
    try:
        return jsonify(get_basic_analytics())
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Analytics failed"
        }), 500
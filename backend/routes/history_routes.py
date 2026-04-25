from flask import Blueprint, jsonify
from models.db_models import Prediction

history_bp = Blueprint("history", __name__)

@history_bp.route("/history", methods=["GET"])
def get_history():
    records = Prediction.query.order_by(Prediction.created_at.desc()).all()

    return jsonify({
        "count": len(records),
        "data": [r.to_dict() for r in records]
    })
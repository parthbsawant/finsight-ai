from flask import Blueprint, jsonify
# from services.db_service import get_all_history
from backend.services.db_service import get_all_history
history_bp = Blueprint("history", __name__)

@history_bp.route("/history", methods=["GET"])
def get_history():
    data = get_all_history()   # ✅ THIS LINE MUST BE ACTIVE

    return jsonify({
        "count": len(data),
        "data": data
    })
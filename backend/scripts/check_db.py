import sys
sys.path.append("backend")

from app import app
from models.db_models import Prediction

with app.app_context():
    records = Prediction.query.all()
    for r in records:
        print(r.to_dict())
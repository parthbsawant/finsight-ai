from flask import Flask
from flask_cors import CORS
from config import Config
from models.db_models import db

from routes.stock_routes import stock_bp
from routes.prediction_routes import prediction_bp
from routes.history_routes import history_bp
from routes.analytics_routes import analytics_bp
from routes.advanced_analytics_routes import advanced_analytics_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.create_all()

CORS(app)

app.register_blueprint(stock_bp)
app.register_blueprint(prediction_bp)
app.register_blueprint(history_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(advanced_analytics_bp)

@app.route("/")
def home():
    return {
        "message": "Finsight AI Backend Running",
        "available_routes": {
            "stock_data": "/stock/<symbol>",
            "prediction": "/predict/<symbol>"
        }
    }

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"])
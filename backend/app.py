from flask import Flask
from flask_cors import CORS
from config import Config

from routes.stock_routes import stock_bp
from routes.prediction_routes import prediction_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

app.register_blueprint(stock_bp)
app.register_blueprint(prediction_bp)

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
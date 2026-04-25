from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    symbol = db.Column(db.String(10), nullable=False)
    prediction = db.Column(db.String(10), nullable=False)

    confidence = db.Column(db.Float, nullable=True)

    rsi = db.Column(db.Float)
    volatility = db.Column(db.Float)
    sentiment_score = db.Column(db.Float)
    news_count = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "symbol": self.symbol,
            "prediction": self.prediction,
            "confidence": self.confidence,
            "rsi": self.rsi,
            "volatility": self.volatility,
            "sentiment_score": self.sentiment_score,
            "news_count": self.news_count,
            "created_at": self.created_at
        }
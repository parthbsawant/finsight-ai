import os

class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    # Data paths
    DATA_PATH = os.path.join(BASE_DIR, "data/ml_enhanced")
    MODEL_PATH = os.path.join(BASE_DIR, "models")
    FEATURE_PATH = os.path.join(BASE_DIR, "models/feature_importance")

    # Database (future use)
    DB_PATH = os.path.join(BASE_DIR, "database.db")
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    DEBUG = True
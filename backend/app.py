from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import api

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for the frontend origin (typically localhost:5173 for Vite)
    CORS(app)
    
    db.init_app(app)
    
    with app.app_context():
        # This will create tables if they don't exist
        db.create_all()
        
    app.register_blueprint(api, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)

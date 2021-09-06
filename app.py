from flask import Flask, Blueprint
from flask_mongoengine import MongoEngine
from flask_restful import Api
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS

from api import dev

# dotenv
load_dotenv(find_dotenv())

# App config && DB
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# app.config['SECRET_KEY'] = '123'
# app.config["MONGODB_SETTINGS"] = {
#     "db": os.environ.get("DBNAME"),
# }
# db = MongoEngine(app)

api_bp = Blueprint("api", __name__)
api = Api(api_bp)


# Routes
api.add_resource(dev.RESTWatchlists, "/watchlists")
api.add_resource(dev.RESTWatchlist, "/watchlists/<int:watchlist_id>")
api.add_resource(dev.RESTNewColumnData, "/newcolumndata")
api.add_resource(dev.RESTWatchlistColumns, "/columns/<int:watchlist_id>")

# Register Routes
app.register_blueprint(api_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True, use_debugger=True, use_reloader=True)

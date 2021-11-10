from flask import Flask, Blueprint
from flask_mongoengine import MongoEngine
from flask_restful import Api
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS

from api import dev
from api import comparisons

# dotenv
load_dotenv(find_dotenv())

# App config && DB
app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {
    "host": os.environ.get("MONGO_URI"),
}
db = MongoEngine(app)

api_bp = Blueprint("api", __name__)
api = Api(api_bp)

# Routes
# watchlist
api.add_resource(dev.RESTWatchlists, "/watchlists")
api.add_resource(dev.RESTWatchlist, "/watchlists/<watchlist_id>")
api.add_resource(dev.RESTNewColumnData, "/newcolumndata")
api.add_resource(dev.RESTWatchlistColumns, "/columns/<watchlist_id>")

# comparisons
api.add_resource(comparisons.RESTComparisons, "/comparisons")

# users
api.add_resource(dev.RESTUsers, "/users")

# Register Routes
app.register_blueprint(api_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(
        debug=os.environ.get("DEV") == "True",
        use_debugger=os.environ.get("DEV") == "True",
        use_reloader=os.environ.get("DEV") == "True",
        port=os.environ.get("API_PORT"),
    )

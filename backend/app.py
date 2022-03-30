from flask import Flask, Blueprint
from flask_mongoengine import MongoEngine
from flask_restful import Api
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS

from api import watchlists
from api import comparisons
from api import heatmap
from api import price_history
from api import fundamentals

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
# watchlists
# api.add_resource(watchlists.RESTWatchlists, "/watchlists")
api.add_resource(watchlists.RESTWatchlistColumns, "/watchlists/columns")
# api.add_resource(watchlists.RESTNewColumnData, "/newcolumndata")

# comparisons
api.add_resource(comparisons.RESTComparisons, "/comparisons")

# heatmap
api.add_resource(heatmap.RESTHeatmap, "/heatmap")

# users
# api.add_resource(dev.RESTUsers, "/users")

# price history graph
api.add_resource(price_history.RESTPriceHistory, "/ticker/<ticker>")

# fundamental data
api.add_resource(fundamentals.RESTFundamentalData, "/fundamentals/<ticker>")

# Register Routes
app.register_blueprint(api_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(
        debug=os.environ.get("DEV") == "True",
        use_debugger=os.environ.get("DEV") == "True",
        use_reloader=os.environ.get("DEV") == "True",
        port=os.environ.get("API_PORT"),
    )

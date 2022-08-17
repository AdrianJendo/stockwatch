from flask import Flask, Blueprint
from flask_mongoengine import MongoEngine
from flask_restful import Api
import os
from dotenv import load_dotenv, find_dotenv
from flask_sqlalchemy import SQLAlchemy

# dotenv
load_dotenv(find_dotenv())

# App config && DB
app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {
    "host": os.environ.get("MONGO_URI"),
}
mongo_db = MongoEngine(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("POSTGRES_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

postgres_db = SQLAlchemy(app)

api_bp = Blueprint("api", __name__)
api = Api(api_bp)

from api import (
    watchlists,
    comparisons,
    heatmap,
    price_history,
    fundamentals,
    technical_screener,
    daily_prices,
    register,
    login,
)

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

# technical screener
api.add_resource(technical_screener.RESTTechnicalScreener, "/technical_screener")

# daily price movements
api.add_resource(daily_prices.RESTDailyPrices, "/daily_prices")

# auth
api.add_resource(register.RESTRegister, "/register")
api.add_resource(login.RESTLogin, "/login")

# Register Routes
app.register_blueprint(api_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(
        debug=os.environ.get("DEV") == "True",
        use_debugger=os.environ.get("DEV") == "True",
        use_reloader=os.environ.get("DEV") == "True",
        port=os.environ.get("API_PORT"),
    )

from flask import Flask, Blueprint
from flask_mongoengine import MongoEngine

import os
from dotenv import load_dotenv, find_dotenv

# dotenv
load_dotenv(find_dotenv())

# App config && DB
app = Flask(__name__)
# app.config['SECRET_KEY'] = '123'
app.config["MONGODB_SETTINGS"] = {
    "db": os.environ.get("DBNAME"),
}
db = MongoEngine(app)


if __name__ == "__main__":
    app.run(debug=True)

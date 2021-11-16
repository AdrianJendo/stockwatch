from flask import jsonify, request
from flask_restful import Resource
from datetime import date, timedelta
import requests
import json
import pdb
import os
import pandas as pd

finnhub_url = os.environ.get("finnhub_url")
api_key = os.environ.get("finnhub_key")

# /fundamentals/:ticker
class RESTFundamentalData(Resource):
    def get(self, ticker):
        x = requests.get(
            finnhub_url, params={"symbol": ticker, "token": api_key}
        ).json()
        startDate = json.loads(request.args.get("startDate"))
        endDate = json.loads(request.args.get("endDate", date.today().strftime("%Y")))
        if not startDate:
            return "No start date"
        elif startDate > endDate:
            return "Start date greater than end date"
        # Care about year, endDate, report
        df = pd.DataFrame(x["data"])
        df["endDate"] = df["endDate"].apply(lambda x: x[0:10])
        df2 = pd.DataFrame(json.loads(df["report"].to_json(orient="records")))
        df2["endDate"] = df["endDate"]
        df2["year"] = df["year"]
        df2 = df2.loc[df2["year"] >= startDate]
        df2 = df2.loc[df2["year"] <= endDate]
        df2 = df2.set_index("year")
        return df2.to_json(orient="index")

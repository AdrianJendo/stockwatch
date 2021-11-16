from flask import jsonify, request
from flask_restful import Resource
from datetime import date, timedelta
import requests
import json
import pdb
import os
import pandas as pd

tiingo_url = os.environ.get("tiingo_url")
api_key = os.environ.get("tiingo_key")

# /ticker/:ticker
class RESTPriceHistory(Resource):
    def get(self, ticker):
        interval = request.args.get("interval", None)

        if ticker == None or interval == None:
            return "No data"

        endDate = date.today()
        minStartDate = endDate.replace(year=endDate.year - 1)
        if interval == "YTD":
            startDate = date(date.today().year, 1, 1)
        elif interval[len(interval) - 1] == "D":
            startDate = endDate - timedelta(days=int(interval[0 : len(interval) - 1]))
        elif interval[len(interval) - 1] == "M":
            proposedMonth = endDate.month - int(interval[0 : len(interval) - 1])
            proposedYear = endDate.year
            while (
                proposedMonth < 1
            ):  # Need to check if we are in the same calendar year
                proposedMonth = 12 + proposedMonth
                proposedYear -= 1
            startDate = endDate.replace(year=proposedYear, month=proposedMonth)
        elif interval[len(interval) - 1] == "Y":
            startDate = endDate.replace(
                year=endDate.year - int(interval[0 : len(interval) - 1])
            )
        elif interval == "MAX":
            startDate = date(1, 1, 1)
        else:
            return "Correct interval not specified"

        minStartDate = minStartDate.strftime("%Y-%m-%d")
        startDate = startDate.strftime("%Y-%m-%d")
        queryStartDate = minStartDate if minStartDate < startDate else startDate
        endDate = endDate.strftime("%Y-%m-%d")

        price_data = requests.get(
            tiingo_url + "daily/{}/prices".format(ticker),
            params={"startDate": queryStartDate, "endDate": endDate, "token": api_key},
        ).json()

        df = pd.DataFrame(price_data)
        # Just take the columns we might be interested in
        df["date"] = df["date"].apply(
            lambda x: x[0:10]
        )  # Truncate the dates to get rid of timestamp
        chartData = df[["date", "adjClose"]]
        chartData = df.loc[df["date"] > startDate]
        chartData = chartData.rename(columns={"date": "time", "adjClose": "value"})
        # df = df[
        #     [
        #         "date",
        #         "adjClose",
        #         "divCash",
        #         "adjVolume",
        #         "splitFactor",
        #         "adjHigh",
        #         "adjLow",
        #     ]
        # ]

        meta_info = requests.get(
            tiingo_url + "daily/{}".format(ticker),
            params={"token": api_key},
        ).json()

        df_1yr = df.loc[df["date"] > minStartDate]
        df = df.loc[df["date"] > startDate]
        last_price = df["adjClose"].iloc[len(df) - 1]
        first_price = df["adjClose"].iloc[0]
        price_change = last_price - first_price
        percent_change = (price_change) / first_price * 100

        today_data = df.iloc[len(df) - 1]

        supplementary_data = {
            "avg_volume": int(df_1yr["adjVolume"].mean()),
            "high_price_52": round(df_1yr["adjHigh"].max(), 2),
            "low_price_52": round(df_1yr["adjLow"].min(), 2),
            "div_yield": round(df_1yr["divCash"].sum() / last_price * 100, 2),
            "name": meta_info["name"],
            "exchangeCode": meta_info["exchangeCode"],
            "percentChange": round(percent_change, 2),
            "priceChange": round(price_change, 2),
            "lastPrice": today_data["adjClose"],
            "openPrice": today_data["adjOpen"],
            "highPrice": today_data["adjHigh"],
            "lowPrice": today_data["adjLow"],
        }

        # pdb.set_trace()

        return {
            # "fullData": df.to_json(orient="records"),
            "priceData": chartData.to_json(orient="records"),
            "supplementary_data": json.dumps(supplementary_data),
        }

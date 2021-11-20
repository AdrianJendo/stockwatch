from flask import jsonify, request
from flask_restful import Resource
from datetime import datetime
import requests
import json
import pdb
import os
import pandas as pd

tiingo_url = os.environ.get("tiingo_url")
api_key = os.environ.get("tiingo_key")

# /comparisons
class RESTComparisons(Resource):
    def get(self):
        # https://api.tiingo.com/tiingo/daily/<ticker>/prices?startDate=2012-1-1&endDate=2016-1-1
        # https://api.tiingo.com/tiingo/crypto/prices?tickers=btcusd,fldcbtc&startDate=2019-01-02&resampleFreq=5min
        stocks = json.loads(request.args.get("stocks"))
        startDate = datetime.strptime(
            request.args.get("startDate"), "%a %b %d %Y"
        ).strftime("%Y-%m-01")
        endDate = datetime.strptime(
            request.args.get("endDate"), "%a %b %d %Y"
        ).strftime("%Y-%m-01")

        stocks_dict = {}
        initial_prices = {}
        for ticker in stocks:
            price_data = requests.get(
                tiingo_url + "daily/{}/prices".format(ticker),
                params={"startDate": startDate, "endDate": endDate, "token": api_key},
            ).json()
            df = pd.DataFrame(price_data)
            df["date"] = df["date"].apply(
                lambda x: x[0:10]
            )  # Truncate the dates to get rid of timestamp
            df = df.set_index("date")  # Set index to date
            df = df[
                [
                    "adjClose",
                    "adjOpen",
                    "adjHigh",
                    "adjLow",
                    "adjVolume",
                    "divCash",
                ]  # only get the cool columns
            ]
            # df.rename(columns={'adjClose':ticker}, inplace=True)
            stocks_dict[ticker] = df["adjClose"]  # We only need the adjClose columns
            initial_prices[ticker] = df["adjClose"].iloc[
                0
            ]  # Initial price will be the first close

        df = pd.DataFrame(
            stocks_dict
        )  # Remake the dataframe from the dictionary of dataframes, very cool

        # Change the column names to be the ticker boys
        labels = {}
        for ticker in stocks:
            initial_price = initial_prices[ticker]
            total_gain = (
                (df[ticker].iloc[len(df) - 1] - initial_price) / initial_price * 100
            )
            # pdb.set_trace()
            labels[ticker] = "{}- {}%".format(ticker, round(total_gain, 1))

        df = df / initial_prices - 1  # Make the prices relative
        df.rename(
            columns=labels, inplace=True
        )  # Column names are like AAPL-100% and whatnot

        return df.to_json(orient="split")

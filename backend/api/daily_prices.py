from flask import request
from flask_restful import Resource
import pandas as pd
import requests
import json
from datetime import datetime
from pandas.tseries.offsets import BDay
import os

tiingo_url = os.environ.get("tiingo_url")
tiingo_key = os.environ.get("tiingo_key")
alpha_url = os.environ.get("alpha_vantage_url")
alpha_key = os.environ.get("alpha_vantage_key")

# /daily_prices
class RESTDailyPrices(Resource):
    def get(self):
        tickers = json.loads(request.args.get("tickers", "null"))

        if not tickers:
            return {"msg": "no tickers provided"}

        price_data = []
        for ticker in tickers:
            # df processing
            today = datetime.today()
            price_data_resp = requests.get(
                tiingo_url + "daily/{}/prices".format(ticker),
                params={
                    "startDate": (today - BDay(4)).strftime(
                        "%Y-%m-%d"
                    ),  # pad an extra couple days just in case of weekends, stat holidays, etc.
                    "endDate": today.strftime("%Y-%m-%d"),
                    "token": tiingo_key,
                },
            ).json()
            df = pd.DataFrame(price_data_resp)

            ticker_info = {}
            ticker_info["pctChg"] = round(
                (df.iloc[-1]["adjClose"] - df.iloc[-2]["adjClose"])
                / df.iloc[-2]["adjClose"]
                * 100,
                2,
            )
            ticker_info["chg"] = round(
                df.iloc[-1]["adjClose"] - df.iloc[-2]["adjClose"], 2
            )
            ticker_info["price"] = round(df.iloc[-1]["adjClose"], 2)
            ticker_info["label"] = ticker
            # Can't use yfinance here, way too slow for number of requests needed
            # ticker_info["company"] = yf.Ticker(ticker).info["longName"]
            # alpha vantage will work with student plan (150 calls per minute)
            ticker_info["company"] = requests.get(
                alpha_url,
                params={
                    "function": "OVERVIEW",
                    "symbol": ticker,
                    "apikey": alpha_key,
                },
            ).json()["Name"]

            price_data.append(ticker_info)

        return price_data

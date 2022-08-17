from flask import jsonify, request
from flask_restful import Resource
from datetime import datetime
import requests
import json
import os
import pandas as pd

tiingo_url = os.environ.get("tiingo_url")
api_key = os.environ.get("tiingo_key")

from decorators.token_required import token_required

# /comparisons
class RESTComparisons(Resource):
    @token_required
    def get(user):
        # https://api.tiingo.com/tiingo/daily/<ticker>/prices?startDate=2012-1-1&endDate=2016-1-1
        # https://api.tiingo.com/tiingo/crypto/prices?tickers=btcusd,fldcbtc&startDate=2019-01-02&resampleFreq=5min
        items = json.loads(request.args.get("items"))
        startDate = datetime.strptime(
            request.args.get("startDate"), "%a %b %d %Y"
        ).strftime("%Y-%m-%d")
        endDate = datetime.strptime(
            request.args.get("endDate"), "%a %b %d %Y"
        ).strftime("%Y-%m-%d")

        # Get prices
        items_dict = {}
        initial_prices = {}
        for item in items:
            for ticker in item["values"]:
                if ticker not in initial_prices:
                    price_data = requests.get(
                        tiingo_url + "daily/{}/prices".format(ticker),
                        params={
                            "startDate": startDate,
                            "endDate": endDate,
                            "token": api_key,
                        },
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
                        ]  # only get the useful columns
                    ]
                    items_dict[ticker] = df[
                        "adjClose"
                    ]  # We only need the adjClose columns
                    initial_prices[ticker] = df["adjClose"].iloc[
                        0
                    ]  # Initial price will be the first close

        return_df = pd.DataFrame(
            items_dict
        )  # Remake the dataframe from the dictionary of dataframes, very cool

        def get_port_value(row, numShares={}, port_value=0):
            for ticker in numShares.keys():
                port_value += row[ticker] * numShares[ticker]
            return port_value

        # Deal with portfolios by
        for item in items:
            if item["id"] not in initial_prices:  # Check item is portfolio
                numShares = {}
                port_value = 10000  # arbitrary value for calculating shares
                cash = port_value  # for portfolios without 100% allocation
                initial_prices[item["id"]] = port_value
                for ticker, weight in item["values"].items():
                    numShares[ticker] = (
                        port_value * weight / initial_prices[ticker]
                    )  # calculate number of shares
                    cash -= port_value * weight
                # find port value for every time increment and add as column
                return_df[item["id"]] = return_df.apply(
                    get_port_value, axis=1, numShares=numShares, port_value=cash
                )

        # Change the column names to be the label used for the graph
        labels = {}
        for item in items:
            initial_price = initial_prices[item["id"]]
            total_gain = (
                (return_df[item["id"]].iloc[len(return_df) - 1] - initial_price)
                / initial_price
                * 100
            )
            labels[item["id"]] = "{}: {}%".format(item["id"], round(total_gain, 2))

        # Drop columns not in labels
        drop_columns = []
        for column in return_df.columns:
            if not column in labels:
                drop_columns.append(column)

        return_df = return_df / initial_prices - 1  # Make the prices relative
        return_df = return_df.drop(drop_columns, axis=1)  # Drop the unused columns
        return_df.rename(
            columns=labels, inplace=True
        )  # Rename columns to label used in graph

        return return_df.to_json(orient="split")

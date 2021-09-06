from flask import jsonify, request
from flask_restful import Resource
import json
import pdb

import random

watchlists = [
    {
        "name": "Watchlist 1",
        "id": 0,
        "columns": [
            {
                "id": "name",
                "label": "Name",
            },
            {
                "id": "ticker",
                "label": "Ticker",
            },
            {
                "id": "category",
                "label": "Category",
            },
            {"id": "market_cap", "label": "Market cap"},
            {"id": "divident_yield", "label": "Dividend Yield"},
        ],
        "tickers": [
            {"name": "Tesla Inc.", "ticker": "TSLA", "category": "equity"},
            {"name": "Apple Inc.", "ticker": "AAPL", "category": "equity"},
            {"name": "Microsoft", "ticker": "MSFT", "category": "equity"},
        ],
    },
    {
        "name": "Watchlist 2",
        "id": 1,
        "columns": [
            {
                "id": "name",
                "label": "Name",
            },
            {
                "id": "ticker",
                "label": "Ticker",
            },
            {
                "id": "category",
                "label": "Category",
            },
        ],
        "tickers": [
            {"name": "Ark next gen internet ETF", "ticker": "ARKW", "category": "etf"},
            {"name": "US Dollars / Bitcoin", "ticker": "USD/BTC", "category": "forex"},
            {"name": "US Dollars / Ethereum", "ticker": "USD/ETH", "category": "forex"},
        ],
    },
    {
        "name": "Watchlist 3",
        "id": 2,
        "columns": [
            {
                "id": "name",
                "label": "Name",
            },
            {
                "id": "ticker",
                "label": "Ticker",
            },
            {
                "id": "category",
                "label": "Category",
            },
        ],
        "tickers": [
            {"name": "Yeti", "ticker": "YETI", "category": "equity"},
            {"name": "John Deere Inc.", "ticker": "DE", "category": "equity"},
            {"name": "Take Two Interactive", "ticker": "TTWO", "category": "equity"},
            {"name": "Coinbase Inc.", "ticker": "COIN", "category": "equity"},
        ],
    },
]


# Let user set defaults columns for new watchlists
columns = []


class RESTWatchlists(Resource):
    def get(self):
        response = jsonify(watchlists)
        return response

    def post(self):
        new_watchlist = json.loads(request.form.get("new_watchlist", "null"))
        if new_watchlist == None:
            raise Exception("No data sent")

        watchlists.append(new_watchlist)
        return {"status": "success"}

    def put(self):
        updated_watchlists = json.loads(request.form.get("updated_watchlists", "null"))
        if updated_watchlists == None:
            raise Exception("No data sent")

        while len(watchlists):
            watchlists.pop()

        for watchlist in updated_watchlists:
            watchlists.append(watchlist)

        return jsonify(updated_watchlists)


class RESTWatchlist(Resource):
    def get(self, watchlist_id):
        for watchlist in watchlists:
            if watchlist["id"] == watchlist_id:
                return watchlist
        return {"message": "not found"}, 400

    def put(self, watchlist_id):
        new_watchlist_items = json.loads(request.form.get("new_watchlist_items"))

        new_tickers = [
            {
                "name": item["name"],
                "ticker": item["ticker"],
                "category": item["category"],
            }
            for item in new_watchlist_items
        ]

        for watchlist in watchlists:
            if watchlist["id"] == watchlist_id:
                watchlist["tickers"] = new_tickers

                return watchlists

        return {"message": "watchlist not found"}, 400


class RESTNewColumnData(Resource):
    def get(self):
        columns = json.loads(request.args.get("columns"))
        watchlistItems = json.loads(request.args.get("tickers"))

        columnKeys = [column["id"] for column in columns]  # Keys that are required
        curKeys = []  # Keys that are already present
        lookupKeys = []  # Keys that must be found from database

        if len(watchlistItems):
            tickerKeys = watchlistItems[
                0
            ].keys()  # all the keys stored in the current ticker objects
            for key in columnKeys:
                if key in tickerKeys:
                    curKeys.append(key)
                else:
                    lookupKeys.append(key)

        def func(watchlistItem):
            # Lookup everything in lookupKeys with API
            for key in lookupKeys:
                watchlistItem[key] = int(random.random() * 100) + 1

            return watchlistItem

        random.seed(1)
        newWatchlistItems = list(map(func, watchlistItems))

        return jsonify(newWatchlistItems)


class RESTWatchlistColumns(Resource):
    def put(self, watchlist_id):
        columns = json.loads(request.form.get("columns", "null"))

        if columns == None:
            return {"status": "fail"}, 400

        for watchlist in watchlists:
            if watchlist["id"] == watchlist_id:
                watchlist["columns"] = columns
                return jsonify(watchlists)

        return {"message": "watchlist not found"}

from flask import jsonify, request
from flask_restful import Resource
import json
import pdb

import random

from models.user import User
from models.watchlist import Watchlist


def watchlists_to_json(watchlists):
    return [
        {"id": str(watchlist.id), "name": watchlist.name} for watchlist in watchlists
    ]


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

# /watchlists
class RESTWatchlists(Resource):
    def get(self):
        user = User.objects.first()
        return watchlists_to_json(user.watchlists)

    def post(self):
        new_watchlist = json.loads(request.data)
        if new_watchlist == None:
            raise Exception("No data sent")

        user = User.objects.first()
        watchlist = Watchlist(
            name=new_watchlist["name"],
            tickers=new_watchlist["tickers"],
            columns=new_watchlist["columns"],
        )
        user.watchlists.append(watchlist)
        user.save()
        return watchlists_to_json(user.watchlists)

    def put(self):
        updated_watchlists = json.loads(request.data).get("data", None)
        if updated_watchlists == None:
            raise Exception("No data sent")

        user = User.objects.first()
        new_watchlists = []

        for old_watchlist in user.watchlists:
            new_watchlist = next(
                (
                    item
                    for item in updated_watchlists
                    if item["id"] == str(old_watchlist.id)
                ),
                None,
            )
            if new_watchlist != None:
                new_watchlists.append(
                    Watchlist(
                        name=new_watchlist["name"],
                        tickers=old_watchlist.tickers,
                        columns=old_watchlist.columns,
                        id=old_watchlist.id,
                        date_created=old_watchlist.date_created,
                    )
                )

        user.watchlists = new_watchlists
        user.save()

        return updated_watchlists


# /watchlists/<int:watchlist_id>
class RESTWatchlist(Resource):
    def get(self, watchlist_id):
        user = User.objects.first()
        watchlist = list(
            filter(lambda watchlist: str(watchlist.id) == watchlist_id, user.watchlists)
        )

        if len(watchlist):
            return watchlist[0].to_json()

        return {"message": "not found"}, 400

    def put(self, watchlist_id):
        new_watchlist_items = json.loads(request.data).get("data", None)

        if new_watchlist_items == None:
            raise Exception("No data sent")

        new_tickers = [
            {
                "name": item["name"],
                "ticker": item["ticker"],
                "category": item["category"],
            }
            for item in new_watchlist_items
        ]

        user = User.objects.first()
        watchlist = list(
            filter(lambda watchlist: str(watchlist.id) == watchlist_id, user.watchlists)
        )

        if len(watchlist):
            watchlist[0].tickers = new_tickers
            user.save()

            return watchlist[0].to_json()

        return {"message": "watchlist not found"}, 400


# /newcolumndata
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

        return newWatchlistItems


# /columns/<int:watchlist_id>
class RESTWatchlistColumns(Resource):
    def put(self, watchlist_id):
        columns = json.loads(request.data).get("data", None)

        if columns == None:
            return {"status": "fail"}, 400

        user = User.objects.first()
        watchlist = list(
            filter(lambda watchlist: str(watchlist.id) == watchlist_id, user.watchlists)
        )

        if len(watchlist):
            watchlist[0].columns = columns
            user.save()

            return watchlist[0].to_json()

        return {"message": "watchlist not found"}, 400

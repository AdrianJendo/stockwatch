from flask import jsonify, request
from flask_restful import Resource
import requests
import json
import os

data_url = os.environ.get("alpha_vantage_url")
api_key = os.environ.get("alpha_vantage_key")

# /watchlists/columns
class RESTWatchlistColumns(Resource):
    def get(self):
        tickers = json.loads(request.args.get("tickers", "null"))
        api_fields = json.loads(request.args.get("lookup_fields", "null"))
        time_periods = json.loads(request.args.get("time_periods", "null"))

        columnData = {}

        for tickerObj in tickers:
            ticker = tickerObj["ticker"]
            for search_function in api_fields:
                if time_periods and (
                    len(time_periods["SMA"]) or len(time_periods["EMA"])
                ):
                    data = {}
                    for time_period in time_periods["SMA"]:
                        resp = requests.get(
                            data_url,
                            params={
                                "function": "SMA",
                                "symbol": ticker,
                                "apikey": api_key,
                                "time_period": time_period,
                                "interval": "daily",
                                "series_type": "close",
                            },
                        )
                        data["sma{}".format(time_period)] = list(
                            resp.json()["Technical Analysis: SMA"].values()
                        )[0]["SMA"]
                    for time_period in time_periods["EMA"]:
                        resp = requests.get(
                            data_url,
                            params={
                                "function": "EMA",
                                "symbol": ticker,
                                "apikey": api_key,
                                "time_period": time_period,
                                "interval": "daily",
                                "series_type": "close",
                            },
                        )
                        data["ema{}".format(time_period)] = list(
                            resp.json()["Technical Analysis: EMA"].values()
                        )[0]["EMA"]
                elif search_function == "RSI":
                    resp = requests.get(
                        data_url,
                        params={
                            "function": "RSI",
                            "symbol": ticker,
                            "apikey": api_key,
                            "interval": "daily",
                            "time_period": 10,
                            "series_type": "close",
                        },
                    )
                    data = {
                        "rsi": list(resp.json()["Technical Analysis: RSI"].values())[0][
                            "RSI"
                        ]
                    }
                else:
                    resp = requests.get(
                        data_url,
                        params={
                            "function": search_function,
                            "symbol": ticker,
                            "apikey": api_key,
                        },
                    )
                    if search_function in [
                        "INCOME_STATEMENT",
                        "BALANCE_SHEET",
                        "CASH_FLOW",
                    ]:
                        data = resp.json()["annualReports"][0]
                    elif search_function in ["TIME_SERIES_DAILY"]:
                        data = resp.json()["Time Series (Daily)"].values()[0]
                    else:
                        data = resp.json()

                if ticker not in columnData:
                    columnData[ticker] = {}

                for key in data.keys():
                    columnData[ticker][key] = data[key]

        return columnData


# # /watchlists
# class RESTWatchlists(Resource):
#     def get(self):
#         user = User.objects.first()
#         return watchlists
#         return watchlists_to_json(user.watchlists)

#     def post(self):
#         new_watchlist = json.loads(request.data)
#         if new_watchlist == None:
#             raise Exception("No data sent")

#         user = User.objects.first()
#         watchlist = Watchlist(
#             name=new_watchlist["name"],
#             tickers=new_watchlist["tickers"],
#             columns=new_watchlist["columns"],
#         )
#         user.watchlists.append(watchlist)
#         user.save()
#         return [watchlists_to_json(user.watchlists), str(watchlist.id)]

#     def put(self):
#         updated_watchlists = json.loads(request.data).get("data", None)
#         if updated_watchlists == None:
#             raise Exception("No data sent")

#         user = User.objects.first()
#         new_watchlists = []

#         for old_watchlist in user.watchlists:
#             new_watchlist = next(
#                 (
#                     item
#                     for item in updated_watchlists
#                     if item["id"] == str(old_watchlist.id)
#                 ),
#                 None,
#             )
#             if new_watchlist != None:
#                 new_watchlists.append(
#                     Watchlist(
#                         name=new_watchlist["name"],
#                         tickers=old_watchlist.tickers,
#                         columns=old_watchlist.columns,
#                         id=old_watchlist.id,
#                         date_created=old_watchlist.date_created,
#                     )
#                 )

#         user.watchlists = new_watchlists
#         user.save()

#         return updated_watchlists


# # /watchlists/<int:watchlist_id>
# class RESTWatchlist(Resource):
#     def get(self, watchlist_id):
#         user = User.objects.first()
#         watchlist = list(
#             filter(lambda watchlist: str(watchlist.id) == watchlist_id, user.watchlists)
#         )

#         if len(watchlist):
#             return watchlist[0].to_json()

#         return {"message": "not found"}, 400

#     def put(self, watchlist_id):
#         new_watchlist_items = json.loads(request.data).get("data", None)

#         if new_watchlist_items == None:
#             raise Exception("No data sent")

#         new_tickers = [
#             {
#                 "name": item["name"],
#                 "ticker": item["ticker"],
#                 "category": item["category"],
#             }
#             for item in new_watchlist_items
#         ]

#         user = User.objects.first()
#         watchlist = list(
#             filter(lambda watchlist: str(watchlist.id) == watchlist_id, user.watchlists)
#         )

#         if len(watchlist):
#             watchlist[0].tickers = new_tickers
#             user.save()

#             return watchlist[0].to_json()

#         return {"message": "watchlist not found"}, 400

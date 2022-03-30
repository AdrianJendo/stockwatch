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

        columnData = {}

        for tickerObj in tickers:
            ticker = tickerObj["ticker"]
            for search_function in api_fields:
                resp = requests.get(
                    data_url,
                    params={
                        "function": search_function,
                        "symbol": ticker,
                        "apikey": api_key,
                    },
                )
                data = resp.json()
                if search_function in [
                    "INCOME_STATEMENT",
                    "BALANCE_SHEET",
                    "CASH_FLOW",
                ]:
                    print(search_function, ticker, data)
                    data = data["annualReports"][0]

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

from flask import request
from flask_restful import Resource
import requests
import os
import pandas as pd
import numpy as np
from bs4 import BeautifulSoup

FINANCIAL_URL = os.environ.get("financial_url")
FINANCIAL_KEY = os.environ.get("financial_key")

base_url = "https://www.slickcharts.com/"

# /comparisons
class RESTHeatmap(Resource):
    def get(self):
        index_name = request.args.get("index")
        supported_indices = ["sp500", "nasdaq100", "dowjones"]

        if index_name not in supported_indices:
            return {"msg": "invalid index"}

        url = base_url + index_name

        bs4_request = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})

        soup = BeautifulSoup(bs4_request.text, "lxml")

        stats = soup.find("table", class_="table table-hover table-borderless table-sm")

        df = pd.read_html(str(stats))[0]
        df["Sector"] = np.nan
        df["SubSector"] = np.nan

        # df['% Chg'] = df['% Chg'].str.strip('()-%')
        # df['% Chg'] = pd.to_numeric(df['% Chg'])
        # df['Chg'] = pd.to_numeric(df['Chg'])

        financial_index = {
            "sp500": "sp500",
            "nasdaq100": "nasdaq",
            "dowjones": "dowjones",
        }
        index_constituents = requests.get(
            FINANCIAL_URL + "{}_constituent".format(financial_index[index_name]),
            params={"apikey": FINANCIAL_KEY},
        )

        sectors = {}
        for stock in index_constituents.json():
            df.loc[df["Symbol"] == stock["symbol"], "Sector"] = stock["sector"]

            if stock["sector"] not in sectors:
                sectors[stock["sector"]] = 1

        df = df.drop(["#"], axis=1)

        return {
            "df": df.to_json(orient="records"),
            "sectors": list(sectors.keys()),
        }

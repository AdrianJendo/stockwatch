from flask import request
from flask_restful import Resource
import requests
import os
import pandas as pd
import numpy as np
from bs4 import BeautifulSoup
import json

FINANCIAL_URL = os.environ.get("financial_url")
FINANCIAL_KEY = os.environ.get("financial_key")

# /heatmap
class RESTHeatmap(Resource):
    def get(self):
        index_name = request.args.get("index")
        supported_indices = ["sp500", "nasdaq100", "dowjones"]

        if index_name not in supported_indices:
            return {"msg": "invalid index"}

        # Get index weights
        url = "https://www.slickcharts.com/" + index_name
        soup = BeautifulSoup(
            requests.get(url, headers={"User-Agent": "Mozilla/5.0"}).text, "lxml"
        )

        stats = soup.find("table", class_="table table-hover table-borderless table-sm")

        df = pd.read_html(str(stats))[0]
        df["Sector"] = np.nan
        df["SubSector"] = np.nan
        df = df.drop(["#", "Price"], axis=1)
        # TEMP stuff below, get real price data in the future
        df["% Chg"] = df["% Chg"].str.strip("()%")
        df["% Chg"] = pd.to_numeric(df["% Chg"])
        df["Chg"] = pd.to_numeric(df["Chg"])

        # Get sectors of each company in index
        wiki_search_url = "https://en.wikipedia.org/wiki/"
        if index_name == "sp500":
            wiki_search_url += "List_of_S&P_500_companies"
        elif index_name == "nasdaq100":
            wiki_search_url += "NASDAQ-100"
        else:
            wiki_search_url += "Dow_Jones_Industrial_Average"

        soup = BeautifulSoup(requests.get(wiki_search_url).text, "lxml")
        stock_sectors = []

        # Parse tables and find entries for ticker, sector and sub sector
        ticker_col = -1
        sector_col = -1
        sub_sector_col = -1

        for table in soup.findAll("table", {"class": "wikitable sortable"}):
            # Find each column of interest
            table_headers = table.findAll("th")
            for i in range(len(table_headers)):
                header_text = table_headers[i].text.lower()
                if "symbol" in header_text or "ticker" in header_text:
                    ticker_col = i
                elif "sector" in header_text or (
                    "industry" in header_text and not "sub" in header_text
                ):
                    sector_col = i
                elif "sub-industry" in header_text:
                    sub_sector_col = i

            # Check if ticker and sector columns exist in the table
            if ticker_col != -1 and sector_col != -1:
                for row in table.findAll("tr"):
                    fields = row.findAll("td")
                    if fields and fields[ticker_col] and fields[sector_col]:
                        # Dow needs special parsing because the table html is fucked up
                        ticker = (
                            fields[ticker_col].text.strip()
                            if index_name != "dowjones"
                            else fields[ticker_col - 1].text.strip()
                        )
                        sector = (
                            fields[sector_col].text.strip()
                            if index_name != "dowjones"
                            else fields[sector_col - 1].text.strip()
                        )
                        sub_sector = (
                            fields[sub_sector_col].text.strip()
                            if sub_sector_col != -1
                            else None
                        )
                        if ":" in ticker:
                            ticker = ticker.split(":")[1].strip()
                        stock_sectors.append(
                            {
                                "ticker": ticker,
                                "sector": sector,
                                "sub_sector": sub_sector,
                            }
                        )
                break

        # Add sectors and sub sectors to df and keep list of all sectors
        sectors = {}
        sub_sectors = {}
        for stock in stock_sectors:
            df.loc[df["Symbol"] == stock["ticker"], "Sector"] = stock["sector"]
            df.loc[df["Symbol"] == stock["ticker"], "SubSector"] = stock["sub_sector"]
            if stock["sector"] not in sectors:
                sectors[stock["sector"]] = 0
            if stock["sub_sector"] not in sub_sectors:
                sub_sectors[stock["sub_sector"]] = 0

            sectors[stock["sector"]] += df.loc[
                df["Symbol"] == stock["ticker"], "Weight"
            ].values[0]
            sub_sectors[stock["sub_sector"]] += df.loc[
                df["Symbol"] == stock["ticker"], "Weight"
            ].values[0]

        return {
            "stocks": df.to_json(orient="records"),
            "sectors": json.dumps(sectors),
            "sub_sectors": json.dumps(sub_sectors),
        }

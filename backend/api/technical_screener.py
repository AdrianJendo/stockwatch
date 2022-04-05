from flask import request
from flask_restful import Resource
import pandas as pd
import requests
import os
import yfinance as yf
from datetime import datetime
from dateutil.relativedelta import relativedelta
import talib
from bs4 import BeautifulSoup
import numpy as np

from app import postgres_db


wiki_search_url = "https://www.slickcharts.com/sp500"

# /technical_screener
class RESTTechnicaScreener(Resource):
    def get(self):
        pattern = request.args.get("pattern", None)

        existing_tables = {}
        for table in postgres_db.engine.table_names(schema="sp500_companies"):
            existing_tables[table] = True

        if pattern == None:
            return {"msg": "no pattern"}

        # 1. get s&p 500 companies
        stats = BeautifulSoup(
            requests.get(wiki_search_url, headers={"User-Agent": "Mozilla/5.0"}).text,
            "lxml",
        ).find("table", class_="table table-hover table-borderless table-sm")
        df = pd.read_html(str(stats))[0]
        sp500_tickers = list(df["Symbol"])

        for ticker in sp500_tickers:
            # 2. lookup needed data from yfinance
            today = datetime.today().strftime("%Y-%m-%d")
            start_date = (datetime.now() - relativedelta(years=1)).strftime(
                "%Y-%m-%d"
            )  # start 1 year ago

            # df processing
            df = yf.download(ticker, start=start_date, end=today)
            df = df.drop(columns="Close")
            df = df.rename(
                columns={
                    "Open": "open",
                    "High": "high",
                    "Low": "low",
                    "Adj Close": "close",
                    "Volume": "volume",
                },
            )
            df.index.names = ["date"]

            # check if table exists
            if ticker in existing_tables:
                # append new data to start
                ticker_table = pd.read_sql_table(
                    ticker,
                    postgres_db.engine,
                    schema="sp500_companies",
                )
                first_date = ticker_table.iloc[-1]["date"]
                ticker_table = df.loc[first_date:].iloc[1:]

                insert_values = []
                ticker_table.apply(
                    lambda x: insert_values.append(
                        str(tuple([x.name.strftime("%Y-%m-%d")] + x.tolist()))
                    ),
                    axis=1,
                )

                if len(insert_values):
                    postgres_db.engine.execute(
                        """
                            INSERT INTO sp500_companies."{ticker}" (date, open, high, low, close, volume)
                            VALUES
                            {values}
                        """.format(
                            ticker=ticker, values=",".join(insert_values)
                        )
                    )
            else:
                df.to_sql(ticker, postgres_db.engine, schema="sp500_companies")

            # 4. read from database as dataframe

            # 5. Look for pattern with :
            #   - pattern_function = getattr(talib, pattern)
            #   - result = pattern_function(df["Open"], df["High"], df["Low"], df["Close"])
            # 6.

        return {"hello": "world"}

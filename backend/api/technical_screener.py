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

        if pattern == None:
            return {"msg": "no pattern"}

        existing_tables = {}
        for table in postgres_db.engine.table_names(schema="sp500_companies"):
            existing_tables[table] = True

        # 1. get s&p 500 companies
        stats = BeautifulSoup(
            requests.get(wiki_search_url, headers={"User-Agent": "Mozilla/5.0"}).text,
            "lxml",
        ).find("table", class_="table table-hover table-borderless table-sm")
        df = pd.read_html(str(stats))[0]
        sp500_tickers = list(df["Symbol"])

        for ticker in sp500_tickers:
            # 2. Update data once per week
            postgres_db.engine.execute(
                """
                    CREATE TABLE IF NOT EXISTS sp500_companies."last_update" (
                        date DATE NOT NULL
                    )
                """
            )

            last_update = pd.read_sql_table(
                "last_update", postgres_db.engine, schema="sp500_companies"
            )

            today = datetime.today().strftime("%Y-%m-%d")
            lookup_data = False  # Whether or not to look up data from yfinance

            if last_update.empty:
                postgres_db.engine.execute(
                    """
                        INSERT INTO sp500_companies."last_update"
                        VALUES ('{date}');
                    """.format(
                        date=today
                    )
                )
                lookup_data = True
            else:
                last_update_value = last_update.iloc[0]["date"].strftime("%Y-%m-%d")
                one_week_ago = (datetime.today() - relativedelta(days=7)).strftime(
                    "%Y-%m-%d"
                )
                if last_update_value == one_week_ago:
                    postgres_db.engine.execute(
                        """
                        UPDATE sp500_companies."last_update"
                        SET date = {new_date}
                        WHERE date={date};
                    """.format(
                            new_date=today, date=last_update_value
                        )
                    )
                    lookup_data = True

            if lookup_data:
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

                if ticker in existing_tables:
                    postgres_db.engine.execute(
                        """
                            DROP TABLE sp500_companies."{ticker}"
                        """.format(
                            ticker=ticker
                        )
                    )

                df.to_sql(ticker, postgres_db.engine, schema="sp500_companies")

            # 4. read from database as dataframe
            ticker_data = pd.read_sql_table(
                ticker, postgres_db.engine, schema="sp500_companies"
            )
            print(ticker_data)

            return "Looked up"
            # 5. Look for pattern with :
            #   - pattern_function = getattr(talib, pattern)
            #   - result = pattern_function(df["Open"], df["High"], df["Low"], df["Close"])
            # 6.

        return {"hello": "world"}

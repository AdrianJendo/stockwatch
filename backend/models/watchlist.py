from bson import ObjectId
import mongoengine as me
from datetime import datetime

# from models.user import User


class Watchlist(me.EmbeddedDocument):  # Embedded in User
    name = me.StringField(required=True, max_length=30)
    id = me.ObjectIdField(default=ObjectId)
    tickers = me.ListField(me.DictField())
    columns = me.ListField(me.DictField())
    date_created = me.DateField(default=datetime.utcnow)

    def to_json(self):
        return {
            "name": self.name,
            "id": str(self.id),
            "tickers": self.tickers,
            "columns": self.columns,
            "date_created": datetime.strftime(self.date_created, "%Y/%m/%d"),
        }

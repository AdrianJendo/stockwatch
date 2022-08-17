import mongoengine as me
import datetime

from models.watchlist import Watchlist


class User(me.Document):
    email = me.EmailField(required=True, max_length=255, unique=True)
    username = me.StringField(required=True, max_length=30)
    password = me.StringField(Required=True)
    # created = me.DateTimeField(default=datetime.datetime.utcnow)
    # is_active = me.BooleanField(default=True)
    # is_admin = me.BooleanField(default=False)
    # last_login = me.DateTimeField(default=datetime.datetime.utcnow)
    # watchlists = me.ListField(me.EmbeddedDocumentField(Watchlist), default=[])

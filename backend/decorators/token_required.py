from flask import request
import jwt
from functools import wraps
import os
from models.user import User

secret_key = os.environ.get("JWT_TOKEN") or "secretKey"


def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]

        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized",
            }, 401
        try:
            data = jwt.decode(token, secret_key, algorithms="HS256")
            user = User.objects.get(id=data["user_id"])
            if user is None:
                return {
                    "message": "Invalid Authentication token!",
                    "data": None,
                    "error": "Unauthorized",
                }, 401

        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e),
            }, 500

        return f(user)

    return wrapper

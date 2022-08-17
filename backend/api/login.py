from flask import request
from flask_restful import Resource
import os
import json
from flask_bcrypt import check_password_hash
from models.user import User
import jwt
from datetime import datetime, timezone, timedelta

secret_key = os.environ.get("JWT_TOKEN") or "secretKey"

# /login
class RESTLogin(Resource):
    def post():
        data = json.loads(request.data)
        if "password" not in data or "email" not in data:
            return {"error": "field missing"}
        elif data["password"] == None or data["email"] == None:
            return {"error": "required field is null"}

        try:
            user = User.objects.get(email=data["email"])
        except:
            return {"error": "user does not exist"}

        try:
            user.last_login = datetime.utcnow()
            user.save()
        except:
            return {"error": "failed to authenticate user"}

        if check_password_hash(user.password, data["password"]):
            token = jwt.encode(
                {
                    "user_id": str(user.id),
                    "user_email": user.email,
                    "exp": datetime.now(tz=timezone.utc) + timedelta(hours=24),
                },
                secret_key,
                algorithm="HS256",
            )

            return {"status": 200, "error": None, "token": token}

        return {"error": "password does not match"}

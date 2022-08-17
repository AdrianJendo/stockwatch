from flask import request
from flask_restful import Resource
import json
from flask_bcrypt import generate_password_hash
from models.user import User

# /register
class RESTRegister(Resource):
    def post(user):
        data = json.loads(request.data)
        if "username" not in data or "password" not in data or "email" not in data:
            return {"error": "field missing"}
        elif (
            data["username"] == None
            or data["password"] == None
            or data["email"] == None
        ):
            return {"error": "required field is null"}

        pw_hash = generate_password_hash(data["password"], 10)

        new_user = User(
            email=data["email"],
            username=data["username"],
            password=pw_hash,
        )

        try:
            new_user.save()
        except:
            return {"error": "Failed saving user"}

        return {"status": 200, "error": None}

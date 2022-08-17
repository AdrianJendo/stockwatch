from flask import request
from flask_restful import Resource
import json
from flask_bcrypt import generate_password_hash, check_password_hash
from models.user import User

# /comparisons
class RESTLogin(Resource):
    def post(self):
        data = json.loads(request.data)
        if "username" not in data or "password" not in data or "email" not in data:
            return {"error": "field missing"}
        elif (
            data["username"] == None
            or data["password"] == None
            or data["email"] == None
        ):
            return {"error": "required field is null"}
        print(data["username"])
        pw_hash = generate_password_hash("secret", 10)
        print(check_password_hash(pw_hash, "seCret"))

        new_user = User(
            email=data["email"],
            username=data["username"],
            password=data["password"],
        )

        try:
            new_user.save()
        except:
            return {"error": "Failed saving user"}

        return {"status": 200, "error": None}

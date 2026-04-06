from core.database import users_collection
from bson import ObjectId

def create_user(user_data: dict):
    return users_collection.insert_one(user_data)

def get_user_by_email(email: str):
    return users_collection.find_one({"email": email})

def get_user_by_id(user_id: str):
    return users_collection.find_one({"_id": ObjectId(user_id)})

def update_user_in_db(user_id, update_fields):
    return users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_fields}
    )
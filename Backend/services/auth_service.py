from models.user_model import create_user, get_user_by_email
from core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException

def signup_user(user):
    if get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = hash_password(user.password)

    create_user({
        "name": user.name,
        "email": user.email,
        "password": hashed_pw,
        "oauth": False
    })

    return {"message": "User created successfully"}

def login_user(user):
    db_user = get_user_by_email(user.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": str(db_user["_id"])})

    return token

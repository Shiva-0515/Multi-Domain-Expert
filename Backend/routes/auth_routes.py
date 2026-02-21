import os

from fastapi import APIRouter, Depends, Response, Request
from fastapi.responses import RedirectResponse
from schemas.user_schema import UserSignup, UserLogin
from services.auth_service import signup_user, login_user
from core.security import decode_token
from utils.oauth import oauth
from models.user_model import get_user_by_email,get_user_by_id, create_user
from core.security import create_access_token

import dotenv
dotenv.load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(user: UserSignup):
    return signup_user(user)


@router.post("/login")
def login(user: UserLogin, response: Response):
    token = login_user(user)

    response.set_cookie(
        key="JWTtoken",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return {"message": "Login successful"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("JWTtoken")
    return {"message": "Logged out"}


@router.get("/me")
def get_me(request: Request):
    token = request.cookies.get("JWTtoken")
    if not token:
        return {"authenticated": False}

    try:
        payload = decode_token(token)
        userID = payload["sub"]

        db_user = get_user_by_id(userID)

        return {
            "authenticated": True,
            "user": {
                "id": str(db_user["_id"]),
                "name": db_user.get("name"),
                "email": db_user.get("email"),
            }
        }
    except:
        return {"authenticated": False}

# -------- GOOGLE OAUTH -------- #

@router.get("/google")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")

    email = user_info["email"]
    name = user_info["name"]

    db_user = get_user_by_email(email)

    if not db_user:
        result = create_user({
            "name": name,
            "email": email,
            "password": None,
            "oauth": True
        })
        user_id = str(result.inserted_id)
    else:
        user_id = str(db_user["_id"])

    access_token = create_access_token({"sub": user_id})

    client_url = os.getenv("CLIENT_URL", "http://localhost:5173")   

    response = RedirectResponse(url=f"{client_url}/analyze")

    response.set_cookie(
        key="JWTtoken",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return response
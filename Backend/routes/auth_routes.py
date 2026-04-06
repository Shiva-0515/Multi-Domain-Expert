import os

from fastapi import APIRouter, Depends, Response, Request,HTTPException, status
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
    try:
        return signup_user(user)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e) or "Signup failed"
        )


@router.post("/login")
def login(user: UserLogin, response: Response):
    try:
        token = login_user(user)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    #for production with secure cookies:

    # response.set_cookie(
    #     key="JWTtoken",
    #     value=token,
    #     httponly=True,
    #     secure=True,
    #     samesite="none"
    # )


    # for localhost testing, we need secure=False and samesite="lax"
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
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token missing"
        )

    try:
        payload = decode_token(token)
        userID = payload["sub"]

        db_user = get_user_by_id(userID)

        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        return {
            "authenticated": True,
            "user": {
                "id": str(db_user["_id"]),
                "name": db_user.get("name"),
                "email": db_user.get("email"),
                "photo": db_user.get("photo"),
                "oauth": db_user.get("oauth", False)
            }
        }

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

# -------- GOOGLE OAUTH -------- #

@router.get("/google")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback")
async def google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get("userinfo")

        if not user_info:
            raise HTTPException(
                status_code=400,
                detail="Failed to fetch user info from Google"
            )

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
            secure=True,
            samesite="none"
        )

        return response

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Google authentication failed"
        )
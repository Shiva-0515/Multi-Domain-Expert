from fastapi import APIRouter, Request, UploadFile, File, Form, HTTPException
import cloudinary.uploader
from core.config import settings  # 👈 use settings cleanly\
from core.security import decode_token, hash_password, verify_password
from models.user_model import get_user_by_id, update_user_in_db

router = APIRouter()

@router.patch("/user/update")
async def update_user(
    request: Request,
    name: str = Form(None),
    currentPassword: str = Form(None),
    newPassword: str = Form(None),
    file: UploadFile = File(None)
):
    token = request.cookies.get("JWTtoken")

    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # 🔐 Decode safely using settings internally
    try:
        payload = decode_token(token)  # should use settings.JWT_SECRET inside
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload["sub"]
    db_user = get_user_by_id(user_id)

    update_fields = {}

    # 🧠 Name update
    if name:
        update_fields["name"] = name

    # 🖼️ Image upload
    if file:
        upload_result = cloudinary.uploader.upload(
            file.file,
            resource_type="image"
        )
        update_fields["photo"] = upload_result["secure_url"]

    # 🔐 Password update
    if newPassword:
        if len(newPassword) < settings.MIN_PASSWORD_LENGTH:
            raise HTTPException(
                status_code=400,
                detail=f"Password must be at least {settings.MIN_PASSWORD_LENGTH} characters"
            )

        if not currentPassword:
            raise HTTPException(status_code=400, detail="Current password required")

        if not verify_password(currentPassword, db_user["password"]):
            raise HTTPException(status_code=400, detail="Current password incorrect")

        update_fields["password"] = hash_password(newPassword)

    # 🚫 Nothing to update
    if not update_fields:
        raise HTTPException(status_code=400, detail="No changes provided")

    update_user_in_db(user_id, update_fields)

    # 🔄 Return updated user (important for frontend)
    updated_user = get_user_by_id(user_id)

    return {
        "name": updated_user["name"],
        "email": updated_user["email"],
        "photo": updated_user.get("photo")
    }
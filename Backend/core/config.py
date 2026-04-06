import os
from dotenv import load_dotenv
import cloudinary

# 🔥 Load env FIRST
load_dotenv()

class Settings:
    # ── Database ──
    MONGO_URI = os.getenv("MONGO_URI")
    DB_NAME = os.getenv("DB_NAME", "multi_domain_ai")

    # ── JWT ──
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_ALGORITHM = "HS256"
    JWT_EXPIRE_MINUTES = 60 * 24

    # ── OAuth ──
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

    # ── Cloudinary ──
    CLOUDINARY_CLOUD_NAME = os.getenv("COULDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")


# Instantiate settings
settings = Settings()

# 🔥 Configure Cloudinary using env
# print("Configuring Cloudinary with:", settings.CLOUDINARY_CLOUD_NAME, settings.CLOUDINARY_API_KEY , settings.CLOUDINARY_API_SECRET)  # Debug log
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)
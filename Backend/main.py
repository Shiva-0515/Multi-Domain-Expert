from fastapi import FastAPI
from core.logging_config import setup_logging
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import os
import dotenv

dotenv.load_dotenv()  # Load environment variables from .env file

from routes.auth_routes import router as auth_router
from routes.research_generator_routes import router as research_router  

setup_logging()

app = FastAPI()

# 🔐 Session middleware (REQUIRED for OAuth)
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("JWT_SECRET"),
    session_cookie="agentic_ai_session",
    max_age=3600*24*7,  # 1 week
)

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(research_router, prefix="/api")

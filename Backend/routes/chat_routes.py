from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from google import genai
import os

router = APIRouter()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

class ChatRequest(BaseModel):
    report: str
    message: str

class ChatResponse(BaseModel):
    answer: str


@router.post("/chat", response_model=ChatResponse)
async def chat_with_report(req: ChatRequest):
    try:
        # 🧪 Basic validation
        if not req.report or not req.message:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Report and message are required"
            )

        # 🔒 Trim report
        trimmed_report = req.report[:12000]

        prompt = f"""
You are an expert assistant helping a user understand a report.

RULES:
- Answer ONLY based on the report
- Be clear, structured, and concise
- If answer is not in report, say "Not found in report"

REPORT:
----------------
{trimmed_report}
----------------

USER QUESTION:
{req.message}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt
        )

        if not response or not response.text:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Failed to generate response from AI model"
            )

        return {"answer": response.text}

    # ✅ Known FastAPI errors (pass through)
    except HTTPException as e:
        raise e

    # ⚠️ Gemini / API errors
    except Exception as e:
        error_msg = str(e).lower()

        if "api key" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or missing API key"
            )

        elif "quota" in error_msg or "limit" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="API quota exceeded. Try again later."
            )

        elif "timeout" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="AI service timeout. Please retry."
            )

        # 🔒 Default safe error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong while processing your request"
        )
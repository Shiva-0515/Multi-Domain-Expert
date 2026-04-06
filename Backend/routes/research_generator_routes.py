from fastapi import APIRouter, HTTPException, status
from expert_factory import get_expert_config
from crews.expert_crew import run_expert_crew
from schemas.query_schema import QueryRequest
import time
import logging

router = APIRouter(prefix="/research", tags=["Research Generation"])

logger = logging.getLogger(__name__)


@router.post("/generate")
def generate_report(request: QueryRequest):
    start_time = time.time()

    try:
        # 🧪 Validate input
        if not request.query.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Query cannot be empty"
            )

        # 🔍 Get expert config
        try:
            expert_config = get_expert_config(request.expert_id)
            if not expert_config:
                raise ValueError("Invalid expert")
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Expert not found"
            )

        # 🚀 Run crew
        try:
            result = run_expert_crew(expert_config, request.query)
        except Exception as e:
            logger.error(f"Crew execution failed: {e}")

            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Failed to generate report. Please try again."
            )

        execution_time = round(time.time() - start_time, 2)

        # 🧠 Validate result
        if not result:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Empty response generated"
            )

        return {
            "expert_id": request.expert_id,
            "query": request.query,
            "report_markdown": result,
            "execution_time": f"{execution_time}s"
        }

    # ✅ Pass FastAPI errors
    except HTTPException as e:
        raise e

    # 🔒 Catch unexpected errors
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong while generating the report"
        )
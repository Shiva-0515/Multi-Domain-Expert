from fastapi import APIRouter

from expert_factory import get_expert_config
from crews.expert_crew import run_expert_crew

from schemas.query_schema import QueryRequest
import time

router = APIRouter(prefix="/research", tags=["Research Generation"])

@router.post("/generate")
def generate_report(request: QueryRequest):
    start_time = time.time()

    expert_config = get_expert_config(request.expert_id)

    result = run_expert_crew(expert_config, request.query)

    execution_time = round(time.time() - start_time, 2)

    return {
        "expert_id": request.expert_id,
        "query": request.query,
        "report_markdown": result,
        # "model_used": expert_config["model_name"],
        "execution_time": f"{execution_time}s"
    }

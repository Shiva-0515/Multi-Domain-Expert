from pydantic import BaseModel

class QueryRequest(BaseModel):
    expert_id: str
    query: str
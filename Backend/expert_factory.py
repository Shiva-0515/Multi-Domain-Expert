from database import experts_collection

def get_expert_config(expert_id: str):
    expert = experts_collection.find_one({"expert_id": expert_id})
    if not expert:
        raise ValueError("Expert not found or inactive")
    return expert

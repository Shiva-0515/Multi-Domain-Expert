import time
import logging

logger = logging.getLogger("expert_pipeline")

def safe_kickoff(crew, retries=2):
    for i in range(retries):
        try:
            return crew.kickoff()
        except Exception as e:
            logger.warning(f"LLM call failed (attempt {i+1}): {e}")
            time.sleep(1)
    raise Exception("LLM failed after retries")

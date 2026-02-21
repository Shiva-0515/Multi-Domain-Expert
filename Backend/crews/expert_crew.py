import time
import logging

from crews.stages.intent import extract_intent
from crews.stages.research import perform_research
from crews.stages.expert import generate_draft
from crews.stages.critic import validate_draft
from crews.stages.refinement import run_refinement_loop
from database import experts_collection
logger = logging.getLogger("expert_pipeline")

query_llm = "gemini/gemini-2.5-flash-lite"
expert_llm = "gemini/gemini-2.5-flash"
critic_llm = "gemini/gemini-3-flash-preview"

def run_expert_crew(expert_config, user_query):
    start_time = time.time()
    # query_llm = f"huggingface/{expert_config['models']['query_model']}"
    # expert_llm = f"huggingface/{expert_config['models']['expert_model']}"
    # critic_llm = f"huggingface/{expert_config['models']['critic_model']}"
    logger.info("--------------------------------------------------")
    logger.info(f"models used - query: {query_llm}, expert: {expert_llm}, critic: {critic_llm}")
    logger.info("🚀 PIPELINE START")

    structured_intent = extract_intent(
        expert_config,
        user_query,
        query_llm
    )

    research = perform_research(structured_intent)

    final_report, final_score = run_refinement_loop(
        expert_config,
        structured_intent.get("intent"),
        research,
        expert_llm,
        critic_llm,
        generate_draft,
        validate_draft
    )

    logger.info("--------------------------------------------------")
    logger.info(f"Final Score: {final_score}/10")
    logger.info(f"final report length: {len(final_report)} characters")
    logger.info(f"✅ PIPELINE COMPLETE in {round(time.time()-start_time,2)}s")

    return final_report

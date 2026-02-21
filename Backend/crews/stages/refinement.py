from crews.utils.text_utils import compress_feedback
import logging

def run_refinement_loop(
    expert_config,
    intent,
    research,
    expert_llm,
    critic_llm,
    generate_draft,
    validate_draft,
    max_retries=3
):
    approved = False
    iteration = 0
    best_score = -1
    best_draft = ""
    feedback = None

    while not approved and iteration < max_retries:
        iteration += 1
        draft = generate_draft(
            expert_config,
            intent,
            research,
            expert_llm,
            feedback
        )

        score, decision, critic_output = validate_draft(
            expert_config,
            draft,
            critic_llm
        )

        if score > best_score:
            best_score = score
            best_draft = draft

        if decision == "APPROVE" or score >= 8:
            return draft,score

        feedback = compress_feedback(critic_output)
        logging.info(f"Iteration {iteration}: Score {score}, Decision {decision}")
        logging.info(f"Feedback for next iteration: {feedback[:200]}")

    return best_draft,best_score

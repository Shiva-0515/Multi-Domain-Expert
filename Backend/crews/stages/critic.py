import re
import logging
from crewai import Agent, Task, Crew
from crews.utils.llm_utils import safe_kickoff

def validate_draft(expert_config, draft, critic_llm):
    critic_agent = Agent(
        role=expert_config["critic_role"],
        goal=expert_config["critic_goal"],
        backstory="Strict analytical auditor.",
        llm=critic_llm,
        verbose=False
    )

    critic_prompt = f"""
You are a strict domain validator.

Domain Constraints:
{expert_config['domain_constraints']}

Required Sections:
{expert_config['output_format']}

Report:
{draft}
Checklist:
1. Are ALL required sections present exactly as specified?
2. Are domain constraints fully satisfied?
3. Is reasoning logically consistent?
4. Are claims aligned with research context?
5. Are there unsafe, exaggerated, or unsupported claims?

Respond exactly:

SCORE: <1-10>
DECISION: APPROVE or REVISE

If REVISE:
FEEDBACK:
<clear bullet points>
"""


    task = Task(description=critic_prompt,
                expected_output="Score and decision.",
                agent=critic_agent)

    crew = Crew(agents=[critic_agent], tasks=[task])
    result = safe_kickoff(crew)

    output = result.raw

    score_match = re.search(r"SCORE:\s*(\d+)", output)
    decision_match = re.search(r"DECISION:\s*(APPROVE|REVISE)", output)

    score = int(score_match.group(1)) if score_match else 0
    decision = decision_match.group(1) if decision_match else "REVISE"

    return score, decision, output

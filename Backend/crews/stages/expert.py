# from crewai import Agent, Task, Crew
# from crews.utils.llm_utils import safe_kickoff
# from crews.utils.text_utils import truncate_text

# def generate_draft(expert_config, intent, research, expert_llm, feedback=None):
#     expert_agent = Agent(
#         role=expert_config["expert_role"],
#         goal=expert_config["expert_goal"],
#         backstory="Experienced domain specialist.",
#         llm=expert_llm,
#         verbose=False
#     )

#     if not feedback:
#         prompt = f"""
# Write a structured report.

# Intent:
# {intent}

# Research:
# {research}

# Structure:
# {expert_config['output_format']}

# Constraints:
# {expert_config['domain_constraints']}
# """
#     else:
#         prompt = f"""
# Previous issues:
# {feedback}

# Rewrite fully correcting issues.

# Structure:
# {expert_config['output_format']}
# """

#     task = Task(description=prompt,
#                 expected_output="Markdown report.",
#                 agent=expert_agent)

#     crew = Crew(agents=[expert_agent], tasks=[task])
#     result = safe_kickoff(crew)

#     return truncate_text(result.raw)


from crewai import Agent, Task, Crew
from crews.utils.llm_utils import safe_kickoff
# from crews.utils.text_utils import truncate_text


def generate_draft(expert_config, intent, research, expert_llm, feedback=None):

    expert_agent = Agent(
        role=expert_config["expert_role"],
        goal=expert_config["expert_goal"],
        backstory="Experienced domain specialist focused on rigor and compliance.",
        llm=expert_llm,
        verbose=False
    )

    # =====================================================
    # INITIAL DRAFT
    # =====================================================
    if not feedback:

        prompt = f"""
You are acting as a senior expert in the {expert_config['domain']} domain.

Your objective is to produce a structured, logically rigorous report.

================================================
USER INTENT
================================================
{intent}

================================================
RESEARCH CONTEXT
================================================
{research}

================================================
MANDATORY STRUCTURE
================================================
You MUST produce EXACTLY the following sections
in this exact order:

{expert_config['output_format']}

Do NOT:
- Add extra sections
- Rename sections
- Skip sections

================================================
MANDATORY DOMAIN CONSTRAINTS
================================================
You MUST strictly comply with ALL of the following:

{expert_config['domain_constraints']}

================================================
EXECUTION REQUIREMENTS
================================================
1. Base claims on research when available.
2. Clearly flag assumptions.
3. Avoid unsupported or exaggerated claims.
4. Ensure logical consistency.
5. Ensure quantitative correctness (if applicable).
6. Ensure feasibility (if financial/operational).
7. Flag uncertainty clearly.

Before finalizing internally verify:
- All required sections exist.
- All constraints are satisfied.
- No logical contradictions remain.

Return markdown only.
No commentary outside required structure.
"""

    # =====================================================
    # REVISION DRAFT
    # =====================================================
    else:

        prompt = f"""
The previous draft failed validation.

================================================
CRITICAL ISSUES IDENTIFIED
================================================
{feedback}

You must rewrite the ENTIRE report correcting ALL issues.

================================================
MANDATORY STRUCTURE
================================================
Use EXACTLY these sections in this order:

{expert_config['output_format']}

================================================
MANDATORY DOMAIN CONSTRAINTS
================================================
{expert_config['domain_constraints']}

================================================
CORRECTION REQUIREMENTS
================================================
1. Fix all numerical inconsistencies.
2. Remove unsupported claims.
3. Improve logical flow.
4. Explicitly resolve every issue listed above.
5. Increase analytical rigor.

Before returning internally confirm:
- Every feedback issue is resolved.
- All required sections are present.
- All constraints are satisfied.
- No contradictions remain.

Rewrite fully from scratch.
Return markdown only.
No commentary.
"""

    task = Task(
        description=prompt,
        expected_output="Structured markdown report.",
        agent=expert_agent
    )

    crew = Crew(agents=[expert_agent], tasks=[task])
    result = safe_kickoff(crew)

    # return truncate_text(result.raw)
    return result.raw

from crewai import Agent, Task, Crew
from crews.utils.parsing import extract_json
from crews.utils.llm_utils import safe_kickoff
import logging
def extract_intent(expert_config, user_query, query_llm):
    query_agent = Agent(
        role=expert_config["query_role"],
        goal="Extract intent and short search queries.",
        backstory="Precise analytical extractor.",
        llm=query_llm,
        llm_kwargs={"temperature": 0.0},
        verbose=False
    )

    task = Task(
    description=f"""
You are a strict intent extraction engine.

Domain: {expert_config['domain']}
User Query:
\"\"\"{user_query}\"\"\"

RULES:
1. Preserve ALL numeric values exactly.
2. Preserve ALL constraints explicitly mentioned.
3. Do NOT generalize.
4. Do NOT add new concepts.
5. Search queries must be directly derived from the user query.
6. Max 3 search queries.
7. Each search query must contain at least one numeric constraint from the original query.
8. Output VALID JSON only.

FORMAT:
{{
  "intent": "concise but fully constraint-preserving summary",
  "search_queries": ["query1","query2","query3"]
}}
""",
    expected_output="Valid JSON only.",
    agent=query_agent
)


    crew = Crew(agents=[query_agent], tasks=[task])
    result = safe_kickoff(crew)

    parsed = extract_json(result.raw)

    logging.info(f"Extracted intent: {parsed.get('intent')}")
    for i, q in enumerate(parsed.get("search_queries", [])):
        logging.info(f"Search query {i+1}: {q}")

    if not parsed:
        return {
            "intent": user_query,
            "search_queries": [user_query]
        }

    return parsed

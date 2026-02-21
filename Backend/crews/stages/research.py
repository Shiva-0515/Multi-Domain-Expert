from tools.tavily_tool import search_web
from crews.utils.text_utils import sanitize_query

def perform_research(structured_intent):
    combined = []
    queries = structured_intent.get("search_queries", [])

    for q in queries:
        safe_query = sanitize_query(q)
        if not safe_query:
            continue

        try:
            data = search_web(safe_query)
        except Exception:
            continue

        if data and "results" in data:
            for r in data["results"][:2]:
                combined.append(
                    f"{r.get('title','')}: {r.get('content','')}"
                )

    return "\n\n".join(combined) or "No external research available."

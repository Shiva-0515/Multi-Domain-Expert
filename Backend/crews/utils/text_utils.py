import re

def sanitize_query(q, max_length=350):
    if not isinstance(q, str):
        return ""
    q = " ".join(q.strip().split())
    return q[:max_length]

def compress_feedback(text, max_chars=1200):
    match = re.search(r"FEEDBACK:(.*)", text, re.DOTALL)
    if not match:
        return "Improve feasibility, logic, and arithmetic accuracy."

    feedback = match.group(1).strip()
    feedback = " ".join(feedback.split())

    return feedback[:max_chars]

def truncate_text(text, max_chars=6000):
    # return text[:max_chars] if len(text) > max_chars else text
    text = text.strip()
    return text


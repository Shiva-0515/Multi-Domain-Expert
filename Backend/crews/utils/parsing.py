import json
import re

def extract_json(raw_output: str):
    try:
        match = re.search(r'\{.*\}', raw_output, re.DOTALL)
        if not match:
            return None

        json_str = match.group(0)
        json_str = json_str.replace("```json", "").replace("```", "")
        json_str = re.sub(r',\s*\}', '}', json_str)
        json_str = re.sub(r',\s*\]', ']', json_str)

        return json.loads(json_str)
    except Exception:
        return None

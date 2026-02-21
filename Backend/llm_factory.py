# import os
# from dotenv import load_dotenv
# from langchain_community.llms import HuggingFaceHub

# load_dotenv()

# def create_llm(model_name: str, temperature: float):
#     return HuggingFaceHub(
#         repo_id=model_name,
#         huggingfacehub_api_token=os.getenv("HF_TOKEN"),
#         model_kwargs={
#             "temperature": temperature,
#             "max_new_tokens": 1024
#         }
#     )


import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

class GeminiLLM:
    def __init__(self, model_name: str, temperature: float = 0.3):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_name = model_name
        self.temperature = temperature

    def __call__(self, prompt: str):
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config={
                "temperature": self.temperature,
                "max_output_tokens": 2048,
            }
        )
        return response.text
    
from langchain_community.llms import HuggingFaceHub

def create_llm(model_name: str, temperature: float = 0.3):

    if model_name.startswith("huggingface/"):
        repo_id = model_name.replace("huggingface/", "")
        return HuggingFaceHub(
            repo_id=repo_id,
            huggingfacehub_api_token=os.getenv("HF_TOKEN"),
            model_kwargs={
                "temperature": temperature,
                "max_new_tokens": 1024
            }
        )

    elif model_name.startswith("gemini/"):
        gemini_model = model_name.replace("gemini/", "")
        return GeminiLLM(
            model_name=gemini_model,
            temperature=temperature
        )

    else:
        raise ValueError(f"Unsupported provider in model_name: {model_name}")

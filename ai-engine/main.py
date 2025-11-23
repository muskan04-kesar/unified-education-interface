from fastapi import FastAPI

app = FastAPI()

@app.get("/ai/ping")
def ping():
    return {"message": "AI Engine is running!"}
from fastapi import FastAPI
from models.summarizer import summarize_performance
from models.apar_generator import generate_apar
from models.chatbot import ai_chat

app = FastAPI()

@app.get("/ai/ping")
def ping():
    return {"message": "AI Engine is running!"}


# ------------------------------
# 1) Summarizer API
# ------------------------------
@app.post("/ai/summarize")
def summarize_api(data: dict):
    result = summarize_performance(data)
    return {"summary": result}


# ------------------------------
# 2) APAR Generator API
# ------------------------------
@app.post("/ai/generate_apar")
def apar_api(data: dict):
    result = generate_apar(data)
    return {"apar": result}


# ------------------------------
# 3) Chatbot API
# ------------------------------
@app.post("/ai/chat")
def chat_api(message: dict):
    result = ai_chat(message.get("text", ""))
    return {"reply": result}

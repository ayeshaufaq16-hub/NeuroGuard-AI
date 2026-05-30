from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from intents import INTENTS
from guardrails import is_unsafe
from memory import save_name, get_name
from analytics import (
    increment_messages,
    increment_blocked,
    get_analytics
)
from semantic_engine import detect_intent
from utils import clean_text


app = FastAPI(
    title="NeuroGuard AI",
    description="Hybrid Explainable AI Assistant",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "message": "NeuroGuard AI Running"
    }


@app.get("/analytics")
def analytics():
    return get_analytics()


@app.post("/chat")
def chat(request: ChatRequest):

    increment_messages()

    user_message = clean_text(request.message)

    # Safety Layer

    if is_unsafe(user_message):

        increment_blocked()

        return {
            "response": "Request blocked due to AI safety policy.",
            "intent": "unsafe_prompt",
            "confidence": 100,
            "engine": "Guardrail Engine"
        }

    # Memory Save

    if "my name is" in user_message:

        name = user_message.replace(
            "my name is",
            ""
        ).strip()

        save_name(name)

        return {
            "response": f"Nice to meet you, {name}.",
            "intent": "memory_store",
            "confidence": 100,
            "engine": "Memory Engine"
        }

    # Memory Recall

    if "what is my name" in user_message:

        name = get_name()

        if name:

            return {
                "response": f"Your name is {name}.",
                "intent": "memory_recall",
                "confidence": 100,
                "engine": "Memory Engine"
            }

    # Semantic Engine

    intent, confidence = detect_intent(
        user_message
    )

    if confidence > 0.55:

        return {
            "response": INTENTS[intent]["response"],
            "intent": intent,
            "confidence": round(
                confidence * 100,
                2
            ),
            "engine": "Semantic Engine"
        }

    # Fallback

    return {
        "response": "I couldn't confidently understand that. Please rephrase.",
        "intent": "unknown",
        "confidence": round(
            confidence * 100,
            2
        ),
        "engine": "Fallback Engine"
    }
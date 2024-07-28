from typing import List
from uuid import UUID

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import chatbot
import db
from dto import Message, LlmConfig

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await db.init()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/v1/chat")
async def post_chat(message: Message):
    resp = await chatbot.complete(message)
    return resp


@app.get("/api/v1/chat", response_model=List[Message])
async def get_chat(thread_id: str) -> list[Message]:
    uid = UUID(thread_id)
    history = await db.collect_chat_history(uid)
    return history


@app.get("/api/v1/user_profile")
async def get_user_profile(session_id: str = ""):
    resp = await db.get_user_profile(session_id)
    return resp


@app.post("/api/v1/llm_profile")
async def post_user_profile(config: LlmConfig, session_id: str = ""):
    resp = await db.save_llm_profile(session_id, config)
    return resp

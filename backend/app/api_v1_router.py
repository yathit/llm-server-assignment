from typing import List
from uuid import UUID

from fastapi import APIRouter

import chatbot
import db
from dto import Message, LlmConfig

router = APIRouter()


@router.post("/api/v1/chat")
async def post_chat(message: Message):
    resp = await chatbot.complete(message)
    return resp


@router.get("/api/v1/chat", response_model=List[Message])
async def get_chat(thread_id: str) -> list[Message]:
    uid = UUID(thread_id)
    history = await db.collect_chat_history(uid)
    return history


@router.get("/api/v1/user_profile")
async def get_user_profile(session_id: str = ""):
    resp = await db.get_user_profile(session_id)
    return resp


@router.post("/api/v1/llm_profile")
async def post_user_profile(config: LlmConfig, session_id: str = ""):
    resp = await db.save_llm_profile(session_id, config)
    return resp

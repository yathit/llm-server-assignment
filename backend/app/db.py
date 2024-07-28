import os
from uuid import UUID

from beanie import init_beanie, SortDirection
from motor.motor_asyncio import AsyncIOMotorClient

from dto import Message, UserProfile, LlmConfig


async def init():
    mongo_db_con = os.getenv("MONGO_DB_CON", "mongodb://root:example@localhost:27017")
    client = AsyncIOMotorClient(mongo_db_con)
    await init_beanie(database=client.db_name, document_models=[Message, UserProfile])


async def collect_chat_history(thread_id: UUID) -> list[Message]:
    result = await (
        Message.find(Message.thread_id == thread_id)
        .limit(100)
        .sort(("timestamp", SortDirection.ASCENDING))
        .to_list()
    )
    return result


def get_username_from_session_id(session_id: str) -> str:
    return "user1"


async def get_user_profile(session_id: str) -> UserProfile:
    username = get_username_from_session_id(session_id)
    result = await UserProfile.find_one({"username": username})
    if not result:
        result = UserProfile(username=username, llm_config=LlmConfig())
        await result.create()
    return result


async def save_llm_profile(session_id: str, llm_config: LlmConfig) -> UserProfile:
    username = get_username_from_session_id(session_id)
    user = await UserProfile.find_one({"username": username})
    user.llm_config = llm_config
    await user.save()
    return user

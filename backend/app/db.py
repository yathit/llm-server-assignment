from uuid import UUID

from beanie import init_beanie, SortDirection
from motor.motor_asyncio import AsyncIOMotorClient

from dto import Message

_inited = False


async def init():
    client = AsyncIOMotorClient("mongodb://root:example@localhost:27017")
    await init_beanie(database=client.db_name, document_models=[Message])


async def collect_chat_history(thread_id: UUID) -> list[Message]:
    await init()
    result = await (Message
                    .find(Message.thread_id == thread_id)
                    .limit(100)
                    .sort(('timestamp', SortDirection.ASCENDING))
                    .to_list())
    return result

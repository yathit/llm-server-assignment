from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime, timezone

from beanie import Document
from pydantic import Field, BaseModel


class Message(Document):
    thread_id: UUID = Field(default_factory=uuid4)
    role: str = "system"
    content: str
    timestamp: int = datetime.now(timezone.utc).timestamp() * 1e6

    class Settings:
        indexes: [
            "thread_id",
            "timestamp",
        ]

    def to_dict(self) -> dict:
        return {
            "role": self.role,
            "content": self.content,
            "timestamp": self.timestamp,
            "thread_id": str(self.thread_id),
        }


class ChatCompletionMessage(BaseModel):
    content: Optional[str] = None
    """The contents of the message."""

    role: str
    """The role of the author of this message."""

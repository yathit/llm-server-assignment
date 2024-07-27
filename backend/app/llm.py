from typing import Iterable

from openai import AsyncOpenAI

from dto import ChatCompletionMessage

client = AsyncOpenAI()


async def complete(messages: Iterable[dict]) -> ChatCompletionMessage:
    completion = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    return completion.choices[0].message

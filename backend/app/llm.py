from typing import Iterable

from openai import AsyncOpenAI

from dto import ChatCompletionMessage, LlmConfig

client = AsyncOpenAI()


async def complete(messages: Iterable[dict], llm_config: LlmConfig) -> ChatCompletionMessage:
    completion = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=llm_config.temperature,
    )

    return completion.choices[0].message

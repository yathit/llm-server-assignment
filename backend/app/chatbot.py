import llm
from db import collect_chat_history
from dto import Message

initial_system_message = {"role": "system",
                          "content": "You are a helpful assistant, take a deep breath and answer concisely. "
                                     "If you don't know, say I don't know."}


async def complete(message: Message) -> Message:
    history = await collect_chat_history(message.thread_id)
    messages = [x.to_dict() for x in history]
    if len(messages) == 0:
        messages.append(initial_system_message)
    res = await llm.complete(messages)
    response = Message(thread_id=message.thread_id, content=res.content, role='user')
    await response.insert()
    return response

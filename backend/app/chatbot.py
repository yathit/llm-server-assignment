import llm
from db import collect_chat_history, get_user_profile
from dto import Message

initial_system_message = ("You are a helpful assistant, take a deep breath and answer concisely. "
                          "If you don't know, say I don't know.")


async def complete(message: Message, session_id: str = '') -> Message:
    user = await get_user_profile(session_id)
    if message.thread_id:
        history = await collect_chat_history(message.thread_id)
    else:
        history = []

    if not message.thread_id or len(history) == 0:
        i = Message(content=initial_system_message, role="system")
        if message.thread_id:
            i.thread_id = message.thread_id
            i.timestamp = message.timestamp - 1
        await i.create()
        history.insert(0, i)
        if not message.thread_id:
            message.thread_id = i.thread_id

    await message.create()
    history.append(message)

    messages = [x.to_dict() for x in history]
    res = await llm.complete(messages, user.llm_config)
    response = Message(thread_id=message.thread_id, content=res.content, role='assistant')
    await response.create()
    return response

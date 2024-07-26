from fastapi import FastAPI
from llm import complete
from dto import Message

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/message")
async def message(message: Message):
    resp = complete(user_content=message.content)
    return {"message": resp}

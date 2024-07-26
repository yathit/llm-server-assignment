from fastapi import FastAPI
import llm
from dto import Message

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/message")
async def message(message: Message):
    resp = llm.complete(user_content=message.content)
    return {"message": resp}

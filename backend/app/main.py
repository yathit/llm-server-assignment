from fastapi import FastAPI

import chatbot
import db
from dto import Message

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    await db.init()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/chat")
async def chat(message: Message):
    resp = await chatbot.complete(message)
    return resp

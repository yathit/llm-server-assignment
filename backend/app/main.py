from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import db
from api_v1_router import router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
async def startup_event():
    await db.init()


@app.get("/")
async def root():
    return {"message": "Hello World"}

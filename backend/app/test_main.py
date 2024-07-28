import asyncio
from unittest.mock import patch

from fastapi.testclient import TestClient

from dto import ChatCompletionMessage
from main import app


def test_read_main():
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_thread_consistency():
    with TestClient(app) as client:
        resp1 = client.post(
            "/api/v1/chat",
            json={
                "content": "Answer the math problem that I will provide you the next prompt. "
                "Answer just by only a number."
                "If you understand, just reply 'ok'",
            },
        )

        assert resp1.status_code == 200
        body1 = resp1.json()
        assert "thread_id" in body1
        assert str(body1["content"]).lower().replace(".", "") == "ok"

        resp2 = client.post(
            "/api/v1/chat",
            json={
                "content": "What is 2 + 2?",
                "thread_id": body1["thread_id"],
            },
        )
        assert resp2.status_code == 200
        body2 = resp2.json()
        assert "thread_id" in body2
        assert body2["thread_id"] == body1["thread_id"]
        assert body2["content"] == "4"

        resp3 = client.get(f"/api/v1/chat?thread_id={body1['thread_id']}")
        assert resp3.status_code == 200
        history = resp3.json()
        assert len(history) == 5

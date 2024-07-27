from fastapi.testclient import TestClient

from main import app


def test_read_main():
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_thread_consistency():
    with TestClient(app) as client:
        resp1 = client.post(
            "/chat",
            json={
                "content": "Answer the math problem by a number that I will provide you the next prompt. "
                           "If you understand, just reply ok.",
            },
        )

        assert resp1.status_code == 200
        body1 = resp1.json()
        assert "thread_id" in body1
        assert str(body1["content"]).lower().replace(".", "") == "ok"

        resp2 = client.post(
            "/chat",
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

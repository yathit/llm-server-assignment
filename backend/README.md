# Python backend for LLM

Features:

1. CRUD conversations that contain a history of queries and responses from an LLM (OpenAI GPT 3-turbo).
2. Send prompt queries and receive responses from the LLM. 
3. Prompts need to contain the existing conversation history as context.
4. All prompts sent to the LLMs and the responses returned need to be anonymized and stored in a database for auditing purposes.

## Setup

### Environment variable 

Provide [OpenAPI key](https://platform.openai.com/docs/quickstart) as `OPENAI_API_KEY` environment variable. 

    export OPENAI_API_KEY='your-api-key-here'

### Installation

Create environment, install deps 

```bash 
python3 -m venv venv
source .venv/bin/activate
pip install -r backend/requrements.txt
```

## Running 

Run mongodb server via Docker

    cd backend
    docker compose up -d .

After setup and activating the Python env, run the FastAPI server

    cd backend/app
    fastapi dev main.py

## Testing

Run the tests

    python -m pytest ./ 


from openai import OpenAI

client = OpenAI()


def complete(user_content: str):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
            {"role": "user", "content": user_content}
        ]
    )

    return completion.choices[0].message

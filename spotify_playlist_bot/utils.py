import openai
import os

# OpenAI environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Spotify environment variables
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URL")
SCOPE = 'playlist-modify-public'
SPOTIFY_USER = os.getenv("SPOTIFY_USERNAME")

# Helper functions
def get_completion(prompt, model="gpt-4"):
    """
    Generates a completion for the given prompt using OpenAI's GPT-4 model.

    Args:
        prompt (str): The prompt to generate a completion for.
        model (str, optional): The name of the OpenAI model to use. Defaults to "gpt-4".

    Returns:
        str: The generated completion text.
    """
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,  # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]

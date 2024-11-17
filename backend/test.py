import os
import requests
import json

# Set your SambaNova API key (replace with your actual key)
api_key = os.getenv("SAMBANOVA_API_KEY")  # Or directly set it, like: api_key = "your_sambanova_api_key_here"

# Define the API endpoint for SambaNova
url = "https://api.sambanova.ai/v1/chat/completions"

# Prepare the headers
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# Define the payload for the chat completion
data = {
    "stream": True,
    "model": "Meta-Llama-3.1-70B-Instruct",  # Or use Meta-Llama-3.1-8B-Instruct if preferred
    "messages": [
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"}
    ],
    "temperature": 0.1,
    "top_p": 0.1
}

# Send the request to the SambaNova API
response = requests.post(url, headers=headers, data=json.dumps(data))

# Parse and print the response
if response.status_code == 200:
    result = response.json()
    print(result['choices'][0]['message']['content'])
else:
    print(f"Error: {response.status_code} - {response.text}")

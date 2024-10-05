from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Retrieve the API key from the environment variable
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    )

def generate_response(prompt, message_history=None):
    """Function to get the response from GPT-3.5 model"""
    if message_history is None:
        message_history = []

    #Append new user message to the history
    message_history.append({"role": "user", "content": prompt})

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Chat model
            # messages=[
            #     {"role": "system", "content": "You are a helpful assistant."},  # System instruction (optional)
            #     {"role": "user", "content": prompt},  # The user's input goes here
            # ],
            messages=message_history,
            max_tokens=150,  # Limit the length of the response
            n=1,  # Want one response
            temperature=0.7,  # Control the randomness of the output
        )
        # Extract the chatbot's response and add it to history
        chatbot_reply = response.choices[0].message.content
        message_history.append({"role": "assistant", "content": chatbot_reply})

        return chatbot_reply, message_history
    except Exception as e:
        return f"Error: {str(e)}", message_history

# def main():
#     print("AI Chatbot (type 'quit' to exit)")
#     while True:
#         user_input = input("You: ")
#         if user_input.lower() == "quit":
#             break
#         response = generate_response(user_input)
#         print(f"Chatbot: {response}")

# if __name__ == "__main__":
#     main()

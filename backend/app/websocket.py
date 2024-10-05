from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from .api.chatbot import generate_response #Import the chatbot logic

app = FastAPI()
# Allowing CORS for local development (update origins when in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# WebSocket endpoint to handle real-time communication
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # Accept WebSocket connection

    message_history = [] #a message history for the session

    try:
        while True:
            # Receive prompt from user
            data = await websocket.receive_text()
            print(f"received data from frontend is {data}")
            #Generate response from AI
            response, message_history = generate_response(data, message_history)
            # Send chatbot's response back to user
            await websocket.send_text(f"{response}")
    except Exception as e:
        print(f"Error: {str(e)}")
            # break
        await websocket.close()

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
    while True:
        try:
            # Receive prompt from user
            message = await websocket.receive_text()
            #Generate response from AI
            response = generate_response(message)
            # Send chatbot's response back to user
            await websocket.send_text(f"Chatbot: {response}")
        except Exception as e:
            print(f"Error: {str(e)}")
            break
    await websocket.close()

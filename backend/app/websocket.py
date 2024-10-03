from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

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
            # Receive message from client
            message = await websocket.receive_text()

            # Echo the message back to the client (for now)
            await websocket.send_text(f"Message received: {message}")
        except Exception as e:
            print(f"Error: {str(e)}")
            break

    await websocket.close()

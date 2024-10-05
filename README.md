# AI_Chatbot
Creating an AI Chatbot with React frontend and Python (FAST API -WebSocket) backend

## Demo Video

Watch the demo of the project below:

[![Demo Video]()](https://drive.google.com/file/d/1ShqWZLFlVTZmbDTYLCiiW78kWtWgLAC6/view?usp=sharing)

This video showcases the main features of the chatbot project.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [WebSocket Communication](#websocket-communication)
- [Local Storage Management](#local-storage-management)
- [Acknowledgments](#acknowledgments)
- [Additional Resources](#additional-resources)

## Introduction

This project is a chatbot application built using React and FastAPI that allows users to engage in conversations with a bot. Users can create new chat sessions and maintain a history of conversations. The chatbot interacts in real-time via WebSocket communication.

## Features

- **Real-Time Chat**: Users can chat with the bot and receive responses in real time.
- **Chat History**: Users can view a history of previous conversations and their summaries (still in progress).
- **Create New Chats**: Users can start new chat sessions and assign names to them.
- **Local Storage**: All chats are saved in the browser's local storage, ensuring persistence even after refreshing the page.
- **Responsive Design**: The application is designed to be responsive and work well on different screen sizes.

## Technologies Used

- **Frontend**: 
  - React.js
  - HTML
  - CSS
- **Backend**: 
  - FastAPI
- **WebSocket**: 
  - For real-time communication between the client and the server.
- **Local Storage**: 
  - For storing chat history in the browser.

## Installation

To set up the project on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your_username/chatbot-project.git
   cd chatbot-project

2. **Install frontend dependencies**: Navigate to the frontend directory and install the required packages:
   ```bash
   cd frontend
   npm install

3. **Run the application**: Start the development server:
   ```bash
   npm start

  The application will be available at http://localhost:3000.

4. **Run the backend**: Navigate to the backend directory and install the necessary dependencies using ```requirements.txt```:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload

  The FastAPI server will typically run on http://localhost:8000.

## Usage

### Creating a New Chat
- Click the **"New Chat"** button to start a new conversation.
- You will be prompted to enter a name for the chat.

### Chatting with the Bot
- Type your message in the input field and press **Enter** or click the **"Send"** button.
- The bot will respond in real-time.

### Chat History
- Viewing chat history is currently in progress.

### Clearing Chats
- Clearing chat history is not yet implemented.

## WebSocket Communication
The chatbot communicates with the backend using WebSocket for real-time interaction. It establishes a connection to the server, sends user messages, and listens for responses from the bot.

## Local Storage Management
The application utilizes the browser's local storage to persist chat data. It saves chat summaries and messages, allowing users to resume conversations even after refreshing the page.

## Acknowledgments
- **React**: A JavaScript library for building user interfaces.
- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.6+.
- **WebSocket**: A protocol for full-duplex communication channels over a single TCP connection.

## Additional Resources
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [WebSocket Protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)


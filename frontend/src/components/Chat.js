import React, { useState, useEffect } from 'react';
import socket from '../utils/websocket'; 
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);  // to store message history
    const [input, setInput] = useState(''); // user input
    const [isTyping, SetIsTyping] = useState(false); // chatbot typing state

    useEffect(() => {
        // WebSocket connection opened
        socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        // Listen for chatbot responses
        socket.onmessage = (event) => {
            const newMessage = {text: event.data, sender: 'Bot'};
            console.log("Received from Bot: ", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            SetIsTyping(false); // when bot has finished typing
        };

        // Handle WebSocket errors
        socket.onerror = (error) => {
            console.error("WebSocket error: ", error);
        };

        // Handle WebSocket closing
        socket.onclose = (event) => {
            console.log("WebSocket connection closed: ", event);
        };

        // Cleanup: Close WebSocket connection when the component unmounts
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (input.trim() !== "") {
            const newMessage = {text: input, sender: 'You'};
            socket.send(input); // send user input to backend
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInput('');
            SetIsTyping(true); // when bot is typing
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <h3>Conversation History</h3>
                {messages.map((message, index) => (
                    <div key={index} className="history-message">
                        {message.sender}: {message.text}
                    </div>
                ))}
            </div>

            <div className="chat-container">
                <div className="chat-box">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender === 'You' ? 'you' : 'bot'}`}>
                            {message.sender}: {message.text}
                        </div>
                    ))}
                    {isTyping && <div className='bot-typing'>Bot is typing...</div>}
                </div>

                <div className="input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
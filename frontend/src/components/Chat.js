import React, { useState, useEffect } from 'react';
import socket from '../utils/websocket'; 
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);  // to store message history
    const [input, setInput] = useState(''); // user input
    const [isTyping, SetIsTyping] = useState(false); // chatbot typing state
    const [allChats, setAllChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);

    useEffect(() => {
        const savedChats = JSON.parse(localStorage.getItem('chatSummaries')) || [];
        setAllChats(savedChats);
    }, []);

    useEffect(() => {
        if (currentChatId) {
            const chatSummaries = JSON.parse(localStorage.getItem('chatSummaries')) || [];
            const currentChat = chatSummaries.find(chat => chat.id === currentChatId);
            if (currentChat) {
                setMessages(currentChat.messages);
            }
        }
    }, [currentChatId]);

    useEffect(() => {
        if (currentChatId) {
            let chatSummaries = JSON.parse(localStorage.getItem('chatSummaries')) || [];

            const updatedChats = chatSummaries.map(chat => {
                if (chat.id === currentChatId) {
                    return { ...chat, messages: messages };
                }
                return chat;
            });

            localStorage.setItem('chatSummaries', JSON.stringify(updatedChats));
        }
    }, [messages, currentChatId]);
    
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
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.send(input); // send user input to backend
            setInput('');
            SetIsTyping(true); // when bot is typing
        }
    };

    const createNewChat = () => {
        const newChat = {
            id: Date.now(),
            name: prompt("Enter a name for this chat (you can edit this later)"),
            messages: []
        };

        const updatedChats = [...allChats, newChat];
        localStorage.setItem('chatSummaries', JSON.stringify(updatedChats));
        setAllChats(updatedChats);
        setCurrentChatId(newChat.id);
    };

    const handleChatClick = (chatId) => {
        setCurrentChatId(chatId);
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
                {allChats.length === 0 && <p>No previous chats.</p>}
                {allChats.map((chat) => (
                    <div key={chat.id} onClick={() => handleChatClick(chat.id)}>
                        {chat.name || 'Unnamed Chat'}
                    </div>
                ))}
                <button onClick={createNewChat}>New Chat</button>
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
                        onChange={(e) => setInput(e.target.value)}
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
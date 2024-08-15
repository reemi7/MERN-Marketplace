import React, { useState, useEffect } from 'react';
import './Chat.css';

const ChatBox = ({ socket, userId, selectedUser }) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        if (selectedUser) {
            const fetchChatHistory = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/app/chat/${userId}/${selectedUser.userID}`);
                    const data = await response.json();
                    setChat(data.messages.map(msg => ({
                        ...msg,
                        fromSelf: msg.from === userId,
                    })));
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                }
            };

            fetchChatHistory();
        }
    }, [userId, selectedUser]);

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            if (data.from === selectedUser?.userID || data.from === userId) {
                setChat((prevChat) => [...prevChat, { ...data, fromSelf: data.from === userId }]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [socket, selectedUser, userId]);

    const sendMessage = () => {
        if (message.trim() !== '' && selectedUser) {
            const newMessage = {
                from: userId,
                to: selectedUser.userID,
                
                message: message.trim(),
            };
            socket.emit('sendMessage', newMessage);
            setMessage('');
            setChat([...chat, { ...newMessage, fromSelf: true }]);
        }
    };

    return (
        selectedUser && (
            <div className="chat-container">
                <div className="chat-header">Chat with {selectedUser.username}</div>
                <div className="chat-messages">
                    {chat.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.fromSelf ? 'self' : 'other'}`}>
                            {msg.message}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        )
    );
};

export default ChatBox;

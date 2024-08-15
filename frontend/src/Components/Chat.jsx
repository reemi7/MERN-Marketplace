import React, { useState, useEffect } from "react";
import "./Chat.css";

const Chat = ({ socket, userId, postOwnerId, username, postOwnerName }) => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Fetch chat history from the server
        const fetchChatHistory = async () => {
            try {
                const response = await fetch(`http://localhost:3000/app/chat/${userId}/${postOwnerId}`);
                const data = await response.json();
                console.log(data)
                setChat(data.messages.map(msg => ({
                    ...msg,
                    fromSelf: msg.from === userId
                })));
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        fetchChatHistory();
    }, [userId, postOwnerId]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            const newMessage = {
                from: userId,
                to: postOwnerId,
                message: message.trim(),
            };
            socket.emit("sendMessage", newMessage);
            setMessage("");
            setChat([...chat, { ...newMessage, fromSelf: true }]);
        }
    };

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            if (data.from === postOwnerId || data.from === userId) {
                setChat((prevChat) => [...prevChat, { ...data, fromSelf: data.from === userId }]);
                console.log(chat)
            }
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [socket, postOwnerId, userId]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                Chat with {postOwnerName}
            </div>
            <div className="chat-messages">
                {chat.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.fromSelf ? "self" : "other"}`}
                    >
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
    );
};

export default Chat;

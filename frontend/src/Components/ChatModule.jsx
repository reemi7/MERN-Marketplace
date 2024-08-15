import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import './Chat.css';

const ChatModule = ({ userId, sockets }) => {
    
    const [socket, setSocket] = useState(sockets);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    
    // socket.connect()
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userid");
    socket.auth = { username, token ,userID};

    useEffect(() => {
        const newSocket = sockets;
        setSocket(newSocket);

        // Listen for the "users" event from the server to get the list of connected users
        newSocket.on('users', (usersList) => {
            setUsers(usersList);
        });

        // Optionally, you could emit an event here to join a specific room or notify the server
        newSocket.emit('getUsers'); // Adjust based on your backend logic

        // Cleanup function
        return () => {
            // Optional cleanup logic if necessary
            newSocket.off('users'); // Stop listening to the 'users' event
        };
    }, [sockets]); // Only re-run the effect if 'sockets' changes

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="chat-module">
            <ChatList users={users} onUserClick={handleUserClick} selectedUser={selectedUser} />
            <ChatBox socket={socket} userId={userId} selectedUser={selectedUser} />
        </div>
    );
};

export default ChatModule;

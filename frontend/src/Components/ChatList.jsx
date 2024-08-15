import React from 'react';
import './Chat.css';

const ChatList = ({ users, onUserClick, selectedUser }) => {
    return (
        <div className="users-list">
            <div className="users-header">Users</div>
            <ul>
                {users.map((user) => (
                    <li
                        key={user.userID}
                        onClick={() => onUserClick(user)}
                        className={user.userID === selectedUser?.userID ? "active" : ""}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;

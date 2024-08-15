import React, { useState, useEffect } from 'react';
import './AdminPanel.css'; // Import the CSS file

const AdminPanel = () => {
    const [usersData, setUsersData] = useState([]);
    const [postsData, setPostsData] = useState([]);
    const [message, setMessage] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:3000/app/allusers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roll: 'admin' })
            });
            const data = await response.json();
            console.log(data.allusersadata )
            if (response.ok) {
                setUsersData(data.allusersadata);
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };


    // Post Integration api"S

    const fetchPostsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/app/adminreadpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roll: 'admin' })
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setPostsData(data.read_all);
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    const deletePost = async (postid) => {
        try {
            const response = await fetch('http://localhost:3000/app/admindeletepost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roll: 'admin', postid })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                fetchPostsData();
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchPostsData();
    }, []);

    return (
        <div className="admin-panel">
            <h1 className="admin-title">Admin Panel</h1>
            {message && <p className="admin-message">{message}</p>}
            <h2 className="admin-section-title">Users Data</h2>
            <ul className="admin-list">
                {usersData.map(user => (
                    <li key={user._id} className="admin-list-item">
                        Name :{user.name} ---------- Email: {user.email} ---------- Password:{user.password}
                    </li>
                ))}
            </ul>
            <h2 className="admin-section-title">Posts Data</h2>
            <ul className="admin-list">
                {postsData.map(post => (
                    <li key={post._id} className="admin-list-item">
                       Post-Title : {post.title} --- 
                       PostOwnerName: {post.name}
                        <button
                            className="delete-button"
                            onClick={() => deletePost(post._id)}
                        >
                            Delete Post
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;

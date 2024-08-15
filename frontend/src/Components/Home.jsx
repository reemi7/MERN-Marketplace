import React, { useState, useEffect } from "react";
import DownloadButton from "./Imagedownload";
import "./Home.css";
import Postdelete from './Postdeletebtn';
import Chat from "./Chat";  // Import Chat component

let global_commentId = null;
let global_postid = null;
let global_commentOwnwrId = null;

function Home({ socket }) {
    // socket.connect()
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/app/home";
    const [post, setPost] = useState([]);
    const [likeText, setLikeText] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [commentInput, setCommentInput] = useState("");
    const [save, setSave] = useState("Save");
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userid");
    socket.auth = { username, token ,userID};
    const [chatButtonIndex, setChatButtonIndex] = useState(-1);
    const [notification, setNotification] = useState("");

    function handleComments(i) {
        setCurrentIndex(currentIndex === i ? -1 : i);
    }

    function handleChatButton(i) {
        setChatButtonIndex(chatButtonIndex === i ? -1 : i);
    }

    const commentInputChange = (e) => {
        setCommentInput(e.target.value);
    };

    const editcommenthandle = async (postId, commentId, text, ownerId) => {
        global_commentId = commentId;
        global_postid = postId;
        global_commentOwnwrId = ownerId;
        setSave("Update");
        setCommentInput(text);
    };

    async function saveComments(id) {
        try {
            if (global_commentId) {
                const res = await fetch(`http://localhost:3000/app/updatecomment/${global_postid}`, {
                    method: "PATCH",
                    body: JSON.stringify({ commentid: global_commentId, message: commentInput, ownerid: global_commentOwnwrId }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.status === 400) {
                    alert(data.message);
                }
                setCommentInput("");
                global_commentId = null;
                setSave("Save");
                fetchInfo();
            } else {
                const res = await fetch(`http://localhost:3000/app/createcomment/${id}`, {
                    method: "POST",
                    body: JSON.stringify({ message: commentInput }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    fetchInfo();  // Refresh the post data to include the new comment
                    setCommentInput("");
                } else {
                    alert(`${data}`);
                }
            }
        } catch (error) {
            alert("Error saving comments:", error);
        }
    }

    useEffect(() => {
        // Listen for incoming messages to trigger notifications
        socket.on("receiveMessage", (data) => {
            if (data.from !== localStorage.getItem("userid")) {
                setNotification(`New message from ${data.from}`);
                setTimeout(() => setNotification(""), 5000);  // Clear the notification after 5 seconds
            }
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [socket]);

    const fetchInfo = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setPost(data);
        } catch (error) {
            console.error("Error fetching info:", error);
        }
    };

    const like = async (id, postOwner) => {
        const token = localStorage.getItem("token");

        try {
            const likedata = {
                username: username,
                postOwner: postOwner,
            };

            socket.emit("likepost", likedata);
            const res = await fetch(`http://localhost:3000/app/like/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            let message = await data?.message;
            if (res.ok) {
                socket.on("likedpost", (data) => {
                    setNotification(`${data.username} ${message} on ${data.postOwner}'s post`);
                    setTimeout(() => setNotification(""), 3000);  // Clear the notification after 3 seconds
                });
                setLikeText(!likeText);
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        fetchInfo();
    }, [likeText]);

    async function deleteComment(postId, commentId) {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3000/app/deletecomment/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({ commentid: commentId }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                fetchInfo();  // Refresh the post data to remove the deleted comment
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    return (
        <div className="home-container">
            <h1 className="username">{username}</h1>
            {notification && <div className="notification">{notification}</div>}
            <center>
                {post.map((dataObj, index) => (
                    <div className="post-card" key={index}>
                        <img
                            src={`http://localhost:3000/upload/${dataObj?.photoId?.imagepath}`}
                            alt={`Image ${index}`}
                            className="post-image"
                        />
                        <p className="post-name">Name: {dataObj.name}</p>
                        <p className="post-description">Description: {dataObj.title}</p>
                        <p className="post-likes">Total Likes: {dataObj.like.length}</p>

                        <div className="post-button-parent">
                            <div className="button-sub-parent">
                                <button className="like-button" onClick={() => like(dataObj._id, dataObj.ownerId.name)}>
                                    {dataObj?.like.some(element => element.likeuserId === userID) ? "unlike" : "like"}
                                </button>
                                <DownloadButton
                                    imagesrc={`http://localhost:3000/upload/${dataObj?.photoId?.imagepath}`}
                                    imageName="my doc"
                                    imagedisp={dataObj.title}
                                />
                                <Postdelete
                                    postid={`${dataObj._id}`}
                                    className="like-button"
                                />
                            </div>
                            <button className="comments-button" onClick={() => handleComments(index)}>Comments</button>
                            {currentIndex === index && (
                                <div className="comments-section">
                                    <input
                                        type="text"
                                        placeholder="Add comments"
                                        value={commentInput}
                                        onChange={commentInputChange}
                                        className="comments-input"
                                        style={{ background: "none" }}
                                    />
                                    <button className="save-comment-button" onClick={() => saveComments(dataObj._id)}>{save}</button>
                                </div>
                            )}
                            {dataObj.comments.length > 0 && currentIndex === index && (
                                <ul className="comments-list">
                                    {dataObj.comments.map((elm, i) => (
                                        <li key={i} className="comment-item">
                                            <span className="comment-text">{elm.text}</span>
                                            <button className="delete-comment-button" onClick={() => deleteComment(dataObj._id, elm._id)}>Delete</button>
                                            <button className="edit-comment-button" onClick={() => editcommenthandle(dataObj._id, elm._id, elm.text, elm.ownerId)}>Edit</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {/* Conditionally render the chat button if the post owner is not the current user */}
                            {dataObj.ownerId._id !== userID && (
                                <button className="chat-button" onClick={() => handleChatButton(index)}>Chat with Owner</button>
                            )}
                            {chatButtonIndex === index && (
                                <Chat
                                    socket={socket}
                                    userId={userID}
                                    postOwnerId={dataObj.ownerId._id}
                                    username={username}
                                    postOwnerName={dataObj.ownerId.name}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </center>
        </div>
    );
}

export default Home;
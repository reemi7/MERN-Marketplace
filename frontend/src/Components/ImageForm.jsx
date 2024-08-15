import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./CssImageForm.css"
import { Navigate, useNavigate } from 'react-router-dom'


const ImagePage = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        name: "",
        birthdate: "",
        photo: "",
        title: ""
    });

    const userValidate = async () => {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:3000/app/createpost", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        const data = await res.json();
        if (data.error === "you are not valid user") {
            navigate("/");
            return;
        }
        console.log(data.error);
    }

    useEffect(() => {
        userValidate();
    }, [])



    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const token = localStorage.getItem("token")
            

            if (newUser.name == "" || newUser.photo == "" || newUser.title == "") {
                alert("fill data")
            }
            else {

                console.log(newUser)
                const form = e.target;
                const formData = new FormData(form);
                // console.log(newUser);
                const res = await fetch("http://localhost:3000/app/createpost", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                console.log(data);
                alert(data.message)
                if (res.ok) {
                    navigate('/home')
                }
                else {
                    alert("check data")

                }
            }
        }
        catch (error) {
            console.error(error)
        }
    };

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        setNewUser({ ...newUser, photo: e.target.files[0] });
    };
    useEffect(() => {
        console.log('ImagePage component rendered');
    }, []);
    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="photo"
                    onChange={handlePhoto}
                    style={{ marginBottom: "10px", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                    style={{ marginBottom: "10px", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
                <input
                    type="text"
                    placeholder="discription"
                    name="title"
                    value={newUser.title}
                    onChange={handleChange}
                    style={{ marginBottom: "10px", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
                {/* <input
                    type="date"
                    name="birthdate"
                    value={newUser.birthdate}

                    onChange={handleChange}
                    style={{ marginBottom: "10px", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" }}
                /> */}
                <input type="submit" />
            </form>
        </div>
    );
};

export default ImagePage;

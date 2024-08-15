import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'


function Facebook() {
  const [state, setState] = useState({
    isAuth: false,
    user: "",
    token: "",
  });
  const fblogin = async () => {
    const response = await fetch('http://localhost:3000/app/auth/facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      // If login is successful, navigate to createpost page

      navigate('/home')
    } else if (response.status == 400) {
      // console.log(data.message)
      alert(data.message)
    }
    else {
      // If login fails, set the server error message
      setServerError(data.message || 'Login failed')
    }
  }
  let content = !state.isAuth ? (
    <>
      <div onClick={()=>{fblogin}}><button
        style={{
          display: "inline-block",
          fontSize: "14px",
          padding: "13px 30px 15px 44px",
          background: "#3A5A97",
          color: "#fff",
          textShadow: "0 -1px 0 rgba(0,0,20,.4)",
          textDecoration: "none",
          lineHeight: "1",
          position: "relative",
          borderRadius: "5px",
        }}
      >
        Login with Facebook
      </button>
      </div>
    </>
  ) : (
    <>
      <div>
        <button onClick={fb}>logout</button>
      </div>
    </>
  );

  return <>{content}</>;
}

export default Facebook;
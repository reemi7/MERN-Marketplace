
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loginfb from "./LoginwithFB"
import "./Login.css"

const Login = ({ socket }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [serverError, setServerError] = useState("")

  const navigate = useNavigate()
  const signup = () => {
    navigate("/signup")
  }
  const onButtonClick = async () => {
    // You'll update this function later...
    setEmailError('')
    setPasswordError('')
    console.log("login")

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 3) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    else {
      // navigate("/home")
      try {
        const response = await fetch('http://localhost:3000/app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        // console.log(data)

        if (response.status == 200) {
          // If login is successful, navigate to createpost page
          localStorage.setItem("token", data?.data?.token)
          localStorage.setItem("userid", data?.data?.userId)
          localStorage.setItem("username", data?.data?.name)
          const username = localStorage.getItem("username")
          //sends the username and socket ID to the Node.js server
          // socket.emit("newUser", { username, socketID: socket.id });
          socket.connect()
          navigate('/home')

        }
        else if (response.status == 201) {
          localStorage.setItem("token", data?.data?.token)
          localStorage.setItem("userid", data?.data?.userId)
          localStorage.setItem("username", data?.data?.name)
          console.log(data)
          navigate("/adminpanal")
        }
        else if (response.status == 400) {
          // console.log(data.message)
          alert(data.message)
        }
        else {
          // If login fails, set the server error message
          setServerError(data.message || 'Login failed')
        }
      } catch (error) {
        console.error('Error logging in:', error)
        setServerError('An error occurred while trying to log in')
      }

    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
        {/* <Loginfb/> */}
        <button style={{ background: "none", border: "none", color: "purple", textDecoration: "underline" }} onClick={signup}>if you are not login create account</button>
      </div>
    </div>
  )
}

export default Login

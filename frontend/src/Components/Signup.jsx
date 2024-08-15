
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [name, setname] = useState('')
  const navigate = useNavigate()

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
    if (confirmpassword !== password) {
      setPasswordError('Please enter a confirm Password')
      alert("not match")
      return
    }
    if (password.length < 3) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    else {
      try {
        const response = await fetch('http://localhost:3000/app/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        })

        const data = await response.json()

        if (response.ok) {
          // If login is successful, navigate to createpost page
          console.log(data.message)
          // navigate('/home')
          navigate("/twoStepverify")
        } else {
          // If login fails, set the server error message
          setServerError(data.message || 'Login failed')
        }
      } catch (error) {
        console.error('Error logging in:', error)
        setServerError('An error occurred while trying to log in')
      }

    }
    console.log(password, email)
  }
  const login = ()=>{
    navigate("/")
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setname(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
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
      <div className={'inputContainer'}>
        <input
          value={confirmpassword}
          placeholder="Enter your Confirm password here"
          onChange={(ev) => setConfirmpassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign up'} />
      </div>
      <button style={{background:"none",border:"none",color:"purple",textDecoration:"underline"}} onClick={login}>if you already have account login</button>
    </div>
  )
}

export default Signup

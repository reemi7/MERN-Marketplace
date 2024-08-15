
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Otpverify = (props) => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

    const onButtonClick = async () => {
    // You'll update this function later...
    setEmailError('')
    setPasswordError('')
    console.log("login")
    console.log(otp,"otp")
    console.log(email,"email")
    

  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === otp) {
      setPasswordError('Please enter a password')
      return
    }

    if (otp.length < 1) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    else{
        try {
          const response = await fetch('http://localhost:3000/app/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
          })
  
          const data = await response.json()
  
          if (response.ok) {
            // If login is successful, navigate to createpost page
            console.log(data.message)
            navigate("/")
          } else {
            // If login fails, set the server error message
            // setServerError(data.message || 'Login failed')
            console.log("error")
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
        <div>Two Step Verify</div>
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
          value={otp}
          placeholder="Enter Your Verify Code"
          onChange={(ev) => setOtp(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Verify'} />
      </div>
    </div>
  )
}

export default Otpverify

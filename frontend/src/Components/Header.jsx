import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css";
import Logout from './Logout'
import Chat from './Chat';

function Header() {
  return (
    <div className='hearder'>
      <div className='header-links'>
        <NavLink to="/signup" >Sign Up</NavLink>
        <NavLink to="/twoStepverify" >Two Step Verify</NavLink>
        <NavLink to="/" >Login Page</NavLink>
        <NavLink to="/home" >home</NavLink>
        <NavLink to="/createpost" >Create post</NavLink>
        {/* <NavLink to="/chat" >Chatting</NavLink> */}
        <Logout/>
      </div>
      
    </div>
  )
}

export default Header
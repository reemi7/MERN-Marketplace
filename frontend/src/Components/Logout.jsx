import React, { useState,useEffect } from 'react'

function Logout() {
  const [logout, setLogout] = useState("");
  const logout_Button = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username")
    
  }
  // useEffect(()=>{
  //   logout_Button()
  //   // window.location.reload();

  // },[])
  return (
    <div>
      <button onClick={logout_Button} style={{ backgroundColor: "red", height: "30px", width: "100px",color:"white" ,borderRadius:"7px"}}>Logout</button>
    </div>
  )
}

export default Logout
import React from 'react'

import { useEffect } from 'react'

export default function Postdeletebtn(props) {

    const { postid,className } = props
    const token = localStorage.getItem("token")
    async function deletepost (params) {
            console.log(postid)
            console.log(token)
            try {
                const res = await fetch(`http://localhost:3000/app/deletepost`, {
                    method: "POST",
                    body: JSON.stringify({ postid: postid }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                // console.log(data);
                if(res.status == 400){
                    alert(data.message)
                }
                if (res.ok) {
                    // fetchInfo();  
                    // Refresh the post data to remove the deleted comment
                    alert(data.message)

    
                }
                
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
    }


    return (
        <div>
            <button onClick={()=>deletepost()} className={className}>deletepost</button>
        </div>
    )
}

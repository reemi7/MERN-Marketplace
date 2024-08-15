// src/components/DownloadButton.js
import React from 'react';

const DownloadButton = ({imagesrc,imageName,imagedisp}) => {
    // console.log(imagesrc)
    const handleDownload = async () => {
        let token = localStorage.getItem("token")
        if(token){
            
            const imageblob = await fetch(imagesrc) 
                .then(response => response.arrayBuffer())
                .then(buffer => new Blob([buffer], { type: "image/png" }))
                .catch(error => console.error('Error downloading file:', error));
    
            const link = document.createElement("a");
            // const div = document.createElement("div");
            link.href = URL.createObjectURL(imageblob);
            link.download = imagedisp;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        }
        else{
            alert("you are not valid user for find")
        }
        // Trigger the download request
    };

    return (
        <button onClick={handleDownload} style={{    background: "#BB86FC",
            color: "#121212",
            border: "none",
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
            borderRadius: "5px",}}>
            Download File
        </button>
    );
};

export default DownloadButton;

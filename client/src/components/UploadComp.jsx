import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const UploadComp = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const handleClick = async () => {
    if(!selectedFiles.length){
      alert('Please selected a file!');
      return;
    }

    const formData = new FormData();
    
    selectedFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });



    try {
      const response = await fetch('/users/upload', {
        method: 'POST',
        // header: {'Content-Type': 'multipart/form-data'},
        body: formData,
      })

      if(response.ok){
        alert('File Uploaded');
      } else {
        alert('Upload failed');
      }
    }

    catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleClick2 = () => {
    navigate('/dashboard');
  }


  const handleFileChange = (event) => {
  
    setSelectedFiles([...event.target.files])

  }


  return (
    <>
      <input type="file" multiple onChange={handleFileChange}></input>
      <button onClick={handleClick}>Upload</button>
      <button onClick={handleClick2}>Dashboard</button>
      {/* <ul>
        { }
      </ul> */}
    </>
  )
};

export default UploadComp;
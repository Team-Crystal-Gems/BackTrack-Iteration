import React from "react";
import { useState } from "react";

const UploadComp = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [displayFiles, setDisplayFiles] = useState([]);

  const handleClick = async (event) => {

    event.preventDefault();

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


  const handleFileChange = (event) => {
  
    const newFiles = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);

    const mappedDisplayedFile = selectedFiles.map(file => {
      return(
        <li>
          {file.name}
        </li>
      )
    })
    setDisplayFiles(mappedDisplayedFile);
  }


  return (
    <>
      <input type="file" multiple onChange={handleFileChange}></input>
      <button onClick={handleClick}>Upload</button>
      <ul onChange={handleFileChange}>
        {/* {selectedFiles.map(file => {
          <li>{file.name}</li>
        })} */}
        {displayFiles}
      </ul>
    </>
  )
};

export default UploadComp;
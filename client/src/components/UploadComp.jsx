import React from "react";
import { useState } from "react";

const UploadComp = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleClick = async () => {
    if(!selectedFiles.length){
      alert('Please selected a file!');
      return;
    }

    const files = new FormData();
    
    selectedFiles.forEach((file, index) => {
      files.append(`files[${index}]`, file);
    });

    console.log('files====>', files);
    console.log('selectedFiles====>', selectedFiles);

    try {
      const response = await fetch('/users/upload', {
        method: 'POST',
        // header: {'Content-Type': 'multipart/form-data'},
        body: files,
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
  
    setSelectedFiles([...event.target.files])

  }


  return (
    <>
      <input type="file" multiple onChange={handleFileChange}></input>
      <button onClick={handleClick}>Upload</button>
      {/* <ul>
        { }
      </ul> */}
    </>
  )
};

export default UploadComp;
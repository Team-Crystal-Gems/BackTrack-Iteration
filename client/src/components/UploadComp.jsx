import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavComp from "./NavComp.jsx";
import NavbarComp from "./NavbarComp.jsx";
import cassettte from "../../assets/cassette.png"

const UploadComp = () => {

  const navigate = useNavigate();
  const [fileSelect, setFileSelect] = useState([]);
  // const [displayFiles, setDisplayFiles] = useState([]);

  const handleNav = () => {
    navigate('/dashboard');
  }

  const handleClick = async (event) => {

    event.preventDefault();

    if (!fileSelect.length) {
      alert('Please selected a file!');
      return;
    }

    const formData = new FormData();

    fileSelect.forEach((file, index) => {
      formData.append(`files`, file);
    });



    try {
      const response = await fetch('/users/upload', {
        method: 'POST',
        // header: {'Content-Type': 'multipart/form-data'},
        body: formData,
      })

      if (response.ok) {
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


  const handleFileSelect = (event) => {

    const newFiles = Array.from(event.target.files);
    setFileSelect(prevFiles => [...prevFiles, ...newFiles]);

  }

  const handleDelete = (event) => {

    const updatedFiles = fileSelect.filter((file) => {
      if(event.target.id !== file.name){
        return file;
      }
    });

    setFileSelect(updatedFiles)
  }

  // just testing to see if handleDelete was working properly
  // useEffect(()=>{
  //   console.log('fileSelect', fileSelect)
  // }, [fileSelect])

  return (
    <>
      <NavComp />
      <div className="uploadComp-page-container">
        <div className="uploadComp-container">

          <div className="upload-div">
            <img src={cassettte} />
          </div>
          {/* <NavbarComp /> */}

          <div className="upload-div">
            <h3>UPLOAD YOUR BEST TRACKS</h3>
          </div>

          <div id="input-div" className="upload-div">
            <input id="choose-file-input" type="file" multiple onChange={handleFileSelect}></input>
            <ul>
              {fileSelect.map((file, i) => (
                <li key={`${file}-${i}`}>
                  {file.name}
                  <button className="btn-delete" id={file.name} onClick={handleDelete}>X</button>
                </li>
              ))}
            </ul>

            {/* {uploadButton && <button className="btn" id="upload-button" onClick={handleClick}>Upload</button>} */}
            {fileSelect[0] && <button className="btn" id="upload-button" onClick={handleClick}>Upload</button>}
          </div>
        </div>
      </div>
    </>
  )
};

export default UploadComp;

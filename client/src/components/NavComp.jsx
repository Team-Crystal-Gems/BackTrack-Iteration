import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import backtrack from "../../assets/backtrack.png";
import eject from "../../assets/eject.png";
import redButton from "../../assets/red_button.png";

const NavComp = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=-99999999;';
    navigate('/');
  }

  const handleDashboard = () => {
    navigate('/dashboard');
  }

  const handleUpload = () => {
    navigate('/upload');
  }

  return(
    // <div>
    <nav className="navBar">
      <img src={logo} onClick={handleDashboard}/>
      <div onClick={handleUpload}>
        <img src={redButton}/>
        <p className="navBar">Upload</p>
      </div>
      <div onClick={handleLogout}>
        <img src={eject} />
        <p className="navBar">Logout</p>
      </div>
    </nav>
// </div>
  )

}

export default NavComp;
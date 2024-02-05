import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import backtrack from "../../assets/backtrack.png";
import eject from "../../assets/eject.png";
import redButton from "../../assets/red_button.png";
import play from "../../assets/play.png"

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
    <nav className="nav">
      {/* LEFT */}
      <div className="left-nav"></div>

      {/* CENTER */}
      <div className="center-nav">
      <img src={logo} />
      </div>

      {/* RIGHT */}
      <div className="right-nav">
        <div id="dashboard-box" className="right-nav-btn" onClick={handleDashboard}>
          <img id="play-icon" src={play} />
          <p className="navBar">Dashboard</p>
        </div>
        <div id="upload-box"  className="right-nav-btn" onClick={handleUpload}>
          <img src={redButton} />
          <p className="navBar">Upload</p>
        </div>
        <div id="logout-box"  className="right-nav-btn" onClick={handleLogout}>
          <img src={eject} />
          <p className="navBar">Logout</p>
        </div>
      </div>

    </nav>
    // </div>
  )

}

export default NavComp;
import React from "react";
import { useNavigate } from "react-router-dom";

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
    <nav>
      <a onClick={handleDashboard}>Dashboard</a>
      <a onClick={handleUpload}>Upload</a>
      <a onClick={handleLogout}>Logout</a>
    </nav>
  )

}

export default NavComp;
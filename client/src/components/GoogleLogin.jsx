import React from 'react';
import GoogleLogin from '@react-oauth/google';

const GoogleSignIn = () => {
  const handleGoogleLogin = (response) => {
    console.log('Google login response', response);
  };


  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => console.log('Login failed!')}
    />
  );
};




export default  GoogleSignIn;

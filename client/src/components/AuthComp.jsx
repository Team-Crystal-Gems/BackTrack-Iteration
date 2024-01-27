import { autoBatchEnhancer } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleAuthStage } from '../features/authSlice.js';
// import  GoogleSignIn from './GoogleLogin.jsx';
import { useGoogleLogin } from '@react-oauth/google';


const AuthComp = () => {
  const authStage = useSelector(state => state.auth.authStage);
  console.log('AUTHCOMP: authStage:   ', authStage);
  let compProps;
  if (authStage === 'signup') compProps = useSelector(state => state.auth.signupProps);
  else if (authStage === 'login') compProps = useSelector(state => state.auth.loginProps);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(toggleAuthStage());
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  // https://www.npmjs.com/package/@react-oauth/google
  // need func to redirect to /dashboard on success
  // need func to create a new user in the backend
  const googleOAuth = useGoogleLogin({
    onSuccess: (response) => console.log('Google Oauth Success', response),
    onError: () => console.log('Error on Google Oauth')
  })

  return (
    <div className='authenticationPage--container'>
      <div className='authenticationComp--container'>
        <h1>{compProps.header}</h1>
        <form onSubmit={navigateToDashboard}>
          {compProps.nameLabel && <label htmlFor='input--name'>Name</label>}
          {compProps.nameLabel && <input type='text' placeholder='First name' id='input--name'></input>}
          <label htmlFor='input--email'>Email</label>
          <input type='email' placeholder='name@domain.com' id='input--email'></input>
          <label htmlFor='input--password'>Password</label>
          <input type='password' placeholder='password' id='input--password'></input>
          <button className='btn' onClick={navigateToDashboard}>{compProps.submitBtnLabel}</button>
        </form>
        <p>or</p>
        <div className='btn--container'>
          {/* <GoogleSignIn className="google-btn" buttonText="bananas">Sign Up with Google</GoogleSignIn> */}

          <button className='btn' onClick={() => googleOAuth()}>{authStage === 'signup' ? 'Sign in' : 'Log in'} with Google</button>
          {/* <button className='btn'>{authStage === 'signup' ? 'Sign in' : 'Log in'} with Facebook</button> */}
        </div>
        {authStage === 'signup' && <p>Already have an account? <a onClick={handleClick}>Log in here</a>.</p>}
        {authStage === 'login' && <p>Don't have an account?<a onClick={handleClick}> Sign up here</a>.</p>}
      </div>
    </div>
  )
};

export default AuthComp;
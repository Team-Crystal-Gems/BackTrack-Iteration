import { autoBatchEnhancer } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleAuthStage } from '../features/authSlice.js';
import { useGoogleLogin } from '@react-oauth/google';

const AuthComp = () => {
  const authStage = useSelector((state) => state.auth.authStage);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  let compProps;
  if (authStage === 'signup')
    compProps = useSelector((state) => state.auth.signupProps);
  else if (authStage === 'login')
    compProps = useSelector((state) => state.auth.loginProps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(toggleAuthStage());
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`/users/${authStage}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // const data = await response.json();
    // console.log(data);
    // on sucess, nagiate to /dashboard. What does 'success' look like?
    navigate('/dashboard');
  };

  // https://www.npmjs.com/package/@react-oauth/google
  // need func to redirect to /dashboard on success
  // need func to create a new user in the backend
  const googleOAuth = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      fetch('/users/googleOAuth', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${response.access_token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user); // The user data from your backend
        })
        .catch((error) => {
          console.error(error);
        });
      navigate('/dashboard');
    },
    onError: () => console.log('Error on Google Oauth'),
  });

  return (
    <div className="authenticationPage--container">
      <div className="authenticationComp--container">
        <h1>{compProps.header}</h1>
        <form onSubmit={handleSubmit}>
          {compProps.nameLabel && <label htmlFor="input--name">Name</label>}
          {compProps.nameLabel && (
            <input
              type="text"
              placeholder="First name"
              name="name"
              id="input--name"
              onChange={handleChange}
              value={formData.name}
            />
          )}

          <label htmlFor="input--email">Email</label>
          <input
            type="email"
            placeholder="name@domain.com"
            name="email"
            id="input--email"
            onChange={handleChange}
            value={formData.email}
          />

          <label htmlFor="input--password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="input--password"
            onChange={handleChange}
            value={formData.password}
          />

          <button className="btn">{compProps.submitBtnLabel}</button>
        </form>
        <p>or</p>
        <div className="btn--container">
          <button className="btn" onClick={() => googleOAuth()}>
            {authStage === 'signup' ? 'Sign in' : 'Log in'} with Google
          </button>
          {/* <button className='btn'>{authStage === 'signup' ? 'Sign in' : 'Log in'} with Facebook</button> */}
        </div>
        {authStage === 'signup' && (
          <p>
            Already have an account? <a onClick={handleClick}>Log in here</a>.
          </p>
        )}
        {authStage === 'login' && (
          <p>
            Don't have an account?<a onClick={handleClick}> Sign up here</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthComp;

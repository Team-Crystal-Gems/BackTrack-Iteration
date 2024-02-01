import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthComp from '../components/AuthComp.jsx';
import Dashboard from '../components/Dashboard.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';

import {
  fetchTopTracks,
  fetchTopArtists,
  setChosenTrack,
} from '../features/slice.js';
// import DisplayYear from '../components/DisplayYear.jsx';
import '../../styles/index.scss';
import UploadComp from '../components/UploadComp.jsx';

export function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="61323721664-ut6009ddm9ce3bf41albrsi53gtbhvq2.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<AuthComp />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/upload" element={<UploadComp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

// This exports the entire file "App" or module.
export default App;

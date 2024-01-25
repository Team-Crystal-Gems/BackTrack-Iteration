import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../components/Dashboard.jsx';
import AuthComp from '../components/AuthComp.jsx';

import { fetchTopTracks, fetchTopArtists, setChosenTrack } from '../features/slice.js';
// import DisplayYear from '../components/DisplayYear.jsx';
import TopArtistsComp from '../components/TopArtistsComp.jsx';
import '../../styles/index.scss';



export function App() {

      return (
            <>
              <Routes>
                  <Route path="/" element={<AuthComp />}/>
                  <Route path="/dashboard" element={<Dashboard />}/>
              </Routes>
            </>

      )
}

// This exports the entire file "App" or module.
export default App;

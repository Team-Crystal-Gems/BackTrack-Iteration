import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import NavbarComp from '../components/NavbarComp.jsx';
import TopTracksComp from '../components/TopTracksComp.jsx';
import TopAlbumComp from '../components/TopAlbumComp.jsx';
import GraphComp from '../components/GraphComp.jsx';
import LogStateComp from '../components/LogStateComp.jsx';
import YearSliderComp from '../components/SliderComp.jsx';
import SignupComp from '../components/SignupComp.jsx';
// import LoginComp from '../components/LoginComp.jsx';

import { fetchTopTracks, fetchTopArtists, setChosenTrack } from '../features/slice.js';
// import DisplayYear from '../components/DisplayYear.jsx';
import TopArtistsComp from '../components/TopArtistsComp.jsx';
import '../../styles/index.scss';



export function App() {

      return (
            
            <>
                  <Routes>
                        <Route path="/" element={<SignupComp />} />
                        {/* <Route path="/sign-up" element={<SignupComp />} /> */}
                  </Routes>
                  {/* <LogStateComp/>
      <NavbarComp/>
      <YearSliderComp/>
      <TopTracksComp/>
      <TopArtistsComp/>
      <TopAlbumComp/>
      <GraphComp/> */}
            </>

      )
}

// This exports the entire file "App" or module.
export default App;

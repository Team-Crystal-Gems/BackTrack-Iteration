import React from 'react';

import NavbarComp from './NavbarComp.jsx';
import TopTracksComp from './TopTracksComp.jsx';
import TopAlbumComp from './TopAlbumComp.jsx';
import GraphComp from './GraphComp.jsx';
import LogStateComp from './LogStateComp.jsx';
import YearSliderComp from './SliderComp.jsx';

const Dashboard = () => {
  return (
    <>
      <LogStateComp />
      <NavbarComp />
      <YearSliderComp />
      <TopTracksComp />
      <TopArtistsComp />
      <TopAlbumComp />
      <GraphComp />
    </>
  )
};

export default Dashboard;
import React from 'react';

import LogStateComp from './LogStateComp.jsx';
import NavbarComp from './NavbarComp.jsx';
import YearSliderComp from './SliderComp.jsx';
import TopTracksComp from './TopTracksComp.jsx';
import TopArtistsComp from './TopArtistsComp.jsx';
import TopAlbumComp from './TopAlbumComp.jsx';
import GraphComp from './GraphComp.jsx';
import NavComp from './NavComp.jsx';

const Dashboard = () => {

  return (
    <>
      <NavComp />
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
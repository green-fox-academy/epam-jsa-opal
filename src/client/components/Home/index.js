'use strict';

import React from 'react';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import SuggestedVideos from '../SuggestedVideos';
import './index.scss';

class Home extends React.Component {
  render() {
    return (
      <div className='homecontainer'>
        <Header className='header'/>
        <NavigationBar className='navigationBar'/>
        <div className='suggestedVideos'> <SuggestedVideos /> </div>
      </div>
    );
  }
}

export default Home;


'use strict';

import React from 'react';
import Header from '../header';
import NavigationBar from '../NavigationBar';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavigationBar />
      </div>
    );
  }
}

export default Home;


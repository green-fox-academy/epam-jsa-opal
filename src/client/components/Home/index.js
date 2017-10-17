'use strict';

import React from 'react';
import Header from '../header';
import NavigationBar from '../NavigationBar';

class Home extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <NavigationBar link1="www.google.com"/>
      </main>
    );
  }
}


export default Home;


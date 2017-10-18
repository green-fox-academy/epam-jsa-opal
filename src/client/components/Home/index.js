'use strict';

import React from 'react';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import subscription_1 from '../NavigationBar/assets/subscription_1.png';
import subscription_2 from '../NavigationBar/assets/subscription_2.png';
import subscription_3 from '../NavigationBar/assets/subscription_3.png';
import subscription_4 from '../NavigationBar/assets/subscription_4.png';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavigationBar subscription_1={subscription_1} subscription_2={subscription_2} subscription_3={subscription_3} subscription_4={subscription_4}/>
      </div>
    );
  }
}


export default Home;


'use strict';

import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import setting from './assets/setting.jpg';
import subscription_1 from '../NavigationBar/assets/subscription_1.png';
import subscription_2 from '../NavigationBar/assets/subscription_2.png';
import subscription_3 from '../NavigationBar/assets/subscription_3.png';
import subscription_4 from '../NavigationBar/assets/subscription_4.png';

class NavigationBar extends React.Component {
    render() {
      let subscription = this.props.subscriptions.map(function(channel) {
          return(
            <Link className='subscription' key={channel.id} to={channel.url}>< img src={channel.id}></img></Link>
          );
      })
      return (
      <nav className = 'navigationBar'>
        <Link className='homeButton' to='/home'>Home</Link>
        <Link className='trendingButton' to='/trending'>Trending</Link>
        <Link className='feedButton' to='/feed'>Feed</Link>
        <Link className='historyButton' to='/history'>History</Link>
        <Link className='watchButton' to='/wahtchlater'>Watch later</Link>
        <Link className='likedButton' to='/liked'>Liked</Link>
        <div className = 'obstaclehorizantal'></div>
        <span>subscription</span>
        {subscription}
        <Link className='setting' to='/setting'>setting</Link>
      </nav>
      );
    }
};
NavigationBar.defaultProps = {
  test:1,
    subscriptions: [{
        avatar: '/sub1',
        url: '/111',
        id: subscription_1
    },
    {
      avatar: '/sub1',
      url: '/222',
      id: subscription_2
    },
    {
      avatar: '/sub1',
      url: '/333',
      id: subscription_3
    }
  ]
};
export default NavigationBar;
'use strict';

import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import subscription1 from '../NavigationBar/assets/subscription_1.png';
import subscription2 from '../NavigationBar/assets/subscription_2.png';
import subscription3 from '../NavigationBar/assets/subscription_3.png';
import subscription4 from '../NavigationBar/assets/subscription_4.png';

class NavigationBar extends React.Component {
  render() {
    let subscription = this.props.subscriptions.map(function(channel) {
      return (
        <Link className="subscription" key={channel.id} to={channel.url}>
          <img src={channel.avatar}></img>
        </Link>
      );
    });

    return (
      <nav className="navigationbar">
        <Link className="homebutton" to="/home">Home</Link>
        <Link className="trendingbutton" to="/trending">Trending</Link>
        <Link className="feedbutton" to="/feed">Feed</Link>
        <Link className="historybutton" to="/history">History</Link>
        <Link className="watchbutton" to="/wahtchlater">Watch later</Link>
        <Link className="likedbutton" to="/liked">Liked</Link>
        <div className="obstaclehorizantal"></div>
        <span>Subscription</span>
        {subscription}
        <Link className="setting" to="/setting">setting</Link>
      </nav>
    );
  }
}
NavigationBar.defaultProps = {
  subscriptions: [
    {
      avatar: subscription1,
      url: '/111',
      id: 'sub1',
    },
    {
      avatar: subscription2,
      url: '/222',
      id: 'sub2',
    },
    {
      avatar: subscription3,
      url: '/333',
      id: 'sub3',
    },
    {
      avatar: subscription4,
      url: '/333',
      id: 'sub4',
    },
  ],
};
export default NavigationBar;

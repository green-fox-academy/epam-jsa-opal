'use strict';

import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import subscription1 from '../NavigationBarComponent/assets/subscription_1.png';
import subscription2 from '../NavigationBarComponent/assets/subscription_2.png';
import subscription3 from '../NavigationBarComponent/assets/subscription_3.png';
import subscription4 from '../NavigationBarComponent/assets/subscription_4.png';

class NavigationBar extends React.Component {
  render() {
    let subscription = this.props.subscriptions.map(function(channel) {
      return (
        <Link className="subscription" key={channel.userId} to={'/profile?username=' + channel.username}>
          <img src={channel.avatar}></img>
        </Link>
      );
    });

    return (
      <nav className="navigationbar">
        <Link className={this.props.selected === 'home' ? 'selected homebutton' : 'homebutton'} to="/home">Home</Link>
        <Link className={this.props.selected === 'trending' ? 'selected trendingbutton' : 'trendingbutton'} to="/trending">Trending</Link>
        <Link className={this.props.selected === 'feed' ? 'selected feedbutton' : 'feedbutton'} to="/feed">Feed</Link>
        <Link className={this.props.selected === 'history' ? 'selected historybutton' : 'historybutton'} to="/history">History</Link>
        <Link className={this.props.selected === 'watchlater' ? 'selected watchbutton' : 'watchbutton'} to="/watchlater">Watch later</Link>
        <Link className={this.props.selected === 'like' ? 'selected likedbutton' : 'likedbutton'} to="/liked">Liked</Link>
        <div className="obstaclehorizantal"></div>
        <span>Subscription</span>
        {subscription}
        <Link className="setting" to="/setting">setting</Link>
      </nav>
    );
  }
}

export default NavigationBar;

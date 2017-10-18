'use strict';

import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import feed from './assets/feed.png';
import history from './assets/history.png';
import home from './assets/home.png';
import liked from './assets/liked.png';
import trending from './assets/trending.png';
import watchlater from './assets/watchlater.png';
import setting from './assets/setting.jpg'

export default (p) => (
    <nav className = 'navigationBar'>
      <div className = 'shit'></div>
      <Link className='homeButton' to='/home'>home</Link>
      <Link className='trendingButton' to='/trending'>Trending</Link>
      <Link className='feedButton' to='/feed'>feed</Link>
      <Link className='historyButton' to='/history'>History</Link>
      <Link className='watchButton' to='/wahtchlater'>Watch later</Link>
      <Link className='likedButton' to='/liked'>Liked</Link>
      <div className = 'obstaclehorizantal'></div>
      <span>subscription</span>
      <Link className = 'subscription_1' to='/sub1'><img src={p.subscription_1}></img></Link>
      <Link className = 'subscription_2' to='/sub1'><img src={p.subscription_2}></img></Link>
      <Link className = 'subscription_3' to='/sub1'><img src={p.subscription_3}></img></Link>
      <Link className = 'subscription_4' to='/sub1'><img src={p.subscription_4}></img></Link>
      {/* <ul>
        <li className = 'homelist'><button style={{
          backgroundImage: `url(${home})`
        }}><Link className = 'home' href='www.baidu.com' src={home}>Home</Link></button></li>
        <li className = 'trendinglist'><button><img src = {trending}></img><Link className = 'trending' href='www.baidu.com'>Trending</Link></button></li>
        <li className = 'feedlist'><button><img src = {feed}></img><Link className = 'feed' href='www'>Feed</Link></button></li>
        <li className = 'historylist'><button><img src = {history}></img><Link className = 'history' href='www'>History</Link></button></li>
        <li className = 'watchlist'><button><img src = {watchlater}></img><Link className = 'watchlater' href='www'>Watch later</Link></button></li>
        <li className = 'likedlist'><button><img src = {liked}></img><Link className = 'liked' href='www'>Liked</Link></button></li>
      </ul>
      <div className = 'obstaclehorizantal'></div>
      <span>subscription</span>
      <ul>
        <li className = 'subscription_1'><button><img src = {subscription_1}></img></button></li>
        <li className = 'subscription_2'><button><img src = {subscription_2}></img></button></li>
        <li className = 'subscription_3'><button><img src = {subscription_3}></img></button></li>
        <li className = 'subscription_4'><button><img src = {subscription_4}></img></button></li>
      </ul>
      <button className='settingButton'>
        <img className='setting' src={setting}></img>
        <div>setting</div>
      </button> */}
    </nav>


);





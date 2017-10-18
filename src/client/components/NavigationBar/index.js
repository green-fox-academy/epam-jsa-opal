'use strict';

import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import setting from './assets/setting.jpg'

export default (p) => (
    <nav className = 'navigationBar'> 
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
      
      <Link className='setting' to='/setting'>setting</Link>
    </nav>


);





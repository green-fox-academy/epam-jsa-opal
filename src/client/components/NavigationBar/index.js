'use strict';

import React from 'react';
import Link from 'link-react';
import './index.scss';
import feed from './assets/feed.png';
import history from './assets/history.png';
import home from './assets/home.png';
import liked from './assets/home.png';
import trending from './assets/home.png';
import watchlater from './assets/home.png';


export default (p) => (
  <nav className = 'navigationBar'>
      <Link href='www.baidu.com' >Home</Link>
      <Link href='www.baidu.com'>Trending</Link>
      <Link href='www'>Feed</Link>
      <Link href='www'>History</Link>
      <Link href='www'>Watch later</Link>
      <Link href='www'>Liked</Link>
  </nav>

);





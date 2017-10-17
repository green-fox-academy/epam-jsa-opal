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
  <nav>
      <h1>Hello world</h1>
      <Link href='www' >{p.link1}</Link>
      <Link href='www'>watchlater</Link>
  </nav>

);





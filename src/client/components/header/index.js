'use strict';
import React from 'react';
import './index.scss';
import img from './assets/search.png';


class NavBar extends React.Component {
  render() {
    return (
      <nav className = "navbar">
        <span>opal</span>
        <img src={img} height="16" width="16"></img>
      </nav>
    );
  }
}

export default NavBar;


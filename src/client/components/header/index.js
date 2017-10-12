'use strict';
import React from 'react';
import './index.scss';
import search from './assets/search.png';
import upload from './assets/upload.png';
import userprofile from './assets/userprofile.png';

class NavBar extends React.Component {
  render() {
    return (
      <nav className = "navbar">
        <span className = "team-name">opal</span>
        <div className = "obstacle"></div>
        <img className = "search-logo" src={search} ></img>
        <span className = "search-name">search</span>
        <img className = "upload-logo" src={upload}></img>
        <span className = "upload-name">upload</span>
        <img className = "user-profile" src={userprofile}></img>
      </nav>
    );
  }
}

export default NavBar;


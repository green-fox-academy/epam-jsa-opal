'use strict';
import React from 'react';
import './index.scss';
import search from './assets/search.png';
import upload from './assets/upload.png';
import userprofile from './assets/userprofile.png';
import popup from './assets/popup.png';
class NavBar extends React.Component {
  render() {
    return (
      <nav className = "navbar">
        <span className = "team-name">opal</span>
        <div className = "obstacle"></div>
        <img className = "search-logo" src={search} ></img>
        <span className = "search-name">search</span>
        <div className = "right-top">
          <img className = "upload-logo" src={upload}></img>
          <span className = "upload-name">upload</span>
          <img className = "user-profile" src={userprofile}></img>
          <div className="dropdown">
            <button className="dropbtn" ><img className = "popup-menu" src={popup}></img></button>
            <div className="dropdown-content">
              <a href="#">team</a>
              <a href="#">Opal</a>
              <a href="#">is</a>
              <a href="#">undefeatable</a>
            </div>
          </div>
        </div>
      </nav>

    );
  }
}

export default NavBar;


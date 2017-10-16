'use strict';

import React from 'react';
import './index.scss';
import search from './assets/search.png';
import upload from './assets/upload.png';
import userprofile from './assets/userprofile.png';
class header extends React.Component {
  render() {
    return (
      <header className = "header">
        <span className = "team-name">opal</span>
        <div className = "obstacle"></div>
        <form>
          <img className = "search-logo" src={search} ></img>
          <input className = "search-name" placeholder="search" type="search" >
          </input>
        </form>
        <nav className = "right-top">
          <img className = "upload-logo" src={upload}></img>
          <span className = "upload-name">upload</span>
          <img className = "user-profile" src={userprofile}></img>
          <div className="dropdown">
            <button className="dropbtn" ></button>
            <div className="dropdown-content">
              <button></button>
              <button>my profile</button>
              <button>logout</button>
            </div>
          </div>
        </nav>
      </header>

    );
  }
}

export default header;


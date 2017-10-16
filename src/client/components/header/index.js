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
        <div className = "right-top">
          <button className = "right-top-button">
            <img className = "upload-logo" src={upload}></img>
            <span className = "upload-name">upload</span>
          </button>
          <img className = "user-profile" src={userprofile}></img>
          <nav>
            <div className="dropdown">
              <div className="dropdown-content">
                <button></button>
                <button>my profile</button>
                <button>logout</button>
              </div>
            </div>
          </nav>
        </div>
      </header>

    );
  }
}

export default header;


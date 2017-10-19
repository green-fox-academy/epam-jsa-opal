'use strict';

import React from 'react';
import './index.scss';
import search from './assets/search.png';
import upload from './assets/upload.png';
import userprofile from './assets/userprofile.png';

class header extends React.Component {
  Userlogout() {
    let token = localStorage.getItem('token');

    fetch('/api/logout', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    }).then (function(event){
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      window.location.href = '/login';
    }
    );
  }
  render() {
    return (
      <header className="header">
        <span className="team-name">opal</span>
        <div className="obstacle"></div>
        <form>
          <img className="search-logo" src={search} ></img>
          <input className="search-name" placeholder="search" type="search" >
          </input>
        </form>
        <div className="right-top">
          <button className="right-top-button">
            <img className="upload-logo" src={upload}></img>
            <span className="upload-name">upload</span>
          </button>
          <img className="user-profile" src={this.props.userprofile}></img>
          <nav className="hoverstuff">
            <div className="dropdown">
              <div className="dropdown-content">
                <button>my profile</button>
                <button onClick={this.Userlogout}>logout</button>
              </div>
            </div>
          </nav>
        </div>
      </header>

    );
  }
}

header.defaultProps = {userprofile: userprofile};

export default header;


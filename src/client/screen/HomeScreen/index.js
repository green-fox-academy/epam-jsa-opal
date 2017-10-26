'use strict';

import React from 'react';
import Header from '../../components/HeaderComponent';
import NavigationBar from '../../components/NavigationBarComponent';
import SuggestedVideos from '../../components/SuggestedVideosComponent';
import VideoComponent from '../../components/VideoComponent';
import './index.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clickUpload: false};
    this.onClickUpload = this.onClickUpload.bind(this);
    this.onClickCancelUpload = this.onClickCancelUpload.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onClickUpload() {
    this.setState({clickUpload: true});
  }
  onClickCancelUpload() {
    this.setState({clickUpload: false});
  }
  onSubmit(ev) {
    ev.preventDefault();
    let statusCode;
    let obj = {
      url: ev.target.elements.namedItem('video-url').value,
      preview: ev.target.elements.namedItem('video-preview').value,
      title: ev.target.elements.namedItem('video-title').value,
    };

    fetch('/api/videos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      statusCode = response.status;
      return response.json();
    }).then((result) => {
      if (statusCode === 200) {
        this.onClickCancelUpload();
      } else {
        // this.uploadFailed(result);
      }
    });
  }
  render() {
    return (
      <div className="homecontainer">
        <Header className="header"
          onClickUpload={this.onClickUpload}
          onClickCancelUpload={this.onClickCancelUpload}
        />
        <div className="main">
          {this.state.clickUpload ?
            <form className="upload-form" onSubmit={this.onSubmit}>
              <input type="text" name="video-url" placeholder="video url"/>
              <input type="text" name="video-preview" placeholder="video preview"/>
              <input type="text" name="video-title" placeholder="video title"/>
              <button type="submit">Upload</button>
              <button onClick={this.onClickCancelUpload}>Cancel</button>
            </form>
            :
            null
          }
          <NavigationBar className="navigationBar"/>
          <div className="videoComponent"> <VideoComponent /> </div>
          <div className="suggestedVideos"> <SuggestedVideos /> </div>
        </div>
      </div>
    );
  }
}

export default Home;


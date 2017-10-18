import React from 'react';
import VideoPlayer from '../VideoPlayerComponent';
import Oval2 from './assets/Oval_2.png';

class VideoComponent extends React.Component {
  render() {
    return (
      <div className="VideoComponent">
        <VideoPlayer />
        <div className="VideoBelow">
          <div className="VideoInfo">
            <span>Midnight Starr - Slow Jam</span>
            <span>4,250,633 views</span>
          </div>
          <div className="UserInfo">

          </div>
        </div>
      </div>
    );
  }
}
export default VideoComponent;

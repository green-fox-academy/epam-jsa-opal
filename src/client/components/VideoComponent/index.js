import React from 'react';
import VideoPlayer from '../VideoPlayerComponent';

class VideoComponent extends React.Component {
  render() {
    return (
      <div className="video-component">
        <VideoPlayer />
      </div>
    );
  }
}

export default VideoComponent;

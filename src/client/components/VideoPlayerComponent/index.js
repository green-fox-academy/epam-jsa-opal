import React from 'react';
import './index.scss';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="video-player">
        <video controls
          src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4" type="video/mp4"
        />
      </div>
    );
  }
}

export default VideoPlayer;


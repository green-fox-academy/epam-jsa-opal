import React from 'react';
import './index.scss';

const VideoPlayer = (props) => (
  <div className="player">
    <video controls
      src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4" type="video/mp4"
    />
  </div>
);

export default VideoPlayer;

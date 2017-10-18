import React from 'react';
import './index.scss';

class VideoComponent extends React.Component {
  render() {
    return (
      <div className="player">
        <video controls
          src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4" type="video/mp4"
        />
      </div>
    );
  }
}
export default VideoComponent;

import React from 'react';
import Video from '../VideoPlayerComponent';

class VideoComponent extends React.Component {
  render() {
    return (
      <div>
        <video controls
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"
        />
      </div>
    );
  }
}
export default VideoComponent;

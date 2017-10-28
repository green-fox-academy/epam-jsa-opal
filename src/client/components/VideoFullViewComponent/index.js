import React from 'react';
import './index.scss';
import VideosFullView from './VideosFullView';

class VideosFull extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <aside className="Full-video-container">
        <VideosFullView
          videoInfos={this.props.videoLists}
        />
      </aside>
    );
  }
}

export default VideosFull;

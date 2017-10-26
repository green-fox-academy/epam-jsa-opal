import React from 'react';

class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="suggested-video-list">
        <div className="suggested-video">
          <a href={this.props.videoInfo.videoSrc}
            style={
              {backgroundImage: `url(${this.props.videoInfo.previewSrc})`}
            }>
            <span>{this.props.videoInfo.videoTime}</span>
          </a>
        </div>
        <p className="title">{this.props.videoInfo.title}</p>
        <span className="video-message">
          <span>{this.props.videoInfo.author}</span>
          <span>{this.props.videoInfo.viewNumber} views</span>
        </span>
      </li>
    );
  }
}

export default VideoPreview;

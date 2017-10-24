import React from 'react';
import './index.scss';
import VideoPlayer from '../VideoPlayerComponent/index';
import Comments from '../CommentsComponent';

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'changeupColor': false,
      'changedownColor': false,
      'videoInfos': {videoDetails: {}, uploader: {}},
    };
  }
  componentDidMount() {
    this.fetchVideoInfos('59eecd63abb2117ba6f42a15', (result) => {
      this.setState({videoInfos: result});
    });
  }
  fetchVideoInfos(videoId, callback) {
    fetch('/api/videos/' + '59eecd63abb2117ba6f42a15')
      .then((response) => response.json())
      .then((result) => callback(result));
  }
  handleThumbup() {
    this.setState({'changeupColor': !this.state.changeupColor});
    if (!this.state.changeupColor) {
      fetch('/api/videosthumb/59eecd63abb2117ba6f42a15/thumbUp', {
        method: 'put',
        headers: {'Authorization': localStorage.getItem('token')},
      });
    } else {
      fetch('/api/videosthumb/59eecd63abb2117ba6f42a15/cancelThumbup', {method: 'put'});
    }
  }

  handleThumbdown() {
    this.setState({'changedownColor': !this.state.changedownColor});
    if (!this.state.changedownColor) {
      fetch('/api/videosthumb/59eecd63abb2117ba6f42a15/thumbDown', {method: 'put'});
    } else {
      fetch('/api/videosthumb/59eecd63abb2117ba6f42a15/cancelThumbdown', {method: 'put'});
    }
  }
  share() {

  }
  subscribe() {

  }
  render() {
    return (
      <div className="video-component">
        <VideoPlayer />
        <div className="video-below">
          <div className="video-info">
            <div className="video-name">
              <span>{this.state.videoInfos.videoDetails.title}</span>
              <button className="share" onClick={this.share.bind(this)}></button>
            </div>
            <div>
              <span className="view-num">{this.state.videoInfos.videoDetails.views}</span> <span className="view">views</span>
            </div>
          </div>
          <div className="user-info">
            <div className="userinfo-left">
              <div className="userimg-username">
                <img className="user-img" src={this.state.videoInfos.uploader.avatar}></img>
                <div className="name-publishtime">
                  <span className="user-name">{this.state.videoInfos.uploader.name}</span>
                  <span>{this.state.videoInfos.videoDetails.publishDate}</span>
                </div>
              </div>
              <div className="subcribe-number">
                <button className="subscribe" onClick={this.subscribe.bind(this)}>
              subcribe
                </button>
                <span className="subscribe-num">{this.state.videoInfos.uploader.subscribers}</span>
              </div>
            </div>
            <div className="thumb">
              <button className="thumb-up" onClick={this.handleThumbup.bind(this)}
                className={this.state.changeupColor ? 'changeupcolor thumb-up' : 'thumb-up'}
              >
                like<span>{this.state.videoInfos.videoDetails.likesNum}</span>
              </button>
              <button className="thumb-down" onClick={this.handleThumbdown.bind(this)}
                className={this.state.changedownColor ? 'changedowncolor thumb-down' : 'thumb-down'}>
                dislike<span>{this.state.videoInfos.videoDetails.dislikeNum}</span>
              </button>
            </div>
          </div>
        </div>
        <Comments />
      </div>
    );
  }
}

export default VideoComponent;

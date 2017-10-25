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
      'videoInfos': {videoDetails: {}, uploader: {}, commentInfos: []},
    };
    this.updateVideoInfos = this.updateVideoInfos.bind(this);
  }

  componentDidMount() {
    this.fetchVideoInfos('59eecd63abb2117ba6f42a15', (result) => {
      this.setState({videoInfos: result});
      this.setState({'changeupColor': result.videoDetails.clickedLike});
      this.setState({'changedownColor': result.videoDetails.clickedDislike});
    });
  }
  fetchVideoInfos(videoId, callback) {
    fetch('/api/videos/' + videoId, {headers: {'Authorization': localStorage.getItem('token')}})
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
      fetch('/api/videosthumb/59eecd63abb2117ba6f42a15/cancelThumbup', {
        method: 'put',
        headers: {'Authorization': localStorage.getItem('token')},
      });
    }
  }

  handleThumbdown() {
    this.setState({'changedownColor': !this.state.changedownColor});
    if (!this.state.changedownColor) {
      fetch('/api/videosthumb/59eecd63abb2117ba6f42a15/thumbDown', {
        method: 'put',
        headers: {'Authorization': localStorage.getItem('token')},
      });
    } else {
      fetch('/api/videosthumb/59eecd63abb2117ba6f42a15/cancelThumbdown', {
        method: 'put',
        headers: {'Authorization': localStorage.getItem('token')},
      });
    }
  }
  share() {

  }
  subscribe() {

  }
  updateVideoInfos(videoInfos) {
    this.setState({videoInfos: videoInfos});
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
              <button className="thumb-up" onClick={this.state.changedownColor ? this.handleThumbdown.bind(this) : this.handleThumbup.bind(this)}
                className={this.state.changeupColor ? 'changeupcolor thumb-up clicked' : 'thumb-up'}
              >
                like<span className="like-num">{this.state.videoInfos.videoDetails.videoLikeNums}</span>
              </button>
              <button className="thumb-down" onClick={this.state.changeupColor ? this.handleThumbup.bind(this) : this.handleThumbdown.bind(this)}
                className={this.state.changedownColor ? 'changedowncolor thumb-down clicked' : 'thumb-down'}>
                dislike<span className="dislike-num">{this.state.videoInfos.videoDetails.videoDislikeNums}</span>
              </button>
            </div>
          </div>
        </div>
        <Comments commentInfos={this.state.videoInfos.commentInfos}
          videoId={this.state.videoInfos.videoId}
          updateVideoInfos={this.updateVideoInfos}/>
      </div>
    );
  }
}

export default VideoComponent;

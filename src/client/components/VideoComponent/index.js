import React from 'react';
import './index.scss';
import VideoPlayer from '../VideoPlayerComponent/index';
import Comments from '../CommentsComponent';

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'isLiked': false,
      'isDisliked': false,
      'videoInfos': {videoDetails: {}, uploader: {}, commentInfos: []},
    };
    this.updateVideoInfos = this.updateVideoInfos.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.videoId === null) {
      return;
    }
    this.fetchVideoInfos(nextProps.videoId, (result) => {
      this.setState({'videoInfos': result, 'isLiked': result.videoDetails.clickedLike, 'isDisliked': result.videoDetails.clickedDislike});
    });
  }
  fetchVideoInfos(videoId, callback) {
    fetch('/api/videos/' + videoId, {headers: {'Authorization': localStorage.getItem('token')}})
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  handleThumbup() {
    if (!this.state.isLiked) {
      fetch(`/api/videos/${this.state.videoInfos.videoId}/likes`, {
        method: 'post',
        headers: {'Authorization': localStorage.getItem('token')},
      }).then((response) => {
        let videoInfos = this.state.videoInfos;

        videoInfos.videoDetails.videoLikeNums++;
        this.setState({'videoInfos': videoInfos, 'isLiked': !this.state.isLiked});
      });
    } else {
      fetch(`/api/videos/${this.state.videoInfos.videoId}/likes`, {
        method: 'delete',
        headers: {'Authorization': localStorage.getItem('token')},
      }).then((response) => {
        let videoInfos = this.state.videoInfos;

        videoInfos.videoDetails.videoLikeNums--;
        this.setState({'videoInfos': videoInfos, 'isLiked': !this.state.isLiked});
      });
    }
  }

  handleThumbdown() {
    if (!this.state.isDisliked) {
      fetch(`/api/videos/${this.state.videoInfos.videoId}/dislikes`, {
        method: 'post',
        headers: {'Authorization': localStorage.getItem('token')},
      }).then((response) => {
        let videoInfos = this.state.videoInfos;

        videoInfos.videoDetails.videoDislikeNums++;
        this.setState({'videoInfos': videoInfos, 'isDisliked': !this.state.isDisliked});
      });
    } else {
      fetch(`/api/videos/${this.state.videoInfos.videoId}/dislikes`, {
        method: 'delete',
        headers: {'Authorization': localStorage.getItem('token')},
      }).then((response) => {
        let videoInfos = this.state.videoInfos;

        videoInfos.videoDetails.videoDislikeNums--;
        this.setState({'videoInfos': videoInfos, 'isDisliked': !this.state.isDisliked});
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
        <VideoPlayer videosrc={this.state.videoInfos.videoUrl}/>
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
                  <span>Published on {new Date(this.state.videoInfos.videoDetails.publishDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="subcribe-number">
                <button className="subscribe" onClick={this.subscribe.bind(this)}>
              subcribe
                </button>
                <span className="subscribe-num">{this.state.videoInfos.uploader.subscribers || 0}</span>
              </div>
            </div>
            <div className="thumb">
              <button onClick={this.state.isDisliked ? this.handleThumbdown.bind(this) : this.handleThumbup.bind(this)}
                className={this.state.isLiked ? 'changeupcolor thumb-up clicked' : 'thumb-up'}
              >
                like<span className="like-num">{this.state.videoInfos.videoDetails.videoLikeNums}</span>
              </button>
              <button onClick={this.state.isLiked ? this.handleThumbup.bind(this) : this.handleThumbdown.bind(this)}
                className={this.state.isDisliked ? 'changedowncolor thumb-down clicked' : 'thumb-down'}>
                dislike<span className="dislike-num">{this.state.videoInfos.videoDetails.videoDislikeNums}</span>
              </button>
            </div>
          </div>
        </div>
        <Comments commentInfos={this.state.videoInfos.commentInfos}
          videoId={this.props.videoId}
          updateVideoInfos={this.updateVideoInfos}
          userInfos={this.props.userInfos}/>
      </div>
    );
  }
}

export default VideoComponent;

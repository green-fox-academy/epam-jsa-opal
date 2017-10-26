import React from 'react';
import './index.scss';
import userImg from './assets/Oval_2.png';
import VideoPlayer from '../VideoPlayerComponent/index';
import Comments from '../CommentsComponent';

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'changeupColor': false,
      'changedownColor': false,
      'videoInfos': {commentInfos: []},
    };
    this.updateVideoInfos = this.updateVideoInfos.bind(this);
  }
  componentDidMount() {
    this.fetchVideoInfos('59f04d7d5d8c7686dea115b6', (result) => {
      this.setState({videoInfos: result});
    });
  }
  fetchVideoInfos(videoId, callback) {
    fetch('/api/videos/' + videoId, {
      headers: {'Authorization': localStorage.getItem('token')},
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }
  handleThumbup() {
    this.setState({'changeupColor': !this.state.changeupColor});
  }
  handleThumbdown() {
    this.setState({'changedownColor': !this.state.changedownColor});
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
              <span>{this.props.videoname}</span>
              <button className="share" onClick={this.share.bind(this)}></button>
            </div>
            <div>
              <span className="view-num">{this.props.viewnum}</span> <span className="view">views</span>
            </div>
          </div>
          <div className="user-info">
            <div className="userinfo-left">
              <img className="user-img" src={this.props.userImg}></img>
              <div className="name-publishtime">
                <span className="user-name">{this.props.username}</span>
                <span>{this.props.publishdate}</span>
              </div>
              <div className="subcribe-number">
                <button className="subscribe" onClick={this.subscribe.bind(this)}>
              subcribe
                </button>
                <span className="subscribe-num">{this.props.subscribenum}</span>
              </div>
            </div>
            <div className="thumb">
              <button className="thumb-up" onClick={this.handleThumbup.bind(this)}
                className={this.state.changeupColor ? 'changeupcolor thumb-up' : 'thumb-up'}
              >
                like<span>{this.props.likenum}</span>
              </button>
              <button className="thumb-down" onClick={this.handleThumbdown.bind(this)}
                className={this.state.changedownColor ? 'changedowncolor thumb-down' : 'thumb-down'}>
                dislike
              </button>
            </div>
          </div>
        </div>
        <Comments commentInfos={this.state.videoInfos.commentInfos}
          objectId={this.state.videoInfos._id}
          videoId={this.state.videoInfos.videoId}
          updateVideoInfos={this.updateVideoInfos}/>
      </div>
    );
  }
}

VideoComponent.defaultProps = {
  videoname: 'Midnight Starr - Slow Jam',
  viewnum: '4,250,633',
  username: 'Chill boy',
  publishdate: 'Published on Jun 22,2008',
  subscribenum: '3.8k',
  likenum: '5k+',
  userImg: userImg,
};

export default VideoComponent;

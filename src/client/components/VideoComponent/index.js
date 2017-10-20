import React from 'react';
import './index.scss';
import userImg from './assets/Oval_2.png';
import VideoPlayer from '../VideoPlayerComponent/index';

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'changeupColor': false,
      'changedownColor': false,
    };
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
              <span className="view-num">{this.props.viewnum}</span> <span>views</span>
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
                {this.props.likenum}
              </button>
              <button className="thumb-down" onClick={this.handleThumbdown.bind(this)}
                className={this.state.changedownColor ? 'changedowncolor thumb-down' : 'thumb-down'}>
                {this.props.dislikenum}
              </button>
            </div>
          </div>
        </div>
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
  likenum: 'like 5k+',
  dislikenum: 'dislike',
  userImg: userImg,
};

export default VideoComponent;

import React from 'react';
import './index.scss';
import userImg from './assets/Oval_2.png';
import share from './assets/share.png';
import VideoPlayer from '../VideoPlayerComponent/index';

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'changeupColor': false,
      'changedownColor': false,
    };
  }
  changeupColor() {
    this.setState({'changeupColor': !this.state.changeupColor});
  }
  changedownColor() {
    this.setState({'changedownColor': !this.state.changedownColor});
  }
  render() {
    return (
      <div className="video-component">
        <VideoPlayer />
        <div className="video-below">
          <div className="video-info">
            <div className="video-name">
              <span>Midnight Starr - Slow Jam</span>
              <img className="share" src={share}></img>
            </div>
            <div>
              <span className="view-num">4,250,633</span> <span>views</span>
            </div>
          </div>
          <div className="user-info">
            <div className="userinfo-left">
              <img className="user-img" src={userImg}></img>
              <div className="name-publishtime">
                <span className="user-name">Chill boy</span>
                <span>Published on Jun 222,008</span>
              </div>
              <div className="subcribe-number">
                <button className="subscribe">
              SUBSCRIBE
                </button>
                <span className="subscribe-num">3.8k</span>
              </div>
            </div>
            <div className="thumb">
              <button className="thumb-up" onClick={this.changeupColor.bind(this)}
                className={this.state.changeupColor ? 'changeupcolor thumb-up' : 'thumb-up'}
              >
                like 5k+
              </button>
              <button className="thumb-down" onClick={this.changedownColor.bind(this)}
                className={this.state.changedownColor ? 'changedowncolor thumb-down' : 'thumb-down'}>
                dislike
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default VideoComponent;

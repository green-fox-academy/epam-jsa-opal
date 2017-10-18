import React from 'react';
import './index.scss';
import userImg from './assets/Oval_2.png';
import thumbUp from './assets/Fill 5.png';
import share from './assets/share.png';

const VideoPlayer = (props) => (
  <div className="video-component">
    <div className="video-player">
      <video controls
        src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4" type="video/mp4"
      />
    </div>
    <div className="video-below">
      <div className="video-info">
        <span>Midnight Starr - Slow Jam</span>
        <img className="share" src={share}></img>
        <span>4,250,633 views</span>
      </div>
      <div className="user-info">
        <img className="user-img" src={userImg}></img>
        <div className="name-publishtime">
          <span>Chill boy</span>
          <span>Published on Jun 222,008</span>
        </div>
        <button className="subscribe">
              SUBSCRIBE
        </button>
        <span>3.8k</span>
        <div className="thumb">
          <button className="thumb-up">
            <img className="thumbup-logo" src={thumbUp}></img>
                like
            <span className="like-num">5k+</span>
          </button>
          <button className="thumb-down">
            <img className="thumbdown-logo" src={thumbUp}></img>
                dislike
            <span className="dislike-num"></span>
          </button>
        </div>

      </div>
    </div>
  </div>
);

export default VideoPlayer;

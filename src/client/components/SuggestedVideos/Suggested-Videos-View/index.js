import React from 'react';

const SuggestedVidesView = (props) => (
  <div className="suggested-video-container">
    <ul className="suggested-video-ul">
      <h1>Up next</h1>
      <li className="suggested-video-list">
        <div className="suggested-video">
          <a></a>
          <span>1:00</span>
        </div>
        <p className="title">video test</p>
        <span className="video-message">
          <span>author-test</span>
          <span>100 views</span>
        </span>
      </li>
    </ul>
    <button className="show-more-button">show more</button>
  </div>
);

export default SuggestedVidesView;


import React from 'react';
import './index.scss';
import noPreview from './404.png';
import SuggestedVideosView from './SuggestedVideosView';

class SuggesstedVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfos: [
        {
          'title': 'video1',
          'author': 'author1',
          'viewNumber': 100,
          'previewSrc': noPreview,
          'videoTime': '1:00',
          'videoId': '001',
        },
        {
          'title': 'video2',
          'author': 'author2',
          'viewNumber': 200,
          'previewSrc': noPreview,
          'videoTime': '2:00',
          'videoId': '002',
        },
        {
          'title': 'video3',
          'author': 'author3',
          'viewNumber': 300,
          'previewSrc': noPreview,
          'videoTime': '3:00',
          'videoId': '003',
        },
        {
          'title': 'video4',
          'author': 'author4',
          'viewNumber': 400,
          'previewSrc': noPreview,
          'videoTime': '4:00',
          'videoId': '004',
        },
        {
          'title': 'video5',
          'author': 'author5',
          'viewNumber': 500,
          'previewSrc': noPreview,
          'videoTime': '5:00',
          'videoId': '005',
        },
      ],
      suggestedVidesNum: 4,
    };
  }
  render() {
    return (
      <aside className="suggested-video-container">

        <h1>Up next</h1>
        <SuggestedVideosView
          videoInfos={this.state.videoInfos}
          suggestedVidesNum={this.state.suggestedVidesNum}
        />

        <button className="show-more-button">show more</button>
      </aside>
    );
  }
}

export default SuggesstedVideos;

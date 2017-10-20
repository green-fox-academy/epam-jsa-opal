import React from 'react';
import './index.scss';
import noPreview from './404.png';
import SuggestedVideosView from './SuggestedVideosView';
import movie1 from './movie1.jpg'
import movie2 from './movie2.jpg'
import movie3 from './movie3.jpg'
import movie4 from './movie4.jpg'

class SuggesstedVideos extends React.Component {
  constructor(props) {
    super(props);
    this.onClickShowMore = this.onClickShowMore.bind(this);
    this.state = {suggestedVideosNum: 4};
  }
  onClickShowMore() {
    this.setState({suggestedVideosNum: 10});
  }
  render() {
    const defaultNum = 4;
    const suggestedVideosNum = this.state.suggestedVideosNum;

    return (
      <aside className="suggested-video-container">
        <h1>Up next</h1>
        <SuggestedVideosView
          videoInfos={this.props.videoInfos}
          suggestedVideosNum={this.state.suggestedVideosNum}
        />
        <button className={suggestedVideosNum > defaultNum ?
          'show-more-button-clicked' : 'show-more-button'}
        onClick={this.onClickShowMore}>show more</button>
      </aside>
    );
  }
}

SuggesstedVideos.defaultProps = {
  videoInfos: [
    {
      'title': 'video1',
      'author': 'author1',
      'viewNumber': 100,
      'previewSrc': movie2,
      'videoTime': '1:00',
      'videoId': '001',
    },
    {
      'title': 'video2',
      'author': 'author2',
      'viewNumber': 200,
      'previewSrc': movie1,
      'videoTime': '2:00',
      'videoId': '002',
    },
    {
      'title': 'video3',
      'author': 'author3',
      'viewNumber': 300,
      'previewSrc': movie3,
      'videoTime': '3:00',
      'videoId': '003',
    },
    {
      'title': 'video4',
      'author': 'author4',
      'viewNumber': 400,
      'previewSrc': movie4,
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
    {
      'title': 'video6',
      'author': 'author6',
      'viewNumber': 600,
      'previewSrc': noPreview,
      'videoTime': '16:00',
      'videoId': '006',
    },
    {
      'title': 'video7',
      'author': 'author7',
      'viewNumber': 700,
      'previewSrc': noPreview,
      'videoTime': '7:00',
      'videoId': '007',
    },
    {
      'title': 'video8',
      'author': 'author8',
      'viewNumber': 800,
      'previewSrc': noPreview,
      'videoTime': '8:00',
      'videoId': '008',
    },
    {
      'title': 'video9',
      'author': 'author9',
      'viewNumber': 900,
      'previewSrc': noPreview,
      'videoTime': '9:00',
      'videoId': '009',
    },
  ],
};

export default SuggesstedVideos;

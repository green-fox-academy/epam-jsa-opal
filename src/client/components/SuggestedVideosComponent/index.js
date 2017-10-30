import React from 'react';
import './index.scss';
import SuggestedVideosView from './SuggestedVideosView';

class SuggesstedVideos extends React.Component {
  constructor(props) {
    super(props);
    this.onClickShowMore = this.onClickShowMore.bind(this);
    this.state = {suggestedVideosNum: 4};
  }
  onClickShowMore() {
    this.setState({suggestedVideosNum: 10});
  }
  addViewNum(videoId) {
    let statusCode;

    fetch('/api/videos/' + videoId, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({'videoId': videoId}),
    }).then((response) => {
      statusCode = response.status;
      return response.json();
    }).then((result) => {
      if (statusCode !== 200) {
        console.log('field')
      }
    });
  }
  render() {
    const defaultNum = 4;
    const suggestedVideosNum = this.state.suggestedVideosNum;

    return (
      <aside className="suggested-video-container">
        <h1>Up next</h1>
        <SuggestedVideosView
          videoInfos={this.props.videoLists}
          suggestedVideosNum={this.state.suggestedVideosNum}
          addViewNum={this.addViewNum}
        />
        <button className={suggestedVideosNum > defaultNum ?
          'show-more-button-clicked' : 'show-more-button'}
        onClick={this.onClickShowMore}>show more</button>
      </aside>
    );
  }
}

export default SuggesstedVideos;
